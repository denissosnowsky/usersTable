import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { OrderResponse, ResponseUsersType } from "../types/types";
import { StateType } from "./store";

const SET_USERS = "SET_USERS";
const IS_FETCHED = "IS_FETCHED";
const SET_PAGINATION_USERS = "SET_PAGINATION_USERS";
const SET_STATE_FILTER = "SET_STATE_FILTER";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_FILTERED_USERS = "SET_FILTERED_USERS";
const SET_PAGE = "SET_PAGE";
const SET_STATES = "SET_STATES";
const SET_ORDER = "SET_ORDER";
const CHOSEN_ORDER = "CHOSEN_ORDER";

export type initialStateType = {
  usersData: Array<ResponseUsersType>;
  isDataFetched: boolean;
  paginatedUsers: Array<ResponseUsersType>;
  filteredUsers: Array<ResponseUsersType>;
  searchValue: string;
  stateValue: string;
  page: number;
  pageSize: number;
  states: Array<string>;
  chosenOrder: OrderResponse | null;
};

const initialState = {
  usersData: [],
  isDataFetched: false,
  paginatedUsers: [],
  filteredUsers: [],
  searchValue: "",
  stateValue: "",
  page: 1,
  pageSize: 20,
  states: [],
  chosenOrder: null,
};

export type ActionsType =
  | IsFetchedACType
  | SetUsersACType
  | SetPaginationUsersACType
  | SetStateFilterACType
  | SetSearchFilterACType
  | SetFilteredUsersACType
  | SetPageACType
  | SetStatesACType
  | SetOrderACType
  | SetChosenOrderACType;

const reducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        usersData: action.data,
      };
    case IS_FETCHED:
      return {
        ...state,
        isDataFetched: true,
      };
    case SET_PAGINATION_USERS:
      let skip = (state.page - 1) * state.pageSize;
      return {
        ...state,
        paginatedUsers: state.filteredUsers?.slice(skip, skip + state.pageSize),
      };
    case SET_STATE_FILTER:
      return {
        ...state,
        stateValue: action.data,
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchValue: action.data,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.data,
      };
    case SET_STATES:
      return {
        ...state,
        states: action.data,
      };
    case CHOSEN_ORDER:
      return {
        ...state,
        chosenOrder: action.data,
      };
    case SET_FILTERED_USERS:
      let filteredUsers: Array<ResponseUsersType> = [...state.usersData]
        .filter((item) =>
          state.stateValue
            ? item.adress.state.toLowerCase() === state.stateValue.toLowerCase()
            : true
        )
        .filter((item) =>
          state.searchValue
            ? item.firstName
                .toLowerCase()
                .includes(state.searchValue.toLowerCase()) ||
              item.lastName
                .toLowerCase()
                .includes(state.searchValue.toLowerCase())
            : true
        );
      return {
        ...state,
        filteredUsers,
      };
    case SET_ORDER:
      return {
        ...state,
        filteredUsers:
          action.data === "id_order_asc"
            ? state.filteredUsers.sort((a, b) => a.id - b.id)
            : action.data === "id_order_des"
            ? state.filteredUsers.sort((a, b) => b.id - a.id)
            : action.data === "fName_order_asc"
            ? state.filteredUsers.sort((a, b) =>
                a.firstName > b.firstName
                  ? 1
                  : a.firstName < b.firstName
                  ? -1
                  : 0
              )
            : action.data === "fName_order_des"
            ? state.filteredUsers.sort((a, b) =>
                a.firstName > b.firstName
                  ? -1
                  : a.firstName < b.firstName
                  ? 1
                  : 0
              )
            : action.data === "lName_order_asc"
            ? state.filteredUsers.sort((a, b) =>
                a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0
              )
            : action.data === "lName_order_des"
            ? state.filteredUsers.sort((a, b) =>
                a.lastName > b.lastName ? -1 : a.lastName < b.lastName ? 1 : 0
              )
            : action.data === "email_order_asc"
            ? state.filteredUsers.sort((a, b) =>
                a.email > b.email ? 1 : a.email < b.email ? -1 : 0
              )
            : action.data === "email_order_des"
            ? state.filteredUsers.sort((a, b) =>
                a.email > b.email ? -1 : a.email < b.email ? 1 : 0
              )
            : action.data === "phone_order_asc"
            ? state.filteredUsers.sort((a, b) =>
                a.phone > b.phone ? 1 : a.phone < b.phone ? -1 : 0
              )
            : action.data === "phone_order_des"
            ? state.filteredUsers.sort((a, b) =>
                a.phone > b.phone ? -1 : a.phone < b.phone ? 1 : 0
              )
            : action.data === "state_order_asc"
            ? state.filteredUsers.sort((a, b) =>
                a.adress.state > b.adress.state
                  ? 1
                  : a.adress.state < b.adress.state
                  ? -1
                  : 0
              )
            : action.data === "state_order_des"
            ? state.filteredUsers.sort((a, b) =>
                a.adress.state > b.adress.state
                  ? -1
                  : a.adress.state < b.adress.state
                  ? 1
                  : 0
              )
            : state.filteredUsers,
      };
    default:
      return state;
  }
};

type IsFetchedACType = {
  type: typeof IS_FETCHED;
};
export const isFetchedAC = (): IsFetchedACType => {
  return { type: IS_FETCHED };
};

type SetUsersACType = {
  type: typeof SET_USERS;
  data: Array<ResponseUsersType>;
};
export const setUsersAC = (data: Array<ResponseUsersType>): SetUsersACType => {
  return { type: SET_USERS, data };
};

type SetFilteredUsersACType = {
  type: typeof SET_FILTERED_USERS;
};
export const setFilteredUsersAC = (): SetFilteredUsersACType => {
  return { type: SET_FILTERED_USERS };
};

type SetPaginationUsersACType = {
  type: typeof SET_PAGINATION_USERS;
};
export const SetPaginationUsersAC = (): SetPaginationUsersACType => {
  return {
    type: SET_PAGINATION_USERS,
  };
};

type SetStateFilterACType = {
  type: typeof SET_STATE_FILTER;
  data: string;
};
export const setStateFilterAC = (data: string): SetStateFilterACType => {
  return {
    type: SET_STATE_FILTER,
    data,
  };
};

type SetSearchFilterACType = {
  type: typeof SET_SEARCH_FILTER;
  data: string;
};
export const SetSearchFilterAC = (data: string): SetSearchFilterACType => {
  return {
    type: SET_SEARCH_FILTER,
    data,
  };
};

type SetPageACType = {
  type: typeof SET_PAGE;
  data: number;
};
export const setPageAC = (data: number): SetPageACType => {
  return {
    type: SET_PAGE,
    data,
  };
};

type SetStatesACType = {
  type: typeof SET_STATES;
  data: Array<string>;
};
export const setStatesAC = (data: Array<string>): SetStatesACType => {
  return {
    type: SET_STATES,
    data,
  };
};

type SetOrderACType = {
  type: typeof SET_ORDER;
  data: OrderResponse;
};
export const setOrderAC = (data: OrderResponse): SetOrderACType => {
  return {
    type: SET_ORDER,
    data,
  };
};

type SetChosenOrderACType = {
  type: typeof CHOSEN_ORDER;
  data: OrderResponse;
};
export const setChosenOrder = (data: OrderResponse): SetChosenOrderACType => {
  return {
    type: CHOSEN_ORDER,
    data,
  };
};

export const setPageThunk =
  (data: number = 1): ThunkAction<void, StateType, unknown, ActionsType> =>
  (dispatch) => {
    dispatch(setPageAC(data));
    dispatch(SetPaginationUsersAC());
  };

export const setUsersThunk =
  (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    try {
      const res = await usersAPI.getUsers();
      dispatch(setUsersAC(res));
      dispatch(setFilteredUsersAC());
      dispatch(SetPaginationUsersAC());
      const states: Array<string> = [];
      res.forEach((item) => {
        states.indexOf(item.adress.state) === -1 &&
          states.push(item.adress.state);
      });
      dispatch(setStatesAC(states));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(isFetchedAC());
    }
  };

export const setStateFilterThunk =
  (state: string): ThunkAction<void, StateType, unknown, ActionsType> =>
  (dispatch) => {
    dispatch(setStateFilterAC(state));
    dispatch(setFilteredUsersAC());
    dispatch(setPageThunk());
  };

export const setSearchFilterThunk =
  (search: string): ThunkAction<void, StateType, unknown, ActionsType> =>
  (dispatch) => {
    dispatch(SetSearchFilterAC(search));
    dispatch(setFilteredUsersAC());
    dispatch(setPageThunk());
  };

export const setOrderThunk =
  (data: OrderResponse): ThunkAction<void, StateType, unknown, ActionsType> =>
  (dispatch) => {
    debugger;
    dispatch(setOrderAC(data));
    dispatch(setPageThunk());
    dispatch(setChosenOrder(data));
  };

export default reducer;
