import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { ApiBody } from '@nestjs/swagger';
import { MintDto } from './mint.dto';

@Controller('erc20')
export class ERC20Controller {
  private readonly logger = new Logger(ERC20Controller.name);

  constructor(private readonly erc20Service: ERC20Service) {}

  @Get('balance/:address')
  async getBalance(@Param('address') address: string) {
    this.logger.log(`Fetching balance for address: ${address}`);
    const balance = await this.erc20Service.getBalance(address);
    this.logger.log(`Balance for address ${address}: ${balance}`);
    return balance;
  }

  @Get('name')
  async getName() {
    this.logger.log('Fetching token name');
    const name = await this.erc20Service.getName();
    this.logger.log(`Token name: ${name}`);
    return name;
  }

  @Get('symbol')
  async getSymbol() {
    this.logger.log('Fetching token symbol');
    const symbol = await this.erc20Service.getSymbol();
    this.logger.log(`Token symbol: ${symbol}`);
    return symbol;
  }

  @Get('totalSupply')
  async getTotalSupply() {
    this.logger.log('Fetching total supply of tokens');
    const totalSupply = await this.erc20Service.getTotalSupply();
    this.logger.log(`Total supply: ${totalSupply}`);
    return totalSupply;
  }

  @Get('decimals')
  async getDecimals() {
    this.logger.log('Fetching token decimals');
    const decimals = await this.erc20Service.getDecimals();
    this.logger.log(`Token decimals: ${decimals}`);
    return decimals;
  }

  @Post('mint')
  @ApiBody({
    description: 'Mint new tokens',
    type: MintDto,
  })
  async mint(@Body('address') address: string, @Body('amount') amount: number) {
    this.logger.log(`Minting ${amount} tokens to address: ${address}`);
    try {
      const result = await this.erc20Service.mint(address, amount);
      this.logger.log(`Successfully minted ${amount} tokens to ${address}. Transaction hash: ${result}`);
      return result;
    } catch (error) {
      this.logger.error('Error minting tokens:', error);
      throw new InternalServerErrorException('Failed to mint tokens');
    }
  }
}
