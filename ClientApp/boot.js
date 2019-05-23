import "isomorphic-fetch";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";
export function configure(aurelia) {
    aurelia.use.standardConfiguration();
    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }
    //new HttpClient().configure(config => {
    //	const baseUrl = document.getElementsByTagName("base")[0].href;
    //	config.withBaseUrl(baseUrl);
    //});
    aurelia.start().then(function () { return aurelia.setRoot("app/components/app/app"); });
}
//# sourceMappingURL=boot.js.map