/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://xn--zim-frderung-beantragen-oec.de",
  generateRobotsTxt: false, // We have a static robots.txt
  outDir: "./out",
  trailingSlash: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin", "/admin/"],
  transform: async (config, path) => {
    // Higher priority for main pages
    const priorities = {
      "/": 1.0,
      "/zim-rechner/": 0.9,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
