# Show available recipes
default:
    @just --list

# Install workspace dependencies
install:
    bun install

# Run the landing-page dev server (http://localhost:5173)
dev:
    bun run dev

# Run a single talk in Slidev directly — separate port (default 3030), HMR on slides.md
#   just talk hello-deck
#   just talk debate-slide
talk slug:
    cd packages/{{slug}} && bun run dev

# Full production build — landing page + every talk into dist/
build:
    bun run build

# Build only the landing page (fast iteration on site/)
build-site:
    bun run build:site

# Build only the talks (skip the landing page)
build-talks:
    bun --filter='./packages/*' run build-base

# Serve the built dist/ locally — run `just build` first
#   just preview          (defaults to port 4173)
#   just preview 8080
preview port="4173":
    bunx sirv dist --port {{port}} --single

# Scaffold a new talk from the hello-deck template
#   just new my-talk-2026
new slug:
    @test ! -e packages/{{slug}} || (echo "packages/{{slug}}/ already exists — pick a different slug" && exit 1)
    cp -r packages/hello-deck packages/{{slug}}
    rm -rf packages/{{slug}}/node_modules packages/{{slug}}/index.html
    sed -i.bak 's|hello-deck|{{slug}}|g' packages/{{slug}}/package.json
    rm packages/{{slug}}/package.json.bak
    bun install
    @echo ""
    @echo "Created packages/{{slug}}/"
    @echo "Next:"
    @echo "  1. Add an entry to site/talks.config.ts:"
    @echo "       { slug: '{{slug}}', title: '...', date: 'YYYY-MM-DD' },"
    @echo "  2. just talk {{slug}}"

# Remove all build artifacts (root dist/, per-package dist/, slidev's dev-only index.html)
clean:
    bunx rimraf dist 'packages/*/dist' 'packages/*/index.html'

# Deploy dist/ to Cloudflare Pages — runs build first.
# Requires env vars: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_PAGES_NAME
deploy: build
    bunx wrangler pages deploy dist --project-name="${CLOUDFLARE_PAGES_NAME:?missing CLOUDFLARE_PAGES_NAME}"
