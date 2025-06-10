import { useState } from "react";
import select from "../functions/select";
import ThresholdsLineChart from "./ThresholdsLineChart";
import ChartControl from "./ChartControl";
import Container from "./Container";

function Graphs({ header, thresholds, board }) {
  const defaultChart = {
    data: [],
    config: {
      showDots: false,
    },
  };
  const defaultMessage = "Enter subject code to visualize.";

  const [inputCode, setCode] = useState("");
  const [inputComponent, setComponent] = useState("");
  const [chart, setChart] = useState(defaultChart);
  const [message, setMessage] = useState(defaultMessage);

  function handleVisualize() {
    if (!inputCode) {
      setMessage("No code provided.");
      return;
    }
    if (board.name.toLowerCase() == "cie" && !inputComponent) {
      setMessage("Component is required for CIE.");
      return;
    }
    const filteredThresholds = thresholds
      .filter(
        (threshold) =>
          threshold[select(header, "code")] == inputCode.trim() &&
          (board.name.toLowerCase() == "cie"
            ? threshold[3] == inputComponent.trim()
            : true),
      )
      .sort((a, b) => new Date("1-" + a[2]) - new Date("1-" + b[2]));

    if (!filteredThresholds.length) {
      setMessage(
        `No rows found with this subject code${board.name.toLowerCase() == "cie" ? " and component." : "."}`,
      );
      setChart(defaultChart);
      return;
    }

    setMessage(`Showing chart for ${inputCode}`);

    const slicedHeader = header.slice(5, header.length);

    const data = filteredThresholds.map((threshold) => {
      const values = threshold.slice(5, header.length);
      const grades = Object.fromEntries(
        slicedHeader.map((key, i) => [key.toLowerCase(), values[i]]),
      );
      return {
        year: threshold[
          select(header, board.name.toLowerCase() == "cie" ? "series" : "year")
        ],
        ...grades,
      };
    });

    const colors = [
      "#DC1D64",
      "#8D33FF",
      "#1d2adc",
      "#FFC300",
      "#dc1d1d",
      "lightblue",
      "lightgreen",
      "black",
    ];
    const config = Object.fromEntries(
      slicedHeader.map((head, i) => [
        head.toLowerCase(),
        { label: head.toUpperCase(), color: colors[i] },
      ]),
    );

    setChart({
      data,
      config,
    });
  }

  return (
    <Container className="mt-20">
      <h2 className="mb-8">Graphs</h2>
      <ChartControl
        code={inputCode}
        component={inputComponent}
        message={message}
        setCode={setCode}
        setComponent={setComponent}
        handleVisualize={handleVisualize}
      />
      <ThresholdsLineChart chart={chart} />
    </Container>
  );
}

export default Graphs;
