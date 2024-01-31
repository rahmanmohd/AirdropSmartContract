// AirdropPage.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { useWalletConnect } from "@walletconnect/react";

const AirdropPage = ({ contractAddress, tokenAddress, network }) => {
  const { connect, connected, accounts, chainId } = useWalletConnect();

  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [quantity, setQuantity] = useState("");

  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const executeAirdrop = async () => {
    if (!connected) {
      alert("Connect your wallet first");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function airdrop(address[] calldata, uint256[] calldata)'], signer);

    try {
      const recipientsArray = recipients.split(",").map((address) => address.trim());
      const amountsArray = amounts.split(",").map((amount) => ethers.utils.parseEther(amount.trim()));

      const overrides = { gasLimit: 2000000 };
      const tx = await contract.airdrop(recipientsArray, amountsArray, overrides);
      await tx.wait();

      alert("Airdrop executed successfully");
    } catch (error) {
      console.error("Error executing airdrop:", error);
      alert("Airdrop execution failed");
    }
  };

  return (
    <div>
      <h1>Airdrop Page</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {connected && (
        <div>
          <p>Connected to {network}</p>
          <div>
            <label>Recipients (comma-separated addresses): </label>
            <input type="text" value={recipients} onChange={(e) => setRecipients(e.target.value)} />
          </div>
          <div>
            <label>Amounts (comma-separated amounts): </label>
            <input type="text" value={amounts} onChange={(e) => setAmounts(e.target.value)} />
          </div>
          <div>
            <label>Airdrop Quantity: </label>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button onClick={executeAirdrop}>Execute Airdrop</button>
        </div>
      )}
    </div>
  );
};

export default AirdropPage;
