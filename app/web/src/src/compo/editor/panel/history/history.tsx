import format from "date-fns/format";
import { useUndoRedo } from "../../../../lib/undo-redo";

export const HistoryPane = () => {
  const s = useUndoRedo("editor");
  return (
    <>
      {s.history.map((e, idx) => {
        return (
          <div
            key={idx}
            className="flex justify-between cursor-pointer"
            onClick={() => {
              s.cursor = idx;
            }}
          >
            <div className="flex">
              <div className="w-[20px]">{s.cursor === idx && ">>"}</div>
              {e.action}{" "}
            </div>
            <div>{format(e.timestamp, "hh:mm:ss")}</div>
          </div>
        );
      })}
    </>
  );
};
