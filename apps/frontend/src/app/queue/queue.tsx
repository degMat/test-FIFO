import styled from 'styled-components';
import {useEffect, useState} from "react";
import ApiService from "../../services/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ContainerButton = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
`;
const ContainerQueue = styled.div`
  display: flex;
`;


const Item = styled.div`
  border: 2px solid white;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: none; /* Enlève la bordure droite pour tous les éléments sauf le dernier */
  }
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Button = styled.button`
  border: none;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  color: #3e33ed;

  &:hover {
    color: white;
  }
`;

export function Queue({ reload }: { reload: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    isFirstPage: true,
    isLastPage: false,
    page: 1,
    totalPages: 1,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
      ApiService.getAllActions(pagination.page, pageSize)
        .then(response => {
          setData(response.data.data);
          setPagination({
            ...pagination,
            isFirstPage: response.data.pagination.isFirstPage,
            isLastPage: response.data.pagination.isLastPage,
            totalPages: response.data.pagination.totalPages,
          });
          setIsLoading(false);
        });
  }, [reload,pagination.page]);

  const handlePreviousPage = () => {
    if (!pagination.isFirstPage) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (!pagination.isLastPage) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (data.length === 0) return <h3>Aucune action ajouté !</h3>;

  return (
    <Container>
      <ContainerQueue>
      {data.map((action: { id: number; typeAction: {libelle: string} }) => (
        <Item key={action.id}>{action.typeAction.libelle}</Item>
      ))}
      </ContainerQueue>
      <ContainerButton>
        {!pagination.isFirstPage && <Button onClick={handlePreviousPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        }
        {!pagination.isLastPage && <Button onClick={handleNextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
        }
      </ContainerButton>
    </Container>
  );
}

export default Queue;
