const { type } = require("os");
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), '.test.env') });
const Client = require("@notionhq/client").Client;

async function readRelationPropertyData() {
    const notion = new Client({ auth: process.env.NOTION_CLIENT_SECRET });
    const pageId = process.env.NOTION_PAGE_ID;
    const propertyId = process.env.NOTION_PROPERTY_ID;

    if (!pageId || !propertyId) {
        throw new Error("Page ID and Property ID are required");
    }
    
    let hasMore = true;
    let cursor = undefined;
    let results = [];

    while (hasMore) {
        const res = await notion.pages.properties.retrieve({
            page_id: pageId,
            property_id: propertyId,
            start_cursor: cursor,
        });    
        results.push(...res.results.map((result) => result.relation));
        hasMore = res.has_more;
        cursor = res.next_cursor;
    }
    
    console.log(`Read ${results.length} related page ids`);

    // Wait for 1s before writing the data back to Notion
    await wait();

    // Write the data back to Notion
    await writeRelationPropertyData(results);
}

async function writeRelationPropertyData(results) {
    // Write the data back to Notion
    const notion = new Client({ auth: process.env.NOTION_CLIENT_SECRET });
    const pageId = process.env.NOTION_PAGE_ID;
    const propertyId = process.env.NOTION_PROPERTY_ID;

    const relationData = results.map((result) => ({ id: result.id }));

    const res = await notion.pages.update({
        page_id: pageId,
        properties: {
            [propertyId]: {
                type: "relation",
                relation: relationData
            }
        }
    })

    console.log("Successfully written the data back to Notion");
}

async function wait() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
}

readRelationPropertyData().then(() => console.log("Done")).catch(console.error);