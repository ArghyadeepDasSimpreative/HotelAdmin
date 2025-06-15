import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../services/auth.services";
import { showToast } from "../../utils/toast";
import { useState } from "react";

const signInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await loginUser(data);
            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                showToast.success("Logged in successfully");

                setTimeout(() => {
                    navigate("/owner/dashboard");
                }, 1000);
            } else {
                showToast.error("Login failed: No token received");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Login failed";
            showToast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {
        const valid = await trigger();
        if (valid) {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form className="w-full space-y-4">
            <InputField
                label="Email"
                {...register("email")}
                error={errors.email?.message}
            />

            <InputField
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
            />

            <Button label="Sign In" onClick={handleClick} type="button" loading={loading} />
        </form>
    );
};

export default SignIn;
