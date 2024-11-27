import { Injectable } from '@nestjs/common';
import { Address, createWalletClient } from 'viem';
import { createPublicClient, http } from 'viem';
import abi from './Token';
import { anvil } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// READ
// Provider
// input -> RPC URL
// output <-  object.connect.blockchain()

// WRITE
// Signer
// Browser (js)
// Backend (node)

@Injectable()
export class ERC20Service {
  private client;
  private contractAddress: Address =
    '0x8438Ad1C834623CfF278AB6829a248E37C2D7E3f';
  private account;
  private wallet;

  constructor() {
    const PRIVATE_KEY =
      '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';
    this.account = privateKeyToAccount(PRIVATE_KEY as Address);
    this.client = createPublicClient({
      chain: anvil,
      transport: http(),
    });

    this.wallet = createWalletClient({
      chain: anvil,
      transport: http(),
    });
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.client.readContract({
      address: this.contractAddress,
      abi,
      functionName: 'balanceOf',
      args: [address as Address],
    });
    return balance.toString();
  }

  async getName(): Promise<string> {
    const name = await this.client.readContract({
      address: this.contractAddress,
      abi,
      functionName: 'name',
    });
    return name;
  }

  async getSymbol(): Promise<string> {
    const symbol = await this.client.readContract({
      address: this.contractAddress,
      abi,
      functionName: 'symbol',
    });
    return symbol;
  }

  async getTotalSupply(): Promise<string> {
    const totalSupply = await this.client.readContract({
      address: this.contractAddress,
      abi,
      functionName: 'totalSupply',
    });
    return totalSupply.toString();
  }

  async getDecimals(): Promise<number> {
    const decimals = await this.client.readContract({
      address: this.contractAddress,
      abi,
      functionName: 'decimals',
    });
    return decimals;
  }

  async mint(address: string, amount: number) {
    const { request } = await this.client.simulateContract({
      address: this.contractAddress,
      abi,
      functionName: 'mint',
      args: [address, amount],
      account: this.account,
    });

    const hash = await this.wallet.writeContract(request);
    return hash;
  }
}
