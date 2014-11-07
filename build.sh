#!/bin/bash

rm -rf build/*
mkdir build/tmp

# Don't copy build folder
rsync -av . --exclude 'build*' build/tmp/honorflight-forms


# Remove unnecessary directorys
rm -rf build/tmp/honorflight-forms/.git
rm -rf build/tmp/honorflight-forms/build

cd build/tmp/
zip -r  ../honorflight-forms.zip honorflight-forms/
echo "You can now upload build/honorflight-forms.zip to the target wordpress installation"
cd -