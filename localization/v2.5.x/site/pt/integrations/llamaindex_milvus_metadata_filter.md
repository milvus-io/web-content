---
id: llamaindex_milvus_metadata_filter.md
title: Filtragem de metadados com LlamaIndex e Milvus
related_key: LlamaIndex
summary: >-
  Este caderno ilustra a utilização do armazenamento vetorial Milvus no
  LlamaIndex, centrando-se nas capacidades de filtragem de metadados. Aprenderá
  a indexar documentos com metadados, a efetuar pesquisas vectoriais com os
  filtros de metadados incorporados no LlamaIndex e a aplicar as expressões de
  filtragem nativas do Milvus ao armazenamento de vectores.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Metadata-Filtering-with-LlamaIndex-and-Milvus" class="common-anchor-header">Filtragem de metadados com LlamaIndex e Milvus<button data-href="#Metadata-Filtering-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este bloco de notas ilustra a utilização do armazenamento vetorial Milvus no LlamaIndex, centrando-se nas capacidades de filtragem de metadados. Aprenderá a indexar documentos com metadados, a efetuar pesquisas vectoriais com os filtros de metadados incorporados no LlamaIndex e a aplicar as expressões de filtragem nativas do Milvus ao armazenamento de vectores.</p>
<p>No final deste caderno, compreenderá como utilizar as funcionalidades de filtragem do Milvus para limitar os resultados da pesquisa com base nos metadados do documento.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, poderá ter de <strong>reiniciar o tempo de execução</strong> (navegue até ao menu "Tempo de execução" na parte superior da interface e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<p><strong>Configurar contas</strong></p>
<p>Este tutorial usa o OpenAI para incorporação de texto e geração de respostas. É necessário preparar a <a href="https://platform.openai.com/api-keys">chave da API do OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para utilizar o armazenamento de vectores Milvus, especifique o seu servidor Milvus <code translate="no">URI</code> (e, opcionalmente, com o <code translate="no">TOKEN</code>). Para iniciar um servidor Milvus, pode configurar um servidor Milvus seguindo o <a href="https://milvus.io/docs/install-overview.md">guia de instalação do Milvus</a> ou simplesmente experimentar <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">o Zilliz Cloud</a> gratuitamente.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;./milvus_filter_demo.db&quot;</span>  <span class="hljs-comment"># Use Milvus-Lite for demo purpose</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Preparar os dados</strong></p>
<p>Para este exemplo, vamos utilizar alguns livros com títulos semelhantes ou idênticos, mas com metadados diferentes (autor, género e ano de publicação) como dados de amostra. Isto ajudará a demonstrar como o Milvus pode filtrar e recuperar documentos com base na similaridade vetorial e nos atributos de metadados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode

nodes = [
    TextNode(
        text=<span class="hljs-string">&quot;Life: A User&#x27;s Manual&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Georges Perec&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Postmodern Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1978</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life and Fate&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Vasily Grossman&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Historical Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1980</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Keith Richards&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Memoir&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2010</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;The Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Malcolm Knox&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Literary Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2011</span>,
        },
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-Index" class="common-anchor-header">Criar índice<button data-href="#Build-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, vamos armazenar dados de amostra no Milvus utilizando o modelo de incorporação predefinido (OpenAI's <code translate="no">text-embedding-ada-002</code>). Os títulos serão convertidos em embeddings de texto e armazenados num campo de embedding denso, enquanto todos os metadados serão armazenados em campos escalares.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    collection_name=<span class="hljs-string">&quot;test_filter_collection&quot;</span>,  <span class="hljs-comment"># Change collection name here</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension depends on the embedding model</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop collection if exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(nodes, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-22 08:31:09,871 [DEBUG][_create_connection]: Created new connection using: 19675caa8f894772b3db175b65d0063a (async_milvus_client.py:547)
</code></pre>
<h2 id="Metadata-Filters" class="common-anchor-header">Filtros de metadados<button data-href="#Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, aplicaremos os filtros e condições de metadados integrados do LlamaIndex à pesquisa Milvus.</p>
<p><strong>Definir filtros de metadados</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2000</span>, operator=FilterOperator.GT
        )  <span class="hljs-comment"># year &gt; 2000</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Recuperar do armazenamento vetorial com filtros</strong></p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<h3 id="Multiple-Metdata-Filters" class="common-anchor-header">Múltiplos filtros de metadados</h3><p>Também é possível combinar vários filtros de metadados para criar consultas mais complexas. O LlamaIndex suporta as condições <code translate="no">AND</code> e <code translate="no">OR</code> para combinar filtros. Isto permite uma recuperação mais precisa e flexível de documentos com base nos seus atributos de metadados.</p>
<p><strong>Condição <code translate="no">AND</code></strong></p>
<p>Experimente um exemplo de filtragem de livros publicados entre 1979 e 2010 (especificamente, onde 1979 &lt; ano ≤ 2010):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> FilterCondition

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">1979</span>, operator=FilterOperator.GT
        ),  <span class="hljs-comment"># year &gt; 1979</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2010</span>, operator=FilterOperator.LTE
        ),  <span class="hljs-comment"># year &lt;= 2010</span>
    ],
    condition=FilterCondition.AND,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<p><strong>Condição <code translate="no">OR</code></strong></p>
<p>Experimente outro exemplo que filtra livros escritos por Georges Perec ou Keith Richards:</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Georges Perec&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Georges Perec</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Keith Richards&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Keith Richards</span>
    ],
    condition=FilterCondition.OR,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
<h2 id="Use-Milvuss-Keyword-Arguments" class="common-anchor-header">Usar os argumentos de palavras-chave do Milvus<button data-href="#Use-Milvuss-Keyword-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além das capacidades de filtragem incorporadas, pode utilizar as expressões de filtragem nativas do Milvus através do argumento de palavra-chave <code translate="no">string_expr</code>. Isto permite-lhe passar expressões de filtragem específicas diretamente para o Milvus durante as operações de pesquisa, indo além da filtragem de metadados padrão para aceder às capacidades avançadas de filtragem do Milvus.</p>
<p>O Milvus oferece opções de filtragem poderosas e flexíveis que permitem uma consulta precisa dos seus dados vectoriais:</p>
<ul>
<li>Operadores básicos: Operadores de comparação, filtros de intervalo, operadores aritméticos e operadores lógicos</li>
<li>Modelos de expressão de filtro: Padrões predefinidos para cenários de filtragem comuns</li>
<li>Operadores especializados: Operadores específicos de tipo de dados para campos JSON ou array</li>
</ul>
<p>Para uma documentação completa e exemplos de expressões de filtragem Milvus, consulte a documentação oficial do <a href="https://milvus.io/docs/boolean.md">Milvus Filtering</a>.</p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(
    vector_store_kwargs={
        <span class="hljs-string">&quot;string_expr&quot;</span>: <span class="hljs-string">&quot;genre like &#x27;%Fiction&#x27;&quot;</span>,
    },
    similarity_top_k=<span class="hljs-number">5</span>,
)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
