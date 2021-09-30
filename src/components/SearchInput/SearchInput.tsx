import { ChangeEvent, useState } from "react";
import s from "./SearchInput.module.css";

interface SearchInputPropsType {
  extValue?: string;
  extSetValue?: (arg: string) => void;
}

const SearchInput: React.FC<SearchInputPropsType> = ({
  extValue,
  extSetValue,
}) => {
  const [text, setText] = useState<string>("");
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    extSetValue ? extSetValue(e.target.value) : setText(e.target.value);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.text}>Search by name:</div>
      <input
        type="text"
        className={s.input}
        value={extValue ? extValue : text}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default SearchInput;
