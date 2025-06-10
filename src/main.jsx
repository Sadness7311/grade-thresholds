import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home";
import Layout from "./layouts/Layout";
import Table from "./routes/Table";
import boards from "../boards.json";
import Api from "./routes/Api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {Object.keys(boards).map((key, i) => (
            <Route
              path={`/${boards[key].fileName}`}
              element={<Table board={boards[key]} />}
              key={i}
            />
          ))}
          <Route path="/api" element={<Api />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
