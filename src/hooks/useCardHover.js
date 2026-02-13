import { useRef, useState } from "react";

export function useCardHover() {
  const [hoverData, setHoverData] = useState({ agent: null, position: { top: 0, left: 0 }, visible: false });
  const timeoutRef = useRef(null);
  const cardRef = useRef(null);

  const onEnter = (agent, e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      const left = spaceRight > 340 ? rect.right + 8 : rect.left - 340;
      const top = Math.min(rect.top, window.innerHeight - 380);
      setHoverData({ agent, position: { top, left }, visible: true });
    }, 420);
  };

  const onLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoverData(prev => ({ ...prev, visible: false }));
  };

  return { hoverData, onEnter, onLeave, cardRef };
}
