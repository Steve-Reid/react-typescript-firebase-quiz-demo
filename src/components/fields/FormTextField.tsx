import * as React from 'react';
import { FieldAttributes, useField, Field } from 'formik';
// import { TextField } from '@material-ui/core';

interface TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
}

export const FormTextField: React.FC<TextFieldProps & FieldAttributes<{}>> = ({
  type,
  placeholder,
  ...props
}: TextFieldProps) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Field
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
