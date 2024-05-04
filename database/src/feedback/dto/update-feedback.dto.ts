export class UpdateFeedbackDto {
    id:string;
    name?:string;
    description?:string;
    isDraft:boolean;
    json?:JSON | null;
}