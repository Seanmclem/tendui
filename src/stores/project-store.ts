import create, { SetState } from 'zustand';

interface ISet {
  projectConfig: any;
  updateProjectConfig: (projectConfig: any) => void;
  selectedProject: any;
  updateSelectedProject: (selectedProject: any) => void;
}

export const useProjectStore = create<ISet>((set: SetState<ISet>) => ({
  projectConfig: {},
  updateProjectConfig: (projectConfig: any) =>
    set((_state: ISet) => {
      return { projectConfig };
    }),
  selectedProject: {},
  updateSelectedProject: (selectedProject: any) =>
    set((_state: ISet) => {
      return { selectedProject };
    })
}));
