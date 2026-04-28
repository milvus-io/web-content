---
id: llama_agents_metadata.md
summary: >-
  Neste Notebook, vamos explorar diferentes ideias: Armazenar dados no Milvus,
  utilizar o llama-index com modelos Mistral para consultas de dados, criar
  agentes automatizados de pesquisa e leitura de dados e desenvolver agentes
  para filtragem de metadados com base em consultas do utilizador.
title: 'Sistemas Multi-agentes com Mistral AI, Milvus e Llama-agents'
---
<h1 id="Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="common-anchor-header">Sistemas Multi-agentes com Mistral AI, Milvus e Llama-agents<button data-href="#Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><h2 id="Goal-of-this-Notebook" class="common-anchor-header">Objetivo deste Caderno<button data-href="#Goal-of-this-Notebook" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Neste Notebook, vamos explorar diferentes ideias:</p>
<ul>
<li><p>1️⃣ Armazenar dados no Milvus: Aprenda a armazenar dados no Milvus, um banco de dados vetorial eficiente projetado para pesquisas de similaridade de alta velocidade e aplicativos de IA.</p></li>
<li><p>2️⃣ Utilizar o llama-index com modelos Mistral para consultas de dados: Descubra como utilizar o llama-index em combinação com modelos Mistral para consultar dados armazenados no Milvus.</p></li>
<li><p>3️⃣ Criar agentes automatizados de pesquisa e leitura de dados: Crie agentes que possam pesquisar e ler dados automaticamente com base em consultas do utilizador. Estes agentes automatizados melhorarão a experiência do utilizador ao fornecer respostas rápidas e precisas, reduzindo o esforço de pesquisa manual.</p></li>
<li><p>4️⃣ Desenvolver agentes para filtragem de metadados com base em consultas do utilizador: Implementar agentes que possam gerar automaticamente filtros de metadados a partir de consultas do utilizador, refinando e contextualizando os resultados da pesquisa, evitando confusões e melhorando a precisão das informações recuperadas, mesmo para consultas complexas.</p></li>
<li><p>Resumo No final deste caderno, terá uma compreensão abrangente da utilização de Milvus, llama-index com llama-agents e modelos Mistral para construir um sistema de recuperação de dados robusto e eficiente.</p></li>
</ul>
<h2 id="Milvus" class="common-anchor-header">Milvus<button data-href="#Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>O Milvus é uma base de dados vetorial de código aberto que potencia as aplicações de IA com embeddings vectoriais e pesquisa de semelhanças.</p>
<p>Neste caderno, utilizamos o Milvus Lite, que é a versão mais leve do Milvus.</p>
<p>Com o Milvus Lite, pode começar a construir uma aplicação de IA com pesquisa de semelhanças vectoriais em poucos minutos! O Milvus Lite é bom para ser executado nos seguintes ambientes:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>Computadores portáteis</li>
<li>Dispositivos Edge</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ad459431-95ac-4cbd-a931-453d08d5fdef.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="llama-agents" class="common-anchor-header">llama-agentes<button data-href="#llama-agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><code translate="no">llama-agents</code> torna possível executar agentes como microsserviços. Isso torna possível escalar serviços para cima e para baixo.</p>
<h2 id="llama-index" class="common-anchor-header">llama-index<button data-href="#llama-index" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>LlamaIndex é um framework de dados para sua aplicação LLM. Ele fornece ferramentas como:</p>
<ul>
<li>Conectores de dados ingerem seus dados existentes a partir de sua fonte e formato nativos.</li>
<li>Índices de dados estruturam seus dados em representações intermediárias que são fáceis e eficientes para os LLMs consumirem.</li>
<li>Motores que fornecem acesso em linguagem natural aos seus dados.</li>
<li>Os agentes são trabalhadores do conhecimento com base em LLMs, aumentados por ferramentas, desde simples funções auxiliares até integrações de APIs e muito mais.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/7bd73318-7929-4675-8998-c2e9ef091906.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="Mistral-AI" class="common-anchor-header">Mistral AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>A Mistral AI é um laboratório de investigação que constrói LLMs e Embeddings Models. Recentemente, lançaram novas versões dos seus modelos, Mistral Nemo e Mistral Large, que se revelaram particularmente bons em RAG e chamadas de função. Por isso, vamos usá-los neste caderno</p>
<h2 id="Install-Dependencies" class="common-anchor-header">Instalar dependências<button data-href="#Install-Dependencies" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-agents pymilvus milvus-lite openai python-dotenv</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index-readers-file llama-index-llms-ollama llama-index-llms-mistralai llama-index-embeddings-mistralai</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> This is ONLY necessary in jupyter notebook.</span>
<span class="hljs-comment"># Details: Jupyter runs an event-loop behind the scenes.</span>
<span class="hljs-comment">#          This results in nested event-loops when we start an event-loop to make async queries.</span>
<span class="hljs-comment">#          This is normally not allowed, we use nest_asyncio to allow it for convenience.</span>
<span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-your-API-Key-for-Mistral" class="common-anchor-header">Obtenha sua chave de API para o Mistral<button data-href="#Get-your-API-Key-for-Mistral" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Você pode obter a chave da API Mistral no <a href="https://console.mistral.ai/api-keys/">Mistral Cloud Console</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;&quot;&quot;
load_dotenv reads key-value pairs from a .env file and can set them as environment variables.
This is useful to avoid leaking your API key for example :D
&quot;&quot;&quot;</span>

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">import</span> os

load_dotenv()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">True
</code></pre>
<h2 id="Download-data" class="common-anchor-header">Baixar dados<button data-href="#Download-data" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/10k/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/uber_2021.pdf&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/lyft_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/lyft_2021.pdf&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h1 id="Prepare-Embedding-Model" class="common-anchor-header">Preparar modelo de incorporação<button data-href="#Prepare-Embedding-Model" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Definimos o modelo de incorporação que será usado neste notebook. Usamos <code translate="no">mistral-embed</code>, é um modelo de incorporação desenvolvido pela Mistral, que foi treinado com as recuperações em mente, o que o torna muito bom para o nosso sistema Agentic RAG. Para mais pormenores, consulte a página <a href="https://docs.mistral.ai/capabilities/embeddings/">Embedding</a> na documentação da Mistral.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.embeddings.mistralai <span class="hljs-keyword">import</span> MistralAIEmbedding

<span class="hljs-comment"># Define the default Embedding model used in this Notebook.</span>
<span class="hljs-comment"># We are using Mistral Models, so we are also using Mistral Embeddings</span>

Settings.embed_model = MistralAIEmbedding(model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LLM-Model" class="common-anchor-header">Definir o modelo LLM<button data-href="#Define-the-LLM-Model" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>O Llama Index usa LLMs para responder a prompts e consultas, e é responsável por escrever respostas em linguagem natural. Definimos o Mistral Nemo como o padrão. O Nemo oferece uma grande janela de contexto de até 128k tokens. O seu raciocínio, conhecimento do mundo e precisão de codificação são os mais avançados na sua categoria de tamanho.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama

Settings.llm = Ollama(<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instanciate-Milvus-and-Load-Data" class="common-anchor-header">Instanciar o Milvus e carregar dados<button data-href="#Instanciate-Milvus-and-Load-Data" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><a href="https://milvus.io/">Milvus</a> é um popular banco de dados vetorial de código aberto que alimenta aplicativos de IA com pesquisa de similaridade vetorial escalável e de alto desempenho.</p>
<ul>
<li>Definir o uri como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, digamos mais de um milhão de vectores, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Nesta configuração, utilize o uri do servidor, por exemplo,<code translate="no">http://localhost:19530</code>, como o seu uri.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste o uri e o token, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">chave API</a> no Zilliz Cloud.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
<span class="hljs-keyword">from</span> llama_index.core.tools <span class="hljs-keyword">import</span> QueryEngineTool, ToolMetadata

input_files = [<span class="hljs-string">&quot;./data/10k/lyft_2021.pdf&quot;</span>, <span class="hljs-string">&quot;./data/10k/uber_2021.pdf&quot;</span>]

<span class="hljs-comment"># Create a single Milvus vector store</span>
vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1024</span>, overwrite=<span class="hljs-literal">False</span>, collection_name=<span class="hljs-string">&quot;companies_docs&quot;</span>
)

<span class="hljs-comment"># Create a storage context with the Milvus vector store</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)

<span class="hljs-comment"># Load data</span>
docs = SimpleDirectoryReader(input_files=input_files).load_data()

<span class="hljs-comment"># Build index</span>
index = VectorStoreIndex.from_documents(docs, storage_context=storage_context)

<span class="hljs-comment"># Define the query engine</span>
company_engine = index.as_query_engine(similarity_top_k=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Tools" class="common-anchor-header">Definir ferramentas<button data-href="#Define-Tools" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Um dos principais passos na construção de um agente eficaz é a definição das ferramentas que este pode utilizar para executar as suas tarefas. Estas ferramentas são essencialmente funções ou serviços que o agente pode invocar para obter informações ou executar acções.</p>
<p>De seguida, definiremos duas ferramentas que o nosso agente pode utilizar para consultar informações financeiras sobre a Lyft e a Uber a partir do ano 2021. Estas ferramentas serão integradas no nosso agente, permitindo-lhe responder a consultas em linguagem natural com informações precisas e relevantes.</p>
<p>Se olhar para o gráfico que temos no topo, isto é o que é um "Serviço de agente".</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the different tools that can be used by our Agent.</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;lyft_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Lyft financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;uber_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Uber financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># Set up the agent</span>
llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)

response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;Could you please provide a comparison between Lyft and Uber&#x27;s total revenues in 2021?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Example usage without metadata filtering</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response without metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response without metadata filtering:
The revenue for Lyft in 2021 was $3.84 billion.

Uber's total revenue for the year ended December 31, 2021 was $17,455 million.
</code></pre>
<h2 id="Metadata-Filtering" class="common-anchor-header">Filtragem de metadados<button data-href="#Metadata-Filtering" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><strong>O Milvus</strong> suporta a <a href="https://zilliz.com/blog/json-metadata-filtering-in-milvus">filtragem de metadados</a>, uma técnica que permite refinar e restringir os resultados da pesquisa com base em atributos específicos ou etiquetas associadas aos seus dados. Isto é particularmente útil em cenários em que tem muitos dados e precisa de recuperar apenas o subconjunto relevante de dados que corresponde a determinados critérios.</p>
<h2 id="Use-Cases-for-Metadata-Filtering" class="common-anchor-header">Casos de utilização para filtragem de metadados<button data-href="#Use-Cases-for-Metadata-Filtering" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p><strong>Precisão nos resultados da pesquisa</strong>: Ao aplicar filtros de metadados, pode garantir que os resultados da pesquisa são altamente relevantes para a consulta do utilizador. Por exemplo, se tiver uma coleção de documentos financeiros, pode filtrá-los com base no nome da empresa, ano ou quaisquer outros metadados relevantes.</p></li>
<li><p><strong>Eficiência</strong>: A filtragem de metadados ajuda a reduzir a quantidade de dados que têm de ser processados, tornando as operações de pesquisa mais eficientes. Isto é especialmente benéfico quando se lida com grandes conjuntos de dados.</p></li>
<li><p><strong>Personalização</strong>: Diferentes utilizadores ou aplicações podem ter requisitos diferentes. A filtragem de metadados permite-lhe personalizar os resultados da pesquisa para satisfazer necessidades específicas, como a recuperação de documentos de um determinado ano ou empresa.</p></li>
</ul>
<h2 id="Example-usage" class="common-anchor-header">Exemplo de utilização<button data-href="#Example-usage" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>No bloco de código abaixo, a filtragem de metadados é utilizada para criar um motor de pesquisa filtrado que recupera documentos com base num par chave-valor de metadados específico: <code translate="no">file_name</code>: <code translate="no">lyft_2021.pdf</code></p>
<p>O <code translate="no">QueryEngineTool</code> definido abaixo é mais genérico do que o definido acima. No anterior, tínhamos uma ferramenta por empresa (Uber e Lyft), neste, é mais genérico. Só sabemos que temos documentos financeiros sobre as empresas, mas é só isso. Ao adicionar um filtro de metadados, podemos filtrar para obter apenas dados de um documento específico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Example usage with metadata filtering</span>
filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;lyft_2021.pdf&quot;</span>)]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;filters: <span class="hljs-subst">{filters}</span>&quot;</span>)
filtered_query_engine = index.as_query_engine(filters=filters)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Use this tool to retrieve specific data points about a company. &quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">filters: filters=[MetadataFilter(key='file_name', value='lyft_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<h2 id="Function-Calling" class="common-anchor-header">Chamada de funções<button data-href="#Function-Calling" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Mistral Nemo e Large suportam chamadas de funções nativas. Há uma integração perfeita com as ferramentas LlamaIndex, através da função <code translate="no">predict_and_call</code> no llm. Isso permite que o usuário anexe qualquer ferramenta e deixe o LLM decidir quais ferramentas chamar (se houver).</p>
<p>Pode saber mais sobre <a href="https://docs.llamaindex.ai/en/latest/module_guides/deploying/agents/">os Agentes</a> no sítio Web do llama-index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up the LLM we will use for Function Calling</span>

llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Interact-with-the-Agent" class="common-anchor-header">Interagir com o agente<button data-href="#Interact-with-the-Agent" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Agora podemos ver a Filtragem de Metadados em ação:</p>
<ol>
<li>Na primeira, o agente não deve conseguir encontrar nada para a consulta do utilizador, uma vez que se trata da Uber e filtramos apenas documentos sobre a Lyft.</li>
<li>No segundo, o agente deve conseguir encontrar informações sobre a Lyft, uma vez que só pesquisamos documentos sobre a Lyft.</li>
</ol>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;How many employees does Uber have?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I'm unable to provide information about Uber's employee count as it's outside the given Lyft context.
</code></pre>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;What are the risk factors for Lyft?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Investing in Lyft carries significant risks. These include general economic factors like impacts from pandemics or crises, operational factors such as competition, pricing changes, and driver/ride growth unpredictability, insurance coverage issues, autonomous vehicle technology uncertainties, reputational concerns, potential security breaches, reliance on third-party services, and challenges in expanding platform offerings. Lyft's business operations are subject to numerous other risks not explicitly mentioned here, which could also harm its financial condition and prospects.
</code></pre>
<h2 id="Example-of-Confusion-Without-Metadata-Filtering" class="common-anchor-header">Exemplo de confusão sem filtragem de metadados<button data-href="#Example-of-Confusion-Without-Metadata-Filtering" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><pre><code translate="no" class="language-text">&gt; Question: What are the risk factors for Uber?

&gt; Response without metadata filtering:
Based on the provided context, which pertains to Lyft&#x27;s Risk Factors section in their Annual Report, some of the potential risk factors applicable to a company like Uber might include:

- General economic factors such as the impact of global pandemics or other crises on ride-sharing demand.
- Operational factors like competition in ride-hailing services, unpredictability in results of operations, and uncertainty about market growth for ridesharing and related services.
- Risks related to attracting and retaining qualified drivers and riders.
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, o sistema fornece incorretamente informações sobre a Lyft em vez da Uber, o que leva a uma resposta enganadora. Começa por dizer que não tem a informação, mas depois continua.</p>
<h2 id="Using-an-Agent-to-Extract-Metadata-Filters" class="common-anchor-header">Utilizar um agente para extrair filtros de metadados<button data-href="#Using-an-Agent-to-Extract-Metadata-Filters" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Para resolver este problema, podemos utilizar um agente para extrair automaticamente filtros de metadados da pergunta do utilizador e aplicá-los durante o processo de resposta à pergunta. Isso garante que o sistema recupere as informações corretas e relevantes.</p>
<h2 id="Code-Example" class="common-anchor-header">Exemplo de código<button data-href="#Code-Example" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Abaixo está um exemplo de código que demonstra como criar um motor de consulta filtrada utilizando um agente para extrair filtros de metadados da pergunta do utilizador:</p>
<h3 id="Explanation" class="common-anchor-header">Explicação<button data-href="#Explanation" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li><p><strong>Modelo de prompt</strong>: A classe PromptTemplate é utilizada para definir um modelo para extrair filtros de metadados da pergunta do utilizador. O modelo dá instruções ao modelo de linguagem para considerar nomes de empresas, anos e outros atributos relevantes.</p></li>
<li><p><strong>LLM</strong>: Mistral Nemo é utilizado para gerar os filtros de metadados com base na pergunta do utilizador. O modelo é solicitado com a pergunta e o modelo para extrair os filtros relevantes.</p></li>
<li><p><strong>Filtros de metadados</strong>: A resposta do LLM é analisada para criar um objeto <code translate="no">MetadataFilters</code>. Se não forem mencionados filtros específicos, é devolvido um objeto <code translate="no">MetadataFilters</code> vazio.</p></li>
<li><p><strong>Motor de consulta filtrado</strong>: O método <code translate="no">index.as_query_engine(filters=metadata_filters)</code> cria um motor de consulta que aplica os filtros de metadados extraídos ao índice. Isto garante que apenas são recuperados os documentos que correspondem aos critérios de filtragem.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.prompts.base <span class="hljs-keyword">import</span> PromptTemplate


<span class="hljs-comment"># Function to create a filtered query engine</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_query_engine</span>(<span class="hljs-params">question</span>):
    <span class="hljs-comment"># Extract metadata filters from question using a language model</span>
    prompt_template = PromptTemplate(
        <span class="hljs-string">&quot;Given the following question, extract relevant metadata filters.\n&quot;</span>
        <span class="hljs-string">&quot;Consider company names, years, and any other relevant attributes.\n&quot;</span>
        <span class="hljs-string">&quot;Don&#x27;t write any other text, just the MetadataFilters object&quot;</span>
        <span class="hljs-string">&quot;Format it by creating a MetadataFilters like shown in the following\n&quot;</span>
        <span class="hljs-string">&quot;MetadataFilters(filters=[ExactMatchFilter(key=&#x27;file_name&#x27;, value=&#x27;lyft_2021.pdf&#x27;)])\n&quot;</span>
        <span class="hljs-string">&quot;If no specific filters are mentioned, returns an empty MetadataFilters()\n&quot;</span>
        <span class="hljs-string">&quot;Question: {question}\n&quot;</span>
        <span class="hljs-string">&quot;Metadata Filters:\n&quot;</span>
    )

    prompt = prompt_template.<span class="hljs-built_in">format</span>(question=question)
    llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
    response = llm.complete(prompt)

    metadata_filters_str = response.text.strip()
    <span class="hljs-keyword">if</span> metadata_filters_str:
        metadata_filters = <span class="hljs-built_in">eval</span>(metadata_filters_str)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;eval: <span class="hljs-subst">{metadata_filters}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> index.as_query_engine(filters=metadata_filters)
    <span class="hljs-keyword">return</span> index.as_query_engine()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = create_query_engine(
    <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Example usage with metadata filtering</span>
question = <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
filtered_query_engine = create_query_engine(question)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs_filtering&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
            ),
        ),
    ),
]
<span class="hljs-comment"># Set up the agent with the updated query engine tools</span>
response = llm.predict_and_call(
    query_engine_tools,
    user_msg=question,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response with metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
Response with metadata filtering:
Uber's total revenue for the year ended December 31, 2021, is $17.455 billion.
</code></pre>
<h2 id="Orchestrating-the-different-services-with-Mistral-Large" class="common-anchor-header">Orquestração dos diferentes serviços com Mistral Large<button data-href="#Orchestrating-the-different-services-with-Mistral-Large" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>O Mistral Large é o modelo principal do Mistral, com muito boas capacidades de raciocínio, conhecimento e codificação. É ideal para tarefas complexas que exigem grandes capacidades de raciocínio ou são altamente especializadas. Possui recursos avançados de chamada de função, que é exatamente o que precisamos para orquestrar nossos diferentes agentes.</p>
<h3 id="Why-do-we-need-a-smarter-Model" class="common-anchor-header">Porque é que precisamos de um modelo mais inteligente?<button data-href="#Why-do-we-need-a-smarter-Model" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>A pergunta que está a ser respondida abaixo é particularmente desafiadora porque requer a orquestração de vários serviços e agentes para fornecer uma resposta coerente e precisa. Isto envolve a coordenação de várias ferramentas e agentes para obter e processar informações de diferentes fontes, como dados financeiros de diferentes empresas.</p>
<h3 id="Whats-so-difficult-about-that" class="common-anchor-header">O que é que isso tem de tão difícil?<button data-href="#Whats-so-difficult-about-that" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li>A complexidade: A questão envolve vários agentes e serviços, cada um com a sua própria funcionalidade e fontes de dados. Coordenar estes agentes para que trabalhem em conjunto e sem problemas é uma tarefa complexa.</li>
</ul>
<ul>
<li><p>Integração de dados: A pergunta requer a integração de dados de diferentes fontes, o que pode ser um desafio devido às variações nos formatos, estruturas e metadados dos dados.</p></li>
<li><p>Compreensão contextual: A pergunta pode exigir a compreensão do contexto e das relações entre diferentes informações, o que é uma tarefa cognitivamente exigente.</p></li>
</ul>
<h3 id="Why-would-Mistral-Large-help-in-this-case" class="common-anchor-header">Por que é que o Mistral Large ajudaria neste caso?<button data-href="#Why-would-Mistral-Large-help-in-this-case" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>O Mistral Large é adequado para essa tarefa devido aos seus recursos avançados de raciocínio e chamada de função. Aqui está como isso ajuda:</p>
<ul>
<li><p>Raciocínio avançado: O Mistral Large pode lidar com tarefas complexas de raciocínio, tornando-o ideal para orquestrar vários agentes e serviços. Ele pode entender as relações entre diferentes informações e tomar decisões informadas.</p></li>
<li><p>Recursos de chamada de função: O Mistral Large possui recursos avançados de chamada de função, essenciais para coordenar as ações de diferentes agentes. Isso permite a integração e orquestração perfeitas de vários serviços.</p></li>
<li><p>Conhecimento especializado: O Mistral Large foi projetado para tarefas altamente especializadas, tornando-o adequado para lidar com consultas complexas que exigem profundo conhecimento de domínio.</p></li>
</ul>
<p>Por todos esses motivos, decidi que usar o Mistral Large em vez do Mistral Nemo era mais adequado aqui.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_agents <span class="hljs-keyword">import</span> (
    AgentService,
    ToolService,
    LocalLauncher,
    MetaServiceTool,
    ControlPlaneServer,
    SimpleMessageQueue,
    AgentOrchestrator,
)

<span class="hljs-keyword">from</span> llama_index.core.agent <span class="hljs-keyword">import</span> FunctionCallingAgentWorker
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># create our multi-agent framework components</span>
message_queue = SimpleMessageQueue()
control_plane = ControlPlaneServer(
    message_queue=message_queue,
    orchestrator=AgentOrchestrator(llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)),
)

<span class="hljs-comment"># define Tool Service</span>
tool_service = ToolService(
    message_queue=message_queue,
    tools=query_engine_tools,
    running=<span class="hljs-literal">True</span>,
    step_interval=<span class="hljs-number">0.5</span>,
)

<span class="hljs-comment"># define meta-tools here</span>
meta_tools = [
    <span class="hljs-keyword">await</span> MetaServiceTool.from_tool_service(
        t.metadata.name,
        message_queue=message_queue,
        tool_service=tool_service,
    )
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> query_engine_tools
]

<span class="hljs-comment"># define Agent and agent service</span>
worker1 = FunctionCallingAgentWorker.from_tools(
    meta_tools, llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)
)

agent1 = worker1.as_agent()
agent_server_1 = AgentService(
    agent=agent1,
    message_queue=message_queue,
    description=<span class="hljs-string">&quot;Used to answer questions over differnet companies for their Financial results&quot;</span>,
    service_name=<span class="hljs-string">&quot;Companies_analyst_agent&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> logging

<span class="hljs-comment"># change logging level to enable or disable more verbose logging</span>
logging.getLogger(<span class="hljs-string">&quot;llama_agents&quot;</span>).setLevel(logging.INFO)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Define Launcher</span>
launcher = LocalLauncher(
    [agent_server_1, tool_service],
    control_plane,
    message_queue,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_str = <span class="hljs-string">&quot;What are the risk factors for Uber?&quot;</span>
result = launcher.launch_single(query_str)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:llama_agents.message_queues.simple - Consumer AgentService-27cde4ed-5163-4005-90fc-13c158eda7e3: Companies_analyst_agent has been registered.
INFO:llama_agents.message_queues.simple - Consumer ToolService-b73c500a-5fbe-4f57-95c7-db74e173bd1b: default_tool_service has been registered.
INFO:llama_agents.message_queues.simple - Consumer 62465ab8-32ff-436e-95fa-74e828745150: human has been registered.
INFO:llama_agents.message_queues.simple - Consumer ControlPlaneServer-f4c27d43-5474-43ca-93ca-a9aeed4534d7: control_plane has been registered.
INFO:llama_agents.services.agent - Companies_analyst_agent launch_local
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Launching message queue locally
INFO:llama_agents.services.agent - Processing initiated.
INFO:llama_agents.services.tool - Processing initiated.
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.simple - Consumer MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41: MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41 has been registered.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f4c270a4-bc47-4bbf-92fe-e2cc80757943 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f888f9a8-e716-4505-bfe2-577452e9b6e6 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'human' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'human' to consumer.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{&quot;name&quot;: &quot;finalize&quot;, &quot;arguments&quot;: {&quot;input&quot;: &quot;Uber faces several risk factors, including general economic impacts such as pandemics or downturns, operational challenges like competition, market growth uncertainty, attracting and retaining drivers and riders, insurance adequacy, autonomous vehicle technology development, maintaining its reputation and brand, and managing growth. Additionally, reliance on third-party providers for various services can introduce further risks to its operations.&quot;}}]
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Neste caderno, viu como pode utilizar agentes Llama para realizar diferentes acções, chamando as ferramentas adequadas. Ao usar o Mistral Large em combinação com o Mistral Nemo, demonstramos como orquestrar efetivamente sistemas inteligentes e eficientes em termos de recursos, aproveitando os pontos fortes de diferentes LLMs. Vimos que o agente pode escolher a coleção que contém os dados solicitados pelo utilizador.</p>
