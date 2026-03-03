import { useState, useEffect } from "react";
import SetTheLimit from "./sections/SetTheLimit";
import Counter from "./sections/Counter";
import Header from "./components/Header";
import SessionComplete from "./sections/SessionComplete";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
    const [countLimit, setCountLimit] = useState<number | undefined>(() => {
        const saved = localStorage.getItem("napa-limit");
        return saved ? parseInt(saved, 10) : undefined;
    });
    const [currentSection, setCurrentSection] = useState(() => {
        return localStorage.getItem("napa-section") || "setTheLimit";
    });

    useEffect(() => {
        if (countLimit !== undefined) {
            localStorage.setItem("napa-limit", countLimit.toString());
        } else {
            localStorage.removeItem("napa-limit");
        }
    }, [countLimit]);

    useEffect(() => {
        localStorage.setItem("napa-section", currentSection);
    }, [currentSection]);

    return (
        <div className="w-screen h-full min-h-screen flex flex-col gap-10 items-center justify-center bg-[#1F2D2D] py-10 overflow-x-hidden select-none">
            <AnimatePresence mode="wait">
                {currentSection !== "complete" && (
                    <motion.div
                        key="header"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Header />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {currentSection === "setTheLimit" && (
                    <motion.div
                        key="setTheLimit"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex justify-center"
                    >
                        <SetTheLimit
                            countLimit={countLimit}
                            setCountLimit={setCountLimit}
                            setCurrentSection={setCurrentSection}
                        />
                    </motion.div>
                )}

                {currentSection === "counter" && (
                    <motion.div
                        key="counter"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex justify-center"
                    >
                        <Counter
                            countLimit={countLimit}
                            setCurrentSection={setCurrentSection}
                            setCountLimit={setCountLimit}
                        />
                    </motion.div>
                )}

                {currentSection === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex justify-center"
                    >
                        <SessionComplete
                            countLimit={countLimit}
                            setCurrentSection={setCurrentSection}
                            setCountLimit={setCountLimit}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
}

export default App;
