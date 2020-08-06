#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cp -R $BASE_DIR/fixtures/blog/* $BASE_DIR/../blog/
