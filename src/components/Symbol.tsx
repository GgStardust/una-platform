import * as React from "react";

type SymbolName =
  | "orb"            // Step 1: Form UNA
  | "triangle"       // Step 2: Financial Rails
  | "hex-eye"        // Step 3: Sovereign Operations
  | "stack"          // Step 4: Money Flow
  | "shield-check"   // Step 5: Protection
  | "constellation"; // Step 6: Growth

export interface SymbolProps extends React.SVGProps<SVGSVGElement> {
  name: SymbolName;
  size?: number | string;     // px or any CSS unit (e.g., 24 or "1.5rem")
  strokeWidth?: number;       // default 2
  title?: string;             // accessible title override
}

const paths: Record<SymbolName, React.ReactNode> = {
  orb: (
    <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" />
  ),
  triangle: (
    <polygon points="32 12 52 52 12 52" fill="none" stroke="currentColor" />
  ),
  "hex-eye": (
    <>
      <path d="M32 10 L50 20 L50 44 L32 54 L14 44 L14 20 Z" fill="none" stroke="currentColor" />
      <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
    </>
  ),
  stack: (
    <>
      <rect x="18" y="20" width="28" height="6" rx="3" fill="none" stroke="currentColor" />
      <rect x="18" y="30" width="28" height="6" rx="3" fill="none" stroke="currentColor" />
      <rect x="18" y="40" width="28" height="6" rx="3" fill="none" stroke="currentColor" />
    </>
  ),
  "shield-check": (
    <>
      <path
        d="M32 10 C38 14 46 16 52 18 C52 40 44 50 32 54 C20 50 12 40 12 18 C18 16 26 14 32 10 Z"
        fill="none"
        stroke="currentColor"
      />
      <path d="M22 30 L30 38 L44 24" fill="none" stroke="currentColor" />
    </>
  ),
  constellation: (
    <>
      <circle cx="16" cy="42" r="2" fill="currentColor" stroke="none" />
      <circle cx="28" cy="22" r="2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="30" r="2" fill="currentColor" stroke="none" />
      <circle cx="52" cy="46" r="2" fill="currentColor" stroke="none" />
      <path d="M16 42 L28 22 L44 30 L52 46" fill="none" stroke="currentColor" />
    </>
  ),
};

export function Symbol({
  name,
  size = 24,
  strokeWidth = 2,
  title,
  className,
  ...rest
}: SymbolProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={title || name}
      className={className}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}

export default Symbol;
