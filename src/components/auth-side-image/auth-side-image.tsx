import Image from "next/image";
import loginBackground from "@/public/imgs/LoginBackground.png";
import logoSymbol from "@/public/imgs/Logo Symbol White.png";
import logoWhite from "@/public/imgs/Logo White.png";

export function AuthSideImage() {
  
    return (
            <div className="relative hidden bg-muted md:block ">
              <Image
                src={loginBackground}
                alt="login background image"
                fill
                className="object-cover"
              />
              <div
                className="absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center"
              >
                <Image src={logoSymbol} alt="logo symbol"></Image>
                <Image src={logoWhite} alt="white logo" className="mt-7"></Image>
              </div>
            </div>
    );
  }