import type { Customer } from "../modules/customers/types/customer";
import { customers } from "../database/customers";

const STORAGE_KEY = "crm-customers";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getStoredCustomers = (): Customer[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(customers)
  );

  return customers;
};

const saveCustomers = (customers: Customer[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(customers)
  );
};

export const mockApi = {
  customers: {
    getAll: async () => {
      await delay(500);

      return getStoredCustomers();
    },

    getById: async (id: string) => {
      await delay(300);

      const customers = getStoredCustomers();

      return customers.find(
        (customer) => customer.id === id
      );
    },

    create: async (data: Partial<Customer>) => {
      await delay(500);

      const customers = getStoredCustomers();

      const newCustomer: Customer = {
        ...data,
        id: `CUS-${String(customers.length + 1).padStart(4, "0")}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Customer;

      customers.push(newCustomer);

      saveCustomers(customers);

      return newCustomer;
    },

    update: async (
      id: string,
      data: Partial<Customer>
    ) => {
      await delay(500);

      const customers = getStoredCustomers();

      const index = customers.findIndex(
        (customer) => customer.id === id
      );

      if (index === -1) {
        throw new Error("Customer not found");
      }

      const updatedCustomer: Customer = {
        ...customers[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      customers[index] = updatedCustomer;

      saveCustomers(customers);

      return updatedCustomer;
    },

    delete: async (id: string) => {
      await delay(500);

      const customers = getStoredCustomers();

      const index = customers.findIndex(
        (customer) => customer.id === id
      );

      if (index === -1) {
        throw new Error("Customer not found");
      }

      const deletedCustomer = customers[index];

      customers.splice(index, 1);

      saveCustomers(customers);

      return deletedCustomer;
    },
  },
};