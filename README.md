# Aurelia .Net Template
This project has picked up where the official Microsoft Aurelia template left.
It's got more clear webpack configuration and latest Aurelia and Bootstrap packages.
Those interested in [Materialize](http://materializecss.com) instead of Bootstrap please proceed to [Aurelia .Net Materialize Template](https://github.com/MaximBalaganskiy/AureliaDotnetTemplateMaterialize).

Basically, there are two coexisting applications in this template - one is Asp.Net Core Web Api which additionaly serves local files and the second one is an Aurelia app.
Previously, the template used Asp.Net Spa Services to start a webpack dev server for development. This does not happen anymore. 
Why? It is causing a webpack rebuild each time you recompile C# code (trust me, it IS SLOW on a decent sized project), which is not practical when Api and UI are developed in parallel.

Instead, when developing UI, just run `npm run webpack:watch` in the background. The Asp.Net Core FileServer middleware will serve the fresh files when you refresh the browser.
Yes, this means no HMR, but, honestly, it does not work more often than it does, especially when `ValidationController` is injected into an Aurelia view.

The template is obviously opinionated but always open to suggestions and PRs.