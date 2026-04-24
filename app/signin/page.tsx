"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button, Header, Card, Checkbox, Input, Label, FieldError, TextField, Description } from "@heroui/react";

export default function SignInPage() {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onSuccess(ctx) {
                //      
            },
            onError(err) {
                alert(`Sign in failed: ${err.error.message}`);
            }
        })
    };

    return (
        <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 sm:px-6">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />
            </div>

            <Card className="relative w-full max-w-md border border-white/15 bg-zinc-900/75 backdrop-blur-xl">
                <Header className="gap-6 p-7 sm:p-8">
                    <div className="space-y-2 text-center">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                            Welcome Back
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-white">
                            Sign in to SmartHome
                        </h1>
                        <p className="text-sm text-zinc-300">
                            Control rooms, monitor devices, and manage your home in one place.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={onSubmit}>
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>

                        <div className="flex items-center justify-between text-sm">
                            <Checkbox className="text-zinc-300">Remember me</Checkbox>
                            <Link
                                href="/forgot-password"
                                className="font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-xl bg-cyan-400 font-semibold text-zinc-950 transition hover:bg-cyan-300"
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="text-center text-sm text-zinc-300">
                        New here?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                        >
                            Create an account
                        </Link>
                    </p>
                </Header>
            </Card>
        </section>
    );
}