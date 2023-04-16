const core = require('@actions/core');
const fs = require('fs');
const baseURL = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.STEAM_KEY}&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false&max_results=50000`;

async function run() {
    let outputJSON = {
        apps: []
    };
    try {
        let have_more_results = true;
        let last_appid = null;
        while (have_more_results) {
            let appList = await getAppList(last_appid);
            outputJSON.apps = outputJSON.apps.concat(appList.response.apps);
            have_more_results = appList.response.have_more_results;
            last_appid = appList.response.last_appid;
        }
        fs.writeFileSync('data.json', JSON.stringify(outputJSON), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        core.setFailed(error.Message);
    }
}

async function getAppList(last_appid) {
    // api limits results to 50000 with a last_appid returned for continuation
    // if last_appid, attach parameter to continue fetching results
    let url = baseURL;
    if (last_appid) {
        url = `${url}&last_appid=${last_appid}`
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;
}
run();