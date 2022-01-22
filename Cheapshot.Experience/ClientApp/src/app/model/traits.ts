import { DatePipe } from "@angular/common";

export const getIsoDateString = (date: Date) => {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
}