all:
	echo "Building Website"
	mkdir -p public
	echo "Branch:<br/>" > public/index.html
	echo ${GITHUB_REF} >> public/index.html
