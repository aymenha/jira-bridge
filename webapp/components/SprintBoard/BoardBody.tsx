import React from "react";
import IssueCardsColumn, {
  CardsColumnType
} from "../IssueCardsColumn/IssueCardsColumn";

interface BoardBodyProps {
  columnsList: CardsColumnType[];
}
export default ({ columnsList }: BoardBodyProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      {columnsList.map(column => (
        <IssueCardsColumn
          list={column.list || []}
          title={column.title}
          onCreate={() => console.log("create card")}
          onMove={() => console.log("move card")}
          id={column.id}
        />
      ))}
    </div>
  );
};
