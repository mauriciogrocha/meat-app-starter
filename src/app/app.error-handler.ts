import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/observable/throw";

export class ErrorHandler {
    static errorHandler(error: HttpErrorResponse | any) {
        let errorMessage: string

        if (error instanceof HttpErrorResponse) {
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText} ${error.error}`
        } else {
            errorMessage = error.message ? error.message  : error.toString();
        }
        console.log(errorMessage)
        return Observable.throw(errorMessage);
    }
}