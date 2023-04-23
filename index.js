const core = require('@actions/core');
const fs = require('fs');

const key = process.env.STEAM_KEY;
const baseURL = "https://api.steampowered.com/IStoreService/GetAppList/v1/?";
const categories = ["games", "dlc", "software", "videos", "hardware"];

/**
 * Entry point for script
 *
 */
async function run() {
    categories.forEach(function(element) {
        requestData(element);
    });
}

/**
 * Returns x raised to the n-th power.
 *
 * @param {number} last_appid appID of last entry. used to continue in subsequent calls.
 * @param {string} endpoint The power, must be a natural number.
 * @return {json} data containing app id and app name
 */
async function getAppList(last_appid, endpoint) {
    // api limits results to 50000 with a last_appid returned for continuation
    let url = endpoint;
    if (last_appid) {
        url = `${url}&last_appid=${last_appid}`
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;
}

/**
 * makes requests for selected category
 *
 * @param {string} category category of app id to be returned
 * @return void
 */
async function requestData(category) {
    const gameParam =`&include_games=${category == "games"}`;
    const dlcParam =`&include_dlc=${category == "dlc"}`;
    const softwareParam =`&include_software=${category == "software"}`;
    const videosParam =`&include_videos=${category == "videos"}`;
    const hardwareParam =`&include_hardware=${category == "hardware"}`;

    const endpoint = `${baseURL}key=${key}${gameParam}${dlcParam}${softwareParam}${videosParam}${hardwareParam}&max_results=50000`;


    let outputJSON = {
        apps: []
    };
    try {
        let have_more_results = true;
        let last_appid = null;
        while (have_more_results) {
            let appList = await getAppList(last_appid, endpoint);
            outputJSON.apps = outputJSON.apps.concat(appList.response.apps);
            have_more_results = appList.response.have_more_results;
            last_appid = appList.response.last_appid;
        }
        fs.writeFileSync(`./data/${category}_appid.json`, JSON.stringify(outputJSON), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        core.setFailed(error.Message);
    }
}

run();