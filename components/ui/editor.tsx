"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DragArea, Dragable } from "@/components/ui/rearange";
import { cn } from "@/lib/utils";
import * as Monaco from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { useTheme } from "next-themes";
import { Inter, Shadows_Into_Light } from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import { getHighlighter } from "shiki/bundle/full";
import { toast } from "sonner";
import * as Tldraw from "tldraw";
import "@/styles/tldraw.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RotateCwIcon, SaveIcon } from "lucide-react";

const shadows_into_light = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

function EditableHeading({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  return (
    <h1
      className="mx-4 text-pretty rounded-sm p-2 text-3xl ring-ring focus:outline-none focus:ring"
      contentEditable
      onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function EditableParagraph({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  return (
    <p
      className="mx-4 rounded-sm p-2 ring-ring focus:outline-none focus:ring"
      contentEditable
      onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

const Monospace = localFont({
  src: "../../fonts/MonaspaceRadonVarVF[wght,wdth,slnt].woff2",
});
const highlighter = getHighlighter({
  themes: ["catppuccin-mocha", "catppuccin-latte"],
  langs: [
    "ansi",
    "abap",
    "actionscript-3",
    "ada",
    "angular-html",
    "angular-ts",
    "apache",
    "apex",
    "apl",
    "applescript",
    "ara",
    "asciidoc",
    "asm",
    "astro",
    "awk",
    "ballerina",
    "bat",
    "beancount",
    "berry",
    "bibtex",
    "bicep",
    "blade",
    "c",
    "cadence",
    "clarity",
    "clojure",
    "cmake",
    "cobol",
    "codeowners",
    "codeql",
    "coffee",
    "common-lisp",
    "cpp",
    "crystal",
    "csharp",
    "css",
    "csv",
    "cue",
    "cypher",
    "d",
    "dart",
    "dax",
    "desktop",
    "diff",
    "docker",
    "dream-maker",
    "elixir",
    "elm",
    "emacs-lisp",
    "erb",
    "erlang",
    "fennel",
    "fish",
    "fluent",
    "fortran-fixed-form",
    "fortran-free-form",
    "fsharp",
    "gdresource",
    "gdscript",
    "gdshader",
    "genie",
    "gherkin",
    "git-commit",
    "git-rebase",
    "gleam",
    "glimmer-js",
    "glimmer-ts",
    "glsl",
    "gnuplot",
    "go",
    "graphql",
    "groovy",
    "hack",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hcl",
    "hjson",
    "hlsl",
    "html",
    "html-derivative",
    "http",
    "hxml",
    "hy",
    "imba",
    "ini",
    "java",
    "javascript",
    "jinja",
    "jison",
    "json",
    "json5",
    "jsonc",
    "jsonl",
    "jsonnet",
    "jssm",
    "jsx",
    "julia",
    "kotlin",
    "kusto",
    "latex",
    "less",
    "liquid",
    "log",
    "logo",
    "lua",
    "make",
    "markdown",
    "marko",
    "matlab",
    "mdc",
    "mdx",
    "mermaid",
    "mojo",
    "move",
    "narrat",
    "nextflow",
    "nginx",
    "nim",
    "nix",
    "nushell",
    "objective-c",
    "objective-cpp",
    "ocaml",
    "pascal",
    "perl",
    "php",
    "plsql",
    "po",
    "postcss",
    "powerquery",
    "powershell",
    "prisma",
    "prolog",
    "proto",
    "pug",
    "puppet",
    "purescript",
    "python",
    "qml",
    "qmldir",
    "qss",
    "r",
    "racket",
    "raku",
    "razor",
    "reg",
    "regexp",
    "rel",
    "riscv",
    "rst",
    "ruby",
    "rust",
    "sas",
    "sass",
    "scala",
    "scheme",
    "scss",
    "shaderlab",
    "shellscript",
    "shellsession",
    "smalltalk",
    "solidity",
    "soy",
    "sparql",
    "splunk",
    "sql",
    "ssh-config",
    "stata",
    "stylus",
    "svelte",
    "swift",
    "system-verilog",
    "systemd",
    "tasl",
    "tcl",
    "terraform",
    "tex",
    "toml",
    "tsv",
    "tsx",
    "turtle",
    "twig",
    "typescript",
    "typespec",
    "typst",
    "v",
    "vala",
    "vb",
    "verilog",
    "vhdl",
    "viml",
    "vue",
    "vue-html",
    "vyper",
    "wasm",
    "wenyan",
    "wgsl",
    "wikitext",
    "wolfram",
    "xml",
    "xsl",
    "yaml",
    "zenscript",
    "zig",
  ],
});
function EditableCode({
  content,
  onChange,
  language,
  onChangeLanguage,
}: {
  content: string;
  onChange: (content: string) => void;
  language: string;
  onChangeLanguage: (language: string) => void;
}) {
  const monaco = Monaco.useMonaco();
  const { resolvedTheme } = useTheme();
  const [code, setCode] = React.useState("");

  React.useEffect(() => setCode(content), [content]);

  const highlightLoadCallback = React.useCallback(
    (h: Awaited<typeof highlighter>) => {
      shikiToMonaco(h, monaco);
      monaco?.editor?.setTheme(
        resolvedTheme === "dark" ? "catppuccin-mocha" : "catppuccin-latte",
      );
    },
    [monaco, resolvedTheme],
  );

  React.useEffect(() => {
    if (monaco) {
      highlighter.then(highlightLoadCallback);
      monaco.languages.register({ id: "typescript" });
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    }
  }, [monaco, highlightLoadCallback]);

  React.useEffect(() => {
    if (resolvedTheme && monaco) {
      monaco.editor.setTheme(
        resolvedTheme === "dark" ? "catppuccin-mocha" : "catppuccin-latte",
      );
    }
  }, [resolvedTheme, monaco]);

  React.useEffect(() => {
    monaco?.editor?.setModelLanguage(monaco?.editor?.getModels()[0], language);
  }, [language, monaco]);

  return (
    <div className="flex justify-center">
      <div
        className="relative m-8 w-0 max-w-screen-md flex-grow rounded-md p-2 pt-4 ring-ring focus-within:ring"
        onBlur={() => onChange(code)}
      >
        <input
          className="absolute z-10 -translate-y-1/2 translate-x-2 border border-border bg-mantle pl-1 text-sm outline-ring focus-visible:outline"
          value={language}
          onInput={(e) => onChangeLanguage(e.currentTarget.value)}
        />
        <Monaco.Editor
          className={"rounded-sm border p-1 pt-4"}
          options={{
            fontFamily: Monospace.style.fontFamily,
            fontLigatures:
              "'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'liga'",
          }}
          height="60vh"
          theme={
            resolvedTheme === "dark" ? "catppuccin-mocha" : "catppuccin-latte"
          }
          value={code}
          onChange={(e) => setCode(e ?? "")}
          defaultLanguage={language}
          loading={<RotateCwIcon className="h-12 w-12 animate-spin" />}
        />
      </div>
    </div>
  );
}

Tldraw.DefaultColorThemePalette.lightMode.background = "rgb(var(--ctp-base))";
Tldraw.DefaultColorThemePalette.lightMode.black.solid = "rgb(var(--ctp-text))";
Tldraw.DefaultColorThemePalette.lightMode.blue.solid = "rgb(var(--ctp-blue))";
Tldraw.DefaultColorThemePalette.lightMode.green.solid = "rgb(var(--ctp-green))";
Tldraw.DefaultColorThemePalette.lightMode.grey.solid =
  "rgb(var(--ctp-overlay1))";
Tldraw.DefaultColorThemePalette.lightMode.orange.solid =
  "rgb(var(--ctp-orange))";
Tldraw.DefaultColorThemePalette.lightMode.red.solid = "rgb(var(--ctp-red))";
Tldraw.DefaultColorThemePalette.lightMode.text = "rgb(var(--ctp-text))";
Tldraw.DefaultColorThemePalette.lightMode.violet.solid =
  "rgb(var(--ctp-mauve))";
Tldraw.DefaultColorThemePalette.lightMode.white.solid = "rgb(var(--ctp-base))";
Tldraw.DefaultColorThemePalette.lightMode.yellow.solid =
  "rgb(var(--ctp-yellow))";
Tldraw.DefaultColorThemePalette.lightMode["light-green"].solid =
  "rgb(var(--ctp-green))";
Tldraw.DefaultColorThemePalette.lightMode["light-blue"].solid =
  "rgb(var(--ctp-sky))";
Tldraw.DefaultColorThemePalette.lightMode["light-red"].solid =
  "rgb(var(--ctp-maroon))";
Tldraw.DefaultColorThemePalette.lightMode["light-violet"].solid =
  "rgb(var(--ctp-lavender))";

function EditableDiagram({
  content,
  onChange,
}: {
  content: Tldraw.StoreSnapshot<Tldraw.TLRecord> | null;
  onChange: (content: Tldraw.StoreSnapshot<Tldraw.TLRecord>) => void;
}) {
  const [store] = React.useState(() =>
    Tldraw.createTLStore({ shapeUtils: Tldraw.defaultShapeUtils }),
  );
  React.useLayoutEffect(() => {
    if (content) {
      store.loadSnapshot(content);
    }
  }, [store, content]);

  return (
    <div className={cn("flex justify-center", inter.className)}>
      <div
        className="m-8 w-0 max-w-screen-md flex-grow rounded-md p-2 ring-ring focus-within:ring"
        onBlur={() => onChange(store.getSnapshot())}
      >
        <div
          style={{ height: "60vh" }}
          className="isolate w-full rounded-sm border"
        >
          <Tldraw.Tldraw
            autoFocus={false}
            components={{
              HelpMenu: null,
              NavigationPanel: null,
              MainMenu: null,
              PageMenu: null,
              DebugMenu: null,
              DebugPanel: null,
            }}
            onMount={(editor) => {
              editor.setCurrentTool("hand");
              editor.user.updateUserPreferences({ edgeScrollSpeed: 0 });
              editor.updateInstanceState({ isDebugMode: false });
            }}
            store={store}
          />
        </div>
      </div>
    </div>
  );
}

export default function Editor({ path }: { path: string }) {
  const [content, setContent] = React.useState<
    (
      | {
          type: "heading" | "paragraph";
          id: string;
          content: string;
        }
      | {
          type: "code";
          id: string;
          language: string;
          content: string;
        }
      | {
          type: "diagram";
          id: string;
          content: Tldraw.StoreSnapshot<Tldraw.TLRecord> | null;
        }
    )[]
  >([
    // {
    //   type: "heading",
    //   id: "1",
    //   content: "The Unexpected Benefits of Birdwatching",
    // },
    // {
    //   type: "paragraph",
    //   id: "2",
    //   content:
    //     "The sun, a radiant orb of incandescent plasma, bathed the verdant meadow in its golden rays. Birdsong filled the air, a melodious symphony orchestrated by nature's finest musicians. A gentle breeze rustled the leaves of the trees, their emerald canopies swaying rhythmically in the summer breeze. Butterflies, their wings adorned with intricate patterns, flitted from flower to flower, their delicate forms a testament to the beauty of the natural world. In the distance, a winding river glistened like a silver ribbon, its waters reflecting the azure sky above. Fluffy white clouds drifted lazily by, casting fleeting shadows upon the landscape below. The scent of wildflowers, a heady blend of sweet and earthy aromas, permeated the air.",
    // },
    // {
    //   type: "paragraph",
    //   id: "3",
    //   content:
    //     "Birdwatching might seem like a leisurely activity for retirees, but there's more to it than meets the eye. Not only is it a fantastic way to connect with nature, but studies have shown that observing birds can bring a surprising range of benefits. From reducing stress to boosting creativity, spending time with our feathered friends can have a positive impact on our overall well-being.",
    // },
    // {
    //   type: "paragraph",
    //   id: "5",
    //   content:
    //     "In the next section, we'll delve deeper into the specific ways birdwatching can enhance your life. We'll explore how focusing on these colorful creatures can promote mindfulness, spark a sense of wonder, and even strengthen your sense of community.",
    // },
    // {
    //   type: "code",
    //   id: "4",
    //   language: "python",
    //   content:
    //     '# List of bird names\nbird_names = ["Robin", "Blue Jay", "Goldfinch", "Hummingbird"]\n\n# Looping through the bird names\nfor bird in bird_names:\n  print(f"The beautiful {bird} is a common sight in many backyards.")\n\n# Additional information (optional)\nprint("Birdwatching is a great way to learn about these fascinating creatures and their unique behaviors.")',
    // },
    // {
    //   type: "paragraph",
    //   id: "6",
    //   content:
    //     "This code defines a list <i>bird_names</i> containing several bird species. It then iterates through the list using a <i>for</i> loop. Inside the loop, an f-string is used to create a descriptive sentence for each bird. Finally, an optional line can be added to provide some additional information about birdwatching.",
    // },
    // {
    //   type: "diagram",
    //   id: "7",
    //   content: null,
    // },
  ]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loaded = window.localStorage.getItem(path);
    if (loaded) setContent(JSON.parse(loaded).content);
    setLoading(false);
  }, [path]);

  React.useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(
        path,
        JSON.stringify({ updated: Date.now(), content }),
      );
    }
  }, [path, content, loading]);

  const [saveLoading, setSaveLoading] = React.useState(false);
  React.useEffect(() => {
    if (saveLoading) {
      setTimeout(() => setSaveLoading(false), 3000);
    }
  }, [saveLoading]);

  return loading ? (
    <div className="flex h-full w-full items-center justify-center">
      <RotateCwIcon className="h-12 w-12 animate-spin" />
    </div>
  ) : (
    <ScrollArea className="h-full p-4">
      <ContextMenu>
        <ContextMenuTrigger>
          <form>
            <Button
              size="icon"
              className="fixed right-8"
              disabled={saveLoading}
              onClick={() => {
                setSaveLoading(true);
                console.log(content);
              }}
            >
              {saveLoading ? (
                <RotateCwIcon className="h-4 w-4 animate-spin" />
              ) : (
                <SaveIcon className="h-4 w-4" />
              )}
            </Button>
            <div
              style={{
                margin: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div className={shadows_into_light.className}>
                <DragArea
                  onDragDrop={(from, to) => {
                    const clone = Array.from(content);
                    const item = clone[from];
                    clone.splice(from, 1);
                    clone.splice(to, 0, item);
                    setContent(clone);
                  }}
                >
                  {content.map((item, i) => (
                    <Dragable index={i} key={item.id}>
                      {item.type === "heading" ? (
                        <EditableHeading
                          content={item.content}
                          onChange={(c) => {
                            const clone = Array.from(content);
                            clone[i].content = c;
                            setContent(clone);
                          }}
                        />
                      ) : item.type === "paragraph" ? (
                        <EditableParagraph
                          content={item.content}
                          onChange={(c) => {
                            const clone = Array.from(content);
                            clone[i].content = c;
                            setContent(clone);
                          }}
                        />
                      ) : item.type === "code" ? (
                        <EditableCode
                          content={item.content}
                          onChange={(c) => {
                            const clone = Array.from(content);
                            clone[i].content = c;
                            setContent(clone);
                          }}
                          language={item.language}
                          onChangeLanguage={(l) => {
                            const clone = Array.from(content);
                            (clone[i] as { language: string }).language = l;
                            setContent(clone);
                          }}
                        />
                      ) : item.type === "diagram" ? (
                        <EditableDiagram
                          content={item.content}
                          onChange={(c) => {
                            const clone = Array.from(content);
                            clone[i].content = c;
                            setContent(clone);
                          }}
                        />
                      ) : (
                        <div />
                      )}
                    </Dragable>
                  ))}
                </DragArea>
              </div>
            </div>
          </form>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={() => toast("Toast!")}>
            Toast
          </ContextMenuItem>
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </ScrollArea>
  );
}
