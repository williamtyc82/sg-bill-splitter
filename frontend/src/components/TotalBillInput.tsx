import React from 'react';

interface TotalBillInputProps {
    billAmount: number;
    setBillAmount: (amount: number) => void;
}

export default function TotalBillInput({ billAmount, setBillAmount }: TotalBillInputProps) {
    return (
        <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <label className="text-slate-400 text-sm font-medium uppercase tracking-wider" htmlFor="total-bill">Total Bill</label>
            <div className="flex items-baseline justify-center w-full">
                <span className="text-4xl font-bold text-white/60 mr-1">$</span>
                <input
                    className="bg-transparent border-none text-center text-5xl font-extrabold text-white p-0 w-48 focus:ring-0 placeholder:text-white/20 outline-none"
                    id="total-bill"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={billAmount || ''}
                    onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                />
            </div>
        </div>
    );
}
