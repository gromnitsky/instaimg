out := _out
src := $(wildcard src/*)
pkg := $(out)/$(shell json -d- -a name version < src/manifest.json)
crx := $(pkg).crx
zip := $(pkg).zip

crx: $(crx)
$(crx): private.pem $(src)
	google-chrome --pack-extension=src --pack-extension-key=$<
	@mkdir -p $(dir $@)
	mv src.crx $@

zip: $(zip)
$(zip): $(src)
	cd $(dir $<) && zip -qr $(CURDIR)/$@ *

private.pem:
	openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out $@

upload: $(crx)
	scp $< gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/
