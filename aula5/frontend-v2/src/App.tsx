import * as React from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import abi from "./abi.json"; // Certifique-se de definir o ABI correto aqui.

export function App() {
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(""); // Limpa mensagens de erro ao tentar mintar.

    try {
      writeContract({
        address: "0xSEU_CONTRATO_ENDERECO", // Insira o endereço do contrato.
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
      <button disabled={isPending || message.length < 4} type="submit">
        {isPending ? "Confirmando..." : "Mintar Tokens"}
      </button>

      {hash && <div>Hash da Transação: {hash}</div>}
      {isConfirming && <div>Aguardando confirmação...</div>}
      {isConfirmed && <div>Transação confirmada com sucesso!</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </form>
  );
}
