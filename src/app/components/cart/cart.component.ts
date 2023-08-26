import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/models/product.models';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  listCart: Product[] = [];
  totalPrice: number = 0;

  infoOrder = {
    fullName: '',
    address: '',
    creditCard: null,
  };

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.productService.cartSubject$.subscribe((cart) => {
      this.listCart = cart;
      this.totalPrice = +this.listCart
        .reduce((total, item: Product) => {
          return total + Number(item.quantity) * Number(item.price);
        }, 0)
        .toFixed(2);
    });
  }

  handleChangeProduct(product: Product) {
    const index = this.listCart.findIndex(
      (itemCard: Product) => itemCard.id === product.id,
    );

    if (index !== -1 && product.quantity && product.quantity >= 1) {
      this.listCart[index].quantity = product.quantity;
      this.productService.cartSubject$.next([...this.listCart]);
    } else {
      this.totalPrice = 0;
    }
  }

  handleRemoveProduct(product: Product) {
    const listCartNew = this.listCart.filter((cart) => {
      return cart.id !== product.id;
    });

    this.productService.cartSubject$.next(listCartNew);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Remove item success ',
    });
  }

  handleSubmit(formValue: any) {
    this.productService.formValue.next({
      ...formValue,
      totalPrice: this.totalPrice,
    });
    this.listCart = [];
    this.productService.cartSubject$.next([]);
    this.router.navigate(['/confirmation']);
  }
}
