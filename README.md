
## Steam AppID List

[![Made with JavaScript](https://img.shields.io/badge/Made_with-JavaScript-blue?logo=javascript&logoColor=white)](https://www.javascript.com/ "Go to JavaScript homepage")
[![Made with GH Actions](https://img.shields.io/badge/CI-GitHub_Actions-blue?logo=github-actions&logoColor=white)](https://github.com/features/actions "Go to GitHub Actions homepage")
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

## Description

This repo makes requests to the Steam Store API to retrieve appID lists seperated by category

```
https://api.steampowered.com/IStoreService/GetAppList/v1/
```

Another endpoint is available here ```https://api.steampowered.com/ISteamApps/GetAppList/v2/```
This endpoint returns all the name and appid of all applications regardless of category. 

## Info

This repo runs daily through Github Actions and pushes the latest to this repo to keep the data up to date.

## Usage

Datasets can be found in the [data folder](https://github.com/jsnli/SteamAppIDList/tree/master/data).
> Cloning/Downloading the repo is recommended to browse the data as the large dataset can cause some browsers to lock up.

To run the script locally, replace the following with your own Steam Key in index.js
```
const key = process.env.STEAM_KEY;
```
Then run from directory to generate to the data folder
```
node index.js
```

Anyone is welcome to use this code and make their own changes for any purpose. No credit is needed.

