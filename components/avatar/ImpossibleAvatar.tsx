import Image from "next/image";
import "./ImpossibleAvatar.css";

interface ImpossibleAvatarProps {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
  className?: string;
  imgClassName?: string;
}

export default function ImpossibleAvatar({
  imgSrc,
  imgWidth,
  imgHeight,
  imgAlt,
  className = "",
  imgClassName = "",
}: ImpossibleAvatarProps) {
  return (
    <div className={`impossible-avatar ${className}`}>
      <img
        src={imgSrc}
        // width={imgWidth}
        // height={imgHeight}
        alt={imgAlt}
        className={`${imgClassName}`}
      />
    </div>
  );
}
