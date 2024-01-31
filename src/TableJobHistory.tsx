import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

interface TableData {
  id: number;
  report_type: string;
  email_list: string;
  table_extract: string;
  graph_extract: string;
  node_extract: string;

}

const Row: React.FC<{ row: TableData }> = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);  

  function countCommas(inputString: string): number {
    const commaMatches = inputString.match(/,/g);
    return commaMatches ? commaMatches.length : 0;
  }

  const commaCount: number = countCommas(row.node_extract) + 1;
  const countNode = commaCount + ' Node' 
  const commaCountEmail: number = countCommas(row.node_extract) + 1;
  const countNodeEmail = commaCountEmail + ' Email' 
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{countNode}</TableCell>
        <TableCell align="center">{row.report_type}</TableCell>
        <TableCell align="center">{row.table_extract}</TableCell>
        <TableCell align="center">{row.graph_extract}</TableCell>
        <TableCell align="center">{countNodeEmail}</TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginTop: 1, marginBottom:1}}>
            <Typography variant="body2" fontWeight={"bold"} gutterBottom component="div">
                {"List of node extracted : "}
              </Typography>
              <Typography variant="inherit" gutterBottom component="div">
                {row.node_extract}
              </Typography>
              <Typography variant="body2" fontWeight={"bold"} gutterBottom component="div">
                {"List email to be sent : "}
              </Typography>
              <Typography variant="inherit" gutterBottom component="div">
                {row.email_list}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};


const TableJobHistory: React.FC = () => {
  const [rows, setData] = useState<TableData[]>([    {
    id: 0,
    report_type: " ",
    email_list: " " ,
    table_extract: " ",
    graph_extract: " ",
    node_extract: " "
}]);
const token = localStorage.getItem('token')
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch ('http://0.0.0.0:8080/export/getListJob', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          // Additional options like body, credentials, etc. can be added here
        });        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, [token]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
    <Typography variant='h6' fontWeight='bold'> History Job created : </Typography>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Node Extract</TableCell>
            <TableCell>Report Type</TableCell>
            <TableCell>Table Extract</TableCell>
            <TableCell>Graph Extract</TableCell>
            <TableCell>Email List</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <Row row={row}/>

        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[8, 15, 30]} 
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>
  );
};

export default TableJobHistory;