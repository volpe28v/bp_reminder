import { Client, LogLevel } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import slack from './slack';

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN, logLevel: LogLevel.DEBUG });
const pageId = process.env.NOTION_BP_PAGE_ID || '';

async function getBpTextFromNotion(): Promise<string> {
    const page: ListBlockChildrenResponse = await notion.blocks.children.list({ block_id: pageId});
    //console.dir(page, { depth: null });

    const texts = page.results
      .map((r) => {
          if (r.type == 'bulleted_list_item' && r.bulleted_list_item.text[0].type == 'text'){
            return r.bulleted_list_item.text[0].text.content;
          }else{
            return undefined;
          }
        })
      .filter((r) => { return r != undefined})
    
    return texts[Math.floor(Math.random() * texts.length)] || '';
}

async function main() {
    const text = await getBpTextFromNotion();
    const sendMessage = `今日のベスプラ！ \n\`\`\`\n『${text}』\n\`\`\``

    var slackClient = new slack;
    slackClient.post({
        text: sendMessage,
        channel: 'z_times_dev',
        username: 'kani',
        token: process.env.BP_REMINEDER_TOKEN
    }, function(){ console.log('sent to slack!!')});
}

main();