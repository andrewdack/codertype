import { motion } from "framer-motion";

export default function Caret({ blinking = true }: { blinking?: boolean }) {
    return (
        <motion.div
            aria-hidden={true}
            layoutId="caret"
            initial={{ opacity: 1 }}
            animate={{ opacity: blinking ? 0 : 1 }}
            exit={{ opacity: 1 }}
            transition={{
                opacity: blinking
                    ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
                    : { duration: 0 },
                layout: { duration: 0.05, ease: "easeOut" },
            }}
            className="inline-block bg-slate-300 w-0.5 h-3 sm:h-4 md:h-5 lg:h-5 xl:h-6 absolute mt-0.5 sm:mt-1"
        />
    );
}
