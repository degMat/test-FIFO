import styled from 'styled-components';
import {useEffect, useState} from "react";
import ApiService from "../../services/api";

const ContainerListAjoutAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  height: 200px;
`;
const ContainerAjoutAction = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonAdd = styled.button`
  border-radius: 10px;
  width: min-content;
  color: white;
  padding: 10px;
  border: solid 1px white;
  background: linear-gradient(302deg,#26d3b9 0,#54c1f6 28%,#315ae7 77%,#3e33ed 100%);
  cursor: pointer;
  transition: background 10s linear;

  &:hover {
    background: linear-gradient(161deg,#26d3b9 0,#54c1f6 28%,#315ae7 77%,#3e33ed 100%);
  }
  &:active {
    background: grey;
  }
`;

const NumberCredit = styled.h2 `
  color: #8c25e1;
`;
export function AjoutAction( {onActionAdded}: { onActionAdded: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    ApiService.getAllTypeActions()
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      });

  }, []);

  const handleAddAction = (typeActionId: number) => {
    ApiService.addActionInQueue(typeActionId)
      .then(response => {
        console.log(response.data.message);
        onActionAdded();
        // Vous pouvez mettre à jour l'état ou rafraîchir la liste si nécessaire
      })
      .catch(error => {
        console.error('Error adding action:', error);
      });
  };

  if (isLoading) return <h3>Loading...</h3>;
  return (
    <ContainerListAjoutAction>
      {data.map((typeAction: { id: number; libelle: string, currentValue: string }) => (
        <ContainerAjoutAction key={typeAction.id}>
          <h3>{typeAction.libelle}</h3>
          <NumberCredit>{typeAction.currentValue}</NumberCredit>
          <ButtonAdd onClick={() => handleAddAction(typeAction.id)} > Ajouter </ButtonAdd>
        </ContainerAjoutAction>
      ))}
    </ContainerListAjoutAction>
  );
}

export default AjoutAction;
