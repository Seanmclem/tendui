import create, { SetState } from 'zustand';

interface TerminalInstance {
  id: string;
  name: string;
  isActive: boolean;
}

interface ISet {
  menuOptions: any[];
  setMenuOptions: (update: any[]) => void;

  selectedMenuOption: string;
  setSelectedMenuOption: (update: string) => void;

  // Terminal management
  terminalInstances: TerminalInstance[];
  addTerminal: () => void;
  removeTerminal: (id: string) => void;
  setActiveTerminal: (id: string) => void;
  getActiveTerminal: () => TerminalInstance | null;
}

export const useMainGuiStore = create<ISet>((set: SetState<ISet>, get: () => ISet) => ({
  menuOptions: ['Home', 'package.json', 'Vite', 'Terminals', 'Astro'],
  setMenuOptions: (update: any[]) =>
    set((_state: ISet) => {
      return { menuOptions: update };
    }),

  selectedMenuOption: 'package.json',
  setSelectedMenuOption: (update: string) =>
    set((_state: ISet) => {
      return { selectedMenuOption: update };
    }),

  // Terminal management
  terminalInstances: [],
  addTerminal: () => {
    const { terminalInstances } = get();
    const newTerminal: TerminalInstance = {
      id: `terminal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Terminal ${terminalInstances.length + 1}`,
      isActive: true
    };

    // Deactivate all other terminals
    const updatedInstances = terminalInstances.map((term) => ({
      ...term,
      isActive: false
    }));

    set({
      terminalInstances: [...updatedInstances, newTerminal]
    });
  },

  removeTerminal: (id: string) => {
    const { terminalInstances } = get();
    const filtered = terminalInstances.filter((term) => term.id !== id);

    // If we're removing the active terminal and there are others, activate the first one
    const activeTerminal = terminalInstances.find((term) => term.isActive);
    if (activeTerminal?.id === id && filtered.length > 0) {
      filtered[0].isActive = true;
    }

    set({ terminalInstances: filtered });
  },

  setActiveTerminal: (id: string) => {
    const { terminalInstances } = get();
    const updatedInstances = terminalInstances.map((term) => ({
      ...term,
      isActive: term.id === id
    }));
    set({ terminalInstances: updatedInstances });
  },

  getActiveTerminal: () => {
    const { terminalInstances } = get();
    return terminalInstances.find((term) => term.isActive) || null;
  }
}));
