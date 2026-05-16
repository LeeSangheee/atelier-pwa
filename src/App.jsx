import React, { useState, useEffect } from "react";
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

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <style>{globalCSS}</style>
        <div style={styles.loadingMark}>※</div>
        <div style={styles.loadingText}>ATELIER</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{globalCSS}</style>
      <NoiseOverlay />

      {showInstallHint && <InstallHint onDismiss={dismissInstallHint} />}

      {view === "home" && (
        <HomeView
          recommendedDay={recommendedDay}
          totalSessions={totalSessions}
          totalVolume={totalVolume}
          weekDays={recentWeek.size}
          bodyStats={bodyStats}
          onSelectDay={(d) => { setSelectedDay(d); setView("workout"); }}
          onUpdateStats={saveBodyStats}
        />
      )}

      {view === "workout" && selectedDay && (
        <WorkoutView
          dayKey={selectedDay}
          day={PROGRAM[selectedDay]}
          history={history}
          unit={unit}
          onBack={() => setView("home")}
          onSelectExercise={(ex) => { setSelectedExercise(ex); setView("exercise"); }}
        />
      )}

      {view === "exercise" && selectedExercise && (
        <ExerciseView
          exercise={selectedExercise}
          dayKey={selectedDay}
          day={PROGRAM[selectedDay]}
          history={history[selectedExercise.id] || []}
          unit={unit}
          onUpdateUnit={saveUnit}
          onBack={() => setView("workout")}
          onSave={(session) => {
            const newHistory = { ...history };
            if (!newHistory[selectedExercise.id]) newHistory[selectedExercise.id] = [];
            newHistory[selectedExercise.id] = [...newHistory[selectedExercise.id], session];
            saveHistory(newHistory);
            setView("workout");
          }}
          onDelete={(idx) => {
            const newHistory = { ...history };
            newHistory[selectedExercise.id] = newHistory[selectedExercise.id].filter((_, i) => i !== idx);
            saveHistory(newHistory);
          }}
        />
      )}
    </div>
  );
}

// ====== 노이즈 오버레이 (필름 그레인 효과) ======
function NoiseOverlay() {
  return (
    <svg style={styles.noise} xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0 0.10  0 0 0 0.4 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}

// ====== iOS 홈화면 추가 안내 ======
function InstallHint({ onDismiss }) {
  return (
    <div style={styles.installHint}>
      <div style={styles.installHintInner}>
        <div style={styles.installHintHeader}>
          <span style={styles.installHintTitle}>홈화면에 추가하기</span>
          <button style={styles.installHintClose} onClick={onDismiss}>×</button>
        </div>
        <div style={styles.installHintBody}>
          정식 앱처럼 사용하려면 사파리 하단의{" "}
          <span style={styles.installHintIcon}>⬆︎</span>{" "}
          공유 버튼을 눌러서 <strong style={styles.installHintBold}>'홈 화면에 추가'</strong>를 선택하세요.
        </div>
      </div>
    </div>
  );
}

// ====== 장식용 코너 마크 ======
function CornerMarks({ color = "#5a5240" }) {
  const size = 8;
  const stroke = 1;
  const corner = (pos) => ({
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    pointerEvents: "none",
    ...pos,
  });
  return (
    <>
      <div style={{ ...corner({ top: 6, left: 6 }), borderWidth: `${stroke}px 0 0 ${stroke}px` }} />
      <div style={{ ...corner({ top: 6, right: 6 }), borderWidth: `${stroke}px ${stroke}px 0 0` }} />
      <div style={{ ...corner({ bottom: 6, left: 6 }), borderWidth: `0 0 ${stroke}px ${stroke}px` }} />
      <div style={{ ...corner({ bottom: 6, right: 6 }), borderWidth: `0 ${stroke}px ${stroke}px 0` }} />
    </>
  );
}

// ====== 홈 화면 ======
function HomeView({ recommendedDay, totalSessions, totalVolume, weekDays, bodyStats, unit, onSelectDay, onUpdateStats }) {
  const [editStats, setEditStats] = useState(false);
  // 신체 기록은 kg 고정 (메인 화면이 깔끔하도록)
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
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();

  const handleSaveStats = () => {
    onUpdateStats({
      weight: tempWeight,
      height: tempHeight,
    });
    setEditStats(false);
  };

  // BMI는 항상 kg/m² 기준
  const bmi = bodyStats.weight && bodyStats.height
    ? (parseFloat(bodyStats.weight) / Math.pow(parseFloat(bodyStats.height) / 100, 2)).toFixed(1)
    : "—";

  return (
    <div style={styles.home}>
      {/* === 매거진 헤더 === */}
      <div style={styles.magazineHeader}>
        <div style={styles.headerTopRow}>
          <div style={styles.dateLabel}>{dateStr}</div>
          <div style={styles.issueLabel}>VOL · 01</div>
        </div>
        <div style={styles.divider} />
        <div style={styles.titleBlock}>
          <div style={styles.titleSerif}>아틀리에</div>
          <div style={styles.titleEn}>ATELIER</div>
          <div style={styles.titleSub}>STRENGTH JOURNAL</div>
        </div>
        <div style={styles.divider} />
        <div style={styles.headerBottomRow}>
          <div style={styles.tagline}>EST · MMXXVI</div>
          <div style={styles.tagline}>ACSM 2026 · 12 SETS</div>
        </div>
      </div>

      {/* === 신체 기록 === */}
      <section style={styles.section}>
        <SectionHeader number="01" title="Vital Statistics" titleKo="신체 기록" />
        <div style={styles.statsCard}>
          <CornerMarks />
          <div style={styles.statsCardInner}>
            <div style={styles.statsTopRow}>
              <div style={styles.statsLabel}>BODY · METRICS</div>
              <button style={styles.editBtn} onClick={() => setEditStats(!editStats)}>
                {editStats ? "CANCEL" : "EDIT"}
              </button>
            </div>
            {editStats ? (
              <div style={styles.statsEditWrap}>
                <div style={styles.statsInputRow}>
                  <div style={styles.statsInputWrap}>
                    <label style={styles.statsInputLabel}>WEIGHT · kg</label>
                    <input
                      type="number"
                      value={tempWeight}
                      onChange={(e) => setTempWeight(e.target.value)}
                      style={styles.statsInput}
                      placeholder="—"
                    />
                  </div>
                  <div style={styles.statsInputWrap}>
                    <label style={styles.statsInputLabel}>HEIGHT · cm</label>
                    <input
                      type="number"
                      value={tempHeight}
                      onChange={(e) => setTempHeight(e.target.value)}
                      style={styles.statsInput}
                      placeholder="—"
                    />
                  </div>
                </div>
                <button style={styles.saveStatsBtn} onClick={handleSaveStats}>
                  CONFIRM
                </button>
              </div>
            ) : (
              <div style={styles.statsGrid}>
                <StatCell label="MASS" value={bodyStats.weight || "—"} unit="kg" />
                <div style={styles.vDivider} />
                <StatCell label="STATURE" value={bodyStats.height || "—"} unit="cm" />
                <div style={styles.vDivider} />
                <StatCell label="INDEX" value={bmi} unit="bmi" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === 통계 === */}
      <section style={styles.section}>
        <SectionHeader number="02" title="Summary" titleKo="기록 요약" />
        <div style={styles.summaryGrid}>
          <SummaryCard label="WEEK" value={weekDays} suffix="/ 7" />
          <SummaryCard label="SESSIONS" value={totalSessions} suffix="total" />
          <SummaryCard label="VOLUME" value={(totalVolume / 1000).toFixed(1)} suffix="ton" />
        </div>
      </section>

      {/* === 오늘의 추천 === */}
      {recommendedDay && (
        <section style={styles.section}>
          <SectionHeader number="03" title="Today's Programme" titleKo="오늘의 프로그램" />
          <div style={styles.todayCard} onClick={() => onSelectDay(recommendedDay)}>
            <div style={styles.todayInner}>
              <div style={styles.todayChapter}>CH. {PROGRAM[recommendedDay].chapter}</div>
              <div style={styles.todayName}>{PROGRAM[recommendedDay].name}</div>
              <div style={styles.todayItalic}>{PROGRAM[recommendedDay].subtitle}</div>
              <div style={styles.todayDivider} />
              <div style={styles.todayMeta}>
                <span>{PROGRAM[recommendedDay].dayKo}</span>
                <span>·</span>
                <span>3 GROUPS</span>
                <span>·</span>
                <span>12 SETS EACH</span>
              </div>
              <div style={styles.todayCta}>
                <span>ENTER PROGRAMME</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === 분할 목록 === */}
      <section style={styles.section}>
        <SectionHeader number={recommendedDay ? "04" : "03"} title="Three-Day Split" titleKo="3일 분할" />
        <div style={styles.splitList}>
          {Object.entries(PROGRAM).map(([key, day], idx) => (
            <div key={key} style={styles.splitRow} onClick={() => onSelectDay(key)}>
              <div style={styles.splitChapter}>{day.chapter}</div>
              <div style={styles.splitMain}>
                <div style={styles.splitDay}>{day.day}</div>
                <div style={styles.splitContent}>
                  <div style={styles.splitName}>{day.name}</div>
                  <div style={styles.splitSubtitle}>{day.subtitleKo}</div>
                </div>
              </div>
              <div style={styles.splitArrow}>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === 푸터 === */}
      <div style={styles.footer}>
        <div style={styles.footerOrnament}>※ ✦ ※</div>
        <div style={styles.footerText}>BASED ON ACSM 2026 POSITION STAND</div>
        <div style={styles.footerSub}>For the dedicated practitioner</div>
      </div>
    </div>
  );
}

// ====== 보조 컴포넌트 ======
function UnitToggle({ unit, onChange }) {
  return (
    <div style={styles.unitToggle}>
      <button
        style={{
          ...styles.unitToggleBtn,
          ...(unit === "kg" ? styles.unitToggleBtnActive : {}),
        }}
        onClick={() => onChange("kg")}
      >
        KG
      </button>
      <button
        style={{
          ...styles.unitToggleBtn,
          ...(unit === "lb" ? styles.unitToggleBtnActive : {}),
        }}
        onClick={() => onChange("lb")}
      >
        LB
      </button>
    </div>
  );
}

function SectionHeader({ number, title, titleKo }) {
  return (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionNumber}>{number}</div>
      <div style={styles.sectionTitleWrap}>
        <div style={styles.sectionTitle}>{titleKo}</div>
        <div style={styles.sectionTitleKo}>{title}</div>
      </div>
      <div style={styles.sectionLine} />
    </div>
  );
}

function StatCell({ label, value, unit }) {
  return (
    <div style={styles.statCell}>
      <div style={styles.statCellLabel}>{label}</div>
      <div style={styles.statCellValue}>{value}</div>
      <div style={styles.statCellUnit}>{unit}</div>
    </div>
  );
}

function SummaryCard({ label, value, suffix }) {
  return (
    <div style={styles.summaryCard}>
      <CornerMarks color="#8b7d65" />
      <div style={styles.summaryInner}>
        <div style={styles.summaryLabel}>{label}</div>
        <div style={styles.summaryValue}>{value}</div>
        <div style={styles.summarySuffix}>{suffix}</div>
      </div>
    </div>
  );
}

// ====== 운동 일자 화면 ======
function WorkoutView({ dayKey, day, history, unit, onBack, onSelectExercise }) {
  const totalExercises = day.groups.reduce((s, g) => s + g.exercises.length, 0);
  const completedToday = day.groups.reduce((s, g) => {
    return s + g.exercises.filter(ex => {
      const sessions = history[ex.id] || [];
      const last = sessions[sessions.length - 1];
      if (!last) return false;
      return new Date(last.date).toDateString() === new Date().toDateString();
    }).length;
  }, 0);

  return (
    <div style={styles.workoutPage}>
      {/* 매거진식 챕터 헤더 */}
      <div style={styles.dayHeader}>
        <button style={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={18} />
          <span style={styles.backLabel}>BACK</span>
        </button>
        <div style={styles.dayHeaderInner}>
          <div style={styles.chapterMark}>CHAPTER {day.chapter}</div>
          <div style={styles.dayDivider} />
          <div style={styles.dayHeroName}>{day.name}</div>
          <div style={styles.dayHeroSub}>{day.subtitle}</div>
          <div style={styles.dayDivider} />
          <div style={styles.dayProgressRow}>
            <div style={styles.dayProgressLabel}>SESSION PROGRESS</div>
            <div style={styles.dayProgressBar}>
              <div style={{ ...styles.dayProgressFill, width: `${(completedToday / totalExercises) * 100}%` }} />
            </div>
            <div style={styles.dayProgressText}>{completedToday}/{totalExercises}</div>
          </div>
        </div>
      </div>

      <div style={styles.exerciseList}>
        {day.groups.map((group, gi) => (
          <div key={gi} style={styles.muscleGroup}>
            <div style={styles.muscleGroupHeader}>
              <div style={styles.muscleNumber}>{String(gi + 1).padStart(2, "0")}</div>
              <div style={styles.muscleNameWrap}>
                <div style={styles.muscleName}>{group.muscle}</div>
                <div style={styles.muscleNameKo}>{group.muscleKo}</div>
              </div>
              <div style={styles.muscleSetsBadge}>12 SETS</div>
            </div>

            {group.exercises.map((ex, ei) => {
              const sessions = history[ex.id] || [];
              const last = sessions[sessions.length - 1];
              const isToday = last && new Date(last.date).toDateString() === new Date().toDateString();
              const suggestion = getProgressionSuggestion(sessions, ex, unit);

              return (
                <div
                  key={ex.id}
                  style={{ ...styles.exerciseCard, opacity: isToday ? 0.55 : 1 }}
                  onClick={() => onSelectExercise(ex)}
                >
                  <div style={styles.exerciseCardLeft}>
                    <div style={styles.exerciseIndex}>{String(ei + 1).padStart(2, "0")}</div>
                  </div>
                  <div style={styles.exerciseCardMain}>
                    <div style={styles.exerciseTopRow}>
                      <div style={styles.exerciseName}>
                        {ex.nameKo}
                        {isToday && <Check size={12} style={{ marginLeft: 6, color: "#6b7d4f" }} />}
                      </div>
                    </div>
                    <div style={styles.exerciseNameEn}>{ex.name}</div>
                    <div style={styles.exerciseMetaRow}>
                      <span style={styles.metaPill}>{ex.sets}×{ex.reps}</span>
                      <span style={styles.metaPill}>RPE {ex.rpe}</span>
                      <span style={styles.metaPill}>{ex.rest}</span>
                    </div>
                    {suggestion.suggestedWeight !== null && (
                      <div style={styles.exerciseSuggestion}>
                        <TrendingUp size={11} />
                        <span>NEXT · {suggestion.suggestedWeightDisplay}{unitLabel(unit)}</span>
                        {suggestion.type === "increase" && <span style={styles.suggestionUp}>↑</span>}
                      </div>
                    )}
                  </div>
                  <div style={styles.exerciseCardRight}>
                    <ChevronRight size={14} color="#8b7d65" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== 운동 기록 화면 ======
function ExerciseView({ exercise, dayKey, day, history, unit, onUpdateUnit, onBack, onSave, onDelete }) {
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
    // 현재 표시값(unit) → kg → 새 단위(newUnit)으로 환산
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

  return (
    <div style={styles.exercisePage}>
      {/* 헤더 */}
      <div style={styles.exHeader}>
        <button style={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={18} />
          <span style={styles.backLabel}>BACK</span>
        </button>
        <div style={styles.exHeaderContent}>
          <div style={styles.exTypeRow}>
            <span style={styles.exType}>
              {exercise.type === "compound" ? "◆ COMPOUND" : "◇ ISOLATION"}
            </span>
            <span style={styles.exChapter}>CH. {day.chapter}</span>
          </div>
          <div style={styles.exTitleKo}>{exercise.nameKo}</div>
          <div style={styles.exTitleEn}>{exercise.name}</div>
          <div style={styles.exTargetGrid}>
            <div style={styles.exTargetCell}>
              <div style={styles.exTargetLabel}>SETS</div>
              <div style={styles.exTargetValue}>{exercise.sets}</div>
            </div>
            <div style={styles.exTargetCell}>
              <div style={styles.exTargetLabel}>REPS</div>
              <div style={styles.exTargetValue}>{exercise.reps}</div>
            </div>
            <div style={styles.exTargetCell}>
              <div style={styles.exTargetLabel}>RPE</div>
              <div style={styles.exTargetValue}>{exercise.rpe}</div>
            </div>
            <div style={styles.exTargetCell}>
              <div style={styles.exTargetLabel}>REST</div>
              <div style={styles.exTargetValueSmall}>{exercise.rest}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 점진적 과부하 카드 */}
      {suggestion.suggestedWeight !== null && (
        <div style={styles.suggestionCard}>
          <CornerMarks color="#8b7d65" />
          <div style={styles.suggestionInner}>
            <div style={styles.suggestionTopRow}>
              <TrendingUp size={14} color="#6b7d4f" />
              <span style={styles.suggestionTitle}>PROGRESSION COACH</span>
              <span style={styles.suggestionTag}>AI</span>
            </div>
            <div style={styles.suggestionMessage}>{suggestion.messageKo}</div>
            {suggestion.previousWeight !== undefined && (
              <div style={styles.suggestionStats}>
                <div style={styles.suggestionPrev}>
                  <div style={styles.suggestionPrevLabel}>PREVIOUS</div>
                  <div style={styles.suggestionPrevValue}>{suggestion.previousWeightDisplay}<span style={styles.kgSmall}>{unitLabel(unit)}</span></div>
                </div>
                <div style={styles.suggestionArrow}>
                  <span style={styles.arrowLine} />
                  <span style={styles.arrowHead}>▶</span>
                </div>
                <div style={styles.suggestionNext}>
                  <div style={styles.suggestionNextLabel}>RECOMMENDED</div>
                  <div style={styles.suggestionNextValue}>{suggestion.suggestedWeightDisplay}<span style={styles.kgSmall}>{unitLabel(unit)}</span></div>
                </div>
              </div>
            )}
            <button style={styles.applyBtn} onClick={() => fillAll(suggestion.suggestedWeightDisplay)}>
              APPLY TO ALL SETS
            </button>
          </div>
        </div>
      )}

      {suggestion.type === "start" && (
        <div style={styles.startCard}>
          <CornerMarks color="#8b7d65" />
          <div style={styles.startInner}>
            <div style={styles.startTitle}>FIRST SESSION</div>
            <div style={styles.startMsg}>편안하게 들 수 있는 무게로 시작하세요. 다음 세션부터 자동으로 최적 무게를 추천해드립니다.</div>
          </div>
        </div>
      )}

      {/* 쉬는시간 타이머 */}
      <RestTimer />

      {/* 세트 입력 */}
      <div style={styles.setsBlock}>
        <div style={styles.setsBlockHeader}>
          <div style={styles.setsBlockTitleWrap}>
            <div style={styles.setsBlockTitle}>TODAY'S SETS</div>
            <div style={styles.setsBlockSub}>오늘의 세트 · 휴식 {exercise.rest}</div>
          </div>
          <UnitToggle unit={unit} onChange={handleUnitChange} />
        </div>
        <div style={styles.setsTable}>
          <div style={styles.setsTableHeader}>
            <div style={styles.setsHeadIdx}>SET</div>
            <div style={styles.setsHeadCell}>WEIGHT · {unitLabel(unit).toUpperCase()}</div>
            <div style={styles.setsHeadCell}>REPS</div>
          </div>
          {sets.map((set, idx) => (
            <div key={idx} style={styles.setRow}>
              <div style={styles.setRowIdx}>{String(idx + 1).padStart(2, "0")}</div>
              <div style={styles.setRowInputs}>
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSet(idx, "weight", e.target.value)}
                  style={styles.setInput}
                  placeholder="—"
                  inputMode="decimal"
                />
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) => updateSet(idx, "reps", e.target.value)}
                  style={styles.setInput}
                  placeholder="—"
                  inputMode="numeric"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        style={{ ...styles.saveBtn, opacity: sets.some(s => s.weight && s.reps) ? 1 : 0.4 }}
        onClick={handleSave}
        disabled={!sets.some(s => s.weight && s.reps)}
      >
        <span>RECORD SESSION</span>
        <span style={styles.saveBtnArrow}>→</span>
      </button>

      {/* 히스토리 */}
      {history.length > 0 && (
        <div style={styles.historyBlock}>
          <button style={styles.historyToggle} onClick={() => setShowHistory(!showHistory)}>
            <Calendar size={13} />
            <span style={styles.historyToggleLabel}>PREVIOUS RECORDS · {history.length}</span>
            <ChevronRight size={13} style={{ transform: showHistory ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {showHistory && (
            <div style={styles.historyList}>
              {[...history].reverse().map((session, idx) => {
                const realIdx = history.length - 1 - idx;
                const date = new Date(session.date);
                // 볼륨은 kg 기준으로 계산 후 unit으로 환산
                const volumeKg = session.sets.reduce((s, set) => s + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0), 0);
                const volumeDisplay = unit === "lb"
                  ? Math.round(volumeKg * LBS_PER_KG)
                  : Math.round(volumeKg);
                return (
                  <div key={idx} style={styles.historyCard}>
                    <CornerMarks color="#8b7d65" />
                    <div style={styles.historyCardInner}>
                      <div style={styles.historyTopRow}>
                        <div style={styles.historyDate}>
                          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
                          <span style={styles.historyDay}>{date.toLocaleDateString("ko-KR", { weekday: "short" })}</span>
                        </div>
                        <button style={styles.historyDelete} onClick={() => onDelete(realIdx)}>
                          <Trash2 size={11} />
                        </button>
                      </div>
                      <div style={styles.historySetGrid}>
                        {session.sets.map((set, si) => (
                          <div key={si} style={styles.historySetItem}>
                            <span style={styles.historySetNum}>S{si + 1}</span>
                            <span style={styles.historySetVal}>{toDisplay(set.weight, unit)}<span style={styles.kgTiny}>{unitLabel(unit)}</span> × {set.reps}</span>
                          </div>
                        ))}
                      </div>
                      <div style={styles.historyVolumeRow}>
                        <span style={styles.historyVolLabel}>TOTAL VOLUME</span>
                        <span style={styles.historyVolValue}>{volumeDisplay.toLocaleString()}<span style={styles.kgTiny}>{unitLabel(unit)}</span></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
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
          // 타이머 종료 → 완료 알림 표시
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

  // 타이머 상태에 따른 색상
  const digitColor = done
    ? COLOR.accentGreen
    : running
    ? COLOR.accentBrass
    : COLOR.textDark;

  return (
    <>
      {/* 타이머 완료 시 전체화면 알림 (소리 없음) */}
      {done && (
        <div style={styles.timerDoneOverlay} onClick={() => setDone(false)}>
          <div style={styles.timerDoneBox}>
            <div style={styles.timerDoneMark}>◆</div>
            <div style={styles.timerDoneTitle}>휴식 완료</div>
            <div style={styles.timerDoneSub}>REST COMPLETE</div>
            <div style={styles.timerDoneTap}>화면을 탭하여 닫기</div>
          </div>
        </div>
      )}

      <div style={styles.timerBlock}>
        {/* 헤더 */}
        <div style={styles.timerHeader}>
          <div style={styles.timerLabel}>REST TIMER</div>
          <div style={styles.timerLabelKo}>쉬는시간 타이머</div>
        </div>

        {/* 카운트다운 표시 */}
        <div style={styles.timerDisplay}>
          <span style={{ ...styles.timerDigits, color: digitColor }}>
            {mm}:{ss}
          </span>
        </div>

        {/* 시간 추가 버튼 */}
        <div style={styles.timerAddRow}>
          <button style={styles.timerAddBtn} onClick={() => addTime(10)}>
            +10초
          </button>
          <button style={styles.timerAddBtn} onClick={() => addTime(60)}>
            +1분
          </button>
        </div>

        {/* 시작/일시정지 + 리셋 */}
        <div style={styles.timerControlRow}>
          <button
            style={{ ...styles.timerStartBtn, opacity: seconds === 0 ? 0.35 : 1 }}
            onClick={toggleRun}
            disabled={seconds === 0}
          >
            {running ? "일시정지" : "시작"}
          </button>
          <button style={styles.timerResetBtn} onClick={reset}>
            리셋
          </button>
        </div>
      </div>
    </>
  );
}

// ====== 글로벌 CSS (애니메이션 등) ======
const globalCSS = `
  /* 인풋 placeholder color */
  input::placeholder { color: #c9c0aa; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
`;

// ====== 색상 토큰 ======
const COLOR = {
  // 배경
  bgPaper: "#ebe5d7",        // 카키 베이지 (종이 톤)
  bgPaperDeep: "#dfd7c4",    // 진한 카키 베이지
  bgDark: "#1f1c17",         // 거의 블랙 (따뜻한 톤)
  bgDarkDeep: "#0f0d0a",     // 완전 블랙
  // 카키
  khakiLight: "#a8a087",
  khakiMid: "#7a7359",
  khakiDeep: "#5a5240",
  // 브라운
  brownLight: "#a08766",
  brownMid: "#735a3f",
  brownDeep: "#4a3823",
  // 액센트
  accentGreen: "#6b7d4f",    // 올리브 그린 (액센트)
  accentBrass: "#a89060",    // 황동 골드 (액센트)
  // 텍스트
  textDark: "#1f1c17",
  textMid: "#5a5240",
  textMute: "#8b7d65",
  textLight: "#bfb39c",
  // 라인
  line: "#c9c0aa",
  lineLight: "#d8d1bc",
};

// ====== 스타일 ======
const styles = {
  // === LOADING ===
  loadingScreen: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: COLOR.bgDark,
    color: COLOR.bgPaper,
    gap: "16px",
  },
  loadingMark: {
    fontSize: "32px",
    color: COLOR.accentBrass,
    animation: "pulse 1.8s ease-in-out infinite",
  },
  loadingText: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "14px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
  },

  // === CONTAINER ===
  container: {
    fontFamily: "'KakaoBigFont', sans-serif",
    background: `
      radial-gradient(ellipse at top, #f0eadc 0%, ${COLOR.bgPaper} 50%, ${COLOR.bgPaperDeep} 100%)
    `,
    minHeight: "100vh",
    color: COLOR.textDark,
    paddingBottom: "calc(40px + env(safe-area-inset-bottom, 0px))",
    position: "relative",
    overflow: "hidden",
  },
  noise: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity: 0.35,
    mixBlendMode: "multiply",
    zIndex: 0,
  },

  // === INSTALL HINT (iOS PWA) ===
  installHint: {
    position: "fixed",
    bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
    left: "16px",
    right: "16px",
    zIndex: 100,
    background: `linear-gradient(180deg, ${COLOR.bgDark} 0%, ${COLOR.bgDarkDeep} 100%)`,
    borderRadius: "2px",
    border: `1px solid ${COLOR.brownDeep}`,
    boxShadow: "0 12px 32px -8px rgba(15, 13, 10, 0.5)",
    animation: "fadeUp 0.5s ease",
  },
  installHintInner: {
    padding: "16px 18px",
    color: COLOR.bgPaper,
  },
  installHintHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  installHintTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "15px",
    letterSpacing: "-0.02em",
    color: COLOR.accentBrass,
  },
  installHintClose: {
    color: COLOR.khakiLight,
    fontSize: "22px",
    lineHeight: 1,
    padding: "0 4px",
    fontWeight: 300,
  },
  installHintBody: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.6,
    color: COLOR.khakiLight,
  },
  installHintIcon: {
    display: "inline-block",
    fontSize: "13px",
    color: COLOR.accentBrass,
    fontWeight: 700,
    margin: "0 2px",
  },
  installHintBold: {
    color: COLOR.bgPaper,
    fontWeight: 700,
  },

  // === MAGAZINE HEADER ===
  home: {
    padding: "calc(16px + env(safe-area-inset-top, 0px)) 20px 0",
    animation: "fadeUp 0.5s ease",
    position: "relative",
    zIndex: 1,
  },
  magazineHeader: {
    paddingTop: "16px",
    paddingBottom: "32px",
  },
  headerTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  dateLabel: {
    fontSize: "9px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  issueLabel: {
    fontSize: "9px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  divider: {
    height: "1px",
    background: COLOR.khakiDeep,
    opacity: 0.5,
  },
  titleBlock: {
    textAlign: "center",
    padding: "20px 0 16px",
  },
  titleSerif: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "48px",
    color: COLOR.textDark,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    marginBottom: "10px",
  },
  titleEn: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 400,
    fontSize: "11px",
    color: COLOR.accentBrass,
    letterSpacing: "0.5em",
    paddingLeft: "0.5em",
    marginBottom: "10px",
  },
  titleSub: {
    fontSize: "10px",
    letterSpacing: "0.4em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
  },
  headerBottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },
  tagline: {
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.textMute,
    fontWeight: 500,
  },

  // === SECTION ===
  section: {
    marginBottom: "32px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  sectionNumber: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "20px",
    color: COLOR.accentBrass,
    fontWeight: 500,
  },
  sectionTitleWrap: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  sectionTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: COLOR.textDark,
    letterSpacing: "-0.02em",
  },
  sectionTitleKo: {
    fontSize: "9px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 400,
  },
  sectionLine: {
    flex: 1,
    height: "1px",
    background: COLOR.line,
  },

  // === STATS CARD ===
  statsCard: {
    background: `linear-gradient(135deg, #f5efdf 0%, ${COLOR.bgPaper} 100%)`,
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
    position: "relative",
    boxShadow: "0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 16px -8px rgba(31, 28, 23, 0.15)",
  },
  statsCardInner: {
    padding: "20px 18px",
  },
  statsTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: `1px dashed ${COLOR.line}`,
  },
  statsTopRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  // UnitToggle
  unitToggle: {
    display: "inline-flex",
    border: `1px solid ${COLOR.khakiMid}`,
    borderRadius: "1px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.3)",
  },
  unitToggleBtn: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "9px",
    letterSpacing: "0.15em",
    fontWeight: 600,
    padding: "5px 9px",
    color: COLOR.textMute,
    background: "transparent",
    transition: "all 0.15s ease",
  },
  unitToggleBtnActive: {
    background: COLOR.bgDark,
    color: COLOR.accentBrass,
  },
  statsLabel: {
    fontSize: "9px",
    letterSpacing: "0.3em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
  },
  editBtn: {
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.brownMid,
    fontWeight: 600,
    padding: "5px 10px",
    border: `1px solid ${COLOR.brownMid}`,
    borderRadius: "1px",
    background: "transparent",
  },
  statsGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statCell: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statCellLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 600,
  },
  statCellValue: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "32px",
    color: COLOR.textDark,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  statCellUnit: {
    fontSize: "8px",
    letterSpacing: "0.2em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  vDivider: {
    width: "1px",
    height: "40px",
    background: COLOR.line,
  },
  statsEditWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  statsInputRow: {
    display: "flex",
    gap: "12px",
  },
  statsInputWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statsInputLabel: {
    fontSize: "8px",
    letterSpacing: "0.2em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
  },
  statsInput: {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${COLOR.khakiMid}`,
    borderRadius: "1px",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "'KakaoBigFont', sans-serif",
    background: "rgba(255,255,255,0.4)",
    outline: "none",
    color: COLOR.textDark,
  },
  saveStatsBtn: {
    background: COLOR.bgDark,
    color: COLOR.bgPaper,
    padding: "12px",
    borderRadius: "1px",
    fontWeight: 600,
    fontSize: "10px",
    letterSpacing: "0.3em",
  },

  // === SUMMARY ===
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },
  summaryCard: {
    position: "relative",
    background: "rgba(255,255,255,0.35)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
  },
  summaryInner: {
    padding: "14px 10px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
  },
  summaryValue: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "28px",
    color: COLOR.textDark,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  summarySuffix: {
    fontSize: "8px",
    letterSpacing: "0.15em",
    color: COLOR.textMute,
    fontWeight: 500,
    textTransform: "uppercase",
  },

  // === TODAY CARD ===
  todayCard: {
    background: `linear-gradient(170deg, ${COLOR.bgDark} 0%, ${COLOR.bgDarkDeep} 100%)`,
    color: COLOR.bgPaper,
    borderRadius: "2px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 12px 32px -8px rgba(15, 13, 10, 0.45)",
    border: `1px solid ${COLOR.brownDeep}`,
  },
  todayInner: {
    padding: "28px 24px",
    position: "relative",
  },
  todayChapter: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.3em",
    color: COLOR.accentBrass,
    fontWeight: 500,
    marginBottom: "10px",
  },
  todayName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "56px",
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    marginBottom: "8px",
    color: COLOR.bgPaper,
  },
  todayItalic: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "16px",
    fontWeight: 400,
    color: COLOR.khakiLight,
    marginBottom: "16px",
  },
  todayDivider: {
    height: "1px",
    background: `linear-gradient(90deg, ${COLOR.accentBrass} 0%, transparent 100%)`,
    marginBottom: "16px",
  },
  todayMeta: {
    display: "flex",
    gap: "8px",
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.khakiLight,
    fontWeight: 500,
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  todayCta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: `1px dashed ${COLOR.khakiDeep}`,
    fontSize: "10px",
    letterSpacing: "0.25em",
    fontWeight: 600,
    color: COLOR.accentBrass,
  },

  // === SPLIT LIST ===
  splitList: {
    display: "flex",
    flexDirection: "column",
  },
  splitRow: {
    background: "rgba(255,255,255,0.25)",
    border: `1px solid ${COLOR.line}`,
    borderBottom: "none",
    padding: "16px 14px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
  },
  splitChapter: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "22px",
    color: COLOR.accentBrass,
    fontWeight: 500,
    width: "32px",
    textAlign: "center",
  },
  splitMain: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  splitDay: {
    fontSize: "10px",
    letterSpacing: "0.25em",
    color: COLOR.khakiDeep,
    fontWeight: 700,
    width: "30px",
  },
  splitContent: {
    flex: 1,
  },
  splitName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    letterSpacing: "-0.02em",
    color: COLOR.textDark,
    lineHeight: 1,
    marginBottom: "4px",
  },
  splitSubtitle: {
    fontSize: "10px",
    letterSpacing: "0.1em",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  splitArrow: {
    color: COLOR.khakiDeep,
  },

  // === FOOTER ===
  footer: {
    marginTop: "40px",
    paddingTop: "28px",
    textAlign: "center",
    borderTop: `1px solid ${COLOR.line}`,
  },
  footerOrnament: {
    color: COLOR.accentBrass,
    fontSize: "12px",
    letterSpacing: "0.5em",
    marginBottom: "10px",
  },
  footerText: {
    fontSize: "9px",
    letterSpacing: "0.25em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
    marginBottom: "6px",
  },
  footerSub: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "11px",
    color: COLOR.textMute,
  },

  // === WORKOUT PAGE ===
  workoutPage: {
    animation: "fadeUp 0.5s ease",
    position: "relative",
    zIndex: 1,
  },
  dayHeader: {
    background: `linear-gradient(180deg, ${COLOR.bgDark} 0%, ${COLOR.bgDarkDeep} 100%)`,
    color: COLOR.bgPaper,
    padding: "calc(16px + env(safe-area-inset-top, 0px)) 20px 32px",
    position: "relative",
    overflow: "hidden",
  },
  backBtn: {
    color: COLOR.khakiLight,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "8px 0",
    fontSize: "10px",
    letterSpacing: "0.2em",
    fontWeight: 600,
    marginBottom: "8px",
  },
  backLabel: {
    color: COLOR.khakiLight,
  },
  dayHeaderInner: {
    paddingTop: "8px",
  },
  chapterMark: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.3em",
    color: COLOR.accentBrass,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: "10px",
  },
  dayDivider: {
    height: "1px",
    background: `linear-gradient(90deg, transparent 0%, ${COLOR.khakiDeep} 50%, transparent 100%)`,
    margin: "12px 0",
  },
  dayHeroName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "60px",
    letterSpacing: "-0.05em",
    lineHeight: 0.9,
    color: COLOR.bgPaper,
    textAlign: "center",
    marginBottom: "8px",
  },
  dayHeroSub: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "14px",
    fontWeight: 400,
    color: COLOR.khakiLight,
    textAlign: "center",
  },
  dayProgressRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  dayProgressLabel: {
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.khakiLight,
    fontWeight: 600,
  },
  dayProgressBar: {
    flex: 1,
    height: "1px",
    background: COLOR.khakiDeep,
    position: "relative",
  },
  dayProgressFill: {
    position: "absolute",
    top: "-2px",
    left: 0,
    height: "5px",
    background: COLOR.accentBrass,
    transition: "width 0.4s ease",
  },
  dayProgressText: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    fontWeight: 700,
    color: COLOR.accentBrass,
  },

  // === EXERCISE LIST ===
  exerciseList: {
    padding: "24px 20px",
  },
  muscleGroup: {
    marginBottom: "28px",
  },
  muscleGroupHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "12px",
    paddingBottom: "10px",
    borderBottom: `1px solid ${COLOR.line}`,
  },
  muscleNumber: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "16px",
    color: COLOR.accentBrass,
    fontWeight: 500,
  },
  muscleNameWrap: {
    flex: 1,
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  muscleName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    letterSpacing: "-0.02em",
    color: COLOR.textDark,
  },
  muscleNameKo: {
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  muscleSetsBadge: {
    fontSize: "9px",
    letterSpacing: "0.25em",
    color: COLOR.brownMid,
    fontWeight: 600,
    padding: "3px 8px",
    border: `1px solid ${COLOR.brownLight}`,
    borderRadius: "1px",
  },
  exerciseCard: {
    background: "rgba(255,255,255,0.3)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
    padding: "14px 12px",
    marginBottom: "8px",
    cursor: "pointer",
    display: "flex",
    gap: "12px",
    alignItems: "stretch",
  },
  exerciseCardLeft: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "2px",
  },
  exerciseIndex: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "14px",
    color: COLOR.accentBrass,
    fontWeight: 500,
    width: "20px",
    textAlign: "center",
  },
  exerciseCardMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  exerciseTopRow: {
    display: "flex",
    alignItems: "center",
  },
  exerciseName: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    color: COLOR.textDark,
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
  },
  exerciseNameEn: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "11px",
    color: COLOR.textMute,
    fontWeight: 400,
  },
  exerciseMetaRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "4px",
  },
  metaPill: {
    fontSize: "9px",
    letterSpacing: "0.1em",
    color: COLOR.khakiDeep,
    fontWeight: 600,
    padding: "2px 6px",
    background: "rgba(168, 144, 96, 0.12)",
    borderRadius: "1px",
  },
  exerciseSuggestion: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "6px",
    paddingTop: "8px",
    borderTop: `1px dashed ${COLOR.line}`,
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: COLOR.accentGreen,
    fontWeight: 600,
  },
  suggestionUp: {
    marginLeft: "auto",
    color: COLOR.accentBrass,
  },
  exerciseCardRight: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "4px",
  },

  // === EXERCISE PAGE ===
  exercisePage: {
    animation: "fadeUp 0.5s ease",
    paddingBottom: "40px",
    position: "relative",
    zIndex: 1,
  },
  exHeader: {
    background: `linear-gradient(180deg, ${COLOR.bgDark} 0%, ${COLOR.bgDarkDeep} 100%)`,
    color: COLOR.bgPaper,
    padding: "calc(16px + env(safe-area-inset-top, 0px)) 20px 28px",
  },
  exHeaderContent: {
    paddingTop: "8px",
  },
  exTypeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  exType: {
    fontSize: "9px",
    letterSpacing: "0.3em",
    color: COLOR.accentBrass,
    fontWeight: 600,
  },
  exChapter: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    color: COLOR.khakiLight,
    fontWeight: 500,
  },
  exTitleKo: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "32px",
    letterSpacing: "-0.04em",
    lineHeight: 1.05,
    color: COLOR.bgPaper,
    marginBottom: "4px",
  },
  exTitleEn: {
    fontFamily: "\'Geist Mono\', monospace",
    fontSize: "14px",
    fontWeight: 400,
    color: COLOR.khakiLight,
    marginBottom: "20px",
  },
  exTargetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: COLOR.khakiDeep,
    border: `1px solid ${COLOR.khakiDeep}`,
  },
  exTargetCell: {
    background: COLOR.bgDark,
    padding: "10px 6px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  exTargetLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.khakiLight,
    fontWeight: 600,
  },
  exTargetValue: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 800,
    fontSize: "20px",
    color: COLOR.accentBrass,
    lineHeight: 1,
  },
  exTargetValueSmall: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 600,
    fontSize: "13px",
    color: COLOR.accentBrass,
    lineHeight: 1.2,
  },

  // === SUGGESTION CARD ===
  suggestionCard: {
    margin: "20px",
    background: `linear-gradient(135deg, #f0eadc 0%, ${COLOR.bgPaper} 100%)`,
    border: `1px solid ${COLOR.khakiMid}`,
    borderRadius: "2px",
    position: "relative",
    boxShadow: "0 1px 0 rgba(255,255,255,0.5) inset, 0 6px 20px -10px rgba(31, 28, 23, 0.2)",
  },
  suggestionInner: {
    padding: "18px",
  },
  suggestionTopRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
    paddingBottom: "10px",
    borderBottom: `1px dashed ${COLOR.line}`,
  },
  suggestionTitle: {
    fontSize: "9px",
    letterSpacing: "0.3em",
    color: COLOR.khakiDeep,
    fontWeight: 700,
    flex: 1,
  },
  suggestionTag: {
    fontSize: "8px",
    letterSpacing: "0.2em",
    color: COLOR.bgPaper,
    fontWeight: 700,
    background: COLOR.accentGreen,
    padding: "2px 6px",
    borderRadius: "1px",
  },
  suggestionMessage: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: COLOR.textDark,
    marginBottom: "16px",
    letterSpacing: "-0.01em",
  },
  suggestionStats: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  suggestionPrev: {
    flex: 1,
  },
  suggestionPrevLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 600,
    marginBottom: "4px",
  },
  suggestionPrevValue: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "26px",
    fontWeight: 600,
    color: COLOR.textMute,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    textDecoration: "line-through",
    textDecorationColor: COLOR.textLight,
  },
  kgSmall: {
    fontSize: "12px",
    fontWeight: 500,
    marginLeft: "2px",
    color: COLOR.textMute,
  },
  suggestionArrow: {
    display: "flex",
    alignItems: "center",
    color: COLOR.accentBrass,
    fontSize: "10px",
    gap: "2px",
  },
  arrowLine: {
    display: "inline-block",
    width: "16px",
    height: "1px",
    background: COLOR.accentBrass,
  },
  arrowHead: {
    fontSize: "8px",
  },
  suggestionNext: {
    flex: 1,
  },
  suggestionNextLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.brownMid,
    fontWeight: 700,
    marginBottom: "4px",
  },
  suggestionNextValue: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "32px",
    fontWeight: 800,
    color: COLOR.bgDark,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  applyBtn: {
    width: "100%",
    background: COLOR.bgDark,
    color: COLOR.bgPaper,
    padding: "12px",
    borderRadius: "1px",
    fontSize: "10px",
    letterSpacing: "0.3em",
    fontWeight: 600,
    border: `1px solid ${COLOR.bgDark}`,
  },

  // === START CARD ===
  startCard: {
    margin: "20px",
    background: "rgba(255,255,255,0.4)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
    position: "relative",
  },
  startInner: {
    padding: "18px",
  },
  startTitle: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "16px",
    fontWeight: 700,
    color: COLOR.textDark,
    marginBottom: "8px",
  },
  startMsg: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontSize: "13px",
    color: COLOR.textMid,
    lineHeight: 1.6,
  },

  // === SETS ===
  setsBlock: {
    margin: "20px",
  },
  setsBlockHeader: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px",
    borderBottom: `1px solid ${COLOR.line}`,
    gap: "12px",
  },
  setsBlockTitleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  setsBlockTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontSize: "20px",
    fontWeight: 800,
    color: COLOR.textDark,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  setsBlockSub: {
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.textMute,
    fontWeight: 600,
  },
  setsTable: {
    background: "rgba(255,255,255,0.3)",
    border: `1px solid ${COLOR.line}`,
  },
  setsTableHeader: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 1fr",
    background: COLOR.khakiDeep,
    color: COLOR.bgPaper,
  },
  setsHeadIdx: {
    padding: "8px 12px",
    fontSize: "9px",
    letterSpacing: "0.25em",
    fontWeight: 600,
    textAlign: "center",
  },
  setsHeadCell: {
    padding: "8px 12px",
    fontSize: "9px",
    letterSpacing: "0.2em",
    fontWeight: 600,
    borderLeft: `1px solid ${COLOR.bgPaperDeep}33`,
  },
  setRow: {
    display: "grid",
    gridTemplateColumns: "60px 1fr",
    borderTop: `1px solid ${COLOR.line}`,
  },
  setRowIdx: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "16px",
    fontWeight: 500,
    color: COLOR.accentBrass,
    textAlign: "center",
    padding: "14px 0",
    borderRight: `1px solid ${COLOR.line}`,
    background: "rgba(168, 144, 96, 0.06)",
  },
  setRowInputs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  setInput: {
    padding: "14px 12px",
    border: "none",
    fontSize: "20px",
    fontWeight: 700,
    fontFamily: "'Geist Mono', monospace",
    background: "transparent",
    outline: "none",
    color: COLOR.textDark,
    width: "100%",
    textAlign: "center",
    borderLeft: `1px solid ${COLOR.line}`,
    letterSpacing: "-0.02em",
  },

  // === SAVE BUTTON ===
  saveBtn: {
    background: COLOR.bgDark,
    color: COLOR.bgPaper,
    padding: "16px",
    borderRadius: "1px",
    fontSize: "11px",
    letterSpacing: "0.3em",
    fontWeight: 600,
    margin: "0 20px 24px",
    width: "calc(100% - 40px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${COLOR.bgDark}`,
  },
  saveBtnArrow: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "16px",
    color: COLOR.accentBrass,
  },

  // === HISTORY ===
  historyBlock: {
    margin: "0 20px",
  },
  historyToggle: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.3)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "1px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: COLOR.khakiDeep,
  },
  historyToggleLabel: {
    flex: 1,
    textAlign: "left",
    fontSize: "10px",
    letterSpacing: "0.2em",
    fontWeight: 600,
  },
  historyList: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  historyCard: {
    background: "rgba(255,255,255,0.3)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
    position: "relative",
  },
  historyCardInner: {
    padding: "12px 14px",
  },
  historyTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: `1px dashed ${COLOR.line}`,
  },
  historyDate: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: COLOR.textDark,
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  historyDay: {
    fontFamily: "'Geist Mono', monospace",
    fontStyle: "normal",
    fontSize: "9px",
    letterSpacing: "0.2em",
    color: COLOR.textMute,
    fontWeight: 600,
  },
  historyDelete: {
    color: COLOR.textLight,
    padding: "2px",
  },
  historySetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "6px 16px",
    marginBottom: "10px",
  },
  historySetItem: {
    display: "flex",
    gap: "6px",
    alignItems: "baseline",
    fontSize: "12px",
  },
  historySetNum: {
    fontSize: "9px",
    letterSpacing: "0.15em",
    color: COLOR.accentBrass,
    fontWeight: 700,
  },
  historySetVal: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "13px",
    fontWeight: 600,
    color: COLOR.textDark,
  },
  kgTiny: {
    fontSize: "9px",
    color: COLOR.textMute,
    marginLeft: "1px",
  },
  historyVolumeRow: {
    paddingTop: "8px",
    borderTop: `1px dashed ${COLOR.line}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  historyVolLabel: {
    fontSize: "8px",
    letterSpacing: "0.25em",
    color: COLOR.textMute,
    fontWeight: 600,
  },
  historyVolValue: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "14px",
    fontWeight: 700,
    color: COLOR.brownMid,
  },

  // === REST TIMER ===
  timerDoneOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 13, 10, 0.92)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeUp 0.3s ease",
    cursor: "pointer",
  },
  timerDoneBox: {
    textAlign: "center",
    color: COLOR.bgPaper,
    padding: "48px 40px",
  },
  timerDoneMark: {
    fontSize: "48px",
    color: COLOR.accentBrass,
    marginBottom: "20px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  timerDoneTitle: {
    fontFamily: "'KakaoBigFont', sans-serif",
    fontWeight: 800,
    fontSize: "52px",
    letterSpacing: "-0.04em",
    color: COLOR.bgPaper,
    marginBottom: "8px",
    lineHeight: 1,
  },
  timerDoneSub: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.5em",
    color: COLOR.accentBrass,
    marginBottom: "36px",
    paddingLeft: "0.5em",
  },
  timerDoneTap: {
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: COLOR.khakiLight,
    fontWeight: 400,
  },
  timerBlock: {
    margin: "0 20px 24px",
    background: "rgba(255,255,255,0.3)",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "2px",
    padding: "18px",
    position: "relative",
  },
  timerHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "16px",
    paddingBottom: "10px",
    borderBottom: `1px dashed ${COLOR.line}`,
  },
  timerLabel: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.3em",
    fontWeight: 600,
    color: COLOR.khakiDeep,
  },
  timerLabelKo: {
    fontSize: "9px",
    letterSpacing: "0.1em",
    color: COLOR.textMute,
    fontWeight: 500,
  },
  timerDisplay: {
    textAlign: "center",
    marginBottom: "16px",
    lineHeight: 1,
  },
  timerDigits: {
    fontFamily: "'Geist Mono', monospace",
    fontWeight: 800,
    fontSize: "56px",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    transition: "color 0.4s ease",
  },
  timerAddRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "10px",
  },
  timerAddBtn: {
    flex: 1,
    padding: "11px 0",
    border: `1px solid ${COLOR.khakiMid}`,
    borderRadius: "1px",
    fontSize: "14px",
    fontWeight: 700,
    color: COLOR.khakiDeep,
    background: "rgba(255,255,255,0.45)",
    fontFamily: "'KakaoBigFont', sans-serif",
    letterSpacing: "-0.01em",
  },
  timerControlRow: {
    display: "flex",
    gap: "8px",
  },
  timerStartBtn: {
    flex: 1,
    padding: "13px",
    background: COLOR.bgDark,
    color: COLOR.bgPaper,
    borderRadius: "1px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    fontFamily: "'KakaoBigFont', sans-serif",
    transition: "opacity 0.2s ease",
  },
  timerResetBtn: {
    padding: "13px 18px",
    border: `1px solid ${COLOR.line}`,
    borderRadius: "1px",
    fontSize: "12px",
    fontWeight: 600,
    color: COLOR.textMute,
    letterSpacing: "0.1em",
    background: "transparent",
    fontFamily: "'KakaoBigFont', sans-serif",
  },
};
