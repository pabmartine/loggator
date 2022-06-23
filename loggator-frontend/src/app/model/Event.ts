import { SourceType } from "../enums/source-type";

export interface Event{
    date : string;
    priority: string;
    source : SourceType;
    message : string;
}