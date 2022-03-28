import create, { SetState } from 'zustand'

interface ISet {
  menuOptions: any[]
  setMenuOptions: (update: any[]) => void

  selectedMenuOption: string
  setSelectedMenuOption: (update: string) => void
}

export const useTemplateStore = create<ISet>((set: SetState<ISet>) => ({
  menuOptions: ['package.json', 'Vite', 'Astro'],
  setMenuOptions: (update: any[]) =>
    set((_state: ISet) => {
      return { menuOptions: update }
    }),

  selectedMenuOption: '',
  setSelectedMenuOption: (update: string) =>
    set((_state: ISet) => {
      return { selectedMenuOption: update }
    })
}))
