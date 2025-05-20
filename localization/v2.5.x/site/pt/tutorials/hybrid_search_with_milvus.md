---
id: hybrid_search_with_milvus.md
summary: Pesquisa híbrida com Milvus
title: Pesquisa híbrida com Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h1 id="Hybrid-Search-with-Milvus" class="common-anchor-header">Pesquisa híbrida com Milvus<button data-href="#Hybrid-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Se quiser experimentar o efeito final deste tutorial, pode ir diretamente para https://demos.milvus.io/hybrid-search/</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus/pics/demo.png"/></p>
<p>Neste tutorial, vamos demonstrar como efetuar uma pesquisa híbrida com <a href="https://milvus.io/docs/multi-vector-search.md">Milvus</a> e <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/BGE_M3">o modelo BGE-M3</a>. O modelo BGE-M3 pode converter texto em vectores densos e esparsos. O Milvus suporta o armazenamento de ambos os tipos de vectores numa única coleção, permitindo uma pesquisa híbrida que aumenta a relevância dos resultados.</p>
<p>O Milvus suporta métodos de recuperação densos, esparsos e híbridos:</p>
<ul>
<li>Recuperação Densa: Utiliza o contexto semântico para entender o significado por trás das consultas.</li>
<li>Recuperação esparsa: Dá ênfase à correspondência de palavras-chave para encontrar resultados com base em termos específicos, equivalente à pesquisa de texto completo.</li>
<li>Recuperação híbrida: Combina as abordagens Densa e Esparsa, capturando todo o contexto e palavras-chave específicas para obter resultados de pesquisa abrangentes.</li>
</ul>
<p>Ao integrar estes métodos, a Pesquisa Híbrida Milvus equilibra as semelhanças semânticas e lexicais, melhorando a relevância geral dos resultados da pesquisa. Este bloco de notas irá percorrer o processo de configuração e utilização destas estratégias de recuperação, realçando a sua eficácia em vários cenários de pesquisa.</p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">Dependências e ambiente</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-Dataset" class="common-anchor-header">Descarregar conjunto de dados</h3><p>Para demonstrar a pesquisa, precisamos de um corpus de documentos. Vamos usar o conjunto de dados Quora Duplicate Questions e colocá-lo no diretório local.</p>
<p>Fonte do conjunto de dados: <a href="https://www.quora.com/q/quoradata/First-Quora-Dataset-Release-Question-Pairs">Primeira versão do conjunto de dados do Quora: Pares de perguntas</a></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run this cell to download the dataset</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-and-Prepare-Data" class="common-anchor-header">Carregar e preparar dados</h3><p>Vamos carregar o conjunto de dados e preparar um pequeno corpus para pesquisa.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

file_path = <span class="hljs-string">&quot;quora_duplicate_questions.tsv&quot;</span>
df = pd.read_csv(file_path, sep=<span class="hljs-string">&quot;\t&quot;</span>)
questions = <span class="hljs-built_in">set</span>()
<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    obj = row.to_dict()
    questions.add(obj[<span class="hljs-string">&quot;question1&quot;</span>][:<span class="hljs-number">512</span>])
    questions.add(obj[<span class="hljs-string">&quot;question2&quot;</span>][:<span class="hljs-number">512</span>])
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(questions) &gt; <span class="hljs-number">500</span>:  <span class="hljs-comment"># Skip this if you want to use the full dataset</span>
        <span class="hljs-keyword">break</span>

docs = <span class="hljs-built_in">list</span>(questions)

<span class="hljs-comment"># example question</span>
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">What is the strongest Kevlar cord?
</code></pre>
<h3 id="Use-BGE-M3-Model-for-Embeddings" class="common-anchor-header">Usar o modelo BGE-M3 para incorporação</h3><p>O modelo BGE-M3 pode incorporar textos como vectores densos e esparsos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)
dense_dim = ef.dim[<span class="hljs-string">&quot;dense&quot;</span>]

<span class="hljs-comment"># Generate embeddings using BGE-M3 model</span>
docs_embeddings = ef(docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59&lt;00:00,  3.74s/it]
</code></pre>
<h3 id="Setup-Milvus-Collection-and-Index" class="common-anchor-header">Configurar a coleção e o índice Milvus</h3><p>Vamos configurar a coleção Milvus e criar índices para os campos vectoriais.</p>
<div class="alert alert-info">
<ul>
<li>Definir o uri como um ficheiro local, por exemplo, "./milvus.db", é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, digamos mais de um milhão de vectores, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Nesta configuração, utilize o uri do servidor, por exemplo, http://localhost:19530, como o seu uri.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste o uri e o token, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">chave API</a> no Zilliz Cloud.</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># Connect to Milvus given URI</span>
connections.connect(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>)

<span class="hljs-comment"># Specify the data schema for the new Collection</span>
fields = [
    <span class="hljs-comment"># Use auto generated id as primary key</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>, dtype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>
    ),
    <span class="hljs-comment"># Store the original text to retrieve based on semantically distance</span>
    FieldSchema(name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    <span class="hljs-comment"># Milvus now supports both sparse and dense vectors,</span>
    <span class="hljs-comment"># we can store each in a separate field to conduct hybrid search on both vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, dtype=DataType.SPARSE_FLOAT_VECTOR),
    FieldSchema(name=<span class="hljs-string">&quot;dense_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dense_dim),
]
schema = CollectionSchema(fields)

<span class="hljs-comment"># Create collection (drop the old one if exists)</span>
col_name = <span class="hljs-string">&quot;hybrid_demo&quot;</span>
<span class="hljs-keyword">if</span> utility.has_collection(col_name):
    Collection(col_name).drop()
col = Collection(col_name, schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)

<span class="hljs-comment"># To make vector search efficient, we need to create indices for the vector fields</span>
sparse_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_index)
dense_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;dense_vector&quot;</span>, dense_index)
col.load()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-Data-into-Milvus-Collection" class="common-anchor-header">Inserir dados na coleção Milvus</h3><p>Inserir documentos e os seus embeddings na coleção.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># For efficiency, we insert 50 records in each small batch</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(docs), <span class="hljs-number">50</span>):
    batched_entities = [
        docs[i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][i : i + <span class="hljs-number">50</span>],
    ]
    col.insert(batched_entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of entities inserted:&quot;</span>, col.num_entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of entities inserted: 502
</code></pre>
<h3 id="Enter-Your-Search-Query" class="common-anchor-header">Introduza a sua consulta de pesquisa</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Enter your search query</span>
query = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your search query: &quot;</span>)
<span class="hljs-built_in">print</span>(query)

<span class="hljs-comment"># Generate embeddings for the query</span>
query_embeddings = ef([query])
<span class="hljs-comment"># print(query_embeddings)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">How to start learning programming?
</code></pre>
<h3 id="Run-the-Search" class="common-anchor-header">Executar a pesquisa</h3><p>Vamos primeiro preparar algumas funções úteis para executar a pesquisa:</p>
<ul>
<li><code translate="no">dense_search</code>: apenas pesquisa no campo vetorial denso</li>
<li><code translate="no">sparse_search</code>: pesquisa apenas no campo vetorial esparso</li>
<li><code translate="no">hybrid_search</code>: pesquisa em campos densos e vectoriais com um reranker ponderado</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    AnnSearchRequest,
    WeightedRanker,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">dense_search</span>(<span class="hljs-params">col, query_dense_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    res = col.search(
        [query_dense_embedding],
        anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sparse_search</span>(<span class="hljs-params">col, query_sparse_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {},
    }
    res = col.search(
        [query_sparse_embedding],
        anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">hybrid_search</span>(<span class="hljs-params">
    col,
    query_dense_embedding,
    query_sparse_embedding,
    sparse_weight=<span class="hljs-number">1.0</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
    limit=<span class="hljs-number">10</span>,
</span>):
    dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    dense_req = AnnSearchRequest(
        [query_dense_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=limit
    )
    sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    sparse_req = AnnSearchRequest(
        [query_sparse_embedding], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=limit
    )
    rerank = WeightedRanker(sparse_weight, dense_weight)
    res = col.hybrid_search(
        [sparse_req, dense_req], rerank=rerank, limit=limit, output_fields=[<span class="hljs-string">&quot;text&quot;</span>]
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>Vamos executar três pesquisas diferentes com as funções definidas:</p>
<pre><code translate="no" class="language-python">dense_results = dense_search(col, query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>])
sparse_results = sparse_search(col, query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]])
hybrid_results = hybrid_search(
    col,
    query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>],
    query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]],
    sparse_weight=<span class="hljs-number">0.7</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Display-Search-Results" class="common-anchor-header">Mostrar resultados da pesquisa</h3><p>Para apresentar os resultados das pesquisas Densa, Esparsa e Híbrida, precisamos de alguns utilitários para formatar os resultados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">doc_text_formatting</span>(<span class="hljs-params">ef, query, docs</span>):
    tokenizer = ef.model.tokenizer
    query_tokens_ids = tokenizer.encode(query, return_offsets_mapping=<span class="hljs-literal">True</span>)
    query_tokens = tokenizer.convert_ids_to_tokens(query_tokens_ids)
    formatted_texts = []

    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        ldx = <span class="hljs-number">0</span>
        landmarks = []
        encoding = tokenizer.encode_plus(doc, return_offsets_mapping=<span class="hljs-literal">True</span>)
        tokens = tokenizer.convert_ids_to_tokens(encoding[<span class="hljs-string">&quot;input_ids&quot;</span>])[<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        offsets = encoding[<span class="hljs-string">&quot;offset_mapping&quot;</span>][<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        <span class="hljs-keyword">for</span> token, (start, end) <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(tokens, offsets):
            <span class="hljs-keyword">if</span> token <span class="hljs-keyword">in</span> query_tokens:
                <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(landmarks) != <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> start == landmarks[-<span class="hljs-number">1</span>]:
                    landmarks[-<span class="hljs-number">1</span>] = end
                <span class="hljs-keyword">else</span>:
                    landmarks.append(start)
                    landmarks.append(end)
        close = <span class="hljs-literal">False</span>
        formatted_text = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-keyword">for</span> i, c <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(doc):
            <span class="hljs-keyword">if</span> ldx == <span class="hljs-built_in">len</span>(landmarks):
                <span class="hljs-keyword">pass</span>
            <span class="hljs-keyword">elif</span> i == landmarks[ldx]:
                <span class="hljs-keyword">if</span> close:
                    formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
                <span class="hljs-keyword">else</span>:
                    formatted_text += <span class="hljs-string">&quot;&lt;span style=&#x27;color:red&#x27;&gt;&quot;</span>
                close = <span class="hljs-keyword">not</span> close
                ldx = ldx + <span class="hljs-number">1</span>
            formatted_text += c
        <span class="hljs-keyword">if</span> close <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
        formatted_texts.append(formatted_text)
    <span class="hljs-keyword">return</span> formatted_texts
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, podemos exibir os resultados da pesquisa em texto com destaques:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> Markdown, display

<span class="hljs-comment"># Dense search results</span>
display(Markdown(<span class="hljs-string">&quot;**Dense Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, dense_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dense_results:
    display(Markdown(result))

<span class="hljs-comment"># Sparse search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Sparse Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, sparse_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))

<span class="hljs-comment"># Hybrid search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Hybrid Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, hybrid_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados de pesquisa densos:</strong></p>
<p>Qual é a melhor maneira de começar a aprender robótica?</p>
<p>Como é que aprendo uma linguagem informática como o Java?</p>
<p>Como é que posso começar a aprender segurança da informação?</p>
<p>O que é a programação Java? Como aprender a linguagem de programação Java?</p>
<p>Como posso aprender segurança informática?</p>
<p>Qual é a melhor maneira de começar a trabalhar com robótica? Qual é a melhor placa de desenvolvimento para começar a trabalhar nela?</p>
<p>Como posso aprender a falar inglês fluentemente?</p>
<p>Quais são as melhores formas de aprender francês?</p>
<p>Como é que se pode tornar a física fácil de aprender?</p>
<p>Como é que nos preparamos para o UPSC?</p>
<p><strong>Resultados de pesquisa esparsos:</strong></p>
<p>O que é a<span style='color:red'> programação</span> Java<span style='color:red'>?</span><span style='color:red'> Como</span> aprender a linguagem de programação Java?</p>
<p>Qual é a melhor maneira<span style='color:red'> de começar a aprender</span> robótica<span style='color:red'>?</span></p>
<p>Qual é a alternativa<span style='color:red'> à</span><span style='color:red'> aprendizagem automática?</span></p>
<p><span style='color:red'>Como</span> criar um novo terminal e uma nova shell no Linux usando<span style='color:red'> programação</span> C<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> criar um novo shell num novo terminal usando<span style='color:red'> programação</span> C (terminal Linux)<span style='color:red'>?</span></p>
<p>Qual é o melhor negócio<span style='color:red'> para começar</span> em Hyderabad<span style='color:red'>?</span></p>
<p>Qual é o melhor negócio para<span style='color:red'> começar</span> em Hyderabad<span style='color:red'>?</span></p>
<p>Qual é a melhor maneira<span style='color:red'> de iniciar a</span> robótica<span style='color:red'>?</span> Qual é a melhor placa de desenvolvimento para que eu possa<span style='color:red'> começar a</span> trabalhar nela<span style='color:red'>?</span></p>
<p>Qual é a matemática de que um principiante precisa<span style='color:red'> para</span> compreender os algoritmos de<span style='color:red'> programação informática?</span> Que livros sobre algoritmos são adequados para um principiante completo<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> fazer com que a vida se adapte a nós e impedir que a vida nos <span style='color:red'>maltrate</span> mental e emocionalmente<span style='color:red'>?</span></p>
<p><strong>Resultados da pesquisa híbrida:</strong></p>
<p>Qual é a melhor maneira<span style='color:red'> de começar a trabalhar</span> com robótica<span style='color:red'>?</span> Qual é a melhor placa de desenvolvimento para<span style='color:red'> começar a</span> trabalhar nela<span style='color:red'>?</span></p>
<p>O que é a<span style='color:red'> programação</span> Java<span style='color:red'>?</span><span style='color:red'> Como</span> aprender a linguagem de programação Java?</p>
<p>Qual é a melhor forma de<span style='color:red'> começar a aprender</span> robótica<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que nos preparamos para o UPSC<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que se pode tornar a física fácil<span style='color:red'> de</span> aprender<span style='color:red'>?</span></p>
<p>Quais são as melhores maneiras<span style='color:red'> de</span> aprender francês<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> posso aprender<span style='color:red'> a</span> falar inglês fluentemente<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que posso aprender segurança informática<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que posso começar<span style='color:red'> a</span> aprender segurança informática<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que aprendo uma linguagem informática como o java<span style='color:red'>?</span></p>
<p>Qual é a alternativa<span style='color:red'> à</span><span style='color:red'> aprendizagem</span> automática<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> criar um novo Terminal e um novo shell no Linux usando<span style='color:red'> programação</span> C<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> criar um novo shell num novo terminal usando<span style='color:red'> programação</span> C (terminal Linux)<span style='color:red'>?</span></p>
<p>Qual é o melhor negócio<span style='color:red'> para começar</span> em Hyderabad<span style='color:red'>?</span></p>
<p>Qual é o melhor negócio para<span style='color:red'> começar</span> em Hyderabad<span style='color:red'>?</span></p>
<p>O que é que um novato precisa<span style='color:red'> para</span> compreender os algoritmos de<span style='color:red'> programação informática?</span> Que livros sobre algoritmos são adequados para um principiante completo<span style='color:red'>?</span></p>
<p><span style='color:red'>Como</span> é que a vida se adapta a si e impede que a vida o <span style='color:red'>maltrate</span> mental e emocionalmente<span style='color:red'>?</span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">Implementação rápida</h3><p>Para saber como iniciar uma demonstração on-line com este tutorial, consulte <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus">o aplicativo de exemplo</a>.</p>
