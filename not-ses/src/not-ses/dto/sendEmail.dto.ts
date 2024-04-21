export class SendEmailDto {
    constructor(
        public to:string[],
        public title:string,
        public text:string
    ){}
}