'use client'

import { useState } from 'react'
import { MessageCircle, MessageCirclePlus, MoreHorizontal, Pin, Search, Settings, ShoppingBag, Smile, UserRound, UsersRound } from 'lucide-react'

const contacts = ['내사랑 의리형', '윤도현', '정해영', '황동하', '정서윤']
const groupSizes: Record<string, number> = { 바보들: 5, '학과 공지방': 38 }
const previews: Record<string, string> = {
  정서윤: '아 진짜? 어쩔 수 없지ㅠㅠ 고마워',
  바보들: 'ㅗㅗ',
  황동하: '이의리도 웃었는데 왜 나한테만 그래',
  '내사랑 의리형': '이따 카톡해 기다릴게',
  윤도현: '꺼져 걍',
  정해영: 'ㅇㅋㅇㅋ',
  '학과 공지방': '스포츠심리학 수업 관련 교수님 공지사항',
}
const lastMessageAt: Record<string, string> = {
  '내사랑 의리형': '2026-10-02T19:56',
  바보들: '2026-10-02T15:00',
  '학과 공지방': '2026-10-01T09:00',
  정서윤: '2026-07-19T19:01',
  정해영: '2026-06-19T18:12',
  황동하: '2026-05-29T10:52',
  윤도현: '2026-08-21T17:37',
}
const unread: Record<string, number> = { '학과 공지방': 2, 정서윤: 1 }
const pinnedRooms = ['내사랑 의리형']
const today = '2026-10-03'
const yesterday = '2026-10-02'

function formatRoomTime(stamp: string) {
  const [date, clock] = stamp.split('T')
  if (date === today) return clock
  if (date === yesterday) return '어제'
  const [, month, day] = date.split('-').map(Number)
  return `${month}월 ${day}일`
}

const rooms = Object.keys(lastMessageAt).sort((a, b) => {
  const pinOrder = Number(pinnedRooms.includes(b)) - Number(pinnedRooms.includes(a))
  return pinOrder || lastMessageAt[b].localeCompare(lastMessageAt[a])
})

export function KakaoList({ onOpen, readRooms = [] }: { onOpen: (name: string) => void; readRooms?: string[] }) {
  const [tab, setTab] = useState('채팅')
  const [notice, setNotice] = useState('')
  const visibleRooms = tab === '친구' ? contacts : rooms
  return <section className="kakao-list-screen" aria-label="카카오톡 채팅 목록">
    <header className="kakao-header"><h2>{tab}</h2><div>
      <button aria-label="대화 검색" disabled><Search size={26} strokeWidth={1.8} /></button>
      <button aria-label="새 채팅" disabled><MessageCirclePlus size={26} strokeWidth={1.8} /></button>
      <button aria-label="채팅 설정" disabled><Settings size={26} strokeWidth={1.8} /></button>
    </div></header>
    {notice && <button className="kakao-notice" aria-label={`${notice} 안내 닫기`} onClick={() => setNotice('')}>{notice}<span>닫기</span></button>}
    <div className="kakao-room-list">{visibleRooms.map(name => {
      const isGroup = name in groupSizes
      return <button className="kakao-room-row" key={name} disabled={isGroup} onClick={() => { if (!isGroup) onOpen(name) }}>
        <span className="kakao-person-avatar" aria-hidden="true">{isGroup ? <UsersRound size={34} fill="currentColor" strokeWidth={1.2} /> : <UserRound size={34} fill="currentColor" strokeWidth={1.2} />}</span>
        <span className="kakao-room-copy"><strong>{name}{isGroup && <em>{groupSizes[name]}</em>}{tab === '채팅' && pinnedRooms.includes(name) && <Pin className="kakao-pin" size={15} fill="currentColor" strokeWidth={1.6} aria-label="고정된 채팅방" />}</strong>{previews[name] && <span>{previews[name]}</span>}</span>
        {tab === '채팅' && <span className="kakao-room-meta"><time dateTime={lastMessageAt[name]}>{formatRoomTime(lastMessageAt[name])}</time>{unread[name] && !readRooms.includes(name) && <b aria-label={`안 읽은 메시지 ${unread[name]}개`}>{unread[name]}</b>}</span>}
      </button>
    })}</div>
    <nav className="kakao-bottom-nav" aria-label="카카오톡 메뉴">{[{ name: '친구', Icon: UserRound }, { name: '채팅', Icon: MessageCircle }, { name: '오픈채팅', Icon: Smile }, { name: '쇼핑', Icon: ShoppingBag }, { name: '더보기', Icon: MoreHorizontal }].map(({ name, Icon }) => <button key={name} disabled={name !== '채팅'} aria-current={tab === name ? 'page' : undefined} onClick={() => { if (name === '채팅') { setTab(name); setNotice('') } else setNotice(`${name}은 제공하지 않아요.`) }}><Icon size={25} strokeWidth={1.6} /><span>{name}</span></button>)}</nav>
  </section>
}
