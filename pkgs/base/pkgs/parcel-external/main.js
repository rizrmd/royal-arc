const fs = require("fs");
const path = require("path");
const { Resolver } = require("@parcel/plugin");

module.exports = new Resolver({
  async resolve({ specifier }) {
    // first specifier is always input filename,
    if (!this.external) {
      const root = path.dirname(specifier);

      let pkgJSONPath = path.join(root, "package.json");
      if (!fs.existsSync(pkgJSONPath)) {
        pkgJSONPath = path.join(root, "..", "package.json");
      }

      if (fs.existsSync(pkgJSONPath)) {
        const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));
        this.external = pkgJSON.external || [];
      }
    }

    if (this.external.includes(specifier)) {
      return { isExcluded: true };
    }

    return null;
  },
});
