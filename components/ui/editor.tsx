"use client";

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
import { toast } from "sonner";
import { Shadows_Into_Light, Inter } from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import * as Monaco from "@monaco-editor/react";
import { getHighlighter } from "shiki/bundle/full";
import { shikiToMonaco } from "@shikijs/monaco";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import * as Tldraw from "tldraw";

import "@/styles/tldraw.css";

const shadows_into_light = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export function EditableHeading() {
  const [content, setContent] = React.useState("Test <b>heading</b>");

  return (
    <h1
      className="mx-4 text-pretty rounded-sm p-2 text-3xl ring-ring focus:border-blue-400 focus:outline-none focus:ring"
      contentEditable
      onBlur={(e) => setContent(e.currentTarget.innerHTML)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></h1>
  );
}

export function EditableParagraph() {
  const [content, setContent] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, quaerat odit autem eligendi numquam quo. Porro sequi qui esse ipsam, id quod quis aut deleniti eius repellendus velit harum iure?",
  );

  return (
    <p
      className="mx-4 rounded-sm p-2 ring-ring focus:border-blue-400 focus:outline-none focus:ring"
      contentEditable
      onBlur={(e) => setContent(e.currentTarget.innerHTML)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></p>
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
export function EditableCode() {
  const monaco = Monaco.useMonaco();
  const { resolvedTheme } = useTheme();
  const [language, setLanguage] = React.useState("typescript");
  const [content, setContent] = React.useState("// Some code");

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
      console.log("here is the monaco instance:", monaco);
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
    monaco?.editor?.setModelLanguage(monaco!.editor!.getModels()[0], language);
  }, [language, monaco]);

  return (
    <div className="flex justify-center">
      <div className="relative m-8 w-0 max-w-screen-md flex-grow rounded-md p-2 pt-4 ring-ring focus-within:ring">
        <input
          className="absolute z-10 -translate-y-1/2 translate-x-2 border border-border bg-mantle pl-1 text-sm outline-ring focus-visible:outline"
          value={language}
          onInput={(e) => setLanguage(e.currentTarget.value)}
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
          value={content}
          onChange={(e) => setContent(e ?? "")}
          defaultLanguage={language}
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

const focusedEditorContext = React.createContext(
  {} as {
    focusedEditor: Tldraw.Editor | null;
    setFocusedEditor: (id: Tldraw.Editor | null) => void;
  },
);
function blurEditor(editor: Tldraw.Editor) {
  editor.selectNone();
  editor.setCurrentTool("hand");
  editor.updateInstanceState({ isFocused: false });
}
export function EditableDiagram() {
  const { focusedEditor, setFocusedEditor } =
    React.useContext(focusedEditorContext);
  const [editor, setEditor] = React.useState<Tldraw.Editor>();

  return (
    <div className={cn("flex justify-center", inter.className)}>
      <div className="m-8 w-0 max-w-screen-md flex-grow rounded-md p-2 ring-ring focus-within:ring">
        <div
          style={{ height: "60vh" }}
          className="relative isolate w-full rounded-sm border"
          onFocus={() => {
            if (!editor) return;
            if (focusedEditor && focusedEditor !== editor) {
              blurEditor(focusedEditor);
            }
            editor.updateInstanceState({ isFocused: true });
            setFocusedEditor(editor);
          }}
        >
          <Tldraw.Tldraw
            autoFocus={false}
            hideUi={focusedEditor !== editor}
            components={{
              HelpMenu: null,
              NavigationPanel: null,
              MainMenu: null,
              PageMenu: null,
            }}
            onMount={(editor) => {
              setEditor(editor);
              editor.setCurrentTool("hand");
              editor.user.updateUserPreferences({ edgeScrollSpeed: 0 });
              editor.updateInstanceState({ isDebugMode: false });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Editor() {
  const [focusedEditor, setFocusedEditor] =
    React.useState<Tldraw.Editor | null>(null);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="p-6">
        <focusedEditorContext.Provider
          value={{ focusedEditor, setFocusedEditor }}
        >
          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
            onPointerDown={() => {
              if (!focusedEditor) return;
              blurEditor(focusedEditor);
              setFocusedEditor(null);
            }}
          >
            <form className={shadows_into_light.className}>
              <EditableHeading />
              <EditableParagraph />
              <EditableParagraph />
              <EditableCode />
              <EditableDiagram />
            </form>
          </div>
        </focusedEditorContext.Provider>
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
  );
}
