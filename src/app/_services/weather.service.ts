import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {

    private static getWeatherURL = `${environment.apiURL}/weathers/weather`;

  constructor(private http: HttpClient) {

  }

  getCityWeather(city: string) {
    return this.http.get<any>(`${WeatherService.getWeatherURL}/${city}`);
  }

}
