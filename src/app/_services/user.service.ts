import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

    private static getAllUserURL = `${environment.apiURL}/users/list-user`;
    private static getUserURL = `${environment.apiURL}/users/single-user`;
    private static addUserURL = `${environment.apiURL}/users/add-user`;
    private static updateUserURL = `${environment.apiURL}/users/update-user`;
    private static deleteUserURL = `${environment.apiURL}/users/delete-user`;

  constructor(private http: HttpClient) {

  }

  getUserList() {
    return this.http.get<any>(UsersService.getAllUserURL);
  }

  getUser(id: string) {
    return this.http.get<any>(`${UsersService.getUserURL}/${id}`);
  }

  addUser(user) {
    return this.http.post<any>(UsersService.addUserURL, user);
  }

  updateUser(user, id) {
    user._id = id;
    return this.http.put<any>(UsersService.updateUserURL, user);
  }

  deleteUser(id) {
    return this.http.delete<any>(`${UsersService.deleteUserURL}/${id}`);
  }

}
