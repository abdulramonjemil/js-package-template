module.exports = {
  "*.js":
    /** @param {string[]} filenames */
    (filenames) => {
      const filenamesWithSingleQuotes = filenames
        .map((filename) => `'${filename}'`)
        .join(" ")

      return [
        `eslint ${filenamesWithSingleQuotes}`,
        `prettier --check ${filenamesWithSingleQuotes}`,
        "tsc -p tsconfig.json --noEmit"
      ]
    },
  "*.{json,md}": "prettier --check"
}
