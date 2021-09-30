import s from "./Row.module.css";

interface RowPropsType {
  alignItems?: "center" | "end" | "flex-end" | "flex-start" | "start";
  justifyContent?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "stretch"
    | "center"
    | "end"
    | "flex-end"
    | "flex-start"
    | "start";
  flexDirection?: "column" | "column-reverse" | "row" | "row-reverse";
  className?: string;
}

const Row: React.FC<RowPropsType> = ({
  alignItems = "start",
  justifyContent = "stretch",
  flexDirection = "row",
  children,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        alignItems: alignItems,
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        display: "flex",
      }}
    >
      {children}
    </div>
  );
};

export default Row;
