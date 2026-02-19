

import { useState } from 'react';

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
    onDelete: (ids: string[]) => void;
}

export default function HistoryList({ history, onRestore, onDelete }: HistoryListProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const isSelectionMode = selectedIds.size > 0;

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkDelete = () => {
        if (selectedIds.size === 0) return;
        if (confirm(`Delete ${selectedIds.size} item(s)?`)) {
            onDelete(Array.from(selectedIds));
            setSelectedIds(new Set());
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === history.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(history.map(item => item.id)));
        }
    };

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">history</span>
                <p>No recent bills found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 relative">
            <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl sticky top-0 z-10 backdrop-blur-md border border-white/5">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={history.length > 0 && selectedIds.size === history.length}
                        onChange={toggleSelectAll}
                        className="w-5 h-5 rounded border-slate-500 text-primary focus:ring-primary bg-slate-700/50"
                    />
                    <span className="text-sm text-slate-300">
                        {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select All'}
                    </span>
                </div>
                {selectedIds.size > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Delete
                    </button>
                )}
            </div>

            {history.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        if (isSelectionMode) {
                            toggleSelection(item.id);
                        } else {
                            onRestore(item);
                        }
                    }}
                    className={`glass-panel p-4 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors border group relative flex gap-3 items-start ${selectedIds.has(item.id) ? 'bg-primary/10 border-primary/30' : 'border-white/5 hover:border-white/20'}`}
                >
                    <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="checkbox"
                            checked={selectedIds.has(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className="w-5 h-5 rounded border-slate-500 text-primary focus:ring-primary bg-slate-700/50 cursor-pointer"
                        />
                    </div>

                    <div className="flex-1">
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
                    </div>
                </div>
            ))}
        </div>
    );
}
