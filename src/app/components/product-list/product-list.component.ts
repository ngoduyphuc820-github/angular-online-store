import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product.models';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  subcriptions: Subscription[] = [];
  productList: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subcriptions.push(
      this.productService.getProductList().subscribe((res) => {
        console.log('product: ', res);
        this.productList = res || [];
      }),
    );
  }

  ngOnDestroy() {
    this.subcriptions.forEach((subcription) => {
      subcription.unsubscribe();
    });
  }
}
