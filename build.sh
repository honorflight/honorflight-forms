#!/bin/bash

rm -rf build/tmp
mkdir build/tmp

# Don't copy build folder
rsync -av --progress . /build/tmp/honorflight-forms --exclude 'build*' '.git*'


# Remove unnecessary directorys
rm -rf ../build/tmp/honorflight-forms/build
rm -rf ../build/tmp/honorflight-forms/.git

zip -r  ../build/honorflight-forms.zip build/tmp/honorflight-forms/
echo "You can now upload build/honorflight-forms.zip to the target wordpress installation"