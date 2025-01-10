interface ValidationErrorType {
  message: string;
  errors: Record<string, string[]>;
}

function isValidationErrorType(obj: unknown): obj is ValidationErrorType {
  // Check if `obj` is an object and not null
  if (typeof obj === "object" && obj !== null) {
    const typedObj = obj as ValidationErrorType;

    // Check `message` is a string
    if (typeof typedObj.message !== "string") {
      return false;
    }

    // Check `errors` is an object
    if (
      typeof typedObj.errors !== "object" ||
      typedObj.errors === null ||
      Array.isArray(typedObj.errors)
    ) {
      return false;
    }

    // Check every key in `errors` is a string and value is an array of strings
    for (const key in typedObj.errors) {
      if (
        !Array.isArray(typedObj.errors[key]) ||
        !typedObj.errors[key].every((val) => typeof val === "string")
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export const errorFormatter = (error: unknown) => {
  let message = "";

  if (isValidationErrorType(error)) {
    const errorLocal = error as ValidationErrorType;

    if (JSON.stringify(errorLocal.errors) !== "{}") {
      Object.values(errorLocal.errors).forEach((item) => {
        return message === ""
          ? (message = item.join("\n"))
          : (message += "\n" + item.join("\n"));
      });
    } else message = errorLocal.message;
  } else if (error instanceof Error) message = error.message;
  else message = "Something went wrong...";

  return message;
};
