import { useEffect, useMemo, useState } from "react";
import TableControls from "../components/TableControls";
import ThresholdsTable from "../components/ThresholdsTable";
import Papa from "papaparse";
import Container from "../components/Container";
import Graphs from "../components/Graphs";

function Table({ board }) {
  const [thresholds, setThresholds] = useState([]);
  const [header, setHeader] = useState([]);
  const [rowsOnOnePage, setRowsOnOnePage] = useState(10);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    document.title = `${board.name} Table`;
  }, []);

  useEffect(() => {
    fetch(`/${board.fileName}.csv`)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true });
        const data = parsed.data;
        setHeader(data[0]);
        setThresholds(data.slice(1));
      });
  }, []);

  useEffect(() => {
    console.log(thresholds, header);
  }, [thresholds, header]);

  const searchedThresholds = useMemo(() => {
    return thresholds.filter((row) =>
      value
        .trim()
        .toLowerCase()
        .split(/[\s/]+/)
        .every((term) =>
          row.some((cell) => cell.toString().toLowerCase().includes(term)),
        ),
    );
  }, [value, thresholds]);

  useEffect(() => {
    setThresholds((prev) =>
      [...prev].sort((a, b) =>
        isNaN(a[sorting]) || isNaN(b[sorting])
          ? String(a[sorting]).localeCompare(String(b[sorting]))
          : b[sorting] - a[sorting],
      ),
    );
  }, [sorting]);

  return (
    <Container className="mt-10">
      <h2 className="mb-5">{board.name} Table</h2>
      <TableControls
        header={header}
        totalThresholds={thresholds.length}
        value={value}
        sorting={sorting}
        setSorting={setSorting}
        rowsOnOnePage={rowsOnOnePage}
        setRowsOnOnePage={setRowsOnOnePage}
        setValue={setValue}
      />
      <ThresholdsTable
        header={header}
        thresholds={value ? searchedThresholds : thresholds}
        rowsOnOnePage={rowsOnOnePage}
        page={page}
        setPage={setPage}
      />
      <Graphs header={header} thresholds={thresholds} board={board} />
    </Container>
  );
}

export default Table;
