---
id: integrate_with_langfuse.md
summary: >-
  Este é um livro de receitas simples que demonstra como utilizar a integração
  LlamaIndex Langfuse. Utiliza o Milvus Lite para armazenar os documentos e o
  Query.
title: Utilização do Langfuse para avaliar a qualidade do RAG
---
<h1 id="Using-Langfuse-to-Trace-Queries-in-RAG" class="common-anchor-header">Utilização do Langfuse para rastrear consultas no RAG<button data-href="#Using-Langfuse-to-Trace-Queries-in-RAG" class="anchor-icon" translate="no">
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
    </button></h1><p><a target="_blank" href="https://colab.research.google.com/github/langfuse/langfuse-docs/blob/main/cookbook/integration_llama-index_milvus-lite.ipynb">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a></p>
<p>Este é um livro de receitas simples que demonstra como utilizar o Langfuse para rastrear as suas consultas no RAG. O pipeline RAG é implementado com LlamaIndex e Milvus Lite para armazenar e recuperar os documentos.</p>
<p>Neste início rápido, mostraremos como configurar uma aplicação LlamaIndex utilizando o Milvus Lite como o armazenamento de vectores. Também mostraremos como usar a integração Langfuse LlamaIndex para rastrear sua aplicação.</p>
<p><a href="https://github.com/langfuse/langfuse">O Langfuse</a> é uma plataforma de engenharia LLM de código aberto que ajuda as equipas a depurar, analisar e iterar de forma colaborativa as suas aplicações LLM. Todos os recursos da plataforma são integrados nativamente para acelerar o fluxo de trabalho de desenvolvimento.</p>
<p><a href="https://github.com/milvus-io/milvus-lite/">O Milvus Lite</a> é a versão leve do Milvus, uma base de dados vetorial de código aberto que potencia as aplicações de IA com embeddings vectoriais e pesquisa de semelhanças.</p>
<h2 id="Setup" class="common-anchor-header">Configuração<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que tem os sites <code translate="no">llama-index</code> e <code translate="no">langfuse</code> instalados.</p>
<pre><code translate="no" class="language-python">$ pip install llama-index langfuse llama-index-vector-stores-milvus --upgrade
<button class="copy-code-btn"></button></code></pre>
<p>Inicialize a integração. Obtenha as suas chaves de API nas <a href="https://cloud.langfuse.com">definições do projeto Langfuse</a> e substitua public_key secret_key pelos seus valores de chave. Este exemplo utiliza o OpenAI para incorporação e conclusão do chat, pelo que também precisa de especificar a sua chave OpenAI na variável de ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Get keys for your project from the project settings page</span>
<span class="hljs-comment"># https://cloud.langfuse.com</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_PUBLIC_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_SECRET_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_HOST&quot;</span>] = <span class="hljs-string">&quot;https://cloud.langfuse.com&quot;</span> <span class="hljs-comment"># 🇪🇺 EU region</span>
<span class="hljs-comment"># os.environ[&quot;LANGFUSE_HOST&quot;] = &quot;https://us.cloud.langfuse.com&quot; # 🇺🇸 US region</span>

<span class="hljs-comment"># Your openai key</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.core.callbacks <span class="hljs-keyword">import</span> CallbackManager
<span class="hljs-keyword">from</span> langfuse.llama_index <span class="hljs-keyword">import</span> LlamaIndexCallbackHandler
 
langfuse_callback_handler = LlamaIndexCallbackHandler()
Settings.callback_manager = CallbackManager([langfuse_callback_handler])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-using-Milvus-Lite" class="common-anchor-header">Índice usando Milvus Lite<button data-href="#Index-using-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document

doc1 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Maxwell &quot;Max&quot; Silverstein, a lauded movie director, screenwriter, and producer, was born on October 25, 1978, in Boston, Massachusetts. A film enthusiast from a young age, his journey began with home movies shot on a Super 8 camera. His passion led him to the University of Southern California (USC), majoring in Film Production. Eventually, he started his career as an assistant director at Paramount Pictures. Silverstein&#x27;s directorial debut, “Doors Unseen,” a psychological thriller, earned him recognition at the Sundance Film Festival and marked the beginning of a successful directing career.
&quot;&quot;&quot;</span>)
doc2 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Throughout his career, Silverstein has been celebrated for his diverse range of filmography and unique narrative technique. He masterfully blends suspense, human emotion, and subtle humor in his storylines. Among his notable works are &quot;Fleeting Echoes,&quot; &quot;Halcyon Dusk,&quot; and the Academy Award-winning sci-fi epic, &quot;Event Horizon&#x27;s Brink.&quot; His contribution to cinema revolves around examining human nature, the complexity of relationships, and probing reality and perception. Off-camera, he is a dedicated philanthropist living in Los Angeles with his wife and two children.
&quot;&quot;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example index construction + LLM query</span>

<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;tmp/milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">False</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    [doc1,doc2], storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query" class="common-anchor-header">Consultar<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
response = index.as_query_engine().query(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Chat</span>
response = index.as_chat_engine().chat(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Explore-traces-in-Langfuse" class="common-anchor-header">Explorar traços no Langfuse<button data-href="#Explore-traces-in-Langfuse" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># As we want to immediately see result in Langfuse, we need to flush the callback handler</span>
langfuse_callback_handler.flush()
<button class="copy-code-btn"></button></code></pre>
<p>Concluído! Pode ver os vestígios do seu índice e consulta no seu projeto Langfuse.</p>
<p>Exemplos de traços (ligações públicas):</p>
<ol>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/2b26fc72-044f-4b0b-a3c3-485328975161">Consulta</a></li>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/72503163-2b25-4693-9cc9-56190b8e32b9">Consulta (chat)</a></li>
</ol>
<p>Traço em Langfuse:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://static.langfuse.com/llamaindex-langfuse-docs.gif" alt="Langfuse Traces" class="doc-image" id="langfuse-traces" />
   </span> <span class="img-wrapper"> <span>Traços de Langfuse</span> </span></p>
<h2 id="Interested-in-more-advanced-features" class="common-anchor-header">Interessado em recursos mais avançados?<button data-href="#Interested-in-more-advanced-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Consulte os <a href="https://langfuse.com/docs/integrations/llama-index/get-started">documentos</a> completos <a href="https://langfuse.com/docs/integrations/llama-index/get-started">de integração</a> para saber mais sobre os recursos avançados e como usá-los:</p>
<ul>
<li>Interoperabilidade com o Langfuse Python SDK e outras integrações</li>
<li>Adicionar metadados e atributos personalizados aos traços</li>
</ul>
