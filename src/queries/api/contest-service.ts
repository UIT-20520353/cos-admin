import { IContestDashboard, IContestForRanking } from "~/types/contest.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "~/queries/supabase";

export async function getContestListDashboard() {
  try {
    const { data, error }: PostgrestResponse<IContestDashboard> = await supabase
      .rpc("get_contest_list_for_dashboard")
      .then((response) => response as PostgrestResponse<IContestDashboard>);
    if (error) {
      console.error("getContestListDashboard: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestListDashboard: ", error);
  }
}
export async function getContestsForRanking() {
  try {
    const { data, error }: PostgrestResponse<IContestForRanking> = await supabase
      .rpc("get_contests_for_ranking")
      .then((response) => response as PostgrestResponse<IContestForRanking>);
    if (error) {
      console.error("getContestsForRanking: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestsForRanking: ", error);
  }
}
