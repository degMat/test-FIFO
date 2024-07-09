import {prismaMock} from "../prisma/singleton";
import {getAllActions} from "../services/actionService";

describe('Action Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated actions', async () => {
    const actions = [
      { id: 1, libelle: 'Action 1', state: 'NON_CONSUMED', createdAt: new Date(), typeAction: { libelle: 'Type 1' } },
      { id: 2, libelle: 'Action 2', state: 'NON_CONSUMED', createdAt: new Date(), typeAction: { libelle: 'Type 1' } },
    ];

    prismaMock.action.findMany.mockResolvedValue(actions as any);
    prismaMock.action.count.mockResolvedValue(actions.length);

    const result = await getAllActions(1, 10);

    expect(result.actions).toHaveLength(actions.length);
    expect(result.pagination.total).toBe(actions.length);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.pageSize).toBe(10);
    expect(result.pagination.isFirstPage).toBe(true);
    expect(result.pagination.isLastPage).toBe(true);
  });
});
