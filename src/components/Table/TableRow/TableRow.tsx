import s from "./TableRow.module.css";

interface TableRowPropsType {
  data: Record<string, string | number>;
  extMutation?: () => void;
}

const TableRow: React.FC<TableRowPropsType> = ({ data, extMutation }) => {
  return (
    <tr className={s.rowWrapper} onClick={extMutation && extMutation}>
      {Object.values(data).map((item, i) => (
        <td align="center" key={i}>
          {item}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
