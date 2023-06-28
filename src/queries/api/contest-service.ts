import { IContestDashboard, IContestForRanking } from "~/types/contest.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "~/queries/supabase";

export async function getContestListDashboard(): Promise<IContestDashboard[]> {
  try {
    const { data, error }: PostgrestResponse<IContestDashboard> = await supabase
      .rpc("get_contest_list_for_dashboard")
      .then((response) => response as PostgrestResponse<IContestDashboard>);
    if (error) {
      console.error("getContestListDashboard: ", error);
      return [];
    } else {
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("getContestListDashboard: ", error);
    return [];
  }
}
export async function getContestsForRanking(): Promise<IContestForRanking[]> {
  try {
    const { data, error }: PostgrestResponse<IContestForRanking> = await supabase
      .rpc("get_contests_for_ranking")
      .then((response) => response as PostgrestResponse<IContestForRanking>);
    if (error) {
      console.error("getContestsForRanking: ", error);
      return [];
    } else {
      if (data && data.length !== 0) {
        data.sort((a, b) => b.amount - a.amount);
        return data;
      } else return [];
    }
  } catch (error) {
    console.error("getContestsForRanking: ", error);
    return [];
  }
}
