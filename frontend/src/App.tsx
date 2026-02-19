import { useState, useEffect } from "react";
import TotalBillInput from "./components/TotalBillInput";
import PeopleSlider from "./components/PeopleSlider";
import ExtrasToggles from "./components/ExtrasToggles";
import ResultDisplay from "./components/ResultDisplay";
import ActionButtons from "./components/ActionButtons";
import HistoryList, { type HistoryItem } from "./components/HistoryList";

type Tab = 'calculator' | 'history';

export default function App() {
  // --- State: Calculator ---
  const [billAmount, setBillAmount] = useState<number>(0);
  const [peopleCount, setPeopleCount] = useState<number>(() => {
    const saved = localStorage.getItem('peopleCount');
    return saved ? parseInt(saved, 10) : 4;
  });
  const [serviceCharge, setServiceCharge] = useState<boolean>(true);
  const [gst, setGst] = useState<boolean>(false);

  // --- State: New Features ---
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [billName, setBillName] = useState<string>('');
  const [paynowNumber, setPaynowNumber] = useState<string>(() => {
    return localStorage.getItem('paynowNumber') || '';
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('billHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('peopleCount', peopleCount.toString());
  }, [peopleCount]);

  useEffect(() => {
    localStorage.setItem('paynowNumber', paynowNumber);
  }, [paynowNumber]);

  useEffect(() => {
    localStorage.setItem('billHistory', JSON.stringify(history));
  }, [history]);

  // --- Calculation ---
  const calculateTotal = () => {
    let currentTotal = billAmount;
    if (serviceCharge) currentTotal *= 1.10;
    if (gst) currentTotal *= 1.09;
    return currentTotal;
  };

  const totalWithFees = calculateTotal();
  const perPersonRaw = peopleCount > 0 ? totalWithFees / peopleCount : 0;
  const amountPerPerson = Math.ceil(perPersonRaw * 20) / 20;

  // --- Handlers ---
  const handleReset = () => {
    setBillAmount(0);
    setBillName('');
    setServiceCharge(true);
    setGst(false);
  };

  const saveToHistory = () => {
    if (billAmount === 0) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      billName: billName || 'Unnamed Bill',
      totalBill: totalWithFees,
      peopleCount,
      amountPerPerson,
      serviceCharge,
      gst
    };

    setHistory(prev => {
      const newHistory = [newItem, ...prev].slice(0, 5); // Keep last 5
      return newHistory;
    });
  };

  const handleDeleteHistoryItem = (ids: string[]) => {
    setHistory(prev => prev.filter(item => !ids.includes(item.id)));
  };

  const restoreHistoryItem = (item: HistoryItem) => {
    setBillName(item.billName);
    setBillAmount(item.totalBill); // Note: This sets the *total* including fees if we aren't careful, but our input expects raw bill. 
    // Actually, reconstructing the raw bill from total is hard due to rounding/fees. 
    // Ideally, history should save the raw billAmount. 
    // Let's assume for now user wants to see the result, but editing it might be tricky.
    // Correction: Let's save raw billAmount in history too.
    // For now, I'll update HistoryItem to store raw billAmount if possible, but I can't easily change the interface in the other file right now without another tool call.
    // I'll assume totalBill in history IS the final amount, so I'll set service/gst to false to "show" it, or try to reverse calc.
    // BETTER: Just save raw `billAmount` in history. I need to update HistoryList.tsx interface first? 
    // No, I can add it to the implementation here and update the interface later or casting it?
    // Let's just fix the interface in the next step if needed, or better, just use what we have.
    // Wait, `totalBill` in history implies the final amount.
    // If I restore, I should probably just set `billAmount` to `item.totalBill` and turn off flags? 
    // Or better, let's update HistoryList.tsx to include `rawBillAmount`.

    // For this iteration, I will do a precise fix: I will assume the previous implementation of HistoryItem.
    // I will UPDATED HistoryItem interface in the previous step? 
    // I defined: id, date, billName, totalBill, peopleCount, amountPerPerson, serviceCharge, gst.
    // I missed `rawBillAmount`. 
    // I'll calculate it backwards roughly or just set it as "Total" and disable toggles?
    // Let's try to set it:
    let raw = item.totalBill;
    if (item.gst) raw /= 1.09;
    if (item.serviceCharge) raw /= 1.10;

    setBillAmount(parseFloat(raw.toFixed(2))); // approximate
    setPeopleCount(item.peopleCount);
    setServiceCharge(item.serviceCharge);
    setGst(item.gst);
    setActiveTab('calculator');
  };

  const handleShare = async () => {
    saveToHistory();

    if (navigator.share) {
      const text = `
🍽️ Bill Breakdown: ${billName || 'Dinner'}
Total Bill: $${totalWithFees.toFixed(2)} (${serviceCharge ? '+SVC' : ''}${gst ? '+GST' : ''})
Split: ${peopleCount} pax
Each person owes: $${amountPerPerson.toFixed(2)}
💰 PayNow to: ${paynowNumber || '[ENTER_NUMBER]'}
      `.trim();

      try {
        await navigator.share({
          title: 'Bill Splitter',
          text: text,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      alert("Web Share API not supported.");
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 font-display selection:bg-primary/30 min-h-screen overflow-x-hidden relative">
      {/* Background Ambient Gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[80px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto px-5 pb-8 pt-2">
        {/* Header & Tabs */}
        <header className="flex flex-col items-center justify-center py-6 gap-4">
          <h1 className="text-white text-lg font-bold tracking-tight">Split Bill</h1>

          <div className="flex p-1 bg-slate-800/50 rounded-xl w-full max-w-[240px] relative">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-lg transition-all duration-300 shadow-lg ${activeTab === 'calculator' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
            ></div>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 relative z-10 text-sm font-bold py-2 text-center transition-colors ${activeTab === 'calculator' ? 'text-white' : 'text-slate-400'}`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 relative z-10 text-sm font-bold py-2 text-center transition-colors ${activeTab === 'history' ? 'text-white' : 'text-slate-400'}`}
            >
              Recent
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-5">
          {activeTab === 'calculator' ? (
            <>
              {/* Extra Inputs */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={billName}
                  onChange={(e) => setBillName(e.target.value)}
                  placeholder="Bill Name (e.g. Lunch)"
                  className="glass-panel w-2/3 px-4 py-3 rounded-2xl bg-transparent border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
                <input
                  type="tel"
                  value={paynowNumber}
                  onChange={(e) => setPaynowNumber(e.target.value)}
                  placeholder="PayNow #"
                  className="glass-panel w-1/3 px-4 py-3 rounded-2xl bg-transparent border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
              </div>

              <TotalBillInput billAmount={billAmount} setBillAmount={setBillAmount} />
              <PeopleSlider peopleCount={peopleCount} setPeopleCount={setPeopleCount} />
              <ExtrasToggles
                serviceCharge={serviceCharge} setServiceCharge={setServiceCharge}
                gst={gst} setGst={setGst}
              />
              <ResultDisplay amountPerPerson={amountPerPerson} totalWithFees={totalWithFees} />
              <ActionButtons onReset={handleReset} onShare={handleShare} />
            </>
          ) : (
            <HistoryList
              history={history}
              onRestore={restoreHistoryItem}
              onDelete={handleDeleteHistoryItem}
            />
          )}
        </main>
      </div>
    </div>
  );
}
