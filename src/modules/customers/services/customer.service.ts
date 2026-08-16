import { mockApi } from "../../../api/mock-api";
import type { Customer } from "../types/customer";

export const getCustomers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return mockApi.customers.getAll();
};

export const getCustomerById = async (id: string) => {
  return mockApi.customers.getById(id);
};

export const createCustomer = async (
  data: Partial<Customer>
) => {
  return mockApi.customers.create(data);
};

export const updateCustomer = async (
  id: string,
  data: Partial<Customer>
) => {
  return mockApi.customers.update(id, data);
};

export const deleteCustomer = async (id: string) => {
  return mockApi.customers.delete(id);
};