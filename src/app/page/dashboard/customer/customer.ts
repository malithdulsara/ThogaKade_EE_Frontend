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
    dob:{},
    salary:0.0,
    address:"",
    city:"",
    province:"",
    postalCode:""
}

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
    this.getAll();
  })
}
}
