

interface ActionButtonsProps {
    onReset: () => void;
    onShare: () => void;
}

export default function ActionButtons({ onReset, onShare }: ActionButtonsProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <button
                onClick={onReset}
                className="col-span-1 h-14 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm shadow-3d hover:translate-y-[2px] hover:shadow-3d-active active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center border border-slate-700 hover:bg-slate-700 active:bg-slate-800"
                aria-label="Reset"
            >
                <span className="material-symbols-outlined">restart_alt</span>
            </button>
            <button
                onClick={onShare}
                className="col-span-3 h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-[0_4px_0_rgb(23,87,163)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(23,87,163)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 active:bg-blue-600"
            >
                <span className="material-symbols-outlined text-[20px]">share</span>
                Share Details
            </button>
        </div>
    );
}
