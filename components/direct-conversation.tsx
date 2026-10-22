'use client'

import { revisedEuiri, revisedSeoyun, dohyunAugust } from './revised-conversations'
import { useEffect, useRef, useState } from 'react'
import { CalendarDays, PlusSquare, Send, Smile, UserRound } from 'lucide-react'

type Turn = { mine?: boolean; text: string; time?: string; image?: string; alt?: string }
const days: { date: string; name: string; turns: Turn[] }[] = [
  { date: '2026년 5월 4일 월요일', name: '내사랑 의리형', turns: [
    { text: '강의 다 끝났어?', time: '오후 1:50' },
    { mine: true, text: 'ㅇㅇ 방금' },
    { mine: true, text: '쉬는 시간 없이 계속 했어' },
    { mine: true, text: '배고파..', time: '오후 1:51' },
    { text: '같이 밥 먹을까?', time: '오후 1:51' },
    { mine: true, text: '엉 후문에서 만나자', time: '오후 1:52' },
  ] },
  { date: '2026년 5월 16일 토요일', name: '내사랑 의리형', turns: [
    { mine: true, text: '심심해' },
    { mine: true, text: '심심해' },
    { mine: true, text: '심심해' },
    { mine: true, text: '심심' },
    { mine: true, text: '해', time: '오후 7:00' },
    { text: '우리집 오든가' },
    { text: '동하가 맛있다고 추천해준 술도 있어', time: '오후 7:00' },
    { mine: true, text: '오' },
    { mine: true, text: '과자사갈게', time: '오후 7:00' },
  ] },
  { date: '2026년 6월 16일 화요일', name: '내사랑 의리형', turns: [
    { mine: true, text: '형 집이야?', time: '오후 4:50' },
    { text: '어', time: '오후 4:52' },
    { mine: true, text: '형 집 가도 돼?', time: '오후 4:53' },
  ] },
  { date: '2026년 6월 17일 수요일', name: '내사랑 의리형', turns: [
    { mine: true, text: 'ㅡㅡ' },
    { text: '왜?' },
    { mine: true, text: '누가 몰래 이름 바꾸래' },
    { text: '이의리는 너무 정없잖아' },
    { text: '상처받았어ㅠ' },
  ] },
  { date: '2026년 10월 2일 금요일', name: '내사랑 의리형', turns: [
    { text: '', image: '/images/euiri-selfie.png' },
  { text: '춥다...' },
    { text: '손 잡아줄 사람 없나...', time: '오후 7:10' },
    { text: '생일에 형 만나주지도 않고', time: '오후 7:55' },
    { mine: true, text: '그건' },
    { mine: true, text: '미안....' },
    { mine: true, text: '근데 애들이 나 빨리 안보내줄 거 같애' },
    { mine: true, text: '먼저 자', time: '오후 8:00' },
    { text: '나 자면 누가 데리러가...', time: '오후 8:01' },
    { mine: true, text: '윤도현 시키면 되지ㅋㅋ', time: '오후 8:01' },
    { text: 'ㅋㅋㅋㅋㅋㅋ' },
    { text: '끝나면 전화해', time: '오후 8:02' },
  ] },
]

const dohyunDays: typeof days = [
  { date: '2026년 5월 21일 목요일', name: '윤도현', turns: [
    { mine: true, text: '야', time: '오후 1:20' },
    { text: 'ㅇ?', time: '오후 1:20' },
    { mine: true, text: '의리형이랑 뭔 얘기했어?', time: '오후 2:00' },
    { text: '언제?', time: '오후 2:00' },
    { mine: true, text: '아까 둘이 먼저 갈때', time: '오후 2:40' },
  { text: '걍 과제 얘기했는디' },
  { text: '왜', time: '오후 2:45' },
  { mine: true, text: '형이 내 얘기 안했어?', time: '오후 3:00' },
  { text: '니 얘기를 왜해', time: '오후 3:00' },
  ] },
]

const haeyoungDays: typeof days = [
  { date: '2026년 6월 19일 금요일', name: '정해영', turns: [
    { text: '둘이 화해했다매?', time: '오후 6:00' },
    { mine: true, text: '넵.. 잘 풀었어요' },
    { mine: true, text: '형 감사해요ㅎㅎ;;', time: '오후 6:08' },
    { text: 'ㅋㅋㅋㅋㅋ' },
    { text: '넌 진짜 나한테 밥사야해', time: '오후 6:10' },
    { mine: true, text: '나중에 의리형이랑 만나요ㅋㅋ' },
    { mine: true, text: '근데 그때 물어본 건 비밀로 해주세요..' },
    { mine: true, text: '형이 알면 놀릴 거 같아서 카톡도 지웠거든요', time: '오후 6:10' },
    { text: 'ㅇㅋㅇㅋ', time: '오후 6:12' },
  ] },
]

const donghaDays: typeof days = [
  { date: '2026년 5월 29일 금요일', name: '황동하', turns: [
    { mine: true, text: '강의실에서 웃지마 짜증나니까', time: '오전 10:50' },
    { text: '???' },
    { text: '이의리도 웃었는데 왜 나한테만 그래', time: '오전 10:52' },
  ] },
]

const babodeulDays: typeof days = [
  { date: '2026년 10월 21일 수요일', name: '바보들', turns: [
    { mine: true, text: 'ㅗㅗ', time: '오후 3:00' },
  ] },
]

const seoyunDays: typeof days = [
  { date: '2026년 7월 20일 월요일', name: '정서윤', turns: [
    { text: '도영아' },
    { text: '너 의리랑 친해?', time: '오후 3:00' },
    { mine: true, text: '선배 안녕하세요' },
    { mine: true, text: '친하긴한데 왜요?', time: '오후 3:01' },
    { text: '아~ 내 친구가 소개 받고 싶다고 그래서' },
    { text: '혹시 번호 좀 받을 수 있을까?', time: '오후 3:02' },
    { mine: true, text: '형한테 물어볼게요 ㅎㅎ', time: '오후 3:10' },
  ] },
]

const conversations: Record<string, typeof days> = { '내사랑 의리형': revisedEuiri, 윤도현: [...dohyunDays, dohyunAugust], 정해영: haeyoungDays, 황동하: donghaDays, 정서윤: revisedSeoyun, 바보들: babodeulDays }

const INTERACTIVE_ROOM = '내사랑 의리형'
const NOW = '오전 1:00'
const TODAY = '2026년 10월 3일 토요일'

const MISS_YOU_CALL = ['형이 그렇게 보고싶었어?ㅋㅋ', '내일은 둘이서만 보내자 나가지말고', '언제 도착하냐고?', '뒤돌아봐']

export function DirectConversation({ room, onCall }: { room: string; onCall?: (script?: string[]) => void }) {
  const [draft, setDraft] = useState('')
  const [live, setLive] = useState<Turn[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  const interactive = room === INTERACTIVE_ROOM
  const history = conversations[room] ?? []
  const shown = live.length ? [...history, { date: TODAY, name: room, turns: live }] : history

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }) }, [live.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    setLive(prev => [...prev, { mine: true, text, time: NOW }])
    const normalized = text.replace(/\s/g, '')
    if (['사랑해', '좋아해'].some(k => normalized.includes(k))) setTimeout(() => setLive(prev => [...prev, { text: '내가 더ㅋㅋ', time: NOW }]), 1200)
    else if (['보고싶어', '보고싶다'].some(k => normalized.includes(k))) setTimeout(() => onCall?.(MISS_YOU_CALL), 1200)
    else if (['이제끝났어', '집가'].some(k => normalized.includes(k))) setTimeout(() => onCall?.(), 1200)
  }

  return <section className="group-conversation direct-conversation" aria-label={`${room} 대화`}>
    <div className="direct-transcript" role="log" aria-label="대화 내역">
      {shown.map(day => <section key={day.date} aria-label={day.date}>
        <div className="direct-date"><CalendarDays size={14} /><span>{day.date}</span></div>
        {day.turns.map((turn, index) => {
          const continued = index > 0 && !!day.turns[index - 1].mine === !!turn.mine
          return <div key={index} className={`direct-turn${turn.mine ? ' outgoing' : ''}${continued ? ' continued' : ''}`} aria-label={turn.mine ? '김도영' : day.name}>
            {!turn.mine && <div className="direct-avatar">{!continued && <UserRound size={23} />}</div>}
            <div className="direct-content">
              {!turn.mine && !continued && <span className="direct-sender">{day.name}</span>}
              <div className="direct-line">{turn.image
                ? <img className="direct-photo" src={turn.image} alt={turn.alt ?? '남색 후드티를 입고 휴대폰을 든 이의리 사진'} />
                : <div className="direct-bubble">{turn.text}</div>}{turn.time && <span className="direct-time">{turn.time}</span>}</div>
            </div>
          </div>
        })}
      </section>)}
      <div ref={endRef} />
    </div>
    {interactive
      ? <form className="group-composer" onSubmit={e => { e.preventDefault(); send() }}><PlusSquare size={23} aria-hidden="true" /><input aria-label="메시지 입력" placeholder="메시지 입력" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault() }} enterKeyHint="send" />{draft.trim() ? <button type="submit" className="kakao-send" aria-label="전송"><Send size={18} /></button> : <Smile size={23} aria-hidden="true" />}</form>
      : <div className="group-composer"><PlusSquare size={23} aria-hidden="true" /><input aria-label="메시지 입력" placeholder="메시지를 보낼 수 없어요" readOnly disabled value="" /><Smile size={23} aria-hidden="true" /></div>}
  </section>
}
