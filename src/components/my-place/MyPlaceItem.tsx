import { useRouter } from "next/navigation";

export interface MyPlace {
  id?: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function MyPlaceItem({ name, address, lat, lng }: MyPlace) {
  const router = useRouter();
  const handleNavigate = () => {
    const encodedName = encodeURIComponent(name);
    router.push(`/map/direction?end=${lng},${lat},${encodedName}`);
  };

  return (
    <article>
      <div
        onClick={handleNavigate}
        className="flex items-center gap-2 w-full md:theme-content-bg md:rounded-lg "
      >
        <div className="theme-content-bg rounded-full md:rounded-lg px-5 md:px-4 py-2 md:py-5 h-[58px] md:h-[80px] flex-1">
          <p className="text-base font-extrabold h-5 overflow-hidden">{name}</p>
          <p className="text-sm font-medium theme-content-address h-4 mt-1 md:mt-2 overflow-hidden">
            {address}
          </p>
        </div>
      </div>
    </article>
  );
}
