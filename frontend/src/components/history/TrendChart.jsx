import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMockData = (timeRange) => {
  const points = timeRange === '7D' ? 7 : timeRange === '1M' ? 30 : 90;
  const data = [];
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 100) + 20
    });
  }
  return data;
};

const TrendChart = ({ category, timeRange }) => {
  const data = React.useMemo(() => generateMockData(timeRange), [timeRange, category]);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={10}
            minTickGap={20}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-surface)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: 'var(--color-accent)' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--color-accent)" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: 'var(--color-accent)' }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
