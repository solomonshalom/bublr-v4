/** @jsxImportSource @emotion/react */
import { useRef, useState, useCallback, useEffect } from 'react'
import { css } from '@emotion/react'
import { gsap } from 'gsap'

const signatureStyles = css`
  :root {
    --transition: 0.26s;
    --delay: 0.5s;
    --toggle-size: 44px;
    --surface-width: 380px;
    --surface-height: 200px;
    --shadow-color: 0 0% 0%;
    --shadow: 0px 0.5px 0.6px hsl(var(--shadow-color) / 0.07),
      0px 1.7px 2.2px -0.4px hsl(var(--shadow-color) / 0.09),
      0px 3.2px 4.1px -0.7px hsl(var(--shadow-color) / 0.11),
      -0.1px 6.1px 7.8px -1.1px hsl(var(--shadow-color) / 0.13),
      -0.2px 11.2px 14.3px -1.5px hsl(var(--shadow-color) / 0.15);
  }

  .signature-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1000;
  }

  .toggle {
    width: var(--toggle-size);
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: canvas;
    background: canvasText;
    border: 1px solid color-mix(in oklch, canvasText, #0000 85%);
    box-shadow: var(--shadow);
    cursor: pointer;
    pointer-events: all;

    svg {
      width: 20px;
      height: 20px;
    }

    &.signed {
      background: hsl(140 80% 90%);
      color: hsl(140 90% 30%);
    }
  }

  .popover {
    width: var(--surface-width);
    max-width: calc(100vw - 2rem);
    height: fit-content;
    border-radius: 6px;
    margin: 0;
    opacity: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
    background: canvasText;
    color: canvas;
    box-shadow: var(--shadow);
    position: fixed;
    pointer-events: all;
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
      opacity: 1;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      border: 1px solid color-mix(in oklch, canvas, canvasText 20%);
    }
  }

  .popover-content {
    padding: 0.5rem 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    font-size: 0.875rem;
  }

  .popover-header {
    display: flex;
    gap: 0 0.5rem;
    padding-inline: 0.875rem;
    color: color-mix(in oklch, canvas, canvasText 50%);

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .canvas-container {
    position: relative;
    height: 130px;
  }

  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    touch-action: none;
  }

  .animated {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;

    &.visible {
      opacity: 1;
    }

    svg {
      width: 100%;
      height: 100%;
      path {
        stroke-width: 3px;
        fill: none;
        stroke: currentColor;
      }
    }
  }

  .popover-footer {
    padding-inline: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .secondary-buttons {
    display: flex;
    gap: 0.25rem;

    button {
      display: grid;
      place-items: center;
      width: 32px;
      aspect-ratio: 1;
      border: 0;
      background: transparent;
      color: color-mix(in oklch, canvas, canvasText 50%);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: color-mix(in oklch, canvas, canvasText 10%);
        color: canvas;
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .hold-button {
    padding: 0.25rem 0.75rem;
    border: 0;
    border-radius: 4px;
    background: color-mix(in oklch, canvas, canvasText 10%);
    color: canvas;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all var(--transition) ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.confirmed {
      background: hsl(140 80% 90%);
      color: hsl(140 90% 30%);
    }
  }

  .targets {
    position: fixed;
    inset: 1.5rem;
    pointer-events: none;
  }

  .target {
    width: var(--toggle-size);
    aspect-ratio: 1;
    background: hsl(10 80% 50% / 0.2);
    border-radius: 50%;
    opacity: 0;
    position: fixed;

    &.active {
      background: hsl(150 80% 50% / 0.2);
    }

    &.target-north {
      top: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
    }

    &.target-west {
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
    }

    &.target-south-west {
      bottom: 1.5rem;
      left: 1.5rem;
    }

    &.target-south {
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
    }

    &.target-east {
      top: 50%;
      right: 1.5rem;
      transform: translateY(-50%);
    }

    &.target-south-east {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
`

export default function SignaturePad({ onSignatureComplete, onSignatureCleared }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const toggleRef = useRef(null)
  const popoverRef = useRef(null)
  const canvasRef = useRef(null)
  const animatedPathRef = useRef(null)
  const ctxRef = useRef(null)
  const strokesRef = useRef([])
  const currentStrokeRef = useRef(null)
  const signTimelineRef = useRef(null)

  const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const calibrateCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.floor(rect.width * DPR)
    canvas.height = Math.floor(rect.height * DPR)

    ctx.scale(DPR, DPR)
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = 'currentColor'
  }, [DPR])

  const getPoint = useCallback((event) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX || event.touches?.[0]?.clientX || 0) - rect.left
    const y = (event.clientY || event.touches?.[0]?.clientY || 0) - rect.top

    return {
      x,
      y,
      time: Date.now()
    }
  }, [])

  const isValidSignature = useCallback(() => {
    const strokes = strokesRef.current
    const MIN_POINTS = 20
    const MIN_DISTANCE = 100

    let totalPoints = 0
    let totalDistance = 0

    for (const stroke of strokes) {
      totalPoints += stroke.points.length
      for (let i = 1; i < stroke.points.length; i++) {
        const dx = stroke.points[i].x - stroke.points[i - 1].x
        const dy = stroke.points[i].y - stroke.points[i - 1].y
        totalDistance += Math.sqrt(dx * dx + dy * dy)
      }
    }

    return totalPoints >= MIN_POINTS && totalDistance >= MIN_DISTANCE
  }, [])

  const generateSVGPath = useCallback(() => {
    const strokes = strokesRef.current
    let path = ''
    
    for (const stroke of strokes) {
      const points = stroke.points
      if (points.length > 0) {
        path += `M ${points[0].x} ${points[0].y} `
        for (let i = 1; i < points.length; i++) {
          path += `L ${points[i].x} ${points[i].y} `
        }
      }
    }
    return path
  }, [])

  const render = useCallback(() => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    const strokes = strokesRef.current
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (const stroke of strokes) {
      const points = stroke.points
      if (points.length > 0) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()
      }
    }
  }, [])

  const startDrawing = useCallback((event) => {
    event.preventDefault()
    const point = getPoint(event)
    if (!point) return

    setIsDrawing(true)
    currentStrokeRef.current = { points: [point] }
    strokesRef.current.push(currentStrokeRef.current)
    
    gsap.ticker.add(render)
  }, [getPoint, render])

  const continueDrawing = useCallback((event) => {
    if (!isDrawing || !currentStrokeRef.current) return
    
    event.preventDefault()
    const point = getPoint(event)
    if (!point) return

    currentStrokeRef.current.points.push(point)
  }, [isDrawing, getPoint])

  const stopDrawing = useCallback((event) => {
    if (!isDrawing) return
    
    event.preventDefault()
    setIsDrawing(false)
    gsap.ticker.remove(render)
    
    const path = generateSVGPath()
    if (animatedPathRef.current) {
      animatedPathRef.current.setAttribute('d', path)
    }
    
    const valid = isValidSignature()
    setIsValid(valid)
  }, [isDrawing, render, generateSVGPath, isValidSignature])

  const clearSignature = useCallback(() => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    strokesRef.current = []
    setIsValid(false)
    setIsSigned(false)
    
    if (animatedPathRef.current) {
      animatedPathRef.current.setAttribute('d', '')
    }
    
    onSignatureCleared?.()
  }, [onSignatureCleared])

  const confirmSignature = useCallback(async () => {
    if (!isValid) return

    setIsSigning(true)
    
    // Simulate signature confirmation animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSigning(false)
    setIsSigned(true)
    
    const signatureData = {
      path: generateSVGPath(),
      strokes: strokesRef.current
    }
    
    onSignatureComplete?.(signatureData)
  }, [isValid, generateSVGPath, onSignatureComplete])

  const togglePopover = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (canvas && isOpen) {
      ctxRef.current = canvas.getContext('2d')
      calibrateCanvas()
    }
  }, [isOpen, calibrateCanvas])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (event) => {
      if (isOpen && popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div css={signatureStyles}>
      <div className="signature-container">
        {/* Toggle Button */}
        <button
          ref={toggleRef}
          className={`toggle ${isSigned ? 'signed' : ''}`}
          onClick={togglePopover}
          aria-label="Sign Document"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              style={{ opacity: isSigned ? 0 : 1 }}
              d="M12 20h9M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z"
            />
            <path 
              style={{ opacity: isSigned ? 1 : 0 }} 
              d="M20 6 9 17l-5-5"
            />
          </svg>
        </button>

        {/* Popover */}
        <div 
          ref={popoverRef}
          className={`popover ${isOpen ? 'open' : ''}`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="popover-content">
            <header className="popover-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 20h9M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z" />
              </svg>
              <span>Draw signature</span>
            </header>

            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={continueDrawing}
                onPointerUp={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={continueDrawing}
                onTouchEnd={stopDrawing}
              />
              <div className={`animated ${(isSigning || isSigned) ? 'visible' : ''}`}>
                <svg>
                  <path ref={animatedPathRef} />
                </svg>
              </div>
            </div>

            <footer className="popover-footer">
              <div className="secondary-buttons">
                <button onClick={clearSignature} aria-label="Erase">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
                    <path d="M22 21H7" />
                    <path d="m5 11 9 9" />
                  </svg>
                </button>
              </div>
              
              <button
                className={`hold-button ${isSigned ? 'confirmed' : ''}`}
                onClick={confirmSignature}
                disabled={!isValid || isSigning || isSigned}
                aria-label={isSigned ? 'Signed' : 'Hold to confirm'}
              >
                {isSigning ? 'Signing...' : isSigned ? 'Signed' : 'Hold to confirm'}
              </button>
            </footer>
          </div>
        </div>

        {/* Magnetic Targets */}
        <div className="targets">
          <div className="target target-north" />
          <div className="target target-west" />
          <div className="target target-south-west" />
          <div className="target target-south" />
          <div className="target target-south-east" />
          <div className="target target-east" />
        </div>
      </div>
    </div>
  )
}