const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Pass through copy for CSS, JS, and CMS Admin
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Filter to format dates
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
  // Custom collection for the articles to sort by date
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Custom collection for Bible Study entries
  eleventyConfig.addCollection("bibleStudy", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/bible-study/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
