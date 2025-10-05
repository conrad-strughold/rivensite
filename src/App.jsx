import React from "react";
import { motion } from "framer-motion";

// Neutrl-style single-file React landing page
// - TailwindCSS utility classes
// - Host Grotesk as primary font (see NOTE below)
// - Clean navbar, bold hero, soft gradients, glass cards, pill buttons
// - Sections: Hero, Logos, Features, How it works, Metrics, CTA, Footer
//
// NOTE: Ensure Host Grotesk is loaded in your app root (index.html or _document.tsx):
// <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
// Then extend Tailwind to use it: theme.extend.fontFamily.sans = ["Host Grotesk", "ui-sans-serif", "system-ui"]
// Or, simplest: add className="font-[Host_Grotesk]" on <body> and include the link above.

const gradientBg =
  "bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,0.25),rgba(99,102,241,0)_60%),radial-gradient(70%_50%_at_90%_10%,rgba(16,185,129,0.2),rgba(16,185,129,0)_60%),radial-gradient(60%_50%_at_10%_10%,rgba(236,72,153,0.18),rgba(236,72,153,0)_50%)]";

const glass = "backdrop-blur-md bg-white/5 border border-white/10";

// --- Diagram helpers (from your RivenLanding diagram) ---
function diagramLabels(){return{lp:"LP Deposit",pt:"Principal Token (PT)",ft:"Fee Token (FT)"};}
function diagramPositions(){return{ptY:160,ftY:90};}
function diagramLayout(){const boxH=44;const lpY=130;const splitY=lpY+boxH/2;const lpX=40;const splitX=420;const targetX=680;return{boxH,lpY,splitY,lpX,splitX,targetX};}
function diagramFloatDurations(){return{pt:3.1,ft:2.7};}
function diagramCoinTiming(){return{base:1.6,step:0.2};}
function diagramCoinEndYOffset(){return 2;}
function diagramStreamDotCount(){return 24;}
function candlePanSeconds(){return{pt:8,ft:7};}
function candlePanWidth(){return 64;}
function tokenFillColor(){return "#0b1220";}
function tokenFillAlpha(){return 1;}
function candleAnchorShift(){return 2;}
function candleAnimationIsNested(){return true;}
function diagramCandleAnchors(){const {boxH}=diagramLayout();const {ptY,ftY}=diagramPositions();const shift=candleAnchorShift();return{pt:ptY+boxH/2+shift,ft:ftY+boxH/2+shift};}
function diagramCoinCount(){return 14;}

function MiniSplitDiagram(){
  const L=diagramLabels();
  const {ptY,ftY}=diagramPositions();
  const {boxH,lpY,splitY,lpX,splitX,targetX}=diagramLayout();
  const coinCount=diagramCoinCount();
  const floatDur=diagramFloatDurations();
  const coinTiming=diagramCoinTiming();
  const coinEndOffset=diagramCoinEndYOffset();
  const streamDots=diagramStreamDotCount();
  const pan=candlePanSeconds();
  const panWidth=candlePanWidth();
  const boxW=140, boxRX=10;
  const ptCenterY=ptY+boxH/2; const ftCenterY=ftY+boxH/2;
  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-3 sm:p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]">
      <svg viewBox="0 0 900 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Monotone diagram palette (indigo) */}
          <style>{`.mono{color:#a5b4fc}`}</style>
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 8 4, 0 8" fill="#a5b4fc" />
          </marker>
        </defs>

        {/* LP Box */}
        <rect x={lpX} y={lpY} width={boxW} height={boxH} rx={boxRX} fill="rgba(17,24,39,0.9)" stroke="#a5b4fc" strokeWidth="1.5"/>
        <text x={lpX+boxW/2} y={lpY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e5e7eb">{L.lp}</text>

        {/* LP → Split stream */}
        <path id="lpPath" d={`M${lpX+boxW} ${lpY+boxH/2} H ${splitX-20}`} fill="none"/>
        {Array.from({length:streamDots}).map((_,i)=>(
          <circle key={`flow${i}`} r="2.2" fill="#a5b4fc" opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" path={`M${lpX+boxW} ${lpY+boxH/2} H ${splitX-20}`} begin={`${i*0.12}s`}/>
            <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="3s" begin={`${i*0.12}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Splitter plus */}
        <circle cx={splitX} cy={splitY} r="13" fill="rgba(17,24,39,0.9)" stroke="#a5b4fc" strokeWidth="1.5"/>
        <path d={`M${splitX-10} ${splitY} H ${splitX+10}`} stroke="#a5b4fc" strokeWidth="2" opacity="0.8"/>
        <path d={`M${splitX} ${splitY-10} V ${splitY+10}`} stroke="#a5b4fc" strokeWidth="2" opacity="0.8"/>

        {/* Flow to tokens */}
        <path d={`M${splitX + 18} ${splitY - 6} C ${splitX + 70} ${splitY - 6}, ${splitX + 150} ${ptCenterY}, ${targetX} ${ptCenterY}`} stroke="#a5b4fc" strokeWidth="1.5" opacity="0.6" fill="none" markerEnd="url(#arrow)"/>
        <path d={`M${splitX + 18} ${splitY + 6} C ${splitX + 70} ${splitY + 6}, ${splitX + 150} ${ftCenterY}, ${targetX} ${ftCenterY}`} stroke="#a5b4fc" strokeWidth="1.5" opacity="0.6" fill="none" markerEnd="url(#arrow)"/>

        {/* Candlesticks under tokens */}
        {(()=>{const anchors=diagramCandleAnchors();return(<>
          <g transform={`translate(${targetX-30}, ${anchors.pt})`} opacity="0.55" pointerEvents="none">
            <g>
              <animateTransform attributeName="transform" type="translate" dur={`${candlePanSeconds().pt}s`} values={`0 0; -${candlePanWidth()} 0; 0 0`} repeatCount="indefinite"/>
              {Array.from({length:14}).map((_,i)=>{const x=i*16;const up=i%2===0;const bodyH=up?16:12;const wickH=30;return(
                <g key={`ptc${i}`}>
                  <line x1={x+5} x2={x+5} y1={-wickH} y2={up?10:12} stroke="#a5b4fc" opacity="0.35" strokeWidth="1"/>
                  <rect x={x} y={up?-bodyH:-10} width="10" height={bodyH} rx="2" fill="#a5b4fc" opacity={up?0.55:0.35}/>
                </g>
              );})}
            </g>
          </g>
          <g transform={`translate(${targetX-30}, ${anchors.ft})`} opacity="0.55" pointerEvents="none">
            <g>
              <animateTransform attributeName="transform" type="translate" dur={`${candlePanSeconds().ft}s`} values={`0 0; -${candlePanWidth()} 0; 0 0`} repeatCount="indefinite"/>
              {Array.from({length:14}).map((_,i)=>{const x=i*16;const up=i%3!==0;const bodyH=up?15:11;const wickH=28;return(
                <g key={`ftc${i}`}>
                  <line x1={x+5} x2={x+5} y1={-wickH} y2={up?10:12} stroke="#a5b4fc" opacity="0.35" strokeWidth="1"/>
                  <rect x={x} y={up?-bodyH:-10} width="10" height={bodyH} rx="2" fill="#a5b4fc" opacity={up?0.55:0.35}/>
                </g>
              );})}
            </g>
          </g>
        </>);})()}

        {/* PT box */}
        <g transform={`translate(0,0)`}>
          <animateTransform attributeName="transform" type="translate" dur={`${diagramFloatDurations().pt}s`} values="0 0; 0 -10; 0 6; 0 -4; 0 0" keyTimes="0;0.25;0.5;0.75;1" repeatCount="indefinite"/>
          <rect x={targetX} y={ptY} width={boxW} height={boxH} rx={12} fill={tokenFillColor()} stroke="#a5b4fc" strokeWidth="1.5"/>
          <text x={targetX+boxW/2} y={ptY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e8ecff">{L.pt}</text>
        </g>
        {/* FT box */}
        <g transform={`translate(0,0)`}>
          <animateTransform attributeName="transform" type="translate" dur={`${diagramFloatDurations().ft}s`} values="0 0; 0 -12; 0 8; 0 -6; 0 0" keyTimes="0;0.25;0.5;0.75;1" repeatCount="indefinite"/>
          <rect x={targetX} y={ftY} width={boxW} height={boxH} rx={12} fill={tokenFillColor()} stroke="#a5b4fc" strokeWidth="1.5"/>
          <text x={targetX+boxW/2} y={ftY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e8ecff">{L.ft}</text>
        </g>

        {/* Coins */}
        {Array.from({length:coinCount}).map((_,i)=>{const x=targetX+12+(i%7)*((boxW-24)/6);const startY=ftY-60-i*6;const endY=ftY+coinEndOffset;const d=diagramCoinTiming().base+(i%5)*diagramCoinTiming().step;const delay=i*0.12;return(
          <g key={`coin${i}`}>
            <circle r="5" fill="url(#coinGrad)">
              <animateMotion dur={`${d}s`} repeatCount="indefinite" begin={`${delay}s`} path={`M ${x} ${startY} V ${endY}`}/>
            </circle>
            <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.85;1" dur={`${d}s`} begin={`${delay}s`} repeatCount="indefinite"/>
            <circle r="1.6" fill="white" opacity="0.8">
              <animateMotion dur={`${d}s`} repeatCount="indefinite" begin={`${delay}s`} path={`M ${x-2} ${startY-2} V ${endY-2}`}/>
            </circle>
          </g>
        );})}
      </svg>
    </div>
  );
}

export default function NeutrlStyleLanding() {
  return (
    <div className={`min-h-screen ${gradientBg} text-white selection:bg-white/20`}> 
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,10,12,0.9),rgba(10,10,12,1))]"/>

      {/* Navbar */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className={`mt-6 ${glass} rounded-2xl px-4 py-3 flex items-center justify-between`}> 
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center">
                <span className="text-lg font-bold">R</span>
              </div>
              <span className="text-sm sm:text-base tracking-tight font-semibold">Riven</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm/none text-white/80">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#how" className="hover:text-white">How it works</a>
              <a href="#docs" className="hover:text-white">Docs</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <button className={`hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm ${glass} hover:bg-white/10 transition`}>Sign in</button>
              <button className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white hover:bg-white/90 transition">Launch App</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
              Live on Testnet • V0.9
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              A calmer way to do <span className="text-white/90">DeFi</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70 text-base sm:text-lg">
              Simple flows. Confident outcomes. Split liquidity, capture fees, and manage risk—without the noise.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#app" className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">Start in 30 seconds</a>
              <a href="#video" className={`rounded-full px-6 py-3 font-medium ${glass} hover:bg-white/10 transition`}>Watch demo</a>
            </div>
            <p className="mt-4 text-xs text-white/50">No wallet? Try read‑only mode.</p>

            {/* LP → PT + FT animated diagram */}
            <div className="mx-auto mt-8 w-full max-w-4xl">
              <MiniSplitDiagram />
            </div>
          </motion.div>

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]"/>
          </div>

          {/* Hero Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`mt-12 sm:mt-16 rounded-3xl ${glass} overflow-hidden`}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-indigo-400"/>
                  Liquidity Split
                </div>
                <h3 className="mt-3 text-2xl font-semibold">Turn LP positions into yield & principle</h3>
                <p className="mt-2 text-white/70 text-sm">
                  Deposit once, mint two tokens: a Fee Token (FT) that accumulates trading fees, and a Principal Token (PT) that tracks your underlying.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Gas‑efficient, non‑custodial</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Portable ERC‑20s for PT/FT</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Exit anytime or combine back</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <button className="rounded-xl bg-white/90 text-black px-4 py-2 text-sm font-semibold hover:bg-white transition">Open position</button>
                  <button className={`rounded-xl px-4 py-2 text-sm ${glass} hover:bg-white/10`}>Read docs</button>
                </div>
              </div>
              <div className="relative p-6 sm:p-10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(50%_40%_at_30%_0%,rgba(99,102,241,0.4),transparent_60%)]"/>
                <div className="grid gap-3 sm:gap-4 md:gap-5">
                  <div className={`rounded-2xl ${glass} p-4`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Pool</span>
                      <span className="text-white">ETH/USDC</span>
                    </div>
                    <div className="mt-2 flex items-end gap-4">
                      <div className="text-4xl font-semibold">7.8%<span className="text-xl text-white/60"> APY</span></div>
                      <div className="text-xs text-emerald-400">+0.3% today</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-2xl ${glass} p-4`}>
                      <div className="text-xs text-white/60">TVL</div>
                      <div className="text-xl font-semibold mt-1">$42.6M</div>
                    </div>
                    <div className={`rounded-2xl ${glass} p-4`}>
                      <div className="text-xs text-white/60">24h Volume</div>
                      <div className="text-xl font-semibold mt-1">$9.4M</div>
                    </div>
                  </div>
                  <div className={`rounded-2xl ${glass} p-4`}> 
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Your PT</span>
                      <span className="text-white">1,000</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-white/70">Your FT</span>
                      <span className="text-white">1,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Logos / social proof */}
        <section className="mt-20 sm:mt-28">
          <div className={`mx-auto max-w-6xl rounded-3xl ${glass} px-6 py-6 sm:px-8 sm:py-8`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center opacity-80">
              {"ABCDE".split("").map((_, i) => (
                <div key={i} className="h-8 w-24 bg-white/10 rounded"/>
              ))}
              <div className="h-8 w-24 bg-white/10 rounded"/>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-20 sm:mt-28">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Split liquidity",
                desc: "Mint PT and FT to isolate risk vs. fees and regain control over outcomes.",
              },
              {
                title: "Sell future fees",
                desc: "Offload fee exposure today or accumulate over time—your call.",
              },
              {
                title: "Composable by design",
                desc: "Use PT/FT as money‑legos across vaults, hedges, and strategies.",
              },
            ].map((f, i) => (
              <div key={i} className={`rounded-3xl ${glass} p-6 sm:p-8`}> 
                <div className="text-sm text-white/60">0{i + 1}</div>
                <h3 className="mt-2 text-2xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-white/70">{f.desc}</p>
                <div className="mt-6 h-28 rounded-2xl bg-white/5"/>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-20 sm:mt-28">
          <div className={`rounded-3xl ${glass} p-6 sm:p-10`}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { k: "Deposit", d: "Provide liquidity once to your chosen pool." },
                { k: "Split", d: "Receive PT + FT to separate principal from fees." },
                { k: "Trade", d: "Hold or trade PT/FT based on your preference." },
                { k: "Recombine", d: "Burn both to exit back to the base LP." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10 grid place-items-center text-sm">{i + 1}</div>
                  <div>
                    <div className="font-semibold">{s.k}</div>
                    <div className="text-white/70 text-sm mt-1">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mt-20 sm:mt-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["$62.3M", "Total value split"],
              ["1.2M", "Transactions"],
              ["9", "Chains"],
              ["99.98%", "Uptime"],
            ].map(([n, l], i) => (
              <div key={i} className={`rounded-3xl ${glass} p-6 text-center`}> 
                <div className="text-3xl font-semibold">{n}</div>
                <div className="text-white/60 mt-1 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 sm:mt-28 mb-24">
          <div className={`rounded-3xl ${glass} p-8 sm:p-12 text-center`}> 
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">Build a quieter portfolio.</h3>
            <p className="mt-2 text-white/70 max-w-2xl mx-auto">Connect any wallet to explore, or use read‑only to get a feel for flows and strategies."</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition">Launch App</button>
              <button className={`rounded-full px-6 py-3 ${glass} hover:bg-white/10`}>Read the docs</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl ${glass} p-6 sm:p-8`}> 
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-white/10 grid place-items-center">
                  <span className="text-sm font-bold">R</span>
                </div>
                <div className="text-sm text-white/70">© {new Date().getFullYear()} Riven Labs</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
                <a href="#" className="hover:text-white">Docs</a>
                <a href="#" className="hover:text-white">Security</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="X/Twitter" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>X</a>
                <a href="#" aria-label="Discord" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>D</a>
                <a href="#" aria-label="GitHub" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>G</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
