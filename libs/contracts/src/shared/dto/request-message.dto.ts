export type RequestMessageDto<T> = {
  data?: T;
  metadata: { token: string };
};
