import { useRef } from "react";

export function HorizontalShelf({ children }) {
  const ref = useRef(null);
  return (
    <div className="shelf-wrapper">
      <div className="shelf" ref={ref}>{children}</div>
    </div>
  );
}
