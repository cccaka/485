'use client'

import { useState } from 'react'
import { CircleOff, Grip, RefreshCw, Users, Zap } from 'lucide-react'

const ZOOMS = ['.5', '1×', '2'] as const
const MODES = ['비디오', '사진', '인물 사진'] as const

export function CameraApp() {
  const [zoom, setZoom] = useState<(typeof ZOOMS)[number]>('1×')
  const [mode, setMode] = useState<(typeof MODES)[number]>('사진')
  const [shots, setShots] = useState(0)

  return <div className="camera-screen">
    <div className="camera-top">
      <button aria-label="플래시 자동"><Zap size={24} /><span className="camera-flash-dot" /></button>
      <button aria-label="라이브 포토 끔"><CircleOff size={24} /></button>
      <button aria-label="공유 라이브러리" className="camera-active"><Users size={26} fill="currentColor" /></button>
    </div>
    <div className="camera-viewfinder">
      <img src="/images/camera-view.png" alt="카메라 미리보기 화면" className={`camera-zoom-${ZOOMS.indexOf(zoom)}`} />
      <div className="camera-grid" aria-hidden="true"><span /><span /><span /><span /></div>
      {shots > 0 && <div key={shots} className="camera-shutter-flash" aria-hidden="true" />}
      <div className="camera-zooms">{ZOOMS.map(z => <button key={z} aria-pressed={zoom === z} onClick={() => setZoom(z)}>{z}</button>)}</div>
    </div>
    <div className="camera-controls">
      <button className="camera-round" aria-label="조리개"><span className="camera-f">ƒ</span></button>
      <button className="camera-shutter" aria-label="사진 찍기" onClick={() => setShots(n => n + 1)}><span /></button>
      <button className="camera-round" aria-label="더보기"><Grip size={24} /></button>
    </div>
    <div className="camera-bottom">
      <img src="/images/gallery/cover.jpg" alt="최근 사진" className="camera-thumb" />
      <div className="camera-modes">{MODES.map(m => <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>)}</div>
      <button className="camera-round" aria-label="카메라 전환"><RefreshCw size={24} /></button>
    </div>
  </div>
}
