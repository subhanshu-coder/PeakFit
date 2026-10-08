import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function PeakOrb() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 8.4)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(element.clientWidth, element.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    element.appendChild(renderer.domElement)

    const sculpture = new THREE.Group()
    scene.add(sculpture)
    const lime = new THREE.MeshStandardMaterial({ color: 0xbaff3b, metalness: 0.74, roughness: 0.22, emissive: 0x29410a, emissiveIntensity: 0.25 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x18211b, metalness: 0.86, roughness: 0.24, wireframe: false })
    const wire = new THREE.MeshBasicMaterial({ color: 0xbaff3b, wireframe: true, transparent: true, opacity: 0.18 })

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 4), lime)
    sculpture.add(core)
    const innerWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.21, 2), wire)
    sculpture.add(innerWire)

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.055, 16, 180), dark)
    ringA.rotation.set(0.55, 0.2, -0.35)
    sculpture.add(ringA)
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.53, 0.022, 12, 160), lime)
    ringB.rotation.set(-0.7, 0.45, 0.62)
    sculpture.add(ringB)
    const ringC = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.012, 8, 160), wire)
    ringC.rotation.set(0.92, -0.4, 0.15)
    sculpture.add(ringC)

    const count = 220
    const positions = new Float32Array(count * 3)
    const random = (min: number, max: number) => min + Math.random() * (max - min)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = random(-3.1, 3.1)
      positions[i * 3 + 1] = random(-3.1, 3.1)
      positions[i * 3 + 2] = random(-1.5, 1.8)
    }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xd9ff9b, size: 0.018, transparent: true, opacity: 0.68 }))
    scene.add(dust)

    scene.add(new THREE.AmbientLight(0xffffff, 1.4))
    const key = new THREE.PointLight(0xbaff3b, 42, 12)
    key.position.set(2.5, 1.8, 3.4)
    scene.add(key)
    const fill = new THREE.PointLight(0xe5ffce, 24, 10)
    fill.position.set(-2, -1.5, 2)
    scene.add(fill)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rotate = reduced ? null : gsap.to(sculpture.rotation, { y: Math.PI * 2, x: 0.2, duration: 26, repeat: -1, ease: 'none' })
    const float = reduced ? null : gsap.to(sculpture.position, { y: 0.13, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24
    }
    element.addEventListener('pointermove', onPointerMove, { passive: true })
    const resize = () => {
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.position.z = width < 560 ? 10 : 8.4
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    let frame = 0
    const render = () => {
      sculpture.rotation.x += (pointerY - sculpture.rotation.x) * 0.025
      sculpture.rotation.z += (pointerX - sculpture.rotation.z) * 0.025
      dust.rotation.y += 0.00018
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      element.removeEventListener('pointermove', onPointerMove)
      rotate?.kill()
      float?.kill()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach((item) => item.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className="peak-orb" aria-hidden="true" />
}

