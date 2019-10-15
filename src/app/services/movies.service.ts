import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, CreditoPelicula } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const url = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(url);
  }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = 0 + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mes}-01`;
    const fin = `${hoy.getFullYear()}-${mes}-${ultimoDia}`;

    const url = `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`;

    return this.ejecutarQuery<RespuestaMDB>(url);
  }

  getPeliculaDetalle( id: string ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula( id: string ) {
    return this.ejecutarQuery<CreditoPelicula>(`/movie/${id}/credits?a=1`);
  }

}
