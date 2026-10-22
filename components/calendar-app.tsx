'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarEvent = { title: string; color: string }

const YEAR = 2026
const TODAY = { month: 10, day: 3 }
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const events: Record<string, CalendarEvent[]> = {
  '2026-06-16': [{ title: '이의리 생일', color: '#f0473a' }],
}

const keyOf = (month: number, day: number) => `${YEAR}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

export function CalendarApp({ onHome }: { onHome: () => void }) {
  const [month, setMonth] = useState(TODAY.month)
  const [selected, setSelected] = useState<{ month: number; day: number }>(TODAY)

  const firstWeekday = new Date(YEAR, month - 1, 1).getDay()
  const daysInMonth = new Date(YEAR, month, 0).getDate()
  const cells = [...Array<number | null>(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7) cells.push(null)
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))

  const selectedEvents = events[keyOf(selected.month, selected.day)] ?? []
  const selectedWeekday = WEEKDAYS[new Date(YEAR, selected.month - 1, selected.day).getDay()]

  const changeMonth = (delta: number) => {
    const next = Math.min(12, Math.max(1, month + delta))
    setMonth(next)
    setSelected(next === TODAY.month ? TODAY : { month: next, day: 1 })
  }

  return <section className="ical" aria-label="캘린더">
    <header className="ical-top">
      <button type="button" className="ical-year" onClick={onHome}><ChevronLeft size={26} />{YEAR}년</button>
      <div className="ical-month-row">
        <h2>{month}월</h2>
        <div>
          <button type="button" aria-label="이전 달" disabled={month === 1} onClick={() => changeMonth(-1)}><ChevronLeft size={28} /></button>
          <button type="button" aria-label="다음 달" disabled={month === 12} onClick={() => changeMonth(1)}><ChevronRight size={28} /></button>
        </div>
      </div>
      <div className="ical-weekdays" aria-hidden="true">{WEEKDAYS.map(d => <span key={d}>{d}</span>)}</div>
    </header>
    <div className="ical-grid" role="grid" aria-label={`${YEAR}년 ${month}월`}>
      {weeks.map((week, w) => <div className="ical-week" role="row" key={w}>
        {week.map((day, i) => {
          if (!day) return <span key={i} className="ical-day is-empty" />
          const isToday = month === TODAY.month && day === TODAY.day
          const isSelected = selected.month === month && selected.day === day
          const dayEvents = events[keyOf(month, day)] ?? []
          const cls = ['ical-day', i === 0 || i === 6 ? 'is-weekend' : '', isToday ? 'is-today' : '', isSelected && !isToday ? 'is-selected' : ''].join(' ')
          return <button type="button" role="gridcell" key={i} className={cls} aria-selected={isSelected} aria-label={`${month}월 ${day}일${dayEvents.length ? `, 일정 ${dayEvents.length}개` : ''}`} onClick={() => setSelected({ month, day })}>
            <span className="ical-num">{day}</span>
            <span className="ical-dots">{dayEvents.map(e => <i key={e.title} style={{ background: e.color }} />)}</span>
          </button>
        })}
      </div>)}
    </div>
    <div className="ical-events">
      <p className="ical-events-date">{selected.month}월 {selected.day}일 {selectedWeekday}요일</p>
      {selectedEvents.length
        ? selectedEvents.map(e => <div className="ical-event" key={e.title}><i style={{ background: e.color }} /><div><strong>{e.title}</strong><span>하루 종일</span></div></div>)
        : <p className="ical-empty">일정 없음</p>}
    </div>
    <nav className="ical-tabs" aria-label="캘린더 메뉴">
      <button type="button" onClick={() => { setMonth(TODAY.month); setSelected(TODAY) }}>오늘</button>
      <button type="button" aria-current="page">캘린더</button>
      <button type="button" disabled>받은 편지함</button>
    </nav>
  </section>
}
