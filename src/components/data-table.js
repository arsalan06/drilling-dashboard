import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Filter } from 'lucide-react';
import { useState } from 'react';
export function DataTable({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    const getRockTypeColor = (rockType) => {
        switch (rockType.toLowerCase()) {
            case 'sandstone':
                return 'bg-pink-100 text-pink-800';
            case 'shale':
                return 'bg-teal-100 text-teal-800';
            case 'limestone':
                return 'bg-blue-100 text-blue-800';
            case 'dolomite':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const handleExport = () => {
        const csvContent = [
            ['Depth (ft)', 'DT (μs/ft)', 'GR (API)', 'Rock Type', 'Formation', 'ROP (ft/hr)'],
            ...data.map(row => [
                row.depth,
                row.dt,
                row.gr,
                row.rock_type,
                row.formation,
                row.rop
            ])
        ].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'well_data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Well Data Preview" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Uploaded drilling data and measurements" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleExport, "data-testid": "button-export", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export"] }), _jsxs(Button, { variant: "outline", size: "sm", "data-testid": "button-filter", children: [_jsx(Filter, { className: "h-4 w-4 mr-1" }), "Filter"] })] })] }) }), _jsx(CardContent, { children: data.length === 0 ? (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No data available. Upload a file to see the data table." })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "font-semibold", children: "Depth (ft)" }), _jsx(TableHead, { className: "font-semibold", children: "DT (\u03BCs/ft)" }), _jsx(TableHead, { className: "font-semibold", children: "GR (API)" }), _jsx(TableHead, { className: "font-semibold", children: "Rock Type" }), _jsx(TableHead, { className: "font-semibold", children: "Formation" }), _jsx(TableHead, { className: "font-semibold", children: "ROP (ft/hr)" })] }) }), _jsx(TableBody, { children: currentData.map((row, index) => (_jsxs(TableRow, { "data-testid": `row-data-${startIndex + index}`, children: [_jsx(TableCell, { className: "font-mono", "data-testid": `cell-depth-${startIndex + index}`, children: row.depth.toLocaleString() }), _jsx(TableCell, { "data-testid": `cell-dt-${startIndex + index}`, children: row.dt.toFixed(1) }), _jsx(TableCell, { "data-testid": `cell-gr-${startIndex + index}`, children: row.gr.toFixed(1) }), _jsx(TableCell, { children: _jsx(Badge, { className: getRockTypeColor(row.rock_type), "data-testid": `badge-rock-type-${startIndex + index}`, children: row.rock_type }) }), _jsx(TableCell, { "data-testid": `cell-formation-${startIndex + index}`, children: row.formation }), _jsx(TableCell, { "data-testid": `cell-rop-${startIndex + index}`, children: row.rop.toFixed(1) })] }, startIndex + index))) })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between mt-6", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", _jsx("span", { className: "font-medium", children: startIndex + 1 }), " to", ' ', _jsx("span", { className: "font-medium", children: Math.min(endIndex, data.length) }), " of", ' ', _jsx("span", { className: "font-medium", children: data.length }), " results"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: currentPage === 1, onClick: () => setCurrentPage(currentPage - 1), "data-testid": "button-previous-page", children: "Previous" }), Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                            const pageNum = i + 1;
                                            return (_jsx(Button, { variant: currentPage === pageNum ? "default" : "outline", size: "sm", onClick: () => setCurrentPage(pageNum), "data-testid": `button-page-${pageNum}`, children: pageNum }, pageNum));
                                        }), _jsx(Button, { variant: "outline", size: "sm", disabled: currentPage === totalPages, onClick: () => setCurrentPage(currentPage + 1), "data-testid": "button-next-page", children: "Next" })] })] }))] })) })] }));
}
