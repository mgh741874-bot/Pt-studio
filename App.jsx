import { useState } from "react";

const MEMBERS = [
  { id: 1, name: "이수진", goal: "다이어트", color: "#FF6B6B", sessions: 12, targetSessions: 20, weight: [68, 67.2, 66.8, 65.9, 65.2], diet: true },
  { id: 2, name: "박재원", goal: "벌크업", color: "#4ECDC4", sessions: 8, targetSessions: 16, weight: [72, 72.8, 73.5, 74.1, 74.8], diet: false },
  { id: 3, name: "최아름", goal: "체형교정", color: "#A8E6CF", sessions: 15, targetSessions: 20, weight: [55, 54.8, 54.5, 54.3, 54.1], diet: true },
  { id: 4, name: "김동현", goal: "재활", color: "#FFD93D", sessions: 6, targetSessions: 12, weight: [80, 79.5, 79.2, 78.8, 78.5], diet: false },
  { id: 5, name: "정유나", goal: "벌크업", color: "#C77DFF", sessions: 18, targetSessions: 24, weight: [52, 52.5, 53, 53.4, 53.8], diet: true },
  { id: 6, name: "한민수", goal: "다이어트", color: "#FF9A3C", sessions: 10, targetSessions: 20, weight: [95, 94.2, 93.5, 92.8, 92.1], diet: true },
  { id: 7, name: "오지현", goal: "체력향상", color: "#74B9FF", sessions: 14, targetSessions: 16, weight: [60, 59.8, 59.6, 59.5, 59.3], diet: false },
  { id: 8, name: "강태양", goal: "다이어트", color: "#FD79A8", sessions: 9, targetSessions: 20, weight: [88, 87.1, 86.3, 85.5, 84.8], diet: true },
];

const WORKOUT_DATA = [
  { date: "3/18", 하체: 4, 가슴: 2, 등: 3, 어깨: 1, 코어: 2 },
  { date: "3/19", 하체: 3, 가슴: 4, 등: 2, 어깨: 3, 코어: 1 },
  { date: "3/20", 하체: 5, 가슴: 1, 등: 4, 어깨: 2, 코어: 3 },
  { date: "3/21", 하체: 2, 가슴: 3, 등: 5, 어깨: 4, 코어: 2 },
  { date: "3/22", 하체: 6, 가슴: 2, 등: 3, 어깨: 1, 코어: 4 },
  { date: "3/23", 하체: 4, 가슴: 5, 등: 2, 어깨: 3, 코어: 1 },
  { date: "3/24", 하체: 3, 가슴: 3, 등: 4, 어깨: 2, 코어: 3 },
];

const MENU = [
  { id: "dashboard", label: "대시보드", emoji: "🏠" },
  { id: "members", label: "회원 목록", emoji: "👥" },
  { id: "workout", label: "운동 기록", emoji: "🏋️" },
  { id: "diet", label: "식단 관리", emoji: "🥗" },
  { id: "video", label: "운동 영상", emoji: "🎬" },
  { id: "schedule", label: "수업 일정", emoji: "📅" },
];

const MiniChart = ({ data }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40, w = 120;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return x + "," + y;
  }).join(" ");
  const isDown = data[data.length - 1] < data[0];
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <polyline points={points} fill="none" stroke={isDown ? "#FF6B6B" : "#4ECDC4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return i === data.length - 1 ? <circle key={i} cx={x} cy={y} r="3" fill={isDown ? "#FF6B6B" : "#4ECDC4"}/> : null;
      })}
    </svg>
  );
};
const BarChart = ({ data }) => {
  const categories = ["하체","가슴","등","어깨","코어"];
  const colors = ["#FF6B6B","#4ECDC4","#74B9FF","#FFD93D","#C77DFF"];
  const totals = categories.map(cat => data.reduce((sum, d) => sum + d[cat], 0));
  const max = Math.max(...totals);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:12,height:120,padding:"0 8px"}}>
      {categories.map((cat, i) => (
        <div key={cat} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <span style={{fontSize:11,color:colors[i],fontWeight:700}}>{totals[i]}</span>
          <div style={{width:"100%",height:(totals[i]/max)*90,background:"linear-gradient(180deg,"+colors[i]+","+colors[i]+"88)",borderRadius:"4px 4px 0 0"}}/>
          <span style={{fontSize:10,color:"#888"}}>{cat}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, color, emoji }) => (
  <div style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:16,padding:"20px 16px",display:"flex",flexDirection:"column",gap:8,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-10,right:-10,fontSize:48,opacity:0.08}}>{emoji}</div>
    <span style={{fontSize:12,color:"#666"}}>{label}</span>
    <span style={{fontSize:36,fontWeight:800,color:color,lineHeight:1}}>{value}</span>
    {sub && <span style={{fontSize:11,color:"#555"}}>{sub}</span>}
  </div>
);

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [selectedMember, setSelectedMember] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const totalSessions = MEMBERS.reduce((s, m) => s + m.sessions, 0);
  const dietRate = Math.round((MEMBERS.filter(m => m.diet).length / MEMBERS.length) * 100);

  const Dashboard = () => (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div>
        <h2 style={{margin:0,fontSize:22,fontWeight:800}}>대시보드</h2>
        <p style={{margin:"4px 0 0",color:"#555",fontSize:13}}>{new Date().getFullYear()}년 {new Date().getMonth()+1}월</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <StatCard label="총 회원수" value={MEMBERS.length} sub="이번달 신규 2명" color="#FF6B6B" emoji="👥"/>
        <StatCard label="이번달 수업" value={totalSessions} sub={"목표 160회 " + Math.round(totalSessions/160*100) + "%"} color="#4ECDC4" emoji="🏋️"/>
        <StatCard label="평균 PT 횟수" value={(totalSessions/MEMBERS.length).toFixed(1)} sub="회원당 평균" color="#74B9FF" emoji="📊"/>
        <StatCard label="식단 등록률" value={dietRate+"%"} sub={MEMBERS.filter(m=>m.diet).length+"명 등록 중"} color="#C77DFF" emoji="🥗"/>
      </div>
      <div style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:16,padding:20}}>
        <h3 style={{margin:"0 0 16px",fontSize:14,color:"#888"}}>이번주 부위별 운동 횟수</h3>
        <BarChart data={WORKOUT_DATA}/>
      </div>
      <div style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:16,padding:20}}>
        <h3 style={{margin:"0 0 16px",fontSize:14,color:"#888"}}>수업 진행률</h3>
        {MEMBERS.slice(0,5).map(m => (
          <div key={m.id} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:13}}>{m.name}</span>
              <span style={{fontSize:12,color:"#666"}}>{m.sessions}/{m.targetSessions}회</span>
            </div>
            <div style={{background:"#252525",borderRadius:4,height:6}}>
              <div style={{width:(m.sessions/m.targetSessions*100)+"%",height:"100%",background:m.color,borderRadius:4}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Members = () => (
    <div>
      <h2 style={{margin:"0 0 20px",fontSize:22,fontWeight:800}}>회원 목록</h2>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {MEMBERS.map(m => (
          <div key={m.id} onClick={() => setSelectedMember(selectedMember && selectedMember.id===m.id ? null : m)}
            style={{background:"#1a1a1a",border:"1px solid "+(selectedMember && selectedMember.id===m.id ? m.color : "#2a2a2a"),borderRadius:12,padding:16,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:m.color+"33",border:"2px solid "+m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:m.color}}>{m.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15}}>{m.name}</div>
                <span style={{background:m.color+"22",color:m.color,padding:"2px 8px",borderRadius:20,fontSize:11}}>{m.goal}</span>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:700}}>{m.sessions}회</div>
                <div style={{fontSize:11,color:"#555"}}>/{m.targetSessions}회</div>
              </div>
            </div>
            {selectedMember && selectedMember.id===m.id && (
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #2a2a2a"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                  <div>
                    <div style={{fontSize:11,color:"#666",marginBottom:4}}>체중 변화</div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:20,fontWeight:800}}>{m.weight[m.weight.length-1]}kg</span>
                      <span style={{fontSize:12,color:m.weight[m.weight.length-1]<m.weight[0]?"#FF6B6B":"#4ECDC4"}}>
                        {m.weight[m.weight.length-1]<m.weight[0]?"▼":"▲"} {Math.abs(m.weight[m.weight.length-1]-m.weight[0]).toFixed(1)}kg
                      </span>
                    </div>
                  </div>
                  <MiniChart data={m.weight}/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(active) {
      case "dashboard": return <Dashboard/>;
      case "members": return <Members/>;
      default: return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,color:"#444"}}>
          <div style={{fontSize:48,marginBottom:16}}>🚧</div>
          <div style={{fontSize:16}}>준비 중이에요</div>
        </div>
      );
    }
  };

  return (
    <div style={{display:"flex",height:"100vh",background:"#0f0f0f",color:"#f0f0f0",fontFamily:"sans-serif",overflow:"hidden"}}>
      <div style={{width:sidebarOpen?220:60,background:"#141414",borderRight:"1px solid #1e1e1e",display:"flex",flexDirection:"column",transition:"width 0.3s",overflow:"hidden",flexShrink:0}}>
        <div style={{padding:"20px 16px",borderBottom:"1px solid #1e1e1e"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#FF6B6B,#FF9A3C)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💪</div>
            {sidebarOpen && <div><div style={{fontSize:13,fontWeight:800}}>PT 스튜디오</div><div style={{fontSize:10,color:"#555"}}>트레이너 관리</div></div>}
          </div>
        </div>
        <div style={{padding:"8px"}}>
          {MENU.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px",background:active===m.id?"#FF6B6B22":"none",border:"none",borderLeft:active===m.id?"3px solid #FF6B6B":"3px solid transparent",color:active===m.id?"#FF6B6B":"#666",cursor:"pointer",fontSize:13,fontWeight:active===m.id?700:400,textAlign:"left"}}>
              <span style={{fontSize:16,flexShrink:0}}>{m.emoji}</span>
              {sidebarOpen && m.label}
            </button>
          ))}
        </div>
        {sidebarOpen && (
          <div style={{padding:"8px",flex:1,overflowY:"auto"}}>
            <div style={{fontSize:10,color:"#444",padding:"4px 8px 8px"}}>내 회원</div>
            {MEMBERS.map(m => (
              <button key={m.id} onClick={() => {setActive("members");setSelectedMember(m);}} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:12,borderRadius:6,textAlign:"left"}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:m.color+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:m.color,flexShrink:0}}>{m.name[0]}</div>
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name} · {m.goal}</span>
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{margin:8,padding:10,background:"#1e1e1e",border:"none",borderRadius:8,color:"#555",cursor:"pointer",fontSize:14}}>
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:24}}>{renderContent()}</div>
    </div>
  );
}
