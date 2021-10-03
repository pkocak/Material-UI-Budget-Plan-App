type sortDataProps = {
  value: string;
  filteredData: any[] | undefined;
  sort: { column: string; sort: "asc" | "desc" } | undefined;
  sortedArray: (array: any[] | undefined) => void;
  newSorting: (
    sort: { column: string; sort: "asc" | "desc" } | undefined
  ) => void;
};

const sortData = ({
  value,
  filteredData,
  sort,
  sortedArray,
  newSorting,
}: sortDataProps) => {
  const sortingArray: any[] | undefined = filteredData;
  let sorting = sort;
  if (sorting) {
    if (sorting.column === value) {
      if (sorting.sort === "desc") {
        sorting = { column: value, sort: "asc" };
        sortingArray?.sort((a, b) => (a[value] > b[value] ? -1 : 1));
      } else {
        sorting = { column: value, sort: "desc" };
        sortingArray?.sort((a, b) => (a[value] > b[value] ? 1 : -1));
      }
    } else {
      sorting = { column: value, sort: "desc" };
      sortingArray?.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }
  } else {
    sorting = { column: value, sort: "desc" };
    sortingArray?.sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  sortedArray(sortingArray);
  newSorting(sorting);
};

export default sortData;
