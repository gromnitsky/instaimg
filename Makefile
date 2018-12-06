out := _out
pkg.name := $(shell json -e 'this.q = this.name + "-" + this.version' q < src/manifest.json)
src := $(shell find src -type f)

all: $(out)/$(pkg.name).crx

$(out)/$(pkg.name).zip: $(src)
	@mkdir -p $(dir $@)
	cd $(dir $<) && zip -qr $(CURDIR)/$@ *

pkg.key := $(out)/private.pem
%.crx: %.zip $(pkg.key)
	./zip2crx.sh $^

$(pkg.key):
	openssl genrsa 2048 > $@

# sf

upload:
	scp $(out)/$(pkg.name).crx gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/
