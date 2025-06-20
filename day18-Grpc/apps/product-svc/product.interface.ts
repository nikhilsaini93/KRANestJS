import { Observable } from "rxjs";

export interface ProductRequest {
  id: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
}

export interface ProductService {
  getProduct(data: ProductRequest): Observable<ProductResponse>;
}
