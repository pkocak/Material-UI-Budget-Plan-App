import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import reduxStore from "./redux/index";
import "./App.css";

import { BaseScreen } from "./screens";
import { Loader } from "./components";
import { isLoadingState } from "./redux/selectors";

const { store, persistor } = reduxStore();

function Nav() {
  const isLoading = useSelector(isLoadingState);
  return (
    <div className="App">
      <BaseScreen />
      {isLoading ? <Loader /> : null}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
