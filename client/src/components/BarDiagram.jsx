import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from 'recharts';
function BarDiagram() {
  const data = [
    {
      name: 'Пн',
      Витрати: 4000,
    },
    {
      name: 'Вт',
      Витрати: 3000,
    },
    {
      name: 'Ср',
      Витрати: 2000,
    },
    {
      name: 'Чт',
      Витрати: 2780,
    },
    {
      name: 'Пт',
      Витрати: 1890,
    },
    {
      name: 'Сб',
      Витрати: 2390,
    },
    {
      name: 'Нд',
      Витрати: 3490,
    },
  ];

  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey='name' />
      <YAxis tickFormatter={(value) => `$${value}`} />
      <Tooltip formatter={(value) => `$${value}`} />
      <Legend />
      <Bar dataKey='Витрати' fill='#8884d8' />
    </BarChart>
  );
}

export default BarDiagram;
