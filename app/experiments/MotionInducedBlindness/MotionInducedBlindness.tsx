import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  button,
  canvasSurface,
  formPanel,
  labelRow,
  labelText,
  rangeInput,
  splitLayout,
  surface,
  valueText,
} from "../../styles/primitives";

type MibParams = {
  dots: number;
  dotRadius: number;
  rotationSpeed: number; // radians per second
  maskRadius: number; // radius for dots distribution
  targetRadius: number;
  targetDistance: number; // distance from center for targets
};

const defaultParams: MibParams = {
  dots: 300,
  dotRadius: 2,
  rotationSpeed: 0.8,
  maskRadius: 180,
  targetRadius: 8,
  targetDistance: 80,
};

type Dot = { r: number; angle: number };

export function MotionInducedBlindness() {
  const [params, setParams] = useState<MibParams>(defaultParams);
  const [running, setRunning] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const baseAngleRef = useRef(0);

  const size = useMemo(() => ({ width: 480, height: 480 }), []);

  const dots = useMemo<Dot[]>(() => {
    const out: Dot[] = [];
    for (let i = 0; i < params.dots; i++) {
      // Distribute radius with sqrt for uniformity over area
      const rr = Math.sqrt(Math.random()) * params.maskRadius;
      const angle = Math.random() * Math.PI * 2;
      out.push({ r: rr, angle });
    }
    return out;
  }, [params.dots, params.maskRadius]);

  const draw = useCallback(
    (t: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = size;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // mask circle boundary (optional subtle vignette)
      ctx.save();
      ctx.translate(cx, cy);

      // Compute base rotation angle
      if (startTimeRef.current == null) startTimeRef.current = t;
      const elapsed = (t - startTimeRef.current) / 1000; // seconds
      const theta = baseAngleRef.current + elapsed * params.rotationSpeed;

      // Draw rotating blue dots
      ctx.fillStyle = '#3b82f6'; // blue-500
      for (const d of dots) {
        const a = d.angle + theta;
        const x = Math.cos(a) * d.r;
        const y = Math.sin(a) * d.r;
        ctx.beginPath();
        ctx.arc(x, y, params.dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fixation cross
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 10);
      ctx.stroke();

      // Stationary yellow targets (triangle)
      const td = params.targetDistance;
      const triAngles = [Math.PI / 2, (Math.PI / 2) + (2 * Math.PI) / 3, (Math.PI / 2) + (4 * Math.PI) / 3];
      ctx.fillStyle = '#facc15'; // yellow-400
      for (const ang of triAngles) {
        const x = Math.cos(ang) * td;
        const y = Math.sin(ang) * td;
        ctx.beginPath();
        ctx.arc(x, y, params.targetRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
    [dots, params.dotRadius, params.rotationSpeed, params.targetDistance, params.targetRadius, size]
  );

  // Animation loop
  useEffect(() => {
    const loop = (ts: number) => {
      draw(ts);
      rafRef.current = requestAnimationFrame(loop);
    };
    if (running && typeof requestAnimationFrame === 'function') {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafRef.current != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(rafRef.current);
      }
      // Preserve current angle so toggling pause resumes smoothly
      if (startTimeRef.current != null) {
        const now = performance.now();
        const elapsed = (now - startTimeRef.current) / 1000;
        baseAngleRef.current += elapsed * params.rotationSpeed;
        startTimeRef.current = null;
      }
    };
  }, [draw, running, params.rotationSpeed]);

  // Ensure canvas size matches selected mask radius comfortably
  const canvasSize = useMemo(() => {
    const pad = 40;
    const dim = Math.max(size.width, size.height, params.maskRadius * 2 + pad);
    return { width: dim, height: dim };
  }, [params.maskRadius, size.height, size.width]);

  return (
    <div className={splitLayout()}>
      <div className={surface({ tone: "contrast", overflow: "auto", width: "full" })}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className={canvasSurface()}
          aria-label="Motion-Induced Blindness canvas"
        />
      </div>
      <form className={formPanel()} onSubmit={(e) => e.preventDefault()}>
        <Toggle label={running ? 'Pause' : 'Play'} onClick={() => setRunning((v) => !v)} active={!running} />
        <Slider label="Dots" value={params.dots} min={50} max={1000} step={10} onChange={(v) => setParams((p) => ({ ...p, dots: v }))} />
        <Slider label="Dot Radius" value={params.dotRadius} min={1} max={5} step={1} onChange={(v) => setParams((p) => ({ ...p, dotRadius: v }))} />
        <Slider label="Rotation Speed" value={params.rotationSpeed} min={0} max={2} step={0.05} onChange={(v) => setParams((p) => ({ ...p, rotationSpeed: v }))} />
        <Slider label="Mask Radius" value={params.maskRadius} min={60} max={300} step={10} onChange={(v) => setParams((p) => ({ ...p, maskRadius: v }))} />
        <Slider label="Target Radius" value={params.targetRadius} min={4} max={20} step={1} onChange={(v) => setParams((p) => ({ ...p, targetRadius: v }))} />
        <Slider label="Target Distance" value={params.targetDistance} min={40} max={160} step={5} onChange={(v) => setParams((p) => ({ ...p, targetDistance: v }))} />
      </form>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-') + '-input';
  return (
    <div>
      <div className={labelRow()}>
        <label htmlFor={id} className={labelText()}>{label}</label>
        <span className={valueText()}>{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={rangeInput()}
        aria-label={label}
      />
    </div>
  );
}

function Toggle({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) {
  return (
    <button type="button" className={button({ active })} onClick={onClick}>
      {label}
    </button>
  );
}

export default MotionInducedBlindness;
