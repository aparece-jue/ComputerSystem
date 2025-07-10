import { StreamParser } from "@codemirror/stream-parser";

export function defineAsmLanguage(): StreamParser<unknown> {
  return {
    startState: () => ({}),
    token: (stream, _state) => {
      if (stream.eatSpace()) return null;

      if (stream.match(/;.*$/, false)) {
        stream.skipToEnd();
        return "comment";
      }

      if (stream.match(/(?:mov|add|sub|jmp|cmp|call|ret|push|pop)\b/)) {
        return "keyword";
      }

      if (stream.match(/%?[a-zA-Z]+[0-9]*/)) {
        return "variableName";
      }

      if (stream.match(/0x[0-9a-fA-F]+|\d+/)) {
        return "number";
      }

      stream.next();
      return null;
    }
  };
}
