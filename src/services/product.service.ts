import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartSubject$: BehaviorSubject<Product[]> = new BehaviorSubject(<Product[]>[]);
  formValue: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<[]>('./assets/data.json').pipe(
      map((res) => {
        return res || [];
      }),
    );
  }

  checkItemExist(cart: Product[], item: Product) {
    const index = cart.findIndex((itemCard) => itemCard.id === item.id);
    if (index !== -1) {
      cart[index].quantity = item.quantity;
    } else {
      cart.push(item);
    }
  }
}
