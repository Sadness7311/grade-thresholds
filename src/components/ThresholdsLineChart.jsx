import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

function ThresholdsLineChart({ chart }) {
  return (
    <ChartContainer config={chart.config} className="h-[500px] w-full">
      <LineChart accessibilityLayer data={chart.data}>
        <CartesianGrid />
        <YAxis dataKey="a" tickMargin={5} width={25} axisLine={false} />
        <XAxis dataKey="year" tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(chart.config).map((key) => (
          <Line
            dataKey={key}
            type="monotone"
            strokeWidth={2}
            stroke={chart.config[key].color}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

export default ThresholdsLineChart;
