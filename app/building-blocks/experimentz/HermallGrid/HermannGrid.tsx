import { useEffect, useMemo, useRef, useState } from "react";
import { RangeField } from "../../../components/RangeField/RangeField";
import { CheckboxField } from "../../../components/CheckboxField/CheckboxField";
import { ToggleButtonField } from "../../../components/ToggleButtonField/ToggleButtonField";
import {
  canvasSurface,
  formPanel,
  splitLayout,
  surface,
} from "../../../styles/primitives";

type GridParams = {
  rows: number;
  cols: number;
  bar: number; // thickness of white bars
  gap: number; // spacing between bars (black squares)
  size: number; // size of a black cell
  inverted: boolean; // invert colors
};

const defaults: GridParams = {
  rows: 10,
  cols: 10,
  bar: 18,
  gap: 48,
  size: 48,
  inverted: false,
};

export function HermannGrid() {
  const [p, setP] = useState<GridParams>(defaults);
  const [showMarkers, setShowMarkers] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dims = useMemo(() => {
    const width = p.cols * p.size + (p.cols + 1) * p.bar;
    const height = p.rows * p.size + (p.rows + 1) * p.bar;
    return { width, height };
  }, [p.bar, p.cols, p.rows, p.size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dims.width;
    canvas.height = dims.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = p.inverted ? "#ffffff" : "#0a0a0a";
    const barColor = p.inverted ? "#0a0a0a" : "#ffffff";
    const cellColor = p.inverted ? "#ffffff" : "#0a0a0a";

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid bars (Hermann grid is usually white bars over black squares)
    ctx.fillStyle = cellColor;
    // draw black squares area
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // vertical bars
    ctx.fillStyle = barColor;
    for (let c = 0; c <= p.cols; c++) {
      const x = c * (p.size + p.bar);
      ctx.fillRect(x, 0, p.bar, canvas.height);
    }
    // horizontal bars
    for (let r = 0; r <= p.rows; r++) {
      const y = r * (p.size + p.bar);
      ctx.fillRect(0, y, canvas.width, p.bar);
    }

    if (showMarkers) {
      // Draw small markers at intersections (excluding outer border intersections)
      ctx.save();
      ctx.fillStyle = "#ef4444"; // red-500
      const rad = Math.max(2, Math.floor(p.bar / 4));
      for (let r = 1; r < p.rows; r++) {
        const y = r * (p.size + p.bar) + p.bar / 2;
        for (let c = 1; c < p.cols; c++) {
          const x = c * (p.size + p.bar) + p.bar / 2;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }, [dims.height, dims.width, p.bar, p.cols, p.inverted, p.rows, p.size, showMarkers]);

  return (
    <div className={splitLayout()}>
      <div className={surface({ tone: "contrast", overflow: "auto", width: "full" })}>
        <canvas
          ref={canvasRef}
          width={dims.width}
          height={dims.height}
          className={canvasSurface()}
          aria-label="Hermann Grid canvas"
        />
      </div>
      <form className={formPanel()} onSubmit={(e) => e.preventDefault()}>
        <ToggleButtonField
          selectedLabel="Hide Intersection Markers"
          unselectedLabel="Show Intersection Markers"
          isSelected={showMarkers}
          onChange={setShowMarkers}
        />
        <RangeField label="Rows" value={p.rows} min={4} max={20} step={1} onChange={(v) => setP((s) => ({ ...s, rows: v }))} />
        <RangeField label="Columns" value={p.cols} min={4} max={20} step={1} onChange={(v) => setP((s) => ({ ...s, cols: v }))} />
        <RangeField label="Bar" value={p.bar} min={6} max={48} step={1} onChange={(v) => setP((s) => ({ ...s, bar: v }))} />
        <RangeField label="Cell Size" value={p.size} min={24} max={96} step={2} onChange={(v) => setP((s) => ({ ...s, size: v }))} />
        <CheckboxField
          label="Invert Colors"
          isSelected={p.inverted}
          onChange={(selected) => setP((s) => ({ ...s, inverted: selected }))}
        />
      </form>
    </div>
  );
}

export default HermannGrid;
