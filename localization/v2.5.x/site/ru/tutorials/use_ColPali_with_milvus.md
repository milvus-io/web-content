---
id: use_ColPali_with_milvus.md
summary: >-
  В этом блокноте мы называем этот вид многовекторного представления
  "вкраплениями ColBERT" для общности. Однако на самом деле используется модель
  ColPali. Мы продемонстрируем, как использовать Milvus для многовекторного
  поиска. На основе этого мы покажем, как использовать ColPali для поиска
  страниц по заданному запросу.
title: Использование ColPali для мультимодального поиска с помощью Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="common-anchor-header">Использование ColPali для мультимодального поиска с помощью Milvus<button data-href="#Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Современные модели поиска обычно используют одно вложение для представления текста или изображений. Однако ColBERT - это нейронная модель, которая использует список вкраплений для каждого экземпляра данных и применяет операцию "MaxSim" для расчета сходства между двумя текстами. Помимо текстовых данных, рисунки, таблицы и диаграммы также содержат богатую информацию, которая часто игнорируется при поиске информации по тексту.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/colpali_formula.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Функция MaxSim сравнивает запрос и документ (то, что вы ищете), рассматривая их вкрапления лексем. Для каждого слова в запросе она выбирает наиболее похожее слово из документа (используя косинусоидальное сходство или квадратичное расстояние L2) и суммирует эти максимальные сходства по всем словам в запросе.</p>
<p>ColPali - это метод, который объединяет многовекторное представление ColBERT с PaliGemma (мультимодальной моделью большого языка), чтобы использовать ее широкие возможности понимания. Этот подход позволяет представить страницу с текстом и изображениями с помощью единого многовекторного вложения. Вкрапления в этом многовекторном представлении могут захватывать подробную информацию, улучшая производительность генерации с расширенным поиском (RAG) для мультимодальных данных.</p>
<p>В этом блокноте мы называем этот вид многовекторного представления "вкраплениями ColBERT" для общности. Однако на самом деле используется модель <strong>ColPali</strong>. Мы продемонстрируем, как использовать Milvus для многовекторного поиска. На основе этого мы расскажем, как использовать ColPali для поиска страниц по заданному запросу.</p>
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pdf2image</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install colpali_engine</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install tqdm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pillow</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">Подготовка данных<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>В качестве примера мы будем использовать PDF RAG. Вы можете скачать документ <a href="https://arxiv.org/pdf/2004.12832">ColBERT</a> и поместить его в <code translate="no">./pdf</code>. ColPali не обрабатывает текст напрямую; вместо этого вся страница растеризуется в изображение. Модель ColPali отлично справляется с пониманием текстовой информации, содержащейся в этих изображениях. Поэтому мы преобразуем каждую страницу PDF в изображение для обработки.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pdf2image <span class="hljs-keyword">import</span> convert_from_path

pdf_path = <span class="hljs-string">&quot;pdfs/2004.12832v2.pdf&quot;</span>
images = convert_from_path(pdf_path)

<span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(images):
    image.save(<span class="hljs-string">f&quot;pages/page_<span class="hljs-subst">{i + <span class="hljs-number">1</span>}</span>.png&quot;</span>, <span class="hljs-string">&quot;PNG&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Далее мы инициализируем базу данных с помощью Milvus Lite. Вы можете легко переключиться на полный экземпляр Milvus, установив uri на соответствующий адрес, где размещен ваш сервис Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> concurrent.futures

client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Если вам нужна локальная векторная база данных только для небольших масштабов данных или прототипирования, установка uri в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, поскольку он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "<your_username>:<your_password>" в качестве токена, в противном случае не задавайте токен.</li>
<li>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
</ul>
</div>
<p>Мы определим класс MilvusColbertRetriever, чтобы обернуть его вокруг клиента Milvus для получения многовекторных данных. Реализация сплющивает вкрапления ColBERT и вставляет их в коллекцию, где каждая строка представляет собой отдельное вкрапление из списка вкраплений ColBERT. Она также записывает doc_id и seq_id для отслеживания происхождения каждого вкрапления.</p>
<p>При поиске по списку вкраплений ColBERT будет проведено несколько поисков - по одному для каждого вкрапления ColBERT. Полученные идентификаторы doc_ids будут затем дедуплицированы. Будет проведен процесс ранжирования, в ходе которого будут получены полные вкрапления для каждого doc_id и рассчитан балл MaxSim для получения окончательных ранжированных результатов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusColbertRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, milvus_client, collection_name, dim=<span class="hljs-number">128</span></span>):
        <span class="hljs-comment"># Initialize the retriever with a Milvus client, collection name, and dimensionality of the vector embeddings.</span>
        <span class="hljs-comment"># If the collection exists, load it.</span>
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-variable language_">self</span>.client = milvus_client
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.load_collection(collection_name)
        <span class="hljs-variable language_">self</span>.dim = dim

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_collection</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a new collection in Milvus for storing embeddings.</span>
        <span class="hljs-comment"># Drop the existing collection if it already exists and define the schema for the collection.</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.drop_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        schema = <span class="hljs-variable language_">self</span>.client.create_schema(
            auto_id=<span class="hljs-literal">True</span>,
            enable_dynamic_fields=<span class="hljs-literal">True</span>,
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-variable language_">self</span>.dim
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;seq_id&quot;</span>, datatype=DataType.INT16)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.INT64)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, schema=schema
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create an index on the vector field to enable fast similarity search.</span>
        <span class="hljs-comment"># Releases and drops any existing index before creating a new one with specified parameters.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        <span class="hljs-variable language_">self</span>.client.drop_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_name=<span class="hljs-string">&quot;vector&quot;</span>
        )
        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>,
            index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># or the appropriate metric type</span>
            params={
                <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
                <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">500</span>,
            },  <span class="hljs-comment"># adjust these parameters as needed</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_scalar_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a scalar index for the &quot;doc_id&quot; field to enable fast lookups by document ID.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)

        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
            index_name=<span class="hljs-string">&quot;int32_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, data, topk</span>):
        <span class="hljs-comment"># Perform a vector search on the collection to find the top-k most similar documents.</span>
        search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
        results = <span class="hljs-variable language_">self</span>.client.search(
            <span class="hljs-variable language_">self</span>.collection_name,
            data,
            limit=<span class="hljs-built_in">int</span>(<span class="hljs-number">50</span>),
            output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;doc_id&quot;</span>],
            search_params=search_params,
        )
        doc_ids = <span class="hljs-built_in">set</span>()
        <span class="hljs-keyword">for</span> r_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results)):
            <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results[r_id])):
                doc_ids.add(results[r_id][r][<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_id&quot;</span>])

        scores = []

        <span class="hljs-keyword">def</span> <span class="hljs-title function_">rerank_single_doc</span>(<span class="hljs-params">doc_id, data, client, collection_name</span>):
            <span class="hljs-comment"># Rerank a single document by retrieving its embeddings and calculating the similarity with the query.</span>
            doc_colbert_vecs = client.query(
                collection_name=collection_name,
                <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;doc_id in [<span class="hljs-subst">{doc_id}</span>]&quot;</span>,
                output_fields=[<span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;doc&quot;</span>],
                limit=<span class="hljs-number">1000</span>,
            )
            doc_vecs = np.vstack(
                [doc_colbert_vecs[i][<span class="hljs-string">&quot;vector&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(doc_colbert_vecs))]
            )
            score = np.dot(data, doc_vecs.T).<span class="hljs-built_in">max</span>(<span class="hljs-number">1</span>).<span class="hljs-built_in">sum</span>()
            <span class="hljs-keyword">return</span> (score, doc_id)

        <span class="hljs-keyword">with</span> concurrent.futures.ThreadPoolExecutor(max_workers=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> executor:
            futures = {
                executor.submit(
                    rerank_single_doc, doc_id, data, client, <span class="hljs-variable language_">self</span>.collection_name
                ): doc_id
                <span class="hljs-keyword">for</span> doc_id <span class="hljs-keyword">in</span> doc_ids
            }
            <span class="hljs-keyword">for</span> future <span class="hljs-keyword">in</span> concurrent.futures.as_completed(futures):
                score, doc_id = future.result()
                scores.append((score, doc_id))

        scores.sort(key=<span class="hljs-keyword">lambda</span> x: x[<span class="hljs-number">0</span>], reverse=<span class="hljs-literal">True</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(scores) &gt;= topk:
            <span class="hljs-keyword">return</span> scores[:topk]
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> scores

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">self, data</span>):
        <span class="hljs-comment"># Insert ColBERT embeddings and metadata for a document into the collection.</span>
        colbert_vecs = [vec <span class="hljs-keyword">for</span> vec <span class="hljs-keyword">in</span> data[<span class="hljs-string">&quot;colbert_vecs&quot;</span>]]
        seq_length = <span class="hljs-built_in">len</span>(colbert_vecs)
        doc_ids = [data[<span class="hljs-string">&quot;doc_id&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)]
        seq_ids = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(seq_length))
        docs = [<span class="hljs-string">&quot;&quot;</span>] * seq_length
        docs[<span class="hljs-number">0</span>] = data[<span class="hljs-string">&quot;filepath&quot;</span>]

        <span class="hljs-comment"># Insert the data as multiple vectors (one for each sequence) along with the corresponding metadata.</span>
        <span class="hljs-variable language_">self</span>.client.insert(
            <span class="hljs-variable language_">self</span>.collection_name,
            [
                {
                    <span class="hljs-string">&quot;vector&quot;</span>: colbert_vecs[i],
                    <span class="hljs-string">&quot;seq_id&quot;</span>: seq_ids[i],
                    <span class="hljs-string">&quot;doc_id&quot;</span>: doc_ids[i],
                    <span class="hljs-string">&quot;doc&quot;</span>: docs[i],
                }
                <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)
            ],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Мы будем использовать <a href="https://github.com/illuin-tech/colpali">colpali_engine</a> для извлечения списков вкраплений для двух запросов и извлечения релевантной информации из PDF-страниц.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali
<span class="hljs-keyword">from</span> colpali_engine.models.paligemma.colpali.processing_colpali <span class="hljs-keyword">import</span> ColPaliProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.processing_utils <span class="hljs-keyword">import</span> BaseVisualRetrieverProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.torch_utils <span class="hljs-keyword">import</span> ListDataset, get_torch_device
<span class="hljs-keyword">from</span> torch.utils.data <span class="hljs-keyword">import</span> DataLoader
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, cast

device = get_torch_device(<span class="hljs-string">&quot;cpu&quot;</span>)
model_name = <span class="hljs-string">&quot;vidore/colpali-v1.2&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=device,
).<span class="hljs-built_in">eval</span>()

queries = [
    <span class="hljs-string">&quot;How to end-to-end retrieval with ColBert?&quot;</span>,
    <span class="hljs-string">&quot;Where is ColBERT performance table?&quot;</span>,
]

processor = cast(ColPaliProcessor, ColPaliProcessor.from_pretrained(model_name))

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](queries),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_queries(x),
)

qs: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_query <span class="hljs-keyword">in</span> dataloader:
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_query = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_query.items()}
        embeddings_query = model(**batch_query)
    qs.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_query.to(<span class="hljs-string">&quot;cpu&quot;</span>))))
<button class="copy-code-btn"></button></code></pre>
<p>Кроме того, нам нужно извлечь список вкраплений для каждой страницы, а он показывает, что для каждой страницы имеется 1030 128-мерных вкраплений.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">import</span> os

images = [Image.<span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;./pages/&quot;</span> + name) <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](images),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_images(x),
)

ds: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_doc <span class="hljs-keyword">in</span> tqdm(dataloader):
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_doc = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_doc.items()}
        embeddings_doc = model(**batch_doc)
    ds.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_doc.to(<span class="hljs-string">&quot;cpu&quot;</span>))))

<span class="hljs-built_in">print</span>(ds[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  0%|          | 0/10 [00:00&lt;?, ?it/s]

100%|██████████| 10/10 [01:22&lt;00:00,  8.24s/it]

torch.Size([1030, 128])
</code></pre>
<p>Мы создадим коллекцию под названием "colpali" с помощью MilvusColbertRetriever.</p>
<pre><code translate="no" class="language-python">retriever = MilvusColbertRetriever(collection_name=<span class="hljs-string">&quot;colpali&quot;</span>, milvus_client=client)
retriever.create_collection()
retriever.create_index()
<button class="copy-code-btn"></button></code></pre>
<p>Мы вставим списки вкраплений в базу данных Milvus.</p>
<pre><code translate="no" class="language-python">filepaths = [<span class="hljs-string">&quot;./pages/&quot;</span> + name <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(filepaths)):
    data = {
        <span class="hljs-string">&quot;colbert_vecs&quot;</span>: ds[i].<span class="hljs-built_in">float</span>().numpy(),
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;filepath&quot;</span>: filepaths[i],
    }
    retriever.insert(data)
<button class="copy-code-btn"></button></code></pre>
<p>Теперь мы можем искать наиболее релевантную страницу, используя список вкраплений по запросу.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query <span class="hljs-keyword">in</span> qs:
    query = query.<span class="hljs-built_in">float</span>().numpy()
    result = retriever.search(query, topk=<span class="hljs-number">1</span>)
    <span class="hljs-built_in">print</span>(filepaths[result[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">./pages/page_5.png
./pages/page_7.png
</code></pre>
<p>Наконец, мы получим оригинальное название страницы. С помощью ColPali мы можем извлекать мультимодальные документы, не прибегая к сложным технологиям обработки для извлечения текста и изображений из документов. Благодаря использованию больших моделей зрения можно анализировать больше информации, например таблицы и рисунки, без существенной потери информации.</p>
