import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Product } from 'src/models/product.models';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product;
  constructor(
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService,
  ) {
    this.product = {};
  }
  quantities: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
  ];

  quantity: number = 1;
  listCart: Product[] = [];
  ngOnInit() {
    this.productService.cartSubject$.subscribe((cart) => {
      this.listCart = cart;
    });
  }

  addToCart(item: Product, quantity: number) {
    const itemAddtoCart = { ...item, quantity: quantity };
    this.productService.checkItemExist(this.listCart, itemAddtoCart);
    this.productService.cartSubject$.next(this.listCart);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add item success',
    });
  }

  showProductDetail(id: string | undefined) {
    this.router.navigate(['product-items', id]);
  }
}
