import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Gauge, Layers, CheckCircle } from 'lucide-react';
import { WellStats } from '@/types/well-data';

interface StatsCardsProps {
  stats: WellStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Current Depth</h4>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold" data-testid="text-current-depth">
            {stats.currentDepth.toLocaleString()} ft
          </p>
          <p className="text-sm text-muted-foreground">+23 ft since last update</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">ROP Average</h4>
            <Gauge className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold" data-testid="text-rop-average">
            {stats.ropAverage} ft/hr
          </p>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Formation</h4>
            <Layers className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold" data-testid="text-current-formation">
            {stats.currentFormation}
          </p>
          <p className="text-sm text-muted-foreground">Current rock type</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Well Status</h4>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600" data-testid="text-well-status">
            {stats.wellStatus}
          </p>
          <p className="text-sm text-muted-foreground">Drilling in progress</p>
        </CardContent>
      </Card>
    </div>
  );
}
