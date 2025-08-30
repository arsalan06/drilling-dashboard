import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
export function Sidebar({ wells, selectedWellId, onWellSelect, onRefresh, className }) {
    const getStatusColor = (status) => {
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
    return (_jsx("aside", { className: cn("w-60 bg-card border-r border-border h-full overflow-y-auto", className), children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Well List" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onRefresh, "data-testid": "button-refresh-wells", children: _jsx(RefreshCw, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "space-y-2", children: wells.map((well) => (_jsx(Card, { className: cn("p-3 cursor-pointer transition-colors hover:bg-muted", selectedWellId === well.id && "bg-primary text-primary-foreground hover:bg-primary/90"), onClick: () => onWellSelect(well.id), "data-testid": `card-well-${well.id}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", "data-testid": `text-well-name-${well.id}`, children: well.name }), _jsxs("p", { className: "text-sm opacity-70", "data-testid": `text-well-depth-${well.id}`, children: ["Depth: ", well.depth.toLocaleString(), " ft"] })] }), _jsx("div", { className: cn("w-3 h-3 rounded-full", getStatusColor(well.status)) })] }) }, well.id))) })] }) }));
}
