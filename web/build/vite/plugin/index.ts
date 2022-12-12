import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import VitePluginCertificate from 'vite-plugin-mkcert'
import { configHtmlPlugin } from './html'
import { configPwaConfig } from './pwa'
import { configMockPlugin } from './mock'
import { configCompressPlugin } from './compress'
import { configVisualizerConfig } from './visualizer'
import { configImageminPlugin } from './imagemin'
import { configSvgIconsPlugin } from './svgSprite'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    VitePluginCertificate({
      source: 'coding',
    }),
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver({
    //       // importStyle: 'less',
    //     }),
    //   ],
    // }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        // 插件预设支持导入的api
        'vue',
        'vue-router',
        'pinia',
      ],
    }),
    createStyleImportPlugin({
      resolves: [VxeTableResolve()],
    }),
  ]
  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())
  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv))
  }

  return vitePlugins
}
