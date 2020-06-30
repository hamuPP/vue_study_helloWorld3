/**
 * Created by tangyue on 20/4/27
 */

module.exports = {
  lintOnSave:false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/indexCCC.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    }
  }
};