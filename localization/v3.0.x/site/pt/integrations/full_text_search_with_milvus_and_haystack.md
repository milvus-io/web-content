---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Este tutorial mostra como implementar a pesquisa de texto completo e a
  pesquisa híbrida na sua aplicação utilizando o Haystack e o Milvus.
title: Pesquisa de texto completo com o Milvus e o Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Pesquisa de texto completo com o Milvus e o Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">A pesquisa de texto completo</a> é um método tradicional para recuperar documentos através da correspondência de palavras-chave ou frases específicas no texto. Classifica os resultados com base em pontuações de relevância calculadas a partir de fatores como a frequência dos termos. Enquanto a pesquisa semântica é mais eficaz na compreensão do significado e do contexto, a pesquisa de texto completo destaca-se na correspondência precisa de palavras-chave, tornando-a um complemento útil à pesquisa semântica. O algoritmo BM25 é amplamente utilizado para a classificação na pesquisa de texto completo e desempenha um papel fundamental na Geração Aumentada por Recuperação (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">O Milvus 2.5</a> introduz capacidades nativas de pesquisa de texto completo utilizando o BM25. Esta abordagem converte o texto em vetores esparsos que representam as pontuações do BM25. Basta introduzir o texto bruto e o Milvus irá gerar e armazenar automaticamente os vetores esparsos, sem que seja necessária a geração manual de embeddings esparsos.</p>
<p><a href="https://haystack.deepset.ai/">O Haystack</a> suporta agora esta funcionalidade do Milvus, facilitando a adição da pesquisa de texto completo a aplicações RAG. Pode combinar a pesquisa de texto completo com a pesquisa semântica de vetores densos para uma abordagem híbrida que beneficia tanto da compreensão semântica como da precisão na correspondência de palavras-chave. Esta combinação melhora a precisão da pesquisa e proporciona melhores resultados aos utilizadores.</p>
<p>Este tutorial demonstra como implementar a pesquisa de texto completo e a pesquisa híbrida na sua aplicação utilizando o Haystack e o Milvus.</p>
<p>Pode executar este tutorial localmente com o Milvus Lite, ligar-se a um servidor Milvus ou utilizar <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">o Zilliz Cloud</a>, o serviço Milvus totalmente gerido.</p>
<div class="alert note">
<ul>
<li>Antes de prosseguir com este tutorial, certifique-se de que possui conhecimentos básicos sobre <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">a pesquisa de texto completo</a> e a <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">utilização básica</a> da integração entre o Haystack e o Milvus.</li>
</ul>
</div>
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
    </button></h2><p>Este tutorial requer o Python 3.10 ou posterior. Instale a integração do Haystack para o Milvus juntamente com os pacotes atuais do PyMilvus e do Milvus Lite:</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ser necessário <strong>reiniciar o ambiente de execução</strong> (clique no menu «Runtime» na parte superior do ecrã e selecione «Restart session» no menu suspenso).</p>
</div>
<p>Iremos utilizar os modelos da OpenAI. Deve preparar a <a href="https://platform.openai.com/docs/quickstart">chave API</a> <code translate="no">OPENAI_API_KEY</code> como variável de ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Prepare os dados<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Importe os pacotes necessários para este notebook. Em seguida, prepare alguns documentos de amostra.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Document, Pipeline
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> ChatPromptBuilder
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.generators.chat <span class="hljs-keyword">import</span> OpenAIChatGenerator
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.dataclasses <span class="hljs-keyword">import</span> ChatMessage
<span class="hljs-keyword">from</span> haystack.document_stores.types <span class="hljs-keyword">import</span> DuplicatePolicy
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> (
    MilvusDocumentStore,
    MilvusHybridRetriever,
    MilvusSparseEmbeddingRetriever,
)
<span class="hljs-keyword">from</span> milvus_haystack.function <span class="hljs-keyword">import</span> BM25BuiltInFunction

documents = [
    Document(content=<span class="hljs-string">&quot;Alice likes this apple&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Bob likes swimming&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Charlie likes white dogs&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<p>A integração da pesquisa de texto completo num sistema RAG equilibra a pesquisa semântica com a recuperação precisa e previsível baseada em palavras-chave. Também pode optar por utilizar apenas a pesquisa de texto completo, embora seja recomendável combiná-la com a pesquisa semântica para obter melhores resultados de pesquisa. Aqui, para fins de demonstração, iremos mostrar a pesquisa de texto completo isoladamente e a pesquisa híbrida.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Pesquisa BM25 sem incorporação<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Crie o pipeline de indexação<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Para a pesquisa de texto completo, a função « <code translate="no">MilvusDocumentStore</code> » aceita um parâmetro « <code translate="no">builtin_function</code> ». Passe uma instância de « <code translate="no">BM25BuiltInFunction</code> » para permitir que o Milvus gere vetores esparsos BM25 no lado do servidor. Por exemplo:</p>
<pre><code translate="no" class="language-python">connection_args = {<span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;./milvus_full_text.db&quot;</span>)}
<span class="hljs-keyword">if</span> os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>):
    connection_args[<span class="hljs-string">&quot;token&quot;</span>] = Secret.from_env_var(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>)

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_bm25_demo&quot;</span>,
    connection_args=connection_args,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para o <code translate="no">connection_args</code>:</p>
<ul>
<li>O ficheiro local predefinido, <code translate="no">./milvus_full_text.db</code>, utiliza <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a>.</li>
<li>Para um servidor Milvus no <a href="https://milvus.io/docs/quickstart.md">Docker ou</a> no <a href="https://milvus.io/docs/quickstart.md">Kubernetes</a>, defina <code translate="no">MILVUS_URI</code> com o endereço do servidor, como <code translate="no">http://localhost:19530</code>.</li>
<li>Para <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, defina <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> para o <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Endpoint Público e a chave API</a> apresentados na consola.</li>
</ul>
</div>
<p>Crie um pipeline de indexação para gravar documentos no armazenamento de documentos do Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
_ = indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Crie o pipeline de recuperação<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Crie um pipeline de recuperação que recupere documentos do repositório de documentos Milvus utilizando <code translate="no">MilvusSparseEmbeddingRetriever</code>, que é um wrapper em torno de <code translate="no">document_store</code>.</p>
<pre><code translate="no" class="language-python">retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question}})

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Pesquisa híbrida com pesquisa semântica e pesquisa de texto completo<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Criar o pipeline de indexação<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Na pesquisa híbrida, utilizamos a função BM25 para realizar a pesquisa de texto completo e especificamos o campo vetorial denso <code translate="no">vector</code> para realizar a pesquisa semântica. Esta coleção também utiliza um analisador personalizado, para que possamos inspecionar o seu esquema mais adiante neste tutorial.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},
    ],
}

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_hybrid_demo&quot;</span>,
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># The dense vector field.</span>
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            analyzer_params=analyzer_params_custom,
            enable_match=<span class="hljs-literal">True</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Crie um pipeline de indexação que converta os documentos em embeddings. Os documentos são, em seguida, gravados no armazenamento de documentos do Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Criar o pipeline de recuperação<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Crie um pipeline de recuperação que recupere documentos do repositório de documentos do Milvus utilizando <code translate="no">MilvusHybridRetriever</code>, que contém o <code translate="no">document_store</code> e recebe parâmetros relativos à pesquisa híbrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from pymilvus import WeightedRanker</span>
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;dense_text_embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>,
    MilvusHybridRetriever(
        document_store=document_store,
        <span class="hljs-comment"># top_k=3,</span>
        <span class="hljs-comment"># reranker=WeightedRanker(0.5, 0.5),  # Default is RRFRanker()</span>
    ),
)

_ = retrieval_pipeline.connect(
    <span class="hljs-string">&quot;dense_text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Ao realizar uma pesquisa híbrida utilizando <code translate="no">MilvusHybridRetriever</code>, podemos, opcionalmente, definir os parâmetros topK e reranker. O sistema irá gerir automaticamente as representações vetoriais e as funções integradas e, por fim, utilizar um reranker para refinar os resultados. Os detalhes de implementação subjacentes ao processo de pesquisa são ocultados do utilizador.</p>
<p>Para mais informações sobre a pesquisa híbrida, pode consultar a <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">introdução</a> à <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">Pesquisa Híbrida</a>.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run(
    {
        <span class="hljs-string">&quot;dense_text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
    }
)

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Personalizar o analisador<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Os analisadores são essenciais na pesquisa de texto completo, pois dividem a frase em tokens e realizam análises lexicais, como a redução a raiz e a remoção de palavras vazias. Os analisadores são normalmente específicos de cada idioma. Pode consultar <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">este guia</a> para saber mais sobre os analisadores no Milvus.</p>
<p>O Milvus suporta dois tipos de analisadores: <strong>analisadores integrados</strong> e <strong>analisadores personalizados</strong>. Por predefinição, o « <code translate="no">BM25BuiltInFunction</code> » utilizará o <a href="https://milvus.io/docs/standard-analyzer.md">analisador integrado padrão</a>, que é o analisador mais básico que tokeniza o texto com pontuação.</p>
<p>O armazenamento híbrido de documentos acima passa o ` <code translate="no">analyzer_params_custom</code> ` para ` <code translate="no">BM25BuiltInFunction</code> ` e ativa a correspondência de texto. Isto mantém a definição do analisador junto da coleção que o utiliza.</p>
<p>Podemos dar uma vista de olhos ao esquema da coleção Milvus e certificar-nos de que o analisador personalizado está configurado corretamente.</p>
<pre><code translate="no" class="language-python">collection = document_store.client.describe_collection(document_store.collection_name)
text_field = <span class="hljs-built_in">next</span>(field <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> collection[<span class="hljs-string">&quot;fields&quot;</span>] <span class="hljs-keyword">if</span> field[<span class="hljs-string">&quot;name&quot;</span>] == <span class="hljs-string">&quot;text&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer:&quot;</span>, text_field[<span class="hljs-string">&quot;params&quot;</span>][<span class="hljs-string">&quot;analyzer_params&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Custom analyzer: {&quot;tokenizer&quot;: &quot;standard&quot;, &quot;filter&quot;: [&quot;lowercase&quot;, {&quot;type&quot;: &quot;length&quot;, &quot;max&quot;: 40}, {&quot;type&quot;: &quot;stop&quot;, &quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]}]}
</code></pre>
<p>Para mais detalhes sobre os conceitos, por exemplo, <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, consulte a <a href="https://milvus.io/docs/analyzer-overview.md">documentação do analisador</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Utilização da pesquisa híbrida no pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Já aprendemos a utilizar a função integrada básica BM25 no Haystack e no Milvus e preparámos um ficheiro « <code translate="no">document_store</code> » carregado. Vamos apresentar uma implementação otimizada do RAG com pesquisa híbrida.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este diagrama mostra o processo de recuperação e reclassificação híbridas, combinando o BM25 para a correspondência de palavras-chave e a pesquisa de vetores densos para a recuperação semântica. Os resultados de ambos os métodos são combinados, reclassificados e enviados para um LLM para gerar a resposta final.</p>
<p>A pesquisa híbrida equilibra a precisão e a compreensão semântica, melhorando a exatidão e a robustez para consultas diversas. Recupera candidatos através da pesquisa de texto completo BM25 e da pesquisa vetorial, garantindo uma recuperação semântica, sensível ao contexto e precisa.</p>
<p>Vamos experimentar uma implementação otimizada do RAG com pesquisa híbrida.</p>
<pre><code translate="no" class="language-python">prompt_template = [
    ChatMessage.from_user(
        <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
        not include an answer, reply with &#x27;I don&#x27;t know&#x27;.

        Query: {{query}}
        Documents:
        {% for doc in documents %}
            {{ doc.content }}
        {% endfor %}
        Answer:
        &quot;&quot;&quot;</span>
    )
]

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusHybridRetriever(document_store=document_store, top_k=<span class="hljs-number">1</span>)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;prompt_builder&quot;</span>, ChatPromptBuilder(template=prompt_template)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIChatGenerator(
        api_key=Secret.from_env_var(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder.prompt&quot;</span>, <span class="hljs-string">&quot;generator.messages&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>].text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Bob
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
    </button></h2><p>Utilizou a pesquisa BM25 nativa do Milvus, a recuperação híbrida e um analisador personalizado nos pipelines do Haystack. Para mais opções de integração, consulte o <a href="https://github.com/milvus-io/milvus-haystack">repositório milvus-haystack</a>.</p>
