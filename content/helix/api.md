---
title: API Reference
weight: 8
prev: /helix/private-deployment/_index.md
---

## Easy to use API

Create a new chat session:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=yo&mode=inference&type=text"
```

Generate an image:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=flying fish&mode=inference&type=image"
```

### Create a Text Fine-Tuning Session

First create a file that will be used to upload the text data. It should be in [`multipart/form-data` format](https://www.rfc-editor.org/rfc/rfc7578). The form data keys `mode` and `type` are required to distinguish that this is a text fine-tuning session.

```shell
cat >session-data.form <<EOL
-----BOUNDARY
Content-Disposition: form-data; name="files"; filename="textfile-1.txt"
Content-Type: application/octet-stream

This is the text for the first file. Create your own AI using any data\\nBuild and optimize text and image AI for your needs. Train, fine-tune, and generate from your data. Deploy in your cloud — or use ours
-----BOUNDARY
Content-Disposition: form-data; name="files"; filename="textfile-2.txt"
Content-Type: application/octet-stream

This is the text for the second file.
-----BOUNDARY
Content-Disposition: form-data; name="mode"

finetune
-----BOUNDARY
Content-Disposition: form-data; name="type"

text
-----BOUNDARY--
EOL
```

Now `POST` that file to Helix to create a new fine-tuning session.

```shell
curl 'https://app.tryhelix.ai/api/v1/sessions' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  -H 'Content-Type: multipart/form-data; boundary=---BOUNDARY' \
  --data-binary @session-data.form \
  --compressed
```

#### Check on the Status of a Fine-Tune Session

First grab the ID of your session from the `id` field of the output of the create session API. Then run:

```shell
curl 'https://app.tryhelix.ai/api/v1/sessions/<SESSION_ID>' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  --compressed
```

The response will show all of the generated QA pairs for the fine-tune session as well as the status of the session.

Look at the `interactions` key to find the current state.

## More Information

Get your API key from [Account](https://app.tryhelix.ai/account) page in the app.

For the rest of the endpoints, see the [code](https://github.com/helixml/helix/blob/main/api/pkg/server/server.go#L81-L215).

Please encourage us to write more on this on [Discord](https://discord.gg/VJftd844GE)!