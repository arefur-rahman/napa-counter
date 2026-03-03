import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-16 w-full min-w-0 rounded-xl border border-[#31757A] bg-transparent px-8 py-2 text-3xl font-normal text-white text-center shadow-none transition-all selection:bg-[#41A4A7]/30 selection:text-white placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-3xl",
                "focus-visible:border-[#41A4A7]  focus-visible:outline-2 focus-visible:outline-[#31757A] focus-visible:outline-offset-4",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
