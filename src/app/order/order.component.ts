import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  delivery: number = 8

  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup ({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOptions: this.formBuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation) {
      return undefined
    }

    if(email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }
    return undefined
  }

  itensValue(): number {
    return this.orderService.itensValue();
  }

  cartItens(): CartItem[] {
    return this.orderService.cartItens()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItens = this.cartItens()
                           .map((item: CartItem ) => new OrderItem(item.quantity, item.menuItem.id));

    this.orderService.checkOrder(order)
                     .pipe(
                           tap((orderId: string) => {
                              this.orderId = orderId
                     }))
                    .subscribe((orderId: string) => {
                      this.router.navigate(['/order-summary'])
                      this.orderService.clear()
                    })
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}
