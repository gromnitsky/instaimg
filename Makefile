out := _out
pkg.name := $(shell json -d- -a name version < src/manifest.json)
crx := $(out)/$(pkg.name).crx
src := $(wildcard src/*)

all: $(crx)

$(out)/$(pkg.name).zip: $(src)
	@mkdir -p $(dir $@)
	cd $(dir $<) && zip -qr $(CURDIR)/$@ *

pkg.key := $(out)/private.pem
%.crx: %.zip $(pkg.key)
	./zip2crx $^

$(pkg.key):
	openssl genrsa 2048 > $@

# sf

upload: $(crx)
	scp $< gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/
