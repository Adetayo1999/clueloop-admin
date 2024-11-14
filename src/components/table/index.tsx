/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  // ColumnDef
} from "@tanstack/react-table";
import { MoonLoader } from "react-spinners";
import clsx from "clsx";

interface CustomTableProps<T> {
  className?: string;
  columns: any;
  data: T[];
  hideTableHead?: boolean;
  loading?: boolean;
  table_classname?: string;
  table_head_classname?: string;
  table_tr_classname?: string;
}

export const CustomTable = <T,>({
  columns,
  data,
  className,
  loading,
  table_classname,
  table_head_classname,
  hideTableHead = false,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading && !data.length) {
    return (
      <div className="min-h-[20rem] flex flex-col gap-y-2 justify-center items-center ">
        <MoonLoader color="#007FFF" size={30} />
        <p className="animate-pulse mt-2 text-sm darktext-gray-100 text-gray-800 dark:text-gray-100">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && data.length !== 0 && (
        <div className="flex gap-x-3 items-center justify-end mb-4">
          <MoonLoader color="#0F3DB4" size={15} />
          <p className="animate-pulse mt-2 text-sm  dark:text-gray-100 text-gray-800">
            Refreshing...
          </p>
        </div>
      )}
      <div
        className={`relative overflow-x-auto border dark:border-gray-500 dark:border-opacity-40 sm:rounded-lg ${className}`}
      >
        {/* border-spacing-y-4 */}
        <table
          className={clsx(
            "w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ",
            table_classname
          )}
        >
          {!hideTableHead ? (
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b dark:border-gray-500 dark:border-opacity-40  dark:bg-gray-800 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={table_head_classname}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 whitespace-nowrap"
                      scope="col"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          ) : null}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className=" last:border-none border-b dark:bg-gray-900   dark:border-gray-500 dark:border-opacity-40"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && data.length === 0 && (
        <div className="text-center min-h-[10rem]  flex justify-center items-center ">
          <p className="text-[#8D8F9A] flex flex-col items-center">
            <span>No Data</span>
          </p>
        </div>
      )}
    </div>
  );
};
