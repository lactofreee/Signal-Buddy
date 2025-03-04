export interface Bookmark {
  bookmarkId: number;
  lat: number;
  lng: number;
  address: string;
  name: string;
  sequence: number;
}

export interface ReorderBody {
  id: number;
  targetSequence: number;
}
