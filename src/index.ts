import Notion from "./notion";
import Slack from './slack';

export const bpReminder = async function main() {
    const notionClient = new Notion(process.env.NOTION_ACCESS_TOKEN);
    const texts = await notionClient.getBpTexts(process.env.NOTION_BP_PAGE_ID);

    const messages = texts.slice(0,3).map((t) => {
      return `『${t}』`;
    }).join('\n');
    const sendMessage = `今日のベスプラ！ \n\`\`\`\n${messages}\n\`\`\``;
    
    const slackClient = new Slack;
    slackClient.post({
        text: sendMessage,
        channel: 'z_times_dev',
        username: 'kani',
        token: process.env.BP_REMINEDER_TOKEN
    }, function(){ console.log('sent to slack!!')});
}

export default bpReminder;