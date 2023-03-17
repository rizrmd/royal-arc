const fs = require("fs");
const path = require("path");
const { Resolver } = require("@parcel/plugin");

module.exports = new Resolver({
  async resolve({ specifier }) {
    // first specifier is always input filename,
    if (!this.exclude) {
      const root = path.dirname(specifier);

      let pkgJSONPath = path.join(root, "package.json");
      if (!fs.existsSync(pkgJSONPath)) {
        pkgJSONPath = path.join(root, "..", "package.json");
      }

      if (fs.existsSync(pkgJSONPath)) {
        const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));
        this.exclude = pkgJSON.exclude || [];
      }
    }

    if (this.exclude.includes(specifier)) {
      return { isExcluded: true };
    }

    return null;
  },
});
