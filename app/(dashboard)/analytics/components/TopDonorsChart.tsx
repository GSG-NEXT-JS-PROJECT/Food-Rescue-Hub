import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TopDonorsChartProps } from '../analyticsType';

const TopDonorsChart: React.FC<TopDonorsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip />
        <Legend />
        <Bar dataKey="donations" fill="#82ca9d" />
        <Bar dataKey="totalWeight" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopDonorsChart;