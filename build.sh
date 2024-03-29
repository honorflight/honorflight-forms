#!/bin/bash

rm -rf build/*
mkdir build/tmp

cd forms/
npm install grunt@1.6.1 && npm install
grunt build
cd ..

# Don't copy build folder
rsync -av . --exclude 'build*' \
  --exclude '.idea*' \
  --exclude '.git*' \
  --exclude 'documentation*' \
  --exclude 'forms*' \
  build/tmp/honorflight-forms

cd build/tmp/
zip -r  ../honorflight-forms.zip honorflight-forms/
echo "You can now upload build/honorflight-forms.zip to the target wordpress installation"
cd -
