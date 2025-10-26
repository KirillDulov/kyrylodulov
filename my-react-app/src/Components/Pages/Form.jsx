import { useForm } from "react-hook-form";
import FormikForm from "../../Containers/FormikForm";
import ReduxForm from "../../Containers/ReduxForm";

const Form = () => {
    return (
        <>
            <div>Форма</div>
            <ReduxForm />
            <FormikForm />
        </>
    );
};

export default Form;