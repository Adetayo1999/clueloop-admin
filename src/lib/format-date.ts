import moment from "moment";

export const formatDate = (date: string, show_time = true) =>
  moment(date).format(`MMMM Do YYYY${show_time ? ", h:mm:ss a" : ""}`);

export const formatDateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
