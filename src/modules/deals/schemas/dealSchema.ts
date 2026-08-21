import { z } from 'zod';

export const dealSchema = z.object({
  title: z.string().min(2, 'Deal title is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  value: z.number({ message: 'Must be a valid number' }).min(0, 'Value must be positive'),
  stage: z.enum(['New', 'Qualified', 'Proposal', 'Won', 'Lost']),

});

export type DealFormValues = z.infer<typeof dealSchema>;