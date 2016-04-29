SRC = manifest.json icons js
DIST = rdquo-chrome-extension.zip

all: test $(DIST)

clean:
	rm -f $(DIST)

test:
	! find js -type f -name '*.js' -print0 | xargs -0r grep console.log

icons: icons/icon16.png icons/icon48.png icons/icon128.png

$(DIST): clean $(ICONS)
	zip -r $@ $(SRC)

icons/icon%.png: icons/original.png FORCE
	convert $< -resize $*x $@

FORCE:

.PHONY: all clean test
