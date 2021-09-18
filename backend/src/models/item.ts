export interface ItemPostRequest {
  title: string;
  description: string;
  photoUrl: string;
  price: number;
}

export interface ItemPostResponse {
  status: string;
  message: string;
}

export interface Item {
  item_id: number;
  price: number;
  sellable: number;
  user_id: number;
}

export interface ListItems {
  title: string;
  description: string;
  priceLowerThan: number;
  priceGreaterThan: number;
}

export interface ListResponse {
  name: string;
  photo_url: string;
  price: number;
}

export interface ItemId {
  id: number;
}

export interface ResponseItem {
  title: string;
  description: string;
  photo_url: string;
  price: number;
  buyers_name: string;
  name: string;
  avatar: number;
}
