import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { Column, Row } from "../../types/object";
import { generateRandomID, getCurrency } from "../../utils/Helpers";
import {
  currencyValuesSelector,
  getLocalizedTable,
} from "../../redux/selectors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpIcon from "@material-ui/icons/ArrowUpward";
import DownIcon from "@material-ui/icons/ArrowDownward";
import FilterIcon from "@material-ui/icons/FilterList";
import filterData from "./functions/filter-data";
import sortData from "./functions/sort-data";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 687,
  },
});

const ITEM_PADDING_TOP = 8;
const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TableProps = {
  columns: Column[];
  data: Row[];
  onClick: (id?: string, isForDelete?: boolean) => void;
};

const MTable = ({ columns, data, onClick }: TableProps) => {
  const classes = useStyles();
  const strings = useSelector(getLocalizedTable);
  const currencyValues = useSelector(currencyValuesSelector);

  const [filteredData, setFilteredData] = useState<any[]>();
  const [filters, setFilters] = useState<{ filter: string; values: any[] }[]>([
    { filter: "name", values: ["Mehmet Polat"] },
    { filter: "amount", values: ["01"] },
  ]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sorting, setSorting] =
    useState<{ column: string; sort: "asc" | "desc" }>();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let filtersArr: { filter: string; values: any[] }[] = [];
    columns.forEach((column) => {
      let newFilter: { filter: string; values: any[] } = {
        filter: column.id,
        values: [],
      };
      filtersArr.push(newFilter);
    });
    setFilters(filtersArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterData({
      data,
      searchFilter,
      filters,
      returnFilteredData: (filteredData) => setFilteredData(filteredData),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter, filters, data]);

  useEffect(() => {
    let total = 0;
    data.forEach((row) => {
      let amount = row.amount;
      //@ts-ignore
      amount = parseInt(amount);
      if (currencyValues) {
        if (row.currency !== currencyValues.base) {
          //@ts-ignore
          amount = amount / currencyValues.rates[row.currency];
        }
        if (row.isIncome) total = total + amount;
        else total = total - amount;
      }
    });
    setTotalAmount(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currencyValues]);

  const handleFilterSelect = (
    event: React.ChangeEvent<{ value: unknown }>,
    id: string
  ) => {
    let newFilters = [...filters];
    let findFilter = filters.find((filter) => filter.filter === id);
    let findIndex = filters.findIndex((filter) => filter.filter === id);
    if (findFilter && findIndex > -1) {
      newFilters.splice(findIndex, 1, {
        filter: findFilter?.filter,
        values: event.target.value as any,
      });
      setFilters(newFilters);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBlockEnd: 15,
        }}
      >
        <TextField
          placeholder={strings.getString("search")}
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
        <Button variant="outlined" color="primary" onClick={() => onClick()}>
          {strings.getString("add_new_row")}
        </Button>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  let filterMenu = filters.find(
                    (filter) => filter.filter === column.id
                  );
                  let selectorMenu: (string | number | boolean)[] = [];
                  data?.forEach((object) => {
                    //@ts-ignore
                    if (
                      !selectorMenu?.some(
                        (menuItem) => menuItem === object[column.id]
                      )
                    ) {
                      //@ts-ignore
                      selectorMenu.push(object[column.id]);
                    }
                  });
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      onClick={() => {
                        sortData({
                          value: column.id,
                          filteredData: filteredData,
                          sort: sorting,
                          sortedArray: (sortedArray) =>
                            setFilteredData(sortedArray),
                          newSorting: (sorting) => setSorting(sorting),
                        });
                      }}
                    >
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={filterMenu?.values ? filterMenu.values : []}
                        onChange={(e) => handleFilterSelect(e, column.id)}
                        input={<Input />}
                        renderValue={(selected) => (
                          <FilterIcon
                            style={{
                              width: 15,
                              height: 15,
                              marginInlineStart: 10,
                              marginBlockEnd: -2,
                            }}
                          />
                        )}
                        displayEmpty
                        MenuProps={MenuProps}
                      >
                        {selectorMenu.length > 0 &&
                          selectorMenu.map((item) => (
                            <MenuItem
                              key={
                                typeof item === "boolean"
                                  ? generateRandomID()
                                  : item
                              }
                              /*@ts-ignore*/
                              value={item}
                            >
                              <Checkbox
                                checked={
                                  filterMenu && filterMenu.values
                                    ? filterMenu!.values!.indexOf(item) > -1
                                    : false
                                }
                              />
                              <ListItemText
                                primary={
                                  item === true
                                    ? strings.getString("income")
                                    : item === false
                                    ? strings.getString("expense")
                                    : item
                                }
                              />
                            </MenuItem>
                          ))}
                      </Select>
                      {column.label}
                      {sorting?.column === column.id &&
                        (sorting.sort === "desc" ? (
                          <DownIcon
                            style={{
                              width: 15,
                              height: 15,
                              marginInlineStart: 10,
                              marginBlockEnd: -2,
                            }}
                          />
                        ) : (
                          <UpIcon
                            style={{
                              width: 15,
                              height: 15,
                              marginInlineStart: 10,
                              marginBlockEnd: -2,
                            }}
                          />
                        ))}
                    </TableCell>
                  );
                })}
                <TableCell align="right">
                  {strings.getString("action")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (
                          column.id === "currency" &&
                          typeof value === "string"
                        )
                          value = getCurrency(value, value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value === true
                              ? strings.getString("income")
                              : value === false
                              ? strings.getString("expense")
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => row.id && onClick(row.id)}
                        />
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => row.id && onClick(row.id, true)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fafafa",
                  }}
                />
                <TableCell
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fafafa",
                  }}
                />
                <TableCell
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fafafa",
                  }}
                />
                <TableCell
                  align="right"
                  style={{
                    fontWeight: 700,
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fafafa",
                  }}
                >
                  {strings.getString("total") +
                    getCurrency(totalAmount.toFixed(2), currencyValues?.base)}
                </TableCell>
                <TableCell
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fafafa",
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={strings.getString("number_of_rows")}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default MTable;
