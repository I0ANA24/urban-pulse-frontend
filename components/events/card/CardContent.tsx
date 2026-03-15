interface CardContentProps {
  title?: string;
  description: string;
  isVerified?: boolean;
}

export default function CardContent({ title, description, isVerified }: CardContentProps) {
  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      {title && <h3 className="text-white font-bold text-base">{title}</h3>}
      <p className="text-white text-sm font-medium leading-relaxed">
        {description}
      </p>
      {isVerified && (
        <span className="bg-[#4ADE80] text-[#023612] px-3 py-1 rounded-md text-xs font-bold w-fit mt-1">
          Verified info
        </span>
      )}
    </div>
  );
}