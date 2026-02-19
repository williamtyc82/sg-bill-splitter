

interface ResultDisplayProps {
    amountPerPerson: number;
    totalWithFees: number;
}

export default function ResultDisplay({ amountPerPerson, totalWithFees }: ResultDisplayProps) {
    return (
        <div className="relative w-full rounded-3xl p-6 glass-panel border border-white/10 animate-pulse-neon flex flex-col items-center justify-center text-center overflow-hidden shadow-glass">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/30 blur-[40px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/30 blur-[40px] rounded-full pointer-events-none"></div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1 relative z-10">Amount Per Person</p>
            <div className="flex items-baseline relative z-10 drop-shadow-[0_0_10px_rgba(37,140,244,0.5)]">
                <span className="text-3xl font-bold text-primary mr-1">$</span>
                <span className="text-6xl font-extrabold text-white tracking-tighter">{amountPerPerson.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-xs text-slate-400 font-medium relative z-10">
                Total with fees: ${totalWithFees.toFixed(2)}
            </div>
        </div>
    );
}
