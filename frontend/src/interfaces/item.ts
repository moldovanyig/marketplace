export interface ItemRequest {
  title: string;
  description: string;
  photoUrl: string;
  price: number;
}

export interface ItemResponse {
  message: string;
  status?: string;
}
