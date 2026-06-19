// Reproducible README visual harness: renders the Mermaid extraction pipeline to assets/extraction-pipeline.svg.
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve paths relative to this script so it runs from any cwd.
const HERE = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(HERE, 'extraction-pipeline.mmd')
const OUT = resolve(HERE, '..', 'assets', 'extraction-pipeline.svg')

// Ensure the output directory exists.
mkdirSync(dirname(OUT), { recursive: true })

// Render via mermaid-cli (mmdc). SVG keeps the diagram crisp, small, and diffable.
execFileSync(
	'npx',
	['--yes', '@mermaid-js/mermaid-cli', '-i', SRC, '-o', OUT, '-b', 'transparent'],
	{ stdio: 'inherit' }
)

console.log(`Rendered ${OUT}`)
