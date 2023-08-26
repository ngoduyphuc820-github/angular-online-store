import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/models/product.models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() product: Product = {};
  @Output() onChangeItem = new EventEmitter();
  @Output() onRemoveItem = new EventEmitter();
  quantity: number;
  constructor() {
    this.quantity = 0;
  }

  onChangeQuantity(product: Product) {
    this.onChangeItem.emit(product);
  }

  removeItemCart(product: Product) {
    this.onRemoveItem.emit(product);
  }
}
