import Navbar from "@/src/components/common/nav/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function MapRootlayout({ children }: Props) {
  return (
    <>
      <header
        role="banner"
        aria-label="주요 네비게이션"
        className="w-[calc(100vw-32px)] flex h-[70px] justify-center mx-auto"
      >
        <Navbar />
      </header>
      {children}
    </>
  );
}
