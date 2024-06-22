export interface SequelizePagination<T> {
  items: T[];
  offset: number;
  totalItems: number;
  totalPages: number;
  itemCount: number;
  page: number;
}
