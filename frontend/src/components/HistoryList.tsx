

export interface HistoryItem {
    id: string;
    date: string; // ISO string
    billName: string;
    totalBill: number;
    peopleCount: number;
    amountPerPerson: number;
    serviceCharge: boolean;
    gst: boolean;
}

interface HistoryListProps {
    history: HistoryItem[];
    onRestore: (item: HistoryItem) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function HistoryList({ history, onRestore, onDelete }: HistoryListProps) {
    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">history</span>
                <p>No recent bills found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {history.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onRestore(item)}
                    className="glass-panel p-4 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors border border-white/5 hover:border-white/20 group relative"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-white text-lg">{item.billName || 'Unnamed Bill'}</h3>
                            <p className="text-xs text-slate-400">
                                {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-primary font-bold text-xl">${item.amountPerPerson.toFixed(2)}</p>
                            <p className="text-xs text-slate-400">per person</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-500 border-t border-white/5 pt-2 mt-2">
                        <span>Total: ${item.totalBill.toFixed(2)}</span>
                        <span>{item.peopleCount} pax</span>
                        <div className="flex gap-1">
                            {item.serviceCharge && <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">10%</span>}
                            {item.gst && <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">9%</span>}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id, e);
                        }}
                        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-colors"
                        title="Delete"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            ))}
        </div>
    );
}
