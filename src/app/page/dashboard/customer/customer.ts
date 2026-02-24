import { CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [CommonModule,FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
customerList: Array<CustomerModel> = [];
customerObj: CustomerModel = {
    id:"",
    title:"",
    name:"",
    dob:{},  // Changed from {} to ""
    salary:0.0,
    address:"",
    city:"",
    province:"",
    postalCode:""
}
isEditMode: boolean = false;

constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {
}
  ngOnInit(): void {
   this.getAll();
  }

getAll() {
  this.http.get<CustomerModel[]>('http://localhost:8080/customer/getAll').subscribe((data) => {
    console.log(data);
    this.customerList = data;
    this.cdr.detectChanges(); // Trigger change detection after updating the list
  });
}
addCustomer(): void {
  alert("add customer");
  console.log(this.customerObj);
  this.http.post('http://localhost:8080/customer/add',this.customerObj).subscribe(data=>{
    console.log(data);
    if(data){
      Swal.fire({
      title: "Customer Added Successfully!",
      icon: "success",
      draggable: true
      });
    }
    this.clearForm();
    this.getAll();
  })
}

selectCustomer(customer: CustomerModel): void {
  this.customerObj = { ...customer };
  this.isEditMode = true;
  console.log("Selected customer:", this.customerObj);
  // Trigger form to open
  const checkbox = document.getElementById('form-toggle') as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = true;
  }
}

clearForm(): void {
  this.customerObj = {
    id:"",
    title:"",
    name:"",
    dob:{},
    salary:0.0,
    address:"",
    city:"",
    province:"",
    postalCode:""
  };
  this.isEditMode = false;
}

updateCustomer(): void {
  alert("update customer");
  console.log(this.customerObj);
  this.http.put('http://localhost:8080/customer/update',this.customerObj).subscribe(data=>{
    if(data){
      Swal.fire({
      title: "Customer Updated Successfully!",
      icon: "success",
      draggable: true
      });
    }
    this.clearForm();
    // Close form after update
    const checkbox = document.getElementById('form-toggle') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
    this.getAll();
  })
}

deleteCustomer(customerId: String, customerName: String): void {
  Swal.fire({
    title: "Delete Customer?",
    text: `Are you sure you want to delete ${customerName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#95a5a6",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    draggable: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`http://localhost:8080/customer/delete/${customerId}`).subscribe(
        (data) => {
          console.log("Delete response:", data);
          Swal.fire({
            title: "Deleted!",
            text: "Customer has been deleted successfully.",
            icon: "success",
            draggable: true
          });
          this.getAll();
        },
        (error) => {
          console.error("Delete error:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete customer. Please try again.",
            icon: "error",
            draggable: true
          });
        }
      );
    }
  });
}
}