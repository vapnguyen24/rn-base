import { FormikConfig, FormikValues, useFormik } from 'formik';

export const useValidate = ({
  onSubmit,
  initialValues,
  onReset,
  validateOnMount = true,
  validationSchema,
  ...props
}: FormikConfig<FormikValues>) => {
  const { setFieldTouched, setFieldValue, touched, errors, ...rest } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount,
    onReset,
    ...props,
  });

  const onChange = (field: any) => (value: any) => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  const error = (name: string) => {
    return touched[name] && errors[name];
  };

  return {
    onChange,
    error,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    ...rest,
  };
};
