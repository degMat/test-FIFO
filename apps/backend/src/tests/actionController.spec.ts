import express from "express";
import {all} from "../controllers/actionController";
import {prismaMock} from "../prisma/singleton";
import request from 'supertest';

const app = express();
app.use(express.json());
app.get('/api/actions', all);

describe('Action Controller', () => {
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

    const response = await request(app).get('/api/actions?page=1&pageSize=10');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(actions.length);
    expect(response.body.pagination.total).toBe(actions.length);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.pageSize).toBe(10);
    expect(response.body.pagination.isFirstPage).toBe(true);
    expect(response.body.pagination.isLastPage).toBe(true);
  });
});
