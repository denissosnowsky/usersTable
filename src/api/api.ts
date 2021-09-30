import axios from "axios";
import { ResponseUsersType } from "../types/types";

export const usersAPI = {
  async getUsers() {
    const res = await axios.get<Array<ResponseUsersType>>(
      "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json"
    );

    return res.data;
  },
};
