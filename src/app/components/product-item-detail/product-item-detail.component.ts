import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product.models';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent {
  productList: Product[] = [];
  cart: Product[] = [];
  product: Product = {};
  id: number;
  quantity: number;
  quantities: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
  ];
  subcriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
  ) {
    this.id = 0;
    this.quantity = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.subcriptions.push(
      this.productService
        .getProductList()
        .subscribe((productList: Product[]) => {
          this.productList = productList;
          this.productList.forEach((item: Product) => {
            if (Number(item.id) === this.id) {
              this.product = item;
              return;
            }
          });
        }),
    );

    this.subcriptions.push(
      this.productService.cartSubject$.subscribe((cart: Product[]) => {
        this.cart = cart;
      }),
    );
  }

  addToCart(item: Product, quantity: number) {
    const itemAddtoCart = { ...item, quantity: quantity };
    this.productService.checkItemExist(this.cart, itemAddtoCart);
    this.productService.cartSubject$.next(this.cart);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add product to cart success',
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.subcriptions.forEach((subcription) => {
      subcription.unsubscribe();
    });
  }
}
