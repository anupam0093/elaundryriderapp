
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string().length(8).required(),
  number: Yup.number()
    .required("Required")
    .max(1000000000000, "Required")
    .min(0, "Not negative number"),
});

const testValidation = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form>
        <Field
          name="email"
          type="email"
          placeholder="Email"
          validate={(value: string) => !!value && /.+@.+\..+$/.test(value)}
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          validate={(value: string | any[]) => !!value && value.length >= 8}
        />
        <ErrorMessage name="email" />
        <ErrorMessage name="password" />
      </Form>
    </Formik>
  );
};

export default testValidation;
