import { Injectable } from "@angular/core";
import { ShoopingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from './order.model';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";


@Injectable()
export class OrderService {

    constructor(private cartService: ShoopingCartService, private http: HttpClient) {}

    itensValue(): number {
        return this.cartService.total();
      }

    cartItens(): CartItem[] {
        return this.cartService.itens
    }

    increaseQty(item: CartItem) {
        return this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        return this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    clear() {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                               .map(order => order.id)
    }
}