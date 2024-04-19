import { defineConfig } from 'dumi';

// 此处更换为自己的仓库名
let base: string | undefined = '/pomelo/';
let publicPath: string | undefined = '/pomelo/';

if (process.env.SITE_BUILD_ENV === 'PREVIEW') {
  base = undefined;
  publicPath = undefined;
}

export default defineConfig({
  title: 'pomelo-ui', // 站点名称
  // mode: 'site',
  base, // 部署站点的基础路径
  publicPath, // 静态资源前缀
  outputPath: 'doc-site', // 输出文件夹
  exportStatic: {}, // 后续会部署到 github pages 直接全部生成静态页面 不走前端路由
  // dynamicImport: {}, // 拆包 站点过大时可以优化首屏加载速度
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
    docDirs: ['docs'],
  },
});
