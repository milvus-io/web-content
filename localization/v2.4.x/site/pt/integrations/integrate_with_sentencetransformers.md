---
id: integrate_with_sentencetransformers.md
summary: Esta página aborda a pesquisa de filmes utilizando Milvus
title: Pesquisa de filmes usando Milvus e SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Pesquisa de filmes usando Milvus e SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>Neste exemplo, vamos fazer uma pesquisa de artigos na Wikipédia usando Milvus e a biblioteca SentenceTransformers. O conjunto de dados que estamos a pesquisar é o <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a>, alojado no HuggingFace.</p>
<p>Vamos começar!</p>
<h2 id="Required-Libraries" class="common-anchor-header">Bibliotecas necessárias<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este exemplo, vamos usar <code translate="no">pymilvus</code> para nos ligarmos para usar o Milvus, <code translate="no">sentence-transformers</code> para gerar vetor embeddings, e <code translate="no">datasets</code> para descarregar o conjunto de dados de exemplo.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, connections
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Vamos definir alguns parâmetros globais,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">Descarregar e abrir o conjunto de dados<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>Numa única linha, <code translate="no">datasets</code> permite-nos descarregar e abrir um conjunto de dados. A biblioteca armazenará em cache o conjunto de dados localmente e usará essa cópia na próxima vez que for executada. Cada linha contém os detalhes de um filme que tem um artigo da Wikipedia a acompanhar. Apenas utilizamos as colunas <code translate="no">Title</code> e <code translate="no">PlotSummary</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">Ligação à base de dados<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta altura, vamos começar a configurar o Milvus. Os passos são os seguintes:</p>
<ol>
<li>Criar uma base de dados Milvus Lite num ficheiro local. (Substitua este URI pelo endereço do servidor do Milvus Standalone e do Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">connect</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Criar o esquema de dados. Este esquema especifica os campos que compõem um elemento, incluindo a dimensão da incorporação do vetor.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim)
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
collection = Collection(name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Definir o algoritmo de indexação da pesquisa vetorial. Milvus Lite implementa a pesquisa de força bruta e HNSW, enquanto Milvus Standalone e Milvus Distributed implementam uma grande variedade de métodos. Para esta escala de dados, a pesquisa de força bruta ingénua é suficiente.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">params</span> = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;FLAT&quot;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&quot;IP&quot;</span>
    }

collection.create_index(
    <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-keyword">params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Uma vez concluídos estes passos, estamos prontos a inserir dados na coleção e a efetuar uma pesquisa. Todos os dados adicionados serão indexados automaticamente e ficarão imediatamente disponíveis para pesquisa. Se os dados forem muito recentes, a pesquisa pode ser mais lenta, uma vez que a pesquisa de força bruta será utilizada em dados que ainda estão a ser indexados.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">Inserindo os dados<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este exemplo, vamos usar o modelo SentenceTransformers miniLM para criar embeddings do texto do gráfico. Esse modelo retorna embeddings de 384 dimensões.</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Fazemos um loop nas linhas dos dados, incorporamos o campo de resumo do gráfico e inserimos entidades no banco de dados do vetor. Em geral, você deve executar essa etapa em lotes de itens de dados para maximizar a taxa de transferência da CPU ou GPU para o modelo de incorporação, como fazemos aqui.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&#x27;PlotSummary&#x27;</span>])
    data = [{<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding} <span class="hljs-keyword">for</span> title, embedding in <span class="hljs-title function_">zip</span><span class="hljs-params">(batch[<span class="hljs-string">&#x27;Title&#x27;</span>], embeddings)</span>]
    res = collection.insert(data=data)
<button class="copy-code-btn"></button></code></pre>
<p>Por segurança, descarregamos a fila de escrita de dados e verificamos se o número esperado de elementos está presente na base de dados.</p>
<pre><code translate="no" class="language-python">collection.flush()
<span class="hljs-built_in">print</span>(collection.num_entities)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>A operação acima é relativamente demorada porque a incorporação leva tempo. Este passo demora cerca de 2 minutos utilizando a CPU num MacBook Pro 2023 e será muito mais rápido com GPUs dedicadas. Faça uma pausa e desfrute de uma chávena de café!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">Efetuar a pesquisa<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Com todos os dados inseridos no Milvus, podemos começar a efetuar as nossas pesquisas. Neste exemplo, vamos procurar filmes com base no enredo. Como estamos a fazer uma pesquisa em lote, o tempo de pesquisa é partilhado entre as pesquisas de filmes. (Consegue adivinhar qual era o resultado pretendido com base na pesquisa de filmes?)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data) 
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]

search_data = embed_search(queries)

res = collection.search(
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    param={},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>]
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Title:&#x27;</span>, queries[idx])
    <span class="hljs-comment"># print(&#x27;Search Time:&#x27;, end-start)</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Results:&#x27;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>( hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>), <span class="hljs-string">&#x27;(&#x27;</span>, <span class="hljs-built_in">round</span>(hit.distance, <span class="hljs-number">2</span>), <span class="hljs-string">&#x27;)&#x27;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Os resultados são:</p>
<pre><code translate="no" class="language-shell">Title: An archaeologist searches <span class="hljs-keyword">for</span> ancient artifacts <span class="hljs-keyword">while</span> fighting Nazis.
Results:
<span class="hljs-string">&quot;Pimpernel&quot;</span> Smith ( <span class="hljs-number">0.48</span> )
<span class="hljs-function">Phantom of <span class="hljs-title">Chinatown</span> (<span class="hljs-params"> <span class="hljs-number">0.42</span> </span>)
<span class="hljs-title">Counterblast</span> (<span class="hljs-params"> <span class="hljs-number">0.41</span> </span>)

Title: Teenagers <span class="hljs-keyword">in</span> detention learn about themselves.
Results:
The Breakfast <span class="hljs-title">Club</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Up the <span class="hljs-title">Academy</span> (<span class="hljs-params"> <span class="hljs-number">0.46</span> </span>)
<span class="hljs-title">Fame</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)

Title: A teenager fakes illness to <span class="hljs-keyword">get</span> off school <span class="hljs-keyword">and</span> have adventures <span class="hljs-keyword">with</span> two friends.
Results:
Ferris Bueller&#x27;s Day <span class="hljs-title">Off</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)
Fever <span class="hljs-title">Lake</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
A Walk to <span class="hljs-title">Remember</span> (<span class="hljs-params"> <span class="hljs-number">0.45</span> </span>)

Title: A young couple <span class="hljs-keyword">with</span> a kid look after a hotel during winter <span class="hljs-keyword">and</span> the husband goes insane.
Results:
Always a <span class="hljs-title">Bride</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Fast <span class="hljs-keyword">and</span> <span class="hljs-title">Loose</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
The <span class="hljs-title">Shining</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)

Title: Four turtles fight bad guys.
Results:
TMNT 2: Out of the <span class="hljs-title">Shadows</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
Teenage Mutant Ninja Turtles II: The Secret of the <span class="hljs-title">Ooze</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
Gamera: Super <span class="hljs-title">Monster</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)
</span><button class="copy-code-btn"></button></code></pre>
