#!/bin/sh

echo "Installing clean .git project"

rm -rf .git/            && \
git init                && \
rm go

echo ".git project successfully installed"

git status
