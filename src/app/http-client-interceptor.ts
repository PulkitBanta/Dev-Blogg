import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.retrieve('authenticationToken');

        console.log("jwt token", token);

        if(token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }

    }

}