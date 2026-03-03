import { Button } from "@/components/ui/button";
import enToBnNum from "@/lib/enToBnNum";
import { Minus } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

const Counter = ({
    countLimit,
    setCurrentSection,
    setCountLimit,
}: {
    countLimit: number | undefined;
    setCurrentSection: (section: string) => void;
    setCountLimit: (limit: number | undefined) => void;
}) => {
    const [count, setCount] = useState<number>(() => {
        const saved = localStorage.getItem("napa-count");
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem("napa-count", count.toString());
    }, [count]);

    useEffect(() => {
        if (countLimit && count >= countLimit) {
            const timer = setTimeout(() => {
                setCurrentSection("complete");
            }, 600); // Small delay to let the user see the final count/progress
            return () => clearTimeout(timer);
        }
    }, [count, countLimit, setCurrentSection]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setCountLimit(undefined);
                localStorage.removeItem("napa-count");
                setCurrentSection("setTheLimit");
            } else if (e.key === " ") {
                e.preventDefault();
                setCount((prev) => prev + 1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setCurrentSection, setCountLimit]);
    const percentage = countLimit
        ? Math.min((count / countLimit) * 100, 100)
        : 0;
    const remaining = countLimit ? Math.max(countLimit - count, 0) : 0;

    const getIndicatorColor = () => {
        if (percentage >= 100) return "bg-emerald-500";
        if (percentage >= 66) return "bg-emerald-400";
        if (percentage >= 33) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-md px-4">
            <div className="w-full space-y-2">
                <div className="flex justify-between items-end text-sm font-medium">
                    <span className="text-[#ABBABA]">
                        নাপা খাওয়ার প্রগ্রেস
                    </span>
                    <span className="text-[#E6F9F9]">
                        <span className="text-2xl font-bold mr-1">
                            {enToBnNum(remaining)}
                        </span>
                        <span className="text-[#ABBABA]">টা বাকি আছে</span>
                    </span>
                </div>
                <Progress
                    value={percentage}
                    className="h-3 bg-[#223131] border border-[#31757A]/30"
                    indicatorClassName={cn(
                        "transition-all duration-500",
                        getIndicatorColor(),
                    )}
                />
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={() => setCount(count + 1)}
                    className="relative flex items-center justify-center w-64 h-64 rounded-full bg-linear-to-br from-[#31757A] to-[#41A4A7] shadow-2xl tap-button hover:scale-105 active:scale-95 active:tap-button-active transition-all z-10"
                >
                    <div className="absolute inset-4 rounded-full border-2 border-[#EDFAFA]/10"></div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-7xl text-[#E6F9F9] font-bold drop-shadow-md">
                            {enToBnNum(count)}
                        </span>
                        <span className="text-sm uppercase tracking-widest mt-2 font-bold text-[#E6F9F9]/80">
                            {count === 0
                                ? "নাপা খেতে টিপুন"
                                : "আরো নাপা খেতে টিপুন"}
                        </span>
                    </div>
                </Button>
            </div>
            <AnimatePresence>
                {count > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: -45 }}
                        className="flex justify-end -mt-[75px] mr-20"
                    >
                        <Button
                            onClick={() => setCount(count - 1)}
                            className="border-[#233C3D] shadow-xl border-2 rounded-full size-14 p-0 hover:bg-[#253737] text-[#EDFAFA] flex items-center justify-center bg-[#1F2D2D] transition-all z-50 cursor-pointer hover:scale-110"
                        >
                            <Minus className="size-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex justify-center mt-12 w-full">
                <Button
                    variant="ghost"
                    onClick={() => {
                        setCountLimit(undefined);
                        localStorage.removeItem("napa-count");
                        setCurrentSection("setTheLimit");
                    }}
                    className="text-[#ABBABA]/60 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer group"
                >
                    <X className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    আজকের মতো আর নাপা গিলতাম নাহ 😫
                </Button>
            </div>
        </div>
    );
};

export default Counter;
