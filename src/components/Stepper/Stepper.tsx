"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface StepProps {
  title: string;
  description: string;
}

export interface StepperProps {
  steps: StepProps[];
  currentStep: number;
  completeStep: number;
  setStep: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, setStep, completeStep }) => {
  return (
    <ol className="items-center justify-center w-full space-y-4 sm:space-x-8 sm:space-y-0 grid grid-cols-2 sm:grid-cols-4">
      {steps.map((step, index) => (
        <li key={index}>
          <button
            className={cn(
              "flex items-center space-x-2.5 cursor-not-allowed",
              index === currentStep
                ? "text-blue-600 dark:text-blue-500"
                : index <= completeStep
                ? "text-green-600 dark:text-green-500"
                : "text-gray-500 dark:text-gray-400"
            )}
            onClick={() => {
              if (index <= completeStep) {
                setStep(index);
              }
            }}
          >
            <span
              className={cn(
                "flex items-center justify-center size-6 sm:size-8 border rounded-full shrink-0",
                index === currentStep
                  ? "border-blue-600 dark:border-blue-500"
                  : index <=completeStep
                  ? "border-green-600 dark:border-green-500"
                  : "border-gray-500 dark:border-gray-400"
              )}
            >
              {index + 1}
            </span>
            <span className="text-justify">
              <h3 className="text-sm md:text-base font-medium leading-tight">{step.title}</h3>
              <p className="text-xs md:text-sm">{step.description}</p>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
