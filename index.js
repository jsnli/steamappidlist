const core = require('@actions/core');
const fs = require('fs');

const url = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.STEAM_KEY}&include_games=true`

async function run() {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        const jsonString = JSON.stringify(jsonData.response.apps[0]);

        fs.writeFileSync('data.json', jsonString, (error) => {
            if (error) throw error;
        });
    } catch (error) {
        core.setFailed(error.Message);
    }
}

run();