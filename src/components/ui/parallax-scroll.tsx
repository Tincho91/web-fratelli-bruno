/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { cn } from "../../../libs/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn(
        "relative mx-auto max-w-6xl rounded-4xl border border-border/60 bg-background/80 px-6 py-16 sm:px-10 backdrop-blur shadow-[0_40px_80px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_65%)]" aria-hidden />
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div key={`grid-1-${idx}`}>
              <img
                src={el}
                className="h-80 w-full rounded-3xl border border-border/60 object-cover object-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div key={`grid-2-${idx}`}>
              <img
                src={el}
                className="h-80 w-full rounded-3xl border border-border/60 object-cover object-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div key={`grid-3-${idx}`}>
              <img
                src={el}
                className="h-80 w-full rounded-3xl border border-border/60 object-cover object-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
