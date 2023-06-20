import { ApiProperty } from '@nestjs/swagger';
import { IS_ALPHA, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'zhangsan' })
  @IsNotEmpty()
  username: string;
}
