---
id: funnel_search_with_matryoshka.md
summary: >-
  В этом блокноте мы рассмотрим, как использовать вкрапления Matryoshka с Milvus
  для семантического поиска. Мы иллюстрируем алгоритм под названием "поиск по
  воронке", который позволяет нам выполнять поиск по сходству по небольшому
  подмножеству размерностей вкраплений без резкого снижения запоминания.
title: Поиск по воронке с вкраплениями "Матрешки
---
<h1 id="Funnel-Search-with-Matryoshka-Embeddings" class="common-anchor-header">Поиск по воронке с вкраплениями "Матрешки<button data-href="#Funnel-Search-with-Matryoshka-Embeddings" class="anchor-icon" translate="no">
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
При создании эффективных систем векторного поиска одной из ключевых задач является управление затратами на хранение данных при сохранении приемлемой задержки и запоминания. Современные модели встраивания выдают векторы с сотнями или тысячами измерений, что создает значительные затраты на хранение и вычисления для исходного вектора и индекса.<p>Традиционно требования к хранению снижаются путем применения метода квантования или уменьшения размерности непосредственно перед построением индекса. Например, мы можем сэкономить место, снизив точность с помощью Product Quantization (PQ) или количество измерений с помощью Principal Component Analysis (PCA). Эти методы анализируют весь набор векторов, чтобы найти более компактный, сохраняющий семантические связи между векторами.</p>
<p>Несмотря на свою эффективность, эти стандартные подходы снижают точность или размерность только один раз и в одном масштабе. Но что, если бы мы могли одновременно поддерживать несколько уровней детализации, подобно пирамиде все более точных представлений?</p>
<p>Появились вкрапления "Матрешки". Названные в честь русской матрешки (см. иллюстрацию), эти умные конструкции встраивают несколько масштабов представления в один вектор. В отличие от традиционных методов постобработки, вкрапления "Матрешки" учатся этой многомасштабной структуре в процессе начального обучения. Результат поразителен: не только полное вложение отражает семантику входных данных, но и каждый вложенный префикс подмножества (первая половина, первая четверть и т. д.) обеспечивает целостное, хотя и менее детальное представление.</p>
<p>В этом блокноте мы рассмотрим, как использовать вкрапления "Матрешки" с Milvus для семантического поиска. Мы проиллюстрируем алгоритм, называемый "поиском по воронке", который позволяет нам выполнять поиск по сходству в небольшом подмножестве измерений вкраплений без резкого снижения запоминания.</p>
<h2 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
<p>Только для процессора:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для CUDA 11.8:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118</span>
<button class="copy-code-btn"></button></code></pre>
<p>Команда установки CUDA 11.8 является лишь примером. Пожалуйста, уточните версию CUDA при установке PyTorch.</p>
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
<h2 id="Load-Matryoshka-Embedding-Model" class="common-anchor-header">Загрузка модели встраивания "Матрешка<button data-href="#Load-Matryoshka-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Вместо стандартной модели встраивания, такой как <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2"><code translate="no">sentence-transformers/all-MiniLM-L12-v2</code></a>мы используем <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1">модель от Nomic</a>, специально обученную для создания вкраплений "Матрешки".</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(
    <span class="hljs-comment"># Remove &#x27;device=&#x27;mps&#x27; if running on non-Mac device</span>
    <span class="hljs-string">&quot;nomic-ai/nomic-embed-text-v1.5&quot;</span>,
    trust_remote_code=<span class="hljs-literal">True</span>,
    device=<span class="hljs-string">&quot;mps&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;All keys matched successfully&gt;
</code></pre>
<h2 id="Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="common-anchor-header">Загрузка массива данных, встраивание элементов и создание базы векторов<button data-href="#Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующий код является модификацией кода со страницы документации <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Поиск фильмов с помощью Sentence Transformers и Milvus".</a> Сначала мы загружаем набор данных из HuggingFace. Он содержит около 35 тысяч записей, каждая из которых соответствует фильму, имеющему статью в Википедии. В этом примере мы будем использовать поля <code translate="no">Title</code> и <code translate="no">PlotSummary</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['Release Year', 'Title', 'Origin/Ethnicity', 'Director', 'Cast', 'Genre', 'Wiki Page', 'Plot', 'PlotSummary'],
    num_rows: 34886
})
</code></pre>
<p>Далее мы подключаемся к базе данных Milvus Lite, задаем схему данных и создаем коллекцию с этой схемой. Мы будем хранить ненормализованное вложение и первую шестую часть вложения в отдельных полях. Причина в том, что первая 1/6 часть вкраплений "Матрешки" нужна нам для поиска сходства, а остальные 5/6 частей вкраплений - для ранжирования и улучшения результатов поиска.</p>
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
<p>В настоящее время Milvus не поддерживает поиск по подмножествам вкраплений, поэтому мы разбиваем вкрапления на две части: голова представляет собой начальное подмножество вектора для индексации и поиска, а хвост - оставшуюся часть. Модель обучена для поиска сходства по косинусному расстоянию, поэтому мы нормализуем вкрапления головы. Однако, чтобы в дальнейшем вычислять сходство для больших подмножеств, нам нужно хранить норму вкраплений головы, чтобы ненормализовать их перед присоединением к хвосту.</p>
<p>Чтобы выполнить поиск по первой 1/6 части вкрапления, нам потребуется создать индекс векторного поиска по полю <code translate="no">head_embedding</code>. Позже мы сравним результаты "воронкообразного поиска" с обычным векторным поиском, поэтому построим индекс поиска и по полному вкраплению.</p>
<p><em>Важно отметить, что мы используем метрику расстояния <code translate="no">COSINE</code>, а не <code translate="no">IP</code>, поскольку в противном случае нам пришлось бы следить за нормами вкраплений, что усложнило бы реализацию (это станет более понятным после описания алгоритма поиска воронки).</em></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Наконец, мы кодируем краткие описания сюжетов для всех 35 тысяч фильмов и вводим соответствующие вкрапления в базу данных.</p>
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
<h2 id="Performing-Funnel-Search" class="common-anchor-header">Выполнение поиска по воронке<button data-href="#Performing-Funnel-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь давайте осуществим "воронкообразный поиск", используя первую 1/6 часть размеров вкраплений "Матрешки". У меня есть три фильма, которые я хочу найти, и я подготовил собственную сводку сюжетов для запросов к базе данных. Мы встраиваем запросы, затем выполняем векторный поиск по полю <code translate="no">head_embedding</code>, получая 128 кандидатов на результат.</p>
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
<p>На этом этапе мы выполнили поиск по гораздо меньшему векторному пространству, и поэтому, скорее всего, снизили задержку и требования к хранению индекса по сравнению с поиском по всему пространству. Давайте рассмотрим 5 лучших совпадений для каждого запроса:</p>
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
<p>Как мы видим, в результате усечения вкраплений во время поиска ухудшилась запоминаемость. Воронкообразный поиск исправляет это с помощью хитрого трюка: мы можем использовать оставшиеся размеры вкраплений для ранжирования и обрезки списка кандидатов, чтобы восстановить производительность поиска без дополнительных дорогостоящих векторных поисков.</p>
<p>Для простоты изложения алгоритма воронкообразного поиска мы преобразуем результаты поиска Milvus для каждого запроса в кадр данных Pandas.</p>
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
<p>Теперь, чтобы выполнить поиск по воронке, мы перебираем все более крупные подмножества вкраплений. На каждой итерации мы ранжируем кандидатов в соответствии с новыми сходствами и отсеиваем некоторую часть кандидатов с наименьшим рейтингом.</p>
<p>Для наглядности, из предыдущего шага мы получили 128 кандидатов, используя 1/6 размерности вкраплений и запроса. Первым шагом при выполнении воронкообразного поиска является пересчет сходства между запросами и кандидатами с использованием <em>первой 1/3 измерений</em>. Нижние 64 кандидата отсеиваются. Затем мы повторяем этот процесс с <em>первыми 2/3 измерений</em>, а затем со <em>всеми измерениями</em>, последовательно обрезая до 32 и 16 кандидатов.</p>
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
<p>Нам удалось восстановить запоминание без дополнительного поиска векторов! Качественно, эти результаты кажутся более запоминающимися для "Raiders of the Lost Ark" и "The Shining", чем стандартный векторный поиск в учебнике <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search using Milvus and Sentence Transformers"</a>, который использует другую модель встраивания. Однако он не смог найти "Ferris Bueller's Day Off", к которому мы вернемся позже в этом блокноте. (Более подробные количественные эксперименты и бенчмарки см. в статье <a href="https://arxiv.org/abs/2205.13147">Matryoshka Representation Learning</a> ).</p>
<h2 id="Comparing-Funnel-Search-to-Regular-Search" class="common-anchor-header">Сравнение поиска по воронке с обычным поиском<button data-href="#Comparing-Funnel-Search-to-Regular-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Давайте сравним результаты нашего воронкообразного поиска со стандартным векторным поиском <em>на том же наборе данных с той же моделью вкрапления</em>. Мы выполняем поиск по полным вкраплениям.</p>
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
<p>За исключением результатов по запросу "Подросток симулирует болезнь, чтобы не ходить в школу...", результаты воронкообразного поиска практически идентичны полному поиску, хотя воронкообразный поиск выполнялся в пространстве поиска 128 измерений против 768 измерений для обычного поиска.</p>
<h2 id="Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="common-anchor-header">Расследование неудачи поиска по воронке в фильме "Выходной день Ферриса Бьюллера<button data-href="#Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="anchor-icon" translate="no">
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
    </button></h2><p>Почему воронкообразный поиск не смог найти фильм Ferris Bueller's Day Off? Давайте разберемся, был ли он в первоначальном списке кандидатов или был ошибочно отфильтрован.</p>
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
<p>Мы видим, что проблема заключалась в том, что первоначальный список кандидатов был недостаточно велик, или, скорее, искомое совпадение не было достаточно похоже на запрос на самом высоком уровне детализации. Замена <code translate="no">128</code> на <code translate="no">256</code> приводит к успешному поиску. <em>Мы должны выработать правило, по которому количество кандидатов в удерживаемом наборе будет определяться эмпирически, чтобы оценить компромисс между запоминанием и задержкой.</em></p>
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
<h2 id="Does-the-order-matter-Prefix-vs-suffix-embeddings" class="common-anchor-header">Имеет ли значение порядок? Префиксные и суффиксные вкрапления.<button data-href="#Does-the-order-matter-Prefix-vs-suffix-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Модель была обучена хорошо сопоставлять рекурсивно меньшие префиксы вкраплений. Имеет ли значение порядок используемых нами измерений? Например, можем ли мы также взять подмножества вкраплений, которые являются суффиксами? В этом эксперименте мы изменили порядок размерностей в эмбеддингах "Матрешки" и выполнили поиск по воронке.</p>
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
<p>Как и ожидалось, запоминание гораздо хуже, чем поиск по воронке или обычный поиск (модель встраивания была обучена методом контрастного обучения на префиксах измерений встраивания, а не на суффиксах).</p>
<h2 id="Summary" class="common-anchor-header">Резюме<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Вот сравнение результатов поиска по разным методам:</p>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-raiders-of-the-lost-ark.png' width='100%'></div>
<div style='margin: auto; width: 100%;'><img translate="no" src='/docs/v2.5.x/assets/results-ferris-buellers-day-off.png' width='100%'></div>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-the-shining.png' width='100%'></div>
Мы показали, как использовать вкрапления "Матрешки" вместе с Milvus для выполнения более эффективного алгоритма семантического поиска, называемого "поиском по воронке". Мы также изучили важность этапов переранжирования и обрезки алгоритма, а также режим отказа, когда начальный список кандидатов слишком мал. Наконец, мы обсудили, насколько важен порядок размерностей при формировании подсемейств - он должен быть таким же, для которого обучалась модель. Вернее, только потому, что модель была обучена определенным образом, префиксы вкраплений имеют смысл. Теперь вы знаете, как реализовать вкрапления "Матрешки" и воронкообразный поиск, чтобы снизить затраты на хранение данных при семантическом поиске без ущерба для производительности поиска!
