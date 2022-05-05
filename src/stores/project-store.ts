import create, { SetState } from 'zustand';

interface ProjectConfig {
  selectedProject: string;
  recentProjects: [];
}

interface ISet {
  projectConfig: ProjectConfig | null; // other data is like, "recent projects"
  updateProjectConfig: (projectConfig: any) => void;
  // selectedProject: any;
  // updateSelectedProject: (selectedProject: any) => void;
}

const PROJECT_CONFIG_KEY = 'projectData';

export const useProjectStore = create<ISet>((set: SetState<ISet>) => ({
  projectConfig: ((localStorage.getItem(PROJECT_CONFIG_KEY) &&
    JSON.parse(localStorage.getItem(PROJECT_CONFIG_KEY) as any)) ||
    null) as ProjectConfig | null, // other data is like, "recent projects"
  updateProjectConfig: (patchUpdate: any) =>
    set((currentState: ISet) => {
      console.log({ currentState, patchUpdate });

      const updatedData = { ...currentState.projectConfig, ...patchUpdate };
      console.log({ updatedData });

      localStorage.setItem(PROJECT_CONFIG_KEY, JSON.stringify(updatedData));

      return { projectConfig: updatedData };
    })
  // selectedProject: {},
  // updateSelectedProject: (selectedProject: any) =>
  //   set((_state: ISet) => {
  //     return { selectedProject };
  //   })
}));
