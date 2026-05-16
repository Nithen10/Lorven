'use client';

import { useState } from 'react';

type Step = {
  title: string;
  body: string;
};

interface ServiceStepsAccordionProps {
  steps: Step[];
}

export function ServiceStepsAccordion({ steps }: ServiceStepsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4 flex flex-col">
      {steps.map((step, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={step.title}
            className="border-t border-white/12 py-4 last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full min-h-11 items-center justify-between gap-4 sm:gap-5 py-1.5 text-left"
            >
              <span
                className="pr-4 sm:pr-6 text-[1.05rem] sm:text-[1.2rem] md:text-[1.4rem] font-semibold leading-snug text-white transition-colors duration-300"
                style={{ fontFamily: '"Neue Montreal", "Inter", sans-serif' }}
              >
                {step.title}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white/50 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${
                isOpen ? 'mt-2.5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className="max-w-[40rem] pr-4 sm:pr-8 text-base sm:text-[1.1rem] md:text-[1.2rem] leading-[1.7] sm:leading-[1.8] tracking-[0.015em] text-white/85"
                  style={{ fontFamily: '"Neue Montreal", "Inter", sans-serif', fontWeight: 400 }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
