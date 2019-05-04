"use strict";

const dedent = require("dedent");

const sveltejest = require("../svelte-jest.js");

describe("svelte-jest", () => {
    it("should update all {css.foo} references in the template to use their name only", () => {
        const html = dedent(`
        <link rel="stylesheet" href="./style.css" />

        <div class="{css.one}">
            <p class="{foo ? css.two : css.three}">
                CONTENT
            </p>
        </div>
        `);

        const result = sveltejest(html);

        expect(result).toMatchSnapshot();
    });
    
    it("should update all css.foo references in <script> blocks to use their name only", () => {
        const html = dedent(`
        <link rel="stylesheet" href="./style.css" />

        <script>
            export default {
                oncreate() {
                    if(true) {
                        console.log(css.foo);
                    }

                    this.set({
                        style : css.bar
                    });
                }
            };
        </script>
        `);

        const result = sveltejest(html);

        expect(result).toMatchSnapshot();
    });
});
