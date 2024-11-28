import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Mint } from "./components/mint";
import { useAccount } from "wagmi";

const App = () => {
  const { isConnected } = useAccount();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <ConnectButton />
      {isConnected && <Mint />}
    </div>
  );
};

export default App;
