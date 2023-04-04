import { Injectable } from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {ILoginUserAction, LoginUserAction} from "../actions/loginUser.actions";

export type IUserState = {
  isConnected: boolean;
  firstname: string;
  lastname: string;
  login: string;
  jwt: string;
};

@State<IUserState>({
  name: 'user',
  defaults: { isConnected: false, firstname: "", lastname: "", login: "", jwt: "" }
})
@Injectable()
export class UserState {
  constructor() {}

  @Action(LoginUserAction)
  loginUser(context: StateContext<IUserState>, action: ILoginUserAction) {
    console.log("action.user", action.user)
    context.setState(action.user);
  }
}
