import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../components/ui/chart";

function ThresholdChart({ threshold, header }) {
  const labels = header
    .slice(5, header.length)
    .map((label) => label.toUpperCase());
  const data = threshold.slice(5, header.length).map((item, i) => ({
    marks: item || 0,
    label: labels[i],
    maxMarks: threshold[4],
  }));

  const chartConfig = {
    marks: {
      label: "Marks",
    },
    maxMarks: {
      label: "Max Marks",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full md:w-1/2 h-[400px] p-4"
    >
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid />
        <YAxis dataKey="maxMarks" tickMargin={5} width={30} axisLine={false} />
        <XAxis dataKey="label" tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="marks" fill="#DC1D64" radius={4} />
        <Bar dataKey="maxMarks" fill="oklch(0.645 0.246 16.439)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default ThresholdChart;
