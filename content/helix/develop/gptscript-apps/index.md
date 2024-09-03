---
title: GPTScript Apps
description: Learn how to use GPTScript with Helix Apps to create your very own AI frontend.
weight: 2
---

Helix supports [GPTScript](https://gptscript.ai) to allow you to write simple "scripted" natural language powered apps by just writing prompts. Also check out the [examples apps in the documentation](/helix/examples/apps/gptscript-app-recommendations/index.md)

We support a development workflow where you run the Helix GPTScript Dev Server locally, and a production workflow where you deploy updates to GPTScript powered apps via `git push`.

![](apps-01.png)

We provide a simple Javascript library (and API) to call into GPTScript you push to a git repo and run it securely in a container so you don't need to worry about the user convincing the LLM to run malicious commands – it all runs in a throwaway VM anyway.

## Example Javascript Code

Install **[@helixml/apps-client](https://www.npmjs.com/package/@helixml/apps-client)** from npm:

```bash
npm i @helixml/apps-client
```

Add to your Javascript code:

```js
import AppClient from '@helixml/apps-client'

const appClient = AppClient({
  token: "your app token",
})
```

Where "your app token" comes from the API key for that app on the app configuration page at [https://app.tryhelix.ai/apps](https://app.tryhelix.ai/apps) (you'll need to link a github repository).

![](apps-03.png)

Then from inside your app, you can simply call the gptscript by using `appClient.runScript`. Ask the AI nicely for JSON output, then parse it on the Javascript side. Example:

```js
const result = await appClient.runScript({
    file_path: '/gptscripts/waitrose.gpt',
    input: `--user_id '${email}' --number '2' --recipe_theme '${recipeTheme}'`,
})
```

## Example gptscript

GPTScript is pretty easy to write, first you declare which tools you want the script to be able to use, then you specify arguments (as shown being passed in above), then you just write instructions for the LLM (including calling its tools) in natural language. For example, here's a recipe suggestion picker for customized recipe recommendations:

`waitrose.gpt`:
```
tools: recipe.query, purchases.query, sys.read
args: user_id: The user_id we want to know about.
args: recipe_theme: The theme of the recipes.
args: number: The number of recipes to output.

Do the following steps sequentially:
  1. Run tool {recipe.query} to get a list of candidate recipes for the given
     user as a CSV file written to recipes.csv.
  2. Run tool {purchases.query} to get a list of the top 10 products most bought
     by the given user written to purchases.csv.
  3. Read files recipes.csv (the suggested recipes) and purchases.csv (the
     user's previous top purchase history) and output a JSON list of {number},
     {recipe_theme} theme recipes that you think the user would like based on
     their purchase history.

[...]

Output the exact image url from the CSV file, do not invent one. Output format:

[{
  "recipe.name": "name",
  "recipe.summary": "summary",
  "recipe.imageurl": "imageurl"
}]
```

<!-- TODO: write docs for apps/gptscript API -->

## Example helix.yaml

You must tell helix where to search for gptscripts in a simple `helix.yaml`:
```
gptscript:
  files:
    - gptscripts/*.gpt
```

## GPTScript tips

One tip when writing gptscript, is to make the LLM spend as much time outputting things that are natural language, and not to spend time transferring data from one place to another. That's why in this example, we tell sqlite to write its result as a csv file using the `.output` command:
```
---
name: purchases.query
tools: sys.exec
description: Query for the top 10 products most bought products by user_id, writing result to purchases.csv.
--command
sqlite3 recipes.sqlite <<EOF
.headers on
.mode csv
.output purchases.csv
SELECT product, quantity
FROM Purchases
WHERE user_id = '${user_id}'
ORDER BY quantity DESC
LIMIT 10;
EOF
```
Then we simply read that into the context window. If you don't write it to a file, you end up with the LLM processing the raw output and summarizing it as markdown, which is wasteful and slow when you just want to pass it as the _input_ to the next step -- in that case, just use a file!