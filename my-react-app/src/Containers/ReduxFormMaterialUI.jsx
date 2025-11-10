import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../slices/reduxFormSlice";
import {
    Box,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Checkbox,
    Alert,
} from "@mui/material";

const ReduxFormMaterialUI = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({ mode: "onChange" });

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(setFormData(data));
        console.log(data);
    };

    return (
        <Box
            sx={{
                maxWidth: 220,
                mx: "auto",
                mt: 5,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography color="black" variant="h5" gutterBottom align="center">
                Redux Form (Material UI)
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full name */}
                <TextField
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    {...register("fullName", { required: "Please enter your name." })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                />

                {/* Email */}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    {...register("email", {
                        required: "Please enter your Email.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                {/* Age */}
                <TextField
                    label="Age"
                    type="number"
                    fullWidth
                    margin="normal"
                    {...register("age", {
                        required: "Please enter your Age.",
                        min: { value: 18, message: "Minimum age is 18" },
                        max: { value: 100, message: "Maximum age is 100" },
                    })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                />

                {/* Gender */}
                <FormControl
                    component="fieldset"
                    margin="normal"
                    error={!!errors.gender}
                >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row>
                        <FormControlLabel
                            value="male"
                            control={<Radio {...register("gender", { required: "Please select your gender" })} />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio {...register("gender")} />}
                            label="Female"
                        />
                    </RadioGroup>
                    {errors.gender && (
                        <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                            {errors.gender.message}
                        </Alert>
                    )}
                </FormControl>

                {/* Terms checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox
                            {...register("checkbox", {
                                required: "Please accept the terms and conditions",
                            })}
                            color="primary"
                        />
                    }
                    label="I accept the terms and conditions"
                />
                {errors.checkbox && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                        {errors.checkbox.message}
                    </Alert>
                )}

                {/* Submit button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid || isSubmitting}
                    sx={{ mt: 3 }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Box>
    );
};

export default ReduxFormMaterialUI;