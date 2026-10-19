"use strict";
(() => {
  // src/main/resources/static/js/app-src/tools/css-naming-checker.ts
  var BARE_STATES = /* @__PURE__ */ new Set([
    "active",
    "show",
    "hide",
    "hidden",
    "open",
    "close",
    "closed",
    "selected",
    "disabled",
    "enabled",
    "loading",
    "expanded",
    "collapsed",
    "error",
    "success",
    "warning",
    "current",
    "checked",
    "focus",
    "hover",
    "visible",
    "invisible",
    "empty",
    "full",
    "more",
    "result",
    "scroll"
  ]);
  var MEANINGLESS = /* @__PURE__ */ new Set([
    "box",
    "box1",
    "box2",
    "box3",
    "aaa",
    "bbb",
    "ccc",
    "tmp",
    "temp",
    "test",
    "testing",
    "foo",
    "bar",
    "baz",
    "demo",
    "sample",
    "xxx",
    "abc",
    "div",
    "span",
    "wrap",
    "wrapper1",
    "container1",
    "item1",
    "item2",
    "asdf",
    "qwer",
    "hello",
    "world",
    "thing",
    "stuff",
    "data",
    "custom",
    "my",
    "new",
    "old",
    "misc",
    "other",
    "default",
    "common",
    "global"
  ]);
  var VISUAL_COLORS = /* @__PURE__ */ new Set([
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "grey",
    "black",
    "white",
    "cyan",
    "magenta",
    "gold",
    "silver"
  ]);
  var VISUAL_SIZES = /* @__PURE__ */ new Set([
    "big",
    "small",
    "large",
    "tiny",
    "huge",
    "giant",
    "mini"
  ]);
  var BAD_ABBREVS = /* @__PURE__ */ new Set([
    "prd",
    "vfy",
    "mdl",
    "btnx",
    "cntnr",
    "wrpr",
    "hdr",
    "ftr",
    "navi",
    "msgbox",
    "dlg",
    "pnl",
    "lst",
    "itm",
    "cnt",
    "cfg",
    "mgr",
    "svc"
  ]);
  var GOOD_ABBREVS = /* @__PURE__ */ new Set([
    "btn",
    "img",
    "desc",
    "nav",
    "col",
    "row",
    "bg",
    "id",
    "url",
    "api",
    "ui",
    "ux",
    "qty",
    "sku",
    "faq",
    "seo",
    "toc"
  ]);
  var PINYIN_TOKENS = /* @__PURE__ */ new Set([
    "tijiao",
    "queren",
    "quxiao",
    "guanbi",
    "dakai",
    "sousuo",
    "denglu",
    "zhuce",
    "yonghu",
    "mima",
    "shouye",
    "dingdan",
    "gouwu",
    "cheliang",
    "shangpin",
    "jiage",
    "zhuangtai",
    "chenggong",
    "shibai",
    "cuowu",
    "tishi",
    "bangzhu",
    "shezhi",
    "geren",
    "xinxi",
    "liebiao",
    "xiangqing",
    "bianji",
    "shanchu",
    "tianjia",
    "baocun",
    "fanhui",
    "xiayi",
    "shangyi",
    "anniu",
    "biaoti",
    "neirong",
    "daohang",
    "caidan",
    "tanchuang",
    "biaodan",
    "shuru",
    "xuanze",
    "jiazaizhong",
    "jiazai",
    "wancheng",
    "kaishi",
    "jieshu",
    "qingkong",
    "dengdai",
    "yanzheng",
    "tupian",
    "wenjian"
  ]);
  var STATE_IS = /* @__PURE__ */ new Set([
    "active",
    "show",
    "open",
    "disabled",
    "loading",
    "selected",
    "expanded",
    "hidden",
    "collapsed",
    "checked",
    "focus",
    "hover",
    "visible",
    "empty",
    "current",
    "closed",
    "enabled"
  ]);
  var STATE_HAS = /* @__PURE__ */ new Set([
    "error",
    "value",
    "file",
    "more",
    "scroll",
    "result",
    "success",
    "warning"
  ]);
  var MODULE_TYPE_SUFFIXES = /* @__PURE__ */ new Set([
    // 布局
    "wrapper",
    "container",
    "section",
    "panel",
    "grid",
    "group",
    // 容器
    "list",
    "item",
    "box",
    "card",
    "modal",
    "dialog",
    "dropdown",
    "menu",
    "tab",
    "table",
    "form",
    // 交互组件常见落点
    "btn",
    "nav"
  ]);
  var COMPOUND_MODULE_SUFFIXES = /* @__PURE__ */ new Set([
    "filter-panel",
    "table-wrapper",
    "table-container",
    "slide-wrapper",
    "content-wrapper",
    "image-list",
    "thumb-list",
    "menu-list",
    "menu-item",
    "detail-grid",
    "control-box",
    "form-row",
    "scroll-wrapper"
  ]);
  var STRUCTURE_ROLES = /* @__PURE__ */ new Set([
    "header",
    "body",
    "footer",
    "title",
    "subtitle",
    "desc",
    "text",
    "label",
    "value",
    "link",
    "img",
    "icon",
    "tag",
    "badge",
    "price",
    "status",
    "mask",
    "panel",
    "row",
    "col",
    "item",
    "list",
    "content",
    "inner",
    "main",
    "side",
    "error",
    "control",
    "mark",
    "trigger",
    "toggle",
    "close",
    "open",
    "prev",
    "next",
    "group",
    "grid",
    "wrapper",
    "container",
    "section"
  ]);
  var STRUCTURE_SCOPES = /* @__PURE__ */ new Set([
    "card",
    "modal",
    "form",
    "menu",
    "tab",
    "table",
    "list",
    "item",
    "nav",
    "section",
    "panel",
    "dialog",
    "dropdown",
    "detail",
    "slide",
    "megamenu",
    "upload",
    "info",
    "sidebar",
    "main",
    "side",
    "page",
    "verify",
    "product",
    "category",
    "stock",
    "required",
    "primary",
    "secondary",
    "ghost",
    "text",
    "link",
    "icon",
    "submit",
    "reset",
    "search",
    "close",
    "open"
  ]);
  var JS_ROLE_TOKENS = /* @__PURE__ */ new Set([
    "btn",
    "modal",
    "card",
    "menu",
    "item",
    "input",
    "slider",
    "wrapper",
    "nav",
    "toggle",
    "trigger",
    "close",
    "open",
    "submit",
    "search",
    "upload",
    "download",
    "scroll",
    "list",
    "panel",
    "tab",
    "form",
    "checkbox",
    "radio",
    "select",
    "link",
    "dialog",
    "dropdown",
    "table",
    "box",
    "container",
    "reset",
    "prev",
    "next",
    "add",
    "cart",
    "type",
    "thumb",
    "name",
    "products",
    "product",
    "verify",
    "image"
  ]);
  var PAGE_SINGLE_ALLOW = /* @__PURE__ */ new Set([
    "home",
    "cart",
    "login",
    "checkout",
    "search",
    "index",
    "account",
    "register",
    "profile",
    "orders",
    "order",
    "faq",
    "about",
    "contact"
  ]);
  var ATOMIC_EXACT = /* @__PURE__ */ new Set([
    "d-flex",
    "d-none",
    "d-block",
    "d-inline",
    "d-inline-block",
    "d-inline-flex",
    "d-grid",
    "d-table",
    "d-table-row",
    "d-table-cell",
    "fwb",
    "fwn",
    "fwi",
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "clearfix",
    "ellipsis",
    "text-ellipsis",
    "pointer",
    "cursor-pointer",
    "w-full",
    "h-full",
    "min-w-0",
    "flex-grow-1",
    "flex-shrink-0",
    "flex-1",
    "flex-wrap",
    "flex-nowrap",
    "flex-column",
    "flex-row",
    "align-items-center",
    "align-items-start",
    "align-items-end",
    "justify-content-center",
    "justify-content-between",
    "justify-content-around",
    "justify-content-start",
    "justify-content-end",
    "text-center",
    "text-left",
    "text-right",
    "text-start",
    "text-end",
    "font-bold",
    "font-normal",
    "font-italic",
    "font-medium",
    "bg-white",
    "bg-transparent",
    "overflow-hidden",
    "overflow-auto",
    "rounded",
    "border",
    "border-0",
    "shadow",
    "shadow-none",
    // 布局原子/栅格（非业务模块名）
    "container",
    "row",
    "col"
  ]);
  var ATOMIC_PATTERNS = [
    /^(m[trblxy]?|p[trblxy]?)\d{1,3}$/,
    /^f\d{1,2}$/,
    /^lh\d{1,3}$/,
    /^fw(b|n|i|\d{3})$/,
    /^ft\d{1,2}$/,
    /^(m[trblxy]?|p[trblxy]?|gap|top|bottom|start|end|left|right)-\d+(\.\d+)?$/,
    /^(w|h|min-w|min-h|max-w|max-h)-\d+$/,
    /^text-(xs|sm|base|lg|xl|[2-9]xl|\d+xl)$/,
    /^text-(gray|white|black|primary|secondary|danger|success|warning)(-\d+)?$/,
    /^text-[0-9A-Fa-f]{3,8}(-\d+)?$/,
    /^bg-[0-9A-Fa-f]{3,8}(-\d+)?$/,
    /^bg-(gray|white|black|primary|secondary)(-\d+)?$/,
    /^leading(-\w+)?(-\d+)?$/,
    /^rounded(-\d+)?$/,
    /^opacity-\d+$/,
    /^z-\d+$/,
    /^col(-\w+)?(-\d+)?$/,
    /^g-[xy]?-\d+$/,
    /^order-\d+$/,
    /^d-(sm|md|lg|xl|xxl)-(none|flex|block|inline|inline-block|inline-flex|grid)$/,
    /^(m|p|mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py)-(sm|md|lg|xl|xxl)-\d+$/,
    /^flex-(sm|md|lg|xl)-(row|column|grow-0|grow-1|shrink-0|shrink-1|wrap|nowrap)$/,
    /^align-items-(sm|md|lg|xl)-(center|start|end|baseline|stretch)$/,
    /^justify-content-(sm|md|lg|xl)-(center|start|end|between|around|evenly)$/,
    /^text-(sm|md|lg|xl)-(start|end|center|left|right)$/
  ];
  var PLUGIN_PATTERNS = [
    /^slick(-|$)/,
    /^ps(__|-|$)/,
    /^iconfont$/,
    /^icon-/
  ];
  function isAtomic(name) {
    if (ATOMIC_EXACT.has(name)) return true;
    return ATOMIC_PATTERNS.some((re) => re.test(name));
  }
  function isPlugin(name) {
    return PLUGIN_PATTERNS.some((re) => re.test(name));
  }
  function splitTokens(name) {
    return name.split("-").filter(Boolean);
  }
  function hasBemConnector(name) {
    return name.includes("__") || /--/.test(name);
  }
  function looksLikePinyin(name) {
    return splitTokens(name).some((t) => PINYIN_TOKENS.has(t.toLowerCase()));
  }
  function isVisualNaming(name) {
    const tokens = splitTokens(name);
    if (tokens.some((t) => VISUAL_COLORS.has(t))) return true;
    if (tokens.some((t) => VISUAL_SIZES.has(t))) return true;
    return /^(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white)-(title|text|btn|button|box|label|link)$/.test(name) || /^(big|small|large|tiny|huge)-(box|text|title|btn|button|font)$/.test(name);
  }
  function hasBadAbbrev(name) {
    return splitTokens(name).some((t) => BAD_ABBREVS.has(t));
  }
  function isMeaningless(name) {
    if (MEANINGLESS.has(name)) return true;
    if (/^(box|item|div|span|wrap|wrapper|container|temp|test|tmp)\d+$/i.test(name)) return true;
    if (/^[a-z]{1,2}\d{1,3}$/i.test(name)) return true;
    if (/^(temp|test|tmp|demo|foo|bar|hello|world|asdf)(-|$)/i.test(name)) return true;
    return false;
  }
  function isValidBusinessToken(token) {
    if (!/^[a-z][a-z0-9]*$/.test(token)) return false;
    if (token.length < 2) return false;
    if (MEANINGLESS.has(token)) return false;
    if (PINYIN_TOKENS.has(token)) return false;
    if (BAD_ABBREVS.has(token)) return false;
    if (VISUAL_COLORS.has(token) || VISUAL_SIZES.has(token)) return false;
    if (BARE_STATES.has(token)) return false;
    if (token.length <= 2 && !GOOD_ABBREVS.has(token)) return false;
    if (/^\d+$/.test(token)) return false;
    return true;
  }
  function endsWithModuleType(tokens) {
    if (tokens.length < 2) return false;
    const last = tokens[tokens.length - 1];
    const last2 = tokens.slice(-2).join("-");
    return MODULE_TYPE_SUFFIXES.has(last) || COMPOUND_MODULE_SUFFIXES.has(last2);
  }
  function isStructureClass(name, tokens) {
    if (tokens.length < 2 || tokens.length > 3) return false;
    if (tokens.length === 2) {
      const [a, b] = tokens;
      if (b === "btn" && STRUCTURE_SCOPES.has(a)) return true;
      if (b === "mark" && a === "required") return true;
      if (STRUCTURE_SCOPES.has(a) && STRUCTURE_ROLES.has(b)) return true;
      if (STRUCTURE_ROLES.has(a) && STRUCTURE_ROLES.has(b) && a !== b) {
        if (MODULE_TYPE_SUFFIXES.has(a) || STRUCTURE_SCOPES.has(a)) return true;
      }
    }
    if (tokens.length === 3) {
      const [a, b, c] = tokens;
      if (STRUCTURE_SCOPES.has(a) && STRUCTURE_ROLES.has(b) && STRUCTURE_ROLES.has(c)) return true;
      if (STRUCTURE_SCOPES.has(a) && b === "control" && c === "box") return true;
    }
    return false;
  }
  function isModuleClass(name, tokens) {
    if (!endsWithModuleType(tokens)) return false;
    let typeLen = 1;
    const last2 = tokens.slice(-2).join("-");
    if (COMPOUND_MODULE_SUFFIXES.has(last2)) typeLen = 2;
    const business = tokens.slice(0, tokens.length - typeLen);
    if (!business.length) return false;
    if (!business.every(isValidBusinessToken)) return false;
    if (business.every((t) => STRUCTURE_ROLES.has(t) && !STRUCTURE_SCOPES.has(t))) {
      return false;
    }
    return true;
  }
  function matchRole(name) {
    const tokens = splitTokens(name);
    if (name.startsWith("page-")) {
      const rest = tokens.slice(1);
      if (!rest.length) {
        return null;
      }
      if (rest.length === 1) {
        if (!PAGE_SINGLE_ALLOW.has(rest[0])) {
          return null;
        }
        return {
          kind: "page",
          message: "\u9875\u9762\u7C7B\uFF1A\u7528\u4E8E\u9650\u5236\u9875\u9762\u4E13\u5C5E\u6837\u5F0F\u4F5C\u7528\u57DF"
        };
      }
      if (!rest.every(isValidBusinessToken)) return null;
      return {
        kind: "page",
        message: "\u9875\u9762\u7C7B\uFF1A\u7528\u4E8E\u9650\u5236\u9875\u9762\u4E13\u5C5E\u6837\u5F0F\u4F5C\u7528\u57DF"
      };
    }
    if (name.startsWith("js-")) {
      const rest = tokens.slice(1);
      if (!rest.length) return null;
      if (!rest.every(isValidBusinessToken)) return null;
      if (!rest.some((t) => JS_ROLE_TOKENS.has(t))) {
        return null;
      }
      if (rest.length < 2) return null;
      return {
        kind: "js-hook",
        message: "JS \u94A9\u5B50\u7C7B\uFF1A\u4EC5\u4F9B\u67E5\u8BE2\u4E0E\u4E8B\u4EF6\u7ED1\u5B9A\uFF0C\u7981\u6B62\u5199 CSS"
      };
    }
    if (name.startsWith("is-")) {
      const rest = tokens.slice(1);
      if (rest.length !== 1 || !STATE_IS.has(rest[0])) return null;
      return {
        kind: "state",
        message: "\u72B6\u6001\u7C7B is-*\uFF1A\u8868\u793A\u5143\u7D20\u5F53\u524D\u5904\u4E8E\u67D0\u79CD\u72B6\u6001"
      };
    }
    if (name.startsWith("has-")) {
      const rest = tokens.slice(1);
      if (rest.length !== 1 || !STATE_HAS.has(rest[0])) return null;
      return {
        kind: "state",
        message: "\u72B6\u6001\u7C7B has-*\uFF1A\u8868\u793A\u5143\u7D20\u5305\u542B\u67D0\u79CD\u5185\u5BB9\u6216\u7ED3\u679C"
      };
    }
    if (isStructureClass(name, tokens)) {
      return {
        kind: "structure",
        message: "\u7ED3\u6784\u7C7B\uFF1A\u987B\u653E\u5728\u6A21\u5757\u4F5C\u7528\u57DF\u4E0B\u7EF4\u62A4\uFF0C\u907F\u514D\u5168\u5C40\u6C61\u67D3"
      };
    }
    if (isModuleClass(name, tokens)) {
      return {
        kind: "module",
        message: "\u6A21\u5757\u7C7B\uFF1A\u7B26\u5408\u300C\u4E1A\u52A1\u540D + \u6A21\u5757\u7C7B\u578B\u300D"
      };
    }
    return null;
  }
  function worstSeverity(issues) {
    if (issues.some((i) => i.severity === "fail")) return "fail";
    if (issues.some((i) => i.severity === "warn")) return "warn";
    if (issues.some((i) => i.severity === "info")) return "info";
    return "pass";
  }
  function toKebab(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").replace(/-+/g, "-").toLowerCase();
  }
  var PINYIN_FIX = {
    tijiao: "submit",
    queren: "confirm",
    quxiao: "cancel",
    guanbi: "close",
    dakai: "open",
    sousuo: "search",
    denglu: "login",
    zhuce: "register",
    yonghu: "user",
    mima: "password",
    shouye: "home",
    dingdan: "order",
    shangpin: "product",
    jiage: "price",
    zhuangtai: "status",
    chenggong: "success",
    shibai: "fail",
    cuowu: "error",
    tishi: "tip",
    bangzhu: "help",
    shezhi: "setting",
    xinxi: "info",
    liebiao: "list",
    xiangqing: "detail",
    bianji: "edit",
    shanchu: "delete",
    tianjia: "add",
    baocun: "save",
    fanhui: "back",
    anniu: "btn",
    biaoti: "title",
    neirong: "content",
    daohang: "nav",
    caidan: "menu",
    tanchuang: "modal",
    biaodan: "form",
    shuru: "input",
    xuanze: "select",
    jiazai: "loading",
    yanzheng: "verify",
    tupian: "image",
    wenjian: "file"
  };
  var ABBREV_FIX = {
    prd: "product",
    vfy: "verify",
    mdl: "modal",
    dlg: "dialog",
    pnl: "panel",
    lst: "list",
    itm: "item",
    hdr: "header",
    ftr: "footer",
    cntnr: "container",
    wrpr: "wrapper",
    msgbox: "message-box",
    cfg: "config",
    mgr: "manager"
  };
  var LEXICON = [
    ["product", ["pro", "prd", "prod", "goods", "shangpin", "sku"]],
    ["order", ["ord", "dingdan"]],
    ["cart", ["gouwuche", "shoppingcart"]],
    ["user", ["usr", "yonghu", "member", "account"]],
    ["password", ["pwd", "mima"]],
    ["login", ["signin", "denglu"]],
    ["register", ["signup", "zhuce"]],
    ["search", ["srch", "sousuo", "query"]],
    ["filter", ["flt", "shaixuan"]],
    ["category", ["cate", "cat", "fenlei"]],
    ["price", ["jiage"]],
    ["stock", ["kucun", "inventory"]],
    ["detail", ["xiangqing", "info"]],
    ["list", ["liebiao", "lst"]],
    ["verify", ["vfy", "yanzheng", "captcha"]],
    ["submit", ["tijiao"]],
    ["confirm", ["queren"]],
    ["cancel", ["quxiao"]],
    ["close", ["guanbi"]],
    ["open", ["dakai"]],
    ["save", ["baocun"]],
    ["edit", ["bianji"]],
    ["delete", ["del", "shanchu", "remove"]],
    ["add", ["tianjia", "create", "new"]],
    ["upload", ["shangchuan"]],
    ["download", ["xiazai"]],
    ["image", ["img", "pic", "tupian", "photo"]],
    ["file", ["wenjian"]],
    ["title", ["biaoti"]],
    ["content", ["neirong"]],
    ["nav", ["daohang", "navbar"]],
    ["menu", ["caidan"]],
    ["modal", ["tanchuang", "dlg", "dialog"]],
    ["form", ["biaodan"]],
    ["input", ["shuru"]],
    ["select", ["xuanze"]],
    ["button", ["btn", "anniu"]],
    ["header", ["hdr", "head"]],
    ["footer", ["ftr", "foot"]],
    ["sidebar", ["side", "aside"]],
    ["banner", ["guanggao"]],
    ["coupon", ["youhuiquan"]],
    ["address", ["dizhi", "addr"]],
    ["comment", ["pinglun", "review"]],
    ["message", ["msg", "xiaoxi"]],
    ["notice", ["tongzhi", "tishi", "tip"]],
    ["setting", ["shezhi", "config", "cfg"]],
    ["home", ["shouye", "index"]],
    ["checkout", ["jiesuan"]],
    ["payment", ["pay", "zhifu"]],
    ["status", ["zhuangtai", "state"]],
    ["loading", ["jiazai"]],
    ["error", ["err", "cuowu", "shibai"]],
    ["success", ["chenggong"]],
    ["help", ["bangzhu", "faq"]],
    ["tag", ["biaoqian"]],
    ["table", ["biaoge"]],
    ["tab", ["yeqian"]],
    ["page", ["yemian"]],
    ["card", ["kapian"]],
    ["panel", ["pnl"]],
    ["wrapper", ["wrpr", "wrap"]],
    ["container", ["cntnr"]],
    ["item", ["itm"]],
    ["group", ["zu"]],
    ["result", ["jieguo"]]
  ];
  var LEXICON_ALIAS = /* @__PURE__ */ new Map();
  var LEXICON_WORDS = [];
  LEXICON.forEach(([word, aliases]) => {
    LEXICON_WORDS.push(word);
    LEXICON_ALIAS.set(word, word);
    aliases.forEach((alias) => {
      LEXICON_ALIAS.set(alias, word);
      if (PINYIN_TOKENS.has(alias)) PINYIN_FIX[alias] = PINYIN_FIX[alias] || word;
    });
  });
  function matchLexiconToken(token) {
    const t = token.toLowerCase().replace(/\d+$/, "");
    if (!t || t.length < 2) return null;
    if (MEANINGLESS.has(t) || VISUAL_COLORS.has(t) || VISUAL_SIZES.has(t)) return null;
    if (LEXICON_ALIAS.has(t)) {
      return { word: LEXICON_ALIAS.get(t), via: t, confidence: 1 };
    }
    if (t.length >= 3) {
      const prefixed = LEXICON_WORDS.filter((w) => w.startsWith(t) && w !== t);
      if (prefixed.length) {
        prefixed.sort((a, b) => a.length - b.length);
        return { word: prefixed[0], via: t, confidence: 0.82 };
      }
    }
    if (t.length >= 4) {
      let best = "";
      let bestDist = 99;
      for (const w of LEXICON_WORDS) {
        const d = editDistance(t, w);
        if (d < bestDist) {
          bestDist = d;
          best = w;
        }
      }
      const limit = t.length >= 6 ? 2 : 1;
      if (best && bestDist <= limit && bestDist / t.length <= 0.34) {
        return { word: best, via: t, confidence: 0.6 };
      }
    }
    return null;
  }
  function lexiconExampleCandidates(rawTokens) {
    const out = [];
    const hits = [];
    const seenWord = /* @__PURE__ */ new Set();
    let keptSuffix = "";
    rawTokens.forEach((token, index) => {
      const bare = token.toLowerCase().replace(/\d+$/, "");
      if (!bare) return;
      const isLast = index === rawTokens.length - 1;
      const hit = matchLexiconToken(bare);
      if (isLast && hit && MODULE_TYPE_SUFFIXES.has(hit.word)) {
        keptSuffix = hit.word === "button" ? "btn" : hit.word;
        return;
      }
      if (isLast && (MODULE_TYPE_SUFFIXES.has(bare) || STRUCTURE_ROLES.has(bare) && !hit)) {
        keptSuffix = bare;
        return;
      }
      if (!hit || seenWord.has(hit.word)) return;
      seenWord.add(hit.word);
      hits.push(hit);
    });
    if (!hits.length) return out;
    const primary = hits[0];
    const biz = hits.slice(0, 2).map((h) => h.word).join("-");
    const viaNote = primary.via === primary.word ? `\u8BCD\u5E93\u547D\u4E2D\u300C${primary.word}\u300D` : `\u8BCD\u5E93\u300C${primary.via}\u300D\u2192\u300C${primary.word}\u300D`;
    const moduleSuffixes = keptSuffix && MODULE_TYPE_SUFFIXES.has(keptSuffix) ? [keptSuffix, "card", "list", "panel", "modal", "form", "table", "section", "menu", "wrapper"] : ["card", "list", "panel", "modal", "form", "table", "section", "menu", "dropdown", "dialog", "wrapper", "group"];
    moduleSuffixes.filter((s, i, arr) => arr.indexOf(s) === i).forEach((suffix) => {
      if (biz === suffix) return;
      out.push({ from: "", to: `${biz}-${suffix}`, note: `${viaNote}\uFF0C\u6A21\u5757\u7C7B` });
    });
    const structureRoles = keptSuffix && STRUCTURE_ROLES.has(keptSuffix) ? [keptSuffix, "title", "header", "body", "desc"] : ["title", "header", "body", "desc", "footer"];
    structureRoles.filter((s, i, arr) => arr.indexOf(s) === i).forEach((role) => {
      out.push({ from: "", to: `${primary.word}-${role}`, note: `${viaNote}\uFF0C\u7ED3\u6784\u7C7B` });
    });
    out.push({ from: "", to: `page-${primary.word}-detail`, note: `${viaNote}\uFF0C\u9875\u9762\u4F5C\u7528\u57DF` });
    out.push({ from: "", to: `page-${primary.word}-list`, note: `${viaNote}\uFF0C\u9875\u9762\u4F5C\u7528\u57DF` });
    ["btn", "modal", "card", "menu"].forEach((role) => {
      out.push({ from: "", to: `js-${primary.word}-${role}`, note: `${viaNote}\uFF0CJS \u94A9\u5B50` });
    });
    return out.filter((ex) => matchRole(ex.to));
  }
  var VISUAL_ROLE_FIX = {
    title: "item-title",
    text: "item-desc",
    btn: "primary-btn",
    button: "primary-btn",
    box: "content-box",
    label: "item-label",
    link: "item-link",
    tag: "item-tag",
    font: "item-desc"
  };
  function editDistance(a, b) {
    const m = a.length;
    const n = b.length;
    if (!m) return n;
    if (!n) return m;
    const prev = new Array(n + 1);
    const curr = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      for (let j = 0; j <= n; j++) prev[j] = curr[j];
    }
    return prev[n];
  }
  function similarityToOriginal(from, to) {
    if (!from || !to) return 0;
    if (from === to) return 1;
    const dist = editDistance(from, to);
    const maxLen = Math.max(from.length, to.length);
    const charScore = 1 - dist / maxLen;
    const fromTok = new Set(splitTokens(from));
    const toTok = splitTokens(to);
    let overlap = 0;
    toTok.forEach((t) => {
      if (fromTok.has(t)) overlap += 1;
    });
    const tokenScore = toTok.length ? overlap / Math.max(fromTok.size, toTok.length) : 0;
    let prefix = 0;
    const min = Math.min(from.length, to.length);
    while (prefix < min && from[prefix] === to[prefix]) prefix += 1;
    const prefixScore = prefix / maxLen;
    return charScore * 0.45 + tokenScore * 0.4 + prefixScore * 0.15;
  }
  function closestWord(target, candidates) {
    let best = "";
    let bestDist = Infinity;
    for (const c of candidates) {
      const d = editDistance(target, c);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    return best;
  }
  function rewriteToken(token) {
    const t = token.toLowerCase();
    if (PINYIN_FIX[t]) return PINYIN_FIX[t];
    if (ABBREV_FIX[t]) return ABBREV_FIX[t];
    const numbered = t.match(/^(box|item|div|span|wrap|wrapper|container|temp|test|tmp)(\d+)$/i);
    if (numbered) return numbered[1].toLowerCase();
    if (MEANINGLESS.has(t) || BARE_STATES.has(t)) return null;
    if (VISUAL_COLORS.has(t) || VISUAL_SIZES.has(t)) return null;
    if (BAD_ABBREVS.has(t) && !ABBREV_FIX[t]) return null;
    if (t === "js" || t === "page" || t === "is" || t === "has") return null;
    if (!/^[a-z][a-z0-9]*$/.test(t)) return null;
    if (t.length <= 2 && !GOOD_ABBREVS.has(t)) return null;
    return t;
  }
  function salvageTokens(rawTokens) {
    const out = [];
    for (const t of rawTokens) {
      const fixed = rewriteToken(t);
      if (!fixed) continue;
      splitTokens(fixed).forEach((part) => {
        if (part && !out.includes(part)) out.push(part);
      });
    }
    return out;
  }
  function closestState(stem, pool) {
    if (pool.has(stem)) return stem;
    for (const s of pool) {
      if (stem.includes(s) || s.includes(stem)) return s;
    }
    return closestWord(stem, pool);
  }
  function uniqueExamples(list, original) {
    const seen = /* @__PURE__ */ new Set();
    const scored = list.filter((ex) => ex.to && ex.to !== original && /^[a-z][a-z0-9-]*$/.test(ex.to)).map((ex) => {
      const similar = similarityToOriginal(original, ex.to);
      const lexicon = ex.note.startsWith("\u8BCD\u5E93") ? 0.42 : 0;
      return { ex, score: similar + lexicon };
    }).sort((a, b) => b.score - a.score);
    const out = [];
    const suffixCount = /* @__PURE__ */ new Map();
    for (const { ex, score } of scored) {
      if (seen.has(ex.to)) continue;
      const fromLex = ex.note.startsWith("\u8BCD\u5E93");
      if (!fromLex && out.length && score < 0.28) continue;
      const suffix = splitTokens(ex.to).slice(-1)[0] || "";
      const used = suffixCount.get(suffix) || 0;
      if (used >= 2) continue;
      seen.add(ex.to);
      suffixCount.set(suffix, used + 1);
      out.push({ ...ex, from: original });
      if (out.length >= 24) break;
    }
    return out;
  }
  var EXAMPLE_BATCH = 4;
  function sliceExampleBatch(pool, cursor) {
    if (!pool.length) return [];
    const start = Math.min(cursor, Math.max(0, pool.length - 1));
    return pool.slice(start, start + EXAMPLE_BATCH);
  }
  function nextExampleCursor(pool, cursor) {
    const next = cursor + EXAMPLE_BATCH;
    return next >= pool.length ? 0 : next;
  }
  function buildOptimizeExamples(name, issues) {
    const examples = [];
    const codes = new Set(issues.map((i) => i.code));
    const kebab = toKebab(name.replace(/_/g, "-")).replace(/__/g, "-").replace(/--+/g, "-").replace(/^-|-$/g, "");
    const tokens = splitTokens(kebab);
    const salvaged = salvageTokens(tokens);
    const push = (to, note) => {
      const clean = to.replace(/--+/g, "-").replace(/^-|-$/g, "");
      if (!clean || clean === name) return;
      examples.push({ from: name, to: clean, note });
    };
    if (codes.has("case") || codes.has("underscore") || codes.has("bem") || codes.has("hyphen-form")) {
      if (kebab && kebab !== name) push(kebab, "\u4EC5\u89C4\u8303\u4E3A\u5C0F\u5199\u77ED\u6A2A\u7EBF\uFF0C\u4FDD\u7559\u539F\u8BCD");
    }
    if (codes.has("bare-state")) {
      const stem = tokens[0] || name;
      if (STATE_HAS.has(stem)) push(`has-${stem}`, "\u4FDD\u7559\u539F\u72B6\u6001\u8BCD\uFF0C\u8865 has- \u524D\u7F00");
      else if (STATE_IS.has(stem)) push(`is-${stem}`, "\u4FDD\u7559\u539F\u72B6\u6001\u8BCD\uFF0C\u8865 is- \u524D\u7F00");
      else {
        const nearIs = closestState(stem, STATE_IS);
        const nearHas = closestState(stem, STATE_HAS);
        const useHas = editDistance(stem, nearHas) < editDistance(stem, nearIs);
        const near = useHas ? nearHas : nearIs;
        push(useHas ? `has-${near}` : `is-${near}`, `\u539F\u8BCD\u300C${stem}\u300D\u6700\u63A5\u8FD1\u767D\u540D\u5355\u300C${near}\u300D`);
      }
    }
    if (codes.has("bare-module-type")) {
      push(`product-${kebab}`, `\u4FDD\u7559\u6A21\u5757\u7C7B\u578B\u300C${kebab}\u300D\uFF0C\u8865\u4E1A\u52A1\u524D\u7F00`);
      push(`main-${kebab}`, `\u4FDD\u7559\u300C${kebab}\u300D\uFF0C\u6362\u4E1A\u52A1\u524D\u7F00\u793A\u4F8B`);
    }
    if (codes.has("visual")) {
      const roles = tokens.filter((t) => !VISUAL_COLORS.has(t) && !VISUAL_SIZES.has(t));
      if (roles.length) {
        const role = roles[roles.length - 1];
        if (VISUAL_ROLE_FIX[role]) {
          push(VISUAL_ROLE_FIX[role], `\u53BB\u6389\u89C6\u89C9\u8BCD\uFF0C\u4FDD\u7559\u300C${role}\u300D\u8BED\u4E49`);
        } else if (STRUCTURE_ROLES.has(role)) {
          push(`item-${role}`, `\u4FDD\u7559\u300C${role}\u300D\uFF0C\u6539\u4E3A\u7ED3\u6784\u7C7B`);
        } else if (MODULE_TYPE_SUFFIXES.has(role)) {
          push(`content-${role}`, `\u4FDD\u7559\u300C${role}\u300D\uFF0C\u8865\u4E2D\u6027\u4E1A\u52A1\u524D\u7F00`);
        }
        const kept = roles.map((t) => PINYIN_FIX[t] || ABBREV_FIX[t] || t).filter((t) => !MEANINGLESS.has(t));
        if (kept.length >= 2) push(kept.join("-"), "\u53BB\u6389\u989C\u8272/\u5C3A\u5BF8\u8BCD\uFF0C\u4FDD\u7559\u5176\u4F59\u8BCD\u6BB5");
        else if (kept.length === 1 && !MODULE_TYPE_SUFFIXES.has(kept[0]) && !STRUCTURE_ROLES.has(kept[0]) && !VISUAL_ROLE_FIX[kept[0]]) {
          push(`${kept[0]}-card`, `\u4FDD\u7559\u300C${kept[0]}\u300D\uFF0C\u8865\u6A21\u5757\u7C7B\u578B`);
        }
      }
    }
    if (codes.has("pinyin") || looksLikePinyin(name)) {
      const fixed = tokens.map((t) => PINYIN_FIX[t] || t);
      const joined = fixed.join("-");
      if (joined !== name) push(joined, "\u62FC\u97F3\u8BCD\u6BB5\u66FF\u6362\u4E3A\u5BF9\u5E94\u82F1\u6587\uFF0C\u5176\u5B83\u6BB5\u4FDD\u7559");
      if (!endsWithModuleType(fixed) && !isStructureClass(joined, fixed)) {
        const action = fixed.find(
          (t) => ["submit", "confirm", "cancel", "search", "login", "save", "edit", "delete", "add", "open", "close"].includes(t)
        );
        if (action && !fixed.includes("btn")) push(`${joined}-btn`.replace(/-btn-btn$/, "-btn"), `\u4FDD\u7559\u300C${joined}\u300D\uFF0C\u8865 btn`);
        else if (fixed.length && !MODULE_TYPE_SUFFIXES.has(fixed[fixed.length - 1])) {
          push(`${joined}-card`, "\u62FC\u97F3\u8F6C\u82F1\u6587\u540E\uFF0C\u5728\u539F\u8BCD\u540E\u8865\u6A21\u5757\u7C7B\u578B");
        }
      }
    }
    if (codes.has("bad-abbrev")) {
      const fixed = tokens.map((t) => ABBREV_FIX[t] || t);
      const flat = fixed.flatMap((t) => splitTokens(t));
      const joined = flat.join("-");
      if (joined !== name) push(joined, "\u4EC5\u5C55\u5F00\u975E\u901A\u7528\u7F29\u5199\uFF0C\u4FDD\u7559\u5176\u4F59\u8BCD\u6BB5");
      if (!endsWithModuleType(flat) && flat.length) {
        const last = flat[flat.length - 1];
        if (!MODULE_TYPE_SUFFIXES.has(last)) {
          push(`${joined}-card`, "\u5C55\u5F00\u7F29\u5199\u540E\uFF0C\u5728\u539F\u8BCD\u540E\u8865\u6A21\u5757\u7C7B\u578B");
        }
      }
    }
    if (codes.has("meaningless")) {
      if (salvaged.length === 1) {
        const t = salvaged[0];
        if (MODULE_TYPE_SUFFIXES.has(t)) push(`content-${t}`, `\u4FDD\u7559\u7C7B\u578B\u8BCD\u300C${t}\u300D\uFF0C\u53BB\u6389\u65E0\u610F\u4E49\u90E8\u5206`);
        else if (STRUCTURE_ROLES.has(t)) push(`item-${t}`, `\u4FDD\u7559\u300C${t}\u300D\uFF0C\u6539\u4E3A\u7ED3\u6784\u7C7B`);
        else {
          push(`${t}-card`, `\u4FDD\u7559\u53EF\u8BC6\u522B\u8BCD\u300C${t}\u300D\uFF0C\u8865\u6A21\u5757\u7C7B\u578B`);
          push(`js-${t}-btn`, `\u82E5\u7528\u4E8E JS\uFF0C\u4FDD\u7559\u300C${t}\u300D`);
        }
      } else if (salvaged.length > 1) {
        push(salvaged.join("-"), "\u53BB\u6389\u65E0\u610F\u4E49\u8BCD\u6BB5\uFF0C\u4FDD\u7559\u53EF\u8BC6\u522B\u90E8\u5206");
        if (!endsWithModuleType(salvaged)) push(`${salvaged.join("-")}-card`, "\u4FDD\u7559\u53EF\u8BC6\u522B\u8BCD\u6BB5\u5E76\u8865\u6A21\u5757\u7C7B\u578B");
      }
    }
    const specificHandled = codes.has("bare-state") || codes.has("bare-module-type") || codes.has("visual") || codes.has("pinyin") || codes.has("bad-abbrev") || codes.has("meaningless");
    if (codes.has("role-mismatch") && !specificHandled) {
      if (name.startsWith("is-") || name.startsWith("has-")) {
        const prefix = name.startsWith("has-") ? "has" : "is";
        const stem = tokens.slice(1).join("-") || "";
        const pool = prefix === "has" ? STATE_HAS : STATE_IS;
        const near = closestState(stem, pool);
        if (stem && editDistance(stem, near) <= 2) {
          push(`${prefix}-${near}`, `\u4FDD\u7559 ${prefix}-\uFF0C\u4EC5\u66FF\u6362\u72B6\u6001\u8BCD\u4E3A\u6700\u63A5\u8FD1\u7684\u300C${near}\u300D`);
        }
      } else if (name.startsWith("js-")) {
        const body = salvageTokens(tokens.slice(1));
        if (body.some((t) => JS_ROLE_TOKENS.has(t))) {
          if (body.length === 1) push(`js-${body[0]}-btn`, "\u4FDD\u7559\u539F\u89D2\u8272\u8BCD\uFF0C\u8865\u9F50\u81F3\u5C11\u4E24\u6BB5");
          else push(`js-${body.join("-")}`, "\u6574\u7406\u4E3A\u5408\u6CD5 js \u94A9\u5B50\u5F62\u6001");
        } else if (body.length) {
          push(`js-${body.join("-")}-btn`, "\u4FDD\u7559\u539F\u8BCD\u6BB5\uFF0C\u8865\u89D2\u8272\u8BCD btn");
        }
      } else if (name.startsWith("page-")) {
        const rest = salvageTokens(tokens.slice(1));
        if (rest.length === 1 && PAGE_SINGLE_ALLOW.has(rest[0])) {
          push(`page-${rest[0]}`, "\u4FDD\u7559\u9875\u9762\u6807\u8BC6");
        } else if (rest.length === 1) {
          push(`page-${rest[0]}-detail`, `\u4FDD\u7559\u300C${rest[0]}\u300D\uFF0C\u8865\u9875\u9762\u4E1A\u52A1\u6BB5`);
        } else if (rest.length > 1) {
          push(`page-${rest.join("-")}`, "\u4FDD\u7559\u539F\u9875\u9762\u8BCD\u6BB5");
        }
      } else if (tokens.length === 1) {
        const w = tokens[0];
        if (MODULE_TYPE_SUFFIXES.has(w)) {
          push(`product-${w}`, `\u300C${w}\u300D\u662F\u6A21\u5757\u7C7B\u578B\uFF0C\u8865\u4E1A\u52A1\u524D\u7F00`);
        } else if (STRUCTURE_ROLES.has(w)) {
          push(`item-${w}`, `\u4FDD\u7559\u300C${w}\u300D\uFF0C\u6539\u4E3A\u7ED3\u6784\u7C7B`);
        } else if (isValidBusinessToken(w)) {
          push(`${w}-card`, "\u4FDD\u7559\u539F\u5355\u8BCD\uFF0C\u8865\u6A21\u5757\u7C7B\u578B");
          push(`js-${w}-btn`, "\u82E5\u7528\u4E8E JS \u7ED1\u5B9A\uFF0C\u4FDD\u7559\u539F\u5355\u8BCD");
          if (PAGE_SINGLE_ALLOW.has(w)) push(`page-${w}`, "\u4FDD\u7559\u4E3A\u9875\u9762\u4F5C\u7528\u57DF");
        }
      } else if (salvaged.length) {
        const joined = salvaged.join("-");
        if (endsWithModuleType(salvaged) || isStructureClass(joined, salvaged)) {
          push(joined, "\u53BB\u6389\u4E0D\u5408\u89C4\u8BCD\u6BB5\uFF0C\u4FDD\u7559\u53EF\u5F52\u7C7B\u90E8\u5206");
        } else if (salvaged.length === 1 && MODULE_TYPE_SUFFIXES.has(salvaged[0])) {
          push(`product-${salvaged[0]}`, `\u4FDD\u7559\u7C7B\u578B\u8BCD\u300C${salvaged[0]}\u300D\uFF0C\u8865\u4E1A\u52A1\u524D\u7F00`);
        } else if (salvaged.length === 1 && STRUCTURE_ROLES.has(salvaged[0])) {
          push(`item-${salvaged[0]}`, `\u4FDD\u7559\u300C${salvaged[0]}\u300D\uFF0C\u6539\u4E3A\u7ED3\u6784\u7C7B`);
        } else {
          push(`${joined}-card`, "\u4FDD\u7559\u539F\u6709\u6548\u8BCD\u6BB5\uFF0C\u8865\u6A21\u5757\u7C7B\u578B");
          const last = salvaged[salvaged.length - 1];
          if (STRUCTURE_ROLES.has(last) && salvaged.length >= 2) {
            push(`${salvaged[0]}-${last}`, "\u4FDD\u7559\u9996\u5C3E\u6709\u6548\u8BCD\uFF0C\u6539\u4E3A\u7ED3\u6784\u7C7B\u5F62\u6001");
          }
        }
      }
    }
    lexiconExampleCandidates(tokens).forEach((ex) => push(ex.to, ex.note));
    for (const issue of issues) {
      const tip = (issue.suggestion || "").trim();
      if (!tip || /[\s/→,]/.test(tip)) continue;
      if (/^[a-z][a-z0-9-]*$/.test(tip) && similarityToOriginal(name, tip) >= 0.35) {
        push(tip, "\u6765\u81EA\u68C0\u6D4B\u5EFA\u8BAE\u7684\u76F4\u63A5\u6539\u540D");
      }
    }
    return uniqueExamples(examples, name);
  }
  function checkClassName(raw) {
    var _a;
    const name = raw.trim();
    const issues = [];
    if (!name) {
      return {
        name: raw,
        kind: "unknown",
        severity: "fail",
        issues: [{ code: "empty", severity: "fail", message: "\u7C7B\u540D\u4E3A\u7A7A" }],
        examples: [{ from: "", to: "product-card", note: "\u8BF7\u8F93\u5165\u7C7B\u540D\u540E\u518D\u68C0\u6D4B" }]
      };
    }
    if (isPlugin(name)) {
      return {
        name,
        kind: "plugin",
        severity: "pass",
        issues: [{
          code: "plugin-ok",
          severity: "pass",
          message: "\u7B2C\u4E09\u65B9\u63D2\u4EF6\u7C7B\uFF0C\u4FDD\u6301\u539F\u6837\uFF1B\u8986\u76D6\u6837\u5F0F\u5FC5\u987B\u9650\u5236\u5728\u4E1A\u52A1\u6A21\u5757\u4F5C\u7528\u57DF\u5185"
        }]
      };
    }
    if (isAtomic(name)) {
      return {
        name,
        kind: "atomic",
        severity: "pass",
        issues: [{
          code: "atomic-ok",
          severity: "pass",
          message: "\u539F\u5B50\u5DE5\u5177\u7C7B\uFF08\u767D\u540D\u5355\u547D\u4E2D\uFF09",
          suggestion: "\u7981\u6B62\u7528\u539F\u5B50\u7C7B\u505A JS \u9009\u62E9\u5668"
        }]
      };
    }
    if (/[A-Z]/.test(name) || name !== name.toLowerCase()) {
      issues.push({
        code: "case",
        severity: "fail",
        message: "\u5FC5\u987B\u4F7F\u7528\u5C0F\u5199\u82F1\u6587 + \u77ED\u6A2A\u7EBF",
        suggestion: toKebab(name)
      });
    }
    if (name.includes("_")) {
      issues.push({
        code: "underscore",
        severity: "fail",
        message: "\u7981\u6B62\u4E0B\u5212\u7EBF\uFF0C\u5E94\u4F7F\u7528\u77ED\u6A2A\u7EBF",
        suggestion: name.replace(/_/g, "-").toLowerCase()
      });
    }
    if (hasBemConnector(name)) {
      issues.push({
        code: "bem",
        severity: "fail",
        message: "\u7981\u6B62 BEM \u8FDE\u63A5\u7B26 __ / --",
        suggestion: name.replace(/__/g, "-").replace(/--/g, "-").replace(/-+/g, "-")
      });
    }
    if (/\s/.test(name)) {
      issues.push({
        code: "space",
        severity: "fail",
        message: "\u5355\u4E2A\u7C7B\u540D\u4E0D\u80FD\u5305\u542B\u7A7A\u683C"
      });
    }
    if (/[^a-z0-9-]/i.test(name)) {
      issues.push({
        code: "charset",
        severity: "fail",
        message: "\u7C7B\u540D\u4EC5\u5141\u8BB8\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u4E0E\u77ED\u6A2A\u7EBF"
      });
    }
    if (/^-|-$|--/.test(name) || name.includes("--")) {
      issues.push({
        code: "hyphen-form",
        severity: "fail",
        message: "\u77ED\u6A2A\u7EBF\u4E0D\u80FD\u51FA\u73B0\u5728\u9996\u5C3E\uFF0C\u4E14\u4E0D\u80FD\u8FDE\u7EED"
      });
    }
    if (/^\d/.test(name)) {
      issues.push({
        code: "leading-digit",
        severity: "fail",
        message: "\u7C7B\u540D\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934"
      });
    }
    if (BARE_STATES.has(name)) {
      const prefix = STATE_HAS.has(name) ? "has" : "is";
      issues.push({
        code: "bare-state",
        severity: "fail",
        message: `\u7981\u6B62\u88F8\u72B6\u6001\u7C7B\u300C${name}\u300D`,
        suggestion: STATE_IS.has(name) || STATE_HAS.has(name) ? `${prefix}-${name}` : `is-${name}`
      });
    }
    if (isMeaningless(name)) {
      issues.push({
        code: "meaningless",
        severity: "fail",
        message: "\u65E0\u610F\u4E49\u547D\u540D\uFF0C\u65E0\u6CD5\u7EF4\u62A4",
        suggestion: "\u4F7F\u7528\u4E1A\u52A1\u8BED\u4E49\u540D\uFF0C\u5982 product-card\u3001filter-panel"
      });
    }
    if (isVisualNaming(name)) {
      issues.push({
        code: "visual",
        severity: "fail",
        message: "\u7EAF\u89C6\u89C9\u547D\u540D\uFF08\u989C\u8272/\u5C3A\u5BF8\u8BCD\uFF09\uFF0C\u6539\u7248\u540E\u5931\u6548",
        suggestion: "\u6539\u4E3A\u8BED\u4E49\u547D\u540D\uFF08\u5982 section-title\uFF09\u6216\u4F7F\u7528\u539F\u5B50\u5DE5\u5177\u7C7B"
      });
    }
    if (looksLikePinyin(name)) {
      issues.push({
        code: "pinyin",
        severity: "fail",
        message: "\u7981\u6B62\u62FC\u97F3\u547D\u540D",
        suggestion: "\u4F7F\u7528\u82F1\u6587\u8BED\u4E49\u8BCD\uFF0C\u5982 submit-btn"
      });
    }
    if (hasBadAbbrev(name)) {
      issues.push({
        code: "bad-abbrev",
        severity: "fail",
        message: "\u7F29\u5199\u4E0D\u901A\u7528\uFF08\u4EC5\u5141\u8BB8 btn/img/desc/nav \u7B49\u901A\u7528\u7F29\u5199\uFF09",
        suggestion: "\u6539\u7528\u5B8C\u6574\u5355\u8BCD\uFF0C\u5982 product-list\u3001verify-modal"
      });
    }
    if (MODULE_TYPE_SUFFIXES.has(name)) {
      issues.push({
        code: "bare-module-type",
        severity: "fail",
        message: `\u88F8\u6A21\u5757\u7C7B\u578B\u300C${name}\u300D\u8BED\u4E49\u8FC7\u5BBD\uFF0C\u5FC5\u987B\u52A0\u4E1A\u52A1\u524D\u7F00`,
        suggestion: `product-${name} / verify-${name}`
      });
    }
    const role = matchRole(name);
    if (!role) {
      const tokens = splitTokens(name);
      let suggestion = "\u9875\u9762\u7C7B page-* / \u6A21\u5757\u7C7B\u300C\u4E1A\u52A1+\u7C7B\u578B\u300D\u5982 product-card / \u7ED3\u6784\u7C7B\u5982 card-header / \u72B6\u6001\u7C7B is-*|has-* / JS \u94A9\u5B50 js-*-* / \u539F\u5B50\u7C7B";
      if (tokens.length === 1) {
        suggestion = `\u5355\u8BCD\u65E0\u6CD5\u5F52\u7C7B\u3002\u6A21\u5757\u7C7B\u793A\u4F8B\uFF1A${tokens[0]}-card\uFF1B\u7ED3\u6784\u7C7B\u793A\u4F8B\uFF1Aitem-title\uFF1B\u72B6\u6001\u7C7B\u793A\u4F8B\uFF1Ais-active`;
      } else if (!endsWithModuleType(tokens)) {
        suggestion = `\u672A\u4EE5\u89C4\u8303\u6A21\u5757\u7C7B\u578B\u7ED3\u5C3E\u3002\u53EF\u7528\u540E\u7F00\uFF1A${[...MODULE_TYPE_SUFFIXES].slice(0, 12).join(" / ")}\u2026\uFF1B\u6216\u6539\u4E3A\u7ED3\u6784\u7C7B card-header`;
      }
      issues.push({
        code: "role-mismatch",
        severity: "fail",
        message: "\u65E0\u6CD5\u5F52\u5165\u89C4\u8303\u804C\u8D23\u5206\u5C42\uFF0C\u7981\u6B62\u968F\u610F\u82F1\u6587\u8BCD\u5806\u53E0",
        suggestion
      });
    } else if (!issues.some((i) => i.severity === "fail")) {
      issues.push({
        code: `${role.kind}-ok`,
        severity: "pass",
        message: role.message,
        suggestion: role.suggestion
      });
    }
    const hasProblem = issues.some((i) => i.severity === "fail" || i.severity === "warn");
    const filtered = hasProblem ? issues.filter((i) => i.severity !== "pass") : issues;
    if (!filtered.length) {
      filtered.push({ code: "ok", severity: "pass", message: "\u7B26\u5408\u547D\u540D\u89C4\u8303" });
    }
    const severity = worstSeverity(filtered);
    const examplePool = severity === "fail" || severity === "warn" ? buildOptimizeExamples(name, filtered) : void 0;
    return {
      name,
      kind: (role == null ? void 0 : role.kind) || "unknown",
      severity,
      issues: filtered,
      suggestion: (_a = filtered.find((i) => i.suggestion)) == null ? void 0 : _a.suggestion,
      examplePool,
      exampleCursor: 0,
      examples: examplePool ? sliceExampleBatch(examplePool, 0) : void 0
    };
  }
  function parseClassList(text) {
    const parts = text.split(/[\s,;|]+/).map((s) => s.trim()).filter(Boolean).map((s) => s.replace(/^[.#]+/, "").replace(/[.{(:].*$/, ""));
    return unique(parts);
  }
  function parseHtmlClasses(html) {
    const names = [];
    const classRe = /\bclass(?:Name)?\s*=\s*(["'])(.*?)\1/gi;
    let m;
    while ((m = classRe.exec(html)) !== null) {
      names.push(...m[2].split(/\s+/).filter(Boolean));
    }
    const thRe = /th:classappend\s*=\s*(["'])(.*?)\1/gi;
    while ((m = thRe.exec(html)) !== null) {
      const lit = m[2].match(/'([a-z0-9_-]+)'/gi) || m[2].match(/is-[a-z0-9-]+|has-[a-z0-9-]+/gi);
      if (lit) {
        lit.forEach((x) => names.push(x.replace(/'/g, "").trim()));
      }
    }
    return unique(names);
  }
  function parseScssClasses(scss) {
    const names = [];
    const cleaned = scss.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    const re = /\.([a-zA-Z_][\w-]*)/g;
    let m;
    while ((m = re.exec(cleaned)) !== null) {
      names.push(m[1]);
    }
    return unique(names);
  }
  function unique(arr) {
    return [...new Set(arr.filter(Boolean))];
  }
  function summarize(results) {
    const summary = { total: results.length, pass: 0, warn: 0, fail: 0, info: 0 };
    results.forEach((r) => {
      if (r.severity === "pass") summary.pass++;
      else if (r.severity === "warn") summary.warn++;
      else if (r.severity === "fail") summary.fail++;
      else summary.info++;
    });
    return summary;
  }
  function kindLabel(kind) {
    const map = {
      atomic: "\u539F\u5B50\u5DE5\u5177\u7C7B",
      page: "\u9875\u9762\u7C7B",
      module: "\u6A21\u5757\u7C7B",
      structure: "\u7ED3\u6784\u7C7B",
      state: "\u72B6\u6001\u7C7B",
      "js-hook": "JS \u94A9\u5B50",
      plugin: "\u63D2\u4EF6\u7C7B",
      unknown: "\u672A\u5206\u7C7B"
    };
    return map[kind];
  }
  function severityLabel(s) {
    const map = {
      pass: "\u901A\u8FC7",
      warn: "\u8B66\u544A",
      fail: "\u4E0D\u5408\u89C4",
      info: "\u63D0\u793A"
    };
    return map[s];
  }
  var HISTORY_KEY = "css-naming-checker-history-v1";
  var HISTORY_LIMIT = 30;
  var state = {
    mode: "list",
    filter: "all",
    keyword: "",
    results: []
  };
  function $(sel, root = document) {
    return root.querySelector(sel);
  }
  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }
  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }
  function saveHistory(list) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, HISTORY_LIMIT)));
    } catch (e) {
    }
  }
  function pushHistory(input, summary, options) {
    if (!input.trim() || !summary.total) return;
    const failNames = state.results.filter((r) => r.severity === "fail").slice(0, 8).map((r) => r.name);
    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      time: Date.now(),
      mode: state.mode,
      input,
      summary,
      failNames,
      adopt: options == null ? void 0 : options.adopt
    };
    let list = loadHistory();
    if ((options == null ? void 0 : options.dedupe) !== false && !(options == null ? void 0 : options.adopt)) {
      list = list.filter((h) => h.input !== input || h.mode !== state.mode || h.adopt);
    }
    list.unshift(record);
    saveHistory(list);
    renderHistory();
  }
  function normalizeClassLine(line) {
    return line.trim().replace(/^[.#]+/, "");
  }
  function formatHistoryTime(ts) {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function modeLabel(mode) {
    return { list: "\u7C7B\u540D\u5217\u8868", html: "HTML", scss: "SCSS/CSS" }[mode];
  }
  function renderHistory() {
    const listEl = $("#js-history-list");
    const emptyEl = $("#js-history-empty");
    if (!listEl) return;
    const list = loadHistory();
    if (!list.length) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("is-hidden");
      return;
    }
    if (emptyEl) emptyEl.classList.add("is-hidden");
    listEl.innerHTML = list.map((h) => {
      const preview = h.input.replace(/\s+/g, " ").trim().slice(0, 48);
      const fails = h.failNames.length ? `<span class="checker-history-fails">\u4E0D\u5408\u89C4\uFF1A${h.failNames.slice(0, 4).map(escapeHtml).join("\u3001")}${h.failNames.length > 4 ? "\u2026" : ""}</span>` : '<span class="checker-history-fails is-ok">\u5168\u90E8\u901A\u8FC7</span>';
      const adoptHtml = h.adopt ? `<div class="checker-history-adopt">\u91C7\u7528\uFF1A<code>.${escapeHtml(h.adopt.from)}</code> \u2192 <code>.${escapeHtml(h.adopt.to)}</code></div>` : "";
      return `
      <article class="checker-history-item${h.adopt ? " is-adopt" : ""}" data-id="${escapeAttr(h.id)}">
        <div class="checker-history-main">
          <div class="checker-history-meta">
            <time>${formatHistoryTime(h.time)}</time>
            <span class="checker-history-mode">${h.adopt ? "\u91C7\u7528\u4F18\u5316" : modeLabel(h.mode)}</span>
            <span class="checker-history-stat">\u5171 ${h.summary.total} \xB7 \u901A\u8FC7 ${h.summary.pass} \xB7 \u4E0D\u5408\u89C4 ${h.summary.fail}</span>
          </div>
          ${adoptHtml}
          <div class="checker-history-preview">${escapeHtml(preview)}${h.input.length > 48 ? "\u2026" : ""}</div>
          ${fails}
        </div>
        <div class="checker-history-actions">
          <button type="button" class="checker-btn checker-btn-sm js-history-restore" data-id="${escapeAttr(h.id)}">\u6062\u590D\u5E76\u68C0\u6D4B</button>
          <button type="button" class="checker-btn checker-btn-sm js-history-delete" data-id="${escapeAttr(h.id)}">\u5220\u9664</button>
        </div>
      </article>
    `;
    }).join("");
  }
  function restoreHistory(id) {
    const record = loadHistory().find((h) => h.id === id);
    if (!record) return;
    setMode(record.mode);
    const input = $("#js-naming-input");
    if (input) input.value = record.input;
    runCheck(false);
  }
  function deleteHistory(id) {
    saveHistory(loadHistory().filter((h) => h.id !== id));
    renderHistory();
  }
  function clearHistory() {
    saveHistory([]);
    renderHistory();
  }
  function regenerateExamples(name) {
    const result = state.results.find((r) => r.name === name);
    const pool = result == null ? void 0 : result.examplePool;
    if (!result || !pool || pool.length <= EXAMPLE_BATCH) return;
    result.exampleCursor = nextExampleCursor(pool, result.exampleCursor || 0);
    result.examples = sliceExampleBatch(pool, result.exampleCursor);
    renderResults();
  }
  function applyOptimizeExample(from, to) {
    var _a;
    const input = $("#js-naming-input");
    if (!input) return;
    if (state.mode === "list") {
      const lines = input.value.split(/\r?\n/);
      const hasTarget = lines.some((line) => normalizeClassLine(line) === to);
      let touched = false;
      const next = [];
      for (const line of lines) {
        const name = normalizeClassLine(line);
        if (!line.trim()) {
          next.push(line);
          continue;
        }
        if (!touched && name === from) {
          touched = true;
          if (!hasTarget) next.push(to);
          continue;
        }
        next.push(line);
      }
      if (!touched && !hasTarget) {
        next.push(to);
        touched = true;
      }
      input.value = next.join("\n").replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "");
    } else if (state.mode === "scss") {
      const re = new RegExp(`\\.${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (re.test(input.value)) {
        input.value = input.value.replace(re, `.${to}`);
      } else if (!new RegExp(`\\.${to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(input.value)) {
        input.value += `
.${to} {}
`;
      }
    } else {
      const escFrom = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escTo = to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const hasTo = new RegExp(`(?:^|[\\s])${escTo}(?:[\\s]|$)`).test(input.value);
      const classAttrRe = /(\bclass(?:Name)?\s*=\s*)(["'])([^"']*)\2/gi;
      let replacedInHtml = false;
      input.value = input.value.replace(classAttrRe, (full, prefix, quote, value) => {
        const parts = value.split(/\s+/).filter(Boolean);
        if (!parts.includes(from)) return full;
        replacedInHtml = true;
        const nextParts = parts.map((p) => p === from ? hasTo ? "" : to : p).filter(Boolean);
        const deduped = [...new Set(nextParts)];
        return `${prefix}${quote}${deduped.join(" ")}${quote}`;
      });
      if (!replacedInHtml && !hasTo) {
        input.value += `
<div class="${to}"></div>`;
      }
    }
    runCheck(false);
    const current = ((_a = $("#js-naming-input")) == null ? void 0 : _a.value) || "";
    pushHistory(current, summarize(state.results), {
      adopt: { from, to },
      dedupe: false
    });
  }
  function runCheck(saveToHistory = true) {
    var _a;
    const input = ((_a = $("#js-naming-input")) == null ? void 0 : _a.value) || "";
    let names = [];
    if (state.mode === "html") {
      names = parseHtmlClasses(input);
    } else if (state.mode === "scss") {
      names = parseScssClasses(input);
    } else {
      names = parseClassList(input);
    }
    state.results = names.map(checkClassName);
    renderResults();
    if (saveToHistory) {
      pushHistory(input, summarize(state.results));
    }
  }
  function getFilteredResults() {
    let list = state.results;
    if (state.filter !== "all") {
      list = list.filter((r) => r.severity === state.filter);
    }
    const kw = state.keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter(
        (r) => r.name.toLowerCase().includes(kw) || r.issues.some((i) => i.message.toLowerCase().includes(kw) || (i.suggestion || "").toLowerCase().includes(kw)) || kindLabel(r.kind).includes(kw)
      );
    }
    return list;
  }
  function renderResults() {
    const summary = summarize(state.results);
    const filtered = getFilteredResults();
    const elTotal = $("#js-stat-total");
    const elPass = $("#js-stat-pass");
    const elWarn = $("#js-stat-warn");
    const elFail = $("#js-stat-fail");
    if (elTotal) elTotal.textContent = String(summary.total);
    if (elPass) elPass.textContent = String(summary.pass);
    if (elWarn) elWarn.textContent = String(summary.warn);
    if (elFail) elFail.textContent = String(summary.fail);
    const listEl = $("#js-result-list");
    const emptyEl = $("#js-result-empty");
    const countEl = $("#js-result-count");
    if (!listEl) return;
    if (countEl) {
      countEl.textContent = state.results.length ? `\u663E\u793A ${filtered.length} / ${state.results.length}` : "";
    }
    if (!state.results.length) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("is-hidden");
      return;
    }
    if (emptyEl) emptyEl.classList.add("is-hidden");
    if (!filtered.length) {
      listEl.innerHTML = '<div class="checker-empty-filter">\u6CA1\u6709\u5339\u914D\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u7684\u7ED3\u679C</div>';
      return;
    }
    listEl.innerHTML = filtered.map((r) => {
      var _a;
      const issueHtml = r.issues.map((i) => `
      <li class="checker-issue checker-issue-${i.severity}">
        <span class="checker-issue-msg">${escapeHtml(i.message)}</span>
        ${i.suggestion ? `<span class="checker-issue-tip">\u5EFA\u8BAE\uFF1A<code>${escapeHtml(i.suggestion)}</code></span>` : ""}
      </li>
    `).join("");
      const examples = r.examples || [];
      const poolSize = ((_a = r.examplePool) == null ? void 0 : _a.length) || 0;
      const batchTotal = poolSize ? Math.ceil(poolSize / EXAMPLE_BATCH) : 0;
      const batchIndex = Math.floor((r.exampleCursor || 0) / EXAMPLE_BATCH) + 1;
      const canRegen = poolSize > EXAMPLE_BATCH;
      const exampleHtml = examples.length ? `
      <div class="checker-optimize">
        <div class="checker-optimize-head">
          <div class="checker-optimize-title">\u4F18\u5316\u793A\u4F8B${canRegen ? ` \xB7 ${batchIndex}/${batchTotal}` : ""}</div>
          ${canRegen ? `<button type="button" class="checker-btn checker-btn-sm js-regen-example" data-name="${escapeAttr(r.name)}">\u6362\u4E00\u6279</button>` : ""}
        </div>
        <ul class="checker-optimize-list">
          ${examples.map((ex) => `
            <li class="checker-optimize-item">
              <div class="checker-optimize-pair">
                <code class="is-from">.${escapeHtml(ex.from || r.name)}</code>
                <span class="checker-optimize-arrow">\u2192</span>
                <code class="is-to">.${escapeHtml(ex.to)}</code>
              </div>
              <span class="checker-optimize-note">${escapeHtml(ex.note)}</span>
              <button type="button" class="checker-btn checker-btn-sm checker-btn-primary js-apply-example"
                data-from="${escapeAttr(ex.from || r.name)}" data-to="${escapeAttr(ex.to)}">\u91C7\u7528</button>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : "";
      return `
      <article class="checker-result-item is-${r.severity}" data-name="${escapeAttr(r.name)}">
        <div class="checker-result-head">
          <code class="checker-class-name">.${escapeHtml(r.name)}</code>
          <span class="checker-badge checker-badge-${r.severity}">${severityLabel(r.severity)}</span>
          <span class="checker-kind">${kindLabel(r.kind)}</span>
        </div>
        <ul class="checker-issue-list">${issueHtml}</ul>
        ${exampleHtml}
      </article>
    `;
    }).join("");
  }
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }
  function buildReportText() {
    const summary = summarize(state.results);
    const lines = [
      "CSS \u9009\u62E9\u5668\u547D\u540D\u89C4\u8303\u68C0\u6D4B\u62A5\u544A",
      `\u5408\u8BA1 ${summary.total} \xB7 \u901A\u8FC7 ${summary.pass} \xB7 \u8B66\u544A ${summary.warn} \xB7 \u4E0D\u5408\u89C4 ${summary.fail}`,
      "".padEnd(48, "-")
    ];
    state.results.forEach((r) => {
      lines.push(`[${severityLabel(r.severity)}] .${r.name}\uFF08${kindLabel(r.kind)}\uFF09`);
      r.issues.forEach((i) => {
        lines.push(`  - ${i.message}${i.suggestion ? ` \u2192 ${i.suggestion}` : ""}`);
      });
      (r.examples || []).forEach((ex) => {
        lines.push(`  \xB7 \u4F18\u5316\uFF1A.${ex.from || r.name} \u2192 .${ex.to}\uFF08${ex.note}\uFF09`);
      });
    });
    return lines.join("\n");
  }
  function setMode(mode) {
    state.mode = mode;
    $all(".js-mode-tab").forEach((tab) => {
      const active = tab.getAttribute("data-mode") === mode;
      tab.classList.toggle("is-active", active);
    });
    const input = $("#js-naming-input");
    const hint = $("#js-input-hint");
    if (input) {
      if (mode === "html") {
        input.placeholder = "\u7C98\u8D34 HTML \u7247\u6BB5\uFF0C\u81EA\u52A8\u63D0\u53D6 class / className / th:classappend \u4E2D\u7684\u7C7B\u540D\u2026";
      } else if (mode === "scss") {
        input.placeholder = "\u7C98\u8D34 SCSS/CSS\uFF0C\u81EA\u52A8\u63D0\u53D6\u7C7B\u9009\u62E9\u5668\uFF08\u5982 .product-card .is-active\uFF09\u2026";
      } else {
        input.placeholder = "\u6BCF\u884C\u4E00\u4E2A\u7C7B\u540D\uFF0C\u6216\u7528\u7A7A\u683C / \u9017\u53F7\u5206\u9694\u2026\n\u53EA\u6709\u7B26\u5408\u804C\u8D23\u5206\u5C42\u7684\u7C7B\u540D\u624D\u4F1A\u901A\u8FC7\uFF1A\nproduct-card / card-header / is-active / js-submit-btn";
      }
    }
    if (hint) {
      const hints = {
        list: "\u9ED8\u8BA4\u62D2\u7EDD\uFF1A\u968F\u610F\u82F1\u6587\u8BCD\u4E0D\u4F1A\u901A\u8FC7\uFF0C\u5FC5\u987B\u7B26\u5408 page/\u6A21\u5757/\u7ED3\u6784/\u72B6\u6001/js/\u539F\u5B50/\u63D2\u4EF6\u89C4\u5219",
        html: "\u4ECE HTML \u6279\u91CF\u63D0\u53D6\u5E76\u4E25\u683C\u68C0\u6D4B\u6240\u6709 class",
        scss: "\u4ECE\u6837\u5F0F\u8868\u6279\u91CF\u63D0\u53D6\u7C7B\u9009\u62E9\u5668\u5E76\u4E25\u683C\u68C0\u6D4B"
      };
      hint.textContent = hints[mode];
    }
  }
  function fillExamples() {
    const input = $("#js-naming-input");
    if (!input) return;
    if (state.mode === "html") {
      input.value = `<div class="product-card d-flex mt20 js-product-card" data-product-id="123">
  <div class="card-img"></div>
  <div class="card-body">
    <div class="item-title f16 fwb">Product Name</div>
    <div class="red-title">Bad visual name</div>
    <div class="hello">Random word</div>
  </div>
  <button class="primary-btn js-add-cart is-disabled active">Add</button>
</div>`;
    } else if (state.mode === "scss") {
      input.value = `.page-product-detail {
  .sidebar-recommend-card {}
}
.product-card {
  .card-header {}
  &.is-active {}
  &.active {}
}
.hello {}
.red-title {}`;
    } else {
      input.value = [
        // 应通过
        "product-card",
        "page-product-detail",
        "card-header",
        "item-title",
        "primary-btn",
        "is-active",
        "has-error",
        "js-submit-btn",
        "d-flex",
        "mt20",
        "f16",
        "slick-current",
        "verify-modal",
        "category-filter-panel",
        // 应失败：随便单词 / 无职责
        "hello",
        "world",
        "apple",
        "foobar",
        "hello-world",
        "nice-thing",
        "my-custom",
        "product",
        "card",
        // 应失败：禁止项
        "active",
        "show",
        "error",
        "red-title",
        "blue-btn",
        "big-box",
        "box1",
        "aaa",
        "temp",
        "tijiao-btn",
        "productCard",
        "product_card",
        "prd-list",
        "vfy-modal",
        "is-happy",
        "has-banana",
        "js-hello",
        "page-x"
      ].join("\n");
    }
  }
  function init() {
    var _a, _b, _c, _d, _e, _f, _g;
    const root = $(".page-css-naming-checker");
    if (!root) return;
    setMode("list");
    $all(".js-mode-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const mode = tab.getAttribute("data-mode") || "list";
        setMode(mode);
      });
    });
    (_a = $("#js-btn-check")) == null ? void 0 : _a.addEventListener("click", runCheck);
    (_b = $("#js-btn-example")) == null ? void 0 : _b.addEventListener("click", () => {
      fillExamples();
      runCheck();
    });
    (_c = $("#js-btn-clear")) == null ? void 0 : _c.addEventListener("click", () => {
      const input = $("#js-naming-input");
      if (input) input.value = "";
      state.results = [];
      state.keyword = "";
      const kw = $("#js-result-search");
      if (kw) kw.value = "";
      state.filter = "all";
      $all(".js-filter-tab").forEach((t) => t.classList.toggle("is-active", t.getAttribute("data-filter") === "all"));
      renderResults();
    });
    (_d = $("#js-btn-copy")) == null ? void 0 : _d.addEventListener("click", async () => {
      if (!state.results.length) return;
      const text = buildReportText();
      try {
        await navigator.clipboard.writeText(text);
        const btn = $("#js-btn-copy");
        if (btn) {
          const old = btn.textContent;
          btn.textContent = "\u5DF2\u590D\u5236";
          setTimeout(() => {
            btn.textContent = old;
          }, 1500);
        }
      } catch (e) {
        window.prompt("\u590D\u5236\u4EE5\u4E0B\u62A5\u544A\uFF1A", text);
      }
    });
    $all(".js-filter-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.filter = tab.getAttribute("data-filter") || "all";
        $all(".js-filter-tab").forEach((t) => t.classList.toggle("is-active", t === tab));
        renderResults();
      });
    });
    (_e = $("#js-result-search")) == null ? void 0 : _e.addEventListener("input", (e) => {
      state.keyword = e.target.value;
      renderResults();
    });
    (_f = $("#js-naming-input")) == null ? void 0 : _f.addEventListener("keydown", (e) => {
      const ke = e;
      if ((ke.ctrlKey || ke.metaKey) && ke.key === "Enter") {
        ke.preventDefault();
        runCheck();
      }
    });
    root.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      const regenBtn = target.closest(".js-regen-example");
      if (regenBtn) {
        const name = regenBtn.getAttribute("data-name") || "";
        if (name) regenerateExamples(name);
        return;
      }
      const applyBtn = target.closest(".js-apply-example");
      if (applyBtn) {
        const from = applyBtn.getAttribute("data-from") || "";
        const to = applyBtn.getAttribute("data-to") || "";
        if (from && to) applyOptimizeExample(from, to);
        return;
      }
      const restoreBtn = target.closest(".js-history-restore");
      if (restoreBtn) {
        const id = restoreBtn.getAttribute("data-id") || "";
        if (id) restoreHistory(id);
        return;
      }
      const deleteBtn = target.closest(".js-history-delete");
      if (deleteBtn) {
        const id = deleteBtn.getAttribute("data-id") || "";
        if (id) deleteHistory(id);
      }
    });
    (_g = $("#js-btn-clear-history")) == null ? void 0 : _g.addEventListener("click", () => {
      if (loadHistory().length && !window.confirm("\u786E\u5B9A\u6E05\u7A7A\u5168\u90E8\u68C0\u6D4B\u5386\u53F2\uFF1F")) return;
      clearHistory();
    });
    renderHistory();
    renderResults();
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
