import {IUserState} from "../state/user.state";

export interface ILoginUserAction {
  user: IUserState;
}

export class LoginUserAction {
  static readonly type = '[User] Login';
  constructor(public user: IUserState) {}
}
