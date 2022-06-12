LOCAL_NPM_REGISTRY=~/local-npm-registry

mkdir $LOCAL_NPM_REGISTRY
rm $LOCAL_NPM_REGISTRY/owner-or-organization-repository-name-*.tgz || true

npm run build
npm pack --pack-destination $LOCAL_NPM_REGISTRY

cd app

npm install $LOCAL_NPM_REGISTRY/owner-or-organization-repository-name-*.tgz

cd ..

code ./app/index.ts
node ./app/index.ts
