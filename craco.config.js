const path = require('path')
const CracoLessPlugin = require('craco-less');
const { loaderByName } = require('@craco/craco');
const lessModuleRegex = /\.module\.less$/;
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
      	// less loader options
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
        
        // modifyLessModuleRule
        // 这个方法在新的版本中已经支持，可以直接来配置 css modules 
        modifyLessModuleRule: (lessModuleRule, context) => {
            lessModuleRule.test = lessModuleRegex;
            // lessModuleRule.exclude = /node_modules|antd\.css/;
            const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
            cssLoader.options.modules = {
            	localIdentName: "[local]_[hash:base64:5]"
            }
            return lessModuleRule;
        },
      },
    },
  ]
}