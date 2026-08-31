import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

/**
 * Universal Rive Animation Component with High-Performance Canvas Fallback.
 * 
 * Supports:
 * 1. .riv files with State Machines & inputs (number, boolean, trigger).
 * 2. Standalone procedural 60fps Canvas Fallback State Machines when .riv is loading,
 *    not supplied, or operating in offline/lightweight mode.
 */
export default function RiveAnimation({
  src,
  artboard,
  stateMachines,
  inputs = {},
  fallbackRender,
  fallbackType = 'default',
  className = '',
  style = {},
  width,
  height,
  autoplay = true,
  onLoad
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const prevTimeRef = useRef(performance.now());
  const [loadFailed, setLoadFailed] = useState(!src);

  // Rive hook setup
  const riveOptions = useMemo(() => {
    if (!src) return null;
    return {
      src,
      artboard,
      stateMachines: stateMachines || ['State Machine 1'],
      autoplay,
      onLoad: (riveInstance) => {
        setLoadFailed(false);
        if (onLoad) onLoad(riveInstance);
      },
      onLoadError: () => {
        setLoadFailed(true);
      }
    };
  }, [src, artboard, stateMachines, autoplay, onLoad]);

  const riveHook = useRive(riveOptions || {});
  const { rive, RiveComponent } = riveHook || {};

  // Update Rive State Machine Inputs when inputs prop changes
  useEffect(() => {
    if (!rive || loadFailed) return;
    try {
      const smNames = Array.isArray(stateMachines)
        ? stateMachines
        : [stateMachines || 'State Machine 1'];

      smNames.forEach((smName) => {
        const smInputs = rive.stateMachineInputs(smName);
        if (!smInputs) return;

        smInputs.forEach((input) => {
          if (inputs[input.name] !== undefined) {
            if (typeof inputs[input.name] === 'boolean') {
              input.value = inputs[input.name];
            } else if (typeof inputs[input.name] === 'number') {
              input.value = inputs[input.name];
            } else if (inputs[input.name] === 'trigger' || inputs[input.name] === true) {
              if (typeof input.fire === 'function') input.fire();
            }
          }
        });
      });
    } catch {
      // Gracefully handle any Rive input binding issues
    }
  }, [rive, inputs, stateMachines, loadFailed]);

  // Fallback Canvas State Machine Loop
  useEffect(() => {
    // Only run procedural canvas loop if Rive is not active or load failed or no src
    if (!loadFailed && src && rive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const renderLoop = (now) => {
      if (!isRunning) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const displayWidth = width || rect.width || 200;
      const displayHeight = height || rect.height || 200;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const elapsed = (now - startTimeRef.current) / 1000;
      const delta = (now - prevTimeRef.current) / 1000;
      prevTimeRef.current = now;

      // Clear canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      if (typeof fallbackRender === 'function') {
        fallbackRender({
          ctx,
          width: displayWidth,
          height: displayHeight,
          time: elapsed,
          delta,
          inputs
        });
      } else {
        // Default animated energy pulse
        drawDefaultPulse(ctx, displayWidth, displayHeight, elapsed, inputs);
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [src, loadFailed, rive, fallbackRender, fallbackType, inputs, width, height]);

  if (!loadFailed && src && RiveComponent) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <RiveComponent className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden inline-flex items-center justify-center ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
      />
    </div>
  );
}

/**
 * Built-in default state-machine fallback visualizer (Energy Core)
 */
function drawDefaultPulse(ctx, w, h, time, inputs = {}) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.35;
  const isTyping = Boolean(inputs.isTyping);
  const speed = isTyping ? 3 : 1;

  // Outer ambient glow
  const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius * 1.3);
  grad.addColorStop(0, isTyping ? 'rgba(56, 189, 248, 0.4)' : 'rgba(99, 102, 241, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Rotating orbital ring
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * speed);
  ctx.strokeStyle = isTyping ? '#38bdf8' : '#818cf8';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 12]);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Central core
  const corePulse = Math.sin(time * speed * 2) * 4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.5 + corePulse, 0, Math.PI * 2);
  ctx.fillStyle = isTyping ? '#0284c7' : '#4f46e5';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
}
