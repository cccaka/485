'use client'

import { useState } from 'react'
import { ArrowLeft, ImageIcon, LockKeyhole, MessageCircle, Phone, Settings } from 'lucide-react'
import { CallScreen, LOVER, PhoneDialer } from './phone-call'
import { KakaoList } from './kakao-list'
import { GroupConversation } from './group-conversation'
import { DirectConversation } from './direct-conversation'
import { InstagramApp } from './instagram-app'
import { PhotoGallery } from './photo-gallery'
import { CalendarApp } from './calendar-app'

export type AppName = 'home' | 'kakao' | 'instagram' | 'messages' | 'phone' | 'contacts' | 'photos' | 'camera' | 'calendar' | 'clock' | 'settings'
const contacts = ['내사랑 의리형', '윤도현', '정해영', '황동하', '정서윤']
const titles: Record<AppName, string> = { home: '홈', kakao: '채팅', instagram: 'Instagram', messages: '메시지', phone: '전화', contacts: '연락처', photos: '사진', camera: '카메라', calendar: '캘린더', clock: '시계', settings: '설정' }

export function PhoneApps({ app, onHome }: { app: AppName; onHome: () => void }) {
  const [room, setRoom] = useState<string | null>(null)
  const [calling, setCalling] = useState<{ name: string; incoming: boolean; script?: string[] } | null>(null)
  const [readRooms, setReadRooms] = useState<string[]>([])
  const openRoom = (name: string) => { setRoom(name); setReadRooms(prev => prev.includes(name) ? prev : [...prev, name]) }
  if (calling) return <CallScreen name={calling.name} incoming={calling.incoming} script={calling.script} onEnd={() => {
    const scripted = Boolean(calling.script)
    setCalling(null)
    if (scripted) { setRoom(null); onHome() }
  }} />
  if (app === 'phone' || app === 'contacts') return <div className="phone-app"><PhoneDialer onCall={name => setCalling({ name, incoming: false })} /></div>
  if (app === 'instagram') return <div className="phone-app"><InstagramApp onHome={onHome} /></div>
  if (app === 'photos') return <div className="phone-app"><PhotoGallery onHome={onHome} /></div>
  if (app === 'calendar') return <div className="phone-app"><CalendarApp onHome={onHome} /></div>
  return <div className={`phone-app ${app === 'kakao' && room ? 'chat-room' : ''}`}>
    {(app !== 'kakao' || room) && <div className="app-nav"><button aria-label="뒤로" onClick={() => room ? setRoom(null) : onHome()}><ArrowLeft size={21} /></button><span>{room || titles[app]}</span>{app === 'kakao' && room && contacts.includes(room) ? <button aria-label={`${room}에게 전화`} onClick={() => setCalling({ name: room, incoming: false })}><Phone size={19} /></button> : <LockKeyhole size={16} />}</div>}
    {app === 'kakao' && !room && <KakaoList onOpen={openRoom} readRooms={readRooms} />}
    {app === 'messages' && !room && <><div className="app-heading"><h2>메시지</h2><span>0</span></div><div className="app-empty"><MessageCircle size={40} strokeWidth={1.2} /><h3>아직 도착한 문자가 없어요</h3><p>등록한 문자 이야기가<br />이곳에 표시됩니다.</p></div></>}
    {room === '학과 공지방' && <GroupConversation />}
    {room && room !== '학과 공지방' && <DirectConversation key={room} room={room} onCall={script => setCalling({ name: LOVER, incoming: true, script })} />}
    {app === 'camera' && <div className="app-empty"><ImageIcon size={42} /><h3>카메라 미리보기</h3><p>이야기 속 사진만 사용해요.<br />실제 카메라에는 접근하지 않습니다.</p></div>}
    {app === 'clock' && <div className="app-empty"><span className="world-clock">서울</span><strong className="clock-time">01:00</strong><p>대한민국 표준시 · KST</p></div>}
    {app === 'settings' && <><div className="app-heading"><h2>설정</h2><Settings size={22} /></div><div className="settings-list"><div><span>기기</span><strong>iPhone 16</strong></div><div><span>색상</span><strong>Black</strong></div><div><span>모드</span><strong>인터랙티브 체험</strong></div><div><span>자유 입력</span><strong>사용 안 함</strong></div></div><div className="preset-note"><LockKeyhole size={17} /> 나만의 이야기를 위한 안전한 공간</div></>}
  </div>
}
