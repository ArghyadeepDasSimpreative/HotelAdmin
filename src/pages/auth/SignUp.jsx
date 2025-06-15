import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from "../../services/auth.services";
import { showToast } from "../../utils/toast";
import { useState } from "react";

// ✅ Schema updated with password match validation
const signUpSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(1, "Please re-type your password"),
    phoneNumber: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUp = ({ setIsSignUp }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: "propertyOwner",
    };

    try {
      setLoading(true);
      await registerUser(payload);
      showToast.success("Registration successful! Please sign in.");
      setIsSignUp(false);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Registration failed";
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form className="w-full space-y-3">
      <div className="flex gap-2">
        <InputField
          label="First Name"
          {...register("firstname")}
          error={errors.firstname?.message}
        />
        <InputField
          label="Last Name"
          {...register("lastname")}
          error={errors.lastname?.message}
        />
      </div>

      <InputField
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <InputField
        label="Phone Number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />

      <InputField
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <InputField
        label="Re-type Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button label="Sign Up" onClick={handleClick} type="button" loading={loading} />
    </form>
  );
};

export default SignUp;
