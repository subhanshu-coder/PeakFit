import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Activity, CircleDot, Flame, MoveUpRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PeakOrb = lazy(() => import('@/components/PeakOrb'))

gsap.registerPlugin(ScrollTrigger)

const features = [
  { no: '01', icon: Activity, title: 'Training, with intent.', text: 'A program that adapts to your rhythm. Build your split, tune every session, and keep the momentum yours.' },
  { no: '02', icon: Flame, title: 'Fuel the work.', text: 'Turn your daily target into a clear plan. Practical macros that make sense in and out of the gym.' },
  { no: '03', icon: MoveUpRight, title: 'Progress you can feel.', text: 'Every rep becomes a signal. Track your work over time and see the strength you are building.' },
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
      <section className="peak-hero">
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
        <div className="hero-art" aria-label="Interactive three-dimensional PeakFit energy sculpture"><Suspense fallback={<div className="peak-orb-fallback" />}><PeakOrb /></Suspense></div>
        <div className="hero-coordinate">PF / 001 — PERSONAL TRAINING SYSTEM</div>
        <div className="hero-scroll"><ArrowDown size={14} /> SCROLL TO EXPLORE</div>
        <div className="hero-index">01 — 04</div>
        <div className="hero-note"><span>FIG. 01</span><br />The compounding<br />effect of showing up.</div>
      </section>

      <section className="manifesto" data-reveal>
        <div className="manifesto-side eyebrow">A BETTER KIND<br />OF STRONG <CircleDot size={13} /></div>
        <p>Not another plan you abandon.<br /><span>PeakFit makes consistency</span><br /><span>feel like your superpower.</span></p>
        <div className="manifesto-mark">P<span>F</span></div>
      </section>

      <div className="ticker-wrap"><div className="ticker-track">SHOW UP <span>✳</span> FIND YOUR PACE <span>✳</span> KEEP CLIMBING <span>✳</span> SHOW UP <span>✳</span> FIND YOUR PACE <span>✳</span> KEEP CLIMBING <span>✳</span></div></div>

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

