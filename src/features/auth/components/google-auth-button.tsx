"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { cn } from "@/shared/lib/utils";
import { GoogleLogo } from "@/shared/components/icons/google-logo";

interface GoogleAuthButtonProps {
    mode?: "signin" | "signup"
    className?: string
}

export default function GoogleAuthButton({
    mode = "signin",
    className,
}: GoogleAuthButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const label = mode === "signin"
        ? "Sign in with Google"
        : "Sign up with Google"

    const handleGoogleAuth = async () => {
        setIsLoading(true)
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard"
            })
        } catch {
            toast.error("Failed to connect with Google. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className={cn(
                "w-full gap-3 border border-gray-300 bg-white font-medium shadow-sm",
                "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
                "active:bg-gray-100",
                "focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2",
                "transition-all duration-150",
                "disabled:opacity-70 disabled:cursor-not-allowed",
                className
            )}
        >
            {isLoading ? (
                <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="#4285F4"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            ) : (
                <GoogleLogo />
            )}
            <span>{isLoading ? "Conecting..." : label}</span>
        </Button>
    )
}