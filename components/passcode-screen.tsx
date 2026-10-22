'use client'

import { useEffect, useState } from 'react'

const PASSCODE = '1002'
const KEYS: [string, string][] = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
]

export function PasscodeScreen({ onUnlock, onCancel }: { onUnlock: () => void; onCancel: () => void }) {
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)

  useEffect(() => {
    if (code.length < PASSCODE.length) return
    if (code === PASSCODE) {
      const timer = setTimeout(onUnlock, 150)
      return () => clearTimeout(timer)
    }
    setWrong(true)
    const timer = setTimeout(() => { setCode(''); setWrong(false) }, 450)
    return () => clearTimeout(timer)
  }, [code, onUnlock])

  const press = (digit: string) => {
    if (wrong) return
    setCode(current => (current.length < PASSCODE.length ? current + digit : current))
  }

  return <section className="passcode" aria-label="암호 입력">
    <h2>암호 입력</h2>
    <div className={`passcode-dots ${wrong ? 'is-wrong' : ''}`} aria-live="polite" aria-label={`${code.length}자리 입력됨`}>
      {Array.from({ length: PASSCODE.length }, (_, index) => <span key={index} className={index < code.length ? 'filled' : ''} />)}
    </div>
    <div className="passcode-pad">
      {KEYS.map(([digit, letters]) => <button key={digit} type="button" onClick={() => press(digit)} aria-label={digit}>
        <strong>{digit}</strong>{letters && <small>{letters}</small>}
      </button>)}
      <button type="button" className="pad-zero" onClick={() => press('0')} aria-label="0"><strong>0</strong></button>
    </div>
    <div className="passcode-actions">
      <button type="button">긴급 상황</button>
      <button type="button" onClick={() => (code ? setCode(code.slice(0, -1)) : onCancel())}>{code ? '삭제' : '취소'}</button>
    </div>
  </section>
}
