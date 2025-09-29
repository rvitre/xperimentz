import { useEffect, useMemo, useRef, useState } from "react";
import { RangeField } from "../../../components/RangeField/RangeField";
import { canvasSurface, formPanel, splitLayout, surface } from "../../../styles/primitives";

type CafeWallParams = {
  cols: number;
  rows: number;
  tile: number; // tile size in px (square)
  mortar: number; // line thickness in px
  offset: number; // horizontal offset in px for alternating rows
};

const defaultParams: CafeWallParams = {
  cols: 12,
  rows: 12,
  tile: 24,
  mortar: 2,
  offset: 12,
};

export function CafeWallDemo() {
  const [params, setParams] = useState<CafeWallParams>(defaultParams);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const size = useMemo(() => {
    const width = params.cols * params.tile + params.offset;
    const height = params.rows * (params.tile + params.mortar) + params.mortar;
    return { width, height };
  }, [params]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size.width;
    canvas.height = size.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // jsdom or unsupported

    // Fill background (mortar color)
    ctx.fillStyle = "#9ca3af"; // gray-400
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw rows of tiles
    for (let r = 0; r < params.rows; r++) {
      const y = r * (params.tile + params.mortar) + params.mortar;
      const xOffset = r % 2 === 0 ? 0 : params.offset;
      for (let c = 0; c < params.cols; c++) {
        const x = c * params.tile + xOffset;
        // alternate black/white tiles
        const isBlack = c % 2 === 0;
        ctx.fillStyle = isBlack ? "#000000" : "#ffffff";
        ctx.fillRect(x, y, params.tile, params.tile);
      }
    }
  }, [params, size]);

  return (
    <div className={splitLayout()}>
      <div className={surface({ tone: "subtle", overflow: "auto", width: "full" })}>
        <canvas
          ref={canvasRef}
          width={size.width}
          height={size.height}
          className={canvasSurface()}
          aria-label="Cafe Wall illusion canvas"
        />
      </div>
      <form className={formPanel()} onSubmit={(e) => e.preventDefault()}>
        <RangeField label="Columns" value={params.cols} min={4} max={40} step={1} onChange={(v) => setParams((p) => ({ ...p, cols: v }))} />
        <RangeField label="Rows" value={params.rows} min={4} max={40} step={1} onChange={(v) => setParams((p) => ({ ...p, rows: v }))} />
        <RangeField label="Tile Size" value={params.tile} min={6} max={64} step={2} onChange={(v) => setParams((p) => ({ ...p, tile: v }))} />
        <RangeField label="Mortar" value={params.mortar} min={1} max={8} step={1} onChange={(v) => setParams((p) => ({ ...p, mortar: v }))} />
        <RangeField label="Offset" value={params.offset} min={0} max={64} step={1} onChange={(v) => setParams((p) => ({ ...p, offset: v }))} />
      </form>
    </div>
  );
}

export default CafeWallDemo;
