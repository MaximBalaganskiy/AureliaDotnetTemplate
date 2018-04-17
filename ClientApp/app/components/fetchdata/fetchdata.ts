import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class Fetchdata {
	constructor(private http: HttpClient) { }

	public forecasts: WeatherForecast[];

	async activate() {
		this.forecasts = await this.http.fetch("api/SampleData/WeatherForecasts").then(result => result.json() as Promise<WeatherForecast[]>);
	}
}

interface WeatherForecast {
	dateFormatted: string;
	temperatureC: number;
	temperatureF: number;
	summary: string;
}
