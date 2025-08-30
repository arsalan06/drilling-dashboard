import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Filter } from 'lucide-react';
import { WellDataRow } from '@/types/well-data';
import { useState } from 'react';

interface DataTableProps {
  data: WellDataRow[];
}

export function DataTable({ data }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const getRockTypeColor = (rockType: string) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Well Data Preview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Uploaded drilling data and measurements
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport}
              data-testid="button-export"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" data-testid="button-filter">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available. Upload a file to see the data table.
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Depth (ft)</TableHead>
                    <TableHead className="font-semibold">DT (μs/ft)</TableHead>
                    <TableHead className="font-semibold">GR (API)</TableHead>
                    <TableHead className="font-semibold">Rock Type</TableHead>
                    <TableHead className="font-semibold">Formation</TableHead>
                    <TableHead className="font-semibold">ROP (ft/hr)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((row, index) => (
                    <TableRow key={startIndex + index} data-testid={`row-data-${startIndex + index}`}>
                      <TableCell className="font-mono" data-testid={`cell-depth-${startIndex + index}`}>
                        {row.depth.toLocaleString()}
                      </TableCell>
                      <TableCell data-testid={`cell-dt-${startIndex + index}`}>
                        {row.dt.toFixed(1)}
                      </TableCell>
                      <TableCell data-testid={`cell-gr-${startIndex + index}`}>
                        {row.gr.toFixed(1)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={getRockTypeColor(row.rock_type)}
                          data-testid={`badge-rock-type-${startIndex + index}`}
                        >
                          {row.rock_type}
                        </Badge>
                      </TableCell>
                      <TableCell data-testid={`cell-formation-${startIndex + index}`}>
                        {row.formation}
                      </TableCell>
                      <TableCell data-testid={`cell-rop-${startIndex + index}`}>
                        {row.rop.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                  <span className="font-medium">{data.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    data-testid="button-previous-page"
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        data-testid={`button-page-${pageNum}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    data-testid="button-next-page"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
