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

export interface ItemListResponse {
  name: string;
  photoUrl: string;
  price: number;
  status: string;
  message: string;
}
