'use client'

import { useState } from 'react'
import { ChevronLeft, Plus, X } from 'lucide-react'

type Album = { name: string; cover: string; photos: string[]; count: number; locked?: boolean }

const cameraPhotos = [
  '/images/gallery/cover.jpg',
  '/images/gallery/p13.jpg',
  '/images/gallery/p2.jpg',
  '/images/gallery/p4.jpg',
  '/images/gallery/p5.jpg',
  '/images/gallery/p6.webp',
  '/images/gallery/p7.webp',
  '/images/gallery/p8.jpg',
  '/images/gallery/p9.jpg',
  '/images/gallery/p10.jpg',
  '/images/gallery/p11.jpg',
  '/images/gallery/p12.jpg',
  '/images/gallery/jandi.webp',
]

const albums: Album[] = [
  { name: '카메라', cover: '/images/gallery/cover.jpg', photos: cameraPhotos, count: 500 },
  { name: '막내', cover: '/images/gallery/maknae.jpg', photos: [], count: 300, locked: true },
]

export function PhotoGallery({ onHome }: { onHome: () => void }) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [viewing, setViewing] = useState<string | null>(null)

  if (viewing) {
    return <div className="gallery-viewer">
      <button className="gallery-viewer-close" aria-label="사진 닫기" onClick={() => setViewing(null)}><X size={22} /></button>
      <img src={viewing} alt="" />
    </div>
  }

  return <div className="gallery">
    <div className="gallery-top">
      <button className="gallery-back" aria-label="뒤로" onClick={() => album ? setAlbum(null) : onHome()}><ChevronLeft size={24} /></button>
    </div>
    <div className="gallery-title">
      <h2>{album ? album.name : '앨범'}</h2>
      {album ? <span>{album.count}장</span> : <Plus size={26} aria-hidden="true" />}
    </div>
    {album
      ? <div className="gallery-photos">{album.photos.map((src, i) => <button key={src} onClick={() => setViewing(src)} aria-label={`사진 ${i + 1} 보기`}><img src={src} alt="" /></button>)}</div>
      : <div className="gallery-albums">{albums.map(a => a.locked
        ? <div key={a.name} className="gallery-album-static"><img src={a.cover} alt="" /><strong>{a.name}</strong><span>{a.count}</span></div>
        : <button key={a.name} onClick={() => setAlbum(a)}><img src={a.cover} alt="" /><strong>{a.name}</strong><span>{a.count}</span></button>)}</div>}
  </div>
}
