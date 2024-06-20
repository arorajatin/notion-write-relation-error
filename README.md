# notion-write-relation-error

1. Clone this page into your Notion account - https://utilizeapps.notion.site/Projects-Tasks-dd14a2c3e40248a99b9ff40781253f17?pvs=4

2. Get the Projects database ID, Tasks property ID (inside the Projects database)

3. Get the Page ID for the "Marketing Campaign' page in the Projects database

4. Create a .env file with the following key value pairs
```plaintext
NOTION_CLIENT_SECRET="<enter your client secret>"
NOTION_DB_ID="<enter your db id>"
NOTION_PAGE_ID="<enter your page id>"
NOTION_PROPERTY_ID="<enter your property id>"
```

5. Run `npm install`

6. Run `node index.js` to notice the following error:
```
APIResponseError: body failed validation: body.properties...... should be ≤ `100`, instead was `130`
```