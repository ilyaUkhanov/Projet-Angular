import { Component, Input, OnInit  } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {LoginUserAction} from "../../actions/loginUser.actions";
import {IUserState} from "../../state/user.state";

type IUserLogin = {
  login: string;
  password: string;
}

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  public FormIdentification: FormGroup;
  public data: IUserLogin|null = null;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private store: Store) {
    this.FormIdentification = this.formBuilder.group({
      login: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  submit () {
    this.data = this.FormIdentification.value;
    this.login(this.data ?? { login: "", password: "" });
  }

  async login(data: IUserLogin): Promise<Observable<HttpResponse<any>>> {
    try {
      const observable = this.http.post<IUserState>('https://tp05-ukhanov-ilya.onrender.com', JSON.stringify(data), {observe: 'response'});

      observable.subscribe((response) => {
        console.log("response.headers", response.headers)

          const authHeader = response.headers.get('Authorization');
          console.log("authHeader", authHeader);

          const user: IUserState = {
            login: data.login,
            isConnected: true,
            jwt: authHeader ?? "",
            lastname: response?.body?.lastname ?? "",
            firstname: response?.body?.firstname ?? ""
          }

          console.log("user", user);
          this.store.dispatch(new LoginUserAction(user))
        });

      return Promise.resolve(observable);
    } catch (error) {
      return Promise.reject();
    }
  }

  ngOnInit() {
  }
}
