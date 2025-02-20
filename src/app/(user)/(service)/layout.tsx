import Footer from "@/src/components/footer/Footer";

type Props = {
  children: React.ReactNode;
};
export default function UserRootLayout({ children }: Props) {
  return (
    <>
      <main
        className="mx-4 flex flex-grow flex-col md:mx-[30px]"
        aria-labelledby="main-content"
      >
        {children}
      </main>
      <footer
        role="contentinfo"
        aria-label="사이트 하단 정보"
        className="mx-4 md:mx-[30px]"
      >
        <Footer />
      </footer>
    </>
  );
}
