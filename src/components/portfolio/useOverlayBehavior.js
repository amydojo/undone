import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(",");

let bodyLockCount = 0;
let previousBodyOverflow = "";
const overlayStack = [];

function lockBodyScroll() {
  if (typeof document === "undefined") return;

  if (bodyLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  bodyLockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === "undefined" || bodyLockCount === 0) return;

  bodyLockCount -= 1;

  if (bodyLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
    previousBodyOverflow = "";
  }
}

function getFocusableElements(root) {
  if (!root) return [];

  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    if (element.disabled || element.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

function isTopOverlay(id) {
  return overlayStack[overlayStack.length - 1] === id;
}

function removeOverlay(id) {
  const index = overlayStack.lastIndexOf(id);
  if (index !== -1) overlayStack.splice(index, 1);
}

export function useOverlayBehavior({ active, overlayRef, initialFocusRef, onClose }) {
  const overlayIdRef = useRef(Symbol("portfolio-overlay"));
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!active || typeof document === "undefined") return undefined;

    const overlayId = overlayIdRef.current;
    const overlayElement = overlayRef.current;
    previousFocusRef.current = document.activeElement;
    overlayStack.push(overlayId);
    lockBodyScroll();

    const animationFrame = window.requestAnimationFrame(() => {
      const focusTarget =
        initialFocusRef?.current ??
        getFocusableElements(overlayRef.current)[0] ??
        overlayRef.current;

      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      }
    });

    function containFocus(event) {
      if (!isTopOverlay(overlayId)) return;
      const currentOverlay = overlayRef.current;
      if (!currentOverlay || currentOverlay.contains(event.target)) return;

      const focusTarget = initialFocusRef?.current ?? getFocusableElements(currentOverlay)[0] ?? currentOverlay;
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      }
    }

    function handleKeyDown(event) {
      if (!isTopOverlay(overlayId)) return;

      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const currentOverlay = overlayRef.current;
      if (!currentOverlay) return;

      const focusableElements = getFocusableElements(currentOverlay);
      if (focusableElements.length === 0) {
        event.preventDefault();
        currentOverlay.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;
      const activeElementIsManaged = focusableElements.includes(activeElement);

      if (!activeElementIsManaged) {
        event.preventDefault();
        const nextElement = event.shiftKey ? lastElement : firstElement;
        nextElement.focus({ preventScroll: true });
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus({ preventScroll: true });
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    }

    document.addEventListener("focusin", containFocus);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("focusin", containFocus);
      document.removeEventListener("keydown", handleKeyDown, true);
      removeOverlay(overlayId);
      unlockBodyScroll();

      const previousFocus = previousFocusRef.current;
      if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === "function") {
        previousFocus.focus({ preventScroll: true });
      } else if (overlayElement?.isConnected && typeof overlayElement.blur === "function") {
        overlayElement.blur();
      }
    };
  }, [active, overlayRef, initialFocusRef, onClose]);
}
