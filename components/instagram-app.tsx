'use client'

import { Fragment, useState } from 'react'
import { Bookmark, ChevronLeft, Clapperboard, Copy, Grid3x3, Heart, Home, Menu, MessageCircle, MoreHorizontal, Plus, Search, Send, UserRound } from 'lucide-react'

type Tab = 'home' | 'profile'
type Account = { user: string; name: string; image: string | null }
type Post = { id: string; account: Account; image: string; alt: string; caption: string; likes: number; comments: number; time: string; commentTime?: string; extra?: { image: string; alt: string }[]; replies?: { user: string; text: string; depth?: number; to?: string }[] }

const me: Account = { user: 'do.y102', name: '김도영', image: '/images/doyoung-profile.jpg' }
const euiri: Account = { user: 'euilee2', name: '이의리', image: '/images/euiri-profile.jpg' }
const dohyun: Account = { user: 'ydohyun_', name: '윤도현', image: null }
const haeyoung: Account = { user: 'haeyoung_j', name: '정해영', image: null }
const dongha: Account = { user: 'hwang_dongha', name: '황동하', image: null }

const myPosts: Post[] = [
  { id: 'dy-gift', account: me, image: '/images/dy-gift-1.jpg', alt: '밤길에서 쇼핑백과 꽃다발을 들고 인형 가방을 멘 정면 사진', caption: '🥳🤘', likes: 131, comments: 12, time: '3시간 전', extra: [{ image: '/images/dy-gift-2.jpg', alt: '쇼핑백과 꽃다발을 들고 인형 가방을 멘 옆모습' }], replies: [{ user: 'ydohyun_', text: 'ㅊㅊ' }] },
  { id: 'dy-jul19', account: me, image: '/images/dy-jul19-1.jpg', alt: '카페 건물 앞에서 강아지를 안고 있는 모습', caption: '🐕', likes: 112, comments: 2, time: '7월 19일', extra: [{ image: '/images/dy-jul19-2.jpg', alt: '큰 나무 아래 길에서 강아지와 산책하는 모습' }], replies: [{ user: 'ydohyun_', text: '사진 누가 찍어줌?' }, { user: 'hwang_dongha', text: '나도 잔디볼래' }] },
  { id: 'dy-apr18', account: me, image: '/images/dy-apr18.jpg', alt: '가로등과 신호등 너머로 구름 사이 노을이 지는 하늘', caption: '🌇', likes: 88, comments: 0, time: '4월 18일' },
]

const feed: Post[] = [
  myPosts[0],
  { id: 'euiri-dog', account: euiri, image: '/images/euiri-dog.webp', alt: '카페 창가에서 갈색 니트를 입고 노란 강아지 얼굴을 두 손으로 감싼 모습', caption: '귀엽다', likes: 173, comments: 16, time: '10월 1일', commentTime: '2일', replies: [{ user: 'do.y102', text: '남들 다 보는데 뭐해;;;' }, { user: 'euilee2', to: 'do.y102', text: '너 말고 잔디 귀엽다고 한건데', depth: 1 }, { user: 'euilee2', to: 'do.y102', text: '도영아 삐졌어?', depth: 1 }, { user: 'euilee2', to: 'do.y102', text: '도영아....', depth: 1 }, { user: 'euilee2', to: 'do.y102', text: 'ㅠㅠ', depth: 1 }] },
  { id: 'euiri-2', account: euiri, image: '/images/euiri-hoodie.jpg', alt: '남색 후드티 모자를 쓰고 휴대폰으로 얼굴을 가린 채 사진을 찍는 모습', caption: 'photo by 🐱', likes: 1400, comments: 11, time: '8월 21일' },
  myPosts[1],
]

const stories = [euiri, dohyun, haeyoung, dongha]

const profileStats: Record<string, { followers: number; following: number }> = {
  [me.user]: { followers: 198, following: 198 },
  [euiri.user]: { followers: 1100, following: 200 },
}

const postsOf = (account: Account) => [...new Map([...feed, ...myPosts].map(p => [p.id, p])).values()].filter(p => p.account.user === account.user)

function Avatar({ image, size = 32 }: { image: string | null; size?: number }) {
  return <span className="insta-avatar" style={{ width: size, height: size }}>
    {image ? <img src={image} alt="" /> : <UserRound size={size * 0.6} fill="currentColor" strokeWidth={1} />}
  </span>
}

const accountByUser = new Map([me, euiri, dohyun, haeyoung, dongha].map(a => [a.user, a]))

function CommentSheet({ post, onClose }: { post: Post; onClose: () => void }) {
  const replies = post.replies ?? []
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set())
  const toggleLike = (i: number) => setLikedReplies(prev => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  })
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set())
  const toggleThread = (i: number) => setCollapsed(prev => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  })
  const threadStart = (i: number) => {
    let start = i
    while (start > 0 && replies[start].depth) start--
    return start
  }
  return <div className="insta-sheet-layer" onKeyDown={e => e.key === 'Escape' && onClose()}>
    <button type="button" className="insta-sheet-backdrop" aria-label="댓글 닫기" onClick={onClose} />
    <div className="insta-sheet" role="dialog" aria-modal="true" aria-labelledby={`comments-${post.id}`}>
      <button type="button" className="insta-sheet-handle" aria-label="댓글 닫기" onClick={onClose} autoFocus><span /></button>
      <h2 id={`comments-${post.id}`}>댓글</h2>
      <ul className="insta-sheet-list">
        {replies.length === 0 && <li className="insta-sheet-empty">아직 댓글이 없습니다.</li>}
        {replies.map((reply, i) => {
          const liked = likedReplies.has(i)
          const isReply = Boolean(reply.depth)
          if (isReply && collapsed.has(threadStart(i))) return null
          const next = replies[i + 1]
          const endsThread = isReply && (!next || !next.depth)
          return <Fragment key={reply.user + reply.text}>
            <li className={isReply ? 'insta-sheet-nested' : undefined}>
              <Avatar image={accountByUser.get(reply.user)?.image ?? null} size={isReply ? 28 : 36} />
              <div className="insta-sheet-body">
                <p><b>{reply.user}</b> <span>{post.commentTime ?? post.time.replace(' 전', '')}{reply.user === post.account.user && ' • 작성자'}</span></p>
                <p>{reply.to && <span className="insta-mention">@{reply.to} </span>}{reply.text}</p>
                <span className="insta-sheet-reply">답글 달기</span>
              </div>
              <button type="button" className="insta-sheet-like" aria-label={liked ? '댓글 좋아요 취소' : '댓글 좋아요'} aria-pressed={liked} onClick={() => toggleLike(i)}>
                <Heart size={16} className={liked ? 'liked' : ''} fill={liked ? 'currentColor' : 'none'} />
                {liked && <span>1</span>}
              </button>
            </li>
            {endsThread && <li className="insta-thread-toggle"><button type="button" onClick={() => toggleThread(threadStart(i))}>답글 숨기기</button></li>}
            {!isReply && next?.depth && collapsed.has(i) && <li className="insta-thread-toggle"><button type="button" onClick={() => toggleThread(i)}>답글 {replies.slice(i + 1).findIndex(r => !r.depth) === -1 ? replies.length - i - 1 : replies.slice(i + 1).findIndex(r => !r.depth)}개 더 보기</button></li>}
          </Fragment>
        })}
      </ul>
      <div className="insta-sheet-footer">
        <div className="insta-sheet-emojis" aria-hidden="true">{['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'].map(e => <span key={e}>{e}</span>)}</div>
        <div className="insta-sheet-input">
          <Avatar image={me.image} size={36} />
          <span>{post.account.user}님에게 댓글 추가</span>
          <b aria-hidden="true">GIF</b>
        </div>
      </div>
    </div>
  </div>
}

function FeedPost({ post, onOpenProfile }: { post: Post; onOpenProfile?: (account: Account) => void }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slide, setSlide] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const replies = post.replies ?? []
  const slides = [{ image: post.image, alt: post.alt }, ...(post.extra ?? [])]
  return <article className="insta-post" aria-label={`${post.account.user}의 게시물`}>
    <header>
      <button type="button" className="insta-post-author" aria-label={`${post.account.user} 프로필 보기`} onClick={() => onOpenProfile?.(post.account)}><Avatar image={post.account.image} size={34} /><strong>{post.account.user}</strong></button>
      <button aria-label="게시물 옵션"><MoreHorizontal size={20} /></button></header>
    {slides.length > 1 ? <div className="insta-carousel">
      <div className="insta-carousel-track" onScroll={e => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} onDoubleClick={() => setLiked(true)}>
        {slides.map(item => <img key={item.image} src={item.image} alt={item.alt} />)}
      </div>
      <span className="insta-carousel-count">{slide + 1}/{slides.length}</span>
      <div className="insta-carousel-dots" aria-hidden="true">{slides.map((item, i) => <i key={item.image} className={i === slide ? 'active' : ''} />)}</div>
    </div> : <button className="insta-post-image" aria-label="두 번 눌러 좋아요" onDoubleClick={() => setLiked(true)}><img src={post.image} alt={post.alt} /></button>}
    <div className="insta-actions">
      <button aria-label={liked ? '좋아요 취소' : '좋아요'} aria-pressed={liked} onClick={() => setLiked(v => !v)}><Heart size={25} className={liked ? 'liked' : ''} fill={liked ? 'currentColor' : 'none'} /></button>
      <button aria-label="댓글 보기" aria-haspopup="dialog" onClick={() => setShowComments(true)}><MessageCircle size={25} /></button>
      <button aria-label="공유"><Send size={24} /></button>
      <button className="insta-save" aria-label={saved ? '저��� 취소' : '저장'} aria-pressed={saved} onClick={() => setSaved(v => !v)}><Bookmark size={25} fill={saved ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="insta-post-copy">
      <strong>좋아요 {(post.likes + (liked ? 1 : 0)).toLocaleString('ko-KR')}개</strong>
      {post.caption && <p><button type="button" className="insta-caption-user" aria-label={`${post.account.user} 프로필 보기`} onClick={() => onOpenProfile?.(post.account)}>{post.account.user}</button> {post.caption}</p>}
      {replies.length > 0 && <button type="button" className="insta-comment-link" aria-haspopup="dialog" onClick={() => setShowComments(true)}>{`댓글 ${replies.length}개 모두 보기`}</button>}
      <time>{post.time}</time>
    </div>
    {showComments && <CommentSheet post={post} onClose={() => setShowComments(false)} />}
  </article>
}

function Profile({ account, onOpenPost }: { account: Account; onOpenPost: (post: Post) => void }) {
  const posts = postsOf(account)
  const stats = profileStats[account.user] ?? { followers: 0, following: 0 }
  const isMe = account.user === me.user
  return <>
    <div className="insta-profile">
      <Avatar image={account.image} size={86} />
      <dl><div><dd>{posts.length}</dd><dt>게시물</dt></div><div><dd>{stats.followers.toLocaleString('ko-KR')}</dd><dt>팔로워</dt></div><div><dd>{stats.following}</dd><dt>팔로잉</dt></div></dl>
    </div>
    <div className="insta-bio"><strong>{account.name}</strong></div>
    <div className="insta-profile-buttons">{isMe ? <><button>프로필 편집</button><button>프로필 공유</button></> : <><button>팔로잉</button><button>메시지</button></>}</div>
    <div className="insta-grid-tab" aria-hidden="true"><Grid3x3 size={22} /></div>
    <div className="insta-grid">{posts.map(post => <button key={post.id} className="insta-grid-item" aria-label={`${post.time} 게시물 보기`} onClick={() => onOpenPost(post)}><img src={post.image} alt={post.alt} />{post.extra && <Copy className="insta-grid-multi" size={18} aria-hidden="true" />}</button>)}</div>
  </>
}

export function InstagramApp({ onHome }: { onHome: () => void }) {
  const [tab, setTab] = useState<Tab>('home')
  const [profile, setProfile] = useState<Account>(me)
  const [detail, setDetail] = useState<Post | null>(null)
  const [notice, setNotice] = useState('')

  const openProfile = (account: Account) => { setProfile(account); setDetail(null); setTab('profile'); setNotice('') }
  const goHome = () => { setTab('home'); setDetail(null); setNotice('') }

  const showNotice = (text: string) => { goHome(); setNotice(text) }

  return <section className="insta-screen" aria-label="인스타그램">
       {detail ? <>
      <header className="insta-top">
        <button aria-label="뒤로" onClick={() => setDetail(null)}><ChevronLeft size={28} /></button>
        <h2 className="insta-handle insta-detail-title">게시물</h2>
      </header>
      <div className="insta-scroll" key={`detail-${detail.id}`}><FeedPost post={detail} onOpenProfile={openProfile} /></div>
    </> : tab === 'home' ? <>
      <header className="insta-top">
        <h2>Instagram</h2>
        <div>
          <button aria-label="알림" disabled><Heart size={26} /></button>
          <button aria-label="메시지" className="insta-dm" disabled><Send size={25} /></button>
        </div>
      </header>
      {notice && <button className="insta-notice" onClick={() => setNotice('')}>{notice}<span>닫기</span></button>}
      <div className="insta-scroll" key="home">
        <div className="insta-stories" aria-label="스토리">
          <div className="insta-story-item insta-my-story">
            <span className="insta-my-story-pic"><Avatar image={me.image} size={66} /><span className="insta-plus" aria-hidden="true"><Plus size={14} strokeWidth={3} /></span></span>
            <span>내 스토리</span>
          </div>
          {stories.map(item => <div key={item.user} className="insta-story-item"><span className="insta-ring"><Avatar image={item.image} size={62} /></span><span>{item.user}</span></div>)}
        </div>
        {feed.map(post => <FeedPost key={post.id} post={post} onOpenProfile={openProfile} />)}
      </div>
    </> : <>
      <header className="insta-top">
        {profile.user !== me.user && <button aria-label="뒤로" onClick={goHome}><ChevronLeft size={28} /></button>}
        <h2 className="insta-handle">{profile.user}</h2>
        <div>{profile.user === me.user ? <button aria-label="메뉴"><Menu size={26} /></button> : <button aria-label="옵션"><MoreHorizontal size={24} /></button>}</div>
      </header>
      <div className="insta-scroll" key={`profile-${profile.user}`}><Profile account={profile} onOpenPost={setDetail} /></div>
    </>}
    <nav className="insta-bottom-nav" aria-label="인스타그램 메뉴">
      <button aria-label="홈" aria-current={tab === 'home' && !detail ? 'page' : undefined} onClick={goHome}><Home size={27} fill={tab === 'home' ? 'currentColor' : 'none'} /></button>
      <button aria-label="릴스" disabled><Clapperboard size={27} /></button>
      <button aria-label="검색" disabled><Search size={27} /></button>
      <button aria-label="프로필" aria-current={tab === 'profile' && profile.user === me.user ? 'page' : undefined} onClick={() => openProfile(me)}><span className={tab === 'profile' && profile.user === me.user ? 'insta-nav-me active' : 'insta-nav-me'}><Avatar image={me.image} size={30} /></span></button>
    </nav>
  </section>
}
