// Thematic SVG background illustrations — one per service.
// Inline SVG: zero network cost, pure compositor animation.
// Used in Services.tsx panel AND service detail page heroes.

export const ServiceBgs: Record<string, (accent: string) => React.ReactElement> = {
  "custom-software": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <text x="28"  y="110" fontFamily="monospace" fontSize="64" fill={a} opacity="0.07">&lt;/&gt;</text>
      <text x="340" y="260" fontFamily="monospace" fontSize="44" fill={a} opacity="0.05">{"{ }"}</text>
      <text x="140" y="310" fontFamily="monospace" fontSize="28" fill={a} opacity="0.04">return</text>
      <text x="380" y="80"  fontFamily="monospace" fontSize="20" fill={a} opacity="0.04">{"( ) =>"}</text>
      <circle cx="500" cy="60"  r="50" stroke={a} strokeWidth="1" opacity="0.05" />
      <circle cx="500" cy="60"  r="30" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="450" y1="300" x2="540" y2="300" stroke={a} strokeWidth="1" opacity="0.05" />
      <line x1="450" y1="315" x2="510" y2="315" stroke={a} strokeWidth="1" opacity="0.04" />
      <line x1="450" y1="330" x2="525" y2="330" stroke={a} strokeWidth="1" opacity="0.03" />
    </svg>
  ),
  "ai-systems": (a) => {
    const nodes: [number, number][] = [[60,80],[60,180],[60,280],[190,40],[190,140],[190,240],[190,320],[310,80],[310,180],[310,280]];
    const edges: [number, number][] = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[4,7],[4,8],[5,8],[5,9],[6,9]];
    return (
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {edges.map(([s,t],i) => <line key={i} x1={nodes[s][0]} y1={nodes[s][1]} x2={nodes[t][0]} y2={nodes[t][1]} stroke={a} strokeWidth="0.8" opacity="0.06" />)}
        {nodes.map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i===4||i===7?9:6} stroke={a} strokeWidth="1.2" opacity="0.08" />)}
        <circle cx="400" cy="180" r="70"  stroke={a} strokeWidth="0.8" strokeDasharray="4 6" opacity="0.05" />
        <circle cx="400" cy="180" r="110" stroke={a} strokeWidth="0.6" strokeDasharray="3 8" opacity="0.04" />
      </svg>
    );
  },
  "cloud-devops": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <path d="M80 180 Q80 130 130 130 Q140 90 190 90 Q230 60 270 90 Q310 70 340 100 Q380 90 390 130 Q430 125 430 170 Q435 210 390 210 L100 210 Q60 210 80 180Z" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M180 260 Q180 230 205 230 Q212 210 235 210 Q255 195 275 210 Q293 200 310 215 Q328 210 332 230 Q350 228 350 250 Q352 268 328 268 L195 268 Q175 268 180 260Z" stroke={a} strokeWidth="1" opacity="0.05" />
      <path d="M270 210 L270 280" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M240 280 L300 280" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="240" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="270" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="300" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M440 80 L480 40 M460 80 L460 40 M480 80 L440 40" stroke={a} strokeWidth="1.5" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
  "mobile": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="180" y="30"  width="120" height="200" rx="16" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <rect x="188" y="55"  width="104" height="140" rx="4"  stroke={a} strokeWidth="0.8" opacity="0.05" />
      <circle cx="240" cy="215" r="7" stroke={a} strokeWidth="1" opacity="0.06" />
      <rect x="350" y="80"  width="80"  height="140" rx="10" stroke={a} strokeWidth="1"   opacity="0.05" />
      <rect x="357" y="95"  width="66"  height="100" rx="3"  stroke={a} strokeWidth="0.7" opacity="0.04" />
      <path d="M80 110 Q120 90 130 130 Q140 90 180 110"  stroke={a} strokeWidth="1"   opacity="0.05" strokeLinecap="round" />
      <path d="M60 150 Q110 120 120 170 Q130 120 190 150" stroke={a} strokeWidth="0.8" opacity="0.04" strokeLinecap="round" />
      <path d="M40 190 Q100 155 115 210 Q125 155 200 190" stroke={a} strokeWidth="0.6" opacity="0.03" strokeLinecap="round" />
    </svg>
  ),
  "ui-ux": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="240" cy="170" r="120" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <circle cx="240" cy="170" r="80"  stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="240" cy="170" r="40"  stroke={a} strokeWidth="1.2" opacity="0.08" />
      <circle cx="240" cy="170" r="8"   fill={a}   opacity="0.08" />
      <line x1="120" y1="170" x2="360" y2="170" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <line x1="240" y1="50"  x2="240" y2="290" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="380" y="60"  width="120" height="80"  rx="6" stroke={a} strokeWidth="1"   opacity="0.06" />
      <rect x="380" y="160" width="120" height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <rect x="380" y="200" width="80"  height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <rect x="380" y="240" width="100" height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.04" />
    </svg>
  ),
  "web-platforms": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="60" y="60"   width="340" height="220" rx="10" stroke={a} strokeWidth="1"   opacity="0.07" />
      <line x1="60"  y1="95"  x2="400" y2="95"  stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="82"  cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="102" cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="122" cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="76"  y="112" width="150" height="12" rx="3" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="76"  y="134" width="100" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <rect x="76"  y="155" width="130" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <rect x="240" y="112" width="140" height="110" rx="6" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <path d="M460 100 L530 100 M460 115 L530 115 M460 130 L510 130" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" />
      <rect x="460" y="180" width="70" height="100" rx="8" stroke={a} strokeWidth="1" opacity="0.05" />
    </svg>
  ),
  "digital-transformation": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="100" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="280" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="460" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M145 180 L235 180" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M325 180 L415 180" stroke={a} strokeWidth="1" opacity="0.06" />
      <polygon points="230,176 240,180 230,184" fill={a} opacity="0.08" />
      <polygon points="410,176 420,180 410,184" fill={a} opacity="0.08" />
      <path d="M100 90 Q100 50 140 50 Q160 20 200 40"  stroke={a} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.05" />
      <path d="M460 90 Q500 70 510 40"                  stroke={a} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.05" />
      <path d="M340 60 Q370 30 400 50 Q430 20 460 40"   stroke={a} strokeWidth="0.8" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
  "fintech": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="60" y="110" width="240" height="150" rx="14" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <line x1="60" y1="150" x2="300" y2="150" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <rect x="76" y="165" width="50" height="30" rx="5" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <rect x="76" y="205" width="80" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="76" y="220" width="60" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <circle cx="420" cy="160" r="70" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M420 110 L420 130 M420 190 L420 210" stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" />
      <path d="M395 125 Q395 140 420 140 Q445 140 445 155 Q445 170 420 170 Q395 170 395 185 Q395 195 420 195" stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" fill="none" />
      <path d="M360 290 Q380 260 420 270 Q460 260 480 290" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "api": (a) => {
    const pts: [number, number][] = [[80,90],[80,180],[80,270],[240,60],[240,150],[240,240],[400,90],[400,180],[400,270]];
    const links: [number, number][] = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[3,6],[3,7],[4,6],[4,7],[4,8],[5,7],[5,8]];
    return (
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {links.map(([s,t],i) => <line key={i} x1={pts[s][0]} y1={pts[s][1]} x2={pts[t][0]} y2={pts[t][1]} stroke={a} strokeWidth="0.8" opacity="0.05" />)}
        {pts.map(([x,y],i) => <rect key={i} x={x-10} y={y-10} width="20" height="20" rx="4" stroke={a} strokeWidth="1" opacity="0.07" />)}
        <text x="440" y="100" fontFamily="monospace" fontSize="13" fill={a} opacity="0.06">GET /api</text>
        <text x="440" y="125" fontFamily="monospace" fontSize="13" fill={a} opacity="0.05">POST /v2</text>
        <text x="440" y="150" fontFamily="monospace" fontSize="13" fill={a} opacity="0.04">200 OK</text>
      </svg>
    );
  },
  "security": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <path d="M240 30 L340 60 L340 160 Q340 240 240 290 Q140 240 140 160 L140 60 Z" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <path d="M240 60 L305 83 L305 160 Q305 215 240 250 Q175 215 175 160 L175 83 Z" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="240" cy="155" r="25" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M230 155 L237 163 L255 145" stroke={a} strokeWidth="1.5" opacity="0.08" strokeLinecap="round" strokeLinejoin="round" />
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={440 + Math.cos(angle)*50} cy={180 + Math.sin(angle)*50} r="5" stroke={a} strokeWidth="1" opacity="0.05" />;
      })}
      <circle cx="440" cy="180" r="50" stroke={a} strokeWidth="0.6" strokeDasharray="3 6" opacity="0.05" />
    </svg>
  ),
  "qa": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`} x={60 + col*80} y={60 + row*70} width="50" height="40" rx="5"
          stroke={a} strokeWidth="0.8"
          opacity={row===1&&col===2 ? 0.10 : 0.05} />
      )))}
      <polyline points="75,135 88,148 108,128"   stroke={a} strokeWidth="1.5" opacity="0.09" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="155,75 168,88 188,68"     stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="235,205 248,218 268,198"  stroke={a} strokeWidth="1.5" opacity="0.06" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="440" cy="140" r="60" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="440" y1="80"  x2="440" y2="200" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <line x1="380" y1="140" x2="500" y2="140" stroke={a} strokeWidth="0.7" opacity="0.05" />
    </svg>
  ),
  "consulting": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="240" cy="120" r="45" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <path d="M225 100 Q225 85 240 85 Q260 85 260 100 Q260 115 250 120 Q245 123 245 135" stroke={a} strokeWidth="1.5" opacity="0.08" strokeLinecap="round" fill="none" />
      <circle cx="245" cy="145" r="3" fill={a} opacity="0.08" />
      <line x1="240" y1="165" x2="240" y2="200" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="140" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="240" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="340" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <rect x="110" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="210" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="310" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M430 60 L430 160 Q430 180 450 180 L520 180" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" />
      <path d="M440 90 L480 90 M440 110 L470 110 M440 130 L485 130" stroke={a} strokeWidth="0.8" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
};
