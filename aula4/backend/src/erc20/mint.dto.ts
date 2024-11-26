import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MintDto {
  @ApiProperty({
    description: 'Endereço que vai receber o token',
    example: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Quantidade de tokens a serem mintados',
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
