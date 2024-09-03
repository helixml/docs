If you don't want to attach your own GPUs to run models locally, you can specify an external OpenAI-compatible LLM provider. On the controlplane `.env` simply add:

```
INFERENCE_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=<any OpenAI compatible API>
```

The frontend will automatically list models available on the LLM provider. You can also specify any model name supported by the provider in a [helix app yaml](/helix/develop/getting-started/) with the `model` field on an assistant.

Alternatively, you can attach a GPU runner as described in the following section.

Apps, RAG and API calling for text inference all work with external LLM providers. If you want image inference, or text or image fine tuning, you need to attach your own GPU runners.