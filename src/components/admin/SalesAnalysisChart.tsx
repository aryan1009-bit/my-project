
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A172F7', '#FF6B6B'];

interface SalesAnalysisChartProps {
  salesData: Array<{
    name: string;
    value: number;
  }>;
}

const SalesAnalysisChart: React.FC<SalesAnalysisChartProps> = ({ salesData }) => {
  return (
    <div className="glass-panel p-6 rounded-lg">
      <h2 className="text-xl font-medium mb-4">Sales Analysis</h2>
      <div className="h-[300px]">
        {salesData.length > 0 ? (
          <ChartContainer className="w-full" config={{
            sales: { theme: { light: "#0088FE", dark: "#0088FE" } },
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                />
                <Legend 
                  content={<ChartLegendContent />} 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-towel-gray">
            No sales data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalysisChart;
