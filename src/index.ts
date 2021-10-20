import Notion from "./notion";
import Slack from './slack';

async function main() {
    const notionClient = new Notion(process.env.NOTION_ACCESS_TOKEN);
    const text = await notionClient.getBpText(process.env.NOTION_BP_PAGE_ID);

    const sendMessage = `今日のベスプラ！ \n\`\`\`\n『${text}』\n\`\`\``

    const slackClient = new Slack;
    slackClient.post({
        text: sendMessage,
        channel: 'z_times_dev',
        username: 'kani',
        token: process.env.BP_REMINEDER_TOKEN
    }, function(){ console.log('sent to slack!!')});
}

main();