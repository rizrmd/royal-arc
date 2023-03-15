const fs = require("fs");
const path = require("path");
const { Resolver } = require("@parcel/plugin");

module.exports = new Resolver({
  async resolve({ specifier }) {
    if (!this.exclude) {
      const pkgJSONPath = path.join(path.dirname(specifier), "package.json");
      const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));

      this.exclude = pkgJSON.exclude || [];
    }

    if (this.exclude.includes(specifier)) {
      return { isExcluded: true };
    }

    return null;
  },
});
