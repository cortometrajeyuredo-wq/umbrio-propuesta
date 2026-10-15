import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import handCursor from "../assets/ui/hand-cursor.webp";

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");
    let x = 0;
    let y = 0;
    let scale = 1;
    let frame = 0;
    const paint = () => {
      frame = 0;
      cursorRef.current?.style.setProperty("transform", `translate3d(${x - 47}px, ${y}px, 0) scale(${scale})`);
    };
    const schedulePaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const handleMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      schedulePaint();
    };
    const handleHover = (event: MouseEvent) => {
      const target = event.target;
      scale = target instanceof Element && target.closest("button, a, [role='button'], [data-clickable]") ? 1.35 : 1;
      schedulePaint();
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHover);
    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <Cursor ref={cursorRef} aria-hidden="true">
    <img src={handCursor} alt="" />
  </Cursor>;
};

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  will-change: transform;
  img { display: block; width: 50px; height: 50px; }
`;
