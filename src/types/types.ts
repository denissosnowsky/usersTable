import { CombinedState } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionsType, initialStateType } from "../redux/reducer";

export type ResponseUsersType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
};

export type AscOrderResponse = [
  "id_order_asc",
  "fName_order_asc",
  "lName_order_asc",
  "email_order_asc",
  "phone_order_asc",
  "state_order_asc"
];

export type OrderResponse =
  | "id_order_asc"
  | "fName_order_asc"
  | "lName_order_asc"
  | "email_order_asc"
  | "phone_order_asc"
  | "state_order_asc"
  | "id_order_des"
  | "fName_order_des"
  | "lName_order_des"
  | "email_order_des"
  | "phone_order_des"
  | "state_order_des";

export type ThunkAC = ThunkAction<
  void,
  CombinedState<{
    reducer: initialStateType;
  }>,
  unknown,
  ActionsType
>;

export type ClbsObjectsType = {
  clb1: () => ThunkAC;
  clb2: () => ThunkAC;
  clb3: () => ThunkAC;
  clb4: () => ThunkAC;
  clb5: () => ThunkAC;
  clb6: () => ThunkAC;
};

export type AscOrderObjectsType = {
  ascOrder1: "id_order_asc";
  ascOrder2: "fName_order_asc";
  ascOrder3: "lName_order_asc";
  ascOrder4: "email_order_asc";
  ascOrder5: "phone_order_asc";
  ascOrder6: "state_order_asc";
};

export type ClbAndAscOrderArrType = Array<
  ClbsObjectsType | AscOrderObjectsType
>;
