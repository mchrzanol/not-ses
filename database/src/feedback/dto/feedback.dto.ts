export class FeedbackDto {
    id:string;
    name:string;
    description:string;
    isDraft:boolean;
    json:string | null;
    path:string | null;
}