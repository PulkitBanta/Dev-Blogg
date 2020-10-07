import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    scrollTop(): void {
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    }
}