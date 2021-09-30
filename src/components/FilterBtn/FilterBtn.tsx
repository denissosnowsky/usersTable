import s from "./FilterBtn.module.css";
import up from "../../assets/upArrow.svg";
import down from "../../assets/downArrow.svg";
import { useState } from "react";

interface FilterBtnPropsType {
  data: Array<string>;
  extValue?: string;
  extSetValue?: (arg: string) => void;
}

const FilterBtn: React.FC<FilterBtnPropsType> = ({
  data,
  extValue,
  extSetValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [state, setState] = useState<string>("");
  const handleStateChange = (arg: string) => {
    extSetValue ? extSetValue(arg) : setState(arg);
  };

  return (
    <div className={s.wrapper} onClick={() => setIsOpen(!isOpen)}>
      <div className={s.text}>
        {extValue ? extValue : state ? state : "Filter by state"}
      </div>
      <div className={s.imgWrapper}>
        <img alt="arrow" src={isOpen ? up : down} />
      </div>
      {isOpen && (
        <div className={s.openedMenu}>
          <div onClick={() => handleStateChange("")}>All</div>
          {data.map((item, i) => (
            <div key={i} onClick={() => handleStateChange(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
