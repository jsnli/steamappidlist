const core = require('@actions/core');
const fs = require('fs');

const url = "https://jsonplaceholder.typicode.com/posts/1";

async function run() {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        fs.writeFileSync('data.json', JSON.stringify(jsonData), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        core.setFailed(error.Message);
    }
}

run();