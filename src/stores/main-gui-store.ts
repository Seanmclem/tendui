import create, { SetState } from 'zustand';

interface ISet {
  menuOptions: any[];
  setMenuOptions: (update: any[]) => void;

  selectedMenuOption: string;
  setSelectedMenuOption: (update: string) => void;
}

export const useMainGuiStore = create<ISet>((set: SetState<ISet>) => ({
  menuOptions: ['Home', 'package.json', 'Vite', 'Astro'],
  setMenuOptions: (update: any[]) =>
    set((_state: ISet) => {
      return { menuOptions: update };
    }),

  selectedMenuOption: 'package.json',
  setSelectedMenuOption: (update: string) =>
    set((_state: ISet) => {
      return { selectedMenuOption: update };
    })
}));
