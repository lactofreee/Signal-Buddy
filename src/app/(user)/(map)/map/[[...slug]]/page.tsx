import MapBox from "@/src/components/map/MapBox";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <MapBox slug={slug} />
    </>
  );
}
