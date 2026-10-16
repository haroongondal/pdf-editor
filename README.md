# PDF Editor

A small offline PDF editor. It runs as a desktop app (Electron) or straight from `index.html` in a browser, and nothing leaves your machine.

## Features

- **Edit existing text in place.** Click a line and retype it. The editor rewrites the PDF's own text, so the result stays real, selectable text. When every character you type is already in the embedded font, the original font is reused; otherwise that line falls back to the closest standard font (Helvetica, Times or Courier, keeping bold and italic).
- **Add content:** text, freehand drawing, highlights, white-out boxes and PNG images, in any colour and size.
- **Pages:** reorder, rotate, delete, and merge in pages from another PDF (**Add PDF**, or drop a file onto the window).
- Undo (Cmd/Ctrl+Z) and delete the selected item (Delete).

## Run it

Requires Node.js 18 or later.

```sh
npm install
npm start
```

You can also open `index.html` directly in Chrome, Edge or Firefox; it works from `file://` with no server.

**Save PDF** writes a new file and never touches the original.

## Test

```sh
npm test
```

This runs an end-to-end check in Google Chrome (expected at `/Applications/Google Chrome.app`, so macOS only as written), then a smoke test of the Electron app.

## How text editing works

`textedit.js` lexes the page's content stream and pairs each text-showing operator (`Tj`, `TJ`, `'`, `"`) with the glyphs PDF.js decodes for it. Runs on the same baseline are grouped into editable lines. On save, the first operator of an edited line is replaced with the new text, and the rest are replaced with empty moves of the same width, so text after them on the page doesn't shift.

## Limitations

- Edits work one line at a time; paragraphs don't reflow.
- Fonts are usually embedded as subsets, so characters the document never used fall back to a standard font.
- Added and fallback text are Latin-only.
- No form filling, and encrypted PDFs may not save correctly (decrypt them first, for example with `qpdf --decrypt`).
- PDF.js is pinned to 3.x so the page keeps working from `file://`. Its known font flaw (CVE-2024-4367) is mitigated by loading documents with `isEvalSupported: false`.

## Third-party code

`vendor/` contains unmodified builds of [PDF.js](https://github.com/mozilla/pdf.js) 3.11.174 (Apache-2.0) and [pdf-lib](https://github.com/Hopding/pdf-lib) 1.17.1 (MIT), with their license headers intact.
