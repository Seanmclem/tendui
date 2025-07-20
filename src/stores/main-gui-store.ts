import create, { SetState } from 'zustand';

interface TerminalInstance {
  id: string;
  name: string;
  isActive: boolean;
  pageType: string; // Which page this terminal belongs to
}

interface ISet {
  menuOptions: any[];
  setMenuOptions: (update: any[]) => void;

  selectedMenuOption: string;
  setSelectedMenuOption: (update: string) => void;

  // Page-specific terminal management
  terminalInstances: TerminalInstance[];
  addTerminal: (pageType: string) => void;
  removeTerminal: (id: string) => void;
  setActiveTerminal: (id: string) => void;
  getActiveTerminal: (pageType: string) => TerminalInstance | null;
  getTerminalsForPage: (pageType: string) => TerminalInstance[];
}

export const useMainGuiStore = create<ISet>((set: SetState<ISet>, get: () => ISet) => ({
  menuOptions: ['Home', 'package.json', 'Vite', 'Astro'],
  setMenuOptions: (update: any[]) =>
    set((_state: ISet) => {
      return { menuOptions: update };
    }),

  selectedMenuOption: 'package.json',
  setSelectedMenuOption: (update: string) =>
    set((_state: ISet) => {
      return { selectedMenuOption: update };
    }),

  // Page-specific terminal management
  terminalInstances: [],
  addTerminal: (pageType: string) => {
    const { terminalInstances } = get();
    const pageTerminals = terminalInstances.filter((term) => term.pageType === pageType);
    const newTerminal: TerminalInstance = {
      id: `terminal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${pageType} Terminal ${pageTerminals.length + 1}`,
      isActive: true,
      pageType
    };

    // Deactivate all other terminals in the same page
    const updatedInstances = terminalInstances.map((term) => ({
      ...term,
      isActive: term.pageType === pageType ? false : term.isActive
    }));

    set({
      terminalInstances: [...updatedInstances, newTerminal]
    });
  },

  removeTerminal: (id: string) => {
    const { terminalInstances } = get();
    const terminalToRemove = terminalInstances.find((term) => term.id === id);
    const filtered = terminalInstances.filter((term) => term.id !== id);

    // If we're removing the active terminal and there are others in the same page, activate the first one
    if (terminalToRemove && terminalToRemove.isActive) {
      const pageTerminals = filtered.filter((term) => term.pageType === terminalToRemove.pageType);
      if (pageTerminals.length > 0) {
        pageTerminals[0].isActive = true;
      }
    }

    set({ terminalInstances: filtered });
  },

  setActiveTerminal: (id: string) => {
    const { terminalInstances } = get();
    const targetTerminal = terminalInstances.find((term) => term.id === id);
    if (!targetTerminal) return;

    const updatedInstances = terminalInstances.map((term) => ({
      ...term,
      isActive: term.pageType === targetTerminal.pageType ? term.id === id : term.isActive
    }));
    set({ terminalInstances: updatedInstances });
  },

  getActiveTerminal: (pageType: string) => {
    const { terminalInstances } = get();
    return terminalInstances.find((term) => term.pageType === pageType && term.isActive) || null;
  },

  getTerminalsForPage: (pageType: string) => {
    const { terminalInstances } = get();
    return terminalInstances.filter((term) => term.pageType === pageType);
  }
}));
