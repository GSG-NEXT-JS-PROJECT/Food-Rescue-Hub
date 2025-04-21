import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DonationsByLocationChartProps } from '../analyticsType';

const DonationsByLocationChart: React.FC<DonationsByLocationChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="donations" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DonationsByLocationChart;
