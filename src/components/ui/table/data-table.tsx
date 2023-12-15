import React, { Dispatch, SetStateAction } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx'
import DataTablePagination from '@/components/ui/table/data-table-pagination.tsx'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalRows: number
    page: number
    setPage: Dispatch<SetStateAction<number>>
    pageSize: number
    setPageSize: Dispatch<SetStateAction<number>>
}

const DataTable: React.FC<DataTableProps<any, any>> = <TData, TValue>({
    columns,
    data,
    totalRows,
    page,
    setPage,
    pageSize,
    setPageSize,
}: DataTableProps<TData, TValue>) => {
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel<TData>(),
        getPaginationRowModel: getPaginationRowModel<TData>(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
        manualPagination: true,
    })

    return (
        <div>
            <div className='border rounded-md'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end py-4 space-x-2'>
                <DataTablePagination
                    table={table}
                    totalRows={totalRows}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default DataTable