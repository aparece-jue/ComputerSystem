import { Plugin } from "obsidian";

export default class ASMSyntaxHighlightPlugin extends Plugin {
  async onload() {
    console.log("[ASM Plugin] ✅ Plugin loading (Prism highlighting only)...");

    this.registerMarkdownPostProcessor((el, ctx) => {
      el.querySelectorAll("code.language-x86asm").forEach((block) => {
        block.classList.add("language-x86asm");
        if ((window as any).Prism) {
          (window as any).Prism.highlightElement(block as HTMLElement);
        }
      });
    });
  }

  onunload() {
    console.log("[ASM Plugin] 🛑 Plugin unloaded");
  }
}
