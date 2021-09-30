import s from "./Table.module.css";
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import {
  ClbAndAscOrderArrType,
  OrderResponse,
  ResponseUsersType,
  ThunkAC,
} from "../../types/types";
import { useMemo } from "react";

interface TablePropsType {
  headers: Array<string>;
  users: Array<ResponseUsersType>;
  extMutation?: (arg: ResponseUsersType) => void;
  clbsArray?: ClbAndAscOrderArrType;
  chosenOrder?: OrderResponse | null;
}

const Table: React.FC<TablePropsType> = ({
  headers,
  users,
  extMutation,
  clbsArray,
  chosenOrder,
}) => {
  const clbsObjectArray: Array<() => ThunkAC> | undefined = useMemo(() => {
    return clbsArray && Object.values(clbsArray[0]);
  }, [clbsArray]);
  const ascOrdersObjectArray: Array<string> | undefined = useMemo(() => {
    return clbsArray && Object.values(clbsArray[1]);
  }, [clbsArray]);

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {headers.map((item, i) => (
            <TableHeader
              header={item}
              key={i}
              extMutation={clbsObjectArray && clbsObjectArray[i]}
              chosenOrder={chosenOrder && chosenOrder}
              ascOrder={ascOrdersObjectArray && ascOrdersObjectArray[i]}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((item) => (
            <TableRow
              extMutation={() => extMutation && extMutation(item)}
              key={item.id + item.adress.zip}
              data={{
                col1: item.id,
                col2: item.firstName,
                col3: item.lastName,
                col4: item.email,
                col5: item.phone,
                col6: item.adress.state,
              }}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
