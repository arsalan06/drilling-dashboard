import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { WellDataRow } from '@/types/well-data';

interface WellDataChartProps {
  data: WellDataRow[];
  title: string;
  dataKey: 'dt' | 'gr';
  color: string;
}

export function WellDataChart({ data, title, dataKey, color }: WellDataChartProps) {
  // Prepare data for depth vs measurement chart
  const chartData = data.map(item => ({
    depth: item.depth,
    value: item[dataKey],
    rockType: item.rock_type,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            <span>{title}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="value"
                domain={['dataMin', 'dataMax']}
              />
              <YAxis 
                type="number" 
                dataKey="depth"
                domain={['dataMin', 'dataMax']}
                reversed
              />
              <Tooltip 
                labelFormatter={(value) => `Depth: ${value} ft`}
                formatter={(value: any, name: string) => [
                  `${value} ${dataKey === 'dt' ? 'μs/ft' : 'API'}`,
                  title
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface RockCompositionChartProps {
  data: WellDataRow[];
}

export function RockCompositionChart({ data }: RockCompositionChartProps) {
  const rockColors = {
    'Sandstone': '#FF6B9D',
    'Shale': '#4ECDC4',
    'Limestone': '#45B7D1',
    'Dolomite': '#96CEB4',
  };

  const getRockColor = (rockType: string) => {
    return rockColors[rockType as keyof typeof rockColors] || '#6B7280';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rock Composition</CardTitle>
        <div className="flex flex-wrap gap-4 text-xs">
          {Object.entries(rockColors).map(([rock, color]) => (
            <div key={rock} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
              <span>{rock}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 relative bg-gradient-to-b from-blue-100 to-blue-200 rounded border">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs font-mono py-2 px-2">
            {data.length > 0 && (
              <>
                <span className="text-muted-foreground">{Math.min(...data.map(d => d.depth)).toFixed(0)}</span>
                <span className="text-muted-foreground">{(Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.2).toFixed(0)}</span>
                <span className="text-muted-foreground">{(Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.4).toFixed(0)}</span>
                <span className="text-muted-foreground">{(Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.6).toFixed(0)}</span>
                <span className="text-muted-foreground">{(Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.8).toFixed(0)}</span>
                <span className="text-muted-foreground">{Math.max(...data.map(d => d.depth)).toFixed(0)}</span>
              </>
            )}
          </div>
          
          <div className="ml-12 h-full relative">
            {data.map((item, index) => {
              const depthPercent = data.length > 1 ? (index / (data.length - 1)) * 100 : 50;
              const rockColor = getRockColor(item.rock_type);
              
              return (
                <div
                  key={index}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${depthPercent}%`,
                    height: data.length > 1 ? `${100 / data.length}%` : '10px',
                    backgroundColor: rockColor,
                    opacity: 0.8,
                  }}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
