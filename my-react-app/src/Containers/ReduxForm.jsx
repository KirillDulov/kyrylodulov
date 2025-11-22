import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../slices/reduxFormSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIdleTimer } from "react-idle-timer";
import { FaUser, FaEnvelope, FaBirthdayCake } from "react-icons/fa";

const ReduxForm = () => {

    const dispatch = useDispatch();

    const handleIdle = () => {
        toast.warning("You have been inactive for 30 second!", {
            position: "bottom-center",
        });
    };

    const handleOnActive = () => {
        console.log("User is active again");
    };

    const handleOnAction = () => {
        console.log("User activity");
    };
    

    useIdleTimer({
        timeout: 60 * 300,
        throttle: 500,
        onIdle: handleIdle,
        onActive: handleOnActive,
        onAction: handleOnAction

    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        dispatch(setFormData(data));
        toast.success("Form successfully submitted!", {
            position: "top-right",
            autoClose: 2000,
        });
        console.log(data);
    };

    return (
        <div className="redux-form-container">
            <h2>ReduxForm</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label>Full name:</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaUser />
                        <input
                            {...register("fullName", { required: "Please enter your name." })}
                        />
                    </div>
                    {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
                </div>

                <div>
                    <label>Email:</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaEnvelope />
                        <input
                            {...register("email", {
                                required: "Please enter your Email.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </div>
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Age:</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaBirthdayCake />
                        <input
                            {...register("age", {
                                required: "Please enter your Age.",
                                min: { value: 18, message: "Minimum age is 18" },
                                max: { value: 100, message: "Maximum age is 100" },
                            })}
                        />
                    </div>
                    {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
                </div>

                <div>
                    <label>Gender: </label>
                    <label>
                        Male
                        <input
                            type="radio"
                            value="male"
                            {...register("gender", { required: "Please select your gender" })}
                        />
                    </label>
                    <label>
                        Female
                        <input
                            type="radio"
                            value="female"
                            {...register("gender")}
                        />
                    </label>
                    {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
                </div>

                <div>
                    <input
                        type="checkbox"
                        {...register("checkbox", { required: "Please do accept the conditions" })}
                    />
                    <label>I accept the terms and conditions</label>
                    {errors.checkbox && <p style={{ color: "red" }}>{errors.checkbox.message}</p>}
                </div>

                <button type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default ReduxForm;
