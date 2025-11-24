import abi from "./contracts/CrowdFunding.json";
import { useState } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Contributers from "./components/Contributers";
import "./components/Main.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("No account connected");
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    const contractAddress = "0x56288aF8D33ef0F49BA320A55A8741340FaB5672";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account);
        setState({ provider, signer, contract });
        setWalletConnected(true);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {walletConnected ? (
        <div className="App">
          <div className="App-header">
            <h1>
              FundChain:<span className="blue">A Crowdfunding Platform</span>
            </h1>
            <h3>Contribute to the society with the new blockchain technology</h3>

            <p className="App-connection">
              {" "}
              <span className="blue">Connected Account:</span>{" "}
              {String(account).toUpperCase()}
            </p>
            <br />

            <Buy state={state} />
            <Contributers state={state} />
          </div>
        </div>
      ) : (
        <div class="centered-container">
          <button class="click" onClick={connectWallet}>
            Connect to Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
