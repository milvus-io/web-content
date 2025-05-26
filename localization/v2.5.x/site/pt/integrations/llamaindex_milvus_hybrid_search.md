---
id: llamaindex_milvus_hybrid_search.md
title: RAG utilizando a pesquisa híbrida com Milvus e LlamaIndex
related_key: LlamaIndex
summary: >-
  Este caderno demonstra como usar o Milvus para pesquisa híbrida em pipelines
  RAG [LlamaIndex](https://www.llamaindex.ai/). Começaremos com a pesquisa
  híbrida padrão recomendada (semântica + BM25) e, em seguida, exploraremos
  outros métodos alternativos de incorporação esparsa e personalização do
  reranker híbrido.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG utilizando a pesquisa híbrida com Milvus e LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>A pesquisa híbrida aproveita os pontos fortes da recuperação semântica e da correspondência de palavras-chave para fornecer resultados mais precisos e contextualmente relevantes. Ao combinar as vantagens da pesquisa semântica e da correspondência de palavras-chave, a pesquisa híbrida é particularmente eficaz em tarefas complexas de recuperação de informações.</p>
<p>Este caderno demonstra como usar o Milvus para pesquisa híbrida nos pipelines RAG <a href="https://www.llamaindex.ai/">do LlamaIndex</a>. Começaremos com a pesquisa híbrida padrão recomendada (semântica + BM25) e, em seguida, exploraremos outros métodos alternativos de incorporação esparsa e a personalização do reranker híbrido.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Instalar dependências</strong></p>
<p>Antes de começar, certifique-se de que tem as seguintes dependências instaladas:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, poderá ser necessário <strong>reiniciar o tempo de execução</strong> (navegue até ao menu "Tempo de execução" na parte superior da interface e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<p><strong>Configurar contas</strong></p>
<p>Este tutorial usa o OpenAI para incorporação de texto e geração de respostas. É necessário preparar a <a href="https://platform.openai.com/api-keys">chave da API do OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para utilizar o armazenamento de vectores Milvus, especifique o seu servidor Milvus <code translate="no">URI</code> (e, opcionalmente, com o <code translate="no">TOKEN</code>). Para iniciar um servidor Milvus, pode configurar um servidor Milvus seguindo o <a href="https://milvus.io/docs/install-overview.md">guia de instalação do Milvus</a> ou simplesmente experimentar <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">o Zilliz Cloud</a> gratuitamente.</p>
<blockquote>
<p>A pesquisa de texto completo é atualmente suportada no Milvus Standalone, Milvus Distributed e Zilliz Cloud, mas ainda não no Milvus Lite (planeado para implementação futura). Contacte support@zilliz.com para obter mais informações.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Carregar dados de exemplo</strong></p>
<p>Execute os seguintes comandos para descarregar documentos de exemplo para o diretório "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>De seguida, utilize <code translate="no">SimpleDirectoryReaderLoad</code> para carregar o ensaio "What I Worked On" de Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Pesquisa híbrida com BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção mostra como realizar uma pesquisa híbrida utilizando o BM25. Para começar, vamos inicializar o <code translate="no">MilvusVectorStore</code> e criar um índice para os documentos de exemplo. A configuração padrão usa:</p>
<ul>
<li>Embeddings densos do modelo de embedding padrão ( <code translate="no">text-embedding-ada-002</code> da OpenAI)</li>
<li>BM25 para pesquisa de texto completo se enable_sparse for True</li>
<li>RRFRanker com k=60 para combinar resultados se a pesquisa híbrida estiver activada</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>Aqui estão mais informações sobre os argumentos para configurar campos densos e esparsos no <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>campo denso</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Um sinalizador booleano para ativar ou desativar a incorporação densa. A predefinição é Verdadeiro.</li>
<li><code translate="no">dim (int, optional)</code>: A dimensão dos vectores de incorporação para a coleção.</li>
<li><code translate="no">embedding_field (str, optional)</code>: O nome do campo de incorporação densa para a coleção; a predefinição é DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: A configuração usada para criar o índice de incorporação densa. A predefinição é Nenhum.</li>
<li><code translate="no">search_config (dict, optional)</code>: A configuração utilizada para pesquisar o índice denso Milvus. Note que isto tem de ser compatível com o tipo de índice especificado por <code translate="no">index_config</code>. A predefinição é Nenhum.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: A métrica de similaridade a utilizar para a incorporação densa, atualmente suporta IP, COSINE e L2.</li>
</ul>
<p><strong>campo esparso</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Um sinalizador booleano para ativar ou desativar a incorporação esparsa. O padrão é False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: O nome do campo de incorporação esparsa, com a predefinição DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Se enable_sparse for True, este objeto deve ser fornecido para converter o texto numa incorporação esparsa. Se None, será utilizada a função de incorporação esparsa predefinida (BM25BuiltInFunction) ou será utilizado BGEM3SparseEmbedding, dada a coleção existente sem funções incorporadas.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: A configuração utilizada para construir o índice de incorporação esparso. A predefinição é Nenhum.</li>
</ul>
<p>Para ativar a pesquisa híbrida durante a fase de consulta, defina <code translate="no">vector_store_query_mode</code> para "hybrid". Isto irá combinar e classificar os resultados de pesquisa da pesquisa semântica e da pesquisa de texto completo. Vamos testar com uma consulta de exemplo: "O que é que o autor aprendeu na Viaweb?":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">Personalizar o analisador de texto</h3><p>Os analisadores desempenham um papel vital na pesquisa de texto integral, dividindo as frases em tokens e efectuando o processamento lexical, tal como a remoção de palavras-chave e de palavras de paragem. Normalmente, são específicos do idioma. Para mais pormenores, consulte o <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guide</a>.</p>
<p>O Milvus suporta dois tipos de analisadores: <strong>Analisadores incorporados</strong> e <strong>Analisadores personalizados</strong>. Por padrão, se <code translate="no">enable_sparse</code> estiver definido como True, <code translate="no">MilvusVectorStore</code> utiliza o <code translate="no">BM25BuiltInFunction</code> com configurações padrão, empregando o analisador incorporado padrão que tokeniza o texto com base na pontuação.</p>
<p>Para usar um analisador diferente ou personalizar o existente, você pode fornecer valores para o argumento <code translate="no">analyzer_params</code> ao construir o <code translate="no">BM25BuiltInFunction</code>. Em seguida, defina essa função como <code translate="no">sparse_embedding_function</code> em <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">Pesquisa híbrida com outras incorporações esparsas<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além de combinar a pesquisa semântica com a BM25, o Milvus também suporta a pesquisa híbrida utilizando uma função de incorporação esparsa como a <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. O exemplo seguinte utiliza o sítio <code translate="no">BGEM3SparseEmbeddingFunction</code> para gerar embeddings esparsos.</p>
<p>Primeiro, precisamos de instalar o pacote <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, vamos construir o armazenamento e o índice de vectores utilizando o modelo predefinido do OpenAI para a incorporação de densen e o BGE-M3 incorporado para a incorporação esparsa:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>Agora vamos executar uma consulta de pesquisa híbrida com uma pergunta de exemplo:</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Personalizar a função de incorporação esparsa</h3><p>Você também pode personalizar a função de incorporação esparsa, desde que ela herde de <code translate="no">BaseSparseEmbeddingFunction</code>, incluindo os seguintes métodos:</p>
<ul>
<li><code translate="no">encode_queries</code>: Este método converte os textos em uma lista de embeddings esparsos para consultas.</li>
<li><code translate="no">encode_documents</code>: Este método converte o texto numa lista de embeddings esparsos para documentos.</li>
</ul>
<p>A saída de cada método deve seguir o formato do embedding esparso, que é uma lista de dicionários. Cada dicionário deve ter uma chave (um número inteiro) que representa a dimensão e um valor correspondente (um float) que representa a magnitude da incorporação nessa dimensão (por exemplo, {1: 0,5, 2: 0,3}).</p>
<p>Por exemplo, aqui está uma implementação de função de incorporação esparsa personalizada usando BGE-M3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Personalizar o reranker híbrido<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suporta dois tipos de <a href="https://milvus.io/docs/reranking.md">estratégias de reranking</a>: Reciprocal Rank Fusion (RRF) e Weighted Scoring. O classificador padrão na pesquisa híbrida do <code translate="no">MilvusVectorStore</code> é o RRF com k=60. Para personalizar o classificador híbrido, modifique os seguintes parâmetros:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Especifica o tipo de classificador utilizado nas consultas de pesquisa híbrida. Atualmente só suporta ["RRFRanker", "WeightedRanker"]. A predefinição é "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parâmetros de configuração para o classificador híbrido. A estrutura deste dicionário depende do classificador específico que está a ser utilizado:<ul>
<li>Para "RRFRanker", deve incluir:<ul>
<li>"k" (int): Um parâmetro utilizado no Reciprocal Rank Fusion (RRF). Este valor é utilizado para calcular as pontuações de classificação como parte do algoritmo RRF, que combina várias estratégias de classificação numa única pontuação para melhorar a relevância da pesquisa. O valor predefinido é 60 se não for especificado.</li>
</ul></li>
<li>Para "WeightedRanker", espera-se:<ul>
<li>"weights" (lista de float): Uma lista de exatamente dois pesos:<ol>
<li>O peso para o componente de incorporação densa.</li>
<li>Estes pesos são utilizados para equilibrar a importância dos componentes densos e esparsos das incorporações no processo de recuperação híbrida. Os pesos predefinidos são [1.0, 1.0] se não forem especificados.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
