'use client';

import TableErrorMsg from './TableErrorMsg';

const TableError = () => {
  return (
    <div className="mun:absolute mun:top-1/2 mun:left-1/2 mun:-translate-x-1/2 mun:-translate-y-1/2">
      <TableErrorMsg />
    </div>
  );
};

export default TableError;
