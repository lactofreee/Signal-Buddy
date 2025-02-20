import { TMap, TMapLatLng } from "@/src/types";
import { reactElementToString } from "@/src/utils";

const { Tmapv2 } = window;

type MarkerProps = {
  mapContent: TMap;
  position: TMapLatLng;
  icon?: string;
  labelText?: string;
};

export default function Marker({
  mapContent,
  position,
  icon,
  labelText,
}: MarkerProps) {
  return new Tmapv2.Marker({
    position,
    map: mapContent,
    icon,
    iconSize: new Tmapv2.Size(50, 50),
    label: labelText ? reactElementToString(<span>{labelText}</span>) : "",
  });
}
