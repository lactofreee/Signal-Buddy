type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div className="w-full max-w-[1240px] mx-auto min-h-screen">
      <div className=" browser-default">{children}</div>
    </div>
  );
}
