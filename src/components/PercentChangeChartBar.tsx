import { ResponsiveBar } from '@nivo/bar';

interface PercentChangeBarChartProps {
  data: any[];
}

const PercentChangeBarChart = ({ data }: PercentChangeBarChartProps) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={['percentChange']}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickRotation: 45,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          legend: '% Change',
          legendPosition: 'middle',
          legendOffset: -40
        }}
      />
    </div>
  );
};

export default PercentChangeBarChart;
