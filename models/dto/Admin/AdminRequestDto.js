import { IsString, IsNotEmpty } from 'class-validator';

export class AdminRequestDto {
    @IsString()
    @IsNotEmpty()
    adminCode;

    constructor(data) {
        Object.assign(this, data);
    }
}
