export class VerificationDto {
    constructor(
        public to:string,
        public username:string,
        public code:string,
        public serviceName:string,
    ){}
}