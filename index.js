const core = require('@actions/core');
const fs = require('fs');

const key = process.env.STEAM_KEY;
const baseURL = "https://api.steampowered.com/IStoreService/GetAppList/v1/?";
const categories = ["games", "dlc", "software", "videos", "hardware"];

async function run() {
    categories.forEach(function(element) {
        requestData(element);
    });
}

async function getAppList(last_appid, endpoint) {
    // api 50000 result limit. Last_appid returned for continuation
    let url = endpoint;
    if (last_appid) {
        url = `${url}&last_appid=${last_appid}`
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;
}

async function requestData(category) {
    const gameParam =`&include_games=${category == "games"}`;
    const dlcParam =`&include_dlc=${category == "dlc"}`;
    const softwareParam =`&include_software=${category == "software"}`;
    const videosParam =`&include_videos=${category == "videos"}`;
    const hardwareParam =`&include_hardware=${category == "hardware"}`;

    const endpoint = `${baseURL}key=${key}${gameParam}${dlcParam}${softwareParam}${videosParam}${hardwareParam}&max_results=50000`;


    let outputJSON = [];

    try {
        let have_more_results = true;
        let last_appid = null;
        while (have_more_results) {
            let appList = await getAppList(last_appid, endpoint);
            outputJSON= outputJSON.concat(appList.response.apps);
            have_more_results = appList.response.have_more_results;
            last_appid = appList.response.last_appid;
        }

				if (outputJSON == [null]) {
					console.log(`${category} null error`);
					return;
				}

        fs.writeFileSync(`./data/${category}_appid.json`, JSON.stringify(outputJSON), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        core.setFailed(error.Message);
    }
}

run();
