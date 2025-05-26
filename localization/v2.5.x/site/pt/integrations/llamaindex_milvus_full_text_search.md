---
id: llamaindex_milvus_full_text_search.md
title: Utilizar a pesquisa de texto integral com LlamaIndex e Milvus
related_key: LlamaIndex
summary: >-
  Neste tutorial, aprenderá a utilizar o LlamaIndex e o Milvus para criar um
  sistema RAG utilizando a pesquisa de texto integral e a pesquisa híbrida.
  Começaremos por implementar apenas a pesquisa de texto integral e, em seguida,
  melhorá-la-emos integrando a pesquisa semântica para obter resultados mais
  abrangentes.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Utilizar a pesquisa de texto integral com LlamaIndex e Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>A pesquisa de texto integral</strong> utiliza a correspondência exacta de palavras-chave, recorrendo frequentemente a algoritmos como o BM25 para classificar os documentos por relevância. Nos sistemas <strong>RAG (Retrieval-Augmented Generation)</strong>, este método recupera texto pertinente para melhorar as respostas geradas pela IA.</p>
<p>Entretanto, <strong>a pesquisa semântica</strong> interpreta o significado contextual para fornecer resultados mais alargados. A combinação de ambas as abordagens cria uma <strong>pesquisa híbrida</strong> que melhora a recuperação de informações - especialmente nos casos em que um único método não é suficiente.</p>
<p>Com a abordagem Sparse-BM25 do <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a>, o texto em bruto é automaticamente convertido em vectores esparsos. Isso elimina a necessidade de geração manual de incorporação esparsa e permite uma estratégia de pesquisa híbrida que equilibra a compreensão semântica com a relevância das palavras-chave.</p>
<p>Neste tutorial, aprenderá a utilizar o LlamaIndex e o Milvus para criar um sistema RAG utilizando a pesquisa de texto integral e a pesquisa híbrida. Começaremos por implementar apenas a pesquisa de texto integral e, em seguida, melhorá-la-emos integrando a pesquisa semântica para obter resultados mais abrangentes.</p>
<blockquote>
<p>Antes de prosseguir com este tutorial, certifique-se de que está familiarizado com a <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">pesquisa de texto integral</a> e com as noções <a href="https://milvus.io/docs/integrate_with_llamaindex.md">básicas de utilização do Milvus no LlamaIndex</a>.</p>
</blockquote>
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
    </button></h2><p><strong>Instalar as dependências</strong></p>
<p>Antes de começar, certifique-se de que tem as seguintes dependências instaladas:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Se estiver a utilizar o Google Colab, poderá ter de <strong>reiniciar o tempo de execução</strong> (navegue até ao menu "Tempo de execução" na parte superior da interface e selecione "Reiniciar sessão" no menu pendente).</p>
</blockquote>
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
<p><strong>Descarregar dados de exemplo</strong></p>
<p>Execute os seguintes comandos para descarregar documentos de exemplo para o diretório "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG com pesquisa de texto integral<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>A integração da pesquisa de texto integral num sistema RAG equilibra a pesquisa semântica com a recuperação precisa e previsível baseada em palavras-chave. Também pode optar por utilizar apenas a pesquisa em texto integral, embora seja recomendável combinar a pesquisa em texto integral com a pesquisa semântica para obter melhores resultados de pesquisa. Aqui, para efeitos de demonstração, mostraremos apenas a pesquisa de texto integral e a pesquisa híbrida.</p>
<p>Para começar, utilize <code translate="no">SimpleDirectoryReaderLoad</code> para carregar o ensaio "What I Worked On" de Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Pesquisa de texto integral com BM25</h3><p>O <code translate="no">MilvusVectorStore</code> do LlamaIndex suporta a pesquisa de texto integral, permitindo uma recuperação eficiente baseada em palavras-chave. Utilizando uma função incorporada como <code translate="no">sparse_embedding_function</code>, aplica a pontuação BM25 para classificar os resultados da pesquisa.</p>
<p>Nesta secção, vamos demonstrar como implementar um sistema RAG usando BM25 para pesquisa de texto integral.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>O código acima insere documentos de exemplo no Milvus e cria um índice para permitir a classificação BM25 para pesquisa em texto integral. Desactiva a incorporação densa e utiliza <code translate="no">BM25BuiltInFunction</code> com parâmetros predefinidos.</p>
<p>Pode especificar os campos de entrada e saída nos parâmetros <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: O campo de texto de entrada (padrão: "text"). Indica o campo de texto ao qual o algoritmo BM25 é aplicado. Altere isto se utilizar a sua própria coleção com um nome de campo de texto diferente.</li>
<li><code translate="no">output_field_names (str)</code>: O campo onde as saídas desta função BM25 são armazenadas (predefinição: "sparse_embedding").</li>
</ul>
<p>Uma vez configurado o armazenamento de vectores, pode efetuar consultas de pesquisa de texto completo utilizando o Milvus com o modo de consulta "sparse" ou "text_search":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Personalizar o analisador de texto</h4><p>Os analisadores desempenham um papel vital na pesquisa de texto completo, dividindo as frases em tokens e efectuando o processamento lexical, tal como a remoção de palavras-chave e de stop-word. Normalmente, são específicos do idioma. Para mais pormenores, consulte o <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guide</a>.</p>
<p>O Milvus suporta dois tipos de analisadores: <strong>Analisadores incorporados</strong> e <strong>Analisadores personalizados</strong>. Por padrão, o site <code translate="no">BM25BuiltInFunction</code> usa o analisador padrão incorporado, que tokeniza o texto com base na pontuação.</p>
<p>Para usar um analisador diferente ou personalizar o existente, você pode passar um valor para o argumento <code translate="no">analyzer_params</code>:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Pesquisa híbrida com ranqueador</h3><p>Um sistema de pesquisa híbrido combina a pesquisa semântica e a pesquisa de texto completo, optimizando o desempenho da recuperação num sistema RAG.</p>
<p>O exemplo a seguir usa a incorporação OpenAI para pesquisa semântica e BM25 para pesquisa de texto completo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Como funciona</strong></p>
<p>Esta abordagem armazena documentos numa coleção Milvus com ambos os campos vectoriais:</p>
<ul>
<li><code translate="no">embedding</code>: Embeddings densos gerados pelo modelo de embedding OpenAI para pesquisa semântica.</li>
<li><code translate="no">sparse_embedding</code>: Embeddings esparsos calculados com a BM25BuiltInFunction para pesquisa de texto completo.</li>
</ul>
<p>Além disso, aplicámos uma estratégia de classificação utilizando o "RRFRanker" com os seus parâmetros predefinidos. Para personalizar o reranker, é possível configurar <code translate="no">hybrid_ranker</code> e <code translate="no">hybrid_ranker_params</code> seguindo o <a href="https://milvus.io/docs/reranking.md">Milvus Reranking Guide</a>.</p>
<p>Agora, vamos testar o sistema RAG com uma consulta de amostra:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Esta abordagem híbrida garante respostas mais precisas e sensíveis ao contexto num sistema RAG, aproveitando a recuperação semântica e baseada em palavras-chave.</p>
