export const createZodSync =
  (schema) =>
  ({ getFieldsValue }) => ({
    validator: (rule) =>
      new Promise(async (resolve, reject) => {
        // AsyncValidator adds field - rc-field-form type isn't correct
        // https://github.com/search?q=repo%3Ayiminghe%2Fasync-validator%20fullField&type=code
        const { field } = rule;

        const values = getFieldsValue();
        const data = await schema.safeParseAsync(values);

        if (!data.success) {
          const error = data.error.issues.find((err) => err.path.join(".") === field);
          if (error) reject(error);
        }

        resolve(undefined);
      }),
  });
