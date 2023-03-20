import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { crudService } from 'src/services/crudService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myapp';
  form!: FormGroup;
  userList:any;
  isedit = false;
  userId:any;
  constructor(private fb: FormBuilder,private crudservice: crudService) {}

  ngOnInit() { 
    this.form = this.fb.group({
        firstName: new FormControl(null),
        lastName: new FormControl(null)
    })
    this.getData();
  }
  
  submit() {
    console.log("form",this.form)
    const payload = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
    }
    this.crudservice.UserData(payload).subscribe((data) =>{
      console.log("data",data)
      if(data) {
        this.getData()
        this.form.reset();
      }
    })
  }

  delete(id:any) {
    this.crudservice.deleteUser(id).subscribe((data) =>{
      console.log("data",data)
    })
  }

  getData() {
    this.crudservice.getData().subscribe((data) =>{
      this.userList = data;
    })
  }

  update(user:any) {
    this.form.get('firstName')?.setValue(user.firstName);
    this.form.get('lastName')?.setValue(user.lastName);
    this.isedit = true;
    this.userId = user.id;
  }

  updateUser() { 
    const payload = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
    }
    this.crudservice.updateData(this.userId,payload).subscribe((data) =>{
      console.log("data",data)
      if(data) {
        this.getData()
        this.form.reset();
        this.isedit = false;
      }
    })
  }
}
