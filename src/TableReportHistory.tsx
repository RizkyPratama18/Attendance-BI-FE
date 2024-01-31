import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

export interface Node {
  instance: string;
  node_name: string;
}

export interface NodeFieldData{
  table_field: string[];
  graph_field: string[];
  nodes: Node[];
}

export interface OrganisationFieldData{
  region : string;
  domain : string;
  projects : string[];
  table_field: string[];
  graph_field: string[];
}

interface TableData {
  id :number;
  start_date: string;
  end_date: string;
  node_extract: NodeFieldData;
  org_extract: OrganisationFieldData;
}

const Row: React.FC<{ row: TableData }> = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);  
 
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.start_date}</TableCell>
        <TableCell align="center">{row.end_date}</TableCell>
        <TableCell align="center">{row.hasOwnProperty('node_extract') ? row.node_extract.table_field.join(' , '):''}</TableCell>
        <TableCell align="center">{row.hasOwnProperty('node_extract') ? row.node_extract.graph_field.join(' , '):''}</TableCell>
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
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};


const TableReportHistory: React.FC = () => {
  const [rows, setData] = useState<TableData[]>([    {
    id: 0,
    start_date: " ",
    end_date: " ",
    node_extract: {
      table_field: [],
      graph_field: [],
      nodes: []
    },
    org_extract:{
      region: '',
      domain: '',
      projects: [],
      table_field: [],
      graph_field: []
    }
    }]);

  const token = localStorage.getItem('token')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch ('http://103.147.159.225:443/export/getListReport', {
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
      <Typography variant='h6' fontWeight='bold'> History report created : </Typography>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Table Extract</TableCell>
            <TableCell align="center">Graph Extract</TableCell>
            <TableCell align="center">Details</TableCell>
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

export default TableReportHistory;