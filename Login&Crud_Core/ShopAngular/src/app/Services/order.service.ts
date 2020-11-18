import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './../Models//order';
import { OrderItem } from './../Models/orderitem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    const body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.URL + '/Orders', body);
  }

  getOrderList() {
    return this.http.get(environment.URL + '/Orders').toPromise();
  }

  getOrderByID(id: number): any {
    return this.http.get(environment.URL + '/Orders/' + id).toPromise();
  }

deleteOrder(id: number) {
return this.http.delete(environment.URL + '/Orders/' + id).toPromise();
  }


  getCustomerList() {
    return this.http.get(environment.URL + '/Customers').toPromise();
   }

   getItemList() {
    return this.http.get(environment.URL + '/Phones').toPromise();
   }

}
