import { QuestionnaireResponsesTable } from "../../../components/tables/questionnaire-response";

export default function QuestionnaireResponses() {
  return (
    <div className="p-12 pt-16">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Questionnaire Responses
        </h1>
      </div>

      <QuestionnaireResponsesTable />
    </div>
  );
}
