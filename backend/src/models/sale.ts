export interface SaleRequest {
  title: string;
  description: string;
  photo_url: string;
  price: number;
}

export interface SaleResponse {
  status: string;
  message?: string;
}
