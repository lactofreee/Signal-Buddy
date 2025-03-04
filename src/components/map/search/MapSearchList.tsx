import { Poi } from "@/src/types";

type Props = {
  results: Poi[];
  onClick: (result: Poi) => void;
};
export default function MapSearchList({ results, onClick }: Props) {
  return (
    <div className="flex flex-col py-2 max-h-[calc(100vh-126px)]">
      <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
        {results.map((result, idx) => (
          <div
            onClick={() => onClick(result)}
            key={`${result.id}${idx}`}
            className="bg-white p-4 rounded-md cursor-pointer hover:bg-gray-200 transition-all font-semibold"
          >
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
}
