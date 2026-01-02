"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import TypingText from "@/components/TypingText";
import CountdownTimer from "@/components/CountdownTimer";
import RestartButton from "@/components/RestartButton";
import Results from "@/components/Results";
import UserTypings from "@/components/UserTypings";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage } from "@/utils/helpers";

export default function Home() {
    const { state, words, timeLeft, typed, errors, totalTyped, restart } = useEngine();

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <CountdownTimer timeLeft={timeLeft} />
            <WordsContainer>
                <TypingText text={words} />
                <UserTypings className="absolute inset-0" userInput={typed} words={words}/>
            </WordsContainer>
            <RestartButton onRestart={restart} />
            <Results
                state={state}
                className="mt-10"
                errors={errors}
                accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
                total={totalTyped}
            />
        </main>
    );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-after-all">
            {children}
        </div>
    );
}
