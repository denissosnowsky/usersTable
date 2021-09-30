import loading from "../../assets/loading.gif";
import s from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <img alt="loading" src={loading} />
    </div>
  );
};

export default Loading;
