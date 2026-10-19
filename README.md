# CSS 选择器命名规范检测

纯静态页面，不依赖后端。上传到 GitHub 后用 GitHub Pages 即可在线运行。

按 Stylelint `selector-class-pattern` 检测类名：

| 类型 | 通过条件 |
|------|----------|
| BEM | `block`、`block__element`、`block--modifier`、`block__element--modifier`（只允许一层 `__` 和一层 `--`） |
| 状态类 | `is-*`、`has-*` |
| 命名空间 | `l-*` 布局、`g-*` 全局、`u-*` 工具 |
| JS 钩子 | `js-*` 不能作为 CSS 类名使用 |

SCSS 模式还会检查：嵌套深度 ≤ 3（伪类、`@media`、`@supports`、`@include` 不计）、禁用 ID、复合选择器 ≤ 3、变量 / mixin / function 使用 kebab-case。

## 上传并运行

1. 在 GitHub 新建一个空仓库（不要勾选添加 README，避免和本目录冲突）。
2. 把**本目录里的全部文件**作为仓库根目录推上去，目录结构应是：

```text
index.html
README.md
.nojekyll
css/
js/
.github/workflows/pages.yml
```

3. 打开仓库 **Settings → Pages**：
   - Source 选 **GitHub Actions**
4. 推送后等待 Actions 里的 `Deploy GitHub Pages` 变绿。
5. 页面地址一般是：

```text
https://<用户名>.github.io/<仓库名>/
```

仓库名如果是 `<用户名>.github.io`，地址就是 `https://<用户名>.github.io/`。

## 本地预览

在本目录执行：

```bash
npx --yes serve .
```

浏览器打开终端里给出的地址即可。直接双击 `index.html` 也能用。
