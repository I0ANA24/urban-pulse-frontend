import Image from "next/image";

interface CardMediaProps {
  imageUrl: string | null;
}

export default function CardMedia({ imageUrl }: CardMediaProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full h-60">
      <Image
        src={`http://localhost:5248${imageUrl}`}
        alt="Event Image"
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
      />
    </div>
  );
}