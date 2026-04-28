import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Database, 
  Shield, 
  Settings, 
  Bell as Notifications, 
  User, 
  Mail, 
  Globe,
  ArrowRight,
  Send,
  Lock,
  FileText,
  Zap,
  Maximize2,
  Cpu,
  Search,
  Archive,
  Download,
  Activity
} from 'lucide-react';

// Types
type Screen = 'LOGIN' | 'DASHBOARD' | 'INTEL' | 'ARSENAL' | 'MAP';

// Components
const ScanlineOverlay = () => (
  <div className="fixed inset-0 z-[100] scanline-overlay opacity-30 pointer-events-none" />
);

const MatrixBackground = () => (
  <div className="fixed inset-0 matrix-bg opacity-40 z-0 pointer-events-none" />
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('LOGIN');

  return (
    <div className="min-h-screen bg-black text-primary font-sans relative overflow-hidden">
      <ScanlineOverlay />
      <MatrixBackground />
      
      <AnimatePresence mode="wait">
        {screen === 'LOGIN' && (
          <LoginScreen key="login" onLogin={() => setScreen('DASHBOARD')} />
        )}
        {screen !== 'LOGIN' && (
          <MainLayout key="main" activeScreen={screen} setScreen={setScreen}>
            {screen === 'DASHBOARD' && <DashboardScreen />}
            {screen === 'INTEL' && <IntelScreen />}
            {screen === 'ARSENAL' && <ArsenalScreen />}
            {screen === 'MAP' && <MapScreen />}
          </MainLayout>
        )}
      </AnimatePresence>
    </div>
  );
}

// Layout Wrapper
function MainLayout({ 
  children, 
  activeScreen, 
  setScreen 
}: { 
  children: React.ReactNode, 
  activeScreen: Screen, 
  setScreen: (s: Screen) => void,
  key?: string
}) {
  return (
    <div className="flex h-screen overflow-hidden pt-16">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 bg-black/90 border-b border-secondary h-16 shadow-[0_0_15px_rgba(0,59,0,0.5)]">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-widest text-[#00ff41] crt-glow uppercase">
            WAYNE_ROOT_V2
          </span>
          <nav className="hidden md:flex gap-6 uppercase text-[10px] tracking-widest font-bold">
            <span className="text-primary border-b border-primary pb-1">STATUS: ENCRYPTED</span>
            <span className="text-secondary hover:text-primary transition-colors cursor-pointer">UPTIME: 99.99%</span>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-primary">
          <Notifications size={20} className="cursor-pointer hover:scale-110 transition-transform" />
          <Settings size={20} className="cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </header>

      <aside className="w-64 border-r border-secondary bg-black flex flex-col z-40 shadow-[inset_-10px_0_20px_rgba(0,59,0,0.3)]">
        <div className="p-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-primary flex items-center justify-center p-0.5">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-primary">OPERATOR_01</p>
              <p className="text-[8px] text-secondary uppercase">ROOT_ACCESS</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-4 uppercase text-[10px] tracking-widest">
          <NavItem 
            active={activeScreen === 'DASHBOARD'} 
            onClick={() => setScreen('DASHBOARD')}
            icon={<Shield size={16} />}
            label="SYSTEM_ROOT"
          />
          <NavItem 
            active={activeScreen === 'INTEL'} 
            onClick={() => setScreen('INTEL')}
            icon={<Database size={16} />}
            label="INTEL_DB"
          />
          <NavItem 
            active={activeScreen === 'ARSENAL'} 
            onClick={() => setScreen('ARSENAL')}
            icon={<Zap size={16} />}
            label="ARSENAL_X"
          />
          <NavItem 
            active={activeScreen === 'MAP'} 
            onClick={() => setScreen('MAP')}
            icon={<Globe size={16} />}
            label="NET_MAP"
          />
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full border border-red-900 text-red-500 text-[10px] font-bold py-2 hover:bg-red-900/20 transition-all uppercase tracking-widest">
            [ EMERGENCY_WIPE ]
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-black relative custom-scrollbar">
        {children}
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-full flex items-center gap-4 px-6 py-4 transition-all group overflow-hidden ${
        active 
          ? 'text-black font-bold' 
          : 'text-secondary hover:text-primary'
      }`}
    >
      {/* Background slide effect */}
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${
        active ? 'translate-x-0 bg-primary' : '-translate-x-full group-hover:translate-x-[-95%] bg-secondary/20'
      }`} />
      
      <div className="relative z-10 flex items-center gap-4">
        {icon}
        <span className="tracking-[0.2em]">{label}</span>
      </div>

      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black"
        />
      )}
    </button>
  );
}

// Screens
function LoginScreen({ onLogin }: { onLogin: () => void, key?: string }) {
  const [password, setPassword] = useState('');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md bg-black border border-primary p-8 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.2)]">
        <div className="absolute top-0 right-0 p-2 text-[10px] text-secondary font-mono">SEC_PROTOCOL_775_X</div>
        
        <div className="text-center mb-10">
          <Shield size={64} className="mx-auto text-primary mb-6 drop-shadow-[0_0_10px_#00ff41]" />
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-2">AUTH_REQUIRED</h2>
          <p className="text-secondary text-[10px] uppercase tracking-widest">Enter bio-signature connection key</p>
        </div>

        <form 
          className="space-y-8" 
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-[10px] text-secondary uppercase mb-1 tracking-widest font-bold group-focus-within:text-primary">USER_ID</label>
              <div className="flex items-center border-b border-secondary group-focus-within:border-primary transition-all">
                <Mail size={16} className="mr-2 opacity-40 group-focus-within:opacity-100 text-primary" />
                <input 
                  type="text" 
                  placeholder="OPERATOR_X" 
                  className="w-full bg-transparent border-none focus:ring-0 text-primary font-mono text-sm placeholder:text-secondary py-2"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[10px] text-secondary uppercase mb-1 tracking-widest font-bold group-focus-within:text-primary">ENCRYPTION_KEY</label>
              <div className="flex items-center border-b border-secondary group-focus-within:border-primary transition-all">
                <Lock size={16} className="mr-2 opacity-40 group-focus-within:opacity-100 text-primary" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-transparent border-none focus:ring-0 text-primary font-mono text-sm placeholder:text-secondary py-2"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-black border border-primary py-4 text-primary font-bold uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all relative overflow-hidden group"
          >
            [ INITIALIZE_UPLINK ]
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-secondary/30 text-[8px] text-secondary font-mono space-y-1">
          <p>&gt; CONNECTING TO NODE_SNG_04...</p>
          <p>&gt; HANDSHAKE VERIFIED.</p>
          <p>&gt; WAITING FOR INPUT...<span className="cursor-blink" /></p>
        </div>

        {/* Hidden Sound Iframe as per request */}
        <iframe 
          src="https://www.youtube.com/embed/24XxPGwNGvk?autoplay=1&mute=0" 
          allow="autoplay" 
          className="hidden"
          title="Security Channel"
        />
      </div>
    </motion.div>
  );
}

function DashboardScreen() {
  const skills = [
    { name: 'PENETRATION_TESTING', level: 95 },
    { name: 'REACT_CONSTRUCT', level: 90 },
    { name: 'NODE_OS', level: 85 },
    { name: 'CLOUD_SATELLITE', level: 75 },
    { name: 'QUANTUM_ENCRYPTION', level: 60 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 space-y-24 max-w-7xl mx-auto pb-40"
    >
      <section className="min-h-[60vh] flex flex-col justify-center relative border-b border-secondary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="text-[30vw] font-black tracking-tighter text-primary">SYN</div>
        </div>
        
        <div className="relative z-10">
          <div className="text-secondary text-sm font-mono mb-2 uppercase tracking-[0.3em] font-bold">[ INITIALIZING SYSTEM... ]</div>
          <h1 className="text-8xl font-black uppercase tracking-tighter mb-4 text-primary crt-glow">WAYNE</h1>
          <div className="text-2xl text-secondary uppercase mb-8 max-w-2xl font-bold">
            Cyber Security <span className="text-primary">/</span> Full-Stack Dev <span className="text-primary">/</span> Hacker
          </div>
          <div className="flex gap-4">
            <button className="bg-black border border-primary text-primary px-8 py-4 uppercase font-black tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-2 group shadow-[0_0_15px_rgba(0,255,65,0.2)]">
              [ ACCESS_GRANTED ]
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-primary px-8 py-4 uppercase font-bold tracking-widest hover:bg-primary/5 transition-all">
              [ VIEW_LOGS ]
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 right-0 max-w-xs hidden md:block border border-secondary p-4 bg-black/50 backdrop-blur-sm">
          <div className="text-[10px] text-secondary mb-2 uppercase tracking-widest flex justify-between">
            <span>LATENCY: 12ms</span>
            <span>UPTIME: 99.9%</span>
          </div>
          <div className="h-1 bg-secondary/30 w-full relative overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 h-full bg-primary w-1/3" 
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-8">
          <h2 className="text-3xl font-bold uppercase flex items-center gap-4">
            <span className="text-secondary">01//</span> ABOUT_ME
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-secondary/80">
            <p>
              Operating at the sharp edge of the digital frontier. I design systems that are as secure as they are performant. 
            </p>
            <p>
              Focused on <span className="text-primary brightness-110 font-bold">Cyber Security Research</span> and high-fidelity application development for secure infrastructures.
            </p>
            <p className="italic border-l-2 border-primary pl-6 py-2 bg-primary/5 text-primary text-sm">
              "In a world where data is the new currency, code is the vault. I build the vaults."
            </p>
          </div>
          
          <div className="pt-8 grid grid-cols-2 gap-4">
            <div className="border border-secondary p-4 flex items-center gap-3 group hover:border-primary transition-all cursor-crosshair bg-secondary/5">
              <Shield className="text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-primary">Security</span>
                <span className="text-[8px] text-secondary">OSCP_CERT</span>
              </div>
            </div>
            <div className="border border-secondary p-4 flex items-center gap-3 group hover:border-primary transition-all cursor-crosshair bg-secondary/5">
              <Terminal className="text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-primary">DevOps</span>
                <span className="text-[8px] text-secondary">CI_CD_EXP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 border border-secondary p-8 bg-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Cpu size={120} />
          </div>
          <h3 className="text-sm font-black uppercase text-primary mb-8 tracking-[0.4em] flex items-center gap-3">
            [ SYSTEM_CAPABILITIES ]
            <div className="flex-1 h-[1px] bg-secondary" />
          </h3>
          
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{skill.name}</span>
                  <span className="text-[10px] font-mono text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="h-1 bg-secondary/20 w-full relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute inset-0 bg-primary shadow-[0_0_8px_#00ff41]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-center text-3xl font-bold uppercase mb-16 flex items-center justify-center gap-4">
          <span className="text-secondary">02//</span> ESTABLISH_LINK
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <p className="text-secondary text-lg">
              Open for clandestine collaborations and high-priority system architecture projects. Reach out through secure channels.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 border border-secondary flex items-center justify-center group-hover:border-primary transition-all">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <div className="text-[8px] text-secondary uppercase font-mono tracking-widest">Protocol: SMTP</div>
                  <div className="text-primary font-mono uppercase group-hover:underline">wayne@construct.sys</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 border border-secondary flex items-center justify-center group-hover:border-primary transition-all">
                  <Globe className="text-primary" />
                </div>
                <div>
                  <div className="text-[8px] text-secondary uppercase font-mono tracking-widest">Network: Matrix</div>
                  <div className="text-primary font-mono uppercase group-hover:underline">@wayne_construct</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-secondary p-10 bg-secondary/5 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
            <form className="space-y-8">
              <div className="relative group">
                <label className="text-[10px] text-secondary uppercase block mb-1">SENDER_ID</label>
                <input type="text" className="w-full bg-transparent border-b border-secondary focus:border-primary focus:ring-0 py-2 text-primary font-mono" placeholder="NAME" />
              </div>
              <div className="relative group">
                <label className="text-[10px] text-secondary uppercase block mb-1">PAYLOAD</label>
                <textarea className="w-full bg-transparent border-b border-secondary focus:border-primary focus:ring-0 py-2 text-primary font-mono h-24" placeholder="MESSAGE_CONTENT" />
              </div>
              <button className="w-full bg-primary text-black font-bold py-4 uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110">
                [ EXECUTE_SEND ]
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function IntelScreen() {
  const [activeFile, setActiveFile] = useState(0);
  const files = [
    { name: 'NODAL_TRANSIT_LOG.DAT', sn: '99-AF-0142', status: 'DECRYPTED', content: 'TRACE_ID: 0x442... [INFO] Packet rerouted through Baltic nodes. Protocol: ICMP. Latency: 42ms. Security Level: LOW. Origin: 142.250.0.1.' },
    { name: 'CORE_SCHEMA_V4.SQL', sn: '72-BX-9001', status: 'ENCRYPTED', content: '***************************************************\n[ENCRYPTION_DETECTION]: AES-256-CBC\n[ATTEMPTING_DECRYPTION]: FAILED\n[ERROR]: RSA_KEY_MISSING' },
    { name: 'PROJECT_NIGHTFALL.EXE', sn: '00-XX-0000', status: 'REDACTED', content: '███████████████████████████████████████████\n[REDACTION_ORDER]: O-99-ALPHA\n[SUBJECT]: CLASSIFIED_BIOMETRICS' },
    { name: 'BIOS_OVERRIDE_PATCH.BIN', sn: '41-CV-2239', status: 'DECRYPTED', content: 'ENTRY_POINT: 0x7FFFF... System fan control bypassed. Thermal limits ignored. Voltage: 1.25V. Clock: 4.8GHz. Stable: YES.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 grid grid-cols-12 gap-8 h-full"
    >
      <div className="col-span-12 border-b border-secondary pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase text-primary crt-glow">Intelligence Database</h1>
            <p className="text-[10px] text-secondary tracking-[0.4em] mt-1 font-bold">AUTHORIZED ACCESS ONLY // LEVEL 4 CLEARANCE</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px]">
              <Search size={14} />
              <span>SEARCH_IDX_PRODIGY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-4">
        <div className="flex gap-4 mb-6">
          <button className="text-[10px] font-bold border-b-2 border-primary px-2 py-1 text-primary">DATABASE_01</button>
          <button className="text-[10px] font-bold text-secondary px-2 py-1 hover:text-primary">ARCHIVE_X</button>
        </div>
        
        <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar">
          {files.map((file, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }}
              onClick={() => setActiveFile(i)}
              className={`group border p-4 bg-black transition-all cursor-pointer relative overflow-hidden ${
                activeFile === i ? 'border-primary shadow-[0_0_10px_rgba(0,255,65,0.1)]' : 'border-secondary/40'
              }`}
            >
              {activeFile === i && <div className="absolute left-0 top-0 w-1 h-full bg-primary" />}
              <div className="absolute top-0 right-0 p-1 text-[6px] text-secondary font-mono">S/N: {file.sn}</div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <FileText size={18} className={file.status === 'DECRYPTED' ? 'text-primary' : 'text-secondary'} />
                  <div>
                    <h3 className={`text-[10px] font-bold tracking-widest ${activeFile === i ? 'text-primary' : 'text-secondary'}`}>{file.name}</h3>
                    <p className="text-[7px] text-secondary/50 font-mono">2024.05.12 14:22:01 UTC</p>
                  </div>
                </div>
                <span className={`text-[7px] px-2 py-0.5 font-bold uppercase tracking-widest ${
                  file.status === 'DECRYPTED' ? 'bg-primary text-black' : 
                  file.status === 'REDACTED' ? 'bg-red-900 text-white' : 
                  'border border-secondary text-secondary'
                }`}>
                  {file.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
        <div className="flex-1 border border-secondary bg-black/50 p-8 relative flex flex-col overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />

          <div className="flex justify-between items-center mb-8 border-b border-secondary pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-primary flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-black text-primary tracking-widest">{files[activeFile].name}</h4>
                <p className="text-[8px] text-secondary font-mono uppercase">Decryption: {files[activeFile].status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Archive size={14} className="text-secondary cursor-pointer hover:text-primary" title="Archive" />
              <Download size={14} className="text-secondary cursor-pointer hover:text-primary" title="Download" />
            </div>
          </div>

          <div className="flex-1 font-mono text-[11px] leading-relaxed relative group">
            <div className="absolute right-0 top-0 text-[8px] text-secondary opacity-30 select-none">FILE_CONTENT_VIEWER_V1.1</div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFile}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="whitespace-pre-wrap text-primary/80"
              >
                <span className="text-primary opacity-40 select-none">&gt; cat {files[activeFile].name}</span><br/><br/>
                {files[activeFile].content}
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-4 bg-primary ml-1 align-bottom"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="h-24 border border-secondary bg-black p-4 overflow-hidden relative">
          <div className="absolute right-4 top-4">
            <Activity size={16} className="text-primary animate-pulse" />
          </div>
          <div className="text-[9px] font-mono text-secondary space-y-1">
            <p className="text-primary">&gt; STREAMING_SEC_LOGS... COMPLETED</p>
            <p>&gt; LAST_KNOWN_IP: 192.168.100.12</p>
            <p className="text-red-500 animate-pulse">&gt; WARNING: MULTIPLE_AUTH_FAILURES_DETECTED</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArsenalScreen() {
  const tools = [
    { title: 'VOID_SCANNER', sn: 'VS-992-K', icon: <ArrowRight />, description: 'Deep-packet inspection tool designed to penetrate encrypted sub-networks.' },
    { title: 'ROOT_KICKER', sn: 'RK-004-X', icon: <Terminal />, description: 'Advanced privilege escalation script for legacy terminal architectures.' },
    { title: 'GHOST_SHELL', sn: 'GH-115-S', icon: <Shield />, description: 'Virtual environment spoofer that creates decoy sessions.' },
    { title: 'SIGNAL_BREAKER', sn: 'SB-ALPHA-0', icon: <Zap />, description: 'Frequency jamming device capable of neutralizing wireless protocols.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-8"
    >
      <div className="flex justify-between items-end border-b border-secondary pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-primary">SECURITY_ARSENAL</h1>
          <div className="flex gap-4 mt-2">
            <span className="text-[8px] font-bold bg-primary/10 border border-primary px-2 py-1">[ CATEGORY: OFFENSIVE_TOOLS ]</span>
            <span className="text-[8px] font-bold border border-secondary text-secondary px-2 py-1">[ LOADED: 04_MODULES ]</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <div key={i} className="group border border-secondary p-6 bg-black hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] text-secondary font-mono">SN: {tool.sn}</div>
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <h3 className="text-xl font-black text-primary mb-2">{tool.title}</h3>
            <p className="text-secondary text-xs mb-6 leading-relaxed opacity-60">{tool.description}</p>
            <div className="border-t border-secondary pt-4">
              <p className="text-[8px] text-secondary uppercase font-bold mb-1">Hardware Req</p>
              <p className="text-[9px] text-primary font-mono">Quant-Link v2.1 | Neural Bridge</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MapScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full relative overflow-hidden bg-black/80"
    >
      {/* SVG Network Mockup */}
      <svg className="absolute inset-0 w-full h-full p-20 pointer-events-none opacity-40">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="#00ff41" strokeWidth="1" fill="none" filter="url(#glow)">
          <circle cx="200" cy="200" r="4" fill="#00ff41" />
          <circle cx="600" cy="150" r="4" fill="#00ff41" />
          <circle cx="800" cy="400" r="6" fill="#ffb4ab" />
          <circle cx="400" cy="500" r="4" fill="#00ff41" />
          <path d="M 200 200 L 600 150 L 800 400 L 400 500 Z" strokeOpacity="0.5" strokeDasharray="5,5" />
          <path d="M 600 150 L 400 500" />
        </g>
      </svg>

      <div className="absolute top-8 left-8 flex gap-4">
        <div className="bg-black/90 border border-primary px-4 py-2 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary tracking-widest">NETWORK_ALIVE</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 h-full w-80 bg-black/95 border-l border-secondary p-8 z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-primary uppercase">Node_Detail</h2>
          <p className="text-[6px] font-mono text-secondary">#SN-992-0X-B</p>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-[8px] text-secondary uppercase font-bold mb-1">Identifier</p>
            <p className="text-xl font-bold text-primary">X-RAY_09_SECTOR</p>
          </div>
          
          <div className="space-y-4">
            <div className="border border-secondary p-4">
              <p className="text-[8px] text-secondary uppercase font-bold mb-1">IP Address</p>
              <p className="text-sm font-mono text-primary">192.168.1.254</p>
            </div>
            <div className="border border-secondary p-4">
              <p className="text-[8px] text-secondary uppercase font-bold mb-1">Link Strength</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-primary">94.2%</span>
                <div className="flex-1 h-1 bg-secondary">
                  <div className="h-full bg-primary" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-black border border-primary text-primary font-bold py-4 px-6 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-primary hover:text-black transition-all">
            <Maximize2 size={14} />
            RE-ROUTE_CONNECTION
          </button>
        </div>
        
        <div className="absolute bottom-4 right-4 text-secondary text-2xl font-mono opacity-20">┘</div>
      </div>

      <div className="absolute bottom-8 left-8">
        <div className="border border-secondary bg-black/80 p-4 w-64 backdrop-blur">
          <p className="text-[10px] font-bold text-primary mb-2">┌ TERMINAL_FEED ┐</p>
          <div className="text-[8px] font-mono text-secondary space-y-1">
            <p>&gt; AUTHENTICATING SYSLOG...</p>
            <p>&gt; HANDSHAKE COMPLETE (128ms)</p>
            <p className="text-red-500">&gt; WARNING: BUFFER OVERFLOW AT 0x4F22</p>
            <p>&gt; RE-ROUTING... _</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
