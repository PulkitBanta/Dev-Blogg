import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, len: number) {
        if(value.length > len) {
            return value.slice(0, len) + ' ...';
        }
        return value;
    }
}