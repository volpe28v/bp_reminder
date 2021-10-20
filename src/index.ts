import { Client, LogLevel } from "@notionhq/client";
import {
    GetPageParameters,
    GetPageResponse,
    ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { exit } from "process";
import { isNativeError } from "util/types";

import slack from './slack';


const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN, logLevel: LogLevel.DEBUG });

const pageId = process.env.NOTION_BP_PAGE_ID || '';
const params: GetPageParameters = {
    page_id: pageId
}

async function main() {
    const page: ListBlockChildrenResponse = await notion.blocks.children.list({ block_id: pageId});
    console.dir(page, { depth: null });

    const texts = page.results
      .map((r) => {
          if (r.type == 'bulleted_list_item' && r.bulleted_list_item.text[0].type == 'text'){
            return r.bulleted_list_item.text[0].text.content;
          }else{
            return undefined;
          }
        })
      .filter((r) => { return r != undefined})
    
    const text = texts[Math.floor(Math.random() * texts.length)];
    console.log(text);

    const sendMessage = `今日のベスプラ！ -> 『${text}』`
    var slackClient = new slack;
    slackClient.post({text: sendMessage}, function(e, r, b){ console.log('sent to slack!!')});
}

main();