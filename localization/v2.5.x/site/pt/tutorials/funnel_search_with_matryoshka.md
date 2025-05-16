---
id: funnel_search_with_matryoshka.md
summary: >-
  Neste bloco de notas, examinamos a forma de utilizar as incrustações
  Matryoshka com o Milvus para pesquisa semântica. Ilustramos um algoritmo
  chamado "pesquisa em funil" que nos permite efetuar uma pesquisa de
  semelhanças num pequeno subconjunto das nossas dimensões de incorporação sem
  uma queda drástica na recuperação.
title: Pesquisa em funil com embeddings Matryoshka
---
<h1 id="Funnel-Search-with-Matryoshka-Embeddings" class="common-anchor-header">Pesquisa em funil com embeddings Matryoshka<button data-href="#Funnel-Search-with-Matryoshka-Embeddings" class="anchor-icon" translate="no">
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
    </button></h1><div style='margin: auto; width: 50%;'><img translate="no" src='/docs/v2.5.x/assets/funnel-search.png' width='100%'></div>
Ao criar sistemas de pesquisa vetorial eficientes, um dos principais desafios é gerir os custos de armazenamento, mantendo uma latência e uma recuperação aceitáveis. Os modelos de incorporação modernos produzem vectores com centenas ou milhares de dimensões, criando um armazenamento significativo e uma sobrecarga computacional para o vetor bruto e o índice.<p>Tradicionalmente, os requisitos de armazenamento são reduzidos através da aplicação de um método de quantização ou de redução da dimensionalidade imediatamente antes da construção do índice. Por exemplo, podemos poupar armazenamento reduzindo a precisão utilizando a Quantização de Produtos (PQ) ou o número de dimensões utilizando a Análise de Componentes Principais (PCA). Estes métodos analisam todo o conjunto de vectores para encontrar um conjunto mais compacto que mantenha as relações semânticas entre os vectores.</p>
<p>Embora eficazes, estas abordagens padrão reduzem a precisão ou a dimensionalidade apenas uma vez e numa única escala. Mas e se pudéssemos manter várias camadas de pormenor em simultâneo, como uma pirâmide de representações cada vez mais precisas?</p>
<p>Eis os embeddings Matryoshka. Com o nome das bonecas russas (ver ilustração), estas construções inteligentes incorporam várias escalas de representação num único vetor. Ao contrário dos métodos tradicionais de pós-processamento, os encaixes Matryoshka aprendem esta estrutura multi-escala durante o processo de formação inicial. O resultado é notável: não só a incorporação completa capta a semântica da entrada, como cada prefixo de subconjunto aninhado (primeira metade, primeiro quarto, etc.) fornece uma representação coerente, embora menos pormenorizada.</p>
<p>Neste caderno, examinamos a forma de utilizar as incrustações Matryoshka com o Milvus para a pesquisa semântica. Ilustramos um algoritmo designado por "pesquisa em funil" que nos permite efetuar pesquisas por semelhança num pequeno subconjunto das nossas dimensões de incorporação sem uma queda drástica na recuperação.</p>
<h2 id="Preparation" class="common-anchor-header">Preparação<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install datasets numpy pandas pymilvus sentence-transformers tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<p>Apenas para CPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para CUDA 11.8:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118</span>
<button class="copy-code-btn"></button></code></pre>
<p>O comando de instalação do CUDA 11.8 é apenas um exemplo. Por favor, confirme sua versão CUDA ao instalar o PyTorch.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> functools

<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Matryoshka-Embedding-Model" class="common-anchor-header">Carregar modelo de incorporação Matryoshka<button data-href="#Load-Matryoshka-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Em vez de usar um modelo de incorporação padrão, como o <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2"><code translate="no">sentence-transformers/all-MiniLM-L12-v2</code></a>usamos <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1">um modelo da Nomic</a> treinado especialmente para produzir embeddings Matryoshka.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(
    <span class="hljs-comment"># Remove &#x27;device=&#x27;mps&#x27; if running on non-Mac device</span>
    <span class="hljs-string">&quot;nomic-ai/nomic-embed-text-v1.5&quot;</span>,
    trust_remote_code=<span class="hljs-literal">True</span>,
    device=<span class="hljs-string">&quot;mps&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;All keys matched successfully&gt;
</code></pre>
<h2 id="Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="common-anchor-header">Carregar o conjunto de dados, incorporar itens e criar uma base de dados de vectores<button data-href="#Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>O código seguinte é uma modificação do código da página de documentação <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search with Sentence Transformers and Milvus".</a> Primeiro, carregamos o conjunto de dados do HuggingFace. Ele contém cerca de 35 mil entradas, cada uma correspondendo a um filme com um artigo na Wikipédia. Neste exemplo, usaremos os campos <code translate="no">Title</code> e <code translate="no">PlotSummary</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['Release Year', 'Title', 'Origin/Ethnicity', 'Director', 'Cast', 'Genre', 'Wiki Page', 'Plot', 'PlotSummary'],
    num_rows: 34886
})
</code></pre>
<p>Em seguida, ligamo-nos a uma base de dados Milvus Lite, especificamos o esquema de dados e criamos uma coleção com este esquema. Iremos armazenar a incorporação não normalizada e o primeiro sexto da incorporação em campos separados. A razão para isto é que precisamos do primeiro 1/6 da incorporação Matryoshka para efetuar uma pesquisa de semelhança e os restantes 5/6 das incorporações para reordenar e melhorar os resultados da pesquisa.</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">768</span>
search_dim = <span class="hljs-number">128</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;./wiki-movie-plots-matryoshka.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    <span class="hljs-comment"># First sixth of unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    <span class="hljs-comment"># Entire unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Atualmente, o Milvus não suporta a pesquisa em subconjuntos de sequências, pelo que dividimos as sequências em duas partes: a cabeça representa o subconjunto inicial do vetor a indexar e pesquisar, e a cauda é o restante. O modelo é treinado para a pesquisa de semelhança de distância de cosseno, por isso normalizamos os embeddings da cabeça. No entanto, para calcular semelhanças para subconjuntos maiores mais tarde, precisamos armazenar a norma da incorporação da cabeça, para que possamos desnormalizá-la antes de juntar à cauda.</p>
<p>Para efetuar a pesquisa através do primeiro 1/6 da incorporação, teremos de criar um índice de pesquisa vetorial sobre o campo <code translate="no">head_embedding</code>. Mais tarde, compararemos os resultados da "pesquisa em funil" com uma pesquisa vetorial normal e, assim, criaremos também um índice de pesquisa sobre a incorporação completa.</p>
<p><em>É importante notar que utilizamos a métrica de distância <code translate="no">COSINE</code> em vez da métrica de distância <code translate="no">IP</code>, porque, de outro modo, teríamos de registar as normas de incorporação, o que complicaria a implementação (isto fará mais sentido quando o algoritmo de pesquisa em funil for descrito).</em></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Por fim, codificamos os resumos dos enredos de todos os 35 mil filmes e introduzimos os correspondentes embeddings na base de dados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    <span class="hljs-comment"># This particular model requires us to prefix &#x27;search_document:&#x27; to stored entities</span>
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Output of embedding model is unnormalized</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:57&lt;00:00,  5.18s/it]
</code></pre>
<h2 id="Performing-Funnel-Search" class="common-anchor-header">Efetuar a pesquisa em funil<button data-href="#Performing-Funnel-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos agora implementar uma "pesquisa em funil" utilizando o primeiro 1/6 das dimensões do embedding Matryoshka. Tenho três filmes em mente para recuperar e produzi o meu próprio resumo do enredo para consultar a base de dados. Incorporamos as consultas e, em seguida, efectuamos uma pesquisa vetorial no campo <code translate="no">head_embedding</code>, obtendo 128 candidatos a resultados.</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&quot;An archaeologist searches for ancient artifacts while fighting Nazis.&quot;</span>,
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>,
    <span class="hljs-string">&quot;A young couple with a kid look after a hotel during winter and the husband goes insane.&quot;</span>,
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


<span class="hljs-comment"># This particular model requires us to prefix &#x27;search_query:&#x27; to queries</span>
instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries]
search_data = embed_search(instruct_queries)

<span class="hljs-comment"># Normalize head embeddings</span>
head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data]

<span class="hljs-comment"># Perform standard vector search on first sixth of embedding dimensions</span>
res = client.search(
    collection_name=collection_name,
    data=head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta altura, fizemos uma pesquisa num espaço vetorial muito mais pequeno e, por isso, é provável que tenhamos reduzido a latência e os requisitos de armazenamento do índice em relação à pesquisa no espaço total. Vamos examinar as 5 principais correspondências para cada consulta:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits][:<span class="hljs-number">5</span>]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
The Passage
Counterblast
Dominion: Prequel to the Exorcist

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
How to Deal
Shorts
Blackbird
Valentine
Unfriended

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
Ghostkeeper
Our Vines Have Tender Grapes
The Ref
Impact
The House in Marsh Road
</code></pre>
<p>Como podemos ver, a recordação foi afetada como consequência do truncamento dos embeddings durante a pesquisa. A pesquisa em funil resolve isto com um truque inteligente: podemos usar o resto das dimensões de incorporação para classificar e podar a nossa lista de candidatos para recuperar o desempenho da recuperação sem executar quaisquer pesquisas vectoriais adicionais dispendiosas.</p>
<p>Para facilitar a exposição do algoritmo de pesquisa de funil, convertemos os resultados da pesquisa Milvus para cada consulta num quadro de dados Pandas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hits_to_dataframe</span>(<span class="hljs-params">hits: pymilvus.client.abstract.Hits</span>) -&gt; pd.DataFrame:
    <span class="hljs-string">&quot;&quot;&quot;
    Convert a Milvus search result to a Pandas dataframe. This function is specific to our data schema.

    &quot;&quot;&quot;</span>
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]
    rows_dict = [
        {<span class="hljs-string">&quot;title&quot;</span>: x[<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;embedding&quot;</span>: torch.tensor(x[<span class="hljs-string">&quot;embedding&quot;</span>])} <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> rows
    ]
    <span class="hljs-keyword">return</span> pd.DataFrame.from_records(rows_dict)


dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>Agora, para efetuar a pesquisa de funil, iteramos sobre os subconjuntos cada vez maiores dos embeddings. Em cada iteração, classificamos novamente os candidatos de acordo com as novas semelhanças e eliminamos uma fração dos candidatos com a classificação mais baixa.</p>
<p>Para concretizar isto, a partir do passo anterior recuperámos 128 candidatos utilizando 1/6 das dimensões de incorporação e de consulta. O primeiro passo para efetuar a pesquisa em funil consiste em recalcular as semelhanças entre as consultas e os candidatos utilizando <em>o primeiro 1/3 das dimensões</em>. Os últimos 64 candidatos são eliminados. Em seguida, repetimos este processo com <em>os primeiros 2/3 das dimensões</em> e, depois, com <em>todas as dimensões</em>, reduzindo sucessivamente para 32 e 16 candidatos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># An optimized implementation would vectorize the calculation of similarity scores across rows (using a matrix)</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_score</span>(<span class="hljs-params">row, query_emb=<span class="hljs-literal">None</span>, dims=<span class="hljs-number">768</span></span>):
    emb = F.normalize(row[<span class="hljs-string">&quot;embedding&quot;</span>][:dims], dim=-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> (emb @ query_emb).item()


<span class="hljs-comment"># You could also add a top-K parameter as a termination condition</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">funnel_search</span>(<span class="hljs-params">
    df: pd.DataFrame, query_emb, scales=[<span class="hljs-number">256</span>, <span class="hljs-number">512</span>, <span class="hljs-number">768</span>], prune_ratio=<span class="hljs-number">0.5</span>
</span>) -&gt; pd.DataFrame:
    <span class="hljs-comment"># Loop over increasing prefixes of the embeddings</span>
    <span class="hljs-keyword">for</span> dims <span class="hljs-keyword">in</span> scales:
        <span class="hljs-comment"># Query vector must be normalized for each new dimensionality</span>
        emb = torch.tensor(query_emb[:dims] / np.linalg.norm(query_emb[:dims]))

        <span class="hljs-comment"># Score</span>
        scores = df.apply(
            functools.partial(calculate_score, query_emb=emb, dims=dims), axis=<span class="hljs-number">1</span>
        )
        df[<span class="hljs-string">&quot;scores&quot;</span>] = scores

        <span class="hljs-comment"># Re-rank</span>
        df = df.sort_values(by=<span class="hljs-string">&quot;scores&quot;</span>, ascending=<span class="hljs-literal">False</span>)

        <span class="hljs-comment"># Prune (in our case, remove half of candidates at each step)</span>
        df = df.head(<span class="hljs-built_in">int</span>(prune_ratio * <span class="hljs-built_in">len</span>(df)))

    <span class="hljs-keyword">return</span> df


dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, search_data)
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">5</span>][<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
 0           &quot;Pimpernel&quot; Smith
1               Black Hunters
29    Raiders of the Lost Ark
34             The Master Key
51            My Gun Is Quick
Name: title, dtype: object 

A teenager fakes illness to get off school and have adventures with two friends. 
 21               How I Live Now
32     On the Edge of Innocence
77             Bratz: The Movie
4                    Unfriended
108                  Simon Says
Name: title, dtype: object 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
 9         The Shining
0         Ghostkeeper
11     Fast and Loose
7      Killing Ground
12         Home Alone
Name: title, dtype: object 
</code></pre>
<p>Conseguimos recuperar a memória sem efetuar quaisquer pesquisas vectoriais adicionais! Em termos qualitativos, estes resultados parecem ter uma recuperação mais elevada para "Raiders of the Lost Ark" e "The Shining" do que a pesquisa vetorial padrão no tutorial, <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search using Milvus and Sentence Transformers",</a> que utiliza um modelo de incorporação diferente. No entanto, não consegue encontrar "Ferris Bueller's Day Off", ao qual voltaremos mais tarde no caderno. (Ver o artigo <a href="https://arxiv.org/abs/2205.13147">Aprendizagem de representações Matryoshka</a> para mais experiências quantitativas e avaliação comparativa).</p>
<h2 id="Comparing-Funnel-Search-to-Regular-Search" class="common-anchor-header">Comparação da pesquisa em funil com a pesquisa normal<button data-href="#Comparing-Funnel-Search-to-Regular-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos comparar os resultados da nossa pesquisa em funil com uma pesquisa vetorial normal <em>no mesmo conjunto de dados com o mesmo modelo de incorporação</em>. Realizamos uma pesquisa nos embeddings completos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search on entire embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
Raiders of the Lost Ark
The Master Key
My Gun Is Quick

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
A Walk to Remember
Ferris Bueller's Day Off
How I Live Now
On the Edge of Innocence
Bratz: The Movie

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining
Ghostkeeper
Fast and Loose
Killing Ground
Home Alone
</code></pre>
<p>Com exceção dos resultados para "Um adolescente finge estar doente para não ir à escola...", os resultados da pesquisa em funil são quase idênticos aos da pesquisa completa, apesar de a pesquisa em funil ter sido efectuada num espaço de pesquisa de 128 dimensões contra 768 dimensões para a pesquisa regular.</p>
<h2 id="Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="common-anchor-header">Investigando a falha de recordação da pesquisa de funil para Ferris Bueller's Day Off<button data-href="#Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="anchor-icon" translate="no">
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
    </button></h2><p>Por que é que a pesquisa de funil não conseguiu recuperar o filme Ferris Bueller's Day Off? Vamos examinar se ele estava ou não na lista original de candidatos ou se foi filtrado por engano.</p>
<pre><code translate="no" class="language-python">queries2 = [
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries2]
search_data2 = embed_search(instruct_queries)
head_search2 = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data2]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=head_search2,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">256</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries2[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">for</span> idx, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(rows):
        <span class="hljs-keyword">if</span> row[<span class="hljs-string">&quot;title&quot;</span>].strip() == <span class="hljs-string">&quot;Ferris Bueller&#x27;s Day Off&quot;</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Row <span class="hljs-subst">{idx}</span>: Ferris Bueller&#x27;s Day Off&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: A teenager fakes illness to get off school and have adventures with two friends.
Row 228: Ferris Bueller's Day Off
</code></pre>
<p>Vemos que o problema é que a lista inicial de candidatos não era suficientemente grande, ou melhor, o resultado desejado não é suficientemente semelhante à consulta no nível mais alto de granularidade. Alterá-la de <code translate="no">128</code> para <code translate="no">256</code> resulta numa recuperação bem sucedida. <em>Devemos criar uma regra geral para definir o número de candidatos num conjunto retido para avaliar empiricamente o compromisso entre a recuperação e a latência.</em></p>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries2, dfs, search_data2)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>), <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">A teenager fakes illness to get off school and have adventures with two friends. 
       A Walk to Remember
Ferris Bueller's Day Off
          How I Live Now
On the Edge of Innocence
        Bratz: The Movie
              Unfriended
              Simon Says 
</code></pre>
<h2 id="Does-the-order-matter-Prefix-vs-suffix-embeddings" class="common-anchor-header">A ordem é importante? Embeddings de prefixo vs sufixo.<button data-href="#Does-the-order-matter-Prefix-vs-suffix-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>O modelo foi treinado para ter um bom desempenho na correspondência de prefixos recursivamente mais pequenos dos embeddings. Será que a ordem das dimensões que utilizamos é importante? Por exemplo, será que também poderíamos pegar em subconjuntos dos embeddings que são sufixos? Nesta experiência, invertemos a ordem das dimensões nos embeddings Matryoshka e efectuamos uma pesquisa de funil.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./wikiplots-matryoshka-flipped.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">huggingface/tokenizers: The current process just got forked, after parallelism has already been used. Disabling parallelism to avoid deadlocks...
To disable this warning, you can either:
    - Avoid using `tokenizers` before the fork if possible
    - Explicitly set the environment variable TOKENIZERS_PARALLELISM=(true | false)
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Encode and flip embeddings</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    embeddings = torch.flip(embeddings, dims=[-<span class="hljs-number">1</span>])
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:50&lt;00:00,  5.08s/it]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Normalize head embeddings</span>

flip_search_data = [
    torch.flip(torch.tensor(x), dims=[-<span class="hljs-number">1</span>]).cpu().numpy() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data
]
flip_head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> flip_search_data]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=flip_head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, flip_search_data)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(
        d[<span class="hljs-string">&quot;query&quot;</span>],
        <span class="hljs-string">&quot;\n&quot;</span>,
        d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>, header=<span class="hljs-literal">False</span>),
        <span class="hljs-string">&quot;\n&quot;</span>,
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
       &quot;Pimpernel&quot; Smith
          Black Hunters
Raiders of the Lost Ark
         The Master Key
        My Gun Is Quick
            The Passage
        The Mole People 

A teenager fakes illness to get off school and have adventures with two friends. 
                       A Walk to Remember
                          How I Live Now
                              Unfriended
Cirque du Freak: The Vampire's Assistant
                             Last Summer
                                 Contest
                                 Day One 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
         Ghostkeeper
     Killing Ground
Leopard in the Snow
              Stone
          Afterglow
         Unfaithful
     Always a Bride 
</code></pre>
<p>A recuperação é muito mais fraca do que a pesquisa em funil ou a pesquisa regular, como esperado (o modelo de incorporação foi treinado por aprendizagem contrastiva em prefixos das dimensões de incorporação, e não em sufixos).</p>
<h2 id="Summary" class="common-anchor-header">Resumo<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui está uma comparação dos nossos resultados de pesquisa entre métodos:</p>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-raiders-of-the-lost-ark.png' width='100%'></div>
<div style='margin: auto; width: 100%;'><img translate="no" src='/docs/v2.5.x/assets/results-ferris-buellers-day-off.png' width='100%'></div>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-the-shining.png' width='100%'></div>
Mostrámos como utilizar as incrustações Matryoshka com o Milvus para realizar um algoritmo de pesquisa semântica mais eficiente chamado "pesquisa em funil". Explorámos também a importância dos passos de reordenação e poda do algoritmo, bem como um modo de falha quando a lista inicial de candidatos é demasiado pequena. Finalmente, discutimos como a ordem das dimensões é importante na formação de sub-embeddings - deve ser da mesma forma para a qual o modelo foi treinado. Ou melhor, é apenas porque o modelo foi treinado de uma determinada forma que os prefixos dos embeddings são significativos. Agora já sabe como implementar as incrustações Matryoshka e a pesquisa em funil para reduzir os custos de armazenamento da pesquisa semântica sem sacrificar demasiado o desempenho da recuperação!
