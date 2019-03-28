out := _out
crx := $(out)/$(shell json -d- -a name version < src/manifest.json).crx

crx: $(crx)
$(crx): private.pem $(wildcard src/*)
	google-chrome --pack-extension=src --pack-extension-key=$<
	@mkdir -p $(dir $@)
	mv src.crx $@

private.pem:
	openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out $@

upload: $(crx)
	scp $< gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/
