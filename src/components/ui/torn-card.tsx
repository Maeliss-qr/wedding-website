interface TornCardProps {
  children: React.ReactNode;
  className?: string;
  filterId?: string;
  imageRight?: React.ReactNode;
  imageLeft?: React.ReactNode;
}

export default function TornCard({ children, className = "", filterId = "torn-paper", imageRight, imageLeft }: TornCardProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 bg-white border border-stone-100"
        style={{ filter: `url(#${filterId}) drop-shadow(0 4px 12px rgba(0,0,0,0.10))` }}
      />
      {imageLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-1/3 overflow-hidden">
          {imageLeft}
        </div>
      )}
      {imageRight && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden">
          {imageRight}
        </div>
      )}
      <div className={`relative p-8 ${imageRight ? "pr-[calc(33%+2rem)]" : ""} ${imageLeft ? "pl-[calc(50%+2rem)]" : ""}`}>
        {children}
      </div>
    </div>
  );
}
