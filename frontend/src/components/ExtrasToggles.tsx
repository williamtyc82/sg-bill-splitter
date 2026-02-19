

interface ExtrasTogglesProps {
    serviceCharge: boolean;
    setServiceCharge: (checked: boolean) => void;
    gst: boolean;
    setGst: (checked: boolean) => void;
}

export default function ExtrasToggles({ serviceCharge, setServiceCharge, gst, setGst }: ExtrasTogglesProps) {
    return (
        <div className="glass-panel rounded-3xl p-1 flex flex-col divide-y divide-white/5">
            {/* Service Charge */}
            <div className="flex items-center justify-between p-5">
                <div className="flex flex-col">
                    <span className="text-base text-white font-medium">Service Charge</span>
                    <span className="text-xs text-slate-400">Add 10% to bill</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                        checked={serviceCharge}
                        onChange={(e) => setServiceCharge(e.target.checked)}
                        className="sr-only peer"
                        type="checkbox"
                    />
                    <div className="w-12 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300"></div>
                </label>
            </div>
            {/* GST */}
            <div className="flex items-center justify-between p-5">
                <div className="flex flex-col">
                    <span className="text-base text-white font-medium">GST Tax</span>
                    <span className="text-xs text-slate-400">Add 9% to bill</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                        checked={gst}
                        onChange={(e) => setGst(e.target.checked)}
                        className="sr-only peer"
                        type="checkbox"
                    />
                    <div className="w-12 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300"></div>
                </label>
            </div>
        </div>
    );
}
