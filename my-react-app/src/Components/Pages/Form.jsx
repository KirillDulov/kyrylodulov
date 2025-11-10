import { useForm } from "react-hook-form";
import FormikForm from "../../Containers/FormikForm";
import ReduxForm from "../../Containers/ReduxForm";
import ReduxFormMaterialUI from "../../Containers/ReduxFormMaterialUI";

const Form = () => {
    return (
        <>
            <div>Форма</div>
            <ReduxForm />
            <FormikForm />
            <ReduxFormMaterialUI />
        </>
    );
};

export default Form;