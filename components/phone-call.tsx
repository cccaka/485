'use client'

import { useEffect, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Clock, Grid3x3, Info, Mic, MicOff, Phone, PhoneOff, UserRound, Users, Volume2, X } from 'lucide-react'

export const LOVER = '내사랑 의리형'

type Kind = 'out' | 'in' | 'missed'
type Recent = { name: string; kind: Kind; when: string }

const recents: Recent[] = [
  { name: LOVER, kind: 'out', when: '오전 12:41' },
  { name: LOVER, kind: 'in', when: '오전 12:08' },
  { name: LOVER, kind: 'missed', when: '어제' },
  { name: LOVER, kind: 'out', when: '어제' },
  { name: '윤도현', kind: 'in', when: '어제' },
  { name: LOVER, kind: 'in', when: '어제' },
  { name: LOVER, kind: 'out', when: '어제' },
  { name: '엄마', kind: 'missed', when: '목요일' },
  { name: LOVER, kind: 'out', when: '목요일' },
  { name: LOVER, kind: 'in', when: '목요일' },
  { name: '황동하', kind: 'out', when: '수요일' },
  { name: LOVER, kind: 'missed', when: '수요일' },
  { name: LOVER, kind: 'out', when: '수요일' },
  { name: LOVER, kind: 'in', when: '화요일' },
  { name: '정해영', kind: 'in', when: '화요일' },
  { name: LOVER, kind: 'out', when: '화요일' },
  { name: '엄마', kind: 'out', when: '월요일' },
  { name: LOVER, kind: 'in', when: '월요일' },
  { name: LOVER, kind: 'out', when: '월요일' },
  { name: '윤도현', kind: 'missed', when: '일요일' },
  { name: LOVER, kind: 'in', when: '일요일' },
  { name: LOVER, kind: 'out', when: '일요일' },
  { name: '정서윤', kind: 'in', when: '일요일' },
  { name: LOVER, kind: 'out', when: '일요일' },
]

const contactList = [LOVER, '엄마', '아빠', '윤도현', '정해영', '황동하', '정서윤']

type Tab = 'contacts' | 'recents'

export function PhoneDialer({ onCall }: { onCall: (name: string) => void }) {
  const [tab, setTab] = useState<Tab>('recents')
  const [filter, setFilter] = useState<'all' | 'missed'>('all')
  const list = filter === 'missed' ? recents.filter(r => r.kind === 'missed') : recents

  return <div className="dialer">
    <div className="dialer-body">
      {tab === 'recents' ? <>
        <h2 className="dialer-title">최근 기록</h2>
        <div className="dialer-segment" role="tablist">
          <button role="tab" aria-selected={filter === 'all'} onClick={() => setFilter('all')}>전체</button>
          <button role="tab" aria-selected={filter === 'missed'} onClick={() => setFilter('missed')}>부재중</button>
        </div>
        <ul className="dialer-list">{list.map((r, i) => <li key={i}>
          <button className="dialer-row" onClick={() => onCall(r.name)}>
            <span className={`dialer-kind${r.kind === 'missed' ? ' is-missed' : ''}`} aria-label={r.kind === 'missed' ? '부재중' : r.kind === 'in' ? '수신' : '발신'}>{r.kind === 'missed' ? <X size={14} /> : r.kind === 'in' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}</span>
            <span className="dialer-name"><strong className={r.kind === 'missed' ? 'is-missed' : ''}>{r.name}</strong><small>휴대전화</small></span>
            <span className="dialer-when">{r.when}</span>
            <Info size={18} className="dialer-info" aria-hidden="true" />
          </button>
        </li>)}</ul>
      </> : <>
        <h2 className="dialer-title">연락처</h2>
        <ul className="dialer-list">{contactList.map(name => <li key={name}>
          <button className="dialer-row" onClick={() => onCall(name)}>
            <span className="dialer-avatar" aria-hidden="true">{name === LOVER ? '의' : name[0]}</span>
            <span className="dialer-name"><strong>{name}</strong></span>
          </button>
        </li>)}</ul>
      </>}
    </div>
    <nav className="dialer-tabs" aria-label="전화 탭">
      <button aria-current={tab === 'contacts'} onClick={() => setTab('contacts')}><Users size={22} /><span>연락처</span></button>
      <button aria-current={tab === 'recents'} onClick={() => setTab('recents')}><Clock size={22} /><span>최근 기록</span></button>
      <button disabled aria-disabled="true"><Grid3x3 size={22} /><span>키패드</span></button>
    </nav>
  </div>
}

export function CallScreen({ name, incoming, script, onEnd }: { name: string; incoming: boolean; script?: string[]; onEnd: () => void }) {
  const [connected, setConnected] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(false)
  const [line, setLine] = useState(0)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    if (!script || !connected || ended) return
    const t = setTimeout(() => line < script.length - 1 ? setLine(l => l + 1) : setEnded(true), 2800)
    return () => clearTimeout(t)
  }, [script, connected, ended, line])

  useEffect(() => {
    if (!ended) return
    const t = setTimeout(onEnd, 2200)
    return () => clearTimeout(t)
  }, [ended, onEnd])

  useEffect(() => {
    if (incoming || connected) return
    const t = setTimeout(() => setConnected(true), 2500)
    return () => clearTimeout(t)
  }, [incoming, connected])

  useEffect(() => {
    if (!connected || ended) return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [connected, ended])

  if (ended) return <div className="call-screen is-ended">
    <div className="call-head">
      <h2>{name}</h2>
      <p aria-live="polite">통화 종료됨.</p>
      <div className="call-avatar is-large"><UserRound size={64} fill="currentColor" strokeWidth={1} /></div>
    </div>
  </div>

  const status = connected
    ? `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
    : incoming ? '휴대전화' : '연결 중...'

  return <div className="call-screen">
    <div className="call-head">
      <div className="call-avatar"><UserRound size={45} /></div>
      <h2>{name}</h2>
      <p aria-live="polite">{status}</p>
    </div>
    {incoming && !connected
      ? <div className="call-incoming">
        <div><button className="call-btn is-decline" aria-label="거절" onClick={onEnd}><PhoneOff size={28} /></button><span>거절</span></div>
        <div><button className="call-btn is-accept" aria-label="응답" onClick={() => setConnected(true)}><Phone size={28} /></button><span>응답</span></div>
      </div>
      : <>
        {script && connected && <div className="call-caption" aria-live="polite"><span>{name}</span><strong key={line}>{script[line]}</strong></div>}
        <div className="call-actions">
          <button aria-pressed={muted} onClick={() => setMuted(v => !v)}>{muted ? <MicOff /> : <Mic />}<span>소리 끔</span></button>
          <button disabled><Grid3x3 /><span>키패드</span></button>
          <button aria-pressed={speaker} onClick={() => setSpeaker(v => !v)}><Volume2 /><span>스피커</span></button>
        </div>
        <div className="call-incoming is-single"><div><button className="call-btn is-decline" aria-label="통화 종료" onClick={onEnd}><PhoneOff size={28} /></button><span>종료</span></div></div>
      </>}
  </div>
}
