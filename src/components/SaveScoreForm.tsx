/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { validationSchema } from '../utils/validationSchema';

interface SaveScoreFormProps {
  score: number;
}

export const SaveScoreForm: React.FC<SaveScoreFormProps> = ({
  score,
}: SaveScoreFormProps) => {
  return (
    <>
      <h1>Score: {score}</h1>
      <Formik
        initialValues={{
          username: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }): void => {
          setSubmitting(true);
          console.log('Submitting');
          const record = {
            name: values.username,
            score,
          };
          // make async call
          console.log('record', record);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <ErrorMessage name="username" component="h3" />
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <button type="submit" className="btn" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/" className="btn">
        Quit
      </Link>
    </>
  );
};
