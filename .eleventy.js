module.exports = (eleventyConfig) => {
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html')

  eleventyConfig.addPassthroughCopy({ './src/static/css': 'css' })

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      output: '_site'
    },
    templateFormats: ['html', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
