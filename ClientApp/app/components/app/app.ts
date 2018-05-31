import { Aurelia, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";

export class App {
	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = "AureliaDotnetTemplate";
		config.map([{
			route: ["", "home"],
			name: "home",
			settings: { icon: "fa fa-home" },
			moduleId: "../home/home",
			nav: true,
			title: "Home"
		}, {
			route: "counter",
			name: "counter",
			settings: { icon: "fa fa-plus" },
			moduleId: "../counter/counter",
			nav: true,
			title: "Counter"
		}, {
			route: "fetch-data",
			name: "fetchdata",
			settings: { icon: "fa fa-list" },
			moduleId: "../fetchdata/fetchdata",
			nav: true,
			title: "Fetch data"
		}]);
	}
}
