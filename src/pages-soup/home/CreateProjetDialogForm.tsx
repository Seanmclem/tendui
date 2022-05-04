import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'ready-fields';
import styled from 'styled-components';
import { StandardContainer } from '../../components/common/styled-generic';

interface props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectRootName: string;
  handleCreateConfigFile: (values: { projectName: string }) => void;
}

export const CreateProjetDialogForm: React.FC<props> = ({
  showModal,
  setShowModal,
  projectRootName,
  handleCreateConfigFile
}) => {
  const modal = useRef(null);

  useEffect(() => {
    if (showModal) {
      modal?.current?.showModal?.();
      if (projectRootName && !projectName) {
        setProjectName(projectRootName);
      }
    } else {
      modal?.current?.close?.();
    }
  }, [showModal]);

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (projectName) {
      handleCreateConfigFile({ projectName });
      setShowModal(false);
    }
  };

  const [projectName, setProjectName] = useState(projectRootName || '');

  return (
    <Dialog ref={modal}>
      <Container>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <Container>
            <label>Project Name</label>
            {/* https://github.com/Seanmclem/ready-fields */}
            <TextInput name="Project Name" text={projectName} setText={setProjectName} />

            <button type={'submit'} onClick={toggleModal}>
              Save
            </button>
          </Container>
        </form>
      </Container>
    </Dialog>
  );
};

const Container = styled(StandardContainer)`
  display: flex;
  flex-direction: column;
`;

const Dialog = styled.dialog`
  width: 80%;
  height: 50%;
`;
