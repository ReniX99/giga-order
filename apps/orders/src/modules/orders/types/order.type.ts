export type TCreateOrder = {
  userId: string;

  statusId: number;

  products: TOrderProduct[];
};

export type TOrderProduct = {
  id: number;

  count: number;
};

export type TOrderFilter = {
  status?: string;

  page?: number;

  count?: number;
};
