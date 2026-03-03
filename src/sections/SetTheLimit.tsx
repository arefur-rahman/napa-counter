import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SetTheLimit = ({
    countLimit,
    setCountLimit,
    setCurrentSection,
}: {
    countLimit: number | undefined;
    setCountLimit: (countLimit: number | undefined) => void;
    setCurrentSection: (section: string) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex flex-col items-center gap-10 w-full max-w-md px-4">
            <Card className="bg-[#223131] border-0 shadow-2xl w-full">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-[#ABBABA] font-semibold tracking-tight text-2xl">
                        নাপা কয় পিস গিলবেন আজকে?
                    </CardTitle>
                    <CardDescription className="text-[#ABBABA]/70 text-sm">
                        জাস্ট আপনার নাপা লিমিট সেট করুন আর ততক্ষণ পর্যন্ত টিপতে
                        থাকুন 🐸
                    </CardDescription>
                </CardHeader>
                <CardContent className="py-4">
                    <Input
                        ref={inputRef}
                        type="number"
                        placeholder="কয় পিস নাপা? 🥴"
                        className="text-center placeholder:text-[#ABBABA]/50 text-[#E6F9F9] h-20 placeholder:text-2xl text-4xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={countLimit || ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                                setCountLimit(undefined);
                            } else {
                                setCountLimit(Number(val));
                            }
                        }}
                        onKeyDown={(e) => {
                            if (
                                (e.key === "Enter" || e.key === " ") &&
                                countLimit &&
                                countLimit > 0
                            ) {
                                e.preventDefault();
                                setCurrentSection("counter");
                            }
                        }}
                    />
                </CardContent>
                <CardFooter className="pt-2">
                    <Button
                        disabled={!countLimit || countLimit <= 0}
                        onClick={() => setCurrentSection("counter")}
                        className="bg-[#32777C] hover:bg-[#2b6d6f] disabled:opacity-50 disabled:cursor-not-allowed text-white w-full h-16 text-xl font-bold transition-all shadow-lg rounded-xl cursor-pointer"
                    >
                        টিপাটিপি শুরু করুন
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SetTheLimit;
