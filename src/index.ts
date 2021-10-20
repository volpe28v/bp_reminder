import { Client, LogLevel } from "@notionhq/client";
import {
    GetPageParameters,
    GetPageResponse,
} from "@notionhq/client/build/src/api-endpoints";


const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN, logLevel: LogLevel.DEBUG });
console.log(process.env.NOTION_ACCESS_TOKEN)

const page_id = 'd967f950237f4b239a9a40fff87ca7c8'
const params: GetPageParameters = {
    page_id: page_id
}

async function main() {
    const page: GetPageResponse = await notion.pages.retrieve(params);
    console.log("hello notion!")
    console.log(page.properties)
        
    const postContent = await notion.blocks.children.list({ block_id: page_id });
    console.dir(postContent, { depth: null });
}

main();