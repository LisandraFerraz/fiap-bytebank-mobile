export class Pagination {
  totalItems: number = 0;
  itemsPage: number = 0;
  currentPage: number = 0;
  nextPage?: (page: number) => void;
}
