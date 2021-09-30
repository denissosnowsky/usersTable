import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import s from "./App.module.css";
import Container from "./components/Container/Container";
import FilterBtn from "./components/FilterBtn/FilterBtn";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import Row from "./components/Row/Row";
import SearchInput from "./components/SearchInput/SearchInput";
import Table from "./components/Table/Table";
import { headers } from "./data/headers";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderAC,
  setOrderThunk,
  setPageThunk,
  setSearchFilterThunk,
  setStateFilterThunk,
  setUsersThunk,
} from "./redux/reducer";
import { StateType } from "./redux/store";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { ClbAndAscOrderArrType, ResponseUsersType } from "./types/types";

function App() {
  const [chosenUser, setChosenUser] = useState<ResponseUsersType | null>(null);

  const dispatch = useDispatch();
  const users = useSelector((state: StateType) => state.reducer.paginatedUsers);
  const usersCount = useSelector(
    (state: StateType) => state.reducer.filteredUsers.length
  );
  const isDataFetched = useSelector(
    (state: StateType) => state.reducer.isDataFetched
  );
  const searchValue = useSelector(
    (state: StateType) => state.reducer.searchValue
  );
  const stateValue = useSelector(
    (state: StateType) => state.reducer.stateValue
  );
  const page = useSelector((state: StateType) => state.reducer.page);
  const pageSize = useSelector((state: StateType) => state.reducer.pageSize);
  const states = useSelector((state: StateType) => state.reducer.states);
  const chosenOrder = useSelector(
    (state: StateType) => state.reducer.chosenOrder
  );

  useEffect(() => {
    dispatch(setUsersThunk());
  }, [dispatch]);

  const handleSetPage = (p: number) => {
    dispatch(setPageThunk(p));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchInput = (arg: string) => {
    dispatch(setSearchFilterThunk(arg));
  };

  const handleStateBtn = (arg: string) => {
    dispatch(setStateFilterThunk(arg));
  };

  const clbsArray: ClbAndAscOrderArrType = useMemo(
    () => [
      {
        clb1:
          chosenOrder === "id_order_asc"
            ? () => dispatch(setOrderThunk("id_order_des"))
            : () => dispatch(setOrderThunk("id_order_asc")),
        clb2:
          chosenOrder === "fName_order_asc"
            ? () => dispatch(setOrderThunk("fName_order_des"))
            : () => dispatch(setOrderThunk("fName_order_asc")),
        clb3:
          chosenOrder === "lName_order_asc"
            ? () => dispatch(setOrderThunk("lName_order_des"))
            : () => dispatch(setOrderThunk("lName_order_asc")),
        clb4:
          chosenOrder === "email_order_asc"
            ? () => dispatch(setOrderThunk("email_order_des"))
            : () => dispatch(setOrderThunk("email_order_asc")),
        clb5:
          chosenOrder === "phone_order_asc"
            ? () => dispatch(setOrderThunk("phone_order_des"))
            : () => dispatch(setOrderThunk("phone_order_asc")),
        clb6:
          chosenOrder === "state_order_asc"
            ? () => dispatch(setOrderThunk("state_order_des"))
            : () => dispatch(setOrderThunk("state_order_asc")),
      },
      {
        ascOrder1: "id_order_asc",
        ascOrder2: "fName_order_asc",
        ascOrder3: "lName_order_asc",
        ascOrder4: "email_order_asc",
        ascOrder5: "phone_order_asc",
        ascOrder6: "state_order_asc",
      },
    ],
    [chosenOrder, dispatch]
  );

  if (!isDataFetched) return <Loading />;

  return (
    <Container>
      <Header />
      <Row
        alignItems={"center"}
        justifyContent={"space-between"}
        className={s.filterBtns}
      >
        <SearchInput extValue={searchValue} extSetValue={handleSearchInput} />
        <FilterBtn
          data={states}
          extValue={stateValue}
          extSetValue={handleStateBtn}
        />
      </Row>
      <Row>
        <Table
          headers={headers}
          users={users}
          extMutation={setChosenUser}
          clbsArray={clbsArray}
          chosenOrder={chosenOrder}
        />
      </Row>
      <Row justifyContent="end">
        <Pagination
          page={page}
          setPage={handleSetPage}
          pageSize={pageSize}
          allCount={usersCount}
        />
      </Row>
      {chosenUser && (
        <Row justifyContent="center">
          <InfoBlock data={chosenUser} />
        </Row>
      )}
      <Footer />
    </Container>
  );
}

export default App;
