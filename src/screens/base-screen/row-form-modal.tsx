import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Input, Modal } from "../../components";
import { generateRandomID, getCurrency } from "../../utils/Helpers";
import { Row } from "../../types/object";
import {
  currenciesSelector,
  getLocalizedErrors,
  getLocalizedBase,
} from "../../redux/selectors";
import { setTableData } from "../../redux/actions/staticActions";

type RowFormModalProps = {
  data: Row[];
  selectedRow: Row | undefined;
  openModal: boolean;
  handleModalClose: () => void;
};

const RowFormModal = ({
  data,
  selectedRow,
  openModal,
  handleModalClose,
}: RowFormModalProps) => {
  const dispatch = useDispatch();
  const strings = useSelector(getLocalizedBase);
  const errorStrings = useSelector(getLocalizedErrors);
  const currencies = useSelector(currenciesSelector);
  let submitMyForm: any = null;

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(errorStrings.getString("required")),
    currency: Yup.string().required(errorStrings.getString("required")),
    amount: Yup.number()
      .required(errorStrings.getString("required"))
      .typeError(errorStrings.getString("number"))
      .positive(errorStrings.getString("positive")),
  });

  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };

  const onSubmit = ({ name, isIncome, currency, amount }: Row) => {
    let row: Row = { name, isIncome, currency, amount };
    let newArr: Row[] = [...data];
    if (selectedRow) {
      const findIndex = data.findIndex((item) => item.id === selectedRow.id);
      row.id = selectedRow.id;
      if (findIndex > -1) newArr.splice(findIndex, 1, row);
    } else {
      row.id = generateRandomID();
      newArr.push({ ...row });
    }
    dispatch(setTableData(newArr));
    handleModalClose();
  };

  return (
    <Modal
      title={
        selectedRow?.id
          ? strings.getString("edit_row")
          : strings.getString("add_row")
      }
      open={openModal}
      onHide={handleModalClose}
      onSubmit={() => {
        //@ts-ignore
        submitMyForm && submitMyForm();
      }}
    >
      <Formik
        initialValues={{
          name: selectedRow ? selectedRow.name : "",
          amount: selectedRow ? selectedRow.amount : 0,
          currency: selectedRow ? selectedRow.currency : "TRY",
          isIncome: selectedRow ? selectedRow.isIncome : false,
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, handleChange, values, submitForm }) => {
          bindSubmitForm(submitForm);
          return (
            <Form>
              <Input
                name="name"
                label={strings.getString("name")}
                variant="outlined"
              />
              <Input
                name="amount"
                label={strings.getString("amount")}
                variant="outlined"
              />
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={values.currency}
                onChange={(event) =>
                  setFieldValue("currency", event.target.value)
                }
                variant="outlined"
                style={{ border: "none", marginInlineEnd: 15 }}
              >
                {currencies &&
                  Object.keys(currencies)?.map((currency: string) => {
                    return (
                      <MenuItem key={currency} value={currency}>
                        {
                          /*@ts-ignore*/
                          getCurrency(currencies[currency], currency)
                        }
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.isIncome}
                    onChange={handleChange("isIncome")}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={
                  values.isIncome
                    ? strings.getString("income")
                    : strings.getString("expense")
                }
              />
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default RowFormModal;
