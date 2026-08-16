export type CustomerStatus = 'Lead' | 'Active' | 'Contacted' | 'Lost' |'Inactive' | 'VIP';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  country: string;
  city: string;
  address: string;
  status: CustomerStatus;
  source: string;
  assignedTo: string;
  totalDeals: number;
  totalRevenue: number;
  lastContact: string;
  nextFollowUp: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}