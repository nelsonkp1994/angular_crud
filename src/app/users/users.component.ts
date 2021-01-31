import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: object;
  usersList: any;
  firstname: any;
  name: any;
  address: any;
  phone: any;
  email: any;
  userId: any;
  btnText = "ADD";

  userData = new FormGroup({
    firstname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private user: UserService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.userData = this.fb.group({
      firstname: [''],
      address: [''],
      phone: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  get f() {
    return this.userData.controls;
  }

  getUserInfo(d) {
    this.btnText = "UPDATE";
    this.userId = d.id;
    const body = new URLSearchParams();
    body.set('id', this.userId);
    this.user.getUserInfo(body).subscribe(res => {
      if (res.success) {
        this.name = res.response.name;
        this.address = res.response.address;
        this.phone = res.response.phone;
        this.email = res.response.email;
        this.f.firstname.setValue(this.name);
        this.f.address.setValue(this.address);
        this.f.phone.setValue(this.phone);
        this.f.email.setValue(this.email);
      } else {
        const message = res.response;
        this.toastr.info(message);
      }
    });
  }

  getUsers() {
    this.user.getUsersList().subscribe(res => {
      if (res.success) {
        this.usersList = res.response;
      } else {
        this.usersList = [];
        const message = res.response;
        this.toastr.info(message);
      }
    });
  }

  onSubmit() {
    const insertData = {
      name: this.f.firstname.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
    };
    if (this.userId) {
      const body = new URLSearchParams();
      body.set('id', this.userId);
      body.set('name', insertData.name);
      body.set('address', insertData.address);
      body.set('phone', insertData.phone);
      body.set('email', insertData.email);
      this.user.updateUserData(body).subscribe(res => {
        if (res.success) {
          const message = res.response;
          this.toastr.success(message);
        } else {
          const message = res.response;
          this.toastr.info(message);
        }
      });
    } else {
      const body = new URLSearchParams();
      body.set('name', insertData.name);
      body.set('address', insertData.address);
      body.set('phone', insertData.phone);
      body.set('email', insertData.email);
      this.user.addUserData(body).subscribe(res => {
        if (res.success) {
          const message = res.response;
          this.toastr.success(message);
        } else {
          const message = res.response;
          this.toastr.info(message);
        }
      });
    }

  }

  clearFn(){
    this.btnText = "ADD";
    this.userData.reset();
  }

  deleteUser(d){
    this.userId = d.id;
    const body = new URLSearchParams();
    body.set('id', this.userId);
    this.user.deleteUserData(body).subscribe(res => {
      if (res.success) {
        this.ngOnInit();
        const message = res.response;
        this.toastr.success(message);
      } else {
        const message = res.response;
        this.toastr.info(message);
      }
    });
  }

}
