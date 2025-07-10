export function defineAsmLanguage() {
    const keywords = [
        "mov", "add", "sub", "mul", "div",
        "jmp", "je", "jne", "jg", "jl", "jge", "jle",
        "call", "ret", "push", "pop", "cmp",
        "inc", "dec", "fld", "fst", "fadd", "fsub", "fmul", "fdiv"
    ];
    const registers = [
        "eax", "ebx", "ecx", "edx", "esi", "edi", "esp", "ebp",
        "rax", "rbx", "rcx", "rdx", "rsi", "rdi", "rsp", "rbp",
        "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15"
    ];
    const keywordRegex = new RegExp("^(?:" + keywords.join("|") + ")\\b", "i");
    const registerRegex = new RegExp("^(%?(?:" + registers.join("|") + "))\\b", "i");
    const numberRegex = /^[0-9]+/;
    const hexRegex = /^0x[0-9a-f]+/i;
    const commentRegex = /^;.*/;
    return {
        startState() {
            return null;
        },
        token(stream) {
            if (stream.match(commentRegex))
                return "comment";
            if (stream.match(keywordRegex))
                return "keyword";
            if (stream.match(registerRegex))
                return "variableName";
            if (stream.match(hexRegex) || stream.match(numberRegex))
                return "number";
            stream.next();
            return null;
        }
    };
}
