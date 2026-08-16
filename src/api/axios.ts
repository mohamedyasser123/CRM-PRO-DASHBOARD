import axios from "axios";
import { customers } from "../database/customers";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(async (config) => {
  const url = config.url || "";

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (config.method === "get" && url === "/customers") {
    config.adapter = async () => {
      return {
        data: customers,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    };
  }

  if (config.method === "get" && url.startsWith("/customers/")) {
    const id = url.split("/").pop();

    const customer = customers.find(
      (customer) => customer.id === id
    );

    config.adapter = async () => {
      return {
        data: customer,
        status: customer ? 200 : 404,
        statusText: customer ? "OK" : "Not Found",
        headers: {},
        config,
      };
    };
  }

  return config;
});

export default api;