import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CommonModule,FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {
itemList: Array<ItemModel> = [];
itemObj: ItemModel = {
    itemCode:"",
    description:"",
    unitPrice:0.0,
    qtyOnHand:0
}

constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {
}

ngOnInit(): void {
  this.getAll();
}

getAll() {
  this.http.get<ItemModel[]>('http://localhost:8080/item/getAll').subscribe((data) => {
    console.log(data);
    this.itemList = data;
    this.cdr.detectChanges(); // Trigger change detection after updating the list
  });
}
addItem(): void {
  alert("add item");
  console.log(this.itemObj);
  this.http.post('http://localhost:8080/item/add',this.itemObj).subscribe(data=>{
    if(data){
          Swal.fire({
          title:this.itemObj.description+ " Added Successfully!",
          icon: "success",
          draggable: true
          });
        }
        this.getAll();
  })
 
}
}
