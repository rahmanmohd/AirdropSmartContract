// WalletConnectButton.js
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injectedConnector = new InjectedConnector({ supportedChainIds: [97] }); // 97 is the Binance Smart Chain TestNet

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const WalletConnectButton = () => {
  const { activate, deactivate, active } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injectedConnector);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

  return (
    <div>
      {!active ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
