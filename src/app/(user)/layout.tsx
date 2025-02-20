import Navbar from "@/src/components/nav/Navbar";

type Props = {
  children: React.ReactNode;
};
export default function UserRootLayout({ children }: Props) {
  return (
    <>
      <header
        role="banner"
        aria-label="주요 네비게이션"
        className="mx-4 md:mx-[30px]"
      >
        <Navbar />
      </header>
      {children}
    </>
  );
}
