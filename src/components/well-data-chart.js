import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function WellDataChart({ data, title, dataKey, color }) {
    // Prepare data for depth vs measurement chart
    const chartData = data.map(item => ({
        depth: item.depth,
        value: item[dataKey],
        rockType: item.rock_type,
    }));
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: title }), _jsx("div", { className: "flex items-center gap-2 text-xs", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded", style: { backgroundColor: color } }), _jsx("span", { children: title })] }) })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-96", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: chartData, layout: "horizontal", margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { type: "number", dataKey: "value", domain: ['dataMin', 'dataMax'] }), _jsx(YAxis, { type: "number", dataKey: "depth", domain: ['dataMin', 'dataMax'], reversed: true }), _jsx(Tooltip, { labelFormatter: (value) => `Depth: ${value} ft`, formatter: (value, name) => [
                                        `${value} ${dataKey === 'dt' ? 'μs/ft' : 'API'}`,
                                        title
                                    ] }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: color, strokeWidth: 2, dot: false })] }) }) }) })] }));
}
export function RockCompositionChart({ data }) {
    const rockColors = {
        'Sandstone': '#FF6B9D',
        'Shale': '#4ECDC4',
        'Limestone': '#45B7D1',
        'Dolomite': '#96CEB4',
    };
    const getRockColor = (rockType) => {
        return rockColors[rockType] || '#6B7280';
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Rock Composition" }), _jsx("div", { className: "flex flex-wrap gap-4 text-xs", children: Object.entries(rockColors).map(([rock, color]) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded", style: { backgroundColor: color } }), _jsx("span", { children: rock })] }, rock))) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "h-96 relative bg-gradient-to-b from-blue-100 to-blue-200 rounded border", children: [_jsx("div", { className: "absolute left-0 top-0 h-full flex flex-col justify-between text-xs font-mono py-2 px-2", children: data.length > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: Math.min(...data.map(d => d.depth)).toFixed(0) }), _jsx("span", { className: "text-muted-foreground", children: (Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.2).toFixed(0) }), _jsx("span", { className: "text-muted-foreground", children: (Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.4).toFixed(0) }), _jsx("span", { className: "text-muted-foreground", children: (Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.6).toFixed(0) }), _jsx("span", { className: "text-muted-foreground", children: (Math.min(...data.map(d => d.depth)) + (Math.max(...data.map(d => d.depth)) - Math.min(...data.map(d => d.depth))) * 0.8).toFixed(0) }), _jsx("span", { className: "text-muted-foreground", children: Math.max(...data.map(d => d.depth)).toFixed(0) })] })) }), _jsx("div", { className: "ml-12 h-full relative", children: data.map((item, index) => {
                                const depthPercent = data.length > 1 ? (index / (data.length - 1)) * 100 : 50;
                                const rockColor = getRockColor(item.rock_type);
                                return (_jsx("div", { className: "absolute left-0 right-0", style: {
                                        top: `${depthPercent}%`,
                                        height: data.length > 1 ? `${100 / data.length}%` : '10px',
                                        backgroundColor: rockColor,
                                        opacity: 0.8,
                                    } }, index));
                            }) })] }) })] }));
}
