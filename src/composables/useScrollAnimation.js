import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const animateOnScroll = (selector, options = {}) => {
    const defaults = {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }

    const config = { ...defaults, ...options }

    return gsap.from(selector, config)
  }

  const parallax = (selector, speed = 0.5) => {
    return gsap.to(selector, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  const fadeInUp = (selector, delay = 0) => {
    return gsap.from(selector, {
      opacity: 0,
      y: 60,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
      }
    })
  }

  const scaleIn = (selector, delay = 0) => {
    return gsap.from(selector, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
      }
    })
  }

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  return {
    animateOnScroll,
    parallax,
    fadeInUp,
    scaleIn
  }
}