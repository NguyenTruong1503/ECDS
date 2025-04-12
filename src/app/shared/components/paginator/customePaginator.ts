import { MatPaginatorIntl } from '@angular/material/paginator';

export function getCustomPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Số dòng mỗi trang:';
  paginatorIntl.nextPageLabel = 'Trang sau';
  paginatorIntl.previousPageLabel = 'Trang trước';
  paginatorIntl.firstPageLabel = 'Trang đầu';
  paginatorIntl.lastPageLabel = 'Trang cuối';

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `Hiển thị 0 trên tổng số ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `Hiển thị ${startIndex + 1} - ${endIndex} trên tổng số ${length}`;
  };

  return paginatorIntl;
}
