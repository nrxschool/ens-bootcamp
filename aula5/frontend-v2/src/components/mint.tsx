import * as React from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useReadContract,
} from "wagmi";
import abi from "./abi.json";

export function Mint() {
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mints, setMints] = React.useState<string[] | undefined>([]);

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { data: mintsData } = useReadContract({
    address: "0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1",
    abi,
    functionName: "getMints",
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    try {
      writeContract({
        address: "0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1",
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
