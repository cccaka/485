import type { CSSProperties } from 'react'
import { Camera, MessageCircle } from 'lucide-react'
import type { AppName } from './phone-apps'

type HomeApp = { name: string; x: number; y: number; open?: AppName; sprite?: 'rummikub' }

const COLUMNS = [12.77, 37.66, 62.55, 87.34]
const ROWS = [37.05, 47.82, 58.59]

const apps: HomeApp[] = [
  { name: '캘린더', x: COLUMNS[0], y: ROWS[0], open: 'calendar' },
  { name: '지도', x: COLUMNS[1], y: ROWS[0] },
  { name: 'YouTube', x: COLUMNS[2], y: ROWS[0] },
  { name: 'Instagram', x: COLUMNS[3], y: ROWS[0], open: 'instagram' },
  { name: '사진', x: COLUMNS[2], y: ROWS[1], open: 'photos' },
  { name: '토스', x: COLUMNS[0], y: ROWS[2] },
  { name: 'Rummikub', x: 6.85, y: 14.04, sprite: 'rummikub' },
]

function spriteStyle(app: Pick<HomeApp, 'x' | 'y' | 'sprite'>): CSSProperties {
  return { backgroundPosition: `${app.x}% ${app.y}%` }
}

export function PhoneHome({ onOpen }: { onOpen: (app: AppName) => void }) {
  return <div className="phone-home">
    <div className="app-grid">{apps.map((app) => <button className="app-tile" key={app.name} onClick={app.open ? () => onOpen(app.open!) : undefined} aria-label={app.open ? `${app.name} 열기` : app.name}><span className={`app-icon sprite-icon ${app.sprite === 'rummikub' ? 'sprite-rummikub' : ''}`} style={spriteStyle(app)} aria-hidden="true" /><span>{app.name}</span></button>)}</div>
    <div className="home-bottom"><div className="page-dots"><span /><span /></div><div className="dock"><button className="app-icon sprite-icon" style={spriteStyle({ x: 16.17, y: 85.32 })} onClick={() => onOpen('phone')} aria-label="전화" /><span className="app-icon green-app" role="img" aria-label="메시지"><MessageCircle size={36} fill="currentColor" /></span><button className="app-icon camera-app" onClick={() => onOpen('camera')} aria-label="카메라 열기"><Camera size={34} /></button><button className="app-icon sprite-icon" style={spriteStyle({ x: 83.94, y: 85.32 })} onClick={() => onOpen('kakao')} aria-label="카카오톡 열기" /></div></div>
  </div>
}
