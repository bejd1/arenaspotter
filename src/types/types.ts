export type PostT = {
  id: string;
  author: string;
  name: string;
  city: string;
  zipOrPostalCode: string;
  street: string;
  email: string;
  phoneNumber: string;
  people: number;
  cost: number;
  status: string;
  football?: string | null;
  basketball?: string | null;
  netball?: string | null;
  size: string;
  surface: string;
  toilet: string;
  parking: string;
  showers: string;
  dressingRoom: string;
  lighting: string;
  openingMonday?: string | null;
  openingHoursMonday?: string | null;
  openingTuesday?: string | null;
  openingHoursTuesday?: string | null;
  openingWednesday?: string | null;
  openingHoursWednesday?: string | null;
  openingThursday?: string | null;
  openingHoursThursday?: string | null;
  openingFriday?: string | null;
  openingHoursFriday?: string | null;
  openingSaturday?: string | null;
  openingHoursSaturday?: string | null;
  openingSunday?: string | null;
  openingHoursSunday?: string | null;
  description?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  website?: string | null;
  image: string;
  premium: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReportT = {
  id: string;
  name: string;
  arenaId: string;
  email: string;
  title: string;
  message: string;
};

export type SiteConfigT = {
  name: string;
  url: string;
  description: string;
  links: {
    github: string;
  };
};

export interface SettingsFormI {
  id: string | undefined;
  firstName: string;
  email: string;
  refetch: any;
  update: any;
}
