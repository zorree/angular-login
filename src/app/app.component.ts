import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEST XTEN API LOGIN';
  username: any
  password: any
  data:any

  url = 'http://103.13.231.185:8080/api/v1/test_login/'

  constructor(
    private http: HttpClient
  ) { }

  onClick() {
    // console.log(this.username)
    // console.log(this.password)

    let D:any

    this.http.post(this.url, {
      "username": this.username,
      "password": this.password
    }).subscribe(
      data => {
        D = data
        console.log(D["meta"])
        this.data = JSON.stringify(D["meta"])
        this.successNotification(data)
      }
    )
  }

  successNotification(data:any) {
    if(data["meta"]["response_code"] == 20000){
      Swal.fire(data["meta"]["response_data"],data["meta"]["response_datetime"], 'success');
    } else if (data["meta"]["response_code"] == 40001){
      Swal.fire(data["meta"]["response_data"],data["meta"]["response_datetime"], 'error');
    } else {
      Swal.fire(data["meta"]["response_desc"],data["meta"]["response_datetime"], 'warning');
    }
    
  }

}
