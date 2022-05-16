import './App.css';
import {DAppProvider, Rinkeby} from "@usedapp/core";
import { Navbar, Content } from "./components/index";

function App() {
  return (
    <DAppProvider config={{networks: [Rinkeby]}}>
      <div className="App">
        <Navbar />
        <Content />
      </div>
    </DAppProvider>
  );
}

export default App;
