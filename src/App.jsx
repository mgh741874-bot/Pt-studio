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

const GOAL_COLORS = {
  "다이어트": "#FF6B6B",
  "벌크업": "#4ECDC4",
  "체형교정": "#A8E6CF",
  "재활": "#FFD93D",
  "체력향상": "#74B9FF",
};

const MENU = [
  { id: "dashboard", label: "대시보드", emoji: "🏠" },
  { id: "members", label: "회원 목록", emoji: "👥" },
  { id: "workout", label: "운동 기록", emoji: "🏋️" },
  { id: "diet", label: "식단 관리", emoji: "🥗" },
  { id: "video", label: "운동 영상", emoji: "🎬" },
  { id: "schedule", label: "수업 일정", emoji: "📅" },
];

const MiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
