import { ModelCtor } from 'sequelize-typescript';
import { PaginationResponse } from './pagination.interface';

export async function paginate<T>(
  model: ModelCtor,
  page: number,
  limit: number,
): Promise<PaginationResponse<T>> {
  const totalCount = await model.count();
  const offset = (page - 1) * limit;
  const hasNext = page * limit < totalCount;
  const hasBefore = page > 1;
  const items = await model.findAll({ limit, offset });
  return {
    pageInfo: {
      hasBefore,
      hasNext,
      page,
      totalCount,
      limit,
    },
    items: <any>items,
  };
}
