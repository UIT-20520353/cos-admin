import { ITestcase } from "~/types/testcase.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "~/queries/supabase";
import { ITestcaseForm } from "~/types/form.type";

export async function deleteTestcaseById(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("testcases").delete().eq("id", id);
    if (error) {
      console.error("deleteTestcaseById: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteTestcaseById", error);
    return false;
  }
}

export async function getTestcaseList(problem_id: number): Promise<ITestcase[]> {
  try {
    const { data, error }: PostgrestResponse<ITestcase> = await supabase
      .from("testcases")
      .select("*")
      .eq("problem_id", problem_id)
      .then((response) => response as PostgrestResponse<ITestcase>);

    if (error) {
      console.error("getTestcaseList :", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getTestcaseList :", error);
    return [];
  }
}

export async function insertTestcase(problem_id: number, formData: ITestcaseForm): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("testcases")
      .insert({ input: formData.input, output: formData.output, problem_id: problem_id })
      .eq("problem_id", problem_id)
      .select("*");
    if (error) {
      console.error("insertTestcase: ", error);
      return false;
    } else return !!data;
  } catch (error) {
    console.error("insertTestcase: ", error);
    return false;
  }
}

export async function updateTestcase(id: number, formData: ITestcaseForm): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("testcases")
      .update({ input: formData.input, output: formData.output })
      .eq("id", id)
      .select("*");
    if (error) {
      console.error("updateTestcase: ", error);
      return false;
    } else return !!data;
  } catch (error) {
    console.error("updateTestcase: ", error);
    return false;
  }
}
