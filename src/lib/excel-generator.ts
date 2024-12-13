import * as XLSX from "xlsx";
import { QuestionResponseType } from "./types";

export const exportToExcel = (data: unknown[], fileName: string) => {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add a general column width
  const columnWidth = 20; // Set the desired column width
  const columnCount = Object.keys(data[0] || {}).length; // Number of columns based on data

  worksheet["!cols"] = Array(columnCount).fill({ wch: columnWidth });

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportQuestionnaireToExcel = (
  response: QuestionResponseType,
  fileName: string
): void => {
  // Metadata (Client and questionnaire details)
  const metadata = [
    {
      Label: "Client ID",
      Value: response.clients.id,
    },
    {
      Label: "Name",
      Value: `${response.clients.first_name} ${response.clients.last_name}`,
    },
    {
      Label: "Phone",
      Value: response.clients.phone_number,
    },
    {
      Label: "Email",
      Value: response.clients.email,
    },
    {
      Label: "Status",
      Value: response.status ? "Completed" : "Pending",
    },
    {
      Label: "Percentage",
      Value: `${response.percentage}%`,
    },
    {
      Label: "Created At",
      Value: response.created_at,
    },
  ];

  // Flatten data for answers
  const answerRows = response.answers.map((answer) => ({
    "Question ID": answer.question.id,
    "Question Title": answer.question.title,
    "Category ID": answer.question.category_id,
    "Option ID": answer.option.id,
    "Option Value": answer.option.value,
    "Option Score": answer.option.score,
    "Answer Created At": answer.created_at,
  }));

  // Create worksheets for metadata and answers
  const workbook = XLSX.utils.book_new();

  // Metadata sheet
  const metadataSheet = XLSX.utils.json_to_sheet(metadata, {
    header: ["Label", "Value"],
  });
  XLSX.utils.book_append_sheet(workbook, metadataSheet, "Metadata");

  // Answers sheet
  const answersSheet = XLSX.utils.json_to_sheet(answerRows);
  XLSX.utils.book_append_sheet(workbook, answersSheet, "Answers");

  // Adjust column widths for better readability
  metadataSheet["!cols"] = [{ wch: 20 }, { wch: 30 }];
  answersSheet["!cols"] = [
    { wch: 12 }, // Question ID
    { wch: 30 }, // Question Title
    { wch: 15 }, // Category ID
    { wch: 10 }, // Option ID
    { wch: 30 }, // Option Value
    { wch: 10 }, // Option Score
    { wch: 20 }, // Answer Created At
  ];

  // Export the workbook to a file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
