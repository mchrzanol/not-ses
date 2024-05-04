export class SendEmailNotificationDto {
    constructor(
        //have to provide to or group of users that email is intended to send
        public to:string[],
        public group:string[],
        public sender:string,//name of sender, remainder are gotten from db
        public title:string,
        public text:string
    ){}
}