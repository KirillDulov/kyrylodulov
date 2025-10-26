import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../slices/reduxFormSlice";
import { useSelector } from "react-redux";

const ReduxForm = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();

    const onSubmit = (data) => {

        dispatch(setFormData(data));
        console.log(data);
    };

    return (
        <div className="redux-form-container">
            <h2>ReduxForm</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Full name:</label>
                    <input
                        {...register("fullName", { required: 'Please enter your name.' })}
                    />
                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        {...register("email", {
                            required: 'Please enter your Email.',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        {...register("age", {
                            required: 'Please enter your Age.',
                            min: { value: 18, message: 'Minimum age is 18' },
                            max: { value: 100, message: 'Maximum age is 100' }
                        })}
                    />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
                </div>
                <div>
                    <label>Gender: </label>
                    <label>Male
                        <input type="radio" value="male"
                            {...register("gender", { required: "Please select your gender" })}
                        />
                    </label>
                    <label>Female
                        <input type="radio" value="female"
                            {...register("gender")}
                        />
                        {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
                    </label>
                </div>
                <div>
                    <input type="checkbox"
                        {...register("checkbox", { required: "Please do accept the conditions" })}
                    />

                    <label>I accept the terms and conditions</label>
                    {errors.checkbox && <p style={{ color: 'red' }}>{errors.checkbox.message}</p>}
                </div>
                <button type="submit"
                    disabled={!isValid || isSubmitting}
                >{isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>

    );
};

export default ReduxForm;