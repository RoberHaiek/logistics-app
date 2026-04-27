import React, { useState, useRef } from 'react';
import {
  Camera, Package, MapPin, Calendar, Shield, Truck, Check, ChevronRight,
  ChevronLeft, Home, FileText, Settings, Bell, User, Menu, X, Zap,
  Search, Filter, MoreVertical, Clock, Euro, TrendingDown, Leaf, Star,
  Upload, Loader2, ArrowRight, Plus, ChevronDown, AlertCircle, CheckCircle2,
  Eye, Download, Phone, Mail, Building2, CreditCard, Sparkles, Target,
  BarChart3, Boxes, Factory, CircleDot, LogOut
} from 'lucide-react';

export default function LogiFlowApp() {
  const [screen, setScreen] = useState('dashboard');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Flow state
  const [flowStep, setFlowStep] = useState(1);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [transportData, setTransportData] = useState({
    fromAddr: '', toAddr: '', pickupDate: '', deliveryDate: '', budget: '', notes: ''
  });
  const [insurance, setInsurance] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [matching, setMatching] = useState(false);
  const [offers, setOffers] = useState([]);

  const resetFlow = () => {
    setFlowStep(1);
    setPhotoUploaded(false);
    setAiAnalyzing(false);
    setAiResult(null);
    setTransportData({ fromAddr: '', toAddr: '', pickupDate: '', deliveryDate: '', budget: '', notes: '' });
    setInsurance(null);
    setSelectedCarrier(null);
    setMatching(false);
    setOffers([]);
  };

  // ============ DATA ============
  const orders = [
    { id: 'LF-2841', from: 'Augsburg', to: 'Hamburg', status: 'Unterwegs', statusColor: 'text-amber-600 bg-amber-50', pallets: 4, type: 'EUR', progress: 65, eta: 'Morgen 14:30', price: 487 },
    { id: 'LF-2840', from: 'München', to: 'Stuttgart', status: 'Geliefert', statusColor: 'text-emerald-700 bg-emerald-50', pallets: 2, type: 'Einweg', progress: 100, eta: 'Geliefert', price: 219 },
    { id: 'LF-2839', from: 'Nürnberg', to: 'Berlin', status: 'Matching', statusColor: 'text-blue-700 bg-blue-50', pallets: 6, type: 'EUR', progress: 15, eta: 'Ausstehend', price: null },
    { id: 'LF-2838', from: 'Augsburg', to: 'Wien', status: 'Versichert', statusColor: 'text-cyan-700 bg-cyan-50', pallets: 3, type: 'Chep', progress: 35, eta: 'Fr. 09:00', price: 612 },
  ];

  const stats = [
    { label: 'Aktive Transporte', value: '14', trend: '+3 diese Woche', icon: Truck, color: 'teal' },
    { label: 'Gesparte Zeit', value: '47h', trend: 'Monat April', icon: Clock, color: 'blue' },
    { label: 'Transportkosten', value: '8.240€', trend: '−12% vs Vormonat', icon: TrendingDown, color: 'emerald' },
    { label: 'CO₂ eingespart', value: '340kg', trend: 'Vormonat', icon: Leaf, color: 'green' },
  ];

  // ============ NAV ============
  const Nav = () => (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-[#0A2647] text-white flex-col z-30">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00A389] flex items-center justify-center">
              <Zap size={20} className="text-[#0A2647]" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight">LogiFlow</div>
              <div className="text-xs text-[#00D4AA] -mt-1 tracking-widest">AI</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'newOrder', icon: Plus, label: 'Neuer Transport', highlight: true },
            { id: 'orders', icon: FileText, label: 'Aufträge' },
            { id: 'analytics', icon: BarChart3, label: 'Analysen' },
            { id: 'subscription', icon: CreditCard, label: 'Abo & Rechnung' },
            { id: 'settings', icon: Settings, label: 'Einstellungen' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setScreen(item.id); if (item.id === 'newOrder') resetFlow(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                screen === item.id
                  ? 'bg-white/10 text-white font-medium'
                  : item.highlight
                    ? 'bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20 font-medium'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4AA] to-[#1C7293] flex items-center justify-center text-sm font-bold">DC</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Domenick Collisi</div>
              <div className="text-xs text-white/50 truncate">Collisi GmbH</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 inset-x-0 bg-[#0A2647] text-white z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00A389] flex items-center justify-center">
            <Zap size={16} className="text-[#0A2647]" />
          </div>
          <div className="font-bold text-base">LogiFlow <span className="text-[#00D4AA] text-xs tracking-widest">AI</span></div>
        </div>
        <button onClick={() => setMobileMenu(true)} className="p-2"><Menu size={22} /></button>
      </header>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0A2647] text-white animate-in fade-in">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="font-bold text-lg">LogiFlow <span className="text-[#00D4AA] text-xs">AI</span></div>
            <button onClick={() => setMobileMenu(false)} className="p-2"><X size={22} /></button>
          </div>
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'newOrder', icon: Plus, label: 'Neuer Transport', highlight: true },
              { id: 'orders', icon: FileText, label: 'Aufträge' },
              { id: 'analytics', icon: BarChart3, label: 'Analysen' },
              { id: 'subscription', icon: CreditCard, label: 'Abo & Rechnung' },
              { id: 'settings', icon: Settings, label: 'Einstellungen' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setScreen(item.id); if (item.id === 'newOrder') resetFlow(); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base ${
                  screen === item.id ? 'bg-white/10 font-medium' : item.highlight ? 'bg-[#00D4AA]/10 text-[#00D4AA] font-medium' : 'text-white/70'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );

  // ============ DASHBOARD ============
  const Dashboard = () => (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500 mb-1">Willkommen zurück</div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A2647]">Guten Morgen, Domenick.</h1>
          <p className="text-slate-600 mt-1 text-sm lg:text-base">Du hast <span className="font-semibold text-[#065A82]">14 aktive Transporte</span> und <span className="font-semibold text-amber-600">3 Angebote zur Prüfung</span>.</p>
        </div>
        <button
          onClick={() => { setScreen('newOrder'); resetFlow(); }}
          className="inline-flex items-center gap-2 bg-[#065A82] hover:bg-[#0A2647] text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-[#065A82]/20 transition-all hover:shadow-xl hover:shadow-[#065A82]/30"
        >
          <Camera size={18} />
          Neuer Transport
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s, i) => {
          const colors = {
            teal: 'bg-teal-50 text-teal-700',
            blue: 'bg-blue-50 text-blue-700',
            emerald: 'bg-emerald-50 text-emerald-700',
            green: 'bg-green-50 text-green-700',
          };
          return (
            <div key={i} className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-200/70 hover:border-slate-300 transition-all">
              <div className={`w-9 h-9 rounded-lg ${colors[s.color]} flex items-center justify-center mb-3`}>
                <s.icon size={18} />
              </div>
              <div className="text-xs text-slate-500 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-[#0A2647]">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.trend}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-[#0A2647]">Aktive Transporte</h2>
          <button onClick={() => setScreen('orders')} className="text-sm text-[#065A82] hover:text-[#0A2647] font-medium">Alle ansehen →</button>
        </div>
        <div className="divide-y divide-slate-100">
          {orders.map(order => (
            <button
              key={order.id}
              onClick={() => { setActiveOrder(order); setScreen('orderDetail'); }}
              className="w-full p-4 lg:p-5 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#065A82] to-[#1C7293] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {order.id.slice(-3)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#0A2647]">{order.from}</span>
                      <ArrowRight size={14} className="text-slate-400 flex-shrink-0" />
                      <span className="font-medium text-[#0A2647]">{order.to}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {order.pallets}× {order.type} · {order.id}
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.statusColor} flex-shrink-0`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#065A82] to-[#00A389] rounded-full transition-all"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 flex-shrink-0">{order.eta}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#0A2647] to-[#065A82] rounded-2xl p-5 lg:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4AA]/10 rounded-full blur-2xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-[#00D4AA] px-2.5 py-1 rounded-full mb-3">
              <Sparkles size={12} />
              KI-TIPP
            </div>
            <h3 className="font-bold text-lg mb-2">Rückladung verfügbar</h3>
            <p className="text-sm text-white/80 mb-4">Spediteur Müller hat eine Rückladung Hamburg → Augsburg für 340 € frei. Passt zu deinem Transport LF-2841.</p>
            <button className="bg-[#00D4AA] hover:bg-[#00A389] text-[#0A2647] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ansehen
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200/70">
          <h3 className="font-bold text-[#0A2647] mb-4">Dein Abo: TRANSIT</h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-3xl font-bold text-[#065A82]">7</span>
            <span className="text-sm text-slate-500 mb-1.5">/ 10 Transporte dieser Monat</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-[#065A82] to-[#00A389] rounded-full" style={{ width: '70%' }}></div>
          </div>
          <button onClick={() => setScreen('subscription')} className="text-sm text-[#065A82] hover:text-[#0A2647] font-medium">
            Auf PROJECT wechseln →
          </button>
        </div>
      </div>
    </div>
  );

  // ============ NEW ORDER FLOW ============
  const NewOrderFlow = () => {
    const steps = [
      { n: 1, label: 'Foto' },
      { n: 2, label: 'Daten' },
      { n: 3, label: 'Versicherung' },
      { n: 4, label: 'Matching' },
      { n: 5, label: 'Fertig' },
    ];

    const simulateAI = () => {
      setPhotoUploaded(true);
      setAiAnalyzing(true);
      setTimeout(() => {
        setAiResult({
          type: 'EUR-Palette',
          count: 4,
          weight: '840 kg',
          volume: '3.2 m³',
          dimensions: '120 × 80 × 144 cm',
          condition: 'Gut',
          hazmat: false,
          confidence: 96,
        });
        setAiAnalyzing(false);
      }, 2800);
    };

    const simulateMatching = () => {
      setMatching(true);
      setOffers([]);
      const fakeOffers = [
        { id: 1, name: 'Spedition Müller GmbH', price: 487, rating: 4.8, reviews: 312, delivery: 'Morgen 14:00', co2: '142 kg', badge: 'Empfohlen' },
        { id: 2, name: 'TransEuro Logistik', price: 520, rating: 4.6, reviews: 89, delivery: 'Morgen 16:30', co2: '158 kg' },
        { id: 3, name: 'Bayern Fracht AG', price: 499, rating: 4.9, reviews: 456, delivery: 'Übermorgen 09:00', co2: '129 kg', badge: 'Beste CO₂' },
        { id: 4, name: 'RegioSped', price: 445, rating: 4.4, reviews: 67, delivery: 'Morgen 18:00', co2: '176 kg', badge: 'Günstigster' },
      ];
      fakeOffers.forEach((offer, idx) => {
        setTimeout(() => {
          setOffers(prev => [...prev, offer]);
        }, 600 + idx * 700);
      });
      setTimeout(() => setMatching(false), 3500);
    };

    return (
      <div className="p-4 lg:p-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl lg:text-2xl font-bold text-[#0A2647]">Neuer Transport</h1>
            <button onClick={() => setScreen('dashboard')} className="text-slate-500 hover:text-[#0A2647]">
              <X size={20} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 mt-6">
            {steps.map((s, idx) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    flowStep > s.n ? 'bg-[#00A389] text-white' :
                    flowStep === s.n ? 'bg-[#065A82] text-white ring-4 ring-[#065A82]/20' :
                    'bg-slate-200 text-slate-500'
                  }`}>
                    {flowStep > s.n ? <Check size={16} /> : s.n}
                  </div>
                  <span className={`text-sm font-medium ${flowStep >= s.n ? 'text-[#0A2647]' : 'text-slate-400'}`}>{s.label}</span>
                </div>
                {idx < steps.length - 1 && <div className={`flex-1 h-0.5 ${flowStep > s.n ? 'bg-[#00A389]' : 'bg-slate-200'}`}></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="sm:hidden text-sm text-slate-500 mt-2">Schritt {flowStep} von {steps.length}: {steps[flowStep-1].label}</div>
        </div>

        {/* STEP 1: PHOTO */}
        {flowStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-8">
              <h2 className="text-lg font-bold text-[#0A2647] mb-1">Foto der Ladung aufnehmen</h2>
              <p className="text-slate-600 text-sm mb-6">Unsere KI erkennt Palettentyp, Gewicht und Volumen automatisch.</p>

              {!photoUploaded ? (
                <button
                  onClick={simulateAI}
                  className="w-full border-2 border-dashed border-slate-300 hover:border-[#065A82] hover:bg-[#065A82]/5 rounded-2xl p-8 lg:p-12 transition-all group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#065A82]/10 to-[#00A389]/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Camera size={32} className="text-[#065A82]" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#0A2647]">Foto aufnehmen oder hochladen</div>
                      <div className="text-sm text-slate-500 mt-1">JPG, PNG oder HEIC · max. 10 MB</div>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video lg:aspect-[2/1] rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <defs>
                        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#c19a6b" />
                          <stop offset="100%" stopColor="#8b6f47" />
                        </linearGradient>
                        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#d4a574" />
                          <stop offset="100%" stopColor="#a67c52" />
                        </linearGradient>
                      </defs>
                      <rect width="400" height="200" fill="#e5e7eb"/>
                      <g transform="translate(60,50)">
                        {[0,1,2,3].map(i => (
                          <g key={i} transform={`translate(${i*70},0)`}>
                            <rect x="0" y="50" width="60" height="12" fill="url(#woodGrad)"/>
                            <rect x="0" y="38" width="60" height="12" fill="url(#boxGrad)"/>
                            <rect x="0" y="10" width="60" height="28" fill="url(#boxGrad)" opacity="0.9"/>
                            <line x1="0" y1="24" x2="60" y2="24" stroke="#6b4423" strokeWidth="1" opacity="0.5"/>
                            <rect x="-2" y="62" width="3" height="18" fill="#6b4423"/>
                            <rect x="57" y="62" width="3" height="18" fill="#6b4423"/>
                            <rect x="28" y="62" width="3" height="18" fill="#6b4423"/>
                          </g>
                        ))}
                      </g>
                      <text x="20" y="190" fontSize="11" fill="#64748b" fontFamily="monospace">lager_augsburg_2026-04-23_0847.jpg</text>
                    </svg>

                    {aiAnalyzing && (
                      <div className="absolute inset-0 bg-[#0A2647]/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                        <div className="relative w-20 h-20 mb-4">
                          <div className="absolute inset-0 border-4 border-[#00D4AA]/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-transparent border-t-[#00D4AA] rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="text-[#00D4AA]" size={24} />
                          </div>
                        </div>
                        <div className="font-bold text-lg">KI analysiert...</div>
                        <div className="text-sm text-white/70 mt-1 text-center">Palettentyp · Gewicht · Volumen · Gefahrgut</div>
                      </div>
                    )}

                    {aiResult && !aiAnalyzing && (
                      <div className="absolute top-3 left-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-2 rounded-lg shadow-lg">
                        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-[#0A2647]">KI-Erkennung: {aiResult.confidence}% Konfidenz</span>
                      </div>
                    )}
                  </div>

                  {aiResult && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { label: 'Palettentyp', value: aiResult.type, icon: Boxes },
                        { label: 'Anzahl', value: `${aiResult.count} Stück`, icon: Package },
                        { label: 'Gewicht', value: aiResult.weight, icon: Target },
                        { label: 'Volumen', value: aiResult.volume, icon: Building2 },
                        { label: 'Maße (H)', value: aiResult.dimensions, icon: Search },
                        { label: 'Gefahrgut', value: aiResult.hazmat ? 'Ja' : 'Nein', icon: Shield },
                      ].map((f, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                            <f.icon size={12} /> {f.label}
                          </div>
                          <div className="font-semibold text-[#0A2647] text-sm">{f.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {aiResult && (
                    <div className="flex gap-2">
                      <button onClick={resetFlow} className="px-4 py-2 text-sm text-slate-600 hover:text-[#0A2647]">
                        Neu aufnehmen
                      </button>
                      <div className="flex-1"></div>
                      <button
                        onClick={() => setFlowStep(2)}
                        className="inline-flex items-center gap-2 bg-[#065A82] hover:bg-[#0A2647] text-white px-5 py-2.5 rounded-xl font-medium transition-all"
                      >
                        Weiter <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: DATA */}
        {flowStep === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-8 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-[#0A2647] mb-1">Transportdaten</h2>
              <p className="text-slate-600 text-sm">Von wo, wohin, wann und für welchen Preis?</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Von</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Bergstr. 12, 86150 Augsburg"
                    defaultValue="Bergstr. 12, 86150 Augsburg"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Nach</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Empfängeradresse"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Abholung</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="24.04.2026 zwischen 08:00–12:00"
                    defaultValue="24.04.2026  ·  08:00–12:00"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Lieferung</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="26.04.2026 bis 16:00"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Budget max. (€)</label>
                <div className="relative">
                  <Euro size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="520"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Sparkles size={11} className="text-[#00A389]" />
                  KI-Marktpreis-Schätzung: 485–540 €
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Warenwert (€)</label>
                <div className="relative">
                  <Euro size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Für Versicherung"
                    defaultValue="12500"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#065A82] focus:ring-2 focus:ring-[#065A82]/10 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A2647] mb-1.5">Besonderheiten</label>
              <div className="flex flex-wrap gap-2">
                {['Rampe', 'Hebebühne', 'ADR', 'Kühlung', 'Zoll'].map(t => (
                  <button key={t} className="px-3 py-1.5 text-sm rounded-full border border-slate-200 hover:border-[#065A82] hover:bg-[#065A82]/5 text-slate-600 hover:text-[#065A82]">
                    + {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setFlowStep(1)} className="inline-flex items-center gap-1 px-4 py-2.5 text-sm text-slate-600 hover:text-[#0A2647]">
                <ChevronLeft size={16} /> Zurück
              </button>
              <div className="flex-1"></div>
              <button
                onClick={() => setFlowStep(3)}
                className="inline-flex items-center gap-2 bg-[#065A82] hover:bg-[#0A2647] text-white px-5 py-2.5 rounded-xl font-medium transition-all"
              >
                Weiter <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INSURANCE */}
        {flowStep === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[#0A2647] mb-1">Versicherung wählen</h2>
              <p className="text-slate-600 text-sm">Basierend auf Warenwert 12.500 € und Route Augsburg → Hamburg.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'basic', name: 'CMR-Haftung', price: 'Inklusive', desc: 'Gesetzliche Spediteurshaftung 8,33 SZR/kg. Im Schadensfall Deckung: ca. 9.500 €', recommended: false },
                { id: 'plus', name: 'CMR-Plus', price: '18,75 €', desc: 'Voller Warenwert gedeckt (0,15%). Empfohlen für hochwertige Ware.', recommended: true },
                { id: 'allrisk', name: 'All-Risk Transportversicherung', price: '43,75 €', desc: 'Vollkasko inkl. Diebstahl, Transportschäden, Witterungseinflüsse. (0,35%)', recommended: false },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInsurance(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    insurance === opt.id
                      ? 'border-[#065A82] bg-[#065A82]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      insurance === opt.id ? 'border-[#065A82] bg-[#065A82]' : 'border-slate-300'
                    }`}>
                      {insurance === opt.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#0A2647]">{opt.name}</span>
                          {opt.recommended && <span className="text-xs bg-[#00A389] text-white px-2 py-0.5 rounded-full">EMPFOHLEN</span>}
                        </div>
                        <span className="font-bold text-[#065A82]">{opt.price}</span>
                      </div>
                      <p className="text-sm text-slate-600">{opt.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3">
              <Shield size={18} className="text-blue-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <strong>Abschluss in Echtzeit</strong> über Hiscox BiPRO-API. Police als PDF direkt im Auftrag verfügbar.
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setFlowStep(2)} className="inline-flex items-center gap-1 px-4 py-2.5 text-sm text-slate-600 hover:text-[#0A2647]">
                <ChevronLeft size={16} /> Zurück
              </button>
              <div className="flex-1"></div>
              <button
                disabled={!insurance}
                onClick={() => { setFlowStep(4); simulateMatching(); }}
                className="inline-flex items-center gap-2 bg-[#065A82] hover:bg-[#0A2647] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-medium transition-all"
              >
                Matching starten <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: MATCHING */}
        {flowStep === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-8 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-[#0A2647] mb-1">Spediteure werden gefunden</h2>
              <p className="text-slate-600 text-sm">Anfrage geht an TimoCom + dein Netzwerk + präferierte Partner.</p>
            </div>

            {matching && offers.length === 0 && (
              <div className="text-center py-12">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-[#065A82]/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-[#065A82] rounded-full animate-spin"></div>
                </div>
                <div className="font-semibold text-[#0A2647]">Anfrage läuft...</div>
                <div className="text-sm text-slate-500 mt-1">Erste Angebote in 15–30 Sekunden erwartet</div>
              </div>
            )}

            <div className="space-y-3">
              {offers.map((offer, idx) => (
                <button
                  key={offer.id}
                  onClick={() => setSelectedCarrier(offer.id)}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all animate-in slide-in-from-bottom-2 fade-in ${
                    selectedCarrier === offer.id
                      ? 'border-[#065A82] bg-[#065A82]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#065A82] to-[#1C7293] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {offer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[#0A2647]">{offer.name}</span>
                          {offer.badge && <span className="text-[10px] bg-[#00A389] text-white px-2 py-0.5 rounded-full font-medium">{offer.badge.toUpperCase()}</span>}
                        </div>
                        <span className="font-bold text-lg text-[#065A82]">{offer.price} €</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> {offer.rating} ({offer.reviews})</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {offer.delivery}</span>
                        <span className="flex items-center gap-1"><Leaf size={12} className="text-emerald-600" /> {offer.co2}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedCarrier && (
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button onClick={() => setFlowStep(3)} className="inline-flex items-center gap-1 px-4 py-2.5 text-sm text-slate-600 hover:text-[#0A2647]">
                  <ChevronLeft size={16} /> Zurück
                </button>
                <div className="flex-1"></div>
                <button
                  onClick={() => setFlowStep(5)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#065A82] to-[#00A389] hover:from-[#0A2647] hover:to-[#065A82] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-[#065A82]/20"
                >
                  Auftrag vergeben <Check size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: SUCCESS */}
        {flowStep === 5 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00A389] to-[#00D4AA] flex items-center justify-center mx-auto mb-5 animate-in zoom-in">
              <Check size={40} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-[#0A2647] mb-2">Transport vergeben!</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">Spedition Müller GmbH übernimmt deinen Transport. Fahrer ist benachrichtigt, Police ist abgeschlossen.</p>

            <div className="bg-slate-50 rounded-xl p-5 text-left max-w-md mx-auto space-y-3 mb-6">
              {[
                { label: 'Auftragsnummer', value: 'LF-2842' },
                { label: 'Spediteur', value: 'Spedition Müller GmbH' },
                { label: 'Preis', value: '487,00 €' },
                { label: 'Versicherung', value: 'CMR-Plus · 18,75 €' },
                { label: 'Abholung', value: '24.04.2026 · 09:30' },
                { label: 'Lieferung voraussichtl.', value: '25.04.2026 · 14:00' },
              ].map((r, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-500">{r.label}</span>
                  <span className="font-medium text-[#0A2647]">{r.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-[#0A2647] px-5 py-2.5 rounded-xl text-sm font-medium">
                <Download size={16} /> Frachtbrief
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-[#0A2647] px-5 py-2.5 rounded-xl text-sm font-medium">
                <Shield size={16} /> Police
              </button>
              <button
                onClick={() => setScreen('dashboard')}
                className="inline-flex items-center justify-center gap-2 bg-[#065A82] hover:bg-[#0A2647] text-white px-5 py-2.5 rounded-xl text-sm font-medium"
              >
                Zum Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============ ORDER DETAIL ============
  const OrderDetail = () => {
    if (!activeOrder) return null;
    return (
      <div className="p-4 lg:p-8 max-w-4xl space-y-6">
        <button onClick={() => setScreen('dashboard')} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-[#0A2647]">
          <ChevronLeft size={16} /> Zurück
        </button>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div>
              <div className="text-sm text-slate-500">Auftrag</div>
              <h1 className="text-2xl font-bold text-[#0A2647]">{activeOrder.id}</h1>
            </div>
            <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${activeOrder.statusColor}`}>
              {activeOrder.status}
            </span>
          </div>

          <div className="relative py-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 text-center">
                <MapPin className="mx-auto mb-1 text-[#065A82]" size={20} />
                <div className="font-semibold text-[#0A2647]">{activeOrder.from}</div>
                <div className="text-xs text-slate-500">Abholung</div>
              </div>
              <div className="flex-1 relative h-px bg-slate-200">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#065A82] to-[#00A389]" style={{ width: `${activeOrder.progress}%` }}></div>
                <Truck size={20} className="absolute top-1/2 text-[#065A82]" style={{ left: `${activeOrder.progress}%`, transform: 'translate(-50%, -50%)' }} />
              </div>
              <div className="flex-1 text-center">
                <MapPin className="mx-auto mb-1 text-slate-400" size={20} />
                <div className="font-semibold text-[#0A2647]">{activeOrder.to}</div>
                <div className="text-xs text-slate-500">Lieferung</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Ladung', value: `${activeOrder.pallets}× ${activeOrder.type}` },
              { label: 'Preis', value: activeOrder.price ? `${activeOrder.price} €` : '—' },
              { label: 'ETA', value: activeOrder.eta },
              { label: 'Fortschritt', value: `${activeOrder.progress}%` },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500">{f.label}</div>
                <div className="font-semibold text-[#0A2647] text-sm mt-0.5">{f.value}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bold text-[#0A2647] mb-3">Verlauf</h3>
            <div className="space-y-3">
              {[
                { time: 'Heute 07:15', event: 'Ladung aufgenommen in Augsburg', done: true },
                { time: 'Heute 11:30', event: 'Zwischenstopp München-Nord', done: true },
                { time: 'Heute 16:00', event: 'Ankunft Logistikzentrum Frankfurt erwartet', done: activeOrder.progress > 65 },
                { time: 'Morgen 14:30', event: 'Lieferung Hamburg', done: false },
              ].map((e, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${e.done ? 'bg-[#00A389]' : 'bg-slate-300'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${e.done ? 'text-[#0A2647] font-medium' : 'text-slate-500'}`}>{e.event}</div>
                    <div className="text-xs text-slate-500">{e.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ ORDERS LIST ============
  const OrdersList = () => (
    <div className="p-4 lg:p-8 max-w-7xl space-y-4">
      <h1 className="text-2xl font-bold text-[#0A2647]">Alle Aufträge</h1>
      <div className="flex gap-2 flex-wrap">
        {['Alle', 'Matching', 'Unterwegs', 'Geliefert'].map((t, i) => (
          <button key={t} className={`px-3 py-1.5 text-sm rounded-full ${i === 0 ? 'bg-[#065A82] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/70 divide-y divide-slate-100 overflow-hidden">
        {orders.map(order => (
          <button
            key={order.id}
            onClick={() => { setActiveOrder(order); setScreen('orderDetail'); }}
            className="w-full p-4 lg:p-5 hover:bg-slate-50 text-left"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#065A82] to-[#1C7293] flex items-center justify-center text-white font-bold text-xs">
                {order.id.slice(-3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#0A2647]">{order.from} → {order.to}</div>
                <div className="text-xs text-slate-500 mt-0.5">{order.pallets}× {order.type} · {order.id}</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.statusColor}`}>{order.status}</span>
              <div className="text-sm text-slate-500 min-w-[80px] text-right">{order.price ? `${order.price} €` : '—'}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ============ SUBSCRIPTION ============
  const Subscription = () => (
    <div className="p-4 lg:p-8 max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2647]">Abo & Rechnung</h1>
      <p className="text-slate-600 text-sm">Drei Tarife — kombinierbar, jederzeit wechselbar.</p>

      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { id: 'transit', name: 'TRANSIT', tag: 'Einzeltransporte', price: '29–79 €', current: true, icon: Boxes, color: '#1C7293',
            features: ['KI-Foto-Erfassung', 'Automatisches Matching', 'Versicherung 1-Klick', 'Live-Tracking', 'Digitaler Frachtbrief'] },
          { id: 'project', name: 'PROJECT', tag: 'Projektgeschäft', price: '199–499 €', recommended: true, icon: Factory, color: '#065A82',
            features: ['Alles aus TRANSIT', 'Schwerlast & Sondertransport', 'Taktplanung JIS/JIT', 'Budget-Controlling', 'Montageversicherung'] },
          { id: 'line', name: 'LINE', tag: 'Linienabfertigung', price: '299–2.500 €', icon: Truck, color: '#0A2647',
            features: ['Alles aus PROJECT', 'KI-Tourenoptimierung', 'Dispo-Cockpit', 'Frachtrechnungs-KI', 'SAP · DATEV · EDI'] },
        ].map(plan => (
          <div key={plan.id} className={`relative bg-white rounded-2xl border-2 p-5 lg:p-6 ${plan.recommended ? 'border-[#065A82]' : plan.current ? 'border-[#00A389]' : 'border-slate-200'}`}>
            {plan.recommended && <div className="absolute -top-3 right-5 bg-[#00A389] text-white text-xs font-bold px-3 py-1 rounded-full">EMPFOHLEN</div>}
            {plan.current && <div className="absolute -top-3 right-5 bg-[#00A389] text-white text-xs font-bold px-3 py-1 rounded-full">AKTIV</div>}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${plan.color}15` }}>
              <plan.icon size={22} style={{ color: plan.color }} />
            </div>
            <div className="font-bold text-2xl" style={{ color: plan.color }}>{plan.name}</div>
            <div className="text-sm text-slate-500 italic mb-4">{plan.tag}</div>
            <div className="text-3xl font-bold text-[#0A2647] mb-1">{plan.price}</div>
            <div className="text-xs text-slate-500 mb-5">pro Monat</div>
            <ul className="space-y-2 mb-5">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="text-[#00A389] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all ${
              plan.current
                ? 'bg-slate-100 text-slate-500 cursor-default'
                : plan.recommended
                  ? 'bg-[#065A82] hover:bg-[#0A2647] text-white'
                  : 'bg-white border border-slate-200 hover:border-slate-300 text-[#0A2647]'
            }`}>
              {plan.current ? 'Aktueller Tarif' : 'Wählen'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6">
        <h2 className="font-bold text-[#0A2647] mb-4">Letzte Rechnungen</h2>
        <div className="space-y-2">
          {[
            { date: 'April 2026', amount: '79,00 €', status: 'Bezahlt' },
            { date: 'März 2026', amount: '79,00 €', status: 'Bezahlt' },
            { date: 'Februar 2026', amount: '29,00 €', status: 'Bezahlt' },
          ].map((inv, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <div className="font-medium text-[#0A2647] text-sm">{inv.date}</div>
                <div className="text-xs text-slate-500">{inv.status}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#0A2647]">{inv.amount}</span>
                <button className="text-slate-400 hover:text-[#065A82]"><Download size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ ANALYTICS ============
  const Analytics = () => (
    <div className="p-4 lg:p-8 max-w-7xl space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2647]">Analysen</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: 'Transporte YTD', value: '187', trend: '+23% vs Vorjahr' },
          { label: 'Ø Preis/Transport', value: '432 €', trend: '−12% dank KI-Matching' },
          { label: 'Schadensquote', value: '0,2%', trend: 'Bester Wert seit Start' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/70 p-5">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="text-3xl font-bold text-[#065A82]">{s.value}</div>
            <div className="text-xs text-emerald-600 mt-1">{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6">
        <h2 className="font-bold text-[#0A2647] mb-4">Transportvolumen pro Monat</h2>
        <div className="flex items-end gap-2 lg:gap-3 h-48">
          {[
            { m: 'Nov', v: 40 }, { m: 'Dez', v: 55 }, { m: 'Jan', v: 48 },
            { m: 'Feb', v: 62 }, { m: 'Mär', v: 75 }, { m: 'Apr', v: 85 },
          ].map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-[#065A82] to-[#1C7293] rounded-t-lg transition-all"
                  style={{ height: `${b.v}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500">{b.m}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6">
          <h3 className="font-bold text-[#0A2647] mb-4">Top Spediteure</h3>
          <div className="space-y-3">
            {[
              { name: 'Spedition Müller GmbH', count: 42, share: 85 },
              { name: 'Bayern Fracht AG', count: 31, share: 63 },
              { name: 'TransEuro Logistik', count: 22, share: 45 },
              { name: 'RegioSped', count: 14, share: 28 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#0A2647] font-medium">{s.name}</span>
                  <span className="text-slate-500">{s.count}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#065A82] to-[#00A389] rounded-full" style={{ width: `${s.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6">
          <h3 className="font-bold text-[#0A2647] mb-4">Einsparungen durch LogiFlow</h3>
          <div className="space-y-3">
            {[
              { label: 'Verwaltungszeit', value: '47h', color: 'bg-blue-500' },
              { label: 'Transportkosten', value: '2.340 €', color: 'bg-emerald-500' },
              { label: 'Rechnungsprüfung', value: '890 €', color: 'bg-amber-500' },
              { label: 'CO₂-Emissionen', value: '340 kg', color: 'bg-teal-500' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${s.color}`}></div>
                  <span className="text-sm text-[#0A2647]">{s.label}</span>
                </div>
                <span className="font-bold text-[#0A2647]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============ SETTINGS ============
  const SettingsScreen = () => (
    <div className="p-4 lg:p-8 max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2647]">Einstellungen</h1>

      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6 space-y-5">
        <div>
          <h2 className="font-bold text-[#0A2647] mb-3">Unternehmensdaten</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Firma</label>
              <input defaultValue="Collisi GmbH" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">USt-IdNr.</label>
              <input defaultValue="DE328451092" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Anschrift</label>
              <input defaultValue="Bergstr. 12, 86150 Augsburg" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 lg:p-6">
        <h2 className="font-bold text-[#0A2647] mb-3">Verbundene Systeme</h2>
        <div className="space-y-2">
          {[
            { name: 'TimoCom', status: 'Verbunden', color: 'emerald' },
            { name: 'DATEV', status: 'Verbunden', color: 'emerald' },
            { name: 'SAP TM', status: 'Nicht verbunden', color: 'slate' },
            { name: 'Hiscox BiPRO', status: 'Verbunden', color: 'emerald' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <span className="text-[#0A2647] font-medium">{s.name}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-[#F5F9FC]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <Nav />
      <main className="lg:pl-60 pt-14 lg:pt-0">
        {screen === 'dashboard' && <Dashboard />}
        {screen === 'newOrder' && <NewOrderFlow />}
        {screen === 'orderDetail' && <OrderDetail />}
        {screen === 'orders' && <OrdersList />}
        {screen === 'subscription' && <Subscription />}
        {screen === 'analytics' && <Analytics />}
        {screen === 'settings' && <SettingsScreen />}
      </main>
    </div>
  );
}
