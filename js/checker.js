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
    "full"
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
    "item2"
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
    "mini",
    "xs",
    "xl"
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
    "itm"
  ]);
  var GOOD_ABBREVS = /* @__PURE__ */ new Set([
    "btn",
    "img",
    "desc",
    "nav",
    "col",
    "row",
    "bg",
    "fw",
    "lh",
    "fs",
    "id",
    "url",
    "api",
    "ui",
    "ux",
    "qty",
    "sku",
    "faq",
    "seo",
    "toc",
    "pdf",
    "csv",
    "xml",
    "json",
    "svg",
    "png",
    "jpg",
    "gif",
    "ico"
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
    "qingkong"
  ]);
  var RECOMMENDED_STATE_HAS = /* @__PURE__ */ new Set([
    "error",
    "value",
    "file",
    "more",
    "scroll",
    "result",
    "success",
    "warning"
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
    "container",
    "row",
    "col"
  ]);
  var ATOMIC_PATTERNS = [
    // 旧式：mt20 mb10 pt8 f16 lh20
    /^(m[trblxy]?|p[trblxy]?)\d{1,3}$/,
    /^f\d{1,2}$/,
    /^lh\d{1,3}$/,
    /^fw(b|n|i|\d{3})$/,
    /^ft\d{1,2}$/,
    // Bootstrap / 项目工具类：mt-14 p-12 text-sm rounded-12 leading-5
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
    /^icon-/,
    /^ui-/,
    /^ko-/,
    /^ng-/,
    /^vue-/
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
  function hasUpperCase(name) {
    return /[A-Z]/.test(name);
  }
  function hasBemConnector(name) {
    return name.includes("__") || /--/.test(name);
  }
  function looksLikePinyin(name) {
    const tokens = splitTokens(name);
    return tokens.some((t) => PINYIN_TOKENS.has(t.toLowerCase()));
  }
  function isVisualNaming(name) {
    const tokens = splitTokens(name);
    if (tokens.length === 0) return false;
    const first = tokens[0];
    const second = tokens[1];
    if (VISUAL_COLORS.has(first) && second && ["title", "text", "btn", "button", "box", "bg", "label", "link", "icon"].includes(second)) {
      return true;
    }
    if (VISUAL_SIZES.has(first) && second && ["box", "text", "title", "btn", "button", "img", "icon", "font"].includes(second)) {
      return true;
    }
    if (/^(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white)-(title|text|btn|button|box|label|link)$/.test(name)) {
      return true;
    }
    if (/^(big|small|large|tiny|huge)-(box|text|title|btn|button|font)$/.test(name)) {
      return true;
    }
    return false;
  }
  function hasBadAbbrev(name) {
    return splitTokens(name).some((t) => BAD_ABBREVS.has(t));
  }
  function isMeaningless(name) {
    if (MEANINGLESS.has(name)) return true;
    if (/^(box|item|div|span|wrap|wrapper|container|temp|test|tmp)\d+$/i.test(name)) return true;
    if (/^[a-z]{1,2}\d{1,3}$/i.test(name)) return true;
    if (/^(temp|test|tmp|demo|foo|bar)(-|$)/i.test(name)) return true;
    return false;
  }
  function classify(name) {
    if (isPlugin(name)) return "plugin";
    if (isAtomic(name)) return "atomic";
    if (name.startsWith("js-")) return "js-hook";
    if (name.startsWith("is-") || name.startsWith("has-")) return "state";
    if (name.startsWith("page-")) return "page";
    const structureHints = [
      "header",
      "body",
      "footer",
      "title",
      "subtitle",
      "desc",
      "label",
      "value",
      "img",
      "icon",
      "link",
      "list",
      "item",
      "row",
      "col",
      "inner",
      "content",
      "mask",
      "panel",
      "trigger",
      "close",
      "open",
      "prev",
      "next"
    ];
    const tokens = splitTokens(name);
    if (tokens.length <= 2 && tokens.some((t) => structureHints.includes(t))) {
      return "structure";
    }
    return "module";
  }
  function worstSeverity(issues) {
    if (issues.some((i) => i.severity === "fail")) return "fail";
    if (issues.some((i) => i.severity === "warn")) return "warn";
    if (issues.some((i) => i.severity === "info")) return "info";
    return "pass";
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
        issues: [{ code: "empty", severity: "fail", message: "\u7C7B\u540D\u4E3A\u7A7A" }]
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
          message: "\u7B2C\u4E09\u65B9\u63D2\u4EF6\u7C7B\uFF0C\u4FDD\u6301\u539F\u6837\uFF1B\u8986\u76D6\u6837\u5F0F\u8BF7\u9650\u5236\u5728\u4E1A\u52A1\u6A21\u5757\u4F5C\u7528\u57DF\u5185"
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
          message: "\u539F\u5B50\u5DE5\u5177\u7C7B\uFF0C\u53EF\u7528\u4E8E\u901A\u7528\u5E03\u5C40\u4E0E\u57FA\u7840\u89C6\u89C9",
          suggestion: "\u52FF\u7528\u539F\u5B50\u7C7B\u505A JS \u9009\u62E9\u5668\uFF1B\u590D\u6742\u4E1A\u52A1\u8BF7\u62BD\u8C61\u7EC4\u4EF6\u7C7B"
        }]
      };
    }
    if (hasUpperCase(name) || name !== name.toLowerCase()) {
      issues.push({
        code: "case",
        severity: "fail",
        message: "\u5FC5\u987B\u4F7F\u7528\u5C0F\u5199\u82F1\u6587",
        suggestion: `\u6539\u4E3A kebab-case\uFF0C\u4F8B\u5982\uFF1A${toKebab(name)}`
      });
    }
    if (name.includes("_") && !name.startsWith("ps__")) {
      issues.push({
        code: "underscore",
        severity: "fail",
        message: "\u4E0D\u4F7F\u7528\u4E0B\u5212\u7EBF\uFF0C\u5E94\u4F7F\u7528\u77ED\u6A2A\u7EBF\u8FDE\u63A5",
        suggestion: name.replace(/_/g, "-").toLowerCase()
      });
    }
    if (hasBemConnector(name) && !name.startsWith("ps__")) {
      issues.push({
        code: "bem",
        severity: "warn",
        message: "\u4E0D\u91C7\u7528 BEM \u7684 __ / -- \u8FDE\u63A5\u7B26",
        suggestion: name.replace(/__/g, "-").replace(/--/g, "-").replace(/-+/g, "-")
      });
    }
    if (/\s/.test(name)) {
      issues.push({
        code: "space",
        severity: "fail",
        message: "\u5355\u4E2A\u7C7B\u540D\u4E0D\u80FD\u5305\u542B\u7A7A\u683C\uFF08\u591A\u4E2A\u7C7B\u8BF7\u5206\u884C\u6216\u7528\u7A7A\u683C\u5206\u9694\u540E\u5206\u522B\u68C0\u6D4B\uFF09"
      });
    }
    if (/[^a-z0-9_-]/i.test(name)) {
      issues.push({
        code: "charset",
        severity: "fail",
        message: "\u7C7B\u540D\u4EC5\u5141\u8BB8\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u4E0E\u77ED\u6A2A\u7EBF"
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
      const prefix = RECOMMENDED_STATE_HAS.has(name) ? "has" : "is";
      issues.push({
        code: "bare-state",
        severity: "fail",
        message: `\u7981\u6B62\u88F8\u72B6\u6001\u7C7B\u300C${name}\u300D\uFF0C\u5BB9\u6613\u9020\u6210\u5168\u5C40\u6837\u5F0F\u51B2\u7A81`,
        suggestion: `${prefix}-${name}`
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
        message: "\u7EAF\u89C6\u89C9\u547D\u540D\uFF0C\u6362\u80A4/\u6539\u7248\u540E\u4F1A\u5931\u6548",
        suggestion: "\u6539\u4E3A\u8BED\u4E49\u547D\u540D\uFF08\u5982 section-title\uFF09\u6216\u4F7F\u7528\u539F\u5B50\u5DE5\u5177\u7C7B"
      });
    }
    if (looksLikePinyin(name)) {
      issues.push({
        code: "pinyin",
        severity: "fail",
        message: "\u4E0D\u4F7F\u7528\u62FC\u97F3\u547D\u540D",
        suggestion: "\u4F7F\u7528\u5BF9\u5E94\u82F1\u6587\u8BED\u4E49\u8BCD\uFF0C\u5982 submit-btn\u3001confirm-btn"
      });
    }
    if (hasBadAbbrev(name)) {
      issues.push({
        code: "bad-abbrev",
        severity: "warn",
        message: "\u7F29\u5199\u4E0D\u591F\u901A\u7528\uFF08\u89C4\u8303\u5141\u8BB8 btn/img/desc/nav\uFF0C\u7981\u6B62 prd/vfy/mdl \u7B49\uFF09",
        suggestion: "\u6539\u7528\u5B8C\u6574\u5355\u8BCD\u6216\u901A\u7528\u7F29\u5199"
      });
    }
    if (name.startsWith("js-")) {
      if (name === "js-" || name === "js") {
        issues.push({
          code: "js-empty",
          severity: "fail",
          message: "js-* \u94A9\u5B50\u9700\u5305\u542B\u5177\u4F53\u884C\u4E3A\u540D",
          suggestion: "js-submit-btn / js-open-modal"
        });
      } else {
        issues.push({
          code: "js-ok",
          severity: "pass",
          message: "JS \u94A9\u5B50\u7C7B\uFF1A\u4EC5\u4F9B\u67E5\u8BE2\u4E0E\u4E8B\u4EF6\u7ED1\u5B9A\uFF0C\u4E0D\u5199 CSS"
        });
      }
    }
    if (name.startsWith("is-") || name.startsWith("has-")) {
      const rest = name.slice(name.indexOf("-") + 1);
      if (!rest) {
        issues.push({
          code: "state-empty",
          severity: "fail",
          message: "\u72B6\u6001\u7C7B\u9700\u5305\u542B\u5177\u4F53\u72B6\u6001\u540D",
          suggestion: name.startsWith("is-") ? "is-active" : "has-error"
        });
      } else if (!issues.some((i) => i.severity === "fail")) {
        issues.push({
          code: "state-ok",
          severity: "pass",
          message: `\u72B6\u6001\u7C7B\uFF08${name.startsWith("is-") ? "is-* \u8868\u793A\u5143\u7D20\u5904\u4E8E\u67D0\u72B6\u6001" : "has-* \u8868\u793A\u5305\u542B\u67D0\u5185\u5BB9/\u7ED3\u679C"}\uFF09`
        });
      }
    }
    if (name.startsWith("page-")) {
      if (name === "page-" || name === "page") {
        issues.push({
          code: "page-empty",
          severity: "fail",
          message: "\u9875\u9762\u7C7B\u9700\u5305\u542B\u9875\u9762\u6807\u8BC6",
          suggestion: "page-product-detail"
        });
      } else if (!issues.some((i) => i.severity === "fail")) {
        issues.push({
          code: "page-ok",
          severity: "pass",
          message: "\u9875\u9762\u7C7B\uFF1A\u7528\u4E8E\u9650\u5236\u9875\u9762\u4E13\u5C5E\u6837\u5F0F\u4F5C\u7528\u57DF"
        });
      }
    }
    if (name.length <= 2 && !GOOD_ABBREVS.has(name) && !isAtomic(name)) {
      issues.push({
        code: "too-short",
        severity: "warn",
        message: "\u7C7B\u540D\u8FC7\u77ED\uFF0C\u8BED\u4E49\u4E0D\u6E05\u6670",
        suggestion: "\u4F7F\u7528\u66F4\u5177\u4E1A\u52A1\u8BED\u4E49\u7684\u547D\u540D"
      });
    }
    if (issues.length === 0 || issues.every((i) => i.severity === "pass") && !issues.some((i) => i.code.endsWith("-ok"))) {
      const kind = classify(name);
      if (kind === "module" || kind === "structure" || kind === "unknown") {
        issues.push({
          code: "semantic-ok",
          severity: "pass",
          message: kind === "structure" ? "\u7ED3\u6784\u7C7B\u547D\u540D\u5408\u7406\uFF1B\u8BF7\u653E\u5728\u6A21\u5757\u4F5C\u7528\u57DF\u4E0B\u7EF4\u62A4\uFF0C\u907F\u514D\u5168\u5C40\u6C61\u67D3" : "\u8BED\u4E49\u5316\u547D\u540D\u5408\u7406\uFF1B\u5EFA\u8BAE\u300C\u4E1A\u52A1\u540D + \u6A21\u5757\u7C7B\u578B\u300D\uFF0C\u5982 product-card\u3001verify-modal"
        });
      }
    }
    const hasProblem = issues.some((i) => i.severity === "fail" || i.severity === "warn");
    const filtered = hasProblem ? issues.filter((i) => i.severity !== "pass") : issues;
    const severity = filtered.length === 0 ? "pass" : worstSeverity(filtered);
    const suggestion = (_a = filtered.find((i) => i.suggestion)) == null ? void 0 : _a.suggestion;
    if (filtered.length === 0) {
      filtered.push({
        code: "ok",
        severity: "pass",
        message: "\u7B26\u5408\u547D\u540D\u89C4\u8303"
      });
    }
    return {
      name,
      kind: classify(name),
      severity,
      issues: filtered,
      suggestion
    };
  }
  function toKebab(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").replace(/-+/g, "-").toLowerCase();
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
  function runCheck() {
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
      const issueHtml = r.issues.map((i) => `
      <li class="checker-issue checker-issue-${i.severity}">
        <span class="checker-issue-msg">${escapeHtml(i.message)}</span>
        ${i.suggestion ? `<span class="checker-issue-tip">\u5EFA\u8BAE\uFF1A<code>${escapeHtml(i.suggestion)}</code></span>` : ""}
      </li>
    `).join("");
      return `
      <article class="checker-result-item is-${r.severity}" data-name="${escapeAttr(r.name)}">
        <div class="checker-result-head">
          <code class="checker-class-name">.${escapeHtml(r.name)}</code>
          <span class="checker-badge checker-badge-${r.severity}">${severityLabel(r.severity)}</span>
          <span class="checker-kind">${kindLabel(r.kind)}</span>
        </div>
        <ul class="checker-issue-list">${issueHtml}</ul>
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
        input.placeholder = "\u6BCF\u884C\u4E00\u4E2A\u7C7B\u540D\uFF0C\u6216\u7528\u7A7A\u683C / \u9017\u53F7\u5206\u9694\uFF0C\u652F\u6301\u6279\u91CF\u68C0\u6D4B\u2026\n\u4F8B\u5982\uFF1A\nproduct-card\nis-active\njs-submit-btn\nred-title\nactive";
      }
    }
    if (hint) {
      const hints = {
        list: "\u652F\u6301\u6279\u91CF\u7C98\u8D34\u7C7B\u540D\uFF0C\u6309\u884C\u6216\u7A7A\u683C/\u9017\u53F7\u5206\u9694",
        html: "\u4ECE HTML \u6279\u91CF\u63D0\u53D6\u5E76\u68C0\u6D4B\u6240\u6709 class",
        scss: "\u4ECE\u6837\u5F0F\u8868\u6279\u91CF\u63D0\u53D6\u7C7B\u9009\u62E9\u5668\u5E76\u68C0\u6D4B"
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
.red-title {}
#productList li a span {}`;
    } else {
      input.value = [
        "product-card",
        "page-product-detail",
        "card-header",
        "is-active",
        "has-error",
        "js-submit-btn",
        "d-flex",
        "mt20",
        "f16",
        "slick-current",
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
        "vfy-modal"
      ].join("\n");
    }
  }
  function init() {
    var _a, _b, _c, _d, _e, _f;
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
    renderResults();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
