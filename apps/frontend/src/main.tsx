import {StrictMode, useEffect, useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import Queue from "./app/queue/queue";
import AjoutAction from "./app/ajout-action/ajout-action";
import io from "socket.io-client"

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

// @INFO: styled-components is installed, you can use it if you want ;)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  text-transform: uppercase;
`;

const SpanTitle = styled.span`
  color: blue;
`;

const socket = io('http://localhost:3000', { path: '/socket.io/' });
const App = () => {
  const [reload, setReload] = useState(false);
  const handleActionAdded = () => {
    setReload(prev => !prev); // Inverser l'état pour déclencher le rechargement
  };

  useEffect( () => {
      socket.on('queueUpdated', handleActionAdded);
    return () => {
      socket.off('queueUpdated', handleActionAdded);
    };
  }, [])

  return (
    <Container>
      <Title>Voici la Queue de <SpanTitle>FIFO</SpanTitle>!</Title>
      <AjoutAction reload={reload} onActionAdded={handleActionAdded} />
      <Queue reload={reload} />
    </Container>
  );
};
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
