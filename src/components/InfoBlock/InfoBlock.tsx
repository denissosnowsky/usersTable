import { ResponseUsersType } from "../../types/types";
import Row from "../Row/Row";
import s from "./InfoBlock.module.css";

interface InfoBlockPropsType {
  data: ResponseUsersType;
}

const InfoBlock: React.FC<InfoBlockPropsType> = ({ data }) => {
  return (
    <div className={s.wrapper}>
      <Row justifyContent="center" className={s.header}>
        <h1>Profile info:</h1>
      </Row>
      <Row className={s.body} flexDirection="column" alignItems="center">
        <div className={s.listItem}>
          <span>{"Selected profile: "}</span>
          <span>{`${data.firstName} ${data.lastName}`}</span>
        </div>
        <div className={s.listItem}>
          <span>{"Description: "}</span>
          <span>{data.description}</span>
        </div>
        <div className={s.listItem}>
          <span>{"Address: "}</span>
          <span>{data.adress.streetAddress}</span>
        </div>
        <div className={s.listItem}>
          <span>{"City: "}</span>
          <span>{data.adress.city}</span>
        </div>
        <div className={s.listItem}>
          <span>{"State: "}</span>
          <span>{data.adress.state}</span>
        </div>
        <div className={s.listItem}>
          <span>{"Index: "}</span>
          <span>{data.adress.zip}</span>
        </div>
      </Row>
    </div>
  );
};

export default InfoBlock;
