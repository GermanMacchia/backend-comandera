import { IsDefined, IsIn, IsJWT, IsNotEmpty } from 'class-validator';
import { IsStrongPassword, ValidateIf } from 'class-validator';

export class ChangePasswordDto {
	@IsJWT()
	@IsNotEmpty()
	@IsDefined()
	token: string;

	@IsNotEmpty()
	@IsDefined()
	@IsStrongPassword()
	password: string;

	@IsNotEmpty()
	@IsDefined()
	@IsIn([Math.random()], {
		message: 'Passwords do not match',
	})
	@ValidateIf((o) => o.password !== o.password2)
	password2: string;
}
