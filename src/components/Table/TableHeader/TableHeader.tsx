import s from "./TableHeader.module.css";
import up from "../../../assets/upArrow.svg";
import down from "../../../assets/downArrow.svg";
import { OrderResponse, ThunkAC } from "../../../types/types";

interface TableHeaderPropsType {
  header: string;
  extMutation?: () => ThunkAC;
  chosenOrder?: OrderResponse | null;
  ascOrder?: string;
}

const TableHeader: React.FC<TableHeaderPropsType> = ({
  header,
  extMutation,
  chosenOrder,
  ascOrder,
}) => {
  const handlePush = () => {
    extMutation && extMutation();
  };

  return (
    <th onClick={handlePush}>
      <div className={s.header}>
        <div>{header}</div>
        <div className={s.arrowWrapper}>
          <img alt="arrow" src={chosenOrder === ascOrder ? up : down} />
        </div>
      </div>
    </th>
  );
};

export default TableHeader;
