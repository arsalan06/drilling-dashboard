import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Well {
  id: string;
  name: string;
  depth: number;
  status: 'active' | 'inactive' | 'drilling';
}

interface SidebarProps {
  wells: Well[];
  selectedWellId: string;
  onWellSelect: (wellId: string) => void;
  onRefresh: () => void;
  className?: string;
}

export function Sidebar({ wells, selectedWellId, onWellSelect, onRefresh, className }: SidebarProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'drilling':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <aside className={cn(
      "w-60 bg-card border-r border-border h-full overflow-y-auto",
      className
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Well List</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            data-testid="button-refresh-wells"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {wells.map((well) => (
            <Card
              key={well.id}
              className={cn(
                "p-3 cursor-pointer transition-colors hover:bg-muted",
                selectedWellId === well.id && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => onWellSelect(well.id)}
              data-testid={`card-well-${well.id}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium" data-testid={`text-well-name-${well.id}`}>
                    {well.name}
                  </h3>
                  <p className="text-sm opacity-70" data-testid={`text-well-depth-${well.id}`}>
                    Depth: {well.depth.toLocaleString()} ft
                  </p>
                </div>
                <div className={cn("w-3 h-3 rounded-full", getStatusColor(well.status))} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  );
}
