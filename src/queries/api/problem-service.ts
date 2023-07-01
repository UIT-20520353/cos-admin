import { IProblemForm } from "~/types/form.type";
import supabase from "~/queries/supabase";
import { IProblem } from "~/types/problem.type";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertProblem(formData: IProblemForm): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("problems")
      .insert({
        name: formData.name,
        detail: formData.detail,
        example_input: formData.example_input,
        example_output: formData.example_output
      })
      .select("*");
    if (error) {
      console.error("insertProblem: ", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("insertProblem: ", error);
    return false;
  }
}

export async function getProblemList(searchText: string): Promise<IProblem[]> {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .rpc("get_problem_list", { search_text: searchText })
      .then((response) => response as PostgrestResponse<IProblem>);

    if (error) {
      console.error("getProblemList: ", error);
      return [];
    } else {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("getProblemList: ", error);
    return [];
  }
}

export async function getProblemById(id: number): Promise<IProblem> {
  const failResult: IProblem = {
    id: -1,
    name: "",
    detail: "",
    example_input: "",
    example_output: ""
  };

  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", id)
      .then((response) => response as PostgrestResponse<IProblem>);

    if (error) {
      console.error("getProblemById: ", error);
      return failResult;
    } else {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      if (data && data.length !== 0) {
        return data[0];
      } else return failResult;
    }
  } catch (error) {
    console.error("getProblemById: ", error);
    return failResult;
  }
}

export async function deleteProblemById(id: number): Promise<boolean> {
  try {
    const { error }: PostgrestResponse<IProblem> = await supabase.from("problems").delete().eq("id", id);

    if (error) {
      console.error("deleteProblemById: ", error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("deleteProblemById: ", error);
    return false;
  }
}
