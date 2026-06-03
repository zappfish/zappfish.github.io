# Builds the full GitHub Pages output:
#   - the Astro site at $(DIST_DIR)/
#   - the LinkML schema docs at $(DIST_DIR)/ZAPPSchema/
#
# The schema docs are generated from the zebrafish toxicology atlas schema in
# the zappfish/zapp-atlas repo. Point ZAPP_ATLAS_REPO at a local checkout
# (the CI workflow checks it out via actions/checkout).

ZAPP_ATLAS_REPO ?= ../zapp-atlas
SCHEMA          := $(ZAPP_ATLAS_REPO)/server/src/zapp_atlas/schema/zebrafish_toxicology_atlas_schema.yaml

# mkdocs has no CLI flag to override docs_dir; schema-mkdocs.yml uses the
# default (./docs), so generate the markdown there.
DOCS_OUTPUT_DIR ?= docs

# The combined Pages output. Passed to Astro via --outDir; the schema docs go
# in a subdir served at /ZAPPSchema/.
DIST_DIR          ?= dist
MKDOCS_OUTPUT_DIR ?= $(DIST_DIR)/ZAPPSchema
MKDOCS_CONFIG     := schema-mkdocs.yml

.PHONY: build site schema-docs schema-md clean

# Astro first (it cleans dist/), then the schema site into dist/ZAPPSchema/.
build: site schema-docs

site:
	npm ci
	npm run build -- --outDir $(DIST_DIR)

schema-docs: schema-md
	uv run \
		--with 'mkdocs>=1.6.1' \
		--with 'mkdocs-material>=9.7.6' \
		--with 'mkdocs-mermaid2-plugin>=1.2.3' \
		mkdocs build -f $(MKDOCS_CONFIG) -d $(MKDOCS_OUTPUT_DIR)

schema-md: $(ZAPP_ATLAS_REPO)
	uv run --with linkml gen-doc $(SCHEMA) -d $(DOCS_OUTPUT_DIR)

clean:
	rm -rf $(DIST_DIR) $(DOCS_OUTPUT_DIR)

$(ZAPP_ATLAS_REPO):
	@echo "zapp-atlas not found at $@ — clone it there or set ZAPP_ATLAS_REPO=<path>" >&2
	@exit 1
