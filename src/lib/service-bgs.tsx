// Thematic SVG background illustrations — one per service.
// Inline SVG: zero network cost, pure compositor animation.
// Used in Services.tsx card story AND service detail page heroes.
// ViewBox: 460×520 (portrait) — designed for card illustration zone.

export const ServiceBgs: Record<string, (accent: string) => React.ReactElement> = {
  "custom-software": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow behind editor */}
      <circle cx="220" cy="240" r="180" fill={a} opacity="0.06" />
      {/* Editor window */}
      <rect x="40" y="80" width="340" height="260" rx="14" stroke={a} strokeWidth="1.5" opacity="0.35" />
      {/* Title bar */}
      <rect x="40" y="80" width="340" height="36" rx="14" fill={a} opacity="0.12" />
      <rect x="40" y="100" width="340" height="16" fill={a} opacity="0.06" />
      {/* Window traffic lights */}
      <circle cx="66"  cy="98" r="6" fill={a} opacity="0.50" />
      <circle cx="86"  cy="98" r="6" fill={a} opacity="0.40" />
      <circle cx="106" cy="98" r="6" fill={a} opacity="0.30" />
      {/* Tab bar */}
      <rect x="60" y="118" width="80" height="20" rx="4" fill={a} opacity="0.15" />
      <rect x="148" y="118" width="60" height="20" rx="4" fill={a} opacity="0.08" />
      {/* Line numbers */}
      <line x1="80" y1="148" x2="80" y2="316" stroke={a} strokeWidth="1" opacity="0.18" />
      <text x="58" y="162" fontFamily="monospace" fontSize="11" fill={a} opacity="0.28">1</text>
      <text x="58" y="182" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">2</text>
      <text x="58" y="202" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">3</text>
      <text x="58" y="222" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">4</text>
      <text x="58" y="242" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">5</text>
      <text x="58" y="262" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">6</text>
      <text x="58" y="282" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">7</text>
      {/* Code lines — varying width for realism */}
      <rect x="92" y="154" width="180" height="10" rx="3" fill={a} opacity="0.38" />
      <rect x="100" y="174" width="220" height="10" rx="3" fill={a} opacity="0.30" />
      <rect x="100" y="194" width="160" height="10" rx="3" fill={a} opacity="0.35" />
      <rect x="108" y="214" width="200" height="10" rx="3" fill={a} opacity="0.28" />
      <rect x="108" y="234" width="130" height="10" rx="3" fill={a} opacity="0.32" />
      {/* Cursor */}
      <rect x="244" y="228" width="2" height="14" fill={a} opacity="0.70" rx="1" />
      <rect x="92" y="254" width="250" height="10" rx="3" fill={a} opacity="0.30" />
      <rect x="92" y="274" width="190" height="10" rx="3" fill={a} opacity="0.25" />
      <rect x="92" y="294" width="120" height="10" rx="3" fill={a} opacity="0.20" />
      {/* Large </> watermark */}
      <text x="60" y="460" fontFamily="monospace" fontSize="110" fill={a} opacity="0.12" fontWeight="700">&lt;/&gt;</text>
      {/* Right panel suggestions */}
      <rect x="398" y="148" width="44" height="8" rx="3" fill={a} opacity="0.20" />
      <rect x="398" y="164" width="32" height="8" rx="3" fill={a} opacity="0.15" />
      <rect x="398" y="180" width="40" height="8" rx="3" fill={a} opacity="0.18" />
    </svg>
  ),

  "ai-systems": (a) => {
    const layers: [number, number][][] = [
      [[60,120],[60,220],[60,320],[60,420]],
      [[190,80],[190,170],[190,260],[190,350],[190,440]],
      [[320,120],[320,220],[320,320],[320,420]],
      [[430,180],[430,300]],
    ];
    const edges: [number, number, number, number][] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      for (const [x1,y1] of layers[l]) {
        for (const [x2,y2] of layers[l+1]) {
          edges.push([x1,y1,x2,y2]);
        }
      }
    }
    return (
      <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {/* Glow */}
        <circle cx="245" cy="260" r="160" fill={a} opacity="0.07" />
        <circle cx="245" cy="260" r="90"  fill={a} opacity="0.06" />
        {/* Edges */}
        {edges.map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth="0.8" opacity="0.18" />
        ))}
        {/* Nodes */}
        {layers.map((layer, li) =>
          layer.map(([cx,cy], ni) => {
            const isCenter = li === 1 && ni === 2;
            const isOutput = li === 3;
            return (
              <circle
                key={`${li}-${ni}`}
                cx={cx} cy={cy}
                r={isCenter ? 14 : isOutput ? 11 : 8}
                fill={a}
                opacity={isCenter ? 0.55 : isOutput ? 0.40 : 0.28}
              />
            );
          })
        )}
        {/* Outer ring on center node */}
        <circle cx="190" cy="260" r="22" stroke={a} strokeWidth="1.5" opacity="0.35" />
        <circle cx="190" cy="260" r="32" stroke={a} strokeWidth="0.8" strokeDasharray="3 5" opacity="0.20" />
        {/* Activation labels */}
        <text x="30" y="265" fontFamily="monospace" fontSize="9" fill={a} opacity="0.30">IN</text>
        <text x="156" y="265" fontFamily="monospace" fontSize="9" fill={a} opacity="0.25">×W</text>
        <text x="310" y="265" fontFamily="monospace" fontSize="9" fill={a} opacity="0.22">ReLU</text>
        <text x="415" y="245" fontFamily="monospace" fontSize="9" fill={a} opacity="0.30">OUT</text>
        {/* Ambient dashed rings */}
        <circle cx="430" cy="180" r="28" stroke={a} strokeWidth="1" strokeDasharray="4 5" opacity="0.22" />
        <circle cx="430" cy="300" r="28" stroke={a} strokeWidth="1" strokeDasharray="4 5" opacity="0.22" />
      </svg>
    );
  },

  "cloud-devops": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Sky glow */}
      <circle cx="220" cy="160" r="160" fill={a} opacity="0.06" />
      {/* Main cloud — filled */}
      <path
        d="M90 200 Q90 148 136 148 Q146 104 198 104 Q240 72 282 104 Q322 88 344 120 Q386 112 390 158 Q428 154 428 196 Q432 234 390 234 L110 234 Q68 234 90 200Z"
        fill={a} opacity="0.22"
        stroke={a} strokeWidth="1.5" strokeOpacity="0.40"
      />
      {/* Cloud 2 smaller */}
      <path
        d="M160 290 Q160 264 184 264 Q190 248 210 248 Q228 236 246 248 Q262 240 278 254 Q294 250 296 268 Q312 266 312 284 Q314 300 292 300 L174 300 Q158 300 160 290Z"
        fill={a} opacity="0.14"
        stroke={a} strokeWidth="1" strokeOpacity="0.28"
      />
      {/* Trunk lines */}
      <line x1="220" y1="234" x2="220" y2="330" stroke={a} strokeWidth="1.5" opacity="0.35" />
      <line x1="220" y1="330" x2="130" y2="370" stroke={a} strokeWidth="1.5" opacity="0.30" />
      <line x1="220" y1="330" x2="220" y2="370" stroke={a} strokeWidth="1.5" opacity="0.30" />
      <line x1="220" y1="330" x2="310" y2="370" stroke={a} strokeWidth="1.5" opacity="0.30" />
      {/* Server boxes */}
      {[130, 220, 310].map((x, i) => (
        <g key={i}>
          <rect x={x - 32} y={370} width={64} height={44} rx="8" fill={a} opacity="0.22" stroke={a} strokeWidth="1" strokeOpacity="0.35" />
          <line x1={x - 20} y1={382} x2={x + 20} y2={382} stroke={a} strokeWidth="1" opacity="0.40" />
          <line x1={x - 20} y1={392} x2={x + 12} y2={392} stroke={a} strokeWidth="1" opacity="0.30" />
          <circle cx={x - 24} y={405} r="3" fill={a} opacity="0.45" />
        </g>
      ))}
      {/* CI/CD infinity-ish loop hint */}
      <path d="M340 140 Q380 120 390 160 Q400 200 360 200 Q320 200 330 160 Q340 120 380 120" stroke={a} strokeWidth="1.2" opacity="0.28" strokeLinecap="round" />
    </svg>
  ),

  "mobile": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="220" cy="270" r="180" fill={a} opacity="0.06" />
      {/* Back phone (Android) */}
      <rect x="200" y="60" width="130" height="240" rx="20" fill={a} opacity="0.14" stroke={a} strokeWidth="1.5" strokeOpacity="0.35" />
      <rect x="210" y="88" width="110" height="172" rx="6" fill={a} opacity="0.10" />
      {/* Back phone content bars */}
      <rect x="220" y="100" width="80" height="10" rx="3" fill={a} opacity="0.30" />
      <rect x="220" y="118" width="60" height="8"  rx="3" fill={a} opacity="0.22" />
      <rect x="220" y="134" width="90" height="24" rx="6" fill={a} opacity="0.18" />
      <rect x="220" y="166" width="40" height="6"  rx="3" fill={a} opacity="0.18" />
      <rect x="268" y="166" width="40" height="6"  rx="3" fill={a} opacity="0.15" />
      <circle cx="255" cy="275" r="10" stroke={a} strokeWidth="1.5" opacity="0.30" />
      {/* Front phone (iOS) */}
      <rect x="80" y="100" width="130" height="260" rx="22" fill={a} opacity="0.20" stroke={a} strokeWidth="1.5" strokeOpacity="0.45" />
      <rect x="90" y="128" width="110" height="198" rx="6" fill={a} opacity="0.12" />
      {/* Notch */}
      <rect x="114" y="106" width="62" height="16" rx="8" fill={a} opacity="0.30" />
      {/* Front phone content */}
      <rect x="100" y="138" width="90" height="12" rx="4" fill={a} opacity="0.35" />
      <rect x="100" y="158" width="65" height="8"  rx="3" fill={a} opacity="0.25" />
      <rect x="100" y="174" width="100" height="52" rx="8" fill={a} opacity="0.20" />
      <rect x="100" y="236" width="46" height="46" rx="8" fill={a} opacity="0.18" />
      <rect x="154" y="236" width="46" height="46" rx="8" fill={a} opacity="0.15" />
      <rect x="100" y="290" width="100" height="28" rx="6" fill={a} opacity="0.22" />
      {/* Home bar */}
      <rect x="130" y="345" width="50" height="5" rx="2.5" fill={a} opacity="0.35" />
      {/* Signal waves (right side) */}
      {[0,1,2].map(i => (
        <path
          key={i}
          d={`M ${370 + i * 0} ${220} Q ${380 + i * 14} ${260} ${370 + i * 0} ${300}`}
          stroke={a} strokeWidth="1.5" opacity={0.35 - i * 0.10}
          strokeLinecap="round" fill="none"
        />
      ))}
    </svg>
  ),

  "ui-ux": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="200" cy="240" r="170" fill={a} opacity="0.06" />
      {/* Figma-like design frame */}
      <rect x="40" y="60" width="260" height="200" rx="4" stroke={a} strokeWidth="1.5" opacity="0.38" />
      {/* Frame label */}
      <text x="40" y="52" fontFamily="monospace" fontSize="11" fill={a} opacity="0.35">Frame 1</text>
      {/* Resize handles */}
      {[[40,60],[300,60],[40,260],[300,260],[170,60],[170,260],[40,160],[300,160]].map(([x,y],i) => (
        <rect key={i} x={x-4} y={y-4} width="8" height="8" rx="2" fill={a} opacity="0.40" />
      ))}
      {/* Component grid inside frame */}
      <rect x="56" y="76" width="232" height="40" rx="6" fill={a} opacity="0.18" />
      {/* Nav items */}
      <rect x="66"  y="89" width="40" height="10" rx="3" fill={a} opacity="0.30" />
      <rect x="114" y="89" width="40" height="10" rx="3" fill={a} opacity="0.22" />
      <rect x="162" y="89" width="40" height="10" rx="3" fill={a} opacity="0.22" />
      {/* Hero block */}
      <rect x="56" y="124" width="232" height="70" rx="6" fill={a} opacity="0.14" />
      <rect x="68" y="136" width="140" height="12" rx="3" fill={a} opacity="0.35" />
      <rect x="68" y="154" width="100" height="8"  rx="3" fill={a} opacity="0.25" />
      <rect x="68" y="170" width="60"  height="16" rx="8" fill={a} opacity="0.40" />
      {/* Card grid */}
      <rect x="56"  y="202" width="108" height="46" rx="6" fill={a} opacity="0.16" />
      <rect x="172" y="202" width="116" height="46" rx="6" fill={a} opacity="0.12" />
      {/* Design panel right */}
      <rect x="320" y="60" width="110" height="310" rx="8" fill={a} opacity="0.10" stroke={a} strokeWidth="1" strokeOpacity="0.28" />
      {/* Panel items */}
      <text x="330" y="84" fontFamily="monospace" fontSize="10" fill={a} opacity="0.30">Design</text>
      <rect x="330" y="94"  width="88" height="1" fill={a} opacity="0.20" />
      <text x="330" y="112" fontFamily="monospace" fontSize="9" fill={a} opacity="0.22">Fill</text>
      <rect x="330" y="118" width="60" height="14" rx="3" fill={a} opacity="0.28" />
      <text x="330" y="146" fontFamily="monospace" fontSize="9" fill={a} opacity="0.22">Stroke</text>
      <rect x="330" y="152" width="60" height="14" rx="3" stroke={a} strokeWidth="1" opacity="0.25" />
      <text x="330" y="180" fontFamily="monospace" fontSize="9" fill={a} opacity="0.22">Radius</text>
      <rect x="330" y="186" width="60" height="14" rx="3" fill={a} opacity="0.16" />
      {/* Color swatches */}
      {[[330,220],[352,220],[374,220],[396,220]].map(([x,y],i) => (
        <circle key={i} cx={x+8} cy={y+8} r="8" fill={a} opacity={0.55 - i*0.10} />
      ))}
      {/* Cursor */}
      <path d="M170 400 L178 430 L183 418 L196 426 Z" fill={a} opacity="0.50" />
      {/* Concentric guide circles (center viewport) */}
      <circle cx="170" cy="400" r="40"  stroke={a} strokeWidth="0.8" strokeDasharray="3 5" opacity="0.20" />
      <circle cx="170" cy="400" r="80"  stroke={a} strokeWidth="0.6" strokeDasharray="3 8" opacity="0.14" />
    </svg>
  ),

  "web-platforms": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="220" cy="230" r="180" fill={a} opacity="0.06" />
      {/* Browser frame */}
      <rect x="30" y="70" width="360" height="280" rx="12" fill={a} opacity="0.08" stroke={a} strokeWidth="1.5" strokeOpacity="0.40" />
      {/* Chrome bar */}
      <rect x="30" y="70" width="360" height="40" rx="12" fill={a} opacity="0.16" />
      <rect x="30" y="96" width="360" height="14" fill={a} opacity="0.08" />
      {/* Browser buttons */}
      <circle cx="52" cy="90" r="6" fill={a} opacity="0.40" />
      <circle cx="70" cy="90" r="6" fill={a} opacity="0.32" />
      <circle cx="88" cy="90" r="6" fill={a} opacity="0.24" />
      {/* URL bar */}
      <rect x="106" y="82" width="200" height="18" rx="9" fill={a} opacity="0.20" />
      <text x="116" y="95" fontFamily="monospace" fontSize="9" fill={a} opacity="0.45">https://yoursite.com</text>
      {/* Page content — hero */}
      <rect x="46" y="122" width="328" height="60" rx="6" fill={a} opacity="0.12" />
      <rect x="58" y="132" width="180" height="14" rx="4" fill={a} opacity="0.35" />
      <rect x="58" y="152" width="120" height="10" rx="3" fill={a} opacity="0.25" />
      {/* Two column layout */}
      <rect x="46"  y="194" width="152" height="90" rx="6" fill={a} opacity="0.14" />
      <rect x="206" y="194" width="168" height="90" rx="6" fill={a} opacity="0.10" />
      {/* Left content bars */}
      <rect x="58" y="206" width="110" height="9" rx="3" fill={a} opacity="0.30" />
      <rect x="58" y="222" width="80"  height="7" rx="3" fill={a} opacity="0.22" />
      <rect x="58" y="236" width="100" height="7" rx="3" fill={a} opacity="0.22" />
      <rect x="58" y="252" width="40"  height="20" rx="6" fill={a} opacity="0.35" />
      {/* Right image placeholder */}
      <rect x="216" y="204" width="148" height="70" rx="4" fill={a} opacity="0.18" />
      {/* Lighthouse score meter */}
      <circle cx="380" cy="400" r="44" stroke={a} strokeWidth="3" opacity="0.30" />
      <path d="M 350 400 A 44 44 0 0 1 410 372" stroke={a} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <text x="364" y="405" fontFamily="monospace" fontSize="14" fill={a} opacity="0.50" fontWeight="700">99</text>
      <text x="358" y="420" fontFamily="monospace" fontSize="8" fill={a} opacity="0.30">PERF</text>
      {/* Mobile ghost */}
      <rect x="46" y="420" width="50" height="82" rx="8" stroke={a} strokeWidth="1.2" opacity="0.28" />
      <rect x="53" y="432" width="36" height="58" rx="3" fill={a} opacity="0.10" />
      <rect x="63" y="495" width="16" height="4" rx="2" fill={a} opacity="0.25" />
    </svg>
  ),

  "digital-transformation": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="220" cy="260" r="170" fill={a} opacity="0.06" />
      {/* Stage 1: Legacy */}
      <rect x="30" y="200" width="100" height="80" rx="8" fill={a} opacity="0.18" stroke={a} strokeWidth="1.5" strokeOpacity="0.40" />
      <text x="48" y="234" fontFamily="monospace" fontSize="11" fill={a} opacity="0.40">Legacy</text>
      <rect x="42" y="242" width="76" height="7" rx="3" fill={a} opacity="0.25" />
      <rect x="42" y="255" width="55" height="7" rx="3" fill={a} opacity="0.20" />
      <rect x="42" y="268" width="66" height="7" rx="3" fill={a} opacity="0.18" />
      {/* Arrow 1 */}
      <path d="M 132 240 L 178 240" stroke={a} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <polygon points="178,234 192,240 178,246" fill={a} opacity="0.55" />
      {/* Stage 2: Transition */}
      <rect x="190" y="180" width="100" height="120" rx="10" fill={a} opacity="0.22" stroke={a} strokeWidth="1.5" strokeOpacity="0.45" />
      <text x="205" y="214" fontFamily="monospace" fontSize="11" fill={a} opacity="0.45">Migrate</text>
      {/* Progress bars inside */}
      <rect x="202" y="224" width="76" height="8" rx="4" fill={a} opacity="0.15" />
      <rect x="202" y="224" width="50" height="8" rx="4" fill={a} opacity="0.40" />
      <rect x="202" y="240" width="76" height="8" rx="4" fill={a} opacity="0.15" />
      <rect x="202" y="240" width="68" height="8" rx="4" fill={a} opacity="0.32" />
      <rect x="202" y="256" width="76" height="8" rx="4" fill={a} opacity="0.15" />
      <rect x="202" y="256" width="30" height="8" rx="4" fill={a} opacity="0.25" />
      <text x="202" y="282" fontFamily="monospace" fontSize="9" fill={a} opacity="0.30">68% migrated</text>
      {/* Arrow 2 */}
      <path d="M 292 240 L 338 240" stroke={a} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <polygon points="338,234 352,240 338,246" fill={a} opacity="0.55" />
      {/* Stage 3: Modern */}
      <rect x="350" y="190" width="90" height="100" rx="12" fill={a} opacity="0.28" stroke={a} strokeWidth="1.5" strokeOpacity="0.50" />
      {/* Cloud icon inside modern */}
      <path d="M 370 240 Q 370 224 382 224 Q 385 213 394 213 Q 403 207 412 213 Q 420 209 424 218 Q 432 216 432 226 Q 434 236 424 236 L 372 236 Q 364 236 370 240Z" fill={a} opacity="0.40" />
      <text x="362" y="264" fontFamily="monospace" fontSize="10" fill={a} opacity="0.42">Cloud</text>
      <text x="362" y="278" fontFamily="monospace" fontSize="9"  fill={a} opacity="0.30">Native</text>
      {/* Upward trend */}
      <polyline points="80,430 130,400 190,390 260,360 340,330 400,300" stroke={a} strokeWidth="2" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="400" cy="300" r="6" fill={a} opacity="0.50" />
      {/* Grid underneath trend */}
      {[380,410,440,470].map(y => (
        <line key={y} x1="60" y1={y} x2="430" y2={y} stroke={a} strokeWidth="0.5" opacity="0.12" />
      ))}
    </svg>
  ),

  "fintech": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="200" cy="220" r="180" fill={a} opacity="0.07" />
      {/* Credit card — main hero */}
      <rect x="40" y="80" width="260" height="160" rx="18" fill={a} opacity="0.22" stroke={a} strokeWidth="1.5" strokeOpacity="0.45" />
      {/* Chip */}
      <rect x="62" y="112" width="44" height="34" rx="6" fill={a} opacity="0.45" />
      <line x1="62" y1="128" x2="106" y2="128" stroke={a} strokeWidth="0.8" opacity="0.60" />
      <line x1="84" y1="112" x2="84" y2="146" stroke={a} strokeWidth="0.8" opacity="0.60" />
      {/* Contactless icon */}
      {[0,1,2].map(i => (
        <path
          key={i}
          d={`M ${124 + i*10} ${114} Q ${130 + i*10} ${129} ${124 + i*10} ${144}`}
          stroke={a} strokeWidth="1.5" opacity={0.55 - i*0.12}
          strokeLinecap="round"
        />
      ))}
      {/* Card number */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={62 + i*56} y={168} width="42" height="10" rx="5" fill={a} opacity="0.35" />
      ))}
      {/* Holder name */}
      <rect x="62"  y="190" width="100" height="8" rx="4" fill={a} opacity="0.28" />
      <rect x="220" y="190" width="60"  height="8" rx="4" fill={a} opacity="0.22" />
      {/* Network logo circle */}
      <circle cx="268" cy="112" r="16" fill={a} opacity="0.30" />
      <circle cx="284" cy="112" r="16" fill={a} opacity="0.22" />
      {/* Chart */}
      <polyline points="60,370 100,340 150,350 200,310 260,320 320,280 370,290 420,250" stroke={a} strokeWidth="2" opacity="0.40" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="60,370 100,340 150,350 200,310 260,320 320,280 370,290 420,250 420,420 60,420" fill={a} opacity="0.08" />
      {/* Chart grid */}
      {[300,340,380,420].map(y => (
        <line key={y} x1="60" y1={y} x2="430" y2={y} stroke={a} strokeWidth="0.5" opacity="0.14" />
      ))}
      {/* Currency $ */}
      <text x="360" y="130" fontFamily="monospace" fontSize="72" fill={a} opacity="0.16" fontWeight="700">$</text>
      {/* Data point highlight */}
      <circle cx="420" cy="250" r="5" fill={a} opacity="0.65" />
      <circle cx="420" cy="250" r="10" stroke={a} strokeWidth="1" opacity="0.30" />
    </svg>
  ),

  "api": (a) => {
    const nodes: [number, number, string][] = [
      [80,  120, "Client"], [80, 240, "App"],   [80, 360, "Mobile"],
      [240, 80,  "Auth"],   [240,200, "API"],   [240,320, "Cache"],
      [400, 160, "DB"],     [400,280, "Queue"],
    ];
    const links: [number,number][] = [[0,3],[0,4],[1,4],[1,5],[2,4],[3,6],[4,6],[4,7],[5,7]];
    return (
      <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <circle cx="240" cy="240" r="180" fill={a} opacity="0.05" />
        {/* Links */}
        {links.map(([s,t],i) => (
          <line key={i}
            x1={nodes[s][0]} y1={nodes[s][1]}
            x2={nodes[t][0]} y2={nodes[t][1]}
            stroke={a} strokeWidth="1" opacity="0.25"
          />
        ))}
        {/* Arrow heads on links */}
        {links.map(([s,t],i) => {
          const x1=nodes[s][0], y1=nodes[s][1], x2=nodes[t][0], y2=nodes[t][1];
          const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
          const mx=(x1+x2)/2, my=(y1+y2)/2;
          const ux=dx/len, uy=dy/len;
          return <polygon key={`a${i}`}
            points={`${mx+ux*8},${my+uy*8} ${mx-ux*2+uy*4},${my-uy*2-ux*4} ${mx-ux*2-uy*4},${my-uy*2+ux*4}`}
            fill={a} opacity="0.35"
          />;
        })}
        {/* Node boxes */}
        {nodes.map(([cx,cy,label],i) => (
          <g key={i}>
            <rect x={cx-28} y={cy-18} width="56" height="36" rx="8"
              fill={a} opacity={i===4 ? 0.32 : 0.18}
              stroke={a} strokeWidth="1.2" strokeOpacity={i===4 ? 0.60 : 0.35}
            />
            <text x={cx} y={cy+5} textAnchor="middle" fontFamily="monospace" fontSize="9" fill={a} opacity={i===4 ? 0.70 : 0.45}>
              {label}
            </text>
          </g>
        ))}
        {/* Status codes floating */}
        <text x="300" y="460" fontFamily="monospace" fontSize="13" fill={a} opacity="0.30">200 OK</text>
        <text x="60"  y="460" fontFamily="monospace" fontSize="13" fill={a} opacity="0.22">GET /v2/</text>
        <text x="300" y="480" fontFamily="monospace" fontSize="11" fill={a} opacity="0.20">POST /auth</text>
      </svg>
    );
  },

  "security": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Outer glow */}
      <circle cx="220" cy="230" r="180" fill={a} opacity="0.07" />
      {/* Shield — main hero with fill */}
      <path
        d="M220 60 L340 100 L340 210 Q340 310 220 370 Q100 310 100 210 L100 100 Z"
        fill={a} opacity="0.22"
        stroke={a} strokeWidth="2" strokeOpacity="0.50"
      />
      {/* Inner shield */}
      <path
        d="M220 90 L310 122 L310 210 Q310 285 220 330 Q130 285 130 210 L130 122 Z"
        fill={a} opacity="0.12"
        stroke={a} strokeWidth="1.2" strokeOpacity="0.35"
      />
      {/* Lock icon center */}
      <rect x="194" y="200" width="52" height="44" rx="8" fill={a} opacity="0.55" />
      <path d="M202 200 Q202 175 220 175 Q238 175 238 200" stroke={a} strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      <circle cx="220" cy="218" r="6" fill={a} opacity="0.80" />
      <line x1="220" y1="224" x2="220" y2="234" stroke={a} strokeWidth="2" opacity="0.70" strokeLinecap="round" />
      {/* Orbit rings around shield */}
      <circle cx="220" cy="215" r="100" stroke={a} strokeWidth="0.8" strokeDasharray="4 6" opacity="0.22" />
      <circle cx="220" cy="215" r="140" stroke={a} strokeWidth="0.6" strokeDasharray="3 8" opacity="0.16" />
      {/* Threat nodes on orbit */}
      {[0,1,2,3,4,5].map(i => {
        const angle = (i / 6) * Math.PI * 2 - 0.5;
        const cx = 220 + Math.cos(angle)*100;
        const cy = 215 + Math.sin(angle)*100;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="7" fill={a} opacity={i%2===0 ? 0.30 : 0.18} />
            <line x1={cx} y1={cy} x2="220" y2="215" stroke={a} strokeWidth="0.6" opacity="0.15" />
          </g>
        );
      })}
      {/* Scan lines */}
      <line x1="80"  y1="430" x2="370" y2="430" stroke={a} strokeWidth="1" opacity="0.20" strokeDasharray="6 4" />
      <line x1="100" y1="450" x2="350" y2="450" stroke={a} strokeWidth="1" opacity="0.15" strokeDasharray="6 4" />
      <rect x="60" y="390" width="12" height="80" rx="6" fill={a} opacity="0.30" />
    </svg>
  ),

  "qa": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="220" cy="260" r="180" fill={a} opacity="0.05" />
      {/* Test matrix — 4×4 grid */}
      {[0,1,2,3].map(row => [0,1,2,3].map(col => {
        const x = 40 + col * 90;
        const y = 60 + row * 80;
        const pass = (row+col) % 3 !== 2;
        return (
          <g key={`${row}-${col}`}>
            <rect x={x} y={y} width="70" height="56" rx="8"
              fill={a} opacity={pass ? 0.16 : 0.08}
              stroke={a} strokeWidth="1.2" strokeOpacity={pass ? 0.40 : 0.22}
            />
            {pass ? (
              <polyline
                points={`${x+18},${y+30} ${x+30},${y+40} ${x+52},${y+20}`}
                stroke={a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                opacity="0.60"
              />
            ) : (
              <>
                <line x1={x+20} y1={y+20} x2={x+50} y2={y+46} stroke={a} strokeWidth="2.5" strokeLinecap="round" opacity="0.40" />
                <line x1={x+50} y1={y+20} x2={x+20} y2={y+46} stroke={a} strokeWidth="2.5" strokeLinecap="round" opacity="0.40" />
              </>
            )}
            {/* Row label */}
            {col === 0 && (
              <text x={x-4} y={y+32} textAnchor="end" fontFamily="monospace" fontSize="9" fill={a} opacity="0.28">T{row+1}</text>
            )}
          </g>
        );
      }))}
      {/* Magnifying glass */}
      <circle cx="360" cy="400" r="50" stroke={a} strokeWidth="2.5" opacity="0.38" />
      <circle cx="360" cy="400" r="38" fill={a} opacity="0.10" />
      <line x1="396" y1="436" x2="426" y2="466" stroke={a} strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      {/* Bug inside magnifying glass */}
      <ellipse cx="360" cy="400" rx="14" ry="18" fill={a} opacity="0.35" />
      <line x1="346" y1="388" x2="336" y2="378" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="374" y1="388" x2="384" y2="378" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="346" y1="400" x2="334" y2="400" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="374" y1="400" x2="386" y2="400" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      {/* Coverage % */}
      <text x="40" y="400" fontFamily="monospace" fontSize="32" fill={a} opacity="0.20" fontWeight="700">87%</text>
      <text x="40" y="420" fontFamily="monospace" fontSize="11" fill={a} opacity="0.22">coverage</text>
    </svg>
  ),

  "consulting": (a) => (
    <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {/* Glow */}
      <circle cx="220" cy="200" r="160" fill={a} opacity="0.06" />
      {/* Person head */}
      <circle cx="220" cy="90" r="38" fill={a} opacity="0.24" stroke={a} strokeWidth="1.5" strokeOpacity="0.42" />
      {/* Question mark inside head */}
      <path d="M208 82 Q208 70 220 70 Q235 70 235 82 Q235 92 226 96 Q222 98 222 106" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.60" />
      <circle cx="222" cy="114" r="3" fill={a} opacity="0.65" />
      {/* Shoulders */}
      <path d="M155 170 Q155 140 220 140 Q285 140 285 170" stroke={a} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      {/* Trunk line */}
      <line x1="220" y1="170" x2="220" y2="210" stroke={a} strokeWidth="2" opacity="0.35" />
      {/* Three branch lines */}
      <line x1="220" y1="210" x2="80"  y2="280" stroke={a} strokeWidth="1.5" opacity="0.32" />
      <line x1="220" y1="210" x2="220" y2="280" stroke={a} strokeWidth="1.5" opacity="0.32" />
      <line x1="220" y1="210" x2="360" y2="280" stroke={a} strokeWidth="1.5" opacity="0.32" />
      {/* Branch boxes */}
      {[80, 220, 360].map((x, i) => (
        <g key={i}>
          <rect x={x-48} y={280} width={96} height={56} rx="10"
            fill={a} opacity={0.22 - i*0.02}
            stroke={a} strokeWidth="1.2" strokeOpacity="0.38"
          />
          <rect x={x-36} y={292} width={72} height={8}  rx="3" fill={a} opacity="0.32" />
          <rect x={x-36} y={306} width={54} height={6}  rx="3" fill={a} opacity="0.22" />
          <rect x={x-36} y={318} width={62} height={6}  rx="3" fill={a} opacity="0.18" />
        </g>
      ))}
      {/* Sub-branches from center box */}
      <line x1="220" y1="336" x2="160" y2="390" stroke={a} strokeWidth="1" opacity="0.22" />
      <line x1="220" y1="336" x2="280" y2="390" stroke={a} strokeWidth="1" opacity="0.22" />
      <rect x="126" y="390" width="68" height="44" rx="8" fill={a} opacity="0.14" stroke={a} strokeWidth="1" strokeOpacity="0.28" />
      <rect x="246" y="390" width="68" height="44" rx="8" fill={a} opacity="0.14" stroke={a} strokeWidth="1" strokeOpacity="0.28" />
      {/* Lightbulb hint (top right) */}
      <circle cx="400" cy="80" r="28" fill={a} opacity="0.16" stroke={a} strokeWidth="1.2" strokeOpacity="0.35" />
      <path d="M392 78 Q392 66 400 66 Q408 66 408 78 Q408 86 404 90 L404 96 L396 96 L396 90 Q392 86 392 78Z" fill={a} opacity="0.45" />
      <line x1="396" y1="98" x2="404" y2="98" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      {/* Rays */}
      {[0,1,2,3,4,5].map(i => {
        const angle = (i/6)*Math.PI*2 - Math.PI/2;
        return <line key={i}
          x1={400+Math.cos(angle)*34} y1={80+Math.sin(angle)*34}
          x2={400+Math.cos(angle)*42} y2={80+Math.sin(angle)*42}
          stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity="0.30"
        />;
      })}
    </svg>
  ),
};
