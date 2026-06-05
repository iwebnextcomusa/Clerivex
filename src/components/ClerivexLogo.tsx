import React from 'react';

export default function ClerivexLogo({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Purple luxury metallic ribbon gradient */}
        <linearGradient id="purpleRibbon" x1="10" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8A46FF" />
          <stop offset="40%" stopColor="#5E1DF3" />
          <stop offset="80%" stopColor="#3500B7" />
          <stop offset="100%" stopColor="#1C0075" />
        </linearGradient>

        {/* Gold luxury metallic ribbon gradient */}
        <linearGradient id="goldRibbon" x1="20" y1="10" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFECA1" />
          <stop offset="30%" stopColor="#E5B23E" />
          <stop offset="70%" stopColor="#AB7813" />
          <stop offset="100%" stopColor="#694600" />
        </linearGradient>

        <linearGradient id="nibGold" x1="40" y1="35" x2="70" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="100%" stopColor="#C59B27" />
        </linearGradient>

        <linearGradient id="nibDark" x1="45" y1="40" x2="65" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Main looping 'C' of purple and gold overlapping ribbons */}
      {/* Behind Gold Ribbon loop */}
      <path 
        d="M 50 15 
           C 25 15, 12 35, 12 55 
           C 12 75, 28 91, 52 91 
           C 66 91, 78 82, 85 70 
           C 87 66, 85 62, 81 62 
           C 74 62, 68 67, 61 71 
           C 55 75, 48 77, 41 75 
           C 29 72, 22 59, 24 45 
           C 26 31, 38 22, 53 24 
           C 62 25, 71 31, 75 36 
           C 78 40, 82 40, 84 36 
           L 89 28 
           C 81 18, 66 15, 50 15 Z" 
        fill="url(#purpleRibbon)" 
      />

      {/* Overlapping Gold Highlights to add metallic depth and 'C' loop energy */}
      <path 
        d="M 50 15 
           C 65 15, 78 23, 85 34
           C 82 31, 76 27, 68 25
           C 54 22, 40 29, 31 41
           C 24 51, 23 64, 30 73
           C 23 64, 21 49, 29 36
           C 37 23, 53 15, 70 16"
        fill="url(#goldRibbon)"
        opacity="0.9"
      />

      {/* Gold bottom loop lip */}
      <path 
        d="M 45 76
           C 54 77, 63 74, 69 68
           C 72 65, 76 65, 78 68
           C 84 75, 76 88, 62 90
           C 48 92, 36 86, 31 79
           C 36 81, 41 81, 45 76"
        fill="url(#goldRibbon)"
      />

      {/* Luxury Fountain Pen Nib facing down-left */}
      <g transform="translate(1, -2)">
        {/* Outer Pen Frame - Sleek styling with Gold border */}
        <path 
          d="M 72 34 
             L 81 43 
             L 67 59 
             L 48 64 
             L 53 45 
             Z" 
          fill="url(#nibGold)" 
        />

        {/* Inner Dark Metal Nib Core */}
        <path 
          d="M 73.5 37 
             L 79.5 43 
             L 66.5 57 
             L 51 61.5
             L 55.5 46 
             Z" 
          fill="url(#nibDark)" 
        />

        {/* Nib Collar line */}
        <path 
          d="M 71 39 L 77 45" 
          stroke="url(#nibGold)" 
          strokeWidth="1.5" 
        />

        {/* Breathing/Breather hole (Round circle) */}
        <circle cx="63" cy="51" r="2.2" fill="url(#nibGold)" />

        {/* Slit running from the tip to the breather hole */}
        <path 
          d="M 48 64 L 61.5 52.5" 
          stroke="url(#nibGold)" 
          strokeWidth="1" 
        />
      </g>
    </svg>
  );
}
