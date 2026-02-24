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
isEditMode: boolean = false;

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
        this.clearForm();
        this.getAll();
  })
}

selectItem(item: ItemModel): void {
  this.itemObj = { ...item };
  this.isEditMode = true;
  console.log("Selected item:", this.itemObj);
}

clearForm(): void {
  this.itemObj = {
    itemCode:"",
    description:"",
    unitPrice:0.0,
    qtyOnHand:0
  };
  this.isEditMode = false;
}

deleteItem(itemCode: String, description: String): void {
  Swal.fire({
    title: "Delete Item?",
    text: `Are you sure you want to delete ${description}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#95a5a6",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    draggable: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`http://localhost:8080/item/delete/${itemCode}`).subscribe(
        (data) => {
          console.log("Delete response:", data);
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted successfully.",
            icon: "success",
            draggable: true
          });
          this.getAll();
          this.cdr.detectChanges();
        },
        (error) => {
          console.error("Delete error:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete item. Please try again.",
            icon: "error",
            draggable: true
          });
        }
      );
    }
  });
}
updateItem(): void {
  alert("update items");
  console.log(this.itemObj);
  this.http.put('http://localhost:8080/item/update',this.itemObj).subscribe(data=>{
    if(data){
          Swal.fire({
          title:this.itemObj.description+ " Updated Successfully!",
          icon: "success",
          draggable: true
          });
        }
        this.clearForm();
        this.getAll();
  })
}
}