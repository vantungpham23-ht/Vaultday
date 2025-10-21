import {
  Component,
  RouterOutlet,
  bootstrapApplication,
  provideBrowserGlobalErrorListeners,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-YRQE2BQG.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "room/:id",
    loadComponent: () => import("./chunk-7J3BQT3Z.js").then((m) => m.ChatRoomComponent)
  },
  {
    path: "",
    loadComponent: () => import("./chunk-WXPF5KCR.js").then((m) => m.HomeComponent)
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

// src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{
      selector: "app-root",
      imports: [RouterOutlet],
      template: "<router-outlet />"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 9 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
