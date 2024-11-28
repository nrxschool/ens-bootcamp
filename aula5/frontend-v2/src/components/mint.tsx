import * as React from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import abi from "./abi.json";

export function Mint() {
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    try {
      writeContract({
        address: "0x663F3ad617193148711d28f5334eE4Ed07016602",
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

  return (
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
      <div>{isConfirming ? "Aguardando confirmação..." : isConfirmed ? "Transação confirmada com sucesso!" : null}</div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </form>
  );
}
