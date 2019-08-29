import { Component, OnInit } from '@angular/core';
import { RolesService } from '../_services/role.service';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: [];
  roleData: [];
  roleList: []
  addRole: FormGroup;
  editRole: FormGroup;
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
  roleId: string;

  constructor(private rolesService: RolesService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.addRole = this.formBuilder.group({
      roleName: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      roleNumber: this.formBuilder.control(null, [Validators.required, Validators.minLength(1)]),
    });

    this.editRole = this.formBuilder.group({
      roleName: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      roleNumber: this.formBuilder.control(null, [Validators.required, Validators.minLength(1)]),
    });

    this.getRoles();
  }

  getRoles = () => {
    this.rolesService.getRoleList().subscribe((role) => {
      if (role && role !== null) {
        this.roles = role.result;
      }
    });
  }

  saveRole = () => {
    this.submitted = true;

    if (this.addRole.valid) {
      this.rolesService.addRole(this.addRole.value).subscribe((role) => {
        this.isSubmit = true;
        if (role.status) {
          this.submitted = false;
          this.isSubmit = false;
          this.isSuccess = true;
          this.successMessage = role.msg
          this.addRole.reset();
          $('#addModal').modal('hide');
          this.getRoles();
          setTimeout(()=> {
            this.isSuccess = false;
            this.isError = false;
          }, 2000)
        } else {
          this.submitted = false;
          this.isSubmit = false;
          this.isError = true;
          this.errorMessage = role.msg
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

  updateRole = () => {
    this.submitted = true;

    if (this.editRole.valid) {
      this.rolesService.updateRole(this.editRole.value, this.roleId).subscribe((role) => {
        this.isSubmit = true;
        if (role.status) {
          this.submitted = false;
          this.isSubmit = false;
          this.isSuccess = true;
          this.successMessage = role.msg
          this.addRole.reset();
          $('#editModal').modal('hide');
          this.getRoles();
          setTimeout(()=> {
            this.isSuccess = false;
            this.isError = false;
          }, 2000)
        } else {
          this.submitted = false;
          this.isSubmit = false;
          this.isError = true;
          this.errorMessage = role.msg
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

  getSingleRole = (id) => {
    this.rolesService.getRole(id).subscribe((role) => {
      if (role && role !== null) {
        this.roleId = id;
        this.roleData = role.result[0];
        this.editRole.patchValue({
          roleName: this.roleData['roleName'],
          roleNumber: this.roleData['roleNumber'],
        })
      }
    });
  }

  deleteRole = (id) => {
    this.rolesService.deleteRole(id).subscribe((role) => {
      if (role.status) {
        this.isSuccess = true;
        this.successMessage = role.msg
        this.getRoles();
        setTimeout(()=> {
          this.isSuccess = false;
          this.isError = false;
        }, 2000)
      } else {
        this.isError = true;
        this.errorMessage = role.msg
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
