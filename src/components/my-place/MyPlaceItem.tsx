export interface MyPlace {
  id?: string;
  name: string;
  address: string;
}

export default function MyPlaceItem({ name, address }: MyPlace) {
  return (
    <article>
      {/* 모바일 화면 */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="bg-white rounded-full px-5 py-2 h-[58px] flex-1">
          <p className="text-base font-extrabold h-5 overflow-hidden">{name}</p>
          <p className="text-sm font-medium text-gray-500 h-4 mt-1 overflow-hidden">
            {address}
          </p>
        </div>
        <div className="bg-white w-[58px] h-[58px] rounded-full flex items-center justify-center">
          <div className="bg-gray-500 w-[50px] h-[50px] rounded-full "></div>
        </div>
      </div>

      {/* pc 화면 */}
      <div className="hidden md:flex items-center gap-2 py-5 px-4 bg-white rounded-lg h-[80px] w-full justify-between">
        <div className="flex">
          <div>
            <p className="text-base font-extrabold">{name}</p>
            <p className="text-sm font-medium text-gray-500  ">{address}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-white w-[58px] h-[58px] rounded-xl border border-gray-300 flex items-center justify-center">
            <div className="bg-gray-500 w-[50px] h-[50px] rounded-lg "></div>
          </div>
        </div>
      </div>
    </article>
  );
}
