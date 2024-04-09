export type PostT = {
  id: string;
  name: string;
  city: string;
  address: string;
  email: string;
  author?: string;
  image: string;
  image2: string;
  image3: string;
  people: number;
  cost: number;
  football: string | null;
  basketball: string | null;
  netball: string | null;
};

export type ReportT = {
  id: string;
  name: string;
  arenaId: string;
  email: string;
  title: string;
  message: string;
};
