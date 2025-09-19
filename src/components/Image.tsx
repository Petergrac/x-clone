import { Image as IKImage, ImageKitProvider } from "@imagekit/next";

export default function Image({
  src,
  width,
  height,
  alt,
  tr,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  tr?: boolean;
}) {
    const data = {src,alt, height,width,tr};
    if(data.src.startsWith('/')){
        console.log(data.src)
    }
  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/apostle4dvpgw855fxx">
      <IKImage
        src={data.src}
        width={data.width}
        height={data.height}
        alt={data.alt}
        transformation={[{width: data.width, height: data.height, quality: 80}]}
      />
    </ImageKitProvider>
  );
}
