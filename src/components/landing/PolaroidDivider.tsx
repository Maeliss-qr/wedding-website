import Image from "next/image";

interface PolaroidDividerProps {
  src?: string;
  rotate?: number;
  tapePosition?: "top-left" | "top-right" | "top-center";
  aspect?: "square" | "portrait" | "landscape" | "tall" | "round";
}

const tapeStyles = {
  "top-right":  "absolute -top-3 right-2 translate-x-1/2 rotate-45",
  "top-left":   "absolute -top-3 left-2 -translate-x-1/2 -rotate-45",
  "top-center": "absolute -top-3 left-1/2 -translate-x-1/2 -rotate-12",
};

const aspectStyles = {
  square:    "aspect-square",
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  tall:      "aspect-[2/3]",
  round:     "aspect-square rounded-full",
};

export default function PolaroidDivider({
  src = "/hero.jpg",
  rotate = -3,
  tapePosition = "top-right",
  aspect = "square",
}: PolaroidDividerProps) {
  return (
    <div className="flex justify-center py-4 bg-background">
      <div className="relative" style={{ transform: `rotate(${rotate}deg)` }}>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id={`torn-divider-${rotate}`} x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed={Math.abs(rotate)} result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>

        <Image
          src="/tape.png"
          alt=""
          width={75}
          height={27}
          className={`${tapeStyles[tapePosition]} z-20`}
          style={{ filter: "hue-rotate(85deg) saturate(0.28) brightness(0.92)" }}
        />

        <div className="relative w-[60vw] md:w-96">
          <div
            className="absolute inset-0 bg-white"
            style={{ filter: `url(#torn-divider-${rotate}) drop-shadow(0 4px 12px rgba(0,0,0,0.12))` }}
          />
          <div className="relative p-[4px]">
            <div className={`relative w-full ${aspectStyles[aspect]} overflow-hidden`}>
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center grayscale"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
