import * as React from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useReadContract,
} from "wagmi";
import abi from "./abi.json";
import { Address } from "viem";

let CONTRACT = process.env.REACT_APP_CONTRACT as Address;


console.log(`CONTRACT: ${CONTRACT}`)

export function Mint() {
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mints, setMints] = React.useState<string[] | undefined>([]);

  // read env CONTRACT
  
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { data: mintsData } = useReadContract({
    address: CONTRACT,
    abi,
    functionName: "getMints",
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    try {
      writeContract({
        address: CONTRACT,
        abi,
        functionName: "mint",
        args: [message],
      });
    } catch (error: BaseError | any) {
      setErrorMessage(error.message || "Erro ao realizar transação.");
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    setMints(mintsData as string[]);
  }, [isConfirmed, mintsData]);

  return (
    <div>
      <form onSubmit={submit}>
        <input
          name="message"
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={4}
        />
        <button type="submit">
          {isPending ? "Confirmando..." : "Mintar Tokens"}
        </button>

        {hash && <div>Hash da Transação: {hash}</div>}
        <div>
          {isConfirming
            ? "Aguardando confirmação..."
            : isConfirmed
            ? "Transação confirmada com sucesso!"
            : null}
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        {error && <div style={{ color: "red" }}>{error.message}</div>}
      </form>
      {/* DONT TOUCH HERE ( GAMBIARRA ) */}
      {mints && mints.length > 0 && (
        <div>
          <h3>Lista de Mints:</h3>
          <ul>
            {mints.map((mint, index) => (
              <li key={index}>{mint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
