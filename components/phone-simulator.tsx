'use client'

import { useCallback, useEffect, useState } from 'react'
import { Camera, ChevronLeft, Flashlight, Signal, Wifi } from 'lucide-react'
import { PasscodeScreen } from './passcode-screen'
import { PhoneHome } from './phone-home'
import { PhoneApps, type AppName } from './phone-apps'

export function PhoneSimulator() {
  const [app, setApp] = useState<AppName>('home')
  const [locked, setLocked] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const unlock = useCallback(() => { setLocked(false); setShowCode(false) }, [])
  const time = '01:00'
  const date = '10월 3일 토요일'
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setApp('home'); setLocked(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const wallpaper = app === 'home' || locked
  return <main className="fullscreen-phone font-sans" aria-label="나의 휴대폰">
    <div className={`phone-screen ${wallpaper ? 'wallpaper-screen' : 'app-screen'}`}>
      {locked ? <div className={`lock-gradient ${showCode ? 'is-code' : ''}`} aria-hidden="true" /> : wallpaper && <img className="wallpaper" src="/images/dog-wallpaper.jpg" alt="" />}
      <div className="status-bar">{wallpaper ? <span>{time}</span> : <button className="status-home" onClick={() => setApp('home')}><ChevronLeft size={19} />홈</button>}<div className="dynamic-island" /><div className="status-icons"><Signal size={18} fill="currentColor" /><Wifi size={20} /><span className="battery" aria-label="배터리 82%"><span className="battery-body"><span>82</span></span><span className="battery-tip" /></span></div></div>
      {locked && showCode ? <PasscodeScreen onUnlock={unlock} onCancel={() => setShowCode(false)} /> : locked ? <button className="full-lock" onClick={() => setShowCode(true)} aria-label="화면을 눌러 암호 입력"><span className="lock-date">{date}</span><strong>{time}</strong><span className="lock-bottom"><span className="lock-round"><Flashlight size={22} /></span><span className="unlock-label">위로 쓸어올려서 열기</span><span className="lock-round"><Camera size={22} /></span></span></button> : app === 'home' ? <PhoneHome onOpen={setApp} /> : <PhoneApps app={app} onHome={() => setApp('home')} />}
      <button className="home-indicator" aria-label="홈 화면으로" onClick={() => { setApp('home'); setLocked(false) }}><span /></button>
    </div>
  </main>
}
