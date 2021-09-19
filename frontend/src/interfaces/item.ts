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
  title: string;
  description: string;
  photo_url: string;
  price: number;
  buyers_name: string;
  avatar: number;
  status: string;
  message: string;
}
