import Notion from "./notion";

async function main() {
  const notionClient = new Notion(process.env.NOTION_ACCESS_TOKEN);
  const texts = await notionClient.getBpTexts(process.env.NOTION_BP_PAGE_ID);

  const messages = texts.slice(0,3).map((t) => {
    return `『${t}』`;
  }).join('\n');
  const sendMessage = `今日のベスプラ！ \n\`\`\`\n${messages}\n\`\`\``;

  console.log(sendMessage);
}

main();
