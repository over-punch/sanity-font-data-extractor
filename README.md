# sanity-font-data-extractor

Inspect OpenType metadata, variable-font axes, and font metrics directly inside Sanity Studio — drag in one or more `.otf` / `.ttf` / `.woff` / `.woff2` files and read their internals without leaving the CMS.

[![npm](https://img.shields.io/npm/v/@liiift-studio/sanity-font-data-extractor.svg)](https://www.npmjs.com/package/@liiift-studio/sanity-font-data-extractor)
[![license](https://img.shields.io/npm/l/@liiift-studio/sanity-font-data-extractor.svg)](https://www.npmjs.com/package/@liiift-studio/sanity-font-data-extractor)

A client-side React component for Sanity Studio (v3 / v4 / v5). Upload font files and the component parses them in the browser with [`fontkit`](https://github.com/foliojs/fontkit), then surfaces the family/style/version, glyph count, metrics (units-per-em, ascent, descent, line gap), and the full parsed font object — including variable-font `fvar` axes and the `name` table — in an expandable inspector. Upload two or more fonts to compare their metrics side by side.

> **Privacy:** font bytes never leave the browser. Files are read with `FileReader` and parsed client-side via `fontkit`; nothing is uploaded to Sanity or any server.

## How it works

<img src="https://raw.githubusercontent.com/Liiift-Studio/sanity-font-data-extractor/main/assets/extraction-pipeline.svg?v=1" alt="Extraction pipeline: a font file is dropped onto the GetFontData component, read into a Uint8Array via FileReader, parsed by fontkit.create(), and the resulting font object drives the summary cards, the ObjectInspector tree, copy-to-clipboard JSON, and (with 2+ fonts) the side-by-side compare view." width="100%">

## Install

```bash
npm install @liiift-studio/sanity-font-data-extractor
```

Install the peer dependencies if your Studio does not already provide them:

```bash
npm install sanity @sanity/ui @sanity/icons react fontkit
```

| Peer dependency | Supported range | Notes |
|---|---|---|
| `sanity` | `^3 \|\| ^4 \|\| ^5` | Sanity Studio |
| `@sanity/ui` | `^1 \|\| ^2 \|\| ^3` | UI primitives |
| `@sanity/icons` | `^2 \|\| ^3` | Icons |
| `react` | `^18 \|\| ^19` | |
| `fontkit` | `^2` | **optional** peer — required at runtime to parse fonts |

`@devtools-ds/object-inspector` (the metadata tree view) ships as a direct dependency, so you do not install it yourself.

## Usage

The package's default export is the `GetFontData` component. Mount it anywhere in your Studio — most commonly as a custom [Structure tool](https://www.sanity.io/docs/structure-builder-reference) or a desk view:

```jsx
import GetFontData from '@liiift-studio/sanity-font-data-extractor'
import { useClient } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export function FontInspector() {
	const client = useClient({ apiVersion: '2024-01-01' })

	return (
		<GetFontData
			icon={SearchIcon}
			client={client}
			displayName="Font Inspector"
		/>
	)
}
```

Then add it to your Studio's structure, for example:

```js
// sanity.config.js (structure tool)
S.view
	.component(FontInspector)
	.title('Font Inspector')
```

### Props

| Prop | Type | Description |
|---|---|---|
| `icon` | `React.ComponentType` | Icon component rendered next to the heading (e.g. a `@sanity/icons` icon). |
| `client` | `SanityClient` | A Sanity client instance. Accepted for forward compatibility; the current upload-and-parse flow runs entirely in the browser and does not query the client. |
| `displayName` | `string` | Heading shown above the upload area. |

## Features

- **Upload or drag & drop** one or many `.otf` / `.ttf` / `.woff` / `.woff2` files.
- **Summary cards** — family name, style name, glyph count, version at a glance.
- **Full metadata inspector** — the entire parsed `fontkit` object in an expandable, dark/light-aware [`ObjectInspector`](https://github.com/SafeStuffer/devtools-ds) tree, including variable-font `fvar` axes/instances and the OpenType `name` table.
- **Side-by-side compare** — upload 2+ fonts and switch to Compare view for a metrics table (family, style, full name, version, glyph count, units-per-em, ascent, descent, line gap), with differing values highlighted.
- **Copy metadata** — copy the parsed font object as formatted JSON to the clipboard.

> _A live screenshot of the inspector running inside Sanity Studio is welcome — the component is an interactive upload UI and cannot be captured headlessly. Maintainers/users: a Studio screenshot or GIF would slot in above._

## Requirements

- A Sanity Studio v3, v4, or v5 project.
- A browser environment (the component is client-side React; it is not a CLI or server utility).

## Regenerating the diagram

The pipeline diagram is generated from a committed Mermaid source — no manual editing of the image:

```bash
npm run capture   # scripts/extraction-pipeline.mmd -> assets/extraction-pipeline.svg
```

## License

MIT © Quinn Keaveney / Liiift Studio
