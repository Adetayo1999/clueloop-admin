import { QuestionsTable } from "../../../components/tables/questions";

// function isNumber(input: string | undefined) {
//   if (input === undefined) return false;

//   const num = parseFloat(input);

//   // Check if conversion is valid
//   if (isNaN(num)) {
//     return false;
//   }
//   return true;
// }
export default function Questions() {
  return <QuestionsTable />;
}
