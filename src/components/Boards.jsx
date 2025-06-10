import { Link } from "react-router";

function Boards({ boards }) {
  return (
    <div className="w-full flex justify-center flex-wrap gap-3 mb-20">
      {Object.keys(boards).map((key, i) => (
        <SelectBoard board={boards[key]} key={i} />
      ))}
    </div>
  );
}

function SelectBoard({ board }) {
  return (
    <Link
      className="border-3 border-primary rounded-md p-6 cursor-pointer hover:bg-primary hover:text-primary-foreground transition"
      to={board.fileName}
    >
      <h3>{board.name}</h3>
    </Link>
  );
}

export default Boards;
