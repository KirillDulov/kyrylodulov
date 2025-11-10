import { useDispatch } from "react-redux";
import { setFormFormikData } from "../slices/formikFormSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    age: yup.number().min(18, 'You must be at least 18years old').required('Age is required'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const initialValues = {
    name: '',
    email: '',
    age: 18,
    terms: false
}

const FormikForm = () => {


    const dispatch = useDispatch();

    const onSubmit = (data, { setSubmitting, resetForm }) => {

        dispatch(setFormFormikData(data));
        console.log(data);
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="form-container">
            <h2>FormikForm</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, isValid }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Full name:</label>
                            <Field type="text" id="name" name="name" className="input-field" />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" className="input-field" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <Field type="number" id="age" name="age" className="input-field" />
                            <ErrorMessage name="age" component="div" className="error-message" />
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <Field type="checkbox" name="terms" />
                                Accept Terms and Conditions
                            </label>
                            <ErrorMessage name="terms" component="div" className="error-message" />
                        </div>

                        <button type="submit" disabled={isSubmitting || !isValid} className="submit-button">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormikForm;