# The following script will attempt to increment patch version if the published version is equal to the existing version.
# Otherwise, it will just publish the version as given by the package.json property.

REQUIRES_VERSION_INCREMENT=$(node -e '
const fs = require("fs");
const { execSync } = require("child_process");
const content = JSON.parse(fs.readFileSync("./package.json"));
const { name, version } = content;
console.log(version === execSync(`npm show ${name} version`).toString().trim());
')
PUSH=false

if [ "$REQUIRES_VERSION_INCREMENT" == "true" ];
then
  echo "Incrementing minor version"
  git config --global user.email "actions@gihub.com"
  git config --global user.name "release-store-locator"
  yarn version --new-version patch
  PUSH=true
fi

npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
npm publish --access public || PUSH=false

if [ "$PUSH" == "true" ];
then
  echo "Pushing version changes"
  git push
fi
