import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface PeopleSliderProps {
    peopleCount: number;
    setPeopleCount: (count: number) => void;
}

export default function PeopleSlider({ peopleCount, setPeopleCount }: PeopleSliderProps) {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [width, setWidth] = useState(0);

    // Calculate width of the slider track
    useEffect(() => {
        if (constraintsRef.current) {
            setWidth(constraintsRef.current.offsetWidth);
        }
    }, []);

    // Sync x value with peopleCount prop
    useEffect(() => {
        if (width > 0) {
            // We have 20 steps (1 to 20).
            // The thumb is centered on the value.
            // range is [0, width].
            // But actually, the thumb has width.
            // Let's keep it simple: Map 1->0, 20->width (minus thumb width if needed, but for now 0 to width)

            const stepWidth = width / 19;
            const targetX = (peopleCount - 1) * stepWidth;
            animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
        }
    }, [peopleCount, width, x]);

    return (
        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    <span className="text-slate-200 font-medium">Split amongst</span>
                </div>
                <span className="text-primary font-bold text-xl bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                    {peopleCount} Friend{peopleCount !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="px-2 pb-2 relative h-10 flex items-center select-none" ref={constraintsRef}>
                {/* Track Background */}
                <div className="absolute w-full h-2 bg-slate-700 rounded-lg overflow-hidden"></div>

                {/* Active Track */}
                <motion.div
                    className="absolute h-2 bg-primary rounded-l-lg"
                    style={{ width: useTransform(x, (latest) => latest + 12) }}
                />

                {/* Thumb */}
                <motion.div
                    className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white cursor-pointer shadow-[0_0_10px_rgba(37,140,244,0.8)] z-10"
                    style={{ x }}
                    // We don't drag this directly anymore. The input drives the state.
                    // But visual feedback on hover/tap is nice.
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                />

                {/* Invisible native input for accessibility and driving state */}
                <input
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                    type="range"
                    min="1"
                    max="20"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                />
            </div>

            <div className="flex justify-between text-xs text-slate-500 font-medium px-1">
                <span>1</span>
                <span>10</span>
                <span>20</span>
            </div>
        </div>
    );
}
