type TechifyMarkProps = {
  className?: string;
};

export default function TechifyMark({ className }: TechifyMarkProps) {
  return (
    <div className={`relative h-8 w-10 ${className ?? ""}`}>
      <div className="absolute left-1 top-1 h-[8px] w-[32px] rounded-full bg-[#FFB320] origin-top-left rotate-[18deg]" />
      <div
        className="absolute left-[2px] top-[17px] h-[12px] w-[26px] rounded-l-[6px] bg-[#FFB320]"
        style={{ clipPath: "polygon(0 0, 100% 40%, 100% 60%, 0 100%)" }}
      />
    </div>
  );
}
