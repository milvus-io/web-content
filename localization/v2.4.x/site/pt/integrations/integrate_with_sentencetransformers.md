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
    </button></h1><p>Neste exemplo, vamos analisar uma pesquisa de artigos da Wikipédia usando Milvus e a biblioteca SentenceTransformers. O conjunto de dados que estamos a pesquisar é o Wikipedia-Movie-Plots Dataset encontrado no <a href="https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots">Kaggle</a>. Para este exemplo, colocámos os dados num Google Drive público.</p>
<p>Vamos começar.</p>
<h2 id="Installing-requirements" class="common-anchor-header">Requisitos de instalação<button data-href="#Installing-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este exemplo, vamos usar <code translate="no">pymilvus</code> para nos ligarmos para usar o Milvus, <code translate="no">sentencetransformers</code> para gerar embeddings vectoriais e <code translate="no">gdown</code> para descarregar o conjunto de dados de exemplo.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers gdown
<button class="copy-code-btn"></button></code></pre>
<h2 id="Grabbing-the-data" class="common-anchor-header">Obter os dados<button data-href="#Grabbing-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos utilizar <code translate="no">gdown</code> para obter o zip do Google Drive e depois descomprimi-lo com a biblioteca <code translate="no">zipfile</code> incorporada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> gdown
url = <span class="hljs-string">&#x27;https://drive.google.com/uc?id=11ISS45aO2ubNCGaC3Lvd3D7NT8Y7MeO8&#x27;</span>
output = <span class="hljs-string">&#x27;./movies.zip&#x27;</span>
gdown.<span class="hljs-title function_">download</span>(url, output)

<span class="hljs-keyword">import</span> zipfile

<span class="hljs-keyword">with</span> zipfile.<span class="hljs-title class_">ZipFile</span>(<span class="hljs-string">&quot;./movies.zip&quot;</span>,<span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> <span class="hljs-attr">zip_ref</span>:
    zip_ref.<span class="hljs-title function_">extractall</span>(<span class="hljs-string">&quot;./movies&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Global-parameters" class="common-anchor-header">Parâmetros globais<button data-href="#Global-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui podemos encontrar os principais argumentos que precisam de ser modificados para serem executados com as suas próprias contas. Ao lado de cada um há uma descrição do que se trata.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Milvus Setup Arguments</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;movies_db&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">384</span>  <span class="hljs-comment"># Embeddings size</span>
COUNT = <span class="hljs-number">1000</span>  <span class="hljs-comment"># Number of vectors to insert</span>
MILVUS_HOST = <span class="hljs-string">&#x27;localhost&#x27;</span>
MILVUS_PORT = <span class="hljs-string">&#x27;19530&#x27;</span>

<span class="hljs-comment"># Inference Arguments</span>
BATCH_SIZE = <span class="hljs-number">128</span>

<span class="hljs-comment"># Search Arguments</span>
TOP_K = <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setting-up-Milvus" class="common-anchor-header">Configurar o Milvus<button data-href="#Setting-up-Milvus" class="anchor-icon" translate="no">
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
<li><p>Ligue-se à instância do Milvus utilizando o URI fornecido.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

<span class="hljs-comment"># Connect to Milvus Database</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Se a coleção já existir, elimine-a.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility

<span class="hljs-comment"># Remove any previous collections with the same name</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Crie a coleção que contém o id, o título do filme e os embeddings do texto do enredo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType, Collection


<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>),  <span class="hljs-comment"># VARCHARS need a maximum length, so for this example they are set to 200 characters</span>
    FieldSchema(name=<span class="hljs-string">&#x27;embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Crie um índice na coleção recém-criada e carregue-a para a memória.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an IVF_FLAT index for collection.</span>
index_params = {
    <span class="hljs-string">&#x27;metric_type&#x27;</span>:<span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>:{<span class="hljs-string">&#x27;nlist&#x27;</span>: <span class="hljs-number">1536</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_params=index_params)
collection.load()
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Quando estes passos estiverem concluídos, a coleção estará pronta para ser inserida e pesquisada. Todos os dados adicionados serão indexados automaticamente e ficarão imediatamente disponíveis para pesquisa. Se os dados forem muito recentes, a pesquisa pode ser mais lenta, uma vez que a pesquisa por força bruta será utilizada em dados que ainda estão a ser indexados.</p>
<h2 id="Inserting-the-data" class="common-anchor-header">Inserir os dados<button data-href="#Inserting-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este exemplo, vamos utilizar o modelo SentenceTransformers miniLM para criar embeddings do texto do gráfico. Esse modelo retorna embeddings de 384 dígitos.</p>
<p>Nas próximas etapas, nós vamos:</p>
<ol>
<li>Carregando os dados.</li>
<li>Incorporar os dados do texto do enredo usando SentenceTransformers.</li>
<li>Inserir os dados no Milvus.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> csv
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer

transformer = SentenceTransformer(<span class="hljs-string">&#x27;all-MiniLM-L6-v2&#x27;</span>)

<span class="hljs-comment"># Extract the book titles</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">csv_load</span>(<span class="hljs-params">file</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file, newline=<span class="hljs-string">&#x27;&#x27;</span>) <span class="hljs-keyword">as</span> f:
        reader = csv.reader(f, delimiter=<span class="hljs-string">&#x27;,&#x27;</span>)
        <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> reader:
            <span class="hljs-keyword">if</span> <span class="hljs-string">&#x27;&#x27;</span> <span class="hljs-keyword">in</span> (row[<span class="hljs-number">1</span>], row[<span class="hljs-number">7</span>]):
                <span class="hljs-keyword">continue</span>
            <span class="hljs-keyword">yield</span> (row[<span class="hljs-number">1</span>], row[<span class="hljs-number">7</span>])


<span class="hljs-comment"># Extract embedding from text using OpenAI</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_insert</span>(<span class="hljs-params">data</span>):
    embeds = transformer.encode(data[<span class="hljs-number">1</span>]) 
    ins = [
            data[<span class="hljs-number">0</span>],
            [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]
    ]
    collection.insert(ins)

<span class="hljs-keyword">import</span> time

data_batch = [[],[]]

count = <span class="hljs-number">0</span>

<span class="hljs-keyword">for</span> title, plot <span class="hljs-keyword">in</span> csv_load(<span class="hljs-string">&#x27;./movies/plots.csv&#x27;</span>):
    <span class="hljs-keyword">if</span> count &lt;= COUNT:
        data_batch[<span class="hljs-number">0</span>].append(title)
        data_batch[<span class="hljs-number">1</span>].append(plot)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(data_batch[<span class="hljs-number">0</span>]) % BATCH_SIZE == <span class="hljs-number">0</span>:
            embed_insert(data_batch)
            data_batch = [[],[]]
        count += <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">break</span>

<span class="hljs-comment"># Embed and insert the remainder</span>
<span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(data_batch[<span class="hljs-number">0</span>]) != <span class="hljs-number">0</span>:
    embed_insert(data_batch)

<span class="hljs-comment"># Call a flush to index any unsealed segments.</span>
collection.flush()
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>A operação acima é relativamente demorada porque a incorporação leva tempo. Para manter o tempo consumido a um nível aceitável, tente definir <code translate="no">COUNT</code> nos <a href="#Global-parameters">parâmetros globais</a> para um valor adequado. Faça uma pausa e desfrute de uma chávena de café!</p>
</div>
<h2 id="Performing-the-search" class="common-anchor-header">Efetuar a pesquisa<button data-href="#Performing-the-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Com todos os dados inseridos no Milvus, podemos começar a efetuar as nossas pesquisas. Neste exemplo, vamos procurar filmes com base no enredo. Como estamos a fazer uma pesquisa em lote, o tempo de pesquisa é partilhado entre as pesquisas de filmes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for titles that closest match these phrases.</span>
search_terms = [<span class="hljs-string">&#x27;A movie about cars&#x27;</span>, <span class="hljs-string">&#x27;A movie about monsters&#x27;</span>]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = transformer.encode(data) 
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]

search_data = embed_search(search_terms)

start = time.time()
res = collection.search(
    data=search_data,  <span class="hljs-comment"># Embeded search value</span>
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
    param={},
    limit = TOP_K,  <span class="hljs-comment"># Limit to top_k results per search</span>
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>]  <span class="hljs-comment"># Include title field in result</span>
)
end = time.time()

<span class="hljs-keyword">for</span> hits_i, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Title:&#x27;</span>, search_terms[hits_i])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Search Time:&#x27;</span>, end-start)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Results:&#x27;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>( hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>), <span class="hljs-string">&#x27;----&#x27;</span>, hit.distance)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>O resultado deve ser semelhante ao seguinte:</p>
<pre><code translate="no" class="language-shell">Title: A movie about cars
Search Time: 0.08636689186096191
Results:
Youth<span class="hljs-string">&#x27;s Endearing Charm ---- 1.0954499244689941
From Leadville to Aspen: A Hold-Up in the Rockies ---- 1.1019384860992432
Gentlemen of Nerve ---- 1.1331942081451416

Title: A movie about monsters
Search Time: 0.08636689186096191
Results:
The Suburbanite ---- 1.0666425228118896
Youth&#x27;</span>s Endearing Charm ---- 1.1072258949279785
The Godless Girl ---- 1.1511223316192627
<button class="copy-code-btn"></button></code></pre>
