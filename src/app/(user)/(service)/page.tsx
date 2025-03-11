import HomeContents from "@/src/components/home/HomeContents";
import getBase64 from "@/src/utils/getBase64";

export default async function Home() {
  const darkImage = await getBase64("/imgs/noisy-gradients-dark.jpg");
  const lightImage = await getBase64("/imgs/noisy-gradients.jpg");
  return <HomeContents darkImage={darkImage} lightImage={lightImage} />;
}
