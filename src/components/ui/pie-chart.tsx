import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CategoryPieChartProps {
  data: { name: string; value: number }[];
  title: string;
  colors?: string[];
}

const DEFAULT_COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  data,
  title,
  colors = DEFAULT_COLORS,
}) => {
  return (
    <div className="bg-background shadow-md rounded-lg p-4 w-full border border-foreground/10">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhuma transação registrada
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;
