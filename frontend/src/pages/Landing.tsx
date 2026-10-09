import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Activity, CircleDot, Flame, MoveUpRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { no: '01', icon: Activity, title: 'Training, with intent.', text: 'Build a split that fits your week, shape each session, and keep the momentum yours.' },
  { no: '02', icon: Flame, title: 'Fuel the work.', text: 'Set a daily nutrition target and turn it into practical guidance you can follow.' },
  { no: '03', icon: MoveUpRight, title: 'Progress you can feel.', text: 'Log your work over time and see the consistency behind your strength.' },
]

const trainingMoments = [
  {
    index: '01 / TRAIN WITH PURPOSE',
    title: 'Make every session count.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
    srcSet: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85 1000w, https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85 1400w',
    alt: 'Strength training area with barbells and gym equipment',
    className: 'moment-card moment-card-wide',
  },
  {
    index: '02 / FIND YOUR RHYTHM',
    title: 'Build a routine that lasts.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=85',
    srcSet: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80 500w, https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85 900w, https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85 1200w',
    alt: 'Athlete focused on a strength training session',
    className: 'moment-card',
  },
  {
    index: '03 / RECOVER WITH INTENT',
    title: 'Progress lives between reps.',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=85',
    srcSet: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=500&q=80 500w, https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=85 900w, https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1200&q=85 1200w',
    alt: 'Athlete stretching after a workout',
    className: 'moment-card',
  },
]

export default function Landing() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.12 })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
      })
      gsap.to('.ticker-track', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.ticker-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="peak-site">
      <a className="skip-link" href="#training">Skip to training stories</a>
      <section className="peak-hero">
        <div className="hero-photo" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=88" srcSet="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85 1200w, https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=88 1800w, https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=88 2400w" sizes="100vw" alt="" decoding="async" fetchPriority="high" onError={(event) => { event.currentTarget.style.display = "none" }} />
        </div>
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow hero-enter"><span className="status-dot" /> YOUR TRAINING, IN ITS ELEMENT</p>
          <h1 className="hero-enter">MAKE<br /><em>ROOM</em><br />TO RISE<span className="hero-period">.</span></h1>
          <div className="hero-foot hero-enter">
            <p>A training system for people who show up.<br />Build a plan. Find your pace. Keep climbing.</p>
            <Link to="/signup" className="peak-cta-link">Start your ascent <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-coordinate">PF / 001 — PERSONAL TRAINING SYSTEM</div>
        <a className="hero-scroll" href="#training"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
        <div className="hero-index">01 — 04</div>
        <div className="hero-note"><span>FIG. 01</span><br />The compounding<br />effect of showing up.</div>
        <div className="hero-photo-credit">A SPACE TO DO THE WORK <span>PEAKFIT / 001</span></div>
      </section>

      <section className="manifesto" data-reveal>
        <div className="manifesto-side eyebrow">A BETTER KIND<br />OF STRONG <CircleDot size={13} /></div>
        <p>Not another plan you abandon.<br /><span>PeakFit makes consistency</span><br /><span>feel like your superpower.</span></p>
        <div className="manifesto-mark">P<span>F</span></div>
      </section>

      <div className="ticker-wrap"><div className="ticker-track">SHOW UP <span>✳</span> FIND YOUR PACE <span>✳</span> KEEP CLIMBING <span>✳</span> SHOW UP <span>✳</span> FIND YOUR PACE <span>✳</span> KEEP CLIMBING <span>✳</span></div></div>

      <section className="moments-section" id="training" aria-labelledby="moments-title">
        <div className="moments-heading" data-reveal>
          <div><p className="eyebrow">THE PEAKFIT APPROACH / IN REAL LIFE</p><h2 id="moments-title">MADE FOR<br /><em>THE WORK.</em></h2></div>
          <p>Good training is personal.<br />Your plan should be, too.</p>
        </div>
        <div className="moments-grid">
          {trainingMoments.map((moment) => (
            <article className={moment.className} data-reveal key={moment.index}>
              <img src={moment.image} srcSet={moment.srcSet} sizes="(min-width: 1000px) 30vw, (min-width: 600px) 48vw, 100vw" alt={moment.alt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = "none" }} />
              <div className="moment-shade" />
              <p className="moment-index">{moment.index}</p>
              <h3>{moment.title}</h3>
              <ArrowUpRight className="moment-arrow" size={19} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading" data-reveal><div><p className="eyebrow">THE SYSTEM / 03 PARTS</p><h2>BUILT FOR<br /><em>THE LONG RUN.</em></h2></div><p className="section-aside">Small, deliberate steps.<br />Remarkable distance.</p></div>
        <div className="feature-list">
          {features.map(({ no, icon: Icon, title, text }) => <article className="feature-row" data-reveal key={no}><span className="feature-number">{no}</span><span className="feature-icon"><Icon size={22} strokeWidth={1.4} /></span><div className="feature-content"><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="feature-arrow" size={20} /></article>)}
        </div>
      </section>

      <section className="closing-section" data-reveal><div className="closing-glow" /><p className="eyebrow"><Sparkles size={13} /> YOUR NEXT REP STARTS HERE</p><h2>THE VIEW<br />IS BETTER <em>UP HERE.</em></h2><div className="closing-bottom"><p>Your next chapter is one good session away.</p><Link to="/signup" className="peak-cta-link">Build your program <ArrowUpRight size={17} /></Link></div><span className="closing-stamp">PEAKFIT / EST. FOR THE CLIMB</span></section>

      <footer className="peak-footer"><Link to="/" className="footer-brand">PEAK<span>FIT</span><sup>®</sup></Link><span>MADE FOR THE WORK.</span><Link to="/login" className="footer-login">MEMBER LOGIN <ArrowUpRight size={13} /></Link></footer>
    </div>
  )
}
