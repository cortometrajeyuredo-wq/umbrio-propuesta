import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import { ARTBOOK_PAGE_COUNT, artbookPageUrl, clampArtbookPage, getArtbookTurn, type ArtbookTurn } from "./artbookPages";

const FLIP_MS = 450;
const pageNumbers = Array.from({ length: ARTBOOK_PAGE_COUNT }, (_, index) => index + 1);

export const Artbook = () => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [page, setPage] = useState(1);
  const [turn, setTurn] = useState<ArtbookTurn | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const zoomCloseRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // Un clic durante la animación termina el giro en curso y sigue con el siguiente: nunca hace falta doble clic.
  const turnPage = useCallback((step: -1 | 1) => {
    const current = turn ? turn.to : page;
    const next = getArtbookTurn(current, step);
    if (turn) setPage(turn.to);
    if (!next) { setTurn(null); return; }
    if (zoom || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTurn(null);
      setPage(next.to);
    } else {
      setTurn(next);
    }
  }, [page, turn, zoom]);

  const goTo = (target: number) => {
    setTurn(null);
    setPage(clampArtbookPage(target));
  };

  const closeBook = useCallback(() => {
    setZoom(false);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (zoom) zoomCloseRef.current?.focus();
  }, [zoom]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoom) setZoom(false);
        else closeBook();
        return;
      }
      if (event.key === "ArrowRight") turnPage(1);
      if (event.key === "ArrowLeft") turnPage(-1);
      if (event.key !== "Tab") return;

      const focusable = (zoom ? zoomRef.current : dialogRef.current)?.querySelectorAll<HTMLElement>("button:not(:disabled), select, a[href]");
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, zoom, turnPage, closeBook]);

  useEffect(() => {
    if (!open) return;
    for (const next of [page - 2, page - 1, page + 1, page + 2]) {
      if (next >= 1 && next <= ARTBOOK_PAGE_COUNT) {
        const preload = new Image();
        preload.src = artbookPageUrl(next);
      }
    }
  }, [open, page]);

  const openBook = () => {
    setPage(1);
    setTurn(null);
    setZoom(false);
    setOpen(true);
  };

  const shown = turn?.to ?? page;

  return (
    <>
      <Section id="Artbook" data-reveal>
        {/* TODO: conectar el video LSC del artbook cuando Dayana lo grabe. */}
        <LscPending>Interpretación LSC del artbook: próximamente</LscPending>
        <SectionContent>
          <Intro>
            <span className="kicker">El universo detrás de la historia</span>
            <h2>Artbook</h2>
            <p>
              Bocetos, personajes, escenarios y decisiones visuales reunidos en las
              {" "}{ARTBOOK_PAGE_COUNT} páginas del libro de arte del proyecto.
            </p>
            <OpenButton ref={triggerRef} type="button" onClick={openBook}>Abrir el artbook</OpenButton>
          </Intro>
          <CoverButton type="button" onClick={openBook} aria-label="Abrir el artbook de Umbrío">
            <CoverPages aria-hidden="true" />
            <img src={artbookPageUrl(1)} alt="" loading="lazy" width={1920} height={1080} />
            <CoverCaption>{ARTBOOK_PAGE_COUNT} páginas · arte y proceso</CoverCaption>
          </CoverButton>
        </SectionContent>
      </Section>

      {open && createPortal(
        <Overlay onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeBook();
        }}>
          <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="artbook-title">
            <DialogHeader>
              <DialogTitle id="artbook-title">Artbook de Umbrío</DialogTitle>
              <CloseButton ref={closeRef} type="button" onClick={closeBook} aria-label="Cerrar artbook">
                <span aria-hidden="true">✕</span>
              </CloseButton>
            </DialogHeader>

            <BookArea>
              <BookFrame>
                <PageImage
                  src={artbookPageUrl(shown)}
                  alt={`Artbook de Umbrío, página ${shown} de ${ARTBOOK_PAGE_COUNT}`}
                  width={1920}
                  height={1080}
                />
                {turn && (
                  <TurningSheet
                    key={`${turn.from}-${turn.to}`}
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
                <PageHotspot type="button" $side="left" onClick={() => turnPage(-1)} disabled={shown === 1} aria-label="Voltear a la página anterior" />
                <PageHotspot type="button" $side="right" onClick={() => turnPage(1)} disabled={shown === ARTBOOK_PAGE_COUNT} aria-label="Voltear a la página siguiente" />
              </BookFrame>
            </BookArea>

            <Controls>
              <PageButton type="button" onClick={() => turnPage(-1)} disabled={shown === 1}>‹ Anterior</PageButton>
              <PagePicker>
                <label htmlFor="artbook-page">Página</label>
                <select id="artbook-page" value={shown} onChange={(event) => goTo(Number(event.target.value))}>
                  {pageNumbers.map((number) => <option key={number} value={number}>{number}</option>)}
                </select>
                <span aria-hidden="true">/ {ARTBOOK_PAGE_COUNT}</span>
              </PagePicker>
              <PageButton type="button" onClick={() => turnPage(1)} disabled={shown === ARTBOOK_PAGE_COUNT}>Siguiente ›</PageButton>
            </Controls>
            <SecondaryRow>
              <ZoomButton type="button" onClick={() => setZoom(true)}>Ampliar esta página</ZoomButton>
              <KeyboardHint>Clic en los lados de la hoja o flechas del teclado · Esc para cerrar</KeyboardHint>
            </SecondaryRow>

            {zoom && (
              <ZoomLayer ref={zoomRef} role="group" aria-label={`Página ${shown} ampliada`}>
                <ZoomImage src={artbookPageUrl(shown)} alt={`Artbook de Umbrío, página ${shown} ampliada`} width={1920} height={1080} />
                <ZoomBar>
                  <PageButton type="button" onClick={() => turnPage(-1)} disabled={shown === 1}>‹ Anterior</PageButton>
                  <span>{shown} / {ARTBOOK_PAGE_COUNT}</span>
                  <PageButton type="button" onClick={() => turnPage(1)} disabled={shown === ARTBOOK_PAGE_COUNT}>Siguiente ›</PageButton>
                  <PageButton ref={zoomCloseRef} type="button" onClick={() => setZoom(false)} aria-label="Salir de la vista ampliada">Salir ✕</PageButton>
                </ZoomBar>
              </ZoomLayer>
            )}
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
  box-sizing: border-box;
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: hidden;
  padding: clamp(4.5rem, 9vh, 7rem) 24px clamp(3rem, 6vh, 4.5rem);
  background: radial-gradient(ellipse at 72% 38%, var(--indigo) 0%, #150d23 44%, #050407 83%);
  color: var(--cream);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, #000, transparent 22%, transparent 78%, #000);
    pointer-events: none;
  }
`;

const LscPending = styled.p`
  position: absolute;
  top: 24px;
  right: clamp(12px, 2.5vw, 36px);
  z-index: 2;
  max-width: 220px;
  margin: 0;
  padding: .6rem .8rem;
  border: 2px dashed var(--lavender);
  border-radius: 8px;
  color: var(--mauve);
  background: rgba(1, 23, 64, .7);
  font-size: .85rem;
  line-height: 1.35;

  @media (max-width: 639px) { top: 84px; right: 12px; max-width: 150px; font-size: .78rem; }
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
    padding-top: 90px;
  }
`;

const Intro = styled.div`
  h2 {
    margin: 10px 0 18px;
    font-size: clamp(3rem, 6.5vw, 5.5rem);
    line-height: 1;
    text-align: left;
  }

  p {
    max-width: 400px;
    margin: 0 0 30px;
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    line-height: 1.6;
  }
`;

const OpenButton = styled.button`
  min-height: 48px;
  padding: 13px 24px;
  border: 2px solid var(--gold);
  border-radius: 6px;
  background: var(--gold);
  color: #150b1a;
  font-size: 1.15rem;
  transition: transform .2s ease, background .2s ease;

  &:hover { transform: translateY(-3px); background: #ffb733; }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
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
  transform: perspective(1200px) rotateY(-7deg) rotateZ(1deg);
  transition: transform .35s ease, box-shadow .35s ease;

  img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
  &:hover { transform: perspective(1200px) rotateY(-2deg) rotateZ(0); box-shadow: 25px 34px 65px #000b; }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 8px; }

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
  background: rgba(1, 23, 64, .85);
  color: var(--cream);
  font-size: .85rem;
  letter-spacing: .04em;
  text-transform: uppercase;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-items: center;
  padding: 12px;
  background: #050308ed;
`;

const Dialog = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(100%, 1400px);
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  padding: clamp(12px, 2vw, 24px);
  border: 1px solid var(--lavender);
  border-radius: 12px;
  background: radial-gradient(ellipse at 50% 40%, #2b1938, #0e0914 75%);
  color: var(--cream);
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
  margin: 0;
  color: var(--gold);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  text-align: left;
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: none;
  border: 2px solid var(--cream);
  border-radius: 50%;
  background: var(--violet);
  color: var(--cream);
  font-size: 1.1rem;
  &:hover, &:active { background: var(--lavender); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 2px; }
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
  max-height: calc(100dvh - 210px);
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
  ${({ $direction }) => css`animation: ${$direction === 1 ? flipForward : flipBackward} ${FLIP_MS}ms cubic-bezier(.45, .02, .25, 1) both;`}
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

  &:disabled { cursor: default; }
  &:hover:not(:disabled) {
    background: ${({ $side }) => $side === "left"
      ? "linear-gradient(to right, rgba(7, 243, 243, .18), transparent 35%)"
      : "linear-gradient(to left, rgba(7, 243, 243, .18), transparent 35%)"};
  }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: -5px; }
`;

const Controls = styled.div`
  width: min(100%, 620px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
`;

const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--lavender);
  border-radius: 6px;
  background: var(--indigo);
  color: var(--cream);
  font-size: 1rem;
  &:hover:not(:disabled) { background: var(--violet); }
  &:active:not(:disabled) { transform: scale(.97); }
  &:disabled { opacity: .4; }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 3px; }

  @media (max-width: 420px) { min-width: 0; font-size: .9rem; }
`;

const PagePicker = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mauve);
  font-size: 1.05rem;

  select {
    min-height: 44px;
    padding: 4px 10px;
    border: 1px solid var(--aqua);
    border-radius: 6px;
    background: var(--navy);
    color: var(--cream);
    font-size: 1.05rem;
  }
  select:focus-visible { outline: 3px solid var(--cyan); outline-offset: 2px; }

  @media (max-width: 420px) { label { display: none; } }
`;

const SecondaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 18px;
  margin-top: 10px;
`;

const ZoomButton = styled.button`
  min-height: 44px;
  padding: 6px 12px;
  border: 0;
  border-bottom: 2px solid var(--aqua);
  background: transparent;
  color: var(--cream);
  font-size: 1rem;
  &:hover, &:active { color: var(--cyan); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 3px; }
`;

const KeyboardHint = styled.p`
  margin: 0;
  color: var(--steel);
  font-size: .9rem;
  text-align: center;
  @media (max-width: 600px) { display: none; }
`;

const ZoomLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5100;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 10px;
  padding: 10px;
  background: #050308;
`;

const ZoomImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
`;

const ZoomBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 14px;
  color: var(--mauve);
  font-size: 1.05rem;
`;
