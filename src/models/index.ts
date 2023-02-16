export interface IBallot {
  id: string;
  items: INominee[];
  title: string;
}

export interface INominee {
  title: string;
  photoUrL: string;
  id: string;
}

export interface ISelection {
  category: Omit<IBallot, "items">;
  nominee: INominee;
}
