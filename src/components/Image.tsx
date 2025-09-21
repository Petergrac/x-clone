import { Image as IKImage } from "@imagekit/next";

export default function Image({
  src,
  width,
  height,
  alt,
  tr,
  isSensitive,
  feed,
}: {
  src: string;
  feed?: boolean;
  width: number;
  height: number;
  alt: string;
  tr?: boolean;
  isSensitive?: boolean;
}) {
  const data = { src, alt, height, width, tr, isSensitive };
  return (
    <IKImage
      className={`${feed && "rounded-md overflow-hidden"} object-cover ${
        data.isSensitive ? "blur-sm" : ""
      }`}
      urlEndpoint="https://ik.imagekit.io/apostle4dvpgw855fxx"
      src={data.src}
      alt={data.alt}
      width={data.width}
      height={data.height}
      transformation={[{ quality: 80 }]}
    />
  );
}
