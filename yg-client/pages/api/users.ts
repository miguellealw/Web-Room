import { AxiosResponse } from "axios";
import { Api } from "./api";
import { User } from "../../modules/auth";

export type GetUserResult = {
  kind: string;
  user: User | null;
  error: any;
};

export class UsersApi extends Api {
  // async currentUser(): Promise<GetUserResult> {
  async currentUser() {
    let res: AxiosResponse<any>;

    try {
      res = await this.axios.get("/api/v1.0/users/current_user");
      return { kind: "ok", user: res.data, error: null };
    } catch (err) {
      // return error for swr
      return { kind: "bad-data", user: { isLoggedIn: false }, error: err };
    }
  }
}
