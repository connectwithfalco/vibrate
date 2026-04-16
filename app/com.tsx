"use client";
import { useRef } from "react";

export default function HapticPage() {
  const switchRef = useRef<HTMLInputElement>(null);

  const triggerHaptic = () => {
    if (switchRef.current) {
      switchRef.current.checked = !switchRef.current.checked;
      // Dispatch change event to trigger iOS haptic
      switchRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Hidden iOS switch — must be in DOM, not display:none */}
      <label
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <input
          ref={switchRef}
          type="checkbox"
          // @ts-expect-error - `switch` is iOS Safari 17.4+ only
          switch=""
        />
      </label>

      <button
        onClick={triggerHaptic}
        style={{
          padding: "16px 32px",
          fontSize: 18,
          background: "#007aff",
          color: "white",
          border: "none",
          borderRadius: 12,
        }}
      >
        Tap for Haptic 📳
      </button>
    </div>
  );
}