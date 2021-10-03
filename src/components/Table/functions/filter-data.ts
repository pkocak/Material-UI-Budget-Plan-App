type filterDataProps = {
  data: Object | any[] | undefined;
  searchFilter: string;
  filters: { filter: string; values: any[] }[];
  returnFilteredData: (array: any[] | undefined) => void;
};

const filterData = ({
  data,
  searchFilter,
  filters,
  returnFilteredData,
}: filterDataProps) => {
  if (data) {
    let dataArr = data;
    if (!Array.isArray(data)) dataArr = Object.values(data);
    //@ts-ignore
    let exists = dataArr?.filter((e) => {
      return Object.values(e).some((r: any) => {
        if (typeof r === "string" && typeof searchFilter === "string")
          return (
            r.toLocaleUpperCase().indexOf(searchFilter.toLocaleUpperCase()) > -1
          );
        else return false;
      });
    });
    filters.forEach((filter) => {
      exists = exists?.filter((e: any) => {
        return Object.values(e).some((r: any) => {
          if (filter.values.length === 0) return true;
          else return filter.values.includes(r);
        });
      });
    });
    returnFilteredData(exists);
  } else returnFilteredData([]);
};

export default filterData;
