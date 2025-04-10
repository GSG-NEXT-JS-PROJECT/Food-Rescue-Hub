import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { DonationStatusChartProps } from '../analyticsType';

const DonationStatusChart: React.FC<DonationStatusChartProps> = ({ available, claimed, expired }) => {
  const data = [
    { name: 'Available', value: available, color: '#36A2EB' },
    { name: 'Claimed', value: claimed, color: '#4BC0C0' },
    { name: 'Expired', value: expired, color: '#FF6384' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonationStatusChart;
