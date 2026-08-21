export type DealStage =
  | "New"
  | "Qualified"
  | "Proposal"
  | "Won"
  | "Lost";

export interface Deal {
  id: string;
  customerId: string;
  customerName?: string;
    companyName?: string;

  title: string;
  value: number;
  stage: DealStage;
}