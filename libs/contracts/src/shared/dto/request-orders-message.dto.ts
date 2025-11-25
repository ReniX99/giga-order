export type RequestOrdersMessageDto<T> = {
  data?: T;
  metadata: {
    user: {
      id: string;
      roles: string[];
    };
  };
};
