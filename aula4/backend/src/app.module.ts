import { Module } from '@nestjs/common';
import { ERC20Controller } from './erc20/erc20.controller';
import { ERC20Service } from './erc20/erc20.service';

@Module({
  imports: [],
  controllers: [ERC20Controller],
  providers: [ERC20Service],
})
export class AppModule {}
