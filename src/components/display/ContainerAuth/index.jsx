import styled from 'styled-components';

function ContainerAuth(props) {
  return <BoxContainer {...props} />;
}

export default ContainerAuth;

const BoxContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;