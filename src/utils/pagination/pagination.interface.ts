export interface PaginationResponse<T> {
    items: T[];
    pageInfo: PageInfo;
  }
  
  export interface PageInfo {
    page: number;
    limit: number;  
    totalCount: number;
    hasNext: boolean;
    hasBefore: boolean;
  }
  