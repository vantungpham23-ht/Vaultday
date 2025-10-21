import {
  CountdownTimerComponent,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  SeoService,
  SupabaseService,
  Validators,
  ɵNgNoValidate
} from "./chunk-N2352KLI.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgIf,
  Router,
  RouterModule,
  __async,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-YRQE2BQG.js";

// src/app/components/home/home.ts
function HomeComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275element(1, "div", 39);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i ph\xF2ng m\u1EDBi nh\u1EA5t...");
    \u0275\u0275elementEnd()();
  }
}
function HomeComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 41);
    \u0275\u0275text(2, "L\u1ED7i khi t\u1EA3i ph\xF2ng m\u1EDBi nh\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 42);
    \u0275\u0275listener("click", function HomeComponent_div_35_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadPublicRooms());
    });
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd()();
  }
}
function HomeComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "h3", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 47);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 42);
    \u0275\u0275listener("click", function HomeComponent_div_36_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadPublicRooms());
    });
    \u0275\u0275elementStart(8, "span", 43);
    \u0275\u0275text(9, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.publicRooms[0].name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("T\u1EA1o l\xFAc: ", \u0275\u0275pipeBind2(6, 2, ctx_r1.publicRooms[0].created_at, "dd/MM/yyyy HH:mm"));
  }
}
function HomeComponent_div_40_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "M\xE3 ph\xF2ng l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_40_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "M\xE3 ph\xF2ng ph\u1EA3i c\xF3 \u0111\xFAng 6 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_40_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275template(1, HomeComponent_div_40_div_7_span_1_Template, 2, 0, "span", 56)(2, HomeComponent_div_40_div_7_span_2_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.roomId == null ? null : ctx_r1.roomId.errors == null ? null : ctx_r1.roomId.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.roomId == null ? null : ctx_r1.roomId.errors == null ? null : ctx_r1.roomId.errors["minlength"]) || (ctx_r1.roomId == null ? null : ctx_r1.roomId.errors == null ? null : ctx_r1.roomId.errors["maxlength"]));
  }
}
function HomeComponent_div_40_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Tham Gia");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_40_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0110ang x\u1EED l\xFD...");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "h3", 50);
    \u0275\u0275text(3, "Tham Gia Ph\xF2ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 51);
    \u0275\u0275listener("ngSubmit", function HomeComponent_div_40_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onJoinRoom());
    });
    \u0275\u0275elementStart(5, "div", 52);
    \u0275\u0275element(6, "input", 53);
    \u0275\u0275template(7, HomeComponent_div_40_div_7_Template, 3, 2, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 55);
    \u0275\u0275template(9, HomeComponent_div_40_span_9_Template, 2, 0, "span", 56)(10, HomeComponent_div_40_span_10_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r1.joinRoomForm);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("error", (ctx_r1.roomId == null ? null : ctx_r1.roomId.invalid) && (ctx_r1.roomId == null ? null : ctx_r1.roomId.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.roomId == null ? null : ctx_r1.roomId.invalid) && (ctx_r1.roomId == null ? null : ctx_r1.roomId.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.joinRoomForm.invalid || ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading);
  }
}
function HomeComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 59)(2, "h3", 60);
    \u0275\u0275text(3, "M\xE3 Ph\xF2ng C\u1EE7a B\u1EA1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 61)(5, "span", 62);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 63);
    \u0275\u0275listener("click", function HomeComponent_div_41_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyRoomCode());
    });
    \u0275\u0275elementStart(8, "span", 64);
    \u0275\u0275text(9, "\u{1F4CB}");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "p", 65);
    \u0275\u0275text(11, "Chia s\u1EBB m\xE3 n\xE0y \u0111\u1EC3 ng\u01B0\u1EDDi kh\xE1c c\xF3 th\u1EC3 tham gia ph\xF2ng");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.generatedRoomCode);
  }
}
function HomeComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "p", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u0110\xE3 tham gia: ", ctx_r1.currentRoom.name, " (", ctx_r1.currentRoom.id, ") - 1 ng\u01B0\u1EDDi");
  }
}
function HomeComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "span", 69);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function HomeComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "span", 71);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
var HomeComponent = class _HomeComponent {
  fb;
  router;
  supabaseService;
  seoService;
  joinRoomForm;
  isLoading = false;
  errorMessage = "";
  successMessage = "";
  publicRooms = [];
  isLoadingRooms = false;
  showJoinRoom = false;
  currentRoom = null;
  generatedRoomCode = null;
  constructor(fb, router, supabaseService, seoService) {
    this.fb = fb;
    this.router = router;
    this.supabaseService = supabaseService;
    this.seoService = seoService;
    this.joinRoomForm = this.fb.group({
      roomId: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.seoService.setHomePageSEO();
      console.log("Testing Neon database connection...");
      const connectionTest = yield this.supabaseService.testConnection();
      console.log("Connection test result:", connectionTest);
      if (connectionTest.ok) {
        console.log("\u2705 Database connection successful!");
        this.loadPublicRooms();
      } else {
        console.error("\u274C Database connection failed:", connectionTest.error);
        this.errorMessage = "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i database. Vui l\xF2ng ki\u1EC3m tra c\u1EA5u h\xECnh.";
      }
    });
  }
  onJoinRoom() {
    return __async(this, null, function* () {
      if (this.joinRoomForm.valid) {
        this.isLoading = true;
        this.errorMessage = "";
        this.successMessage = "";
        const { roomId } = this.joinRoomForm.value;
        try {
          const { data: existingRoom, error } = yield this.supabaseService.getRoomById(roomId);
          if (error || !existingRoom) {
            const { data: newRoom, error: createError } = yield this.supabaseService.createRoom(`Room-${roomId}`);
            if (createError || !newRoom) {
              console.error("Error creating room:", createError);
              this.errorMessage = "Kh\xF4ng th\u1EC3 t\u1EA1o ph\xF2ng. Vui l\xF2ng th\u1EED l\u1EA1i.";
              this.isLoading = false;
              return;
            }
            this.successMessage = "Ph\xF2ng m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o v\u1EDBi m\xE3 n\xE0y!";
            this.generatedRoomCode = roomId;
            this.currentRoom = newRoom;
            setTimeout(() => {
              this.router.navigate(["/room", newRoom.id]);
            }, 1500);
          } else {
            this.currentRoom = existingRoom;
            this.router.navigate(["/room", roomId]);
          }
        } catch (error) {
          console.error("Error:", error);
          this.errorMessage = "C\xF3 l\u1ED7i x\u1EA3y ra. Vui l\xF2ng th\u1EED l\u1EA1i.";
        }
        this.isLoading = false;
      }
    });
  }
  loadPublicRooms() {
    return __async(this, null, function* () {
      this.isLoadingRooms = true;
      const { data, error } = yield this.supabaseService.getPublicRooms();
      if (error) {
        console.error("Error loading public rooms:", error);
        this.publicRooms = [];
      } else {
        this.publicRooms = data || [];
      }
      this.isLoadingRooms = false;
    });
  }
  goToRoom(roomId) {
    this.router.navigate(["/room", roomId]);
  }
  get roomId() {
    return this.joinRoomForm.get("roomId");
  }
  copyRoomCode() {
    if (this.generatedRoomCode) {
      navigator.clipboard.writeText(this.generatedRoomCode).then(() => {
        this.successMessage = "\u0110\xE3 copy m\xE3 ph\xF2ng v\xE0o clipboard!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3e3);
      }).catch(() => {
        this.errorMessage = "Kh\xF4ng th\u1EC3 copy m\xE3 ph\xF2ng";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3e3);
      });
    }
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(SeoService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 48, vars: 8, consts: [[1, "home-container"], [1, "header-section"], [1, "header-content"], [1, "logo-container"], [1, "logo-icon"], ["viewBox", "0 0 32 32", "width", "48", "height", "48", 1, "logo-svg"], ["id", "logoGrad", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "100%"], ["offset", "0%", 2, "stop-color", "#8b5cf6", "stop-opacity", "1"], ["offset", "100%", 2, "stop-color", "#a78bfa", "stop-opacity", "1"], ["fill", "none", "stroke", "url(#logoGrad)", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M8 10c-1 0-2 1-2 2v8c0 1 1 2 2 2h1"], ["d", "M9 12h14c1 0 2 1 2 2v4c0 1-1 2-2 2h-8l-3 3v-3H9c-1 0-2-1-2-2v-4c0-1 1-2 2-2z"], ["d", "M23 10c1 0 2 1 2 2v8c0 1-1 2-2 2h-1"], ["cx", "14", "cy", "16", "r", "1", "fill", "url(#logoGrad)"], ["cx", "18", "cy", "16", "r", "1", "fill", "url(#logoGrad)"], [1, "app-title", "glow"], [1, "app-subtitle"], [1, "cleanup-info"], [1, "cleanup-text"], [1, "cleanup-icon"], [1, "countdown-section"], [1, "latest-room-section"], [1, "section-header"], [1, "section-title"], [1, "icon"], [1, "latest-room-content"], ["class", "loading-state", 4, "ngIf"], ["class", "no-rooms", 4, "ngIf"], ["class", "latest-room-info", 4, "ngIf"], [1, "action-buttons"], [1, "btn-primary", "btn-lg", 3, "click"], ["class", "form-section", 4, "ngIf"], ["class", "room-code-section", 4, "ngIf"], ["class", "room-status", 4, "ngIf"], ["class", "error-toast", 4, "ngIf"], ["class", "success-toast", 4, "ngIf"], [1, "version-footer"], [1, "version-text"], [1, "loading-state"], [1, "loading-spinner"], [1, "no-rooms"], [1, "error-text"], [1, "btn-secondary", "btn-sm", 3, "click"], [1, "refresh-icon"], [1, "latest-room-info"], [1, "room-info"], [1, "room-name"], [1, "room-meta"], [1, "form-section"], [1, "form-container"], [1, "form-title"], [1, "join-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "text", "formControlName", "roomId", "placeholder", "Nh\u1EADp m\xE3 ph\xF2ng (6 k\xFD t\u1EF1)...", 1, "form-input"], ["class", "error-message", 4, "ngIf"], ["type", "submit", 1, "btn-primary", "btn-lg", "w-full", 3, "disabled"], [4, "ngIf"], [1, "error-message"], [1, "room-code-section"], [1, "room-code-container"], [1, "room-code-title"], [1, "room-code-display"], [1, "room-code"], [1, "copy-btn", 3, "click"], [1, "copy-icon"], [1, "room-code-hint"], [1, "room-status"], [1, "status-text"], [1, "error-toast"], [1, "error-icon"], [1, "success-toast"], [1, "success-icon"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5)(6, "defs")(7, "linearGradient", 6);
      \u0275\u0275element(8, "stop", 7)(9, "stop", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "g", 9);
      \u0275\u0275element(11, "path", 10)(12, "path", 11)(13, "path", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "circle", 13)(15, "circle", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(16, "h1", 15);
      \u0275\u0275text(17, "VaultDay");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 16);
      \u0275\u0275text(19, "Vault it today. Gone tomorrow");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 17)(21, "p", 18)(22, "span", 19);
      \u0275\u0275text(23, "\u{1F55B}");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " T\u1EA5t c\u1EA3 ph\xF2ng chat s\u1EBD t\u1EF1 \u0111\u1ED9ng x\xF3a v\xE0o l\xFAc 00:00 ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(25, "div", 20);
      \u0275\u0275element(26, "app-countdown-timer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 21)(28, "div", 22)(29, "h2", 23)(30, "span", 24);
      \u0275\u0275text(31, "\u{1F525}");
      \u0275\u0275elementEnd();
      \u0275\u0275text(32, " Ph\xF2ng Chat M\u1EDBi Nh\u1EA5t ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 25);
      \u0275\u0275template(34, HomeComponent_div_34_Template, 4, 0, "div", 26)(35, HomeComponent_div_35_Template, 7, 0, "div", 27)(36, HomeComponent_div_36_Template, 11, 5, "div", 28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 29)(38, "button", 30);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_38_listener() {
        return ctx.showJoinRoom = !ctx.showJoinRoom;
      });
      \u0275\u0275text(39, " Tham Gia Ph\xF2ng ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(40, HomeComponent_div_40_Template, 11, 7, "div", 31)(41, HomeComponent_div_41_Template, 12, 1, "div", 32)(42, HomeComponent_div_42_Template, 3, 2, "div", 33)(43, HomeComponent_div_43_Template, 4, 1, "div", 34)(44, HomeComponent_div_44_Template, 4, 1, "div", 35);
      \u0275\u0275elementStart(45, "div", 36)(46, "p", 37);
      \u0275\u0275text(47, "Version 0.0.1");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(34);
      \u0275\u0275property("ngIf", ctx.isLoadingRooms);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoadingRooms && ctx.publicRooms.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoadingRooms && ctx.publicRooms.length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.showJoinRoom);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.generatedRoomCode);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentRoom);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CountdownTimerComponent, DatePipe], styles: ['\n\n.home-container[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  padding: var(--space-lg);\n  background: var(--bg-primary);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xl);\n  max-width: 500px;\n  margin: 0 auto;\n}\n.header-section[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--space-xl) 0;\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-sm);\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%]   .logo-svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_logoPulse 2s ease-in-out infinite;\n  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4));\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-4xl);\n  font-weight: 800;\n  margin: 0;\n  color: var(--neon-primary);\n  text-shadow: var(--neon-glow-lg);\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .app-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  color: var(--text-secondary);\n  font-style: italic;\n  opacity: 0.8;\n  margin-bottom: var(--space-sm);\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .cleanup-info[_ngcontent-%COMP%] {\n  margin-top: var(--space-sm);\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .cleanup-info[_ngcontent-%COMP%]   .cleanup-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  color: var(--text-tertiary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-xs);\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.3);\n  border-radius: var(--radius-md);\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n.header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .cleanup-info[_ngcontent-%COMP%]   .cleanup-text[_ngcontent-%COMP%]   .cleanup-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-base);\n  animation: _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n.countdown-section[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-lg);\n}\n.latest-room-section[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  overflow: hidden;\n}\n.latest-room-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n  border-bottom: 1px solid var(--border-neon);\n  background: var(--bg-secondary);\n}\n.latest-room-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n}\n.latest-room-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  border: 3px solid var(--border-muted);\n  border-top: 3px solid var(--neon-primary);\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: var(--space-md) auto;\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .no-rooms[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .no-rooms[_ngcontent-%COMP%]   .error-text[_ngcontent-%COMP%] {\n  color: var(--error);\n  font-style: italic;\n  margin-bottom: var(--space-md);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .latest-room-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-md);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .latest-room-info[_ngcontent-%COMP%]   .room-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .latest-room-info[_ngcontent-%COMP%]   .room-info[_ngcontent-%COMP%]   .room-name[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-xs);\n}\n.latest-room-section[_ngcontent-%COMP%]   .latest-room-content[_ngcontent-%COMP%]   .latest-room-info[_ngcontent-%COMP%]   .room-info[_ngcontent-%COMP%]   .room-meta[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  color: var(--text-tertiary);\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-lg);\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  transition: all 0.3s ease;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--neon-glow-md);\n}\n.form-section[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-lg);\n  text-align: center;\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%], \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-lg);\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder, \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%], \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%] {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .create-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-hint[_ngcontent-%COMP%], \n.form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .join-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-hint[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin-top: var(--space-xs);\n  font-style: italic;\n}\n.room-status[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  padding: var(--space-md);\n  text-align: center;\n  box-shadow: var(--neon-glow-sm);\n}\n.room-status[_ngcontent-%COMP%]   .status-text[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-size: var(--font-size-sm);\n  margin: 0;\n}\n.error-toast[_ngcontent-%COMP%], \n.success-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: var(--space-lg);\n  right: var(--space-lg);\n  padding: var(--space-md) var(--space-lg);\n  border-radius: var(--radius-md);\n  box-shadow: var(--neon-glow-md);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n  font-weight: 500;\n  border: 2px solid;\n}\n.error-toast[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.error-toast[_ngcontent-%COMP%]   .success-icon[_ngcontent-%COMP%], \n.success-toast[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.success-toast[_ngcontent-%COMP%]   .success-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.error-toast[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--error);\n  border-color: var(--error);\n}\n.success-toast[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--success);\n  border-color: var(--success);\n}\n.room-code-section[_ngcontent-%COMP%] {\n  margin: var(--space-lg) 0;\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--neon-primary);\n  border-radius: var(--radius-lg);\n  padding: var(--space-xl);\n  text-align: center;\n  box-shadow: var(--neon-glow-md);\n  animation: neonPulse 2s ease-in-out infinite;\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  color: var(--neon-primary);\n  margin-bottom: var(--space-lg);\n  text-shadow: var(--neon-glow-sm);\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-lg);\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-display[_ngcontent-%COMP%]   .room-code[_ngcontent-%COMP%] {\n  font-size: var(--font-size-3xl);\n  font-weight: 800;\n  color: var(--neon-primary);\n  background: var(--bg-secondary);\n  padding: var(--space-md) var(--space-lg);\n  border: 2px solid var(--neon-primary);\n  border-radius: var(--radius-md);\n  letter-spacing: 0.2em;\n  text-shadow: var(--neon-glow-md);\n  box-shadow: var(--neon-glow-sm);\n  font-family: "Courier New", monospace;\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-display[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%] {\n  background: var(--neon-primary);\n  color: var(--bg-primary);\n  border: none;\n  border-radius: var(--radius-md);\n  padding: var(--space-md);\n  cursor: pointer;\n  font-size: var(--font-size-lg);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-display[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%]:hover {\n  background: var(--neon-secondary);\n  box-shadow: var(--neon-glow-md);\n  transform: scale(1.05);\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-display[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%]   .copy-icon[_ngcontent-%COMP%] {\n  display: block;\n}\n.room-code-section[_ngcontent-%COMP%]   .room-code-container[_ngcontent-%COMP%]   .room-code-hint[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  color: var(--text-muted);\n  margin: 0;\n  font-style: italic;\n}\n.version-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--space-lg) 0;\n  margin-top: var(--space-xl);\n  border-top: 1px solid var(--border-neon);\n}\n.version-footer[_ngcontent-%COMP%]   .version-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin: 0;\n  font-style: italic;\n  opacity: 0.7;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@media (max-width: 768px) {\n  .home-container[_ngcontent-%COMP%] {\n    padding: var(--space-md);\n    gap: var(--space-lg);\n  }\n  .header-section[_ngcontent-%COMP%] {\n    padding: var(--space-lg) 0;\n  }\n  .header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n    font-size: var(--font-size-3xl);\n  }\n  .header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .app-subtitle[_ngcontent-%COMP%] {\n    font-size: var(--font-size-base);\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: var(--space-sm);\n  }\n  .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: var(--space-md);\n    font-size: var(--font-size-base);\n  }\n  .latest-room-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .latest-room-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n    padding: var(--space-md);\n  }\n  .error-toast[_ngcontent-%COMP%], \n   .success-toast[_ngcontent-%COMP%] {\n    width: calc(100% - var(--space-lg) * 2);\n    left: var(--space-lg);\n    right: var(--space-lg);\n    top: var(--space-md);\n  }\n}\n@media (max-width: 480px) {\n  .home-container[_ngcontent-%COMP%] {\n    padding: var(--space-sm);\n    gap: var(--space-md);\n  }\n  .header-section[_ngcontent-%COMP%] {\n    padding: var(--space-md) 0;\n  }\n  .header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n    font-size: var(--font-size-2xl);\n  }\n  .header-section[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .app-subtitle[_ngcontent-%COMP%] {\n    font-size: var(--font-size-sm);\n  }\n  .latest-room-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .latest-room-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n    padding: var(--space-sm);\n  }\n}\n@keyframes _ngcontent-%COMP%_logoPulse {\n  0%, 100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4));\n  }\n  50% {\n    transform: scale(1.05);\n    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.1);\n  }\n}\n/*# sourceMappingURL=home.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", imports: [CommonModule, RouterModule, ReactiveFormsModule, CountdownTimerComponent], template: `<div class="home-container">
  <!-- Header Section -->
  <div class="header-section">
    <div class="header-content">
      <div class="logo-container">
        <div class="logo-icon">
          <svg class="logo-svg" viewBox="0 0 32 32" width="48" height="48">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#logoGrad)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 10c-1 0-2 1-2 2v8c0 1 1 2 2 2h1"/>
              <path d="M9 12h14c1 0 2 1 2 2v4c0 1-1 2-2 2h-8l-3 3v-3H9c-1 0-2-1-2-2v-4c0-1 1-2 2-2z"/>
              <path d="M23 10c1 0 2 1 2 2v8c0 1-1 2-2 2h-1"/>
            </g>
            <circle cx="14" cy="16" r="1" fill="url(#logoGrad)"/>
            <circle cx="18" cy="16" r="1" fill="url(#logoGrad)"/>
          </svg>
        </div>
        <h1 class="app-title glow">VaultDay</h1>
      </div>
      <p class="app-subtitle">Vault it today. Gone tomorrow</p>
      <div class="cleanup-info">
        <p class="cleanup-text">
          <span class="cleanup-icon">\u{1F55B}</span>
          T\u1EA5t c\u1EA3 ph\xF2ng chat s\u1EBD t\u1EF1 \u0111\u1ED9ng x\xF3a v\xE0o l\xFAc 00:00
        </p>
      </div>
    </div>
  </div>

  <!-- Countdown Timer Section -->
  <div class="countdown-section">
    <app-countdown-timer></app-countdown-timer>
  </div>

  <!-- Latest Room Section -->
  <div class="latest-room-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="icon">\u{1F525}</span>
        Ph\xF2ng Chat M\u1EDBi Nh\u1EA5t
      </h2>
    </div>
    <div class="latest-room-content">
      <div *ngIf="isLoadingRooms" class="loading-state">
        <div class="loading-spinner"></div>
        <p>\u0110ang t\u1EA3i ph\xF2ng m\u1EDBi nh\u1EA5t...</p>
      </div>
      <div *ngIf="!isLoadingRooms && publicRooms.length === 0" class="no-rooms">
        <p class="error-text">L\u1ED7i khi t\u1EA3i ph\xF2ng m\u1EDBi nh\u1EA5t</p>
        <button class="btn-secondary btn-sm" (click)="loadPublicRooms()">
          <span class="refresh-icon">\u{1F504}</span>
          L\xE0m m\u1EDBi
        </button>
      </div>
      <div *ngIf="!isLoadingRooms && publicRooms.length > 0" class="latest-room-info">
        <div class="room-info">
          <h3 class="room-name">{{ publicRooms[0].name }}</h3>
          <p class="room-meta">T\u1EA1o l\xFAc: {{ publicRooms[0].created_at | date:'dd/MM/yyyy HH:mm' }}</p>
        </div>
        <button class="btn-secondary btn-sm" (click)="loadPublicRooms()">
          <span class="refresh-icon">\u{1F504}</span>
          L\xE0m m\u1EDBi
        </button>
      </div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="action-buttons">
    <button class="btn-primary btn-lg" (click)="showJoinRoom = !showJoinRoom">
      Tham Gia Ph\xF2ng
    </button>
  </div>

  <!-- Join Room Form -->
  <div *ngIf="showJoinRoom" class="form-section">
    <div class="form-container">
      <h3 class="form-title">Tham Gia Ph\xF2ng</h3>
      <form [formGroup]="joinRoomForm" (ngSubmit)="onJoinRoom()" class="join-form">
        <div class="form-group">
          <input
            type="text"
            formControlName="roomId"
            class="form-input"
            placeholder="Nh\u1EADp m\xE3 ph\xF2ng (6 k\xFD t\u1EF1)..."
            [class.error]="roomId?.invalid && roomId?.touched"
          />
          <div *ngIf="roomId?.invalid && roomId?.touched" class="error-message">
            <span *ngIf="roomId?.errors?.['required']">M\xE3 ph\xF2ng l\xE0 b\u1EAFt bu\u1ED9c</span>
            <span *ngIf="roomId?.errors?.['minlength'] || roomId?.errors?.['maxlength']">M\xE3 ph\xF2ng ph\u1EA3i c\xF3 \u0111\xFAng 6 k\xFD t\u1EF1</span>
          </div>
        </div>

        <button
          type="submit"
          class="btn-primary btn-lg w-full"
          [disabled]="joinRoomForm.invalid || isLoading"
        >
          <span *ngIf="!isLoading">Tham Gia</span>
          <span *ngIf="isLoading">\u0110ang x\u1EED l\xFD...</span>
        </button>
      </form>
    </div>
  </div>

  <!-- Generated Room Code Display -->
  <div *ngIf="generatedRoomCode" class="room-code-section">
    <div class="room-code-container">
      <h3 class="room-code-title">M\xE3 Ph\xF2ng C\u1EE7a B\u1EA1n</h3>
      <div class="room-code-display">
        <span class="room-code">{{ generatedRoomCode }}</span>
        <button class="copy-btn" (click)="copyRoomCode()">
          <span class="copy-icon">\u{1F4CB}</span>
        </button>
      </div>
      <p class="room-code-hint">Chia s\u1EBB m\xE3 n\xE0y \u0111\u1EC3 ng\u01B0\u1EDDi kh\xE1c c\xF3 th\u1EC3 tham gia ph\xF2ng</p>
    </div>
  </div>

  <!-- Room Status -->
  <div *ngIf="currentRoom" class="room-status">
    <p class="status-text">\u0110\xE3 tham gia: {{ currentRoom.name }} ({{ currentRoom.id }}) - 1 ng\u01B0\u1EDDi</p>
  </div>

  <!-- Messages -->
  <div *ngIf="errorMessage" class="error-toast">
    <span class="error-icon">\u26A0\uFE0F</span>
    {{ errorMessage }}
  </div>

  <div *ngIf="successMessage" class="success-toast">
    <span class="success-icon">\u2705</span>
    {{ successMessage }}
  </div>

  <!-- Version Footer -->
  <div class="version-footer">
    <p class="version-text">Version 0.0.1</p>
  </div>
</div>
`, styles: ['/* src/app/components/home/home.scss */\n.home-container {\n  width: 100%;\n  min-height: 100vh;\n  padding: var(--space-lg);\n  background: var(--bg-primary);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xl);\n  max-width: 500px;\n  margin: 0 auto;\n}\n.header-section {\n  text-align: center;\n  padding: var(--space-xl) 0;\n}\n.header-section .header-content .logo-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-sm);\n}\n.header-section .header-content .logo-container .logo-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.header-section .header-content .logo-container .logo-icon .logo-svg {\n  animation: logoPulse 2s ease-in-out infinite;\n  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4));\n}\n.header-section .header-content .logo-container .app-title {\n  font-size: var(--font-size-4xl);\n  font-weight: 800;\n  margin: 0;\n  color: var(--neon-primary);\n  text-shadow: var(--neon-glow-lg);\n}\n.header-section .header-content .app-subtitle {\n  font-size: var(--font-size-lg);\n  color: var(--text-secondary);\n  font-style: italic;\n  opacity: 0.8;\n  margin-bottom: var(--space-sm);\n}\n.header-section .header-content .cleanup-info {\n  margin-top: var(--space-sm);\n}\n.header-section .header-content .cleanup-info .cleanup-text {\n  font-size: var(--font-size-sm);\n  color: var(--text-tertiary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-xs);\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.3);\n  border-radius: var(--radius-md);\n  animation: fadeIn 0.5s ease-out;\n}\n.header-section .header-content .cleanup-info .cleanup-text .cleanup-icon {\n  font-size: var(--font-size-base);\n  animation: pulse 2s ease-in-out infinite;\n}\n.countdown-section {\n  margin-bottom: var(--space-lg);\n}\n.latest-room-section {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  overflow: hidden;\n}\n.latest-room-section .section-header {\n  padding: var(--space-lg);\n  border-bottom: 1px solid var(--border-neon);\n  background: var(--bg-secondary);\n}\n.latest-room-section .section-header .section-title {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n}\n.latest-room-section .section-header .section-title .icon {\n  font-size: var(--font-size-lg);\n}\n.latest-room-section .latest-room-content {\n  padding: var(--space-lg);\n}\n.latest-room-section .latest-room-content .loading-state {\n  text-align: center;\n  color: var(--text-secondary);\n}\n.latest-room-section .latest-room-content .loading-state .loading-spinner {\n  border: 3px solid var(--border-muted);\n  border-top: 3px solid var(--neon-primary);\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  animation: spin 1s linear infinite;\n  margin: var(--space-md) auto;\n}\n.latest-room-section .latest-room-content .no-rooms {\n  text-align: center;\n}\n.latest-room-section .latest-room-content .no-rooms .error-text {\n  color: var(--error);\n  font-style: italic;\n  margin-bottom: var(--space-md);\n}\n.latest-room-section .latest-room-content .latest-room-info {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-md);\n}\n.latest-room-section .latest-room-content .latest-room-info .room-info {\n  flex: 1;\n}\n.latest-room-section .latest-room-content .latest-room-info .room-info .room-name {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-xs);\n}\n.latest-room-section .latest-room-content .latest-room-info .room-info .room-meta {\n  font-size: var(--font-size-sm);\n  color: var(--text-tertiary);\n}\n.action-buttons {\n  display: flex;\n  gap: var(--space-md);\n}\n.action-buttons button {\n  flex: 1;\n  padding: var(--space-lg);\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  transition: all 0.3s ease;\n}\n.action-buttons button:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--neon-glow-md);\n}\n.form-section {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  overflow: hidden;\n  animation: fadeIn 0.3s ease-out;\n}\n.form-section .form-container {\n  padding: var(--space-lg);\n}\n.form-section .form-container .form-title {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-lg);\n  text-align: center;\n}\n.form-section .form-container .create-form .form-group,\n.form-section .form-container .join-form .form-group {\n  margin-bottom: var(--space-lg);\n}\n.form-section .form-container .create-form .form-group .form-input,\n.form-section .form-container .join-form .form-group .form-input {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.form-section .form-container .create-form .form-group .form-input:focus,\n.form-section .form-container .join-form .form-group .form-input:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.form-section .form-container .create-form .form-group .form-input::placeholder,\n.form-section .form-container .join-form .form-group .form-input::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.form-section .form-container .create-form .form-group .form-input.error,\n.form-section .form-container .join-form .form-group .form-input.error {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.form-section .form-container .create-form .form-group .form-hint,\n.form-section .form-container .join-form .form-group .form-hint {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin-top: var(--space-xs);\n  font-style: italic;\n}\n.room-status {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  padding: var(--space-md);\n  text-align: center;\n  box-shadow: var(--neon-glow-sm);\n}\n.room-status .status-text {\n  color: var(--text-primary);\n  font-size: var(--font-size-sm);\n  margin: 0;\n}\n.error-toast,\n.success-toast {\n  position: fixed;\n  top: var(--space-lg);\n  right: var(--space-lg);\n  padding: var(--space-md) var(--space-lg);\n  border-radius: var(--radius-md);\n  box-shadow: var(--neon-glow-md);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  z-index: 1000;\n  animation: slideIn 0.3s ease-out;\n  font-weight: 500;\n  border: 2px solid;\n}\n.error-toast .error-icon,\n.error-toast .success-icon,\n.success-toast .error-icon,\n.success-toast .success-icon {\n  font-size: var(--font-size-lg);\n}\n.error-toast {\n  background: var(--bg-card);\n  color: var(--error);\n  border-color: var(--error);\n}\n.success-toast {\n  background: var(--bg-card);\n  color: var(--success);\n  border-color: var(--success);\n}\n.room-code-section {\n  margin: var(--space-lg) 0;\n}\n.room-code-section .room-code-container {\n  background: var(--bg-card);\n  border: 2px solid var(--neon-primary);\n  border-radius: var(--radius-lg);\n  padding: var(--space-xl);\n  text-align: center;\n  box-shadow: var(--neon-glow-md);\n  animation: neonPulse 2s ease-in-out infinite;\n}\n.room-code-section .room-code-container .room-code-title {\n  font-size: var(--font-size-xl);\n  color: var(--neon-primary);\n  margin-bottom: var(--space-lg);\n  text-shadow: var(--neon-glow-sm);\n}\n.room-code-section .room-code-container .room-code-display {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-lg);\n}\n.room-code-section .room-code-container .room-code-display .room-code {\n  font-size: var(--font-size-3xl);\n  font-weight: 800;\n  color: var(--neon-primary);\n  background: var(--bg-secondary);\n  padding: var(--space-md) var(--space-lg);\n  border: 2px solid var(--neon-primary);\n  border-radius: var(--radius-md);\n  letter-spacing: 0.2em;\n  text-shadow: var(--neon-glow-md);\n  box-shadow: var(--neon-glow-sm);\n  font-family: "Courier New", monospace;\n}\n.room-code-section .room-code-container .room-code-display .copy-btn {\n  background: var(--neon-primary);\n  color: var(--bg-primary);\n  border: none;\n  border-radius: var(--radius-md);\n  padding: var(--space-md);\n  cursor: pointer;\n  font-size: var(--font-size-lg);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.room-code-section .room-code-container .room-code-display .copy-btn:hover {\n  background: var(--neon-secondary);\n  box-shadow: var(--neon-glow-md);\n  transform: scale(1.05);\n}\n.room-code-section .room-code-container .room-code-display .copy-btn .copy-icon {\n  display: block;\n}\n.room-code-section .room-code-container .room-code-hint {\n  font-size: var(--font-size-sm);\n  color: var(--text-muted);\n  margin: 0;\n  font-style: italic;\n}\n.version-footer {\n  text-align: center;\n  padding: var(--space-lg) 0;\n  margin-top: var(--space-xl);\n  border-top: 1px solid var(--border-neon);\n}\n.version-footer .version-text {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin: 0;\n  font-style: italic;\n  opacity: 0.7;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes slideIn {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@media (max-width: 768px) {\n  .home-container {\n    padding: var(--space-md);\n    gap: var(--space-lg);\n  }\n  .header-section {\n    padding: var(--space-lg) 0;\n  }\n  .header-section .header-content .app-title {\n    font-size: var(--font-size-3xl);\n  }\n  .header-section .header-content .app-subtitle {\n    font-size: var(--font-size-base);\n  }\n  .action-buttons {\n    flex-direction: column;\n    gap: var(--space-sm);\n  }\n  .action-buttons button {\n    padding: var(--space-md);\n    font-size: var(--font-size-base);\n  }\n  .latest-room-section .section-header,\n  .latest-room-section .form-container,\n  .form-section .section-header,\n  .form-section .form-container {\n    padding: var(--space-md);\n  }\n  .error-toast,\n  .success-toast {\n    width: calc(100% - var(--space-lg) * 2);\n    left: var(--space-lg);\n    right: var(--space-lg);\n    top: var(--space-md);\n  }\n}\n@media (max-width: 480px) {\n  .home-container {\n    padding: var(--space-sm);\n    gap: var(--space-md);\n  }\n  .header-section {\n    padding: var(--space-md) 0;\n  }\n  .header-section .header-content .app-title {\n    font-size: var(--font-size-2xl);\n  }\n  .header-section .header-content .app-subtitle {\n    font-size: var(--font-size-sm);\n  }\n  .latest-room-section .section-header,\n  .latest-room-section .form-container,\n  .form-section .section-header,\n  .form-section .form-container {\n    padding: var(--space-sm);\n  }\n}\n@keyframes logoPulse {\n  0%, 100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4));\n  }\n  50% {\n    transform: scale(1.05);\n    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.1);\n  }\n}\n/*# sourceMappingURL=home.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: Router }, { type: SupabaseService }, { type: SeoService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/components/home/home.ts", lineNumber: 15 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-WXPF5KCR.js.map
