import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

/* One slot = one skeleton block AND the place where real content goes.
   Same size in both states, so nothing jumps when loading ends. */
const Slot = ({ loading, className = "", children }) => (
    <div
        className={`rounded-md ${className} ${
            loading ? "bg-[#F7F7F7] animate-pulse" : ""
        }`}
    >
        {!loading && children}
    </div>
);

const steps = [
    "Enter your registered User ID",
    "Receive a reset link on your registered email",
    "Create a new password and sign in",
];

const tips = [
    "Use at least 8 characters",
    "Include upper and lower case letters",
    "Add at least one number and one symbol",
    "Do not reuse your last 3 passwords",
    "Never share your password or reset link",
];

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    // Demo delay. Replace with your real API call and call setLoading(false) when it finishes.
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError("User ID is required");
            return;
        }
        setError("");
        setSent(true);
    };

    return (
        <div className="min-h-dvh bg-[#F7F7F7] px-4 sm:px-8 pt-10 lg:pt-21.75 pb-12">
            <div className="mx-auto w-full max-w-304">

                {/* Back pill: 181 x 54, white in both states */}
                <div className="w-45.25 h-13.5 mb-1.75 rounded-md bg-white flex items-center justify-center">
                    {!loading && (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 text-[14px] font-medium text-[#1D7275] cursor-pointer"
                        >
                            <Icon icon="solar:arrow-left-linear" className="text-[18px]" />
                            Back to Sign In
                        </Link>
                    )}
                </div>

                {/* Card: 1216 wide, min 784 high, radius 16, 0.5px border */}
                <div className="w-full lg:min-h-196 rounded-2xl border-[0.5px] border-[#E6E6E6] bg-white shadow-sm px-6 sm:px-10 lg:px-14 py-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-28 gap-y-10">

                    {/* ---------- LEFT COLUMN ---------- */}
                    <div className="flex flex-col">

                        {/* Header: 181 x 54, centered */}
                        <Slot loading={loading} className="w-45.25 h-13.5 mx-auto">
                            <div className="h-full flex items-center justify-center">
                                <img src={logo} alt="Stackly Care Plus" className="w-8 h-8.25 object-contain" />
                                <div className="ml-3 flex flex-col">
                                    <span className="text-[20px] leading-none font-semibold text-[#0B1117]">STACKLY</span>
                                    <span className="mt-1 text-[10px] leading-none font-semibold tracking-[4px] text-[#248B8F]">
                                        CARE PLUS
                                    </span>
                                </div>
                            </div>
                        </Slot>

                        {/* Title + description: 496 x 104 */}
                        <Slot loading={loading} className="mt-8 lg:mt-26 min-h-26 lg:h-26">
                            <h1 className="text-[28px] leading-none font-semibold text-[#111827]">
                                Forgot Password?
                            </h1>
                            <p className="mt-4 text-[14px] leading-5.5 text-[#6B7280]">
                                Enter your User ID and we will send a secure link to your
                                registered email so you can reset your password.
                            </p>
                        </Slot>

                        {/* Form: 496 x 224 */}
                        <Slot loading={loading} className="mt-8 lg:mt-19 min-h-56 lg:h-56">
                            <form onSubmit={handleSubmit} noValidate className="h-full flex flex-col justify-between">
                                <Input
                                    label="User ID"
                                    required
                                    name="userId"
                                    type="text"
                                    placeholder="Enter your user id"
                                    icon="carbon:user"
                                    value={userId}
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                        setError("");
                                        setSent(false);
                                    }}
                                    error={error}
                                    autoComplete="username"
                                />
                                <p className="text-[12px] leading-4.5 text-[#6B7280]">
                                    The link is valid for 15 minutes. Check your spam folder if
                                    you do not see it.
                                </p>
                                <Button type="submit" disabled={!userId.trim()}>
                                    Send Reset Link
                                </Button>
                            </form>
                        </Slot>

                        {/* Help box: 496 x 128 */}
                        <Slot loading={loading} className="mt-8 lg:mt-7.5 min-h-32 lg:h-32">
                            <div className="h-full rounded-md border-[0.5px] border-[#E6E6E6] bg-[#FCFCFC] p-4 flex items-start gap-3">
                                <div className="w-10.5 h-10.5 shrink-0 rounded-lg bg-[#F2F2F2] flex items-center justify-center">
                                    <Icon icon="solar:shield-check-linear" className="w-6 h-6 text-[#374151]" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-[14px] leading-none font-medium text-[#111827]">Need help?</h3>
                                    <p className="text-[12px] leading-4.5 text-[#4B5563]">
                                        If you no longer have access to your registered email,
                                        contact your system administrator to reset your account.
                                    </p>
                                </div>
                            </div>
                        </Slot>
                    </div>

                    {/* ---------- RIGHT COLUMN ---------- */}
                    <div className="flex flex-col">

                        {/* Status: 496 x 71 */}
                        <Slot loading={loading} className="min-h-17.75 lg:h-17.75">
                            <div
                                className={`h-full rounded-md border px-4 flex items-center gap-3 ${
                                    sent
                                        ? "bg-[#E6F4F2] border-[#248B8F]/30"
                                        : "bg-[#FCFCFC] border-[#E6E6E6]"
                                }`}
                            >
                                <Icon
                                    icon={sent ? "solar:check-circle-bold" : "solar:clock-circle-linear"}
                                    className={`text-[24px] shrink-0 ${sent ? "text-[#248B8F]" : "text-[#6B7280]"}`}
                                />
                                <div>
                                    <p className="text-[14px] leading-none font-medium text-[#111827]">
                                        {sent ? "Reset link sent" : "Waiting for your request"}
                                    </p>
                                    <p className="mt-1.5 text-[12px] leading-none text-[#6B7280]">
                                        {sent
                                            ? "Check your registered email to continue."
                                            : "Submit your User ID to start recovery."}
                                    </p>
                                </div>
                            </div>
                        </Slot>

                        {/* Steps: 496 x 194 */}
                        <Slot loading={loading} className="mt-6 min-h-48.5 lg:h-48.5">
                            <div className="h-full rounded-md border border-[#E6E6E6] p-5">
                                <h3 className="text-[14px] leading-none font-semibold text-[#111827]">How it works</h3>
                                <ul className="mt-5 flex flex-col gap-4">
                                    {steps.map((s, i) => (
                                        <li key={s} className="flex items-center gap-3 text-[14px] text-[#374151]">
                                            <span className="w-6 h-6 shrink-0 rounded-full bg-[#248B8F] text-white text-[12px] font-medium flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Slot>

                        {/* Password guidelines: 496 x 302 */}
                        <Slot loading={loading} className="mt-12 min-h-75.5 lg:h-75.5">
                            <div className="h-full rounded-md border border-[#E6E6E6] p-5">
                                <h3 className="text-[14px] leading-none font-semibold text-[#111827]">
                                    Password guidelines
                                </h3>
                                <ul className="mt-5 flex flex-col gap-4">
                                    {tips.map((t) => (
                                        <li key={t} className="flex items-start gap-3 text-[14px] text-[#374151]">
                                            <Icon icon="solar:check-circle-linear" className="text-[20px] text-[#248B8F] shrink-0" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Slot>

                        {/* Back button: 496 x 48 */}
                        <Slot loading={loading} className="mt-8 lg:mt-7.75 h-12">
                            <Button variant="outline" className="h-12!" onClick={() => navigate("/login")}>
                                Back to Sign In
                            </Button>
                        </Slot>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;