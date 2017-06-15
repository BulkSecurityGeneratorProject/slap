import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Menu } from './menu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MenuService {

    private resourceUrl = 'api/menus';

    constructor(private http: Http) { }

    create(menu: Menu): Observable<Menu> {
        const copy = this.convert(menu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(menu: Menu): Observable<Menu> {
        const copy = this.convert(menu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Menu> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(menu: Menu): Menu {
        const copy: Menu = Object.assign({}, menu);
        return copy;
    }
}
