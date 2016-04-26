SRC = manifest.json icons js
DIST = myquotes-chrome-extension.zip

all: test $(DIST)
	@echo https://chrome.google.com/webstore/developer/dashboard
	@echo `pwd`

clean:
	rm -f $(DIST) icons/icon*.png

test:
	! find js -type f -name '*.js' -print0 | xargs -0r grep console.log

icons: icons/icon16.png icons/icon48.png icons/icon128.png

$(DIST): clean $(ICONS)
	zip -r $@ $(SRC)

icons/icon%.png: icons/original.png
	convert $< -resize $*x $@

.PHONY: all clean test icons
