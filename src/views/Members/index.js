import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import MultipleSelect from "./MultipleSelect";
import { Button, Stack, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Members = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "mobile", headerName: "Mobile", width: 130 },
    { field: "mobile", headerName: "Mobile", width: 130 },
    { field: "package", headerName: "Package", width: 130 },
    { field: "role", headerName: "Roles", width: 130 },
    { field: "edit", headerName: "Edit", width: 130 },
  ];

  const rows = [];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <MultipleSelect />

        {/* <Stack direction="row" spacing={2}> */}
          <Button variant="contained" endIcon={<SendIcon />}>Search</Button>
      </Box>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default Members;
