import { Client, LogLevel } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

export default class Notion {
    private notion: Client;

    constructor(auth: string | undefined) {
        this.notion = new Client({ auth: auth, logLevel: LogLevel.DEBUG });
    }

    async getBpText(pageId: string | undefined): Promise<string> {
        const page: ListBlockChildrenResponse = await this.notion.blocks.children.list({ block_id: pageId || ''});
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
}