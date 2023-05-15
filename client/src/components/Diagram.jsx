import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
function Diagram() {
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
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
          <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey='name' />
      <YAxis tickFormatter={(value) => `$${value}`} />
      <CartesianGrid vertical={false} />
      <Tooltip formatter={(value) => `$${value}`} />
      <Area
        type='monotone'
        dataKey='Витрати'
        stroke='#8884d8'
        fillOpacity={1}
        fill='url(#colorUv)'
      />
    </AreaChart>
  );
}

export default Diagram;
