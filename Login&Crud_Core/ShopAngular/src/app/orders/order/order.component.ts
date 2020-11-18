import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { Customer } from 'src/app/Models/Customer';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  isValid = true;

  constructor(public service: OrderService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    const orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null) {
      this.resetForm();
    } else {
      this.service.getOrderByID(Number(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
      });
    }

    this.service.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  resetForm(form?: NgForm) {
    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      payMethod: '',
      grandTotal: 0,
      DeletedOrderItemIDs: ''
    };
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderitemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }


  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null) {
      this.service.formData.DeletedOrderItemIDs += orderItemID + ',';
    }
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.grandTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.grandTotal = parseFloat(this.service.formData.grandTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.CustomerID === 0) {
      this.isValid = false;
    } else if (this.service.orderItems.length === 0) {
      this.isValid = false;
 }
    return this.isValid;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'PhoneApp.');
        this.router.navigate(['/orders']);
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
