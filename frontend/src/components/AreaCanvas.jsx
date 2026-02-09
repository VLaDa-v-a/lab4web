import React, { useRef, useEffect } from 'react';
import '../styles/AreaCanvas.css';

const AreaCanvas = ({ r, results, onCanvasClick }) => {
  const canvasRef = useRef(null);
  const WIDTH = 400;
  const HEIGHT = 400;
  const CENTER_X = WIDTH / 2;
  const CENTER_Y = HEIGHT / 2;
  const R_PIXELS = 120;

  const isHitArea = (x, y, currentR) => {
    if (!currentR || currentR === 0) return false;
    const absR = Math.abs(currentR);
    let checkX = x;
    let checkY = y;
    if (currentR < 0) {
      checkX = -x;
      checkY = -y;
    }
    const inRect = checkX >= -absR && checkX <= 0 && checkY >= 0 && checkY <= absR;
    const inQuarterCircle = checkX >= 0 && checkY <= 0 && (checkX * checkX + checkY * checkY) <= absR * absR;
    const inTriangle = checkX <= 0 && checkY <= 0 && (checkX + checkY) >= -absR;
    return inRect || inQuarterCircle || inTriangle;
  };

  useEffect(() => {
    drawCanvas();
  }, [r, results]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const absR = r ? Math.abs(r) : 0;
    const unitScale = absR > 0 ? R_PIXELS / absR : R_PIXELS;

    if (absR > 0) {
      ctx.fillStyle = 'rgba(70, 130, 255, 0.35)';
      ctx.strokeStyle = 'rgba(70, 130, 255, 0.7)';
      ctx.lineWidth = 2;

      ctx.fillRect(CENTER_X - R_PIXELS, CENTER_Y - R_PIXELS, R_PIXELS, R_PIXELS);
      ctx.strokeRect(CENTER_X - R_PIXELS, CENTER_Y - R_PIXELS, R_PIXELS, R_PIXELS);

      ctx.beginPath();
      ctx.moveTo(CENTER_X, CENTER_Y);
      ctx.arc(CENTER_X, CENTER_Y, R_PIXELS, 0, Math.PI / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(CENTER_X, CENTER_Y);                          // (0, 0)
      ctx.lineTo(CENTER_X - R_PIXELS, CENTER_Y);               // (-R, 0)
      ctx.lineTo(CENTER_X, CENTER_Y + R_PIXELS);               // (0, -R)
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const px = CENTER_X + i * (R_PIXELS / 2);
      const py = CENTER_Y - i * (R_PIXELS / 2);
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, HEIGHT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(WIDTH, py); ctx.stroke();
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, CENTER_Y); ctx.lineTo(WIDTH, CENTER_Y);
    ctx.moveTo(CENTER_X, 0); ctx.lineTo(CENTER_X, HEIGHT);
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(WIDTH - 10, CENTER_Y - 5); ctx.lineTo(WIDTH, CENTER_Y); ctx.lineTo(WIDTH - 10, CENTER_Y + 5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(CENTER_X - 5, 10); ctx.lineTo(CENTER_X, 0); ctx.lineTo(CENTER_X + 5, 10);
    ctx.fill();

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText('x', WIDTH - 20, CENTER_Y - 10);
    ctx.fillText('y', CENTER_X + 10, 20);

    if (absR > 0) {
      ctx.font = '12px Arial';
      ctx.fillStyle = '#333';

      const xLabels = [
        { val: absR, label: 'R' },
        { val: -absR, label: '-R' },
        { val: absR / 2, label: 'R/2' },
        { val: -absR / 2, label: '-R/2' },
      ];
      xLabels.forEach(({ val, label }) => {
        const px = CENTER_X + val * unitScale;
        ctx.strokeStyle = 'black'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px, CENTER_Y - 4); ctx.lineTo(px, CENTER_Y + 4); ctx.stroke();
        ctx.textAlign = 'center';
        ctx.fillText(label, px, CENTER_Y + 18);
      });

      const yLabels = [
        { val: absR, label: 'R' },
        { val: -absR, label: '-R' },
        { val: absR / 2, label: 'R/2' },
        { val: -absR / 2, label: '-R/2' },
      ];
      yLabels.forEach(({ val, label }) => {
        const py = CENTER_Y - val * unitScale;
        ctx.strokeStyle = 'black'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(CENTER_X - 4, py); ctx.lineTo(CENTER_X + 4, py); ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(label, CENTER_X - 8, py + 4);
      });
    }

    if (results && results.length > 0 && absR > 0) {
      results.forEach((result) => {
        const pointX = parseFloat(result.x);
        const pointY = parseFloat(result.y);
        const pointR = parseFloat(result.r);

        const displayX = r < 0 ? -pointX : pointX;
        const displayY = r < 0 ? -pointY : pointY;

        const px = CENTER_X + displayX * unitScale;
        const py = CENTER_Y - displayY * unitScale;

        if (px < -10 || px > WIDTH + 10 || py < -10 || py > HEIGHT + 10) return;

        let hit;
        if (Math.abs(pointR - r) < 1e-9) {
          hit = result.hit;
        } else {
          hit = isHitArea(pointX, pointY, r);
        }

        ctx.fillStyle = hit ? 'rgba(0, 180, 0, 0.8)' : 'rgba(220, 0, 0, 0.8)';
        ctx.strokeStyle = hit ? 'darkgreen' : 'darkred';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    }
  };

  const handleClick = (e) => {
    if (!r || r === 0) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const absR = Math.abs(r);
    const unitScale = R_PIXELS / absR;
    let x = parseFloat(((clickX - CENTER_X) / unitScale).toFixed(2));
    let y = parseFloat(((CENTER_Y - clickY) / unitScale).toFixed(2));

    if (r < 0) {
      x = -x;
      y = -y;
    }

    onCanvasClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className="area-canvas"
      onClick={handleClick}
    />
  );
};

export default AreaCanvas;
