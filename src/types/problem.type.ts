export type IProblem = {
  id: number;
  name: string;
  detail: string;
  example_input: string;
  example_output: string;
};

export type IOverviewProblem = {
  id: number;
  name: string;
  amount: number;
};