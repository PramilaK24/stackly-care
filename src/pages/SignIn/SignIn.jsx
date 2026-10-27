import React, { useState } from "react";
import { Icon } from "@iconify/react";
import loginImg from "../../assets/loginImg.png";
import logo from '../../assets/logo.svg';
import Input from '../../components/Input/Input';
import { validateSignIn } from "../../constants/Validations/SiginValidations/SignInValidation";
import Button from "../../components/Button/Button";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (loginSuccess) {
            setLoginSuccess(false);
        }

        // Remove error while user is typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateSignIn(formData);


        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        alert("Login successful");
        console.log("Login successful", formData);
    };

    const isFormFilled =
        formData.userId.trim() !== "" && formData.password.trim() !== "";

    return (
        <div className="w-full h-dvh flex bg-[#F5F5F5] overflow-hidden">
            {/* LEFT SIDE (Visible on large screens, exact desktop visuals preserved) */}
            <div className="hidden lg:block lg:w-[46%] h-full overflow-hidden relative shrink-0">

                {/* Background Image */}
                <img
                    src={loginImg}
                    alt="Healthcare"
                    className="absolute inset-0 w-full h-full object-fill"
                />

                {/* Content Overlay */}
                <div className="absolute top-16 xl:top-24 left-10 xl:left-24 w-102 h-82">
                    {/* Heading + Description */}
                    <div>
                        <h1 className="text-[40px] xl:text-[48px] leading-tight xl:leading-12 font-bold text-[#101820]">
                            Better Care
                            <span className="inline-block w-2 h-2 bg-[#101820] rounded-full ml-1" />
                        </h1>

                        <h1 className="mt-2 text-[40px] xl:text-[48px] leading-tight xl:leading-12 font-bold text-[#248B8F]">
                            Together
                            <span className="inline-block w-2 h-2 bg-[#248B8F] rounded-full ml-1" />
                        </h1>

                        <p className="mt-4 text-[18px] xl:text-[20px] font-medium leading-[100%] text-[#374151]">
                            Secure access to your hospitals
                            <br />
                            healthcare ecosystem.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="w-102 h-23.5 mt-8 flex items-start gap-8">

                        {/* Secure Access */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#248B8F] flex items-center justify-center">
                                <Icon
                                    icon="solar:shield-check-linear"
                                    className="text-white text-[22px]"
                                />
                            </div>

                            <p className="mt-2 text-[12px] leading-[100%] font-medium text-[#4B5563] text-center">
                                Secure
                                <br />
                                Access
                            </p>
                        </div>

                        {/* Connected Teams */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#248B8F] flex items-center justify-center">
                                <Icon
                                    icon="solar:user-linear"
                                    className="text-white text-[22px]"
                                />
                            </div>

                            <p className="mt-2 text-[12px] leading-[100%] font-medium text-[#4B5563] text-center">
                                Connected
                                <br />
                                Teams
                            </p>
                        </div>

                        {/* Better Outcomes */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#248B8F] flex items-center justify-center">
                                <Icon
                                    icon="solar:heart-pulse-linear"
                                    className="text-white text-[22px]"
                                />
                            </div>

                            <p className="mt-2 text-[12px] leading-[100%] font-medium text-[#4B5563] text-center">
                                Better
                                <br />
                                Outcomes
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div
                style={{ "--u": "max(0.7px, min(1px, 0.1111dvh))" }}
                className="w-full lg:w-[54%] h-full bg-white lg:rounded-r-4xl overflow-y-auto overflow-x-hidden"
            >
                <div className="w-full max-w-full min-h-full mx-auto lg:mx-0 px-6 sm:px-10 lg:pr-20 lg:pl-20 pt-[calc(var(--u)*84)] pb-[calc(var(--u)*70)] flex flex-col">

                    {/* Logo */}
                    <div className="flex items-center h-12 shrink-0">
                        <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                            <img src={logo} alt="Stackly Care Plus" className="w-8 h-8.25 object-contain" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[20px] leading-[100%] font-semibold text-[#0B1117]">STACKLY</span>
                            <span className="mt-0.75 text-[10px] leading-[100%] font-semibold tracking-[4px] text-[#248B8F]">
                                CARE PLUS
                            </span>
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="mt-[calc(var(--u)*39)]">
                        <h1 className="text-[34px] leading-none font-semibold text-[#111827]">
                            Welcome Back!
                        </h1>
                        <p className="mt-[calc(var(--u)*18)] text-[16px] leading-none font-normal text-[#6B7280]">
                            Sign In to your account to access stacklycare
                        </p>
                    </div>

                    {/* Form */}
                    <form className="w-full mt-[calc(var(--u)*61)]" onSubmit={handleSubmit} noValidate>

                        <Input
                            label="User ID"
                            required
                            name="userId"
                            type="text"
                            placeholder="Enter your user id"
                            icon="fa7-regular:user"
                            value={formData.userId}
                            onChange={handleChange}
                            error={errors.userId}
                            autoComplete="username"
                        />

                        <div className="mt-[calc(var(--u)*44)]">
                            <Input
                                label="Password"
                                required
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                icon="mdi:lock-outline"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Remember + Forgot */}
                        <div className="mt-[calc(var(--u)*40)] h-[calc(var(--u)*40)] min-h-7 flex items-center justify-between gap-3">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-[#9CA3AF] accent-[#248B8F] cursor-pointer"
                                />
                                <span className="text-[14px] leading-[100%] font-medium text-[#111827]">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                to="/forget-password"
                                className="text-[14px] leading-[100%] font-medium text-[#1D7275] hover:text-[#248B8F] cursor-pointer transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Sign In */}
                        <div className="mt-[calc(var(--u)*19)]">
                            <Button type="submit" disabled={!isFormFilled}>
                                Sign In
                            </Button>
                        </div>
                    </form>

                    {/* Restricted Access: pinned to the bottom */}
                    <div className="mt-auto pt-[calc(var(--u)*24)]">
                        <div className="w-full rounded-xl border-[0.5px] border-[#E6E6E6] bg-[#FCFCFC] p-3.75 flex items-start gap-3">
                            <div className="w-10.5 h-10.5 shrink-0 rounded-lg bg-[#F2F2F2] flex items-center justify-center">
                                <Icon icon="solar:shield-check-linear" className="w-6 h-6 text-[#374151]" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-[14px] leading-[100%] font-medium text-[#111827]">
                                    Restricted Access
                                </h3>
                                <p className="text-[12px] leading-4.25 font-normal text-[#4B5563]">
                                    This portal is for authorized administrators only.
                                    <br />
                                    All activities are logged for security and compliance.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignIn;