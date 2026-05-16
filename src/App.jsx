import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Calendar, Check, ChevronRight, ChevronLeft, Trash2 } from "lucide-react";

// ====== 운동 프로그램 데이터 ======
const PROGRAM = {
  push: {
    name: "PUSH",
    subtitle: "Chest · Shoulders · Triceps",
    subtitleKo: "가슴 · 어깨 · 삼두",
    chapter: "I",
    day: "MON",
    dayKo: "월요일",
    groups: [
      {
        muscle: "Chest",
        muscleKo: "가슴",
        exercises: [
          { id: "bench", name: "Barbell Bench Press", nameKo: "바벨 벤치프레스", sets: 4, reps: "6-8", rpe: "7-8", rest: "2-3분", type: "compound" },
          { id: "incline_db", name: "Incline DB Press", nameKo: "인클라인 덤벨 프레스", sets: 4, reps: "8-10", rpe: "8", rest: "2분", type: "compound" },
          { id: "cable_fly", name: "Cable Fly", nameKo: "케이블 플라이", sets: 4, reps: "10-12", rpe: "8-9", rest: "90초", type: "isolation" },
        ],
      },
      {
        muscle: "Shoulders",
        muscleKo: "어깨",
        exercises: [
          { id: "ohp", name: "Overhead Press", nameKo: "오버헤드 프레스", sets: 4, reps: "6-8", rpe: "7-8", rest: "2-3분", type: "compound" },
          { id: "lat_raise", name: "Lateral Raise", nameKo: "사이드 래터럴 레이즈", sets: 4, reps: "12-15", rpe: "8-9", rest: "60-90초", type: "isolation" },
          { id: "cable_lat", name: "Cable Lateral Raise", nameKo: "케이블 측면 레이즈", sets: 4, reps: "12-15", rpe: "9", rest: "60초", type: "isolation" },
        ],
      },
      {
        muscle: "Triceps",
        muscleKo: "삼두",
        exercises: [
          { id: "close_bench", name: "Close Grip Bench", nameKo: "클로즈 그립 벤치", sets: 4, reps: "8-10", rpe: "7-8", rest: "2분", type: "compound" },
          { id: "pushdown", name: "Cable Pushdown", nameKo: "케이블 푸시다운", sets: 4, reps: "10-12", rpe: "8", rest: "90초", type: "isolation" },
          { id: "oh_ext", name: "Overhead Extension", nameKo: "오버헤드 익스텐션", sets: 4, reps: "10-12", rpe: "8-9", rest: "90초", type: "isolation" },
        ],
      },
    ],
  },
  pull: {
    name: "PULL",
    subtitle: "Back · Biceps · Rear Delts",
    subtitleKo: "등 · 이두 · 후면",
    chapter: "II",
    day: "WED",
    dayKo: "수요일",
    groups: [
      {
        muscle: "Lats",
        muscleKo: "광배",
        exercises: [
          { id: "pullup", name: "Pull-Up / Lat Pulldown", nameKo: "풀업 / 랫풀다운", sets: 4, reps: "6-10", rpe: "7-8", rest: "2-3분", type: "compound" },
          { id: "barbell_row", name: "Barbell Row", nameKo: "바벨 로우", sets: 4, reps: "8-10", rpe: "8", rest: "2분", type: "compound" },
          { id: "cable_row", name: "Seated Cable Row", nameKo: "시티드 케이블 로우", sets: 4, reps: "10-12", rpe: "8-9", rest: "90초", type: "compound" },
        ],
      },
      {
        muscle: "Upper Back",
        muscleKo: "등 상부",
        exercises: [
          { id: "deadlift", name: "Deadlift", nameKo: "데드리프트", sets: 4, reps: "5-6", rpe: "7-8", rest: "3분", type: "compound" },
          { id: "chest_row", name: "Chest Supported Row", nameKo: "체스트 서포티드 로우", sets: 4, reps: "10-12", rpe: "8", rest: "90초", type: "compound" },
          { id: "facepull", name: "Face Pull", nameKo: "페이스풀", sets: 4, reps: "12-15", rpe: "8-9", rest: "60초", type: "isolation" },
        ],
      },
      {
        muscle: "Biceps",
        muscleKo: "이두",
        exercises: [
          { id: "barbell_curl", name: "Barbell Curl", nameKo: "바벨 컬", sets: 4, reps: "8-10", rpe: "8", rest: "90초", type: "isolation" },
          { id: "incline_curl", name: "Incline DB Curl", nameKo: "인클라인 덤벨 컬", sets: 4, reps: "10-12", rpe: "8-9", rest: "90초", type: "isolation" },
          { id: "hammer_curl", name: "Hammer Curl", nameKo: "해머 컬", sets: 4, reps: "10-12", rpe: "9", rest: "60-90초", type: "isolation" },
        ],
      },
    ],
  },
  legs: {
    name: "LEGS",
    subtitle: "Quads · Hamstrings · Core",
    subtitleKo: "하체 · 코어",
    chapter: "III",
    day: "FRI",
    dayKo: "금요일",
    groups: [
      {
        muscle: "Quadriceps",
        muscleKo: "대퇴사두",
        exercises: [
          { id: "squat", name: "Back Squat", nameKo: "바벨 백스쿼트", sets: 4, reps: "6-8", rpe: "7-8", rest: "2-3분", type: "compound" },
          { id: "leg_press", name: "Leg Press", nameKo: "레그 프레스", sets: 4, reps: "10-12", rpe: "8", rest: "2분", type: "compound" },
          { id: "leg_ext", name: "Leg Extension", nameKo: "레그 익스텐션", sets: 4, reps: "12-15", rpe: "9", rest: "90초", type: "isolation" },
        ],
      },
      {
        muscle: "Hamstrings",
        muscleKo: "햄스트링·둔근",
        exercises: [
          { id: "rdl", name: "Romanian Deadlift", nameKo: "루마니안 데드리프트", sets: 4, reps: "8-10", rpe: "7-8", rest: "2-3분", type: "compound" },
          { id: "leg_curl", name: "Leg Curl", nameKo: "레그 컬", sets: 4, reps: "10-12", rpe: "8-9", rest: "90초", type: "isolation" },
          { id: "hip_thrust", name: "Hip Thrust", nameKo: "힙 쓰러스트", sets: 4, reps: "8-12", rpe: "8", rest: "2분", type: "compound" },
        ],
      },
      {
        muscle: "Calves & Core",
        muscleKo: "종아리·코어",
        exercises: [
          { id: "calf_stand", name: "Standing Calf Raise", nameKo: "스탠딩 카프 레이즈", sets: 4, reps: "12-15", rpe: "9", rest: "60초", type: "isolation" },
          { id: "calf_seat", name: "Seated Calf Raise", nameKo: "시티드 카프 레이즈", sets: 4, reps: "15-20", rpe: "9", rest: "60초", type: "isolation" },
          { id: "leg_raise", name: "Hanging Leg Raise", nameKo: "행잉 레그 레이즈", sets: 4, reps: "12-15", rpe: "8-9", rest: "60초", type: "isolation" },
        ],
      },
    ],
  },
};

// ====== 단위 변환 ======
const LBS_PER_KG = 2.20462;

// 저장은 항상 kg. 표시할 때만 환산.
function toDisplay(kg, unit) {
  if (kg === null || kg === undefined || kg === "") return "";
  const num = parseFloat(kg);
  if (isNaN(num)) return "";
  if (unit === "lb") {
    return Math.round(num * LBS_PER_KG * 10) / 10; // 소수점 1자리
  }
  return num;
}

// 입력값을 kg로 변환해 저장
function toKg(value, unit) {
  if (value === null || value === undefined || value === "") return "";
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  if (unit === "lb") {
    return Math.round((num / LBS_PER_KG) * 100) / 100; // 소수점 2자리
  }
  return num;
}

function unitLabel(unit) {
  return unit === "lb" ? "lb" : "kg";
}

// 신체 체중 환산 (BMI 계산은 항상 kg 기준)
function bodyWeightDisplay(kg, unit) {
  const v = toDisplay(kg, unit);
  return v === "" ? "—" : v;
}

// ====== 점진적 과부하 알고리즘 ======
function getProgressionSuggestion(history, exercise, unit = "kg") {
  if (!history || history.length === 0) {
    return { type: "start", message: "Begin your record", messageKo: "첫 기록을 시작하세요", suggestedWeight: null };
  }
  const last = history[history.length - 1];
  if (!last.sets || last.sets.length === 0) {
    return { type: "continue", message: "Continue", messageKo: "기록을 이어가세요", suggestedWeight: null };
  }

  const repRange = exercise.reps.split("-").map(n => parseInt(n));
  const repMax = repRange[1] || repRange[0];
  const repMin = repRange[0];

  // 저장은 kg, 표시는 unit 기준
  const lastWeightKg = parseFloat(last.sets[0].weight) || 0;
  const allHitMax = last.sets.every(s => parseInt(s.reps) >= repMax);
  const allHitMin = last.sets.every(s => parseInt(s.reps) >= repMin);
  const failedMin = last.sets.some(s => parseInt(s.reps) < repMin);

  // 증량 단위: kg는 컴파운드 +2.5/아이솔레이션 +1.25
  //          lb는 컴파운드 +5/아이솔레이션 +2.5
  let incrementDisplay, incrementKg;
  if (unit === "lb") {
    incrementDisplay = exercise.type === "compound" ? 5 : 2.5;
    incrementKg = incrementDisplay / LBS_PER_KG;
  } else {
    incrementDisplay = exercise.type === "compound" ? 2.5 : 1.25;
    incrementKg = incrementDisplay;
  }

  const u = unitLabel(unit);
  const prevDisplay = toDisplay(lastWeightKg, unit);

  if (allHitMax) {
    const next = lastWeightKg + incrementKg;
    return {
      type: "increase",
      message: `All sets cleared. Add ${incrementDisplay}${u}`,
      messageKo: `모든 세트 상한 달성 · +${incrementDisplay}${u}`,
      suggestedWeight: next,
      suggestedWeightDisplay: toDisplay(next, unit),
      previousWeight: lastWeightKg,
      previousWeightDisplay: prevDisplay,
    };
  } else if (failedMin) {
    const next = Math.max(0, lastWeightKg - incrementKg);
    return {
      type: "deload",
      message: `Below target. Reduce ${incrementDisplay}${u}`,
      messageKo: `최소 횟수 미달 · -${incrementDisplay}${u}`,
      suggestedWeight: next,
      suggestedWeightDisplay: toDisplay(next, unit),
      previousWeight: lastWeightKg,
      previousWeightDisplay: prevDisplay,
    };
  } else if (allHitMin) {
    return {
      type: "maintain",
      message: `Maintain weight, add reps`,
      messageKo: `같은 무게 유지 · 반복수 증가`,
      suggestedWeight: lastWeightKg,
      suggestedWeightDisplay: prevDisplay,
      previousWeight: lastWeightKg,
      previousWeightDisplay: prevDisplay,
    };
  }
  return {
    type: "maintain",
    message: `Maintain`,
    messageKo: `같은 무게로 진행`,
    suggestedWeight: lastWeightKg,
    suggestedWeightDisplay: prevDisplay,
    previousWeight: lastWeightKg,
    previousWeightDisplay: prevDisplay,
  };
}

// ====== 카카오 스타일 디자인 토큰 ======
const COLOR = {
  bg: "#FFFFFF",
  bgSub: "#F7F8FA",
  bgGray: "#F0F0F0",
  yellow: "#FEE500",
  yellowDeep: "#F0D800",
  yellowSoft: "rgba(254,229,0,0.15)",
  text: "#191919",
  textSub: "#555555",
  textMute: "#9E9E9E",
  textLight: "#C4C4C4",
  line: "#EBEBEB",
  white: "#FFFFFF",
  green: "#4CAF50",
  red: "#E53935",
  shadow: "0 2px 12px rgba(0,0,0,0.07)",
  shadowMd: "0 4px 20px rgba(0,0,0,0.10)",
  shadowYellow: "0 4px 16px rgba(254,229,0,0.45)",
};

// ====== 글로벌 CSS ======
const globalCSS = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0.85; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes slideInLeft {
    from { transform: translateX(-40%); opacity: 0.7; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.45; }
  }
  input::placeholder { color: #C4C4C4; }
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

// ====== 메인 앱 ======
export default function App() {
  const [view, setView] = useState("home");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [history, setHistory] = useState({});
  const [bodyStats, setBodyStats] = useState({ weight: "", height: "" });
  const [unit, setUnit] = useState("kg"); // "kg" | "lb"
  const [loading, setLoading] = useState(true);
  const [showInstallHint, setShowInstallHint] = useState(false);
  // 사용자가 편집 가능한 프로그램 데이터 (localStorage에 영속 저장)
  const [program, setProgram] = useState(PROGRAM);
  const [workoutComments, setWorkoutComments] = useState([]);
  // 네비게이션 전환 방향 상태
  const [navDir, setNavDir] = useState("forward"); // "forward" | "back"

  useEffect(() => {
    async function load() {
      try {
        const h = localStorage.getItem("workout_history_v2");
        if (h) setHistory(JSON.parse(h));
      } catch (e) {}
      try {
        const b = localStorage.getItem("body_stats_v2");
        if (b) setBodyStats(JSON.parse(b));
      } catch (e) {}
      try {
        const u = localStorage.getItem("unit_pref");
        if (u === "kg" || u === "lb") setUnit(u);
      } catch (e) {}
      try {
        const p = localStorage.getItem("program_v1");
        if (p) setProgram(JSON.parse(p));
      } catch (e) {}
      try {
        const c = localStorage.getItem("workout_comments_v1");
        if (c) setWorkoutComments(JSON.parse(c));
      } catch (e) {}
      setLoading(false);
    }
    load();

    // iOS Safari에서 PWA로 실행되지 않은 경우 홈화면 추가 안내 표시
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("install_hint_dismissed");
    if (isIOS && !isStandalone && !dismissed) {
      setTimeout(() => setShowInstallHint(true), 1500);
    }
  }, []);

  const dismissInstallHint = () => {
    setShowInstallHint(false);
    localStorage.setItem("install_hint_dismissed", "1");
  };

  const saveHistory = async (newHistory) => {
    setHistory(newHistory);
    try { localStorage.setItem("workout_history_v2", JSON.stringify(newHistory)); } catch (e) {}
  };

  const saveBodyStats = async (newStats) => {
    setBodyStats(newStats);
    try { localStorage.setItem("body_stats_v2", JSON.stringify(newStats)); } catch (e) {}
  };

  const saveUnit = (newUnit) => {
    setUnit(newUnit);
    try { localStorage.setItem("unit_pref", newUnit); } catch (e) {}
  };

  const saveProgram = (newProgram) => {
    setProgram(newProgram);
    try { localStorage.setItem("program_v1", JSON.stringify(newProgram)); } catch (e) {}
  };

  // 운동 후 코멘트 저장
  const saveWorkoutComment = (dayKey, comment) => {
    const entry = { date: new Date().toISOString(), dayKey, dayName: program[dayKey]?.name ?? dayKey, comment };
    const updated = [...workoutComments, entry];
    setWorkoutComments(updated);
    try { localStorage.setItem("workout_comments_v1", JSON.stringify(updated)); } catch (e) {}
  };

  const today = new Date();
  const dayOfWeek = today.getDay();
  const recommendedDay =
    dayOfWeek === 1 ? "push" :
    dayOfWeek === 3 ? "pull" :
    dayOfWeek === 5 ? "legs" : null;

  const totalSessions = Object.values(history).reduce((sum, sessions) => sum + sessions.length, 0);
  const totalVolume = Object.values(history).reduce((sum, sessions) => {
    return sum + sessions.reduce((s, sess) => {
      return s + (sess.sets || []).reduce((ss, set) => ss + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0), 0);
    }, 0);
  }, 0);

  const recentWeek = new Set();
  Object.values(history).forEach(sessions => {
    sessions.forEach(s => {
      const sessDate = new Date(s.date);
      const diff = (today - sessDate) / (1000 * 60 * 60 * 24);
      if (diff <= 7) recentWeek.add(sessDate.toDateString());
    });
  });

  // 화면 전환 헬퍼: 방향 설정 후 뷰 변경
  const navigateTo = (nextView, dir = "forward") => {
    setNavDir(dir);
    setView(nextView);
  };

  // 뷰별 애니메이션 스타일
  const getViewAnimation = () => {
    if (navDir === "forward") return "slideInRight 0.28s cubic-bezier(0.25,0.46,0.45,0.94)";
    return "slideInLeft 0.25s cubic-bezier(0.25,0.46,0.45,0.94)";
  };

  if (loading) {
    return (
      <div style={kkStyles.loadingScreen}>
        <style>{globalCSS}</style>
        <div style={kkStyles.loadingSpinner}>●</div>
        <div style={kkStyles.loadingText}>ATELIER</div>
      </div>
    );
  }

  return (
    <div style={kkStyles.appRoot}>
      <style>{globalCSS}</style>

      {showInstallHint && <InstallHint onDismiss={dismissInstallHint} />}

      {view === "home" && (
        <HomeView
          recommendedDay={recommendedDay}
          totalSessions={totalSessions}
          totalVolume={totalVolume}
          weekDays={recentWeek.size}
          bodyStats={bodyStats}
          unit={unit}
          workoutComments={workoutComments}
          onSelectDay={(d) => {
            setSelectedDay(d);
            navigateTo("workout", "forward");
          }}
          onUpdateStats={saveBodyStats}
          viewAnimation={getViewAnimation()}
        />
      )}

      {view === "workout" && selectedDay && (
        <WorkoutView
          dayKey={selectedDay}
          day={program[selectedDay]}
          program={program}
          onUpdateProgram={saveProgram}
          history={history}
          unit={unit}
          onSaveComment={(comment) => saveWorkoutComment(selectedDay, comment)}
          onBack={() => navigateTo("home", "back")}
          onSelectExercise={(ex) => {
            setSelectedExercise(ex);
            navigateTo("exercise", "forward");
          }}
          viewAnimation={getViewAnimation()}
        />
      )}

      {view === "exercise" && selectedExercise && (
        <ExerciseView
          exercise={selectedExercise}
          dayKey={selectedDay}
          day={program[selectedDay]}
          history={history[selectedExercise.id] || []}
          unit={unit}
          onUpdateUnit={saveUnit}
          onBack={() => navigateTo("workout", "back")}
          onSave={(session) => {
            const newHistory = { ...history };
            if (!newHistory[selectedExercise.id]) newHistory[selectedExercise.id] = [];
            newHistory[selectedExercise.id] = [...newHistory[selectedExercise.id], session];
            saveHistory(newHistory);
            navigateTo("workout", "back");
          }}
          onDelete={(idx) => {
            const newHistory = { ...history };
            newHistory[selectedExercise.id] = newHistory[selectedExercise.id].filter((_, i) => i !== idx);
            saveHistory(newHistory);
          }}
          viewAnimation={getViewAnimation()}
        />
      )}
    </div>
  );
}

// ====== iOS 홈화면 추가 안내 ======
function InstallHint({ onDismiss }) {
  return (
    <div style={kkStyles.installHint}>
      <div style={kkStyles.installHintInner}>
        <div style={kkStyles.installHintHeader}>
          <span style={kkStyles.installHintTitle}>홈화면에 추가하기</span>
          <button style={kkStyles.installHintClose} onClick={onDismiss}>×</button>
        </div>
        <div style={kkStyles.installHintBody}>
          정식 앱처럼 사용하려면 사파리 하단의{" "}
          <span style={{ color: COLOR.yellow, fontWeight: 700 }}>⬆︎</span>{" "}
          공유 버튼을 눌러서 <strong style={{ color: COLOR.text }}>홈 화면에 추가</strong>를 선택하세요.
        </div>
      </div>
    </div>
  );
}

// ====== 단위 토글 버튼 ======
function UnitToggle({ unit, onChange }) {
  return (
    <div style={kkStyles.unitToggle}>
      <button
        style={{ ...kkStyles.unitToggleBtn, ...(unit === "kg" ? kkStyles.unitToggleBtnActive : {}) }}
        onClick={() => onChange("kg")}
      >
        KG
      </button>
      <button
        style={{ ...kkStyles.unitToggleBtn, ...(unit === "lb" ? kkStyles.unitToggleBtnActive : {}) }}
        onClick={() => onChange("lb")}
      >
        LB
      </button>
    </div>
  );
}

// ====== 홈 화면 ======
function HomeView({ recommendedDay, totalSessions, totalVolume, weekDays, bodyStats, unit, workoutComments, onSelectDay, onUpdateStats, viewAnimation }) {
  // 하단 탭 상태: "today" | "split" | "stats"
  const [homeTab, setHomeTab] = useState("today");
  const [editStats, setEditStats] = useState(false);
  const [tempWeight, setTempWeight] = useState(bodyStats.weight || "");
  const [tempHeight, setTempHeight] = useState(bodyStats.height || "");

  // 편집 모드 진입 시 동기화
  useEffect(() => {
    if (editStats) {
      setTempWeight(bodyStats.weight || "");
      setTempHeight(bodyStats.height || "");
    }
  }, [editStats, bodyStats]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });

  const handleSaveStats = () => {
    onUpdateStats({ weight: tempWeight, height: tempHeight });
    setEditStats(false);
  };

  // BMI는 항상 kg/m² 기준
  const bmi = bodyStats.weight && bodyStats.height
    ? (parseFloat(bodyStats.weight) / Math.pow(parseFloat(bodyStats.height) / 100, 2)).toFixed(1)
    : "—";

  return (
    <div style={{ ...kkStyles.pageContainer, animation: viewAnimation }}>
      {/* 상단 헤더 */}
      <div style={kkStyles.kkHeader}>
        <div style={kkStyles.kkHeaderLeft}>
          <div style={kkStyles.kkLogo}>아틀리에</div>
          <div style={kkStyles.kkLogoSub}>ATELIER</div>
        </div>
        <div style={kkStyles.kkHeaderDate}>{dateStr}</div>
      </div>

      {/* 탭 콘텐츠 영역 */}
      <div style={kkStyles.tabContent}>

        {/* ===== 오늘 탭 ===== */}
        {homeTab === "today" && (
          <div style={{ animation: "fadeIn 0.22s ease" }}>
            {/* 오늘의 추천 운동 히어로 카드 */}
            {recommendedDay ? (
              <div
                style={kkStyles.todayHeroCard}
                onClick={() => onSelectDay(recommendedDay)}
              >
                <div style={kkStyles.todayHeroBadge}>오늘의 운동</div>
                <div style={kkStyles.todayHeroName}>{PROGRAM[recommendedDay].name}</div>
                <div style={kkStyles.todayHeroSub}>{PROGRAM[recommendedDay].subtitleKo}</div>
                <div style={kkStyles.todayHeroCta}>시작하기 →</div>
              </div>
            ) : (
              /* 오늘 추천 운동 없을 때 */
              <div style={kkStyles.restDayCard}>
                <div style={kkStyles.restDayEmoji}>🌙</div>
                <div style={kkStyles.restDayTitle}>오늘은 쉬는 날이에요</div>
                <div style={kkStyles.restDaySub}>월·수·금에 운동을 기록하세요</div>
              </div>
            )}

            {/* 요약 통계 카드 3개 */}
            <div style={kkStyles.statCardRow}>
              <div style={kkStyles.statCard}>
                <div style={kkStyles.statCardValue}>{weekDays}</div>
                <div style={kkStyles.statCardUnit}>/ 7일</div>
                <div style={kkStyles.statCardLabel}>이번 주</div>
              </div>
              <div style={kkStyles.statCard}>
                <div style={kkStyles.statCardValue}>{totalSessions}</div>
                <div style={kkStyles.statCardUnit}>회</div>
                <div style={kkStyles.statCardLabel}>총 세션</div>
              </div>
              <div style={kkStyles.statCard}>
                <div style={kkStyles.statCardValue}>{(totalVolume / 1000).toFixed(1)}</div>
                <div style={kkStyles.statCardUnit}>ton</div>
                <div style={kkStyles.statCardLabel}>총 볼륨</div>
              </div>
            </div>

            {/* 주간 코멘트 분석 */}
            {(() => {
              const analysis = analyzeComments(workoutComments);
              const lastWeek = workoutComments.filter(c => (Date.now() - new Date(c.date)) / 86400000 <= 7);
              if (lastWeek.length === 0) return null;
              const analysisColor = { warning: "#E53935", caution: "#F57C00", positive: COLOR.green, neutral: COLOR.textSub };
              return (
                <div style={kkStyles.weeklyCard}>
                  <div style={kkStyles.weeklyCardHeader}>
                    <div style={kkStyles.weeklyCardTitle}>지난 7일 분석</div>
                    <div style={kkStyles.weeklyCardCount}>{lastWeek.length}개 기록</div>
                  </div>
                  {analysis && (
                    <div style={{ ...kkStyles.analysisMsg, color: analysisColor[analysis.type] }}>
                      {analysis.text}
                    </div>
                  )}
                  <div style={kkStyles.weeklyCommentList}>
                    {[...lastWeek].reverse().map((c, i) => (
                      <div key={i} style={kkStyles.weeklyCommentItem}>
                        <div style={kkStyles.weeklyCommentMeta}>
                          <span style={kkStyles.weeklyCommentDay}>{c.dayName}</span>
                          <span style={kkStyles.weeklyCommentDate}>
                            {new Date(c.date).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
                          </span>
                        </div>
                        <div style={kkStyles.weeklyCommentText}>{c.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ===== 루틴 탭 ===== */}
        {homeTab === "split" && (
          <div style={{ animation: "fadeIn 0.22s ease" }}>
            <div style={kkStyles.sectionTitle}>3일 분할 루틴</div>
            {Object.entries(PROGRAM).map(([key, day]) => (
              <div key={key} style={kkStyles.splitCard} onClick={() => onSelectDay(key)}>
                <div style={kkStyles.splitCardLeft}>
                  <div style={kkStyles.splitCardChapter}>{day.chapter}</div>
                  <div style={kkStyles.splitCardName}>{day.name}</div>
                  <div style={kkStyles.splitCardSub}>{day.subtitleKo}</div>
                </div>
                <div style={kkStyles.splitCardDay}>{day.day}</div>
                <ChevronRight size={18} color={COLOR.textLight} />
              </div>
            ))}
          </div>
        )}

        {/* ===== 신체 탭 ===== */}
        {homeTab === "stats" && (
          <div style={{ animation: "fadeIn 0.22s ease" }}>
            <div style={kkStyles.sectionTitle}>신체 기록</div>
            <div style={kkStyles.bodyCard}>
              {/* 헤더 */}
              <div style={kkStyles.bodyCardHeader}>
                <div style={kkStyles.bodyCardTitle}>내 신체 정보</div>
                <button
                  style={kkStyles.bodyEditBtn}
                  onClick={() => setEditStats(!editStats)}
                >
                  {editStats ? "취소" : "편집"}
                </button>
              </div>

              {editStats ? (
                /* 편집 모드 */
                <div style={kkStyles.bodyEditSection}>
                  <div style={kkStyles.bodyInputRow}>
                    <div style={kkStyles.bodyInputWrap}>
                      <label style={kkStyles.bodyInputLabel}>체중 (kg)</label>
                      <input
                        type="number"
                        value={tempWeight}
                        onChange={(e) => setTempWeight(e.target.value)}
                        style={kkStyles.bodyInput}
                        placeholder="예: 70"
                        inputMode="decimal"
                      />
                    </div>
                    <div style={kkStyles.bodyInputWrap}>
                      <label style={kkStyles.bodyInputLabel}>키 (cm)</label>
                      <input
                        type="number"
                        value={tempHeight}
                        onChange={(e) => setTempHeight(e.target.value)}
                        style={kkStyles.bodyInput}
                        placeholder="예: 175"
                        inputMode="decimal"
                      />
                    </div>
                  </div>
                  <button style={kkStyles.bodySaveBtn} onClick={handleSaveStats}>
                    저장하기
                  </button>
                </div>
              ) : (
                /* 표시 모드 */
                <div style={kkStyles.bodyStatGrid}>
                  <div style={kkStyles.bodyStatCell}>
                    <div style={kkStyles.bodyStatValue}>{bodyStats.weight || "—"}</div>
                    <div style={kkStyles.bodyStatUnit}>kg</div>
                    <div style={kkStyles.bodyStatLabel}>체중</div>
                  </div>
                  <div style={kkStyles.bodyStatDivider} />
                  <div style={kkStyles.bodyStatCell}>
                    <div style={kkStyles.bodyStatValue}>{bodyStats.height || "—"}</div>
                    <div style={kkStyles.bodyStatUnit}>cm</div>
                    <div style={kkStyles.bodyStatLabel}>키</div>
                  </div>
                  <div style={kkStyles.bodyStatDivider} />
                  <div style={kkStyles.bodyStatCell}>
                    <div style={kkStyles.bodyStatValue}>{bmi}</div>
                    <div style={kkStyles.bodyStatUnit}>BMI</div>
                    <div style={kkStyles.bodyStatLabel}>체질량지수</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 하단 고정 탭바 */}
      <div style={kkStyles.tabBar}>
        <button
          style={{ ...kkStyles.tabBarBtn, ...(homeTab === "today" ? kkStyles.tabBarBtnActive : {}) }}
          onClick={() => setHomeTab("today")}
        >
          <span style={kkStyles.tabBarLabel}>오늘</span>
        </button>
        <button
          style={{ ...kkStyles.tabBarBtn, ...(homeTab === "split" ? kkStyles.tabBarBtnActive : {}) }}
          onClick={() => setHomeTab("split")}
        >
          <span style={kkStyles.tabBarLabel}>루틴</span>
        </button>
        <button
          style={{ ...kkStyles.tabBarBtn, ...(homeTab === "stats" ? kkStyles.tabBarBtnActive : {}) }}
          onClick={() => setHomeTab("stats")}
        >
          <span style={kkStyles.tabBarLabel}>신체</span>
        </button>
      </div>
    </div>
  );
}

// ====== 운동 일자 화면 ======
function WorkoutView({ dayKey, day, program, onUpdateProgram, history, unit, onSaveComment, onBack, onSelectExercise, viewAnimation }) {
  const [editTarget, setEditTarget] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const longPressTimer = useRef(null);
  const longPressActive = useRef(false);

  const totalExercises = day.groups.reduce((s, g) => s + g.exercises.length, 0);
  const completedToday = day.groups.reduce((s, g) => {
    return s + g.exercises.filter(ex => {
      const sessions = history[ex.id] || [];
      const last = sessions[sessions.length - 1];
      if (!last) return false;
      return new Date(last.date).toDateString() === new Date().toDateString();
    }).length;
  }, 0);

  const progressPct = totalExercises > 0 ? (completedToday / totalExercises) * 100 : 0;

  // 롱프레스 시작 (500ms)
  const startLongPress = (groupIdx, exerciseIdx) => {
    longPressActive.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressActive.current = true;
      setEditTarget({ groupIdx, exerciseIdx });
    }, 500);
  };

  // 롱프레스 취소
  const cancelLongPress = () => {
    clearTimeout(longPressTimer.current);
  };

  // 운동 저장 (수정 또는 추가)
  const handleSaveExercise = (groupIdx, exerciseIdx, updated) => {
    const newProgram = JSON.parse(JSON.stringify(program));
    if (exerciseIdx === null) {
      newProgram[dayKey].groups[groupIdx].exercises.push(updated);
    } else {
      newProgram[dayKey].groups[groupIdx].exercises[exerciseIdx] = updated;
    }
    onUpdateProgram(newProgram);
    setEditTarget(null);
  };

  // 운동 삭제
  const handleDeleteExercise = (groupIdx, exerciseIdx) => {
    const newProgram = JSON.parse(JSON.stringify(program));
    newProgram[dayKey].groups[groupIdx].exercises.splice(exerciseIdx, 1);
    onUpdateProgram(newProgram);
    setEditTarget(null);
  };

  return (
    <div style={{ ...kkStyles.workoutPage, animation: viewAnimation }}>
      {/* 상단 헤더 */}
      <div style={kkStyles.kkWorkoutHeader}>
        <button style={kkStyles.kkBackBtn} onClick={onBack}>
          <ChevronLeft size={22} color={COLOR.text} />
        </button>
        <div style={kkStyles.kkWorkoutTitle}>{day.name}</div>
        <div style={{ width: 40 }} />
      </div>

      {/* 진행률 바 */}
      <div style={kkStyles.progressBarTrack}>
        <div style={{ ...kkStyles.progressBarFill, width: `${progressPct}%` }} />
      </div>

      {/* 운동 목록 */}
      <div style={kkStyles.workoutContent}>
        {/* 운동 이름 서브헤더 */}
        <div style={kkStyles.workoutSubHeader}>
          <div style={kkStyles.workoutSubTitle}>{day.subtitleKo}</div>
          <div style={kkStyles.workoutProgress}>{completedToday}/{totalExercises} 완료</div>
        </div>

        {day.groups.map((group, gi) => (
          <div key={gi} style={kkStyles.kkMuscleSection}>
            {/* 근육 그룹 헤더 */}
            <div style={kkStyles.kkMuscleSectionHeader}>
              <div style={kkStyles.kkMuscleSectionTitle}>{group.muscleKo}</div>
              <div style={kkStyles.kkMuscleSectionSub}>{group.muscle}</div>
            </div>

            {/* 운동 카드 목록 */}
            {group.exercises.map((ex, ei) => {
              const sessions = history[ex.id] || [];
              const last = sessions[sessions.length - 1];
              const isToday = last && new Date(last.date).toDateString() === new Date().toDateString();
              const suggestion = getProgressionSuggestion(sessions, ex, unit);

              return (
                <div
                  key={ex.id}
                  style={{
                    ...kkStyles.kkExCard,
                    ...(isToday ? kkStyles.kkExCardDone : {}),
                  }}
                  onTouchStart={() => startLongPress(gi, ei)}
                  onTouchEnd={cancelLongPress}
                  onTouchMove={cancelLongPress}
                  onClick={() => {
                    if (longPressActive.current) {
                      longPressActive.current = false;
                      return;
                    }
                    onSelectExercise(ex);
                  }}
                >
                  {/* 왼쪽: 번호 */}
                  <div style={kkStyles.kkExCardLeft}>
                    <div style={kkStyles.kkExCardIdx}>{ei + 1}</div>
                  </div>

                  {/* 중앙: 운동 정보 */}
                  <div style={kkStyles.kkExCardMain}>
                    <div style={kkStyles.kkExCardName}>{ex.nameKo}</div>
                    <div style={kkStyles.kkExCardNameEn}>{ex.name}</div>
                    <div style={kkStyles.kkExCardPills}>
                      <span style={kkStyles.kkPill}>{ex.sets}×{ex.reps}</span>
                      <span style={kkStyles.kkPill}>RPE {ex.rpe}</span>
                      <span style={kkStyles.kkPill}>{ex.rest}</span>
                    </div>
                    {/* 점진적 과부하 제안 표시 */}
                    {suggestion.suggestedWeight !== null && !isToday && (
                      <div style={kkStyles.kkExCardSuggestion}>
                        <TrendingUp size={11} color={COLOR.yellow} />
                        <span>NEXT · {suggestion.suggestedWeightDisplay}{unitLabel(unit)}</span>
                        {suggestion.type === "increase" && <span style={{ color: COLOR.green }}>↑</span>}
                      </div>
                    )}
                  </div>

                  {/* 오른쪽: 완료/이동 아이콘 */}
                  {isToday
                    ? <Check size={18} color={COLOR.green} />
                    : <ChevronRight size={18} color={COLOR.textLight} />
                  }
                </div>
              );
            })}

            {/* 운동 추가 버튼 */}
            <button
              style={kkStyles.kkAddExBtn}
              onClick={() => setEditTarget({ groupIdx: gi, exerciseIdx: null })}
            >
              + 운동 추가
            </button>
          </div>
        ))}
      </div>

      {/* 오늘 운동 마무리 버튼 (하나라도 완료했을 때) */}
      {completedToday > 0 && (
        <div style={{ padding: "0 16px 32px" }}>
          <button style={kkStyles.finishBtn} onClick={() => setShowComment(true)}>
            오늘 운동 마무리 · 코멘트 남기기
          </button>
        </div>
      )}

      {/* 운동 편집/추가 시트 */}
      {editTarget && (
        <ExerciseEditSheet
          exercise={
            editTarget.exerciseIdx !== null
              ? day.groups[editTarget.groupIdx].exercises[editTarget.exerciseIdx]
              : null
          }
          isNew={editTarget.exerciseIdx === null}
          onSave={(updated) => handleSaveExercise(editTarget.groupIdx, editTarget.exerciseIdx, updated)}
          onDelete={() => handleDeleteExercise(editTarget.groupIdx, editTarget.exerciseIdx)}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* 코멘트 모달 */}
      {showComment && (
        <WorkoutCommentModal
          dayName={day.name}
          onSave={(comment) => { onSaveComment(comment); setShowComment(false); }}
          onClose={() => setShowComment(false)}
        />
      )}
    </div>
  );
}

// ====== 코멘트 분석 (지난 7일) ======
function analyzeComments(comments) {
  const lastWeek = comments.filter(c => {
    const diff = (Date.now() - new Date(c.date)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });
  if (lastWeek.length === 0) return null;
  const text = lastWeek.map(c => c.comment).join(" ");
  const pain   = /아프|통증|불편|부상|쑤셔|뻐근/.test(text);
  const tired  = /힘들|피곤|지쳐|무거|힘없|컨디션 안/.test(text);
  const good   = /좋|최고|가볍|수월|활기|잘됐|상쾌|완벽/.test(text);
  if (pain)          return { type: "warning",  text: "불편함이나 통증이 언급됐어요. 해당 부위 강도를 줄이고 충분히 회복하세요." };
  if (tired && !good) return { type: "caution",  text: "피로가 쌓인 한 주였네요. 오늘은 무게를 5~10% 줄이고 회복에 집중해보세요." };
  if (good && !tired) return { type: "positive", text: "컨디션이 좋은 한 주였어요! 오늘도 목표 무게에 도전해보세요." };
  return { type: "neutral", text: "꾸준히 기록하고 있어요. 이번 주도 화이팅!" };
}

// ====== 운동 코멘트 모달 ======
function WorkoutCommentModal({ dayName, onSave, onClose }) {
  const [text, setText] = useState("");
  return (
    <div style={kkStyles.sheetOverlay} onClick={onClose}>
      <div style={kkStyles.sheet} onClick={e => e.stopPropagation()}>
        <div style={kkStyles.sheetHandleWrap}><div style={kkStyles.sheetHandle} /></div>
        <div style={kkStyles.sheetHeader}>
          <div style={kkStyles.sheetTitleBlock}>
            <div style={kkStyles.sheetTitle}>{dayName} 마무리</div>
            <div style={kkStyles.sheetTitleSub}>오늘 운동 어땠나요?</div>
          </div>
          <button style={kkStyles.sheetCloseBtn} onClick={onClose}>×</button>
        </div>
        <div style={kkStyles.sheetBody}>
          <textarea
            style={kkStyles.commentTextarea}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={"예: 벤치 무게 늘렸는데 생각보다 수월했음\n어깨가 좀 뻐근했음"}
            rows={5}
          />
          <button
            style={{ ...kkStyles.sheetSaveBtn, opacity: text.trim() ? 1 : 0.35 }}
            onClick={() => text.trim() && onSave(text.trim())}
            disabled={!text.trim()}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== 운동 편집 / 추가 시트 ======
function ExerciseEditSheet({ exercise, isNew, onSave, onDelete, onClose }) {
  const [nameKo, setNameKo] = useState(exercise?.nameKo ?? "");
  const [name, setName] = useState(exercise?.name ?? "");
  const [sets, setSets] = useState(String(exercise?.sets ?? 3));
  const [reps, setReps] = useState(exercise?.reps ?? "8-12");
  const [rpe, setRpe] = useState(exercise?.rpe ?? "8");
  const [rest, setRest] = useState(exercise?.rest ?? "90초");
  const [type, setType] = useState(exercise?.type ?? "isolation");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    if (!nameKo.trim()) return;
    onSave({
      id: exercise?.id ?? `custom_${Date.now()}`,
      nameKo: nameKo.trim(),
      name: name.trim() || nameKo.trim(),
      sets: Math.max(1, parseInt(sets) || 3),
      reps,
      rpe,
      rest,
      type,
    });
  };

  return (
    <div style={kkStyles.sheetOverlay} onClick={onClose}>
      <div style={kkStyles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* 드래그 핸들 */}
        <div style={kkStyles.sheetHandleWrap}>
          <div style={kkStyles.sheetHandle} />
        </div>

        {/* 헤더 */}
        <div style={kkStyles.sheetHeader}>
          <div style={kkStyles.sheetTitleBlock}>
            <div style={kkStyles.sheetTitle}>{isNew ? "운동 추가" : "운동 편집"}</div>
          </div>
          <button style={kkStyles.sheetCloseBtn} onClick={onClose}>×</button>
        </div>

        <div style={kkStyles.sheetBody}>
          {/* 종류 토글 */}
          <div style={kkStyles.sheetFieldGroup}>
            <div style={kkStyles.sheetFieldLabel}>종류</div>
            <div style={kkStyles.kkTypeToggle}>
              <button
                style={{ ...kkStyles.kkTypeToggleBtn, ...(type === "compound" ? kkStyles.kkTypeToggleBtnActive : {}) }}
                onClick={() => setType("compound")}
              >
                컴파운드
              </button>
              <button
                style={{ ...kkStyles.kkTypeToggleBtn, ...(type === "isolation" ? kkStyles.kkTypeToggleBtnActive : {}) }}
                onClick={() => setType("isolation")}
              >
                아이솔레이션
              </button>
            </div>
          </div>

          {/* 운동명 */}
          <div style={kkStyles.sheetFieldGroup}>
            <label style={kkStyles.sheetFieldLabel}>운동명 (한글) *</label>
            <input
              style={kkStyles.sheetInput}
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="예: 바벨 벤치프레스"
            />
          </div>
          <div style={kkStyles.sheetFieldGroup}>
            <label style={kkStyles.sheetFieldLabel}>Exercise Name</label>
            <input
              style={kkStyles.sheetInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Barbell Bench Press"
            />
          </div>

          {/* 수치 정보 4열 */}
          <div style={kkStyles.sheetGrid}>
            <div style={kkStyles.sheetGridItem}>
              <label style={kkStyles.sheetFieldLabel}>세트</label>
              <input
                style={kkStyles.sheetInputSm}
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                inputMode="numeric"
                placeholder="4"
              />
            </div>
            <div style={kkStyles.sheetGridItem}>
              <label style={kkStyles.sheetFieldLabel}>횟수</label>
              <input
                style={kkStyles.sheetInputSm}
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="8-12"
              />
            </div>
            <div style={kkStyles.sheetGridItem}>
              <label style={kkStyles.sheetFieldLabel}>RPE</label>
              <input
                style={kkStyles.sheetInputSm}
                value={rpe}
                onChange={(e) => setRpe(e.target.value)}
                placeholder="8"
              />
            </div>
            <div style={kkStyles.sheetGridItem}>
              <label style={kkStyles.sheetFieldLabel}>휴식</label>
              <input
                style={kkStyles.sheetInputSm}
                value={rest}
                onChange={(e) => setRest(e.target.value)}
                placeholder="90초"
              />
            </div>
          </div>

          {/* 저장 */}
          <button
            style={{ ...kkStyles.sheetSaveBtn, opacity: nameKo.trim() ? 1 : 0.35 }}
            onClick={handleSave}
            disabled={!nameKo.trim()}
          >
            {isNew ? "추가하기" : "저장하기"}
          </button>

          {/* 삭제 */}
          {!isNew && (
            confirmDelete ? (
              <div style={kkStyles.sheetDeleteConfirm}>
                <span style={kkStyles.sheetDeleteConfirmText}>정말 삭제할까요?</span>
                <button style={kkStyles.sheetDeleteConfirmYes} onClick={onDelete}>삭제</button>
                <button style={kkStyles.sheetDeleteConfirmNo} onClick={() => setConfirmDelete(false)}>취소</button>
              </div>
            ) : (
              <button style={kkStyles.sheetDeleteBtn} onClick={() => setConfirmDelete(true)}>
                이 운동 삭제
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ====== 운동 기록 화면 ======
function ExerciseView({ exercise, dayKey, day, history, unit, onUpdateUnit, onBack, onSave, onDelete, viewAnimation }) {
  const suggestion = getProgressionSuggestion(history, exercise, unit);
  // 입력 필드에 표시할 초기값은 unit 기준
  const initialWeight = suggestion.suggestedWeight !== null
    ? String(suggestion.suggestedWeightDisplay)
    : "";

  const [sets, setSets] = useState(
    Array(exercise.sets).fill(null).map(() => ({ weight: initialWeight, reps: "" }))
  );
  const [showHistory, setShowHistory] = useState(false);

  const updateSet = (idx, field, value) => {
    const newSets = [...sets];
    newSets[idx] = { ...newSets[idx], [field]: value };
    setSets(newSets);
  };

  const fillAll = (weight) => {
    // weight는 unit 기준으로 들어옴
    setSets(sets.map(s => ({ ...s, weight: String(weight) })));
  };

  // 단위 토글 시 현재 입력된 sets의 weight를 환산
  const handleUnitChange = (newUnit) => {
    if (newUnit === unit) return;
    const converted = sets.map(s => {
      if (!s.weight) return s;
      const inKg = toKg(s.weight, unit);
      return { ...s, weight: String(toDisplay(inKg, newUnit)) };
    });
    setSets(converted);
    onUpdateUnit(newUnit);
  };

  const handleSave = () => {
    const validSets = sets.filter(s => s.weight && s.reps);
    if (validSets.length === 0) return;
    // 저장 시 kg로 변환
    const setsInKg = validSets.map(s => ({
      weight: String(toKg(s.weight, unit)),
      reps: s.reps,
    }));
    onSave({ date: new Date().toISOString(), sets: setsInKg });
  };

  const hasValidSet = sets.some(s => s.weight && s.reps);

  return (
    <div style={{ ...kkStyles.exercisePage, animation: viewAnimation }}>
      {/* 상단 헤더 */}
      <div style={kkStyles.kkExHeader}>
        <button style={kkStyles.kkBackBtn} onClick={onBack}>
          <ChevronLeft size={22} color={COLOR.text} />
        </button>
        <div style={kkStyles.kkExHeaderTitle}>{exercise.nameKo}</div>
        {/* 단위 토글 우측 */}
        <UnitToggle unit={unit} onChange={handleUnitChange} />
      </div>

      <div style={kkStyles.exContent}>
        {/* 운동 메타 정보 */}
        <div style={kkStyles.exMetaCard}>
          <div style={kkStyles.exMetaNameEn}>{exercise.name}</div>
          <div style={kkStyles.exMetaTypeBadge}>
            {exercise.type === "compound" ? "컴파운드" : "아이솔레이션"}
          </div>
          <div style={kkStyles.exMetaGrid}>
            <div style={kkStyles.exMetaCell}>
              <div style={kkStyles.exMetaCellLabel}>세트</div>
              <div style={kkStyles.exMetaCellValue}>{exercise.sets}</div>
            </div>
            <div style={kkStyles.exMetaCell}>
              <div style={kkStyles.exMetaCellLabel}>횟수</div>
              <div style={kkStyles.exMetaCellValue}>{exercise.reps}</div>
            </div>
            <div style={kkStyles.exMetaCell}>
              <div style={kkStyles.exMetaCellLabel}>RPE</div>
              <div style={kkStyles.exMetaCellValue}>{exercise.rpe}</div>
            </div>
            <div style={kkStyles.exMetaCell}>
              <div style={kkStyles.exMetaCellLabel}>휴식</div>
              <div style={{ ...kkStyles.exMetaCellValue, fontSize: 14 }}>{exercise.rest}</div>
            </div>
          </div>
        </div>

        {/* 점진적 과부하 카드 */}
        {suggestion.suggestedWeight !== null && (
          <div style={kkStyles.kkSuggestionCard}>
            <div style={kkStyles.kkSuggestionTop}>
              <TrendingUp size={16} color={COLOR.yellow} />
              <span style={kkStyles.kkSuggestionLabel}>점진적 과부하 추천</span>
              <span style={kkStyles.kkSuggestionAI}>AI</span>
            </div>
            <div style={kkStyles.kkSuggestionMsg}>{suggestion.messageKo}</div>
            {suggestion.previousWeight !== undefined && (
              <div style={kkStyles.kkSuggestionStats}>
                <div style={kkStyles.kkSuggestionBlock}>
                  <div style={kkStyles.kkSuggestionBlockLabel}>이전</div>
                  <div style={{ ...kkStyles.kkSuggestionBlockValue, color: COLOR.textMute, textDecoration: "line-through" }}>
                    {suggestion.previousWeightDisplay}<span style={kkStyles.unitSm}>{unitLabel(unit)}</span>
                  </div>
                </div>
                <div style={kkStyles.kkSuggestionArrow}>→</div>
                <div style={kkStyles.kkSuggestionBlock}>
                  <div style={kkStyles.kkSuggestionBlockLabel}>추천</div>
                  <div style={{ ...kkStyles.kkSuggestionBlockValue, color: COLOR.text }}>
                    {suggestion.suggestedWeightDisplay}<span style={kkStyles.unitSm}>{unitLabel(unit)}</span>
                  </div>
                </div>
              </div>
            )}
            <button style={kkStyles.kkApplyBtn} onClick={() => fillAll(suggestion.suggestedWeightDisplay)}>
              전체 세트에 적용
            </button>
          </div>
        )}

        {/* 첫 세션 안내 카드 */}
        {suggestion.type === "start" && (
          <div style={kkStyles.kkStartCard}>
            <div style={kkStyles.kkStartTitle}>첫 번째 세션</div>
            <div style={kkStyles.kkStartMsg}>편안하게 들 수 있는 무게로 시작하세요. 다음 세션부터 자동으로 최적 무게를 추천해드립니다.</div>
          </div>
        )}

        {/* REST TIMER */}
        <RestTimer />

        {/* 세트 입력 */}
        <div style={kkStyles.kkSetsBlock}>
          <div style={kkStyles.kkSetsBlockHeader}>
            <div style={kkStyles.kkSetsBlockTitle}>세트 기록</div>
            <div style={kkStyles.kkSetsBlockSub}>휴식 {exercise.rest}</div>
          </div>
          {/* 테이블 헤더 */}
          <div style={kkStyles.kkSetsTable}>
            <div style={kkStyles.kkSetsTableHeader}>
              <div style={kkStyles.kkSetsHeadIdx}>SET</div>
              <div style={kkStyles.kkSetsHeadCell}>무게 ({unitLabel(unit)})</div>
              <div style={kkStyles.kkSetsHeadCell}>횟수</div>
            </div>
            {sets.map((set, idx) => (
              <div key={idx} style={kkStyles.kkSetRow}>
                <div style={kkStyles.kkSetRowIdx}>{idx + 1}</div>
                <div style={kkStyles.kkSetRowInputs}>
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(idx, "weight", e.target.value)}
                    style={kkStyles.kkSetInput}
                    placeholder="—"
                    inputMode="decimal"
                  />
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(idx, "reps", e.target.value)}
                    style={kkStyles.kkSetInput}
                    placeholder="—"
                    inputMode="numeric"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECORD SESSION 버튼 */}
        <button
          style={{
            ...kkStyles.kkRecordBtn,
            background: hasValidSet ? COLOR.yellow : COLOR.text,
            color: hasValidSet ? COLOR.text : COLOR.white,
            boxShadow: hasValidSet ? COLOR.shadowYellow : "none",
            opacity: hasValidSet ? 1 : 0.6,
          }}
          onClick={handleSave}
          disabled={!hasValidSet}
        >
          세션 기록하기
        </button>

        {/* 히스토리 */}
        {history.length > 0 && (
          <div style={kkStyles.kkHistoryBlock}>
            <button style={kkStyles.kkHistoryToggle} onClick={() => setShowHistory(!showHistory)}>
              <Calendar size={14} color={COLOR.textMute} />
              <span style={kkStyles.kkHistoryToggleLabel}>이전 기록 · {history.length}회</span>
              <ChevronRight
                size={14}
                color={COLOR.textMute}
                style={{ transform: showHistory ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
            {showHistory && (
              <div style={kkStyles.kkHistoryList}>
                {[...history].reverse().map((session, idx) => {
                  const realIdx = history.length - 1 - idx;
                  const date = new Date(session.date);
                  // 볼륨은 kg 기준으로 계산 후 unit으로 환산
                  const volumeKg = session.sets.reduce((s, set) => s + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0), 0);
                  const volumeDisplay = unit === "lb"
                    ? Math.round(volumeKg * LBS_PER_KG)
                    : Math.round(volumeKg);
                  return (
                    <div key={idx} style={kkStyles.kkHistoryCard}>
                      <div style={kkStyles.kkHistoryCardHeader}>
                        <div style={kkStyles.kkHistoryDate}>
                          {date.toLocaleDateString("ko-KR", { month: "short", day: "numeric", weekday: "short" })}
                        </div>
                        <button style={kkStyles.kkHistoryDelete} onClick={() => onDelete(realIdx)}>
                          <Trash2 size={13} color={COLOR.textLight} />
                        </button>
                      </div>
                      <div style={kkStyles.kkHistorySetGrid}>
                        {session.sets.map((set, si) => (
                          <div key={si} style={kkStyles.kkHistorySetItem}>
                            <span style={kkStyles.kkHistorySetNum}>S{si + 1}</span>
                            <span style={kkStyles.kkHistorySetVal}>
                              {toDisplay(set.weight, unit)}<span style={kkStyles.unitTiny}>{unitLabel(unit)}</span>
                              {" × "}{set.reps}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={kkStyles.kkHistoryVolRow}>
                        <span style={kkStyles.kkHistoryVolLabel}>총 볼륨</span>
                        <span style={kkStyles.kkHistoryVolValue}>
                          {volumeDisplay.toLocaleString()}<span style={kkStyles.unitTiny}>{unitLabel(unit)}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ====== 쉬는시간 타이머 ======
function RestTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  // 1초마다 카운트다운. running이 true일 때만 작동
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // 시간 추가 (초 단위)
  const addTime = (s) => {
    setDone(false);
    setSeconds(prev => prev + s);
  };

  // 시작/일시정지 토글
  const toggleRun = () => {
    if (seconds === 0) return;
    setDone(false);
    setRunning(r => !r);
  };

  // 리셋
  const reset = () => {
    setRunning(false);
    setSeconds(0);
    setDone(false);
  };

  // MM:SS 포맷
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  // 타이머 숫자 색상: 실행 중 → 진한 노란, 완료 → 초록, 기본 → 검은
  const digitColor = done ? COLOR.green : running ? COLOR.yellowDeep : COLOR.text;

  return (
    <>
      {/* 타이머 완료 시 전체화면 알림 */}
      {done && (
        <div style={kkStyles.timerDoneOverlay} onClick={() => setDone(false)}>
          <div style={kkStyles.timerDoneBox}>
            <div style={kkStyles.timerDoneEmoji}>✅</div>
            <div style={kkStyles.timerDoneTitle}>휴식 완료!</div>
            <div style={kkStyles.timerDoneSub}>다음 세트를 시작하세요</div>
            <div style={kkStyles.timerDoneTap}>화면을 탭하여 닫기</div>
          </div>
        </div>
      )}

      <div style={kkStyles.kkTimerBlock}>
        <div style={kkStyles.kkTimerHeader}>
          <span style={kkStyles.kkTimerLabel}>REST TIMER</span>
          <span style={kkStyles.kkTimerLabelKo}>쉬는시간 타이머</span>
        </div>

        {/* 카운트다운 표시 */}
        <div style={kkStyles.kkTimerDisplay}>
          <span style={{ ...kkStyles.kkTimerDigits, color: digitColor }}>
            {mm}:{ss}
          </span>
        </div>

        {/* 시간 추가 버튼 */}
        <div style={kkStyles.kkTimerAddRow}>
          <button style={kkStyles.kkTimerAddBtn} onClick={() => addTime(10)}>+10초</button>
          <button style={kkStyles.kkTimerAddBtn} onClick={() => addTime(60)}>+1분</button>
        </div>

        {/* 시작/일시정지 + 리셋 */}
        <div style={kkStyles.kkTimerControlRow}>
          <button
            style={{ ...kkStyles.kkTimerStartBtn, opacity: seconds === 0 ? 0.35 : 1 }}
            onClick={toggleRun}
            disabled={seconds === 0}
          >
            {running ? "일시정지" : "시작"}
          </button>
          <button style={kkStyles.kkTimerResetBtn} onClick={reset}>리셋</button>
        </div>
      </div>
    </>
  );
}

// ====== 카카오 스타일 스타일 시트 ======
const kkStyles = {

  // ===== 로딩 =====
  loadingScreen: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: COLOR.yellow,
    gap: "16px",
  },
  loadingSpinner: {
    fontSize: "32px",
    color: COLOR.text,
    animation: "pulse 1.5s ease-in-out infinite",
  },
  loadingText: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "13px",
    letterSpacing: "0.5em",
    fontWeight: 700,
    color: COLOR.text,
  },

  // ===== 앱 루트 =====
  appRoot: {
    fontFamily: "'KakaoBigFont', 'Apple SD Gothic Neo', sans-serif",
    background: COLOR.bgSub,
    minHeight: "100vh",
    color: COLOR.text,
    position: "relative",
    maxWidth: "480px",
    margin: "0 auto",
    overflow: "hidden",
  },

  // ===== iOS 홈화면 추가 안내 =====
  installHint: {
    position: "fixed",
    bottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
    left: "16px",
    right: "16px",
    zIndex: 200,
    background: COLOR.text,
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    animation: "fadeIn 0.4s ease",
  },
  installHintInner: {
    padding: "18px 20px",
    color: COLOR.white,
  },
  installHintHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  installHintTitle: {
    fontWeight: 700,
    fontSize: "15px",
    color: COLOR.yellow,
  },
  installHintClose: {
    color: COLOR.textLight,
    fontSize: "24px",
    lineHeight: 1,
    padding: "0 4px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  installHintBody: {
    fontSize: "13px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.8)",
  },

  // ===== 페이지 공통 컨테이너 =====
  pageContainer: {
    minHeight: "100vh",
    background: COLOR.bgSub,
    display: "flex",
    flexDirection: "column",
  },

  // ===== 홈 공통 헤더 =====
  kkHeader: {
    background: COLOR.white,
    padding: "calc(env(safe-area-inset-top, 12px) + 12px) 20px 12px",
    borderBottom: `1px solid ${COLOR.line}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  kkHeaderLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  kkLogo: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "22px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  kkLogoSub: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "9px",
    letterSpacing: "0.4em",
    color: COLOR.yellow,
    fontWeight: 700,
  },
  kkHeaderDate: {
    fontSize: "10px",
    color: COLOR.textMute,
    fontWeight: 400,
  },

  // ===== 탭 콘텐츠 영역 =====
  tabContent: {
    flex: 1,
    padding: "20px 16px",
    paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 20px)",
    overflowY: "auto",
  },

  // ===== 오늘 탭: 히어로 카드 =====
  todayHeroCard: {
    background: COLOR.yellow,
    borderRadius: "20px",
    padding: "28px 24px",
    marginBottom: "16px",
    cursor: "pointer",
    boxShadow: COLOR.shadowYellow,
  },
  todayHeroBadge: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: 600,
    color: COLOR.text,
    background: "rgba(0,0,0,0.08)",
    borderRadius: "100px",
    padding: "4px 10px",
    marginBottom: "16px",
  },
  todayHeroName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "52px",
    color: COLOR.text,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    marginBottom: "6px",
  },
  todayHeroSub: {
    fontSize: "14px",
    color: "rgba(0,0,0,0.55)",
    marginBottom: "4px",
  },
  todayHeroCta: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    color: COLOR.text,
    textAlign: "right",
    marginTop: "20px",
  },

  // ===== 오늘 탭: 쉬는 날 카드 =====
  restDayCard: {
    background: COLOR.white,
    borderRadius: "20px",
    padding: "32px 24px",
    marginBottom: "16px",
    textAlign: "center",
    boxShadow: COLOR.shadow,
  },
  restDayEmoji: {
    fontSize: "40px",
    marginBottom: "12px",
  },
  restDayTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    color: COLOR.text,
    marginBottom: "6px",
  },
  restDaySub: {
    fontSize: "13px",
    color: COLOR.textMute,
  },

  // ===== 오늘 탭: 통계 카드 3개 =====
  statCardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  statCard: {
    background: COLOR.white,
    borderRadius: "16px",
    padding: "16px 12px",
    textAlign: "center",
    boxShadow: COLOR.shadow,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  statCardValue: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "28px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  statCardUnit: {
    fontSize: "10px",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  statCardLabel: {
    fontSize: "11px",
    color: COLOR.textSub,
    fontWeight: 600,
    marginTop: "4px",
  },

  // ===== 섹션 타이틀 =====
  sectionTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "17px",
    color: COLOR.text,
    marginBottom: "14px",
    letterSpacing: "-0.02em",
  },

  // ===== 루틴 탭: 분할 카드 =====
  splitCard: {
    background: COLOR.white,
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "10px",
    boxShadow: COLOR.shadow,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  splitCardLeft: {
    flex: 1,
  },
  splitCardChapter: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    fontWeight: 700,
    color: COLOR.yellowDeep,
    marginBottom: "4px",
    letterSpacing: "0.1em",
  },
  splitCardName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "28px",
    color: COLOR.text,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    marginBottom: "4px",
  },
  splitCardSub: {
    fontSize: "12px",
    color: COLOR.textMute,
  },
  splitCardDay: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    color: COLOR.textLight,
    letterSpacing: "0.1em",
  },

  // ===== 신체 탭: 카드 =====
  bodyCard: {
    background: COLOR.white,
    borderRadius: "16px",
    boxShadow: COLOR.shadow,
    overflow: "hidden",
  },
  bodyCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px 14px",
    borderBottom: `1px solid ${COLOR.line}`,
  },
  bodyCardTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: COLOR.text,
  },
  bodyEditBtn: {
    background: COLOR.yellow,
    color: COLOR.text,
    fontWeight: 700,
    fontSize: "13px",
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  bodyStatGrid: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  bodyStatCell: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  bodyStatValue: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "32px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  bodyStatUnit: {
    fontSize: "11px",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  bodyStatLabel: {
    fontSize: "11px",
    color: COLOR.textSub,
    fontWeight: 600,
    marginTop: "4px",
  },
  bodyStatDivider: {
    width: "1px",
    height: "40px",
    background: COLOR.line,
  },
  bodyEditSection: {
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  bodyInputRow: {
    display: "flex",
    gap: "12px",
  },
  bodyInputWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  bodyInputLabel: {
    fontSize: "12px",
    color: COLOR.textSub,
    fontWeight: 600,
  },
  bodyInput: {
    width: "100%",
    padding: "14px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "'KakaoBigFont', sans-serif",
    outline: "none",
    color: COLOR.text,
    background: COLOR.bgSub,
  },
  bodySaveBtn: {
    background: COLOR.yellow,
    color: COLOR.text,
    padding: "14px",
    borderRadius: "12px",
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    boxShadow: COLOR.shadowYellow,
  },

  // ===== 하단 탭바 =====
  tabBar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "480px",
    background: COLOR.white,
    borderTop: `1px solid ${COLOR.line}`,
    display: "flex",
    height: "calc(64px + env(safe-area-inset-bottom, 0px))",
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    zIndex: 100,
  },
  tabBarBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
  },
  tabBarBtnActive: {
    // 활성 탭 스타일 (아이콘/텍스트 색상은 children에서 직접 제어)
  },
  tabBarIcon: {
    fontSize: "22px",
    lineHeight: 1,
  },
  tabBarLabel: {
    fontSize: "10px",
    fontWeight: 600,
    color: COLOR.textMute,
  },

  // ===== 워크아웃 뷰 =====
  workoutPage: {
    minHeight: "100vh",
    background: COLOR.bgSub,
    paddingBottom: "40px",
  },
  kkWorkoutHeader: {
    background: COLOR.white,
    borderBottom: `1px solid ${COLOR.line}`,
    padding: "calc(env(safe-area-inset-top, 12px) + 12px) 16px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  kkBackBtn: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px",
  },
  kkWorkoutTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "20px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
    textAlign: "center",
  },

  // 진행률 바
  progressBarTrack: {
    height: "4px",
    background: COLOR.line,
    position: "sticky",
    top: "calc(env(safe-area-inset-top, 0px) + 60px)",
    zIndex: 49,
  },
  progressBarFill: {
    height: "100%",
    background: COLOR.yellow,
    transition: "width 0.4s ease",
  },

  workoutContent: {
    padding: "20px 16px",
  },
  workoutSubHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  workoutSubTitle: {
    fontSize: "14px",
    color: COLOR.textSub,
    fontWeight: 500,
  },
  workoutProgress: {
    fontSize: "13px",
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 700,
    color: COLOR.yellowDeep,
  },

  // 근육 그룹 섹션
  kkMuscleSection: {
    marginBottom: "28px",
  },
  kkMuscleSectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: `1.5px solid ${COLOR.line}`,
  },
  kkMuscleSectionTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "20px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
  },
  kkMuscleSectionSub: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "11px",
    color: COLOR.textMute,
    fontWeight: 400,
  },

  // 운동 카드
  kkExCard: {
    background: COLOR.white,
    borderRadius: "16px",
    boxShadow: COLOR.shadow,
    padding: "16px 14px",
    marginBottom: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  kkExCardDone: {
    opacity: 0.5,
    background: COLOR.bgGray,
  },
  kkExCardLeft: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "2px",
  },
  kkExCardIdx: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: COLOR.bgSub,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 700,
    fontSize: "12px",
    color: COLOR.yellowDeep,
  },
  kkExCardMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  kkExCardName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: COLOR.text,
    letterSpacing: "-0.02em",
  },
  kkExCardNameEn: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    color: COLOR.textMute,
    fontWeight: 400,
  },
  kkExCardPills: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    marginTop: "4px",
  },
  kkPill: {
    background: COLOR.bgSub,
    borderRadius: "100px",
    padding: "3px 10px",
    fontSize: "10px",
    color: COLOR.textSub,
    fontWeight: 600,
    fontFamily: "'Geist Mono', monospace",
  },
  kkExCardSuggestion: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "6px",
    fontSize: "11px",
    color: COLOR.textSub,
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 600,
  },

  // 운동 추가 버튼
  kkAddExBtn: {
    width: "100%",
    padding: "14px",
    border: `1.5px dashed ${COLOR.line}`,
    borderRadius: "16px",
    background: "transparent",
    color: COLOR.textMute,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "4px",
    fontFamily: "'KakaoBigFont', sans-serif",
  },

  // ===== ExerciseEditSheet =====
  sheetOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 300,
    display: "flex",
    alignItems: "flex-end",
  },
  sheet: {
    width: "100%",
    background: COLOR.white,
    borderRadius: "20px 20px 0 0",
    maxHeight: "90vh",
    overflowY: "auto",
    animation: "slideUp 0.28s ease",
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
  sheetHandleWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "12px 0 4px",
  },
  sheetHandle: {
    width: "36px",
    height: "4px",
    background: COLOR.line,
    borderRadius: "2px",
  },
  sheetHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 20px 4px",
  },
  sheetTitleBlock: {},
  sheetTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "22px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
  },
  sheetCloseBtn: {
    fontSize: "28px",
    fontWeight: 300,
    color: COLOR.textMute,
    lineHeight: 1,
    padding: "0 4px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  sheetBody: {
    padding: "16px 20px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sheetFieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  sheetFieldLabel: {
    fontSize: "12px",
    color: COLOR.textSub,
    fontWeight: 600,
  },
  sheetInput: {
    width: "100%",
    padding: "14px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "'KakaoBigFont', sans-serif",
    outline: "none",
    color: COLOR.text,
    background: COLOR.bgSub,
  },
  sheetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  },
  sheetGridItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  sheetInputSm: {
    width: "100%",
    padding: "10px 6px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "'Geist Mono', monospace",
    outline: "none",
    color: COLOR.text,
    textAlign: "center",
    background: COLOR.bgSub,
  },
  kkTypeToggle: {
    display: "flex",
    gap: "8px",
  },
  kkTypeToggleBtn: {
    flex: 1,
    padding: "11px 8px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 700,
    color: COLOR.textMute,
    background: COLOR.bgSub,
    cursor: "pointer",
    fontFamily: "'KakaoBigFont', sans-serif",
    transition: "all 0.15s ease",
  },
  kkTypeToggleBtnActive: {
    background: COLOR.yellow,
    color: COLOR.text,
    borderColor: COLOR.yellow,
  },
  sheetSaveBtn: {
    width: "100%",
    padding: "15px",
    background: COLOR.yellow,
    color: COLOR.text,
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    fontFamily: "'KakaoBigFont', sans-serif",
    border: "none",
    cursor: "pointer",
    boxShadow: COLOR.shadowYellow,
    marginTop: "4px",
  },
  sheetDeleteBtn: {
    width: "100%",
    padding: "13px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 600,
    color: COLOR.red,
    background: "transparent",
    fontFamily: "'KakaoBigFont', sans-serif",
    cursor: "pointer",
  },
  sheetDeleteConfirm: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
  },
  sheetDeleteConfirmText: {
    flex: 1,
    fontSize: "14px",
    fontWeight: 600,
    color: COLOR.textSub,
  },
  sheetDeleteConfirmYes: {
    padding: "10px 18px",
    background: COLOR.red,
    color: COLOR.white,
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
  sheetDeleteConfirmNo: {
    padding: "10px 18px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    color: COLOR.textMute,
    background: "transparent",
    cursor: "pointer",
  },

  // ===== ExerciseView =====
  exercisePage: {
    minHeight: "100vh",
    background: COLOR.bgSub,
    paddingBottom: "40px",
  },
  kkExHeader: {
    background: COLOR.white,
    borderBottom: `1px solid ${COLOR.line}`,
    padding: "calc(env(safe-area-inset-top, 12px) + 12px) 16px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  kkExHeaderTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "18px",
    color: COLOR.text,
    letterSpacing: "-0.03em",
    flex: 1,
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  exContent: {
    padding: "16px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  // 운동 메타 카드
  exMetaCard: {
    background: COLOR.white,
    borderRadius: "16px",
    padding: "18px",
    boxShadow: COLOR.shadow,
  },
  exMetaNameEn: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    color: COLOR.textMute,
    marginBottom: "8px",
  },
  exMetaTypeBadge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 600,
    color: COLOR.textSub,
    background: COLOR.bgSub,
    borderRadius: "100px",
    padding: "4px 12px",
    marginBottom: "16px",
  },
  exMetaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  },
  exMetaCell: {
    background: COLOR.bgSub,
    borderRadius: "10px",
    padding: "10px 6px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  exMetaCellLabel: {
    fontSize: "10px",
    color: COLOR.textMute,
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  exMetaCellValue: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 800,
    fontSize: "17px",
    color: COLOR.text,
    lineHeight: 1,
  },

  // 점진적 과부하 카드
  kkSuggestionCard: {
    background: "#FFF8B0",
    borderRadius: "16px",
    border: `1.5px solid ${COLOR.yellow}`,
    padding: "18px",
  },
  kkSuggestionTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  kkSuggestionLabel: {
    flex: 1,
    fontWeight: 700,
    fontSize: "13px",
    color: COLOR.text,
  },
  kkSuggestionAI: {
    fontSize: "10px",
    fontWeight: 700,
    color: COLOR.white,
    background: COLOR.green,
    padding: "2px 7px",
    borderRadius: "100px",
  },
  kkSuggestionMsg: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: COLOR.text,
    marginBottom: "14px",
  },
  kkSuggestionStats: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  kkSuggestionBlock: {
    flex: 1,
  },
  kkSuggestionBlockLabel: {
    fontSize: "10px",
    color: COLOR.textMute,
    fontWeight: 600,
    marginBottom: "4px",
  },
  kkSuggestionBlockValue: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 800,
    fontSize: "28px",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  kkSuggestionArrow: {
    fontSize: "18px",
    color: COLOR.yellowDeep,
    fontWeight: 700,
  },
  kkApplyBtn: {
    width: "100%",
    padding: "12px",
    background: COLOR.yellow,
    color: COLOR.text,
    borderRadius: "10px",
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    boxShadow: COLOR.shadowYellow,
  },

  // 첫 세션 안내
  kkStartCard: {
    background: COLOR.white,
    borderRadius: "16px",
    padding: "18px",
    boxShadow: COLOR.shadow,
  },
  kkStartTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    color: COLOR.text,
    marginBottom: "6px",
  },
  kkStartMsg: {
    fontSize: "13px",
    color: COLOR.textSub,
    lineHeight: 1.6,
  },

  // 세트 입력 블록
  kkSetsBlock: {
    background: COLOR.white,
    borderRadius: "16px",
    boxShadow: COLOR.shadow,
    overflow: "hidden",
  },
  kkSetsBlockHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 16px 12px",
    borderBottom: `1px solid ${COLOR.line}`,
  },
  kkSetsBlockTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: COLOR.text,
    letterSpacing: "-0.02em",
  },
  kkSetsBlockSub: {
    fontSize: "12px",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  kkSetsTable: {
    // 테이블 컨테이너
  },
  kkSetsTableHeader: {
    display: "grid",
    gridTemplateColumns: "56px 1fr 1fr",
    background: COLOR.bgSub,
  },
  kkSetsHeadIdx: {
    padding: "10px 12px",
    fontSize: "10px",
    fontWeight: 700,
    color: COLOR.textMute,
    textAlign: "center",
    fontFamily: "'Geist Mono', monospace",
    letterSpacing: "0.1em",
  },
  kkSetsHeadCell: {
    padding: "10px 12px",
    fontSize: "10px",
    fontWeight: 700,
    color: COLOR.textMute,
    borderLeft: `1px solid ${COLOR.line}`,
    fontFamily: "'Geist Mono', monospace",
    letterSpacing: "0.05em",
  },
  kkSetRow: {
    display: "grid",
    gridTemplateColumns: "56px 1fr",
    borderTop: `1px solid ${COLOR.line}`,
  },
  kkSetRowIdx: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "15px",
    fontWeight: 700,
    color: COLOR.yellowDeep,
    textAlign: "center",
    padding: "14px 0",
    borderRight: `1px solid ${COLOR.line}`,
    background: COLOR.yellowSoft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kkSetRowInputs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  kkSetInput: {
    padding: "14px 12px",
    border: "none",
    fontSize: "20px",
    fontWeight: 700,
    fontFamily: "'Geist Mono', monospace",
    background: "transparent",
    outline: "none",
    color: COLOR.text,
    width: "100%",
    textAlign: "center",
    borderLeft: `1px solid ${COLOR.line}`,
    letterSpacing: "-0.02em",
  },

  // RECORD SESSION 버튼
  kkRecordBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "-0.01em",
  },

  // 히스토리
  kkHistoryBlock: {},
  kkHistoryToggle: {
    width: "100%",
    padding: "14px 16px",
    background: COLOR.white,
    borderRadius: "14px",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: COLOR.textMute,
    cursor: "pointer",
    boxShadow: COLOR.shadow,
  },
  kkHistoryToggleLabel: {
    flex: 1,
    textAlign: "left",
    fontSize: "13px",
    fontWeight: 600,
    color: COLOR.textSub,
  },
  kkHistoryList: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  kkHistoryCard: {
    background: COLOR.white,
    borderRadius: "14px",
    padding: "14px 16px",
    boxShadow: COLOR.shadow,
  },
  kkHistoryCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: `1px solid ${COLOR.line}`,
  },
  kkHistoryDate: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    color: COLOR.text,
  },
  kkHistoryDelete: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px",
  },
  kkHistorySetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "6px 12px",
    marginBottom: "10px",
  },
  kkHistorySetItem: {
    display: "flex",
    gap: "6px",
    alignItems: "baseline",
  },
  kkHistorySetNum: {
    fontSize: "10px",
    fontWeight: 700,
    color: COLOR.yellowDeep,
    fontFamily: "'Geist Mono', monospace",
  },
  kkHistorySetVal: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "13px",
    fontWeight: 600,
    color: COLOR.text,
  },
  kkHistoryVolRow: {
    paddingTop: "8px",
    borderTop: `1px solid ${COLOR.line}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  kkHistoryVolLabel: {
    fontSize: "11px",
    color: COLOR.textMute,
    fontWeight: 600,
  },
  kkHistoryVolValue: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "14px",
    fontWeight: 700,
    color: COLOR.textSub,
  },

  // 단위 표시용 작은 텍스트
  unitSm: {
    fontSize: "13px",
    fontWeight: 500,
    marginLeft: "2px",
    color: COLOR.textMute,
  },
  unitTiny: {
    fontSize: "10px",
    color: COLOR.textMute,
    marginLeft: "1px",
  },

  // ===== 단위 토글 =====
  unitToggle: {
    display: "inline-flex",
    background: COLOR.bgSub,
    borderRadius: "8px",
    overflow: "hidden",
    border: `1.5px solid ${COLOR.line}`,
  },
  unitToggleBtn: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.1em",
    fontWeight: 700,
    padding: "6px 10px",
    color: COLOR.textMute,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  unitToggleBtnActive: {
    background: COLOR.yellow,
    color: COLOR.text,
  },

  // ===== REST TIMER =====
  timerDoneOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.3s ease",
    cursor: "pointer",
  },
  timerDoneBox: {
    textAlign: "center",
    color: COLOR.white,
    padding: "48px 40px",
  },
  timerDoneEmoji: {
    fontSize: "56px",
    marginBottom: "20px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  timerDoneTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "48px",
    color: COLOR.yellow,
    marginBottom: "8px",
    lineHeight: 1,
    letterSpacing: "-0.04em",
  },
  timerDoneSub: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "32px",
  },
  timerDoneTap: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
  },
  kkTimerBlock: {
    background: COLOR.white,
    borderRadius: "16px",
    padding: "18px",
    boxShadow: COLOR.shadow,
  },
  kkTimerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: `1px solid ${COLOR.line}`,
  },
  kkTimerLabel: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontWeight: 700,
    color: COLOR.textSub,
  },
  kkTimerLabelKo: {
    fontSize: "12px",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  kkTimerDisplay: {
    textAlign: "center",
    marginBottom: "16px",
    lineHeight: 1,
  },
  kkTimerDigits: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 800,
    fontSize: "56px",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    transition: "color 0.4s ease",
  },
  kkTimerAddRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "10px",
  },
  kkTimerAddBtn: {
    flex: 1,
    padding: "11px 0",
    background: COLOR.bgSub,
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 700,
    color: COLOR.textSub,
    cursor: "pointer",
    fontFamily: "'KakaoBigFont', sans-serif",
  },
  kkTimerControlRow: {
    display: "flex",
    gap: "8px",
  },
  kkTimerStartBtn: {
    flex: 1,
    padding: "13px",
    background: COLOR.yellow,
    color: COLOR.text,
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    fontFamily: "'KakaoBigFont', sans-serif",
    boxShadow: COLOR.shadowYellow,
    transition: "opacity 0.2s ease",
  },
  kkTimerResetBtn: {
    padding: "13px 18px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    color: COLOR.textMute,
    background: "transparent",
    cursor: "pointer",
    fontFamily: "'KakaoBigFont', sans-serif",
  },

  // 운동 마무리 버튼
  finishBtn: {
    width: "100%",
    padding: "16px",
    background: COLOR.yellow,
    color: COLOR.text,
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    boxShadow: COLOR.shadowYellow,
    fontFamily: "'KakaoBigFont', sans-serif",
  },

  // 코멘트 textarea
  commentTextarea: {
    width: "100%",
    padding: "14px",
    border: `1.5px solid ${COLOR.line}`,
    borderRadius: "12px",
    fontSize: "15px",
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 400,
    color: COLOR.text,
    background: COLOR.bgSub,
    outline: "none",
    resize: "none",
    lineHeight: 1.6,
  },

  // 주간 분석 카드
  weeklyCard: {
    background: COLOR.white,
    borderRadius: "16px",
    boxShadow: COLOR.shadow,
    padding: "18px 16px",
    marginTop: "4px",
  },
  weeklyCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  weeklyCardTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    color: COLOR.text,
  },
  weeklyCardCount: {
    fontSize: "12px",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  analysisMsg: {
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: 1.5,
    padding: "10px 12px",
    background: COLOR.bgSub,
    borderRadius: "10px",
    marginBottom: "12px",
  },
  weeklyCommentList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  weeklyCommentItem: {
    borderTop: `1px solid ${COLOR.line}`,
    paddingTop: "10px",
  },
  weeklyCommentMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  weeklyCommentDay: {
    fontSize: "11px",
    fontWeight: 700,
    color: COLOR.yellow,
    background: "rgba(254,229,0,0.15)",
    padding: "2px 8px",
    borderRadius: "100px",
  },
  weeklyCommentDate: {
    fontSize: "11px",
    color: COLOR.textMute,
  },
  weeklyCommentText: {
    fontSize: "13px",
    color: COLOR.textSub,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
};
