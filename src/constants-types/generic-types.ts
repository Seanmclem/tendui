export interface CreateFilePayload {
  contents: {
    projectName: string;
  };
  path: string;
}

// can't easily share types accross frontend-electron without build issues?
