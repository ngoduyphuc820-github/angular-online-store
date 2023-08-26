import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  fullName: string = '';
  totalPrice: number = 0;
  formValue: any;
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}
  ngOnInit() {
    this.productService.formValue.subscribe((value) => {
      this.fullName = value.fullName;
      this.totalPrice = value.totalPrice;
    });
  }

  backtoHomePage() {
    this.router.navigate(['']);
  }
}
