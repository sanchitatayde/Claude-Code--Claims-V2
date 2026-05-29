interface BrandLogoProps {
  size?: number;
}

/**
 * The Z monogram from the prototype — black tile with green ZP strokes.
 */
export function BrandLogo({ size = 40 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#0a0a0a" />
      <path
        d="M11 14 L19 14 L11 26 L19 26"
        stroke="#5cf3a4"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 14 L28 20 L22 26"
        stroke="#5cf3a4"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
