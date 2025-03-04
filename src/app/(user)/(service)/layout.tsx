import Navbar from "@/src/components/common/nav/Navbar";
import Footer from "@/src/components/common/footer/Footer";

type Props = {
  children: React.ReactNode;
};
export default function UserRootLayout({ children }: Props) {
  return (
    <>
      <header
        role="banner"
        aria-label="주요 네비게이션"
        className="w-[calc(100vw-32px)] md:w-[calc(100vw-60px)] flex h-[70px] max-w-[1240px] justify-center mx-auto sticky top-0 left-0 right-0 z-[9999]"
      >
        <Navbar />
      </header>
      <main
        className="w-[calc(100vw-32px)] md:w-[calc(100vw-60px)] flex flex-grow flex-col mx-auto"
        aria-labelledby="main-content"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
