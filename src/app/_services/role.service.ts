import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RolesService {

    private static getAllRoleURL = `${environment.apiURL}/roles/list-role`;
    private static getRoleURL = `${environment.apiURL}/roles/single-role`;
    private static addRoleURL = `${environment.apiURL}/roles/add-role`;
    private static updateRoleURL = `${environment.apiURL}/roles/update-role`;
    private static deleteRoleURL = `${environment.apiURL}/roles/delete-role`;

  constructor(private http: HttpClient) {

  }

  getRoleList() {
    return this.http.get<any>(RolesService.getAllRoleURL);
  }

  getRole(id: string) {
    return this.http.get<any>(`${RolesService.getRoleURL}/${id}`);
  }

  addRole(role) {
    return this.http.post<any>(RolesService.addRoleURL, role);
  }

  updateRole(role, id) {
    role._id = id;
    return this.http.put<any>(RolesService.updateRoleURL, role);
  }

  deleteRole(id) {
    return this.http.delete<any>(`${RolesService.deleteRoleURL}/${id}`);
  }

}
