"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ASMSyntaxHighlightPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var ASMSyntaxHighlightPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("[ASM Plugin] \u2705 Plugin loading (Prism highlighting only)...");
    this.registerMarkdownPostProcessor((el, ctx) => {
      el.querySelectorAll("code.language-x86asm").forEach((block) => {
        block.classList.add("language-x86asm");
        if (window.Prism) {
          window.Prism.highlightElement(block);
        }
      });
    });
  }
  onunload() {
    console.log("[ASM Plugin] \u{1F6D1} Plugin unloaded");
  }
};
//# sourceMappingURL=main.js.map
