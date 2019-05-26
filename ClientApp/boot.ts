import "isomorphic-fetch";
import { Aurelia, PLATFORM } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
	aurelia.use.standardConfiguration();

	if (IS_DEV_BUILD) {
		aurelia.use.developmentLogging();
	}

	aurelia.start().then(() => aurelia.setRoot("app/components/app/app"));
}
