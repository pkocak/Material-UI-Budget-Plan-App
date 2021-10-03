import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocalizedBase, tableDataSelector } from "../../redux/selectors";
import { confirm, Navbar, Table } from "../../components";
import { Column, Row } from "../../types/object";

import "./style.css";
import { getCurrencies } from "../../redux/actions";
import RowFormModal from "./row-form-modal";
import { setTableData } from "../../redux/actions/staticActions";

const BaseScreen = () => {
  const dispatch = useDispatch();
  const strings = useSelector(getLocalizedBase);
  const data = useSelector(tableDataSelector);

  const [selectedRow, setSelectedRow] = useState<Row>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const columns: Column[] = [
    { id: "name", label: strings.getString("name") },
    { id: "isIncome", label: strings.getString("income_or_expense") },
    { id: "currency", label: strings.getString("currency") },
    { id: "amount", label: strings.getString("amount"), align: "right" },
  ];

  useEffect(() => {
    dispatch(getCurrencies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalOpen = (id?: string) => {
    if (id) {
      let selectedData = data.find((item) => item.id === id);
      setSelectedRow(selectedData);
    }
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedRow(undefined);
    setOpenModal(false);
  };

  const rowDelete = async (id: string) => {
    if (
      await confirm(
        strings.getString("delete_row"),
        strings.getString("delete_row_alert")
      )
    ) {
      let newArr: Row[] = [...data];
      const findIndex = data.findIndex((item) => item.id === id);
      if (findIndex > -1) newArr.splice(findIndex, 1);
      dispatch(setTableData(newArr));
    }
  };

  return (
    <div className="baseScreen">
      <Navbar />
      <div className="screenContent">
        <div className="screenInnerContent">
          <RowFormModal
            data={data}
            selectedRow={selectedRow}
            openModal={openModal}
            handleModalClose={handleModalClose}
          />
          <Table
            columns={columns}
            data={data}
            onClick={(id, isForDelete) =>
              isForDelete ? id && rowDelete(id) : handleModalOpen(id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BaseScreen;
