import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { Colors } from '../styles';
function Diagram() {
  const data = [
    {
      Дні: 'Пн',
      Витрати: 400,
      Дохід: 240,
    },
    {
      Дні: 'Вт',
      Витрати: 300,
      Дохід: 198,
    },
    {
      Дні: 'Ср',
      Витрати: 200,
      Дохід: 80,
    },
    {
      Дні: 'Чт',
      Витрати: 280,
      Дохід: 398,
    },
    {
      Дні: 'Пт',
      Витрати: 190,
      Дохід: 480,
    },
    {
      Дні: 'Сб',
      Витрати: 290,
      Дохід: 300,
    },
    {
      Дні: 'Нд',
      Витрати: 390,
      Дохід: 430,
    },
  ];

  return (
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 100, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id='colorВитрати' x1='0' y1='0' x2='0' y2='1'>
          <stop
            offset='5%'
            stopColor={Colors.diagramColorMain}
            stopOpacity={0.8}
          />
          <stop
            offset='95%'
            stopColor={Colors.diagramColorMain}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient id='colorДохід' x1='0' y1='0' x2='0' y2='1'>
          <stop
            offset='5%'
            stopColor={Colors.diagramColorSecondary}
            stopOpacity={0.8}
          />
          <stop
            offset='95%'
            stopColor={Colors.diagramColorSecondary}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <XAxis dataKey='Дні' tick={{ fill: Colors.black }} />
      <YAxis
        tickFormatter={(value) => `$${value}`}
        tick={{ fill: Colors.black }}
      />
      <CartesianGrid vertical={false} />
      <Tooltip formatter={(value) => `$${value}`} />
      <Area
        type='monotone'
        dataKey='Витрати'
        stroke={Colors.diagramColorMain}
        fillOpacity={1}
        fill='url(#colorВитрати)'
      />
      <Area
        type='monotone'
        dataKey='Дохід'
        stroke={Colors.diagramColorSecondary}
        fillOpacity={1}
        fill='url(#colorДохід)'
      />
    </AreaChart>
  );
}

export default Diagram;
