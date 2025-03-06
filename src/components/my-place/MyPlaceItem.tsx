export interface MyPlace {
  id?: string;
  name: string;
  address: string;
}

export default function MyPlaceItem({ name, address }: MyPlace) {
  return (
    <article>
      <div className="flex items-center gap-2 w-full md:theme-content-bg md:rounded-lg ">
        <div className="theme-content-bg rounded-full md:rounded-lg px-5 md:px-4 py-2 md:py-5 h-[58px] md:h-[80px] flex-1">
          <p className="text-base font-extrabold h-5 overflow-hidden">{name}</p>
          <p className="text-sm font-medium theme-content-address h-4 mt-1 md:mt-2 overflow-hidden">
            {address}
          </p>
        </div>
        <div className="theme-content-bg w-[58px] h-[58px] rounded-full md:rounded-xl md:border md:border-gray-300 flex items-center justify-center md:mr-4">
          <div className="bg-gray-500 w-[50px] h-[50px] rounded-full md:rounded-lg"></div>
        </div>
      </div>
    </article>
  );
}
