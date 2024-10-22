export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface DashboardCounts {
  total: number;
  new: number;
}