'use client'

import { useRef, useState } from 'react'
import { ChevronDown, ChevronRight, PlusSquare, Smile, Megaphone, UserRound, X } from 'lucide-react'

const partnership = `✏제휴공지✏
안녕하세요 제 36회 학생회 여름입니다.
학생회 제휴 업체 중 하나인 <몸매가 패션이다>에서 진행하는 할인 행사에 대해 안내 드립니다! 많은 관심 부탁드려요!

선착순 10명
헬스pt10회 40만원 + 헬스 3개월 (시간제한없음)
20회 76만원 + 헬스 4개월 (시간제한없음)
30회 108만원 + 헬스 5개월(시간제한없음)
3대1 필라테스 회당 15,000원 필라테스 이용시
헬스 18시까지무료이용
유산소존은19시까지이용가능

선착순 20명
일반 헬스 3개월 10만원(시간제한(06시~18시 유산소존19시까지이용조건)
문의사항은 제휴업체로 직접 연락주시면 됩니다!`

const party = `📢 [2학기 개강파티 안내]

안녕하세요! 제38대 학생회 이음입니다.
2학기 시작을 함께 즐겁게 열기 위해 개강파티를 준비했습니다!🎉

- 일시: 9월 3일(수)
- 장소: 동명동(추후 공지 예정)
- 참가비: 17,000원
- 입금자명: 학번 앞 두 자리 + 이름 (예: 22이승석)

- 납부 계좌: 토스뱅킹 ㅇㅅㅅ
- 납부 기한: ~8/24 23:59까지

맛있는 음식과 즐거운 시간, 그리고 9월 이벤트가 준비되어 있으니 많은 참여 부탁드립니다 ✨
친구들과 함께 개강을 신나게 시작해요!`

export function GroupConversation() {
  const [noticeVisible, setNoticeVisible] = useState(false)
  const [pollOpen, setPollOpen] = useState(false)
  const [choice, setChoice] = useState('불참')
  const [vote, setVote] = useState('불참')
  const pollRef = useRef<HTMLElement>(null)
  const partyRef = useRef<HTMLElement>(null)

  return <section className="group-conversation" aria-label="학과 공지방 대화">
    {noticeVisible && <div className="group-pinned"><button onClick={() => partyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><Megaphone size={20} /><span>이승석의 공지<br /><strong>2학기 개강파티 안내</strong></span></button><button aria-label="상단 공지 닫기" onClick={() => setNoticeVisible(false)}><X size={20} /></button></div>}
    <div className="group-transcript" role="log" aria-label="등록된 공지 메시지">
      {[partnership, party].map((text, index) => <article key={index} ref={index === 1 ? partyRef : undefined} className="group-message"><span className="group-sender-avatar" aria-hidden="true"><UserRound size={23} /></span><div className="group-message-body"><span className="group-sender">이승석</span><div className="group-bubble">{text}</div></div></article>)}
      <article ref={pollRef} className="group-poll" aria-label="2학기 개강파티 투표">
        <h3>Q. 2학기 개강파티</h3>
        {!pollOpen ? <><div className="group-poll-options"><p>참</p><p>불참</p></div>{vote && <p className="group-vote-status" role="status">내 선택: {vote}</p>}<button className="group-poll-action" onClick={() => { setChoice(vote); setPollOpen(true) }}>{vote ? '투표 변경하기' : '투표하러 가기'}<ChevronRight size={18} /></button></> : <form onSubmit={event => { event.preventDefault(); if (choice) { setVote(choice); setPollOpen(false) } }}><fieldset className="group-poll-options"><legend>참석 여부를 선택해 주세요</legend>{['참', '불참'].map(option => <label key={option}><input type="radio" name="party-attendance" value={option} checked={choice === option} onChange={() => setChoice(option)} />{option}</label>)}</fieldset><button className="group-poll-submit" type="submit" disabled={!choice}>투표하기</button><button className="group-poll-action" type="button" onClick={() => setPollOpen(false)}>취소</button></form>}
      </article>
    </div>
    <button className="group-jump" aria-label="투표로 이동" onClick={() => pollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}><span>투표로 이동</span><ChevronDown size={18} /></button>
    <div className="group-composer"><PlusSquare size={23} aria-hidden="true" /><input aria-label="메시지 입력" placeholder="메시지 입력" readOnly value="" /><Smile size={23} aria-hidden="true" /></div>
  </section>
}
