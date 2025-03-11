import Image from "next/image";

export default function HomeBackground({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="main background"
      className="cover -z-10"
      fill
      priority
    />
  );
}
