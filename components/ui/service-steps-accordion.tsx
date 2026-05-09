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
              className="flex w-full items-center justify-between gap-5 py-1 text-left"
            >
              <span className="pr-6 text-[0.98rem] md:text-[1.05rem] font-semibold leading-snug text-white transition-colors duration-300">
                {step.title}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 text-white/50 transition-transform duration-300 ${
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
                  className="max-w-[40rem] pr-8 text-xs leading-[1.8] text-white/55 md:text-[0.82rem]"
                  style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 300 }}
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
