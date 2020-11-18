import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from 'src/app/Models/orderitem';
import { OrderService } from 'src/app/Services/order.service';
import { NgForm } from '@angular/forms';
import { Phone } from 'src/app/Models/Phone';


@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styles: []
})
export class OrderitemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Phone[];
  isValid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderitemsComponent>,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getItemList().then(res => this.itemList = res as Phone[]);
    if (this.data.orderItemIndex == null) {
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      };
    } else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].phonePrice;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].phoneName;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItems.push(form.value);
      } else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID === 0) {
      this.isValid = false;
    } else if (formData.Quantity === 0) {
      this.isValid = false;
 }
    return this.isValid;
  }

}
