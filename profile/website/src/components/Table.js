import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import { Button } from '@mui/material';

const Table = ({ data, columnHeaders, detailPanel, refreshAction, loading }) => {
  const columns = useMemo(
    () => columnHeaders
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection={false}
      enableColumnOrdering
      enableGlobalFilter={true}
      enableColumnFilterModes
      muiTableHeadRowProps={{
        sx: {
          backgroundColor: '#f5f5f5',
          borderColor: '#3351DB',
        }
      }}
      renderDetailPanel={ detailPanel ? detailPanel: false }
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => refreshAction()} variant="contained">
          Refresh
        </Button>
      )}
      state={{ isLoading: loading }}

    />
  )
}
export default Table;