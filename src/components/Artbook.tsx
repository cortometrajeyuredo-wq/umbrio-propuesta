import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import styled, { css, keyframes } from "styled-components";
import { ARTBOOK_PAGE_COUNT, artbookPageUrl, getArtbookTurn, type ArtbookTurn } from "./artbookPages";

export const Artbook = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [turn, setTurn] = useState<ArtbookTurn | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const turnPage = useCallback((step: -1 | 1) => {
    if (turn) return;
    const next = getArtbookTurn(page, step);
    if (!next) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPage(next.to);
    } else {
      setTurn(next);
    }
  }, [page, turn]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href]'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onArrow = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") turnPage(1);
      if (event.key === "ArrowLeft") turnPage(-1);
    };
    document.addEventListener("keydown", onArrow);
    return () => document.removeEventListener("keydown", onArrow);
  }, [open, turnPage]);

  useEffect(() => {
    if (!open) return;
    for (const next of [page - 1, page + 1]) {
      if (next >= 1 && next <= ARTBOOK_PAGE_COUNT) {
        const preload = new Image();
        preload.src = artbookPageUrl(next);
      }
    }
  }, [open, page]);

  const openBook = () => {
    setPage(1);
    setTurn(null);
    setOpen(true);
  };

  return (
    <>
      <Section id="Artbook" data-reveal>
        <SectionContent>
          <Intro>
            <Eyebrow>EL UNIVERSO DETRÁS DE LA HISTORIA</Eyebrow>
            <h2>ARTBOOK</h2>
            <p>
              Bocetos, personajes, escenarios y decisiones visuales reunidos en las
              56 páginas originales del proyecto.
            </p>
            <OpenButton ref={triggerRef} type="button" onClick={openBook}>
              <BookOpen size={21} aria-hidden="true" /> Abrir el artbook
            </OpenButton>
          </Intro>
          <CoverButton type="button" onClick={openBook} aria-label="Abrir el artbook de Umbrío">
            <CoverPages aria-hidden="true" />
            <img src={artbookPageUrl(1)} alt="" loading="lazy" />
            <CoverCaption>56 PÁGINAS · ARTE Y PROCESO</CoverCaption>
          </CoverButton>
        </SectionContent>
      </Section>

      {open && createPortal(
        <Overlay onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="artbook-title">
            <DialogHeader>
              <DialogTitle id="artbook-title"><BookOpen size={22} aria-hidden="true" /> Artbook de Umbrío</DialogTitle>
              <CloseButton ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Cerrar artbook">
                <X size={25} aria-hidden="true" />
              </CloseButton>
            </DialogHeader>

            <BookArea>
              <BookFrame>
                <PageImage
                  src={artbookPageUrl(turn?.to ?? page)}
                  alt={`Artbook de Umbrío, página ${turn?.to ?? page} de ${ARTBOOK_PAGE_COUNT}`}
                />
                {turn && (
                  <TurningSheet
                    $direction={turn.direction}
                    onAnimationEnd={(event) => {
                      if (event.target !== event.currentTarget) return;
                      setPage(turn.to);
                      setTurn(null);
                    }}
                    aria-hidden="true"
                  >
                    <SheetFace $back={false}><img src={artbookPageUrl(turn.from)} alt="" /></SheetFace>
                    <SheetFace $back><img src={artbookPageUrl(turn.to)} alt="" /></SheetFace>
                  </TurningSheet>
                )}
                <PageHotspot type="button" $side="left" onClick={() => turnPage(-1)} disabled={page === 1 || !!turn} aria-label="Voltear a la página anterior" />
                <PageHotspot type="button" $side="right" onClick={() => turnPage(1)} disabled={page === ARTBOOK_PAGE_COUNT || !!turn} aria-label="Voltear a la página siguiente" />
              </BookFrame>
            </BookArea>

            <Controls>
              <PageButton type="button" onClick={() => turnPage(-1)} disabled={page === 1 || !!turn} aria-label="Página anterior">
                <ChevronLeft size={22} aria-hidden="true" /> Anterior
              </PageButton>
              <Counter aria-live="polite">{turn?.to ?? page} <span>/ {ARTBOOK_PAGE_COUNT}</span></Counter>
              <PageButton type="button" onClick={() => turnPage(1)} disabled={page === ARTBOOK_PAGE_COUNT || !!turn} aria-label="Página siguiente">
                Siguiente <ChevronRight size={22} aria-hidden="true" />
              </PageButton>
            </Controls>
            <KeyboardHint>Haz clic en los lados de la hoja o usa las flechas para pasar páginas · Esc para cerrar</KeyboardHint>
            <FullsizeLink href={artbookPageUrl(page)} target="_blank" rel="noopener noreferrer">
              Ampliar esta página
            </FullsizeLink>
          </Dialog>
        </Overlay>,
        document.body
      )}
    </>
  );
};

const flipForward = keyframes`
  from { transform: rotateY(0); }
  to { transform: rotateY(-180deg); }
`;

const flipBackward = keyframes`
  from { transform: rotateY(0); }
  to { transform: rotateY(180deg); }
`;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(80px, 9vw, 150px) 24px;
  background: radial-gradient(ellipse at 72% 38%, #34204f 0%, #150d23 44%, #050407 83%);
  color: #f7eddc;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, #000, transparent 22%, transparent 78%, #000);
    pointer-events: none;
  }
`;

const SectionContent = styled.div`
  position: relative;
  width: min(100%, 1180px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr);
  align-items: center;
  gap: clamp(36px, 6vw, 95px);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Intro = styled.div`
  h2 {
    margin: 14px 0 18px;
    color: #f4a009;
    font-family: var(--heading), "Amarante", serif;
    font-size: clamp(3.2rem, 7vw, 6rem);
    line-height: 1;
  }

  p {
    max-width: 390px;
    margin: 0 0 30px;
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    line-height: 1.65;
  }
`;

const Eyebrow = styled.span`
  color: #c9a0df;
  font-size: .77rem;
  font-weight: 700;
  letter-spacing: .23em;
`;

const OpenButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 22px;
  border: 1px solid #f4a009;
  border-radius: 999px;
  background: #f4a009;
  color: #150b1a;
  font-family: var(--heading), "Amarante", serif;
  font-size: 1.08rem;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;

  &:hover { transform: translateY(-3px); box-shadow: 0 12px 30px #f4a00955; }
  &:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
`;

const CoverButton = styled.button`
  position: relative;
  width: 100%;
  padding: 0;
  border: 5px solid #4b3450;
  border-left: 13px solid #1e1129;
  border-radius: 5px 12px 12px 5px;
  background: #140c21;
  box-shadow: 22px 28px 50px #0009, inset 8px 0 12px #0009;
  cursor: pointer;
  transform: perspective(1200px) rotateY(-7deg) rotateZ(1deg);
  transition: transform .35s ease, box-shadow .35s ease;

  img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
  &:hover { transform: perspective(1200px) rotateY(-2deg) rotateZ(0); box-shadow: 25px 34px 65px #000b; }
  &:focus-visible { outline: 3px solid #f4a009; outline-offset: 8px; }

  @media (prefers-reduced-motion: reduce) { transition: none; transform: none; }
`;

const CoverPages = styled.span`
  position: absolute;
  left: 6px;
  right: -11px;
  top: 6px;
  bottom: -10px;
  z-index: -1;
  border-radius: 3px 10px 10px 3px;
  background: repeating-linear-gradient(to bottom, #d9ced0 0 2px, #8b7e8d 2px 3px);
`;

const CoverCaption = styled.span`
  position: absolute;
  right: 14px;
  bottom: 13px;
  padding: 8px 11px;
  border-radius: 4px;
  background: #100b1fc7;
  color: #fff;
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .12em;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-items: center;
  padding: 12px;
  background: #050308ed;
  backdrop-filter: blur(14px);
`;

const Dialog = styled.div`
  box-sizing: border-box;
  width: min(100%, 1400px);
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  padding: clamp(12px, 2vw, 24px);
  border: 1px solid #6c4a7c;
  border-radius: 16px;
  background: radial-gradient(ellipse at 50% 40%, #2b1938, #0e0914 75%);
  box-shadow: 0 28px 100px #000;
  color: #f7eddc;
`;

const DialogHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
`;

const DialogTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: #f4a009;
  font-family: var(--heading), "Amarante", serif;
  font-size: clamp(1.1rem, 2vw, 1.55rem);
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
  border: 1px solid #9874a4;
  border-radius: 50%;
  background: #2c1a39;
  color: #fff;
  cursor: pointer;
  &:hover { background: #58316b; }
  &:focus-visible { outline: 3px solid #f4a009; }
`;

const BookArea = styled.div`
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookFrame = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(100%, 1180px, 118dvh);
  aspect-ratio: 16 / 9;
  max-height: calc(100dvh - 190px);
  overflow: hidden;
  perspective: 1800px;
  border: clamp(4px, .7vw, 9px) solid #37203d;
  border-left-width: clamp(9px, 1.4vw, 18px);
  border-radius: 5px 11px 11px 5px;
  background: #e7e0df;
  box-shadow: 12px 18px 0 -8px #c3b4bd, 22px 30px 45px #000a, inset 9px 0 14px #0004;

  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    inset: 0 auto 0 0;
    width: 22px;
    background: linear-gradient(to right, #180b20a8, transparent);
    pointer-events: none;
  }
`;

const PageImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TurningSheet = styled.div<{ $direction: -1 | 1 }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  transform-style: preserve-3d;
  transform-origin: ${({ $direction }) => $direction === 1 ? "left center" : "right center"};
  ${({ $direction }) => css`animation: ${$direction === 1 ? flipForward : flipBackward} .85s cubic-bezier(.45, .02, .25, 1) both;`}
  box-shadow: 10px 8px 18px #160d1b88;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const SheetFace = styled.div<{ $back: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: ${({ $back }) => $back ? "rotateY(180deg)" : "none"};
  background: #e7e0df;
  box-shadow: inset 0 0 28px #24142b38;

  img { display: block; width: 100%; height: 100%; object-fit: contain; }
`;

const PageHotspot = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  ${({ $side }) => $side === "left" ? "left: 0;" : "right: 0;"}
  width: 50%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};

  &:hover:not(:disabled) {
    background: ${({ $side }) => $side === "left"
      ? "linear-gradient(to right, #f4a00930, transparent 35%)"
      : "linear-gradient(to left, #f4a00930, transparent 35%)"};
  }
  &:focus-visible { outline: 3px solid #f4a009; outline-offset: -5px; }
`;

const Controls = styled.div`
  width: min(100%, 560px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 116px;
  min-height: 42px;
  padding: 9px 13px;
  border: 1px solid #8b6c93;
  border-radius: 999px;
  background: #3a2249;
  color: #fff;
  font: inherit;
  cursor: pointer;
  &:hover:not(:disabled) { background: #633577; }
  &:disabled { opacity: .35; cursor: not-allowed; }
  &:focus-visible { outline: 3px solid #f4a009; outline-offset: 3px; }

  @media (max-width: 420px) { min-width: 0; font-size: .85rem; }
`;

const Counter = styled.span`
  color: #f4a009;
  font-family: var(--heading), "Amarante", serif;
  font-size: 1.2rem;
  white-space: nowrap;
  span { color: #c8b8c6; }
`;

const KeyboardHint = styled.p`
  margin: 12px 0 0;
  color: #bcaabe;
  font-size: .78rem;
  text-align: center;
  @media (max-width: 600px) { display: none; }
`;

const FullsizeLink = styled.a`
  margin-top: 8px;
  color: #cda9dc;
  font-size: .78rem;
  text-underline-offset: 3px;
  &:hover { color: #fff; }
  &:focus-visible { outline: 2px solid #f4a009; outline-offset: 3px; }
`;
