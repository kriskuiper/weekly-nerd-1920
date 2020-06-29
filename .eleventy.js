const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = (eleventyConfig) => {
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html')
  eleventyConfig.addLayoutAlias('note', 'layouts/note.html')
  eleventyConfig.addLayoutAlias('thing', 'layouts/thing.html')

  eleventyConfig.addPassthroughCopy({ './src/static/css': 'css' })
  eleventyConfig.addPassthroughCopy({ './src/static/images': 'images' })

  eleventyConfig.addPlugin(syntaxHighlight)

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
