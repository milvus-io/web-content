---
id: integrate_with_llamaindex.md
summary: >-
  Este guia demonstra como construir um sistema RAG (Retrieval-Augmented
  Generation) utilizando o LlamaIndex e o Milvus.
title: Geração Aumentada por Recuperação (RAG) com Milvus e LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Geração Aumentada por Recuperação (RAG) com Milvus e LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Este guia demonstra como construir um sistema de Geração Aumentada por Recuperação (RAG) utilizando o LlamaIndex e o Milvus.</p>
<p>O sistema RAG combina um sistema de recuperação com um modelo generativo para gerar novo texto com base num determinado pedido. O sistema começa por recuperar documentos relevantes de um corpus utilizando o Milvus e, em seguida, utiliza um modelo generativo para gerar novo texto com base nos documentos recuperados.</p>
<p><a href="https://www.llamaindex.ai/">O LlamaIndex</a> é uma estrutura de dados simples e flexível para ligar fontes de dados personalizadas a modelos de linguagem de grande dimensão (LLM). <a href="https://milvus.io/">Milvus</a> é a base de dados vetorial de código aberto mais avançada do mundo, criada para alimentar a pesquisa de semelhanças de incorporação e as aplicações de IA.</p>
<p>Neste bloco de notas, vamos apresentar uma demonstração rápida da utilização do MilvusVectorStore.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de começar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">Instalar dependências</h3><p>Os snippets de código nesta página requerem as dependências pymilvus e llamaindex. Você pode instalá-las usando os seguintes comandos:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências acabadas de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong>. (Clique no menu "Runtime" (Tempo de execução) na parte superior do ecrã e selecione "Restart session" (Reiniciar sessão) no menu pendente).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">Configurar o OpenAI</h3><p>Vamos começar por adicionar a chave openai api. Isto permitir-nos-á aceder ao chatgpt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Preparar dados</h3><p>Pode descarregar dados de amostra com os seguintes comandos:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Introdução<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">Gerar os nossos dados</h3><p>Como primeiro exemplo, vamos gerar um documento a partir do ficheiro <code translate="no">paul_graham_essay.txt</code>. Trata-se de um único ensaio de Paul Graham, intitulado <code translate="no">What I Worked On</code>. Para gerar os documentos, usaremos o SimpleDirectoryReader.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">Criar um índice nos dados</h3><p>Agora que temos um documento, podemos criar um índice e inserir o documento. Para o índice, vamos utilizar um MilvusVectorStore. O MilvusVectorStore recebe alguns argumentos:</p>
<h4 id="basic-args" class="common-anchor-header">argumentos básicos</h4><ul>
<li><code translate="no">uri (str, optional)</code>: O URI ao qual se deve ligar, vem sob a forma de "https://address:port" para o serviço Milvus ou Zilliz Cloud, ou "path/to/local/milvus.db" para o Milvus local. A predefinição é "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: O token para iniciar sessão. Vazio se não estiver a usar o rbac, se estiver a usar o rbac será provavelmente "username:password".</li>
<li><code translate="no">collection_name (str, optional)</code>: O nome da coleção onde os dados serão armazenados. A predefinição é "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: Se deve substituir a coleção existente com o mesmo nome. A predefinição é Falso.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">campos escalares incluindo id do documento e texto</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: O nome do campo doc_id para a coleção. A predefinição é DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: O texto da chave que é armazenado na coleção transmitida. Utilizado quando se traz a sua própria coleção. A predefinição é DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: Os nomes dos campos escalares extra a serem incluídos no esquema da coleção.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: Os tipos dos campos escalares extra.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">campo denso</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: Um sinalizador booleano para ativar ou desativar a incorporação densa. A predefinição é True.</li>
<li><code translate="no">dim (int, optional)</code>: A dimensão dos vectores de incorporação para a coleção. Necessário ao criar uma nova coleção com enable_sparse em False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: O nome do campo de incorporação denso para a coleção; a predefinição é DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: A configuração usada para criar o índice de incorporação densa. A predefinição é Nenhum.</li>
<li><code translate="no">search_config (dict, optional)</code>: A configuração utilizada para pesquisar o índice denso Milvus. Note que isto tem de ser compatível com o tipo de índice especificado por <code translate="no">index_config</code>. A predefinição é Nenhum.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: A métrica de similaridade a utilizar para a incorporação densa, atualmente suporta IP, COSINE e L2.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">campo esparso</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: Um sinalizador booleano para ativar ou desativar a incorporação esparsa. O padrão é False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: O nome do campo de incorporação esparsa, com a predefinição DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Se enable_sparse for True, este objeto deve ser fornecido para converter o texto numa incorporação esparsa. Se None, será utilizada a função de incorporação esparsa predefinida (BGEM3SparseEmbeddingFunction).</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: A configuração utilizada para construir o índice de incorporação esparso. A predefinição é Nenhum.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">classificador híbrido</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: Especifica o tipo de classificador usado em consultas de pesquisa híbridas. Atualmente apenas suporta ["RRFRanker", "WeightedRanker"]. A predefinição é "RRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parâmetros de configuração para o classificador híbrido. A estrutura deste dicionário depende do classificador específico que está a ser utilizado:</p>
<ul>
<li>Para "RRFRanker", deve incluir:<ul>
<li>"k" (int): Um parâmetro utilizado no Reciprocal Rank Fusion (RRF). Este valor é utilizado para calcular as pontuações de classificação como parte do algoritmo RRF, que combina várias estratégias de classificação numa única pontuação para melhorar a relevância da pesquisa.</li>
</ul></li>
<li>Para "WeightedRanker", espera-se:<ul>
<li>"weights" (lista de float): Uma lista de exatamente dois pesos:<ol>
<li>O peso para o componente de incorporação densa.</li>
<li>Estes pesos são utilizados para ajustar a importância dos componentes densos e esparsos das incorporações no processo de recuperação híbrido. A predefinição é um dicionário vazio, o que implica que o classificador irá funcionar com as suas predefinições.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">outros</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: As propriedades da coleção, como TTL (Time-To-Live) e MMAP (mapeamento de memória). A predefinição é Nenhum. Pode incluir:<ul>
<li>"collection.ttl.seconds" (int): Quando esta propriedade é definida, os dados na coleção atual expiram no tempo especificado. Os dados expirados na coleção serão limpos e não serão envolvidos em pesquisas ou consultas.</li>
<li>"mmap.enabled" (bool): Se deve ser ativado o armazenamento mapeado na memória ao nível da coleção.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: Especifica a estratégia de gestão de índices a utilizar. O padrão é "create_if_not_exists".</li>
<li><code translate="no">batch_size (int)</code>: Configura o número de documentos processados num lote aquando da inserção de dados no Milvus. A predefinição é DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: Nível de consistência a utilizar para uma coleção recém-criada. A predefinição é "Session".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para os parâmetros de <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>Definir o <code translate="no">uri</code> como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Nesta configuração, utilize o uri do servidor, por exemplo,<code translate="no">http://localhost:19530</code>, como o seu <code translate="no">uri</code>.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste <code translate="no">uri</code> e <code translate="no">token</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chave Api</a> no Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">Consultar os dados</h3><p>Agora que temos o nosso documento armazenado no índice, podemos fazer perguntas ao índice. O índice utilizará os dados armazenados nele próprio como base de conhecimento para o chatgpt.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>O próximo teste mostra que a substituição remove os dados anteriores.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>O teste seguinte mostra a adição de dados adicionais a um índice já existente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">Filtragem de metadados<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Podemos gerar resultados através da filtragem de fontes específicas. O exemplo seguinte ilustra o carregamento de todos os documentos do diretório e a sua posterior filtragem com base nos metadados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>Queremos recuperar apenas documentos do ficheiro <code translate="no">uber_2021.pdf</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>Desta vez, obtemos um resultado diferente quando recuperamos do ficheiro <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
