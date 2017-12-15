import {HttpHeaders} from "@angular/common/http";

export const apiUrl: string = 'http://localhost:3000/api/';

var initial_url = window.location + "";
var url = initial_url.split('/');
var path = url[url.length - 1];
export const pathName: string = path;
/*export const pathName: string =
  (window.location + "").split('/')[(window.location + "").split('/').length - 1];*/

export const deleteSwalOpts: any = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
};
