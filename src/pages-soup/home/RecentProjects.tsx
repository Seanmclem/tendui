import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useProjectStore } from '../../stores/project-store';

interface props {
  projectRootPath: string;
}

const handleOpenRecentProject = (payload: string) => {
  console.log('handleOpenRecentProject->payload', payload);
  window.Main.goGetFolderOpenDialg(payload);
};

export const RecentProjects: React.FC<props> = ({ projectRootPath }) => {
  const projectConfig = useProjectStore((x) => x.projectConfig);

  useEffect(() => {
    // establish event-listeners for node-callbacks
    if (window.Main) {
      window.Main.on('goGetSpecificFolder_Response', (responsePayload) => {
        if (responsePayload?.contents && typeof responsePayload.contents?.length === 'number') {
          //   setDirectoryContents(responsePayload.contents);
        }
      });
    }
  }, []);

  return (
    <Container>
      <h3>Recent Projects</h3>
      {/* needs to be clickable, need to be able to send a ptah like on first load */}
      {/* window.Main.goGetSpecificFolder(projectRootPath); */}
      <ul>
        {projectConfig?.recentProjects
          ? projectConfig?.recentProjects
              .filter((x) => x !== projectRootPath)
              .map((recentProject: string) => (
                <li>
                  <a href="#" onClick={() => handleOpenRecentProject(recentProject)}>
                    {recentProject}
                  </a>
                </li>
              ))
          : null}
      </ul>
    </Container>
  );
};

const Container = styled.div``;
