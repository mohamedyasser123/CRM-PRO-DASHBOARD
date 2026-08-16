import { z } from 'zod';

export const customerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  industry: z.string().min(1, 'Industry is required'),
  status: z.enum(['Lead', 'Active', 'Contacted', 'Lost', 'Inactive', 'VIP']),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  totalRevenue: z.number({ message: 'Must be a valid number' }).min(0, 'Revenue must be positive'),
  totalDeals: z.number({ message: 'Must be a valid number' }).min(0, 'Deals must be non-negative'),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;