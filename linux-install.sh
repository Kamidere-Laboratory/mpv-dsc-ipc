#!/usr/bin/env bash

shopt -s expand_aliases
alias mkdir='mkdir -p -v'
alias cp='cp -v'
DIRNAME=$(dirname "$0")
SCRIPTS_DIR=${HOME}/.config/mpv/scripts
MPVDSC_DIR=${HOME}/.config/mpv/node-scripts/mpv-dsc-ipc

if [ -d $MPVDSC_DIR ]; then
    echo -e "\e[31mDetected mpv-dsc-ipc directory in mpv config."
    read -p "Do you want to overwrite scripts? [y/N] " -n 1 -r
    echo -e "\e[0m"
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

mkdir $SCRIPTS_DIR
mkdir $MPVDSC_DIR

cd $DIRNAME
cp ./package.json ./package-lock.json ./index.js $MPVDSC_DIR
cp ./discordrpc.js $SCRIPTS_DIR

cd $MPVDSC_DIR
npm i

echo -e "\e[32m-----------------"
echo -e "$(tput bold)Remember to add to your config: "
echo -e "input-ipc-server=~/.config/mpv/mpv.sock$(tput sgr0)"
echo -e "\e[32m-----------------\e[0m"