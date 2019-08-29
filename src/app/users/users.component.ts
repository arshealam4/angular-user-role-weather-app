import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/user.service';
import { RolesService } from '../_services/role.service';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: [];
  userData: [];
  roleList: []
  addUser: FormGroup;
  editUser: FormGroup;
  isSubmit = false;
  submitted = false;
  isSuccess = false;
  isError = false;
  genderList = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'}
  ]
  successMessage = ''
  errorMessage = ''
  userId: string;

  constructor(private usersService: UsersService,
    private rolesService: RolesService,
    public formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.addUser = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      gender: this.formBuilder.control(null, [Validators.required]),
      roleId: this.formBuilder.control(null, [Validators.required]),
    });

    this.editUser = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      gender: this.formBuilder.control(null, [Validators.required]),
      roleId: this.formBuilder.control(null, [Validators.required]),
    });

    this.getUsers();
    this.getRoles();
  }

  getUsers = () => {
    this.usersService.getUserList().subscribe((user) => {
      if (user && user !== null) {
        this.users = user.result;
      }
    });
  }

  getRoles = () => {
    this.rolesService.getRoleList().subscribe((role) => {
      if (role && role !== null) {
        this.roleList = role.result;
      }
    });
  }

  saveUser = () => {
    this.submitted = true;

    if (this.addUser.valid) {
      this.usersService.addUser(this.addUser.value).subscribe((user) => {
        this.isSubmit = true;
        if (user.status) {
          this.submitted = false;
          this.isSubmit = false;
          this.isSuccess = true;
          this.successMessage = user.msg
          this.addUser.reset();
          $('#addModal').modal('hide');
          this.getUsers();
          setTimeout(()=> {
            this.isSuccess = false;
            this.isError = false;
          }, 2000)
        } else {
          this.submitted = false;
          this.isSubmit = false;
          this.isError = true;
          this.errorMessage = user.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
        }
      }, (error) => {
        this.submitted = false;
        this.isSubmit = false;
        this.isError = true;
        this.errorMessage = error.error.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
      });
    }
  }

  updateUser = () => {
    this.submitted = true;

    if (this.editUser.valid) {
      this.usersService.updateUser(this.editUser.value, this.userId).subscribe((user) => {
        this.isSubmit = true;
        if (user.status) {
          this.submitted = false;
          this.isSubmit = false;
          this.isSuccess = true;
          this.successMessage = user.msg
          this.addUser.reset();
          $('#editModal').modal('hide');
          this.getUsers();
          setTimeout(()=> {
            this.isSuccess = false;
            this.isError = false;
          }, 2000)
        } else {
          this.submitted = false;
          this.isSubmit = false;
          this.isError = true;
          this.errorMessage = user.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
        }
      }, (error) => {
        this.submitted = false;
        this.isSubmit = false;
        this.isError = true;
        this.errorMessage = error.error.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
      });
    }
  }

  getSingleUser = (id) => {
    this.usersService.getUser(id).subscribe((user) => {
      if (user && user !== null) {
        this.userId = id;
        this.userData = user.result[0];
        this.editUser.patchValue({
          userName: this.userData['userName'],
          email: this.userData['email'],
          gender: this.userData['gender'],
          roleId: this.userData['roleId']._id,
        })
      }
    });
  }

  deleteUser = (id) => {
    this.usersService.deleteUser(id).subscribe((user) => {
      if (user.status) {
        this.isSuccess = true;
        this.successMessage = user.msg
        this.getUsers();
        setTimeout(()=> {
          this.isSuccess = false;
          this.isError = false;
        }, 2000)
      } else {
        this.isError = true;
        this.errorMessage = user.msg
        setTimeout(()=> {
          this.isError = false;
          this.isSuccess = false;
        }, 2000)
      }
    }, (error) => {
      this.isSubmit = false;
      this.isError = true;
      this.errorMessage = error.error.msg
        setTimeout(()=> {
          this.isError = false;
          this.isSuccess = false;
        }, 2000)
    });
  }

}
