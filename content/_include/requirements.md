* **Control Plane** is the Helix API, web interface, and postgres database and requires:
  * Linux, macOS or Windows
  * [Docker](https://docs.docker.com/get-started/get-docker/)
  * 4 CPUs, 8GB RAM and 50GB+ free disk space

* **Inference Provider** requires **ONE OF**:
  * An NVIDIA GPU if you want to use private Helix Runners ([example](/helix/private-deployment/controlplane.md#local-helix-on-linux-or-windows-wsl2-with-an-nvidia-gpu)), or
  * [Ollama](https://ollama.com) running locally on macOS, Linux or Windows ([example](/helix/private-deployment/controlplane.md#install-alongside-ollama-on-macos-linux-or-windows)), or
  * An OpenAI-compatible API provider, such as [TogetherAI](https://together.ai) ([example](/helix/private-deployment/controlplane.md#install-control-plane-pointing-at-togetherai)) - we like TogetherAI because you can run the same open source models via their API that you can run locally using Helix GPU Runners, but you can use any OpenAI-compatible API (e.g. vLLM, Azure OpenAI, [Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library) etc)

* **Private Helix Runners** require:
  * As much system memory as you have GPU memory
  * Min 8GB GPU for small models (Llama3-8B, Phi3-Mini), 24GB for Mixtral/SDXL, 40GB for Llama3-70B
  * Min 24GB GPU for fine-tuning (text or image)
  * Recommend 2x24GB GPUs for e.g. text & image inference in parallel
  * NVIDIA 3090s, A6000s are typically good price/performance
  * 150GB+ of free disk space
  * A fast internet connection (small runner image is 23GB)
