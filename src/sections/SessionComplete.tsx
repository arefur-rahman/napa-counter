import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";
import enToBnNum from "@/lib/enToBnNum";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const congratsMessages = [
    "অভিনন্দন! আপনি সফলভাবে আজকের নাপার চ্যালেঞ্জ কমপ্লিট করেছেন। কন্টিনিউ ব্রো; হবে আপনাকে দিয়েই হবে জাতি খুঁজছে আপনাকে।👑",
    "ওয়াও! আপনি নাপা শেষ করলেন! নাসিরউদ্দিন পাটওয়ারী নিজেও এত দ্রুত কাউন্ট শেষ করতে পারেননি। আপনি লিজেন্ড! 🏆",
    "মাশাআল্লাহ! আজকের ডোজ কমপ্লিট। নাসির ভাই বলেছেন দিনে এক-দুইটা নাপা খেলে আব্বাস আঙ্কেলের টেনশন কমে — আপনি প্রমাণ করলেন! 💊",
    "বাহ বাহ! নাপা কাউন্ট শেষ! এই দেশে যখন সব শেষ হয়ে যায়, তখনও আপনার মতো মানুষ থাকে বলেই জাতি বাঁচে। নাপা খান, সুস্থ থাকুন! 😤🇧🇩",
    "কংগ্রেটস ব্রো! কাউন্ট ডাউন শেষ। নাপা যেমন মাথাব্যথা সারায়, আপনিও তেমনি এই চ্যালেঞ্জ সারিয়ে দিলেন। জাতি কৃতজ্ঞ! 🙏",
    "আলহামদুলিল্লাহ! মিশন কমপ্লিট। NaPa Counter জয় করা মানুষ কিন্তু সাধারণ না — আপনি অসাধারণ, NaPa-র মতোই কার্যকর! ⚡",
    "ইয়েস! শেষ করলেন! নাসিরউদ্দিন পাটওয়ারী রাজনীতিতে যা পারেননি, আপনি কাউন্টারে তা করে দেখালেন। সালাম আপনাকে! 🫡",
    "ব্রাভো! নাপা কাউন্ট ডাউন কমপ্লিট! মাথাব্যথা গেছে? না গেলে আরেকটা নাপা নিন, এইবার NaPa না, আসল নাপা! 😂💊",
    "অসাধারণ! আপনি প্রমাণ করলেন ধৈর্য্য থাকলে সব কাউন্ট শেষ হয়। NaPa-ও একদিন শেষ হবে — ততদিন নাপা খান! 😏🔥",
    "গ্রেট জব! কাউন্টার জিরো হইছে, কিন্তু আপনার হোপ জিরো হয়নি। এটাই আসল জিত। নাপা-র দেশে আপনিই আসল হিরো! 🦸",
    "ওহ মাই গড! শেষ করলেন?! NaPa Counter কমপ্লিট করা মানুষ বিরল — আপনি সেই বিরল প্রজাতির একজন। এনভায়রনমেন্ট প্রোটেক্টেড! 😂🌿",
    "ডান! কাউন্ট শেষ, পেইন শেষ। যেমন না্পা ব্যথা সারায়, আপনিও এই চ্যালেঞ্জের ব্যথা সারিয়ে দিলেন। আপনি মানুষ না, আপনি ওষুধ! 💉😂",
];

const SessionComplete = ({
    countLimit,
    setCurrentSection,
    setCountLimit,
}: {
    countLimit: number | undefined;
    setCurrentSection: (section: string) => void;
    setCountLimit: (limit: number | undefined) => void;
}) => {
    const [randomMessage] = useState(() => {
        const randomIndex = Math.floor(Math.random() * congratsMessages.length);
        return `"${congratsMessages[randomIndex]}"`;
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCountLimit(undefined);
                localStorage.removeItem("napa-count");
                setCurrentSection("setTheLimit");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setCurrentSection, setCountLimit]);

    return (
        <div className="flex flex-col items-center gap-10 w-full max-w-md px-4 text-center">
            <div className="flex flex-col items-center gap-6">
                <div className="size-32 rounded-full bg-[#31757A]/20 flex items-center justify-center border-4 border-[#31757A]/30">
                    <Sparkles className="size-16 text-[#41A4A7] animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-[#E6F9F9]">
                        আজকের নাপা খাওয়া শেষ! 🎉
                    </h2>
                    <p className="text-[#ABBABA]">
                        আপনি আজকে মোট {enToBnNum(countLimit || 0)} পিস নাপা
                        সাবাড় করেছেন।
                    </p>
                </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-[#223131] border border-[#31757A]/20 text-[#ABBABA] shadow-inner">
                <TextGenerateEffect
                    words={randomMessage}
                    className="text-sm font-normal"
                />
            </div>

            <Button
                onClick={() => {
                    setCountLimit(undefined);
                    localStorage.removeItem("napa-count");
                    setCurrentSection("setTheLimit");
                }}
                className="bg-[#32777C] hover:bg-[#41A4A7] text-white w-full h-16 text-xl font-bold transition-all shadow-lg rounded-xl cursor-pointer flex items-center justify-center gap-3"
            >
                <RotateCcw className="size-6" />
                আরো খাবেন?
            </Button>
        </div>
    );
};

export default SessionComplete;
