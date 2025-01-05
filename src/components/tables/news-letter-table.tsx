import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useQuery } from "react-query";
import { NewsletterType } from "../../lib/types";
import toast from "react-hot-toast";
import { Button } from "../button";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import { exportToExcel } from "../../lib/excel-generator";

export const NewsletterTable = () => {
  const { data, isFetching, isLoading } = useQuery<NewsletterType[]>(
    ["newsletter"],
    services.getNewsletterSubmissions,
    {
      refetchOnWindowFocus: false,
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else toast.error("Something went wrong, try again later");
      },
    }
  );

  const columnHelper = createColumnHelper<NewsletterType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: NewsletterType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("fullname", {
      header: "Fullname",
      cell: (info) => <p>{info.getValue() || "NIL"}</p>,
    }),
    columnHelper.accessor("created_at", {
      header: "Date Submitted",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
  ];

  const handleExportData = (data: NewsletterType[]) => {
    const dataToExport = data.map((item) => ({
      ID: item.id,
      Email: item.email,
      Name: item.fullname,
      "Date Submitted": formatDate(item.created_at),
    }));

    exportToExcel(dataToExport, "newsletter_response");
  };

  return (
    <div className="">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Newsletter Submissions
        </h1>
        <Button
          className="flex items-center gap-x-2 bg-green-600 hover:bg-green-800 text-white font-semibold text-sm rounded-full"
          onClick={data ? () => handleExportData(data) : undefined}
        >
          <span>
            <InboxArrowDownIcon className="size-5" />
          </span>
          <span>Export Responses</span>
        </Button>
      </div>
      <CustomTable
        data={data || []}
        columns={columns}
        loading={isFetching || isLoading}
      />
    </div>
  );
};
