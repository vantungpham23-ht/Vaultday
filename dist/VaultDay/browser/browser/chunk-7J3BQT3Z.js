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
  ActivatedRoute,
  CommonModule,
  Component,
  DatePipe,
  Injectable,
  NgForOf,
  NgIf,
  Router,
  RouterModule,
  __async,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
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
  ɵɵtextInterpolate1
} from "./chunk-YRQE2BQG.js";

// src/app/services/chat.service.ts
var ChatService = class _ChatService {
  supabaseService;
  messageCallbacks = /* @__PURE__ */ new Map();
  pollingIntervals = /* @__PURE__ */ new Map();
  constructor(supabaseService) {
    this.supabaseService = supabaseService;
  }
  queryDatabase(_0) {
    return __async(this, arguments, function* (query, params = []) {
      try {
        const response = yield fetch("/.netlify/functions/db-query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query,
            params
          })
        });
        const result = yield response.json();
        if (!result.ok) {
          throw new Error(result.error || "Database query failed");
        }
        return result.data;
      } catch (error) {
        console.error("Database query error:", error);
        throw error;
      }
    });
  }
  fetchMessages(roomId) {
    return __async(this, null, function* () {
      try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString();
        const query = `
        SELECT * FROM messages 
        WHERE room_id = $1 AND created_at > $2
        ORDER BY created_at ASC
      `;
        const params = [roomId, twentyFourHoursAgo];
        const result = yield this.queryDatabase(query, params);
        return { data: result || [], error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  sendMessage(roomId, content, userId) {
    return __async(this, null, function* () {
      try {
        const query = `
        INSERT INTO messages (room_id, content, user_id, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
      `;
        const params = [roomId, content, userId];
        const result = yield this.queryDatabase(query, params);
        return { data: result[0] || null, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  listenToRoom(roomId, callback) {
    if (!this.messageCallbacks.has(roomId)) {
      this.messageCallbacks.set(roomId, []);
    }
    this.messageCallbacks.get(roomId).push(callback);
    if (!this.pollingIntervals.has(roomId)) {
      this.startPolling(roomId);
    }
  }
  startPolling(roomId) {
    return __async(this, null, function* () {
      let lastMessageTime = (/* @__PURE__ */ new Date()).toISOString();
      const poll = () => __async(this, null, function* () {
        try {
          const query = `
          SELECT * FROM messages 
          WHERE room_id = $1 AND created_at > $2
          ORDER BY created_at ASC
        `;
          const params = [roomId, lastMessageTime];
          const newMessages = yield this.queryDatabase(query, params);
          if (newMessages && newMessages.length > 0) {
            lastMessageTime = newMessages[newMessages.length - 1].created_at;
            const callbacks = this.messageCallbacks.get(roomId) || [];
            newMessages.forEach((message) => {
              callbacks.forEach((callback) => callback(message));
            });
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      });
      const intervalId = window.setInterval(poll, 2e3);
      this.pollingIntervals.set(roomId, intervalId);
    });
  }
  unsubscribeFromRoom(roomId) {
    this.messageCallbacks.delete(roomId);
    const intervalId = this.pollingIntervals.get(roomId);
    if (intervalId) {
      clearInterval(intervalId);
      this.pollingIntervals.delete(roomId);
    }
  }
  unsubscribeFromAllRooms() {
    this.messageCallbacks.clear();
    this.pollingIntervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.pollingIntervals.clear();
  }
  static \u0275fac = function ChatService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChatService)(\u0275\u0275inject(SupabaseService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChatService, factory: _ChatService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChatService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseService }], null);
})();

// src/app/components/chat-room/chat-room.ts
function ChatRoomComponent_div_42_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "M\u1EADt kh\u1EA9u l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function ChatRoomComponent_div_42_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, ChatRoomComponent_div_42_div_13_span_1_Template, 2, 0, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.password == null ? null : ctx_r1.password.errors == null ? null : ctx_r1.password.errors["required"]);
  }
}
function ChatRoomComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 42)(3, "h2", 43)(4, "span", 44);
    \u0275\u0275text(5, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Ph\xF2ng \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 45);
    \u0275\u0275text(8, "Nh\u1EADp m\u1EADt kh\u1EA9u \u0111\u1EC3 v\xE0o ph\xF2ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 46)(10, "form", 47);
    \u0275\u0275listener("ngSubmit", function ChatRoomComponent_div_42_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verifyPassword());
    });
    \u0275\u0275elementStart(11, "div", 48);
    \u0275\u0275element(12, "input", 49);
    \u0275\u0275template(13, ChatRoomComponent_div_42_div_13_Template, 2, 1, "div", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 51);
    \u0275\u0275text(15, " X\xE1c nh\u1EADn ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("formGroup", ctx_r1.passwordForm);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("error", (ctx_r1.password == null ? null : ctx_r1.password.invalid) && (ctx_r1.password == null ? null : ctx_r1.password.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.password == null ? null : ctx_r1.password.invalid) && (ctx_r1.password == null ? null : ctx_r1.password.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.passwordForm.invalid);
  }
}
function ChatRoomComponent_div_43_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "T\xEAn l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function ChatRoomComponent_div_43_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, ChatRoomComponent_div_43_div_13_span_1_Template, 2, 0, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.username == null ? null : ctx_r1.username.errors == null ? null : ctx_r1.username.errors["required"]);
  }
}
function ChatRoomComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 41)(2, "div", 42)(3, "h2", 43)(4, "span", 44);
    \u0275\u0275text(5, "\u{1F44B}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Ch\xE0o m\u1EEBng b\u1EA1n! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 45);
    \u0275\u0275text(8, "Nh\u1EADp t\xEAn \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u tr\xF2 chuy\u1EC7n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 46)(10, "form", 55);
    \u0275\u0275listener("ngSubmit", function ChatRoomComponent_div_43_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setUsername());
    });
    \u0275\u0275elementStart(11, "div", 48);
    \u0275\u0275element(12, "input", 56);
    \u0275\u0275template(13, ChatRoomComponent_div_43_div_13_Template, 2, 1, "div", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 51);
    \u0275\u0275text(15, " B\u1EAFt \u0111\u1EA7u chat ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("formGroup", ctx_r1.usernameForm);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("error", (ctx_r1.username == null ? null : ctx_r1.username.invalid) && (ctx_r1.username == null ? null : ctx_r1.username.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.username == null ? null : ctx_r1.username.invalid) && (ctx_r1.username == null ? null : ctx_r1.username.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.usernameForm.invalid);
  }
}
function ChatRoomComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
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
function ChatRoomComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "div", 60);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i tin nh\u1EAFn...");
    \u0275\u0275elementEnd()();
  }
}
function ChatRoomComponent_div_46_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 65);
    \u0275\u0275text(2, "\u{1F4AC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 tin nh\u1EAFn n\xE0o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "H\xE3y l\xE0 ng\u01B0\u1EDDi \u0111\u1EA7u ti\xEAn g\u1EEDi tin nh\u1EAFn!");
    \u0275\u0275elementEnd()();
  }
}
function ChatRoomComponent_div_46_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69)(2, "div", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 71)(5, "span", 72);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const message_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(message_r4.content);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 2, message_r4.created_at, "HH:mm"));
  }
}
function ChatRoomComponent_div_46_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275template(1, ChatRoomComponent_div_46_div_2_div_1_Template, 8, 5, "div", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.messages)("ngForTrackBy", ctx_r1.trackByMessageId);
  }
}
function ChatRoomComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275template(1, ChatRoomComponent_div_46_div_1_Template, 7, 0, "div", 62)(2, ChatRoomComponent_div_46_div_2_Template, 2, 2, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.messages.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.messages.length > 0);
  }
}
function ChatRoomComponent_div_47_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Tin nh\u1EAFn l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function ChatRoomComponent_div_47_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, ChatRoomComponent_div_47_div_8_span_1_Template, 2, 0, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.content == null ? null : ctx_r1.content.errors == null ? null : ctx_r1.content.errors["required"]);
  }
}
function ChatRoomComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73)(1, "form", 74);
    \u0275\u0275listener("ngSubmit", function ChatRoomComponent_div_47_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275elementStart(2, "div", 75)(3, "div", 76);
    \u0275\u0275element(4, "input", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 78)(6, "span", 79);
    \u0275\u0275text(7, "\u{1F4E4}");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, ChatRoomComponent_div_47_div_8_Template, 2, 1, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.messageForm);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("error", (ctx_r1.content == null ? null : ctx_r1.content.invalid) && (ctx_r1.content == null ? null : ctx_r1.content.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.messageForm.invalid);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", (ctx_r1.content == null ? null : ctx_r1.content.invalid) && (ctx_r1.content == null ? null : ctx_r1.content.touched));
  }
}
var ChatRoomComponent = class _ChatRoomComponent {
  route;
  router;
  fb;
  chatService;
  supabaseService;
  seoService;
  roomId = null;
  room = null;
  messages = [];
  messageForm;
  usernameForm;
  passwordForm;
  currentUsername = "";
  isLoading = false;
  errorMessage = "";
  showPasswordModal = false;
  isPasswordRequired = false;
  constructor(route, router, fb, chatService, supabaseService, seoService) {
    this.route = route;
    this.router = router;
    this.fb = fb;
    this.chatService = chatService;
    this.supabaseService = supabaseService;
    this.seoService = seoService;
    this.messageForm = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(1)]]
    });
    this.usernameForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(1)]]
    });
    this.passwordForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(1)]]
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.roomId = this.route.snapshot.paramMap.get("id");
      if (!this.roomId) {
        this.router.navigate(["/"]);
        return;
      }
      yield this.loadRoomDetails();
      if (this.room) {
        this.seoService.setChatRoomSEO(this.room.name);
      }
      if (this.room?.password) {
        this.isPasswordRequired = true;
        this.showPasswordModal = true;
      } else {
        yield this.loadMessages();
        this.subscribeToMessages();
      }
    });
  }
  ngOnDestroy() {
    if (this.roomId) {
      this.chatService.unsubscribeFromRoom(this.roomId);
    }
  }
  loadRoomDetails() {
    return __async(this, null, function* () {
      if (!this.roomId)
        return;
      const { data, error } = yield this.supabaseService.getRoomById(this.roomId);
      if (error) {
        console.error("Error loading room:", error);
        this.errorMessage = "Ph\xF2ng kh\xF4ng t\u1ED3n t\u1EA1i";
      } else {
        this.room = data;
      }
    });
  }
  loadMessages() {
    return __async(this, null, function* () {
      if (!this.roomId)
        return;
      this.isLoading = true;
      const { data, error } = yield this.chatService.fetchMessages(this.roomId);
      if (error) {
        console.error("Error loading messages:", error);
        this.errorMessage = "Kh\xF4ng th\u1EC3 t\u1EA3i tin nh\u1EAFn";
      } else {
        this.messages = data || [];
      }
      this.isLoading = false;
    });
  }
  subscribeToMessages() {
    if (!this.roomId)
      return;
    this.chatService.listenToRoom(this.roomId, (newMessage) => {
      this.messages.push(newMessage);
    });
  }
  verifyPassword() {
    return __async(this, null, function* () {
      if (this.passwordForm.valid && this.room) {
        const { password } = this.passwordForm.value;
        if (password === this.room.password) {
          this.showPasswordModal = false;
          this.isPasswordRequired = false;
          yield this.loadMessages();
          this.subscribeToMessages();
        } else {
          this.errorMessage = "M\u1EADt kh\u1EA9u kh\xF4ng \u0111\xFAng";
          this.passwordForm.reset();
        }
      }
    });
  }
  setUsername() {
    if (this.usernameForm.valid) {
      this.currentUsername = this.usernameForm.value.username;
    }
  }
  sendMessage() {
    return __async(this, null, function* () {
      if (this.messageForm.valid && this.roomId && this.currentUsername) {
        const { content } = this.messageForm.value;
        const { error } = yield this.chatService.sendMessage(this.roomId, `${this.currentUsername}: ${content}`, "anonymous");
        if (error) {
          console.error("Error sending message:", error);
          this.errorMessage = "Kh\xF4ng th\u1EC3 g\u1EEDi tin nh\u1EAFn";
        } else {
          this.messageForm.reset();
          this.errorMessage = "";
        }
      }
    });
  }
  goBack() {
    this.router.navigate(["/"]);
  }
  get content() {
    return this.messageForm.get("content");
  }
  get username() {
    return this.usernameForm.get("username");
  }
  get password() {
    return this.passwordForm.get("password");
  }
  trackByMessageId(index, message) {
    return message.id;
  }
  static \u0275fac = function ChatRoomComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChatRoomComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ChatService), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(SeoService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChatRoomComponent, selectors: [["app-chat-room"]], decls: 51, vars: 7, consts: [[1, "chat-room-container"], [1, "chat-header"], [1, "header-left"], [1, "back-button", 3, "click"], [1, "back-icon"], [1, "back-text"], [1, "header-center"], [1, "room-logo-container"], [1, "room-logo-icon"], ["viewBox", "0 0 32 32", "width", "24", "height", "24", 1, "room-logo-svg"], ["id", "roomLogoGrad", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "100%"], ["offset", "0%", 2, "stop-color", "#8b5cf6", "stop-opacity", "1"], ["offset", "100%", 2, "stop-color", "#a78bfa", "stop-opacity", "1"], ["fill", "none", "stroke", "url(#roomLogoGrad)", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M8 10c-1 0-2 1-2 2v8c0 1 1 2 2 2h1"], ["d", "M9 12h14c1 0 2 1 2 2v4c0 1-1 2-2 2h-8l-3 3v-3H9c-1 0-2-1-2-2v-4c0-1 1-2 2-2z"], ["d", "M23 10c1 0 2 1 2 2v8c0 1-1 2-2 2h-1"], ["cx", "14", "cy", "16", "r", "1", "fill", "url(#roomLogoGrad)"], ["cx", "18", "cy", "16", "r", "1", "fill", "url(#roomLogoGrad)"], [1, "room-title"], [1, "room-status"], [1, "status-dot", "online"], [1, "status-text"], [1, "cleanup-notice"], [1, "cleanup-icon"], [1, "cleanup-text"], [1, "header-right"], [1, "online-indicator"], [1, "indicator-icon"], [1, "indicator-text"], [1, "countdown-section"], [1, "chat-content"], ["class", "password-modal", 4, "ngIf"], ["class", "username-modal", 4, "ngIf"], ["class", "error-banner", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "messages-container", 4, "ngIf"], ["class", "message-input-container", 4, "ngIf"], [1, "version-footer"], [1, "version-text"], [1, "password-modal"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], [1, "modal-icon"], [1, "modal-description"], [1, "modal-body"], [1, "password-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "password", "formControlName", "password", "placeholder", "Nh\u1EADp m\u1EADt kh\u1EA9u...", 1, "form-input"], ["class", "error-message", 4, "ngIf"], ["type", "submit", 1, "btn-primary", "btn-lg", "w-full", 3, "disabled"], [1, "error-message"], [4, "ngIf"], [1, "username-modal"], [1, "username-form", 3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "username", "placeholder", "Nh\u1EADp t\xEAn c\u1EE7a b\u1EA1n...", 1, "form-input"], [1, "error-banner"], [1, "error-icon"], [1, "loading-container"], [1, "loading-spinner"], [1, "messages-container"], ["class", "empty-messages", 4, "ngIf"], ["class", "messages-list", 4, "ngIf"], [1, "empty-messages"], [1, "empty-icon"], [1, "messages-list"], ["class", "message-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "message-item"], [1, "message-content"], [1, "message-text"], [1, "message-meta"], [1, "message-time"], [1, "message-input-container"], [1, "message-form", 3, "ngSubmit", "formGroup"], [1, "input-group"], [1, "input-wrapper"], ["type", "text", "formControlName", "content", "placeholder", "Nh\u1EADp tin nh\u1EAFn...", 1, "message-input"], ["type", "submit", 1, "send-button", 3, "disabled"], [1, "send-icon"]], template: function ChatRoomComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
      \u0275\u0275listener("click", function ChatRoomComponent_Template_button_click_3_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "Quay l\u1EA1i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "div", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(11, "svg", 9)(12, "defs")(13, "linearGradient", 10);
      \u0275\u0275element(14, "stop", 11)(15, "stop", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "g", 13);
      \u0275\u0275element(17, "path", 14)(18, "path", 15)(19, "path", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "circle", 17)(21, "circle", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "h1", 19);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 20);
      \u0275\u0275element(25, "span", 21);
      \u0275\u0275elementStart(26, "span", 22);
      \u0275\u0275text(27, "\u0110ang ho\u1EA1t \u0111\u1ED9ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 23)(29, "span", 24);
      \u0275\u0275text(30, "\u{1F55B}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span", 25);
      \u0275\u0275text(32, "T\u1EF1 \u0111\u1ED9ng x\xF3a l\xFAc 00:00");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(33, "div", 26)(34, "div", 27)(35, "span", 28);
      \u0275\u0275text(36, "\u{1F465}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 29);
      \u0275\u0275text(38, "Online");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 30);
      \u0275\u0275element(40, "app-countdown-timer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 31);
      \u0275\u0275template(42, ChatRoomComponent_div_42_Template, 16, 5, "div", 32)(43, ChatRoomComponent_div_43_Template, 16, 5, "div", 33)(44, ChatRoomComponent_div_44_Template, 4, 1, "div", 34)(45, ChatRoomComponent_div_45_Template, 4, 0, "div", 35)(46, ChatRoomComponent_div_46_Template, 3, 2, "div", 36)(47, ChatRoomComponent_div_47_Template, 9, 5, "div", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 38)(49, "p", 39);
      \u0275\u0275text(50, "Version 0.0.1");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate((ctx.room == null ? null : ctx.room.name) || "\u0110ang t\u1EA3i...");
      \u0275\u0275advance(19);
      \u0275\u0275property("ngIf", ctx.showPasswordModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.currentUsername && !ctx.isPasswordRequired);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.currentUsername && !ctx.isPasswordRequired);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentUsername && !ctx.isPasswordRequired);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CountdownTimerComponent, DatePipe], styles: ["\n\n.chat-room-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n  height: 100vh;\n  margin: 0 auto;\n  background: var(--bg-primary);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.username-modal[_ngcontent-%COMP%], \n.password-modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: var(--space-lg);\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-lg);\n  width: 100%;\n  max-width: 400px;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n  border-bottom: 1px solid var(--border-neon);\n  text-align: center;\n  background: var(--bg-secondary);\n}\n.modal-header[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n}\n.modal-header[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.modal-header[_ngcontent-%COMP%]   .modal-description[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n}\n.username-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%], \n.password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-lg);\n}\n.username-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.password-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.username-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.password-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.username-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder, \n.password-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.username-form[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%], \n.password-form[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%] {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.error-banner[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 2px solid var(--error);\n  color: var(--error);\n  padding: var(--space-md) var(--space-lg);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  font-weight: 500;\n  border-radius: var(--radius-md);\n  margin: var(--space-md);\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n  box-shadow: 0 0 10px var(--error);\n}\n.error-banner[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.loading-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n}\n.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  border: 3px solid var(--border-muted);\n  border-top: 3px solid var(--neon-primary);\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin-bottom: var(--space-md);\n}\n.chat-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-md) var(--space-lg);\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border-neon);\n}\n.chat-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%], \n.chat-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.chat-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n.chat-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%] {\n  flex: 2;\n  text-align: center;\n}\n.chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .room-logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n  margin-bottom: var(--space-xs);\n}\n.chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .room-logo-container[_ngcontent-%COMP%]   .room-logo-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .room-logo-container[_ngcontent-%COMP%]   .room-logo-icon[_ngcontent-%COMP%]   .room-logo-svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_logoPulse 2s ease-in-out infinite;\n  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));\n}\n.chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .room-logo-container[_ngcontent-%COMP%]   .room-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  margin: 0;\n  color: var(--neon-primary);\n  text-shadow: var(--neon-glow-sm);\n}\n.chat-header[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-sm);\n  font-weight: 500;\n  padding: var(--space-sm) var(--space-md);\n  border-radius: var(--radius-md);\n  transition: all 0.3s ease;\n}\n.chat-header[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]:hover {\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n}\n.chat-header[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]   .back-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.chat-header[_ngcontent-%COMP%]   .room-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-xs);\n  text-shadow: var(--neon-glow-sm);\n}\n.chat-header[_ngcontent-%COMP%]   .room-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-xs);\n  color: var(--success);\n  flex-direction: column;\n}\n.chat-header[_ngcontent-%COMP%]   .room-status[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background-color: var(--success);\n  box-shadow: 0 0 5px var(--success);\n}\n.chat-header[_ngcontent-%COMP%]   .room-status[_ngcontent-%COMP%]   .cleanup-notice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  margin-top: var(--space-xs);\n  padding: var(--space-xs) var(--space-sm);\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.3);\n  border-radius: var(--radius-sm);\n}\n.chat-header[_ngcontent-%COMP%]   .room-status[_ngcontent-%COMP%]   .cleanup-notice[_ngcontent-%COMP%]   .cleanup-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  animation: _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n.chat-header[_ngcontent-%COMP%]   .room-status[_ngcontent-%COMP%]   .cleanup-notice[_ngcontent-%COMP%]   .cleanup-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  font-weight: 500;\n}\n.chat-header[_ngcontent-%COMP%]   .online-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-xs);\n  color: var(--text-secondary);\n}\n.chat-header[_ngcontent-%COMP%]   .online-indicator[_ngcontent-%COMP%]   .indicator-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n}\n.countdown-section[_ngcontent-%COMP%] {\n  padding: var(--space-sm) var(--space-md);\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border-neon);\n}\n.chat-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-tertiary);\n}\n.messages-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: var(--space-md);\n  overflow-y: auto;\n  scroll-behavior: smooth;\n}\n.empty-messages[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: var(--text-secondary);\n}\n.empty-messages[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-4xl);\n  margin-bottom: var(--space-md);\n  opacity: 0.7;\n}\n.empty-messages[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  margin-bottom: var(--space-sm);\n  color: var(--text-primary);\n}\n.empty-messages[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n}\n.messages-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n}\n.message-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.message-item[_ngcontent-%COMP%]   .message-content[_ngcontent-%COMP%] {\n  max-width: 80%;\n  padding: var(--space-sm) var(--space-md);\n  border-radius: var(--radius-lg);\n  background: var(--bg-card);\n  border: 1px solid var(--border-neon);\n  color: var(--text-primary);\n  box-shadow: var(--neon-glow-sm);\n}\n.message-item[_ngcontent-%COMP%]   .message-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  word-wrap: break-word;\n  margin-bottom: var(--space-xs);\n}\n.message-item[_ngcontent-%COMP%]   .message-meta[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  text-align: right;\n}\n.message-input-container[_ngcontent-%COMP%] {\n  padding: var(--space-md);\n  background: var(--bg-secondary);\n  border-top: 1px solid var(--border-neon);\n}\n.message-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n}\n.message-form[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-sm);\n  align-items: center;\n}\n.message-form[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n}\n.message-form[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .message-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-card);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.message-form[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .message-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.message-form[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .message-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.message-form[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .message-input.error[_ngcontent-%COMP%] {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.message-form[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%] {\n  background: var(--neon-primary);\n  color: var(--bg-primary);\n  border: 2px solid var(--neon-primary);\n  padding: var(--space-md);\n  border-radius: var(--radius-md);\n  font-size: var(--font-size-lg);\n  width: 50px;\n  height: 50px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n}\n.message-form[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--neon-secondary);\n  border-color: var(--neon-secondary);\n  transform: translateY(-1px);\n  box-shadow: var(--neon-glow-md);\n}\n.message-form[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]   .send-icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n}\n.version-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--space-md) var(--space-lg);\n  background: var(--bg-secondary);\n  border-top: 1px solid var(--border-neon);\n}\n.version-footer[_ngcontent-%COMP%]   .version-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin: 0;\n  font-style: italic;\n  opacity: 0.7;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .chat-room-container[_ngcontent-%COMP%] {\n    margin: 0;\n    height: 100vh;\n    border-radius: 0;\n    border-left: none;\n    border-right: none;\n    border-top: none;\n    box-shadow: none;\n  }\n  .chat-header[_ngcontent-%COMP%] {\n    padding: var(--space-sm) var(--space-md);\n  }\n  .chat-header[_ngcontent-%COMP%]   .room-title[_ngcontent-%COMP%] {\n    font-size: var(--font-size-base);\n  }\n  .chat-header[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n    padding: var(--space-xs) var(--space-sm);\n    font-size: var(--font-size-xs);\n  }\n  .message-input-container[_ngcontent-%COMP%] {\n    padding: var(--space-sm);\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    margin: var(--space-md);\n  }\n}\n@media (max-width: 480px) {\n  .chat-room-container[_ngcontent-%COMP%] {\n    border-left: none;\n    border-right: none;\n    border-top: none;\n  }\n  .chat-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .chat-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%], \n   .chat-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n    flex: 0;\n  }\n  .message-item[_ngcontent-%COMP%]   .message-content[_ngcontent-%COMP%] {\n    max-width: 90%;\n  }\n}\n@keyframes _ngcontent-%COMP%_logoPulse {\n  0%, 100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));\n  }\n  50% {\n    transform: scale(1.05);\n    filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.5));\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.1);\n  }\n}\n/*# sourceMappingURL=chat-room.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChatRoomComponent, [{
    type: Component,
    args: [{ selector: "app-chat-room", imports: [CommonModule, RouterModule, ReactiveFormsModule, CountdownTimerComponent], template: `<div class="chat-room-container">
  <!-- Header -->
  <div class="chat-header">
    <div class="header-left">
      <button (click)="goBack()" class="back-button">
        <span class="back-icon">\u2190</span>
        <span class="back-text">Quay l\u1EA1i</span>
      </button>
    </div>
    <div class="header-center">
      <div class="room-logo-container">
        <div class="room-logo-icon">
          <svg class="room-logo-svg" viewBox="0 0 32 32" width="24" height="24">
            <defs>
              <linearGradient id="roomLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#roomLogoGrad)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 10c-1 0-2 1-2 2v8c0 1 1 2 2 2h1"/>
              <path d="M9 12h14c1 0 2 1 2 2v4c0 1-1 2-2 2h-8l-3 3v-3H9c-1 0-2-1-2-2v-4c0-1 1-2 2-2z"/>
              <path d="M23 10c1 0 2 1 2 2v8c0 1-1 2-2 2h-1"/>
            </g>
            <circle cx="14" cy="16" r="1" fill="url(#roomLogoGrad)"/>
            <circle cx="18" cy="16" r="1" fill="url(#roomLogoGrad)"/>
          </svg>
        </div>
        <h1 class="room-title">{{ room?.name || '\u0110ang t\u1EA3i...' }}</h1>
      </div>
      <div class="room-status">
        <span class="status-dot online"></span>
        <span class="status-text">\u0110ang ho\u1EA1t \u0111\u1ED9ng</span>
        <div class="cleanup-notice">
          <span class="cleanup-icon">\u{1F55B}</span>
          <span class="cleanup-text">T\u1EF1 \u0111\u1ED9ng x\xF3a l\xFAc 00:00</span>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="online-indicator">
        <span class="indicator-icon">\u{1F465}</span>
        <span class="indicator-text">Online</span>
      </div>
    </div>
  </div>

  <!-- Countdown Timer -->
  <div class="countdown-section">
    <app-countdown-timer></app-countdown-timer>
  </div>

  <!-- Main Content -->
  <div class="chat-content">
    <!-- Password Modal -->
    <div *ngIf="showPasswordModal" class="password-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="modal-icon">\u{1F512}</span>
            Ph\xF2ng \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7
          </h2>
          <p class="modal-description">Nh\u1EADp m\u1EADt kh\u1EA9u \u0111\u1EC3 v\xE0o ph\xF2ng</p>
        </div>
        <div class="modal-body">
          <form [formGroup]="passwordForm" (ngSubmit)="verifyPassword()" class="password-form">
            <div class="form-group">
              <input
                type="password"
                formControlName="password"
                class="form-input"
                placeholder="Nh\u1EADp m\u1EADt kh\u1EA9u..."
                [class.error]="password?.invalid && password?.touched"
              />
              <div *ngIf="password?.invalid && password?.touched" class="error-message">
                <span *ngIf="password?.errors?.['required']">M\u1EADt kh\u1EA9u l\xE0 b\u1EAFt bu\u1ED9c</span>
              </div>
            </div>
            <button
              type="submit"
              class="btn-primary btn-lg w-full"
              [disabled]="passwordForm.invalid"
            >
              X\xE1c nh\u1EADn
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Username Form -->
    <div *ngIf="!currentUsername && !isPasswordRequired" class="username-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="modal-icon">\u{1F44B}</span>
            Ch\xE0o m\u1EEBng b\u1EA1n!
          </h2>
          <p class="modal-description">Nh\u1EADp t\xEAn \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u tr\xF2 chuy\u1EC7n</p>
        </div>
        <div class="modal-body">
          <form [formGroup]="usernameForm" (ngSubmit)="setUsername()" class="username-form">
            <div class="form-group">
              <input
                type="text"
                formControlName="username"
                class="form-input"
                placeholder="Nh\u1EADp t\xEAn c\u1EE7a b\u1EA1n..."
                [class.error]="username?.invalid && username?.touched"
              />
              <div *ngIf="username?.invalid && username?.touched" class="error-message">
                <span *ngIf="username?.errors?.['required']">T\xEAn l\xE0 b\u1EAFt bu\u1ED9c</span>
              </div>
            </div>
            <button
              type="submit"
              class="btn-primary btn-lg w-full"
              [disabled]="usernameForm.invalid"
            >
              B\u1EAFt \u0111\u1EA7u chat
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div *ngIf="errorMessage" class="error-banner">
      <span class="error-icon">\u26A0\uFE0F</span>
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div *ngIf="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>\u0110ang t\u1EA3i tin nh\u1EAFn...</p>
    </div>

    <!-- Messages Container -->
    <div class="messages-container" *ngIf="!isLoading && currentUsername && !isPasswordRequired">
      <!-- Empty State -->
      <div *ngIf="messages.length === 0" class="empty-messages">
        <div class="empty-icon">\u{1F4AC}</div>
        <h3>Ch\u01B0a c\xF3 tin nh\u1EAFn n\xE0o</h3>
        <p>H\xE3y l\xE0 ng\u01B0\u1EDDi \u0111\u1EA7u ti\xEAn g\u1EEDi tin nh\u1EAFn!</p>
      </div>

      <!-- Messages List -->
      <div class="messages-list" *ngIf="messages.length > 0">
        <div *ngFor="let message of messages; trackBy: trackByMessageId" class="message-item">
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-meta">
              <span class="message-time">{{ message.created_at | date:'HH:mm' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input-container" *ngIf="currentUsername && !isPasswordRequired">
      <form [formGroup]="messageForm" (ngSubmit)="sendMessage()" class="message-form">
        <div class="input-group">
          <div class="input-wrapper">
            <input
              type="text"
              formControlName="content"
              class="message-input"
              placeholder="Nh\u1EADp tin nh\u1EAFn..."
              [class.error]="content?.invalid && content?.touched"
            />
          </div>
          <button
            type="submit"
            class="send-button"
            [disabled]="messageForm.invalid"
          >
            <span class="send-icon">\u{1F4E4}</span>
          </button>
        </div>
        <div *ngIf="content?.invalid && content?.touched" class="error-message">
          <span *ngIf="content?.errors?.['required']">Tin nh\u1EAFn l\xE0 b\u1EAFt bu\u1ED9c</span>
        </div>
      </form>
    </div>
  </div>

  <!-- Version Footer -->
  <div class="version-footer">
    <p class="version-text">Version 0.0.1</p>
  </div>
</div>
`, styles: ["/* src/app/components/chat-room/chat-room.scss */\n.chat-room-container {\n  width: 100%;\n  max-width: 500px;\n  height: 100vh;\n  margin: 0 auto;\n  background: var(--bg-primary);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-sm);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.username-modal,\n.password-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: var(--space-lg);\n}\n.modal-content {\n  background: var(--bg-card);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--neon-glow-lg);\n  width: 100%;\n  max-width: 400px;\n  animation: fadeIn 0.3s ease-out;\n}\n.modal-header {\n  padding: var(--space-lg);\n  border-bottom: 1px solid var(--border-neon);\n  text-align: center;\n  background: var(--bg-secondary);\n}\n.modal-header .modal-title {\n  font-size: var(--font-size-xl);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n}\n.modal-header .modal-title .modal-icon {\n  font-size: var(--font-size-lg);\n}\n.modal-header .modal-description {\n  font-size: var(--font-size-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal-body {\n  padding: var(--space-lg);\n}\n.username-form .form-group,\n.password-form .form-group {\n  margin-bottom: var(--space-lg);\n}\n.username-form .form-input,\n.password-form .form-input {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.username-form .form-input:focus,\n.password-form .form-input:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.username-form .form-input::placeholder,\n.password-form .form-input::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.username-form .form-input.error,\n.password-form .form-input.error {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.error-banner {\n  background: var(--bg-card);\n  border: 2px solid var(--error);\n  color: var(--error);\n  padding: var(--space-md) var(--space-lg);\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  font-weight: 500;\n  border-radius: var(--radius-md);\n  margin: var(--space-md);\n  animation: fadeIn 0.3s ease-out;\n  box-shadow: 0 0 10px var(--error);\n}\n.error-banner .error-icon {\n  font-size: var(--font-size-lg);\n}\n.loading-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n}\n.loading-container .loading-spinner {\n  border: 3px solid var(--border-muted);\n  border-top: 3px solid var(--neon-primary);\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  animation: spin 1s linear infinite;\n  margin-bottom: var(--space-md);\n}\n.chat-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-md) var(--space-lg);\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border-neon);\n}\n.chat-header .header-left,\n.chat-header .header-right {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.chat-header .header-left {\n  justify-content: flex-start;\n}\n.chat-header .header-right {\n  justify-content: flex-end;\n}\n.chat-header .header-center {\n  flex: 2;\n  text-align: center;\n}\n.chat-header .header-center .room-logo-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n  margin-bottom: var(--space-xs);\n}\n.chat-header .header-center .room-logo-container .room-logo-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.chat-header .header-center .room-logo-container .room-logo-icon .room-logo-svg {\n  animation: logoPulse 2s ease-in-out infinite;\n  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));\n}\n.chat-header .header-center .room-logo-container .room-title {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  margin: 0;\n  color: var(--neon-primary);\n  text-shadow: var(--neon-glow-sm);\n}\n.chat-header .back-button {\n  background: none;\n  border: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-sm);\n  font-weight: 500;\n  padding: var(--space-sm) var(--space-md);\n  border-radius: var(--radius-md);\n  transition: all 0.3s ease;\n}\n.chat-header .back-button:hover {\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n}\n.chat-header .back-button .back-icon {\n  font-size: var(--font-size-lg);\n}\n.chat-header .room-title {\n  font-size: var(--font-size-lg);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: var(--space-xs);\n  text-shadow: var(--neon-glow-sm);\n}\n.chat-header .room-status {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-xs);\n  color: var(--success);\n  flex-direction: column;\n}\n.chat-header .room-status .status-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background-color: var(--success);\n  box-shadow: 0 0 5px var(--success);\n}\n.chat-header .room-status .cleanup-notice {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  margin-top: var(--space-xs);\n  padding: var(--space-xs) var(--space-sm);\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.3);\n  border-radius: var(--radius-sm);\n}\n.chat-header .room-status .cleanup-notice .cleanup-icon {\n  font-size: var(--font-size-xs);\n  animation: pulse 2s ease-in-out infinite;\n}\n.chat-header .room-status .cleanup-notice .cleanup-text {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  font-weight: 500;\n}\n.chat-header .online-indicator {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  font-size: var(--font-size-xs);\n  color: var(--text-secondary);\n}\n.chat-header .online-indicator .indicator-icon {\n  font-size: var(--font-size-sm);\n}\n.countdown-section {\n  padding: var(--space-sm) var(--space-md);\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border-neon);\n}\n.chat-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-tertiary);\n}\n.messages-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: var(--space-md);\n  overflow-y: auto;\n  scroll-behavior: smooth;\n}\n.empty-messages {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: var(--text-secondary);\n}\n.empty-messages .empty-icon {\n  font-size: var(--font-size-4xl);\n  margin-bottom: var(--space-md);\n  opacity: 0.7;\n}\n.empty-messages h3 {\n  font-size: var(--font-size-lg);\n  margin-bottom: var(--space-sm);\n  color: var(--text-primary);\n}\n.empty-messages p {\n  font-size: var(--font-size-sm);\n}\n.messages-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n}\n.message-item {\n  display: flex;\n  justify-content: flex-start;\n  animation: fadeIn 0.3s ease-out;\n}\n.message-item .message-content {\n  max-width: 80%;\n  padding: var(--space-sm) var(--space-md);\n  border-radius: var(--radius-lg);\n  background: var(--bg-card);\n  border: 1px solid var(--border-neon);\n  color: var(--text-primary);\n  box-shadow: var(--neon-glow-sm);\n}\n.message-item .message-text {\n  font-size: var(--font-size-sm);\n  word-wrap: break-word;\n  margin-bottom: var(--space-xs);\n}\n.message-item .message-meta {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  text-align: right;\n}\n.message-input-container {\n  padding: var(--space-md);\n  background: var(--bg-secondary);\n  border-top: 1px solid var(--border-neon);\n}\n.message-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n}\n.message-form .input-group {\n  display: flex;\n  gap: var(--space-sm);\n  align-items: center;\n}\n.message-form .input-wrapper {\n  flex: 1;\n  position: relative;\n}\n.message-form .input-wrapper .message-input {\n  width: 100%;\n  padding: var(--space-md);\n  border: 2px solid var(--border-neon);\n  border-radius: var(--radius-md);\n  background: var(--bg-card);\n  color: var(--text-primary);\n  font-family: var(--font-family);\n  transition: all 0.3s ease;\n  box-shadow: var(--neon-glow-sm);\n}\n.message-form .input-wrapper .message-input:focus {\n  outline: none;\n  border-color: var(--neon-accent);\n  box-shadow: var(--neon-glow-md);\n  background: var(--bg-tertiary);\n}\n.message-form .input-wrapper .message-input::placeholder {\n  color: var(--text-muted);\n  font-style: italic;\n}\n.message-form .input-wrapper .message-input.error {\n  border-color: var(--error);\n  box-shadow: 0 0 10px var(--error);\n}\n.message-form .send-button {\n  background: var(--neon-primary);\n  color: var(--bg-primary);\n  border: 2px solid var(--neon-primary);\n  padding: var(--space-md);\n  border-radius: var(--radius-md);\n  font-size: var(--font-size-lg);\n  width: 50px;\n  height: 50px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n}\n.message-form .send-button:hover:not(:disabled) {\n  background: var(--neon-secondary);\n  border-color: var(--neon-secondary);\n  transform: translateY(-1px);\n  box-shadow: var(--neon-glow-md);\n}\n.message-form .send-button .send-icon {\n  font-size: var(--font-size-lg);\n}\n.version-footer {\n  text-align: center;\n  padding: var(--space-md) var(--space-lg);\n  background: var(--bg-secondary);\n  border-top: 1px solid var(--border-neon);\n}\n.version-footer .version-text {\n  font-size: var(--font-size-xs);\n  color: var(--text-tertiary);\n  margin: 0;\n  font-style: italic;\n  opacity: 0.7;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .chat-room-container {\n    margin: 0;\n    height: 100vh;\n    border-radius: 0;\n    border-left: none;\n    border-right: none;\n    border-top: none;\n    box-shadow: none;\n  }\n  .chat-header {\n    padding: var(--space-sm) var(--space-md);\n  }\n  .chat-header .room-title {\n    font-size: var(--font-size-base);\n  }\n  .chat-header .back-button {\n    padding: var(--space-xs) var(--space-sm);\n    font-size: var(--font-size-xs);\n  }\n  .message-input-container {\n    padding: var(--space-sm);\n  }\n  .modal-content {\n    margin: var(--space-md);\n  }\n}\n@media (max-width: 480px) {\n  .chat-room-container {\n    border-left: none;\n    border-right: none;\n    border-top: none;\n  }\n  .chat-header .header-center {\n    flex: 1;\n  }\n  .chat-header .header-left,\n  .chat-header .header-right {\n    flex: 0;\n  }\n  .message-item .message-content {\n    max-width: 90%;\n  }\n}\n@keyframes logoPulse {\n  0%, 100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));\n  }\n  50% {\n    transform: scale(1.05);\n    filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.5));\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.1);\n  }\n}\n/*# sourceMappingURL=chat-room.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: FormBuilder }, { type: ChatService }, { type: SupabaseService }, { type: SeoService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChatRoomComponent, { className: "ChatRoomComponent", filePath: "src/app/components/chat-room/chat-room.ts", lineNumber: 16 });
})();
export {
  ChatRoomComponent
};
//# sourceMappingURL=chunk-7J3BQT3Z.js.map
