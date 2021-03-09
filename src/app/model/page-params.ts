export interface PageParams {
  page: number;
  pageSize: number;
  params: {
    ids?: string[];
    withDeleted?: boolean;
    orderBy?: string;
    orderDir?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}
