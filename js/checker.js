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
  var PLUGIN_PATTERNS = [
    /^slick(-|$)/,
    /^ps(__|-|$)/,
    /^iconfont$/,
    /^icon-/
  ];
  function isPlugin(name) {
    return PLUGIN_PATTERNS.some((re) => re.test(name));
  }
  function splitTokens(name) {
    return name.split("-").filter(Boolean);
  }
  function looksLikePinyin(name) {
    return splitTokens(name).some((t) => PINYIN_TOKENS.has(t.toLowerCase()));
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
    const scored = list.filter((ex) => ex.to && ex.to !== original && matchesClassPattern(ex.to)).map((ex) => {
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
      const clean = to.replace(/--+/g, (m) => m.length > 2 ? "--" : m).replace(/^-+|-+$/g, "");
      if (!clean || clean === name || !matchesClassPattern(clean)) return;
      examples.push({ from: name, to: clean, note });
    };
    if (codes.has("pattern") || codes.has("js-hook")) {
      patternFixCandidates(name).forEach((ex) => push(ex.to, ex.note));
    }
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
    const patternOnly = codes.size > 0 && [...codes].every((code) => code === "pattern" || code === "js-hook");
    if (!patternOnly) {
      lexiconExampleCandidates(tokens).forEach((ex) => push(ex.to, ex.note));
    }
    for (const issue of issues) {
      const tip = (issue.suggestion || "").trim();
      if (!tip || /[\s/→,]/.test(tip)) continue;
      if (/^[a-z][a-z0-9-]*$/.test(tip) && matchesClassPattern(tip) && similarityToOriginal(name, tip) >= 0.35) {
        push(tip, "\u6765\u81EA\u68C0\u6D4B\u5EFA\u8BAE\u7684\u76F4\u63A5\u6539\u540D");
      }
    }
    return uniqueExamples(examples, name);
  }
  var CLASS_PATTERN = /^(?:(?:is|has)-[a-z0-9]+(?:-[a-z0-9]+)*|(?:l|g|u)-[a-z0-9]+(?:-[a-z0-9]+)*|[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?)$/;
  var KEBAB_NAME = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
  function isJsHookClass(name) {
    return name === "js" || /^js(?:-|__|--)/.test(name);
  }
  function matchesClassPattern(name) {
    return CLASS_PATTERN.test(name) && !isJsHookClass(name);
  }
  function classifyClass(name) {
    if (/^(?:is|has)-/.test(name)) {
      return { kind: "state", message: "\u72B6\u6001\u7C7B\uFF1Ais-* / has-*" };
    }
    if (/^l-/.test(name)) return { kind: "atomic", message: "\u5E03\u5C40\u547D\u540D\u7A7A\u95F4\uFF1Al-*" };
    if (/^g-/.test(name)) return { kind: "atomic", message: "\u5168\u5C40\u547D\u540D\u7A7A\u95F4\uFF1Ag-*" };
    if (/^u-/.test(name)) return { kind: "atomic", message: "\u5DE5\u5177\u547D\u540D\u7A7A\u95F4\uFF1Au-*" };
    if (name.includes("__") && name.includes("--")) {
      return { kind: "structure", message: "BEM\uFF1Ablock__element--modifier" };
    }
    if (name.includes("__")) return { kind: "structure", message: "BEM \u5143\u7D20\uFF1Ablock__element" };
    if (name.includes("--")) return { kind: "module", message: "BEM \u4FEE\u9970\u7B26\uFF1Ablock--modifier" };
    return { kind: "module", message: "BEM \u5757\uFF1A\u5C0F\u5199\u77ED\u6A2A\u7EBF block" };
  }
  function cleanBemChunk(chunk) {
    return chunk.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").replace(/[^a-z0-9-]+/gi, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  }
  function flattenBem(name) {
    const mods = name.split(/--+/);
    const elements = (mods[0] || "").split(/__+/);
    const block = cleanBemChunk(elements[0] || "");
    const element = elements.slice(1).map(cleanBemChunk).filter(Boolean).join("-");
    const modifier = mods.slice(1).map(cleanBemChunk).filter(Boolean).join("-");
    let out = block;
    if (element) out += `__${element}`;
    if (modifier) out += `--${modifier}`;
    return out;
  }
  function isDanglingPrefix(name) {
    return /^(?:is|has|js|l|g|u)-+$/.test(name.trim());
  }
  function patternFixCandidates(name) {
    const out = [];
    const push = (to, note) => {
      if (!to || to === name || !matchesClassPattern(to)) return;
      if (out.some((ex) => ex.to === to)) return;
      out.push({ from: name, to, note });
    };
    if (isDanglingPrefix(name)) return out;
    if (isJsHookClass(name)) {
      const stripped = name.replace(/^js(?:-|__|--)?/, "");
      push(stripped, "\u53BB\u6389 js-\uFF1A\u7981\u6B62\u5728 CSS \u91CC\u4E3A JS \u94A9\u5B50\u5199\u6837\u5F0F");
      push(toKebab(stripped).replace(/^-+|-+$/g, ""), "\u53BB\u6389 js- \u5E76\u6539\u4E3A kebab-case");
    }
    const flat = flattenBem(name);
    const hasDoubleElement = name.split(/__+/).length > 2;
    const hasDoubleModifier = name.split(/--+/).length > 2;
    if (hasDoubleElement || hasDoubleModifier) {
      push(flat, "BEM \u53EA\u4FDD\u7559\u4E00\u5C42 __ \u548C\u4E00\u5C42 --\uFF0C\u5176\u4F59\u6539\u6210\u77ED\u6A2A\u7EBF");
    }
    push(flat, "\u6574\u7406\u4E3A\u5408\u6CD5\u7C7B\u540D\uFF0C\u5C3D\u91CF\u4FDD\u7559\u539F\u8BCD");
    const kebab = toKebab(name).replace(/^-+|-+$/g, "");
    push(kebab, "\u6539\u4E3A\u5168\u5C0F\u5199\u77ED\u6A2A\u7EBF");
    if (/_/.test(name) && !name.includes("__")) {
      const asElement = flattenBem(name.replace(/_+/g, "__"));
      push(asElement, "\u82E5\u8868\u793A\u5143\u7D20\uFF0C\u628A\u4E0B\u5212\u7EBF\u6539\u6210 BEM __");
    }
    if (/^\d/.test(kebab)) push(`block-${kebab}`, "\u7C7B\u540D\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\uFF0C\u8865\u5757\u540D\u524D\u7F00");
    const stem = kebab.replace(/^js-/, "").replace(/^-+|-+$/g, "");
    const skipRolePrefix = isJsHookClass(name) || /^\d/.test(kebab);
    if (!skipRolePrefix && stem && stem !== kebab && !/^(?:is|has|js|l|g|u)$/.test(stem)) {
      push(stem, "\u53BB\u6389 js- \u524D\u7F00");
    }
    if (!skipRolePrefix && stem && !/^(?:is|has|l|g|u)-/.test(stem) && !isJsHookClass(stem) && !/^(?:is|has|js|l|g|u)$/.test(stem)) {
      push(`is-${stem}`, "\u82E5\u662F\u72B6\u6001\uFF0C\u6539\u4E3A is-*");
      push(`u-${stem}`, "\u82E5\u662F\u5DE5\u5177\u7C7B\uFF0C\u6539\u4E3A u-*");
      push(`l-${stem}`, "\u82E5\u662F\u5E03\u5C40\u7C7B\uFF0C\u6539\u4E3A l-*");
    }
    return out;
  }
  function checkClassName(raw) {
    var _a, _b;
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
    if (isPlugin(name) && !isJsHookClass(name) && matchesClassPattern(name)) {
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
    if (!matchesClassPattern(name)) {
      if (isJsHookClass(name)) {
        const stripped = name.replace(/^js(?:-|__|--)?/, "");
        issues.push({
          code: "js-hook",
          severity: "fail",
          message: "\u4E25\u7981\u5728 CSS \u4E2D\u4E3A js-* \u94A9\u5B50\u7F16\u5199\u6837\u5F0F",
          suggestion: stripped || "submit-btn"
        });
      } else {
        const fixes = [...patternFixCandidates(name)].sort(
          (a, b) => similarityToOriginal(name, b.to) - similarityToOriginal(name, a.to)
        );
        issues.push({
          code: "pattern",
          severity: "fail",
          message: "\u4E0D\u7B26\u5408 selector-class-pattern\uFF1A\u8BF7\u4F7F\u7528 BEM\uFF08block / block__el / block--mod\uFF09\u3001\u72B6\u6001\u7C7B\uFF08is-/has-\uFF09\u6216\u547D\u540D\u7A7A\u95F4\uFF08l-/g-/u-\uFF09",
          suggestion: (_a = fixes[0]) == null ? void 0 : _a.to
        });
      }
    } else {
      const info = classifyClass(name);
      issues.push({
        code: "pattern-ok",
        severity: "pass",
        message: info.message
      });
    }
    const hasProblem = issues.some((i) => i.severity === "fail" || i.severity === "warn");
    const filtered = hasProblem ? issues.filter((i) => i.severity !== "pass") : issues;
    if (!filtered.length) {
      filtered.push({ code: "ok", severity: "pass", message: "\u7B26\u5408\u547D\u540D\u89C4\u8303" });
    }
    const severity = worstSeverity(filtered);
    const kind = matchesClassPattern(name) ? classifyClass(name).kind : "unknown";
    const examplePool = severity === "fail" || severity === "warn" ? buildOptimizeExamples(name, filtered) : void 0;
    return {
      name,
      kind,
      severity,
      issues: filtered,
      suggestion: (_b = filtered.find((i) => i.suggestion)) == null ? void 0 : _b.suggestion,
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
  function stripScssComments(source) {
    return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  }
  function makeStructuralResult(name, message, suggestion) {
    const issues = [{ code: "scss-structure", severity: "fail", message, suggestion }];
    const replacement = suggestion && suggestion !== name ? name.startsWith("@mixin ") ? `@mixin ${suggestion}` : name.startsWith("@function ") ? `@function ${suggestion}` : suggestion : "";
    const pool = replacement ? [{ from: name, to: replacement, note: "\u6539\u4E3A kebab-case" }] : void 0;
    return {
      name,
      kind: "unknown",
      severity: "fail",
      issues,
      suggestion,
      examplePool: pool,
      exampleCursor: 0,
      examples: pool ? sliceExampleBatch(pool, 0) : void 0
    };
  }
  function analyzeScss(source) {
    const text = stripScssComments(source);
    const results = [];
    const seen = /* @__PURE__ */ new Set();
    const push = (name, message, suggestion) => {
      const key = `${name}|${message}`;
      if (seen.has(key)) return;
      seen.add(key);
      results.push(makeStructuralResult(name, message, suggestion));
    };
    for (const match of text.matchAll(/\$([A-Za-z_][\w-]*)/g)) {
      if (!KEBAB_NAME.test(match[1])) {
        push(`$${match[1]}`, "SCSS \u53D8\u91CF\u540D\u5FC5\u987B\u91C7\u7528 kebab-case\uFF0C\u4F8B\u5982 $color-primary", `$${toKebab(match[1])}`);
      }
    }
    for (const match of text.matchAll(/@mixin\s+([A-Za-z_][\w-]*)/g)) {
      if (!KEBAB_NAME.test(match[1])) {
        push(`@mixin ${match[1]}`, "Mixin \u540D\u79F0\u5FC5\u987B\u91C7\u7528 kebab-case", toKebab(match[1]));
      }
    }
    for (const match of text.matchAll(/@function\s+([A-Za-z_][\w-]*)/g)) {
      if (!KEBAB_NAME.test(match[1])) {
        push(`@function ${match[1]}`, "Function \u540D\u79F0\u5FC5\u987B\u91C7\u7528 kebab-case", toKebab(match[1]));
      }
    }
    const stack = [];
    let ruleDepth = 0;
    let buf = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ";") {
        buf = "";
        continue;
      }
      if (ch === "{") {
        const header = buf.trim();
        buf = "";
        const at = header.match(/^@([a-zA-Z-]+)/);
        const ignoreAt = !!at && ["media", "supports", "include"].includes(at[1].toLowerCase());
        const pseudoOnly = /^(?:&?::?[a-z-]+(?:\([^)]*\))?)(?:\s*,\s*&?::?[a-z-]+(?:\([^)]*\))?)*$/i.test(header) && !header.includes(".");
        const counts = !!header && !ignoreAt && !pseudoOnly && !at;
        if (counts) ruleDepth += 1;
        if (counts && ruleDepth > 3) {
          push(header.slice(0, 60), `\u5D4C\u5957\u6DF1\u5EA6 ${ruleDepth} \u8D85\u8FC7\u4E0A\u9650 3\uFF08\u4F2A\u7C7B\u3001@media\u3001@supports\u3001@include \u4E0D\u8BA1\u5165\uFF09`);
        }
        if (header && !at) {
          header.split(",").forEach((sel) => {
            const selector = sel.trim();
            if (!selector) return;
            if (/#[A-Za-z_][\w-]*/.test(selector)) {
              push(selector.slice(0, 60), "\u7981\u7528 ID \u9009\u62E9\u5668\uFF08selector-max-id: 0\uFF09");
            }
            const compounds = selector.replace(/&/g, " ").split(/\s*(?:>|\+|~)\s*|\s+/).filter((part) => part && part !== "&");
            if (compounds.length > 3) {
              push(selector.slice(0, 60), `\u590D\u5408\u9009\u62E9\u5668\u6709 ${compounds.length} \u6BB5\uFF0C\u6700\u591A\u5141\u8BB8 3 \u6BB5`);
            }
          });
        }
        stack.push(counts);
        continue;
      }
      if (ch === "}") {
        if (stack.pop()) ruleDepth = Math.max(0, ruleDepth - 1);
        buf = "";
        continue;
      }
      if (ch !== "\n" && ch !== "\r") buf += ch;
      else if (buf.trim() && !buf.includes("{")) {
        buf += " ";
      }
    }
    return results;
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
  function displayToken(name) {
    if (/^[.$#@]/.test(name) || /\s/.test(name)) return name;
    return `.${name}`;
  }
  function kindLabel(kind) {
    const map = {
      atomic: "\u547D\u540D\u7A7A\u95F4 l/g/u",
      page: "\u9875\u9762\u7C7B",
      module: "BEM \u5757",
      structure: "BEM \u5143\u7D20",
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
    var _a, _b;
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
      if ((from.startsWith("$") || from.startsWith("@")) && input.value.includes(from)) {
        input.value = input.value.replace(from, to);
        runCheck(false);
        const adopted = ((_a = $("#js-naming-input")) == null ? void 0 : _a.value) || "";
        pushHistory(adopted, summarize(state.results), {
          adopt: { from, to },
          dedupe: false
        });
        return;
      }
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
    const current = ((_b = $("#js-naming-input")) == null ? void 0 : _b.value) || "";
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
    state.results = names.map((name) => {
      const result = checkClassName(name);
      if (state.mode !== "html" || !isJsHookClass(result.name) || result.severity !== "fail") return result;
      return {
        ...result,
        kind: "js-hook",
        severity: "info",
        issues: [{
          code: "js-hook-html",
          severity: "info",
          message: "JS \u94A9\u5B50\u53EF\u4EE5\u5199\u5728 HTML \u4E0A\uFF0C\u4F46\u4E0D\u8981\u5728 CSS \u91CC\u4E3A\u5B83\u5199\u6837\u5F0F"
        }],
        suggestion: void 0,
        examplePool: void 0,
        examples: void 0
      };
    });
    if (state.mode === "scss") {
      state.results = state.results.concat(analyzeScss(input));
    }
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
                <code class="is-from">${escapeHtml(displayToken(ex.from || r.name))}</code>
                <span class="checker-optimize-arrow">\u2192</span>
                <code class="is-to">${escapeHtml(displayToken(ex.to))}</code>
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
          <code class="checker-class-name">${escapeHtml(displayToken(r.name))}</code>
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
      lines.push(`[${severityLabel(r.severity)}] ${displayToken(r.name)}\uFF08${kindLabel(r.kind)}\uFF09`);
      r.issues.forEach((i) => {
        lines.push(`  - ${i.message}${i.suggestion ? ` \u2192 ${i.suggestion}` : ""}`);
      });
      (r.examples || []).forEach((ex) => {
        lines.push(`  \xB7 \u4F18\u5316\uFF1A${displayToken(ex.from || r.name)} \u2192 ${displayToken(ex.to)}\uFF08${ex.note}\uFF09`);
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
        input.placeholder = "\u7C98\u8D34 SCSS/CSS\u3002\u4F1A\u6821\u9A8C\u7C7B\u540D\uFF0C\u4EE5\u53CA\u5D4C\u5957\u6DF1\u5EA6\u3001ID \u9009\u62E9\u5668\u3001\u590D\u5408\u9009\u62E9\u5668\u3001$\u53D8\u91CF / mixin / function \u547D\u540D\u2026";
      } else {
        input.placeholder = "\u6BCF\u884C\u4E00\u4E2A\u7C7B\u540D\uFF0C\u6216\u7528\u7A7A\u683C / \u9017\u53F7\u5206\u9694\u2026\n\u901A\u8FC7\uFF1Ablock\u3001block__el\u3001block--mod\u3001is-active\u3001l-grid\u3001u-mt-8\n\u4E0D\u901A\u8FC7\uFF1Ajs-submit-btn\u3001ProductCard\u3001block__el__sub";
      }
    }
    if (hint) {
      const hints = {
        list: "\u89C4\u5219\uFF1ABEM\uFF08block / block__el / block--mod\uFF09\u3001\u72B6\u6001\u7C7B is-/has-\u3001\u547D\u540D\u7A7A\u95F4 l-/g-/u-\u3002\u7981\u6B62\u7ED9 js-* \u5199\u6837\u5F0F\u3002",
        html: "\u4ECE HTML \u63D0\u53D6 class \u5E76\u6309 selector-class-pattern \u68C0\u6D4B\u3002js-* \u5141\u8BB8\u51FA\u73B0\u5728 HTML\uFF0C\u4F46\u4E0D\u80FD\u5728 CSS \u91CC\u5199\u6837\u5F0F\u3002",
        scss: "\u7C7B\u540D + \u5D4C\u5957\u22643 + \u7981\u6B62 ID + \u590D\u5408\u9009\u62E9\u5668\u22643 + \u53D8\u91CF/mixin/function \u4F7F\u7528 kebab-case"
      };
      hint.textContent = hints[mode];
    }
  }
  function fillExamples() {
    const input = $("#js-naming-input");
    if (!input) return;
    if (state.mode === "html") {
      input.value = `<div class="cart cart__item is-selected js-cart-item">
  <button class="cart__submit u-mt-8 ProductCard">Add</button>
</div>`;
    } else if (state.mode === "scss") {
      input.value = `$color-primary: #ea6025;
$ColorPrimary: #000;

@mixin text-truncate {}
@mixin TextTruncate {}

.cart {
  .cart__item {
    &.is-selected {}
    .cart__price {
      .cart__num {}
    }
  }
}
#app .cart {}
.a .b .c .d {}
.js-submit-btn {}
.block__el__sub {}`;
    } else {
      input.value = [
        "cart",
        "cart__item",
        "cart--compact",
        "cart__item--selected",
        "is-active",
        "has-error",
        "l-grid",
        "g-container",
        "u-mt-8",
        "u-text-truncate",
        "js-submit-btn",
        "ProductCard",
        "product_card",
        "block__el__sub",
        "block--mod--extra",
        "1item"
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
