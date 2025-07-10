import { Plugin } from "obsidian";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
// 自定义关键词高亮正则匹配方案（无语法树支持）
import { StreamLanguage } from "@codemirror/stream-parser";
import { defineAsmLanguage } from "./stream-asm"; // 我会在下方给出这个文件内容
export default class ASMSyntaxHighlightPlugin extends Plugin {
    async onload() {
        console.log("[ASM Plugin] ✅ Plugin loading (string-based highlighting)...");
        // 自定义高亮样式
        const asmHighlightStyle = HighlightStyle.define([
            { tag: tags.keyword, color: "#d73a49" },
            { tag: tags.comment, color: "#6a737d", fontStyle: "italic" },
            { tag: tags.number, color: "#005cc5" },
            { tag: tags.variableName, color: "#e36209" }
        ]);
        // 定义编辑器支持：使用 stream-parser 实现关键词识别
        const asmLang = StreamLanguage.define(defineAsmLanguage());
        const asmExtension = [
            asmLang,
            syntaxHighlighting(asmHighlightStyle)
        ];
        this.registerEditorExtension(asmExtension);
        console.log("[ASM Plugin] ✅ Editor highlighter registered");
        // Prism 阅读视图渲染
        this.registerMarkdownCodeBlockProcessor("x86asm", async (source, el) => {
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.className = "language-x86asm";
            code.textContent = source;
            pre.appendChild(code);
            el.appendChild(pre);
            await window.Prism?.highlightElement(code);
        });
        console.log("[ASM Plugin] ✅ Prism reader registered");
    }
    onunload() {
        console.log("[ASM Plugin] 🛑 Plugin unloaded");
    }
}
