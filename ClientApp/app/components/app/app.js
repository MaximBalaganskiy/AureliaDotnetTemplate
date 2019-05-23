var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
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
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map