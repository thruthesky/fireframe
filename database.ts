import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Xfirebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  constructor(public http: Http) {
    console.log('Hello Xfirebase Provider');
  }


  /**
   * user node structure
   * 
   * 
   */
  register() {}
  updateUser() {}
  resign() {}
  deleteUser() {}
  login() {}
  logout() {}
  getUser() {}
  getUsers() {}
  
  createCategory() {}
  updateCategory() {}
  deleteCategory() {}
  getCategory() {}
  getCategories() {}

  createPost() {}
  updatePost() {}
  deletePost() {}
  getPost() {}
  getPosts() {}

  createComment() {}
  updateComment() {}
  deleteComment() {}
  getComment() {}
  getComments() {}

  uploadFile() {}
  updateFile() {}
  deleteFile() {}
  getFile() {}
  getFiles() {}



  // SNS login. optionanl...
  loginFacebook() {}
  loginGooglePlug() {}
  loginTwitter() {}
  loginGithub() {}

}
