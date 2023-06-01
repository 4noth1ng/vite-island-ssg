1. bin 的作用
   package.json 的 bin 字段 可以定义命令，在安装依赖的过程中会安装到全局环境中，即比如定义了 island 命令，我们可以直接在终端使用 island 进行执行 island 字段对应的文件.
2. 入口 HTML 文件响应

3. 主题 渲染

4. 接入 HMR
   transformIndexHtml + react plugin
   In middleware mode, you should make sure your entry index.html file is transformed by Vite.

5. SSR 同构体系

- 同样的代码既运行在客户端也运行在服务端

6. 关于打包 build

- 打包 client 端 + server 端
  client 端为 esm 格式，server 端为 cjs 格式

- 引入 server-entry 模块
  server-entry 模块导出了 render 方法，利用了 react-router 提供的 StaicRouter 和 react 提供的 RenderToString, 产出对应路由的 html
- 服务端渲染，产出 html 文件

7. 引入 tsup 进行库构建

- tsup 打包 ts 文件并产出 cjs, esm 格式

8. 配置文件解析

- 利用 vite 提供的`loadConfigFromFile`解析配置文件，

9. 配置文件的热更新

- 前置条件：我们编写了一个 configPlugin，用来组装配置信息，通过虚拟模块注入
- 利用 plugin 提供的`handleHotUpdate`钩子，在 config 更新时进行相关操作。
- 方案 1：重启 vite dev server，无效果，因为没有重新读取配置文件
- 方案 2: 将 dev.ts 单独打包, 并修改 dev 启动的逻辑，在 createServer 时，我们提供一个动态引入 dev.js 并重新启动 dev server 的方法，然后在`handleHotUpdate`钩子内使用该方法达到更新效果, 由于 dev.js 内我们会解析 config.ts 的内容，所以可以达到更新效果。

10. 约定式路由

- 一般情况下，我们需要手动编写路由信息在客户端使用，约定式路由即读取对应文件夹下的文件进行路由信息的拼接。
- 同时，使用虚拟模块将信息注入，所以可以直接 import 得到路由信息

11. 关于 noExternal
    在构建时，我们将 react-router-dom(后续还有 lodash-es)这种包放到 noExternal 当中。由于这些包是纯 ESM 的包，而我们打包的产物为 CJS 格式的，不能使用 ESM 的包（不加入 noExternal，vite 会将其当做外部依赖在打包中直接保留），总结说 noExternal 就是将其加入构建过程中。

12. MDX
    markdown + jsx

13. index.mdx 热更新失效问题

- index.mdx 作为 Content 组件匹配到的路由组件，因此 vite 在热更新时将热更新的边界定为了 Content.tsx, 这导致 index.mdx 自身的热更新失效。举例子而言，index.mdx 内组件状态会丢失。
- 因此，我们要自定义 index.mdx 热更新时的逻辑, 即使用`import.meta.hot.accept`, 当 index.mdx 变化时，加入恢复 index.mdx 组件状态逻辑的效果。

14. 多路由打包
    在 dev server 下，我们是 SPA，所以我们在进行路由信息的拼接时，我们需要使用 loadable 达到按需加载的效果，以免直接全量请求。
    在 SSR/SSG 下，js 是在本地磁盘读取，所以我们不需要在按需加载, 静态 import 即可
    多路由打包，即生成多个 html 文件，我们只需 build 时遍历 route 信息调用 render 生成 html 即可

15. 数据自动组装页面
    获取 mdx 信息，遍历生成组件相关内容即可

16. TOC 热更新问题
    当我们在 index.mdx 添加或删除标题时，右侧的 ASide 并没有进行热更新, 因为 index.mdx 对应的是 Content 的内容，所以我们也需要自定义热更新内容。

17. 传统 SSR、SSR 同构与 islands 架构
    传统 SSR：服务端将所有 JS 执行完毕并注入 HTML 中，客户端只充当展示 HTML 文件的媒介
    SSR 同构：即服务端和客户端能执行相同的代码，现代 SSR 的流程是：服务端提供完整的 HTML，然后请求 JS 脚本并执行（状态管理、路由跳转、交互相关），对比 SPA，SPA 的 html 通过 JS 脚本执行渲染，所以白屏时间会更长，但从网络 IO 的角度讲，两者并无大的区别
    islands 架构：孤岛架构，这种架构的前提是只有部分可交互组件，比起 SSR 同构，优点在于无需执行全量的注水操作。

18. 实现 island 组件的标记

首先使用`__island`prop 标记 island 的组件
import { Aside } from '../components/Aside';

export function Layout() {
return <Aside __island />;
}
然后使用 babel 进行转化
// 转换前

<Aside __island />

// 转换后

<Aside __island="../comp/id.ts!!ISLAND!!/User/import.ts" />
最后达到

```
import { Aside } from '../components/Aside';

export function Layout() {
  return <Aside __island="/Users/project/src/components/Aside.tsx" />;
}
```

这样我们就能记录下所有 island 组件的路径信息，从而进行打包，形成 island bundle，并将组件挂载到 window 对象上

因此，我们需要两个插件，一个是 babel 插件，完成编译时 island 组件路径信息的注入
另一个是运行时插件，拦截 Islands 组件，记录 island 组件的路径以及内容
最后将其单独打包，挂载到全局对象上，并注入到 html 中

19. 打包 islands 组件代码
    首先根据标记以及标记组件的信息进行拼接，比如将```ts
    {
    Aside: 'some-path'
    }

````
转化为
    ```ts
    import { Aside } from 'some-path';
// 全局注册 Islands 组件
window.ISLANDS = { Aside }
// 注册 Islands 组件的 props 数据
window.ISLAND_PROPS = JSON.parse(
document.getElementById('island-props').textContent
)

````
