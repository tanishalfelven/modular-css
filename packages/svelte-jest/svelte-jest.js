"use strit";

const search = (tag) => new RegExp(`<${tag}([\\S\\s]*?)>([\\S\\s]*?)<\\/${tag}>`, "ig");
const refRegex = /css\.(\w+)/gim;

module.exports = (html) =>
    html
        .replace(search("style"), "")
        .replace(search("link"), "")
        .replace(/<link([^>]*)>\r?\n?/ig, "")
        .replace(refRegex, (match, name) => JSON.stringify(name));
