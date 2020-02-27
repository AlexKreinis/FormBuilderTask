import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";

const columns = [
  { id: "id", label: "Form Id", minWidth: 100, align: "center" },
  { id: "formname", label: "Form Name", minWidth: 130, align: "center" },
  {
    id: "Submissions",
    label: "Submissions",
    minWidth: 130,
    align: "center"
  },
  {
    id: "submitpage",
    label: "Submit Page",
    minWidth: 170,
    align: "center"
  },
  {
    id: "submissionpage",
    label: "Submissions Page",
    minWidth: 170,
    align: "center"
  }
];

function createData(id, formname, Submissions, submitpage, submissionpage) {
  return { id, formname, Submissions, submitpage, submissionpage };
}

const rows = [
  createData("1", "Task Feedback", 0, "aaa", "aaa"),
  createData("2", "Task Feedback", 0, "aaa", "aaa"),
  createData("2", "Task Feedback", 0, "aaa", "aaa"),
  createData("2", "Task Feedback", 0, "aaa", "aaa"),
  createData("2", "Task Feedback", 0, "aaa", "aaa"),
  createData("2", "Task Feedback", 0, "aaa", "aaa")
];

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto"
  },
  // container: {
  //   maxHeight: 440
  // },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid rgba(0,0,0,0.1)"
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const checkColumnIfLinkOrValue = (value, id) => {
    if (id === "submitpage") {
      return (
        <Tooltip title="Submit data to your form">
          <Link to={`submitpage/${value}`}>
            <IconButton aria-label="Add">
              <AddCircleIcon />
            </IconButton>
          </Link>
        </Tooltip>
      );
    } else if (id === "submissionpage") {
      return (
        <Tooltip title="Watch your submitted data">
          <Link to={`submissionpage/${value}`}>
            <IconButton aria-label="Add">
              <VisibilityIcon />
            </IconButton>
          </Link>
        </Tooltip>
      );
    } else return value;
  };
  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div>
          <h3>Form Table</h3>
        </div>
        <div>
          <Tooltip title="Add new form">
            <Link to="/formbuilder">
              <IconButton aria-label="Add">
                <NoteAddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {checkColumnIfLinkOrValue(value, column.id)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
