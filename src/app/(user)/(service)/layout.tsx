import Footer from "@/src/components/common/footer";
import Header from "@/src/components/common/header";

type Props = {
  children: React.ReactNode;
};
export default function UserRootLayout({ children }: Props) {
  return (
    <>
      <Header />
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