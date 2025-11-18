import { useDispatch } from "react-redux";
import { setFormFormikData } from "../slices/formikFormSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useCallback, useMemo } from "react";
import * as yup from 'yup';

const InputGroup = React.memo(({ label, name, type = "text" }) => {
    console.log("Render InputGroup:", name);

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field type={type} id={name} name={name} className="input-field" />
            <ErrorMessage name={name} component="div" className="error-message" />
        </div>
    );
});

const CheckboxGroup = React.memo(() => {
    console.log("Render CheckboxGroup");

    return (
        <div className="form-group checkbox-group">
            <label>
                <Field type="checkbox" name="terms" />
                Accept Terms and Conditions
            </label>
            <ErrorMessage name="terms" component="div" className="error-message" />
        </div>
    );
});

const MemoizationFormikForm = () => {
    const dispatch = useDispatch();

    const memoizedValidation = useMemo(() => 
        yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            age: yup.number().min(18, 'You must be at least 18 years old').required('Age is required'),
            terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
        }), 
    []);

    const memoInitialValues = useMemo(() => ({
        name: '',
        email: '',
        age: 18,
        terms: false
    }), []);

    const onSubmit = useCallback(
        (data, { setSubmitting, resetForm }) => {
            dispatch(setFormFormikData(data));
            console.log("Submitted:", data);
            setSubmitting(false);
            resetForm();
        },
        [dispatch]
    );

    return (
        <div className="form-container">
            <h2>FormikForm (with memoization)</h2>

            <Formik
                initialValues={memoInitialValues}
                onSubmit={onSubmit}
                validationSchema={memoizedValidation}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="form">
                        <InputGroup label="Full name:" name="name" />
                        <InputGroup label="Email:" name="email" type="email" />
                        <InputGroup label="Age:" name="age" type="number" />
                        <CheckboxGroup />

                        <button type="submit" disabled={isSubmitting || !isValid} className="submit-button">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MemoizationFormikForm;