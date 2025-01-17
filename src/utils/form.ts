import { TResponseError } from "@/commons/types/response";
import { FormInstance } from "antd";

/**
 * Handles form errors by mapping the error details to the form fields.
 *
 * @template Values - The type of the form values.
 * @param {FormInstance<Values>} _form - The Ant Design form instance.
 * @param {CustomException} _customException - The custom exception containing the error details.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formErrorHandling = <Values = any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _form: FormInstance<Values>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _customException: TResponseError,
): void => {
  // TODO: Implement form error handling after type error clear
  //   form.setFields(
  //     customException.errors?.map((value) => ({
  //       name: value?.path?.join("."),
  //       errors: [value.message],
  //     })) || []
  //   );
};
