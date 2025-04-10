import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Role } from '@/@types';
import { UserTypeDistributionChartProps } from '../analyticsType';

const UserTypeDistributionChart: React.FC<UserTypeDistributionChartProps> = ({
  donors,
  recipients,
  admins
}) => {
  const data = [
    { name: Role.Donor, value: donors, color: '#FF6384' },
    { name: Role.Recipient, value: recipients, color: '#36A2EB' },
    { name: Role.Admin, value: admins, color: '#FFCE56' },
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

export default UserTypeDistributionChart;