import type { ReactNode } from "react";

type ReplyBlock =
  | { kind: "heading" | "paragraph" | "code"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

function isListItem(line: string): boolean {
  return /^\s*(?:[-*+]|\d+[.)])\s+/.test(line);
}

function isHeading(line: string): boolean {
  return /^(?:#{1,3}\s+.+|\*\*.+\*\*:?)$/.test(line.trim());
}

function parseReply(reply: string): ReplyBlock[] {
  const lines = reply.trim().split(/\r?\n/);
  const blocks: ReplyBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ kind: "code", text: code.join("\n") });
      continue;
    }

    const markdownHeading = line.match(/^#{1,3}\s+(.+)$/);
    if (markdownHeading) {
      blocks.push({ kind: "heading", text: markdownHeading[1] });
      index += 1;
      continue;
    }

    if (/^\*\*.+\*\*:?$/.test(line)) {
      blocks.push({ kind: "heading", text: line.replace(/^\*\*|\*\*:?\s*$/g, "") });
      index += 1;
      continue;
    }

    if (isListItem(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const items: string[] = [];
      while (index < lines.length && isListItem(lines[index])) {
        items.push(lines[index].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "").trim());
        index += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("```") &&
      !isHeading(lines[index].trim()) &&
      !isListItem(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.+?\*\*|__.+?__|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-violet-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function TutorReply({ reply }: { reply: string }) {
  const blocks = parseReply(reply);

  return (
    <div className="space-y-3 text-sm leading-6 text-slate-700">
      {blocks.map((block, index) => {
        if (block.kind === "heading") {
          return (
            <h3 key={index} className="pt-1 text-sm font-bold text-slate-950">
              {renderInline(block.text)}
            </h3>
          );
        }
        if (block.kind === "code") {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs leading-5 text-slate-100"
            >
              <code>{block.text}</code>
            </pre>
          );
        }
        if (block.kind === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List
              key={index}
              className={`space-y-1.5 pl-5 marker:text-violet-500 ${
                block.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </List>
          );
        }
        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
