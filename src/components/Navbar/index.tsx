import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//@ts-ignore
import Flags from "country-flag-icons/react/3x2";
import { setCurrency, setLanguage } from "../../redux/actions/systemActions";
import {
  currenciesSelector,
  currencySelector,
  languageSelector,
} from "../../redux/selectors";
import { getCurrency } from "../../utils/Helpers";
import { getCurrencyValues } from "../../redux/actions/staticActions";
import { icons } from "../../assets";

const languagesArray = [
  { label: "English", value: "en", role: "Country" },
  { label: "Turkish", value: "tr", role: "Country" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const language = useSelector(languageSelector);
  const currency = useSelector(currencySelector);
  const currencies = useSelector(currenciesSelector);

  useEffect(() => {
    dispatch(getCurrencyValues(currency));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const languageSet = (event: any) => {
    dispatch(setLanguage(event.target.value));
  };

  const currencySet = (event: any) => {
    dispatch(setCurrency(event.target.value));
    dispatch(getCurrencyValues(event.target.value));
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography style={{ flex: 1 }}>
          <img src={icons.logo} alt="" style={{ width: 50 }} />
        </Typography>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={currency}
          onChange={(event) => currencySet(event)}
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
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={language}
          onChange={(event) => languageSet(event)}
          variant="outlined"
          style={{ border: "none" }}
        >
          {languagesArray.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    marginInlineEnd: 10,
                    marginBlockStart: 1,
                  }}
                >
                  {item.value === "en" && (
                    <Flags.GB title={item.label} className="flag" />
                  )}
                  {item.value === "tr" && (
                    <Flags.TR title={item.label} className="flag" />
                  )}
                </div>
                {item.label}
              </div>
            </MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
