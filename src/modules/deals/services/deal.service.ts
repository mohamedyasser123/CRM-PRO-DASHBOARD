import { customers } from "../../../database/customers";
import { deals } from "../../../database/deals";
import type { Deal } from "../types/deal";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const getCustomerInfo = (customerId: string) => {
  const customer = customers.find(
    (customer) => customer.id === customerId
  );

  return {
    customerName: customer?.fullName ?? "Unknown Customer",
    companyName: customer?.companyName ?? "Unknown Company",
  };
};

export interface GetDealsParams {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  priority?: string;
  customerId?: string;
  sortBy?: "title" | "value" | "probability" | "expectedCloseDate";
  order?: "asc" | "desc";
}

class DealService {
  async getDeals({
    page = 1,
    limit = 10,
    search = "",
    stage = "",
    priority = "",
    customerId = "",
    sortBy = "expectedCloseDate",
    order = "desc",
  }: GetDealsParams = {}) {
    await delay(700);

    let data = [...deals];

    // Search
   if (search.trim()) {
  const keyword = search.toLowerCase();

  data = data.filter((deal) => {
    const customerName = getCustomerInfo(deal.customerId);

    return (
      deal.title.toLowerCase().includes(keyword) ||
      customerName.customerName.toLowerCase().includes(keyword)
    );
  });
}

    // Filter by Stage
    if (stage) {
      data = data.filter((deal) => deal.stage === stage);
    }

  

const result = data.map((deal) => ({
  ...deal,
  ...getCustomerInfo(deal.customerId),
}));

  const totalCount = result.length;

const start = (page - 1) * limit;
const end = start + limit;

const paginatedData = result.slice(start, end);

return {
  data: paginatedData,
  totalCount,
  currentPage: page,
  totalPages: Math.ceil(totalCount / limit),
};
  }

  async getDealById(id: string) {
    await delay(500);

    const deal = deals.find((deal) => deal.id === id);

    if (!deal) {
      throw new Error("Deal not found");
    }

    return deal;
  }

 async createDeal(newDeal: Omit<Deal, "id">) {
  await delay(700);

  const deal: Deal = {
    id: `DEAL-${String(deals.length + 1).padStart(4, "0")}`,
    ...newDeal,
  };

  deals.unshift(deal);

  return deal;
}

  async updateDeal(
    id: string,
    updatedData: Partial<Deal>
  ) {
    await delay(700);

    const index = deals.findIndex((deal) => deal.id === id);

    if (index === -1) {
      throw new Error("Deal not found");
    }

    deals[index] = {
      ...deals[index],
      ...updatedData,
    };

    return deals[index];
  }

  async deleteDeal(id: string) {
    await delay(700);

    const index = deals.findIndex((deal) => deal.id === id);

    if (index === -1) {
      throw new Error("Deal not found");
    }

    const deletedDeal = deals[index];

    deals.splice(index, 1);

    return {
      success: true,
      message: "Deal deleted successfully",
      data: deletedDeal,
    };
  }
}

export const dealService = new DealService();