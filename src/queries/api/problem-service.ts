import { IProblemForm } from "~/types/form.type";
import supabase from "~/queries/supabase";
import { IProblem } from "~/types/problem.type";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertProblem(formData: IProblemForm): Promise<boolean | undefined> {
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
  }
}

export async function getProblemList(): Promise<IProblem[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .rpc("get_problem_list")
      .then((response) => response as PostgrestResponse<IProblem>);

    if (error) {
      console.error("insertProblem: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("insertProblem: ", error);
  }
}

export async function getProblemById(id: number): Promise<IProblem[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", id)
      .then((response) => response as PostgrestResponse<IProblem>);

    if (error) {
      console.error("getProblemById: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getProblemById: ", error);
  }
}
