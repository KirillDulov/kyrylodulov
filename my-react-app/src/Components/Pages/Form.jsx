import { useForm } from "react-hook-form";
import ReduxForm from "../../Containers/ReduxForm";
import ReduxFormMaterialUI from "../../Containers/ReduxFormMaterialUI";
import FormikForm from "../../Containers/FormikForm"
import MemoizationFormikForm from "../../Containers/MemoizationFormikForm";

const Form = () => {
    return (
        <>
            <div>Форма</div>
            <ReduxForm />
            <FormikForm />
            <ReduxFormMaterialUI />
            <MemoizationFormikForm />

        </>
    );
};

export default Form;