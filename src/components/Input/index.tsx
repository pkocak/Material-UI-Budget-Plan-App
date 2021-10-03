import { TextField } from "@material-ui/core";
import { useField } from "formik";

const Input = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      style={{ width: "100%", marginBlockEnd: 15 }}
    />
  );
};

export default Input;
