import React from "react";
import { Icon } from "@iconify/react";
import loginImg from "../../assets/loginImg.png";
import logo from '../../assets/logo.svg'

const SignIn = () => {
    return (
        <div className="w-full h-screen flex box-border overflow-hidden bg-[#F5F5F5]">

            {/* LEFT SIDE */}
            <div className="w-[46%] h-full  overflow-hidden relative">

                {/* Background Image */}
                <img
                    src={loginImg}
                    alt="Healthcare"
                    className="absolute inset-0 w-full h-full object-fill"
                />

                {/* Content Overlay */}
                <div className="absolute top-24 left-24 w-102 h-82">
                    {/* Heading + Description */}
                    <div>
                        <h1 className="text-[48px] leading-12 font-bold text-[#101820]">
                            Better Care
                            <span className="inline-block w-2 h-2 bg-[#101820] rounded-full" />
                        </h1>

                        <h1 className="mt-2 text-[48px] leading-12 font-bold text-[#248B8F]">
                            Together
                            <span className="inline-block w-2 h-2 bg-[#248B8F] rounded-full" />
                        </h1>

                        <p className="mt-4 text-[20px] font-medium leading-[100%]  text-[#374151]">
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
            <div className="w-[54%] h-full flex flex-col bg-white rounded-r-4xl overflow-hidden">
                {/* Header */}
                <div className="w-full h-28 px-18 py-4 flex items-center">
                    <div className="w-130 h-12 flex items-center">

                        {/* Logo */}
                        <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                            <img
                                src={logo}
                                alt="Stackly Care Plus"
                                className="w-8 h-8.25 object-contain"
                            />
                        </div>

                        {/* Logo Text */}
                        <div className="ml-1 flex flex-col justify-center">
                            <span className="text-[18px] leading-[100%] font-semibold text-[#0B1117]">
                                STACKLY
                            </span>

                            <span className="mt-0.75 text-[10px] leading-[100%] font-semibold tracking-[4.1px] text-[#248B8F]">
                                CARE PLUS
                            </span>
                        </div>

                    </div>
                </div>


                {/* Welcome + Form */}
                <div className="w-full px-16">

                    {/* Welcome */}
                    <div className="w-130 h-28 flex flex-col justify-center gap-3">

                        <h1 className="text-[28px] leading-[100%] font-semibold text-[#111827]">
                            Welcome Back!
                        </h1>

                        <p className="text-[14px] leading-[100%] font-normal text-[#6B7280]">
                            Sign In to your account to access stacklycare
                        </p>

                    </div>


                    {/* Form */}
                    <form className="w-130 mt-8">

                        {/* User ID */}
                        <div className="w-full">

                            <label className="block mb-2 text-[14px] leading-[100%] font-medium text-[#374151]">
                                User ID <span className="text-[#D92D20]">*</span>
                            </label>

                            <div className="relative w-full h-14">

                                <Icon
                                    icon="solar:user-linear"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] text-[20px]"
                                />

                                <input
                                    type="text"
                                    placeholder="Enter your user ID"
                                    className="w-full h-full pl-12 pr-6 rounded-lg border border-[#D9D9D9] bg-white outline-none text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#248B8F]"
                                />

                            </div>
                        </div>


                        {/* Password */}
                        <div className="w-full mt-8">

                            <label className="block mb-2 text-[14px] leading-[100%] font-medium text-[#374151]">
                                Password <span className="text-[#D92D20]">*</span>
                            </label>

                            <div className="relative w-full h-14">

                                {/* Lock */}
                                <Icon
                                    icon="solar:lock-keyhole-linear"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] text-[20px]"
                                />

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full h-full pl-12 pr-12 rounded-lg border border-[#D9D9D9] bg-white outline-none text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#248B8F]"
                                />

                                {/* Eye */}
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <Icon
                                        icon="solar:eye-linear"
                                        className="text-[#4B5563] text-[20px]"
                                    />
                                </button>

                            </div>
                        </div>


                        {/* Remember + Forgot */}
                        <div className="w-full h-10 mt-5 px-0 py-2 flex items-center justify-between">

                            {/* Remember */}
                            <label className="flex items-center gap-2 cursor-pointer">

                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-[#9CA3AF] accent-[#248B8F]"
                                />

                                <span className="text-[14px] leading-[100%] font-medium text-[#374151]">
                                    Remember me
                                </span>

                            </label>


                            {/* Forgot */}
                            <button
                                type="button"
                                className="text-[14px] leading-[100%] font-medium text-[#1D7275]"
                            >
                                Forgot Password?
                            </button>

                        </div>


                        {/* Sign In */}
                        <div className="w-full pt-6 pb-12">

                            <button
                                type="submit"
                                className="w-full h-14 px-6 rounded-lg bg-[#248B8F] text-white text-[14px] font-medium hover:bg-[#1D7275] transition-colors"
                            >
                                Sign In
                            </button>

                        </div>

                    </form>
                </div>


                {/* Restricted Access */}
                <div className="w-full px-16 pt-21 pb-21">

                    <div className="w-130 h-24 rounded-xl border-[0.5px] border-[#E6E6E6] bg-[#FCFCFC] p-4 flex items-center gap-3">

                        {/* Secure Icon */}
                        <div className="w-12 h-12 shrink-0 rounded-lg bg-[#F2F2F2] flex items-center justify-center">

                            <Icon
                                icon="solar:shield-check-linear"
                                className="w-8 h-8 text-[#374151]"
                            />

                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-1">

                            <h3 className="text-[14px] leading-[100%] font-medium text-[#111827]">
                                Restricted Access
                            </h3>

                            <p className="text-[12px] leading-[100%] font-normal text-[#4B5563]">
                                This portal is for authorized administrators only.
                                <br />
                                All activities are logged for security and compliance.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default SignIn;