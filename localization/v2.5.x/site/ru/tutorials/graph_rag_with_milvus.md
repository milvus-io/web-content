---
id: graph_rag_with_milvus.md
summary: График RAG с помощью Milvus
title: График RAG с помощью Milvus
---
<h1 id="Graph-RAG-with-Milvus" class="common-anchor-header">График RAG с помощью Milvus<button data-href="#Graph-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/graph_rag_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/graph_rag_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Широкое применение больших языковых моделей подчеркивает важность повышения точности и релевантности их ответов. Технология Retrieval-Augmented Generation (RAG) расширяет модели за счет внешних баз знаний, предоставляя больше контекстной информации и смягчая такие проблемы, как галлюцинации и недостаточные знания. Однако опора исключительно на простые парадигмы RAG имеет свои ограничения, особенно при работе со сложными отношениями между сущностями и многоходовыми вопросами, когда модель часто не может дать точный ответ.</p>
<p>Внедрение графов знаний (ГЗ) в систему RAG предлагает новое решение. Графы знаний представляют сущности и их взаимоотношения в структурированном виде, предоставляя более точную поисковую информацию и помогая RAG лучше справляться со сложными задачами по ответам на вопросы. KG-RAG все еще находится на ранней стадии развития, и пока нет единого мнения о том, как эффективно извлекать сущности и отношения из KG или как интегрировать векторный поиск сходства с графовыми структурами.</p>
<p>В этой тетради мы представляем простой, но мощный подход, позволяющий значительно улучшить производительность этого сценария. Это простая парадигма RAG с многоходовым поиском и последующим ранжированием, но она логически реализует Graph RAG и достигает самой современной производительности при обработке многоходовых вопросов. Давайте посмотрим, как это реализовано.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/graph_rag_with_milvus_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед запуском этого блокнота убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade --quiet pymilvus numpy scipy langchain langchain-core langchain-openai tqdm
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</blockquote>
<p>Мы будем использовать модели из OpenAI. Вам необходимо подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> <code translate="no">OPENAI_API_KEY</code> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Импортируйте необходимые библиотеки и зависимости.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> defaultdict
<span class="hljs-keyword">from</span> scipy.<span class="hljs-property">sparse</span> <span class="hljs-keyword">import</span> csr_matrix
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
<span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">messages</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">AIMessage</span>, <span class="hljs-title class_">HumanMessage</span>
<span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">prompts</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatPromptTemplate</span>, <span class="hljs-title class_">HumanMessagePromptTemplate</span>
<span class="hljs-keyword">from</span> langchain_core.<span class="hljs-property">output_parsers</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">StrOutputParser</span>, <span class="hljs-title class_">JsonOutputParser</span>
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatOpenAI</span>, <span class="hljs-title class_">OpenAIEmbeddings</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Инициализируйте экземпляр клиента Milvus, LLM и модель встраивания.</p>
<pre><code translate="no" class="language-python">milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>)

llm = <span class="hljs-title class_">ChatOpenAI</span>(
    model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
    temperature=<span class="hljs-number">0</span>,
)
embedding_model = <span class="hljs-title class_">OpenAIEmbeddings</span>(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Для args в MilvusClient:</p>
<ul>
<li>Установка <code translate="no">uri</code> в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Загрузка данных в автономном режиме<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Data-Preparation" class="common-anchor-header">Подготовка данных</h3><p>В качестве примера мы будем использовать нано-набор данных, в котором представлены отношения между семейством Бернулли и Эйлером. Наноданные содержат 4 отрывка и набор соответствующих триплетов, где каждый триплет содержит субъект, предикат и объект. На практике вы можете использовать любой подход для извлечения триплетов из своего собственного корпуса.</p>
<pre><code translate="no" class="language-python">nano_dataset = [
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Jakob Bernoulli (1654–1705): Jakob was one of the earliest members of the Bernoulli family to gain prominence in mathematics. He made significant contributions to calculus, particularly in the development of the theory of probability. He is known for the Bernoulli numbers and the Bernoulli theorem, a precursor to the law of large numbers. He was the older brother of Johann Bernoulli, another influential mathematician, and the two had a complex relationship that involved both collaboration and rivalry.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;made significant contributions to&quot;</span>, <span class="hljs-string">&quot;calculus&quot;</span>],
            [
                <span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>,
                <span class="hljs-string">&quot;made significant contributions to&quot;</span>,
                <span class="hljs-string">&quot;the theory of probability&quot;</span>,
            ],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;is known for&quot;</span>, <span class="hljs-string">&quot;the Bernoulli numbers&quot;</span>],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;is known for&quot;</span>, <span class="hljs-string">&quot;the Bernoulli theorem&quot;</span>],
            [<span class="hljs-string">&quot;The Bernoulli theorem&quot;</span>, <span class="hljs-string">&quot;is a precursor to&quot;</span>, <span class="hljs-string">&quot;the law of large numbers&quot;</span>],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;was the older brother of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Johann Bernoulli (1667–1748): Johann, Jakob’s younger brother, was also a major figure in the development of calculus. He worked on infinitesimal calculus and was instrumental in spreading the ideas of Leibniz across Europe. Johann also contributed to the calculus of variations and was known for his work on the brachistochrone problem, which is the curve of fastest descent between two points.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [
                <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>,
                <span class="hljs-string">&quot;was a major figure of&quot;</span>,
                <span class="hljs-string">&quot;the development of calculus&quot;</span>,
            ],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was&quot;</span>, <span class="hljs-string">&quot;Jakob&#x27;s younger brother&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;worked on&quot;</span>, <span class="hljs-string">&quot;infinitesimal calculus&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was instrumental in spreading&quot;</span>, <span class="hljs-string">&quot;Leibniz&#x27;s ideas&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;contributed to&quot;</span>, <span class="hljs-string">&quot;the calculus of variations&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was known for&quot;</span>, <span class="hljs-string">&quot;the brachistochrone problem&quot;</span>],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Daniel Bernoulli (1700–1782): The son of Johann Bernoulli, Daniel made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;was the son of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;fluid dynamics&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;probability&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;statistics&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;is most famous for&quot;</span>, <span class="hljs-string">&quot;Bernoulli’s principle&quot;</span>],
            [
                <span class="hljs-string">&quot;Bernoulli’s principle&quot;</span>,
                <span class="hljs-string">&quot;is fundamental to&quot;</span>,
                <span class="hljs-string">&quot;the understanding of aerodynamics&quot;</span>,
            ],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [
                <span class="hljs-string">&quot;Leonhard Euler&quot;</span>,
                <span class="hljs-string">&quot;had a significant relationship with&quot;</span>,
                <span class="hljs-string">&quot;the Bernoulli family&quot;</span>,
            ],
            [<span class="hljs-string">&quot;leonhard Euler&quot;</span>, <span class="hljs-string">&quot;was born in&quot;</span>, <span class="hljs-string">&quot;Basel&quot;</span>],
            [<span class="hljs-string">&quot;Leonhard Euler&quot;</span>, <span class="hljs-string">&quot;was a student of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&#x27;s influence&quot;</span>, <span class="hljs-string">&quot;was profound on&quot;</span>, <span class="hljs-string">&quot;Euler&quot;</span>],
        ],
    },
]
<button class="copy-code-btn"></button></code></pre>
<p>Мы строим сущности и отношения следующим образом:</p>
<ul>
<li>Сущность - это субъект или объект в триплете, поэтому мы напрямую извлекаем их из триплетов.</li>
<li>Здесь мы строим концепцию отношений, непосредственно соединяя субъект, предикат и объект с пробелом между ними.</li>
</ul>
<p>Мы также готовим дикту для сопоставления идентификатора сущности с идентификатором отношения и еще одну дикту для сопоставления идентификатора отношения с идентификатором перехода для последующего использования.</p>
<pre><code translate="no" class="language-python">entityid_2_relationids = defaultdict(list)
relationid_2_passageids = defaultdict(list)

entities = []
relations = []
passages = []
<span class="hljs-keyword">for</span> passage_id, dataset_info in enumerate(nano_dataset):
    passage, triplets = dataset_info[<span class="hljs-string">&quot;passage&quot;</span>], dataset_info[<span class="hljs-string">&quot;triplets&quot;</span>]
    passages.<span class="hljs-built_in">append</span>(passage)
    <span class="hljs-keyword">for</span> triplet in triplets:
        <span class="hljs-keyword">if</span> triplet[<span class="hljs-number">0</span>] not in entities:
            entities.<span class="hljs-built_in">append</span>(triplet[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> triplet[<span class="hljs-number">2</span>] not in entities:
            entities.<span class="hljs-built_in">append</span>(triplet[<span class="hljs-number">2</span>])
        relation = <span class="hljs-string">&quot; &quot;</span>.join(triplet)
        <span class="hljs-keyword">if</span> relation not in relations:
            relations.<span class="hljs-built_in">append</span>(relation)
            entityid_2_relationids[entities.index(triplet[<span class="hljs-number">0</span>])].<span class="hljs-built_in">append</span>(
                <span class="hljs-built_in">len</span>(relations) - <span class="hljs-number">1</span>
            )
            entityid_2_relationids[entities.index(triplet[<span class="hljs-number">2</span>])].<span class="hljs-built_in">append</span>(
                <span class="hljs-built_in">len</span>(relations) - <span class="hljs-number">1</span>
            )
        relationid_2_passageids[relations.index(relation)].<span class="hljs-built_in">append</span>(passage_id)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Insertion" class="common-anchor-header">Вставка данных</h3><p>Создайте коллекции Milvus для сущности, отношения и перехода. Коллекции сущностей и отношений используются в качестве основных коллекций для построения графов в нашем методе, в то время как коллекция отрывков используется в качестве наивного сравнения RAG-поиска или для вспомогательных целей.</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-built_in">len</span>(embedding_model.embed_query(<span class="hljs-string">&quot;foo&quot;</span>))


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_milvus_collection</span>(<span class="hljs-params">collection_name: <span class="hljs-built_in">str</span></span>):
    <span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
        milvus_client.drop_collection(collection_name=collection_name)
    milvus_client.create_collection(
        collection_name=collection_name,
        dimension=embedding_dim,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
    )


entity_col_name = <span class="hljs-string">&quot;entity_collection&quot;</span>
relation_col_name = <span class="hljs-string">&quot;relation_collection&quot;</span>
passage_col_name = <span class="hljs-string">&quot;passage_collection&quot;</span>
create_milvus_collection(entity_col_name)
create_milvus_collection(relation_col_name)
create_milvus_collection(passage_col_name)
<button class="copy-code-btn"></button></code></pre>
<p>Вставьте данные с их метаданными в коллекции Milvus, включая коллекции сущностей, отношений и отрывков. Информация метаданных включает в себя идентификатор отрывка и идентификатор смежной сущности или отношения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">milvus_insert</span>(<span class="hljs-params">
    collection_name: <span class="hljs-built_in">str</span>,
    text_list: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>],
</span>):
    batch_size = <span class="hljs-number">512</span>
    <span class="hljs-keyword">for</span> row_id <span class="hljs-keyword">in</span> tqdm(<span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(text_list), batch_size), desc=<span class="hljs-string">&quot;Inserting&quot;</span>):
        batch_texts = text_list[row_id : row_id + batch_size]
        batch_embeddings = embedding_model.embed_documents(batch_texts)

        batch_ids = [row_id + j <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(batch_texts))]
        batch_data = [
            {
                <span class="hljs-string">&quot;id&quot;</span>: id_,
                <span class="hljs-string">&quot;text&quot;</span>: text,
                <span class="hljs-string">&quot;vector&quot;</span>: vector,
            }
            <span class="hljs-keyword">for</span> id_, text, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch_ids, batch_texts, batch_embeddings)
        ]
        milvus_client.insert(
            collection_name=collection_name,
            data=batch_data,
        )


milvus_insert(
    collection_name=relation_col_name,
    text_list=relations,
)

milvus_insert(
    collection_name=entity_col_name,
    text_list=entities,
)

milvus_insert(
    collection_name=passage_col_name,
    text_list=passages,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  1.02it/s]
Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  1.39it/s]
Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  2.28it/s]
</code></pre>
<h2 id="Online-Querying" class="common-anchor-header">Онлайн-запросы<button data-href="#Online-Querying" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Similarity-Retrieval" class="common-anchor-header">Поиск сходства</h3><p>Мы извлекаем топ-К похожих сущностей и отношений на основе входного запроса из Milvus.</p>
<p>При выполнении поиска сущностей мы должны сначала извлечь сущности из текста запроса с помощью специального метода, например NER (Named-entity recognition). Для простоты мы приводим здесь результаты NER. Если вы хотите изменить запрос в соответствии с вашими пожеланиями, вам необходимо изменить соответствующий список NER запроса. На практике вы можете использовать любую другую модель или подход для извлечения сущностей из запроса.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What contribution did the son of Euler&#x27;s teacher make?&quot;</span>

query_ner_list = [<span class="hljs-string">&quot;Euler&quot;</span>]
<span class="hljs-comment"># query_ner_list = ner(query) # In practice, replace it with your custom NER approach</span>

query_ner_embeddings = [
    embedding_model.embed_query(query_ner) <span class="hljs-keyword">for</span> query_ner <span class="hljs-keyword">in</span> query_ner_list
]

top_k = 3

entity_search_res = milvus_client.search(
    collection_name=entity_col_name,
    data=query_ner_embeddings,
    <span class="hljs-built_in">limit</span>=top_k,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
)

query_embedding = embedding_model.embed_query(query)

relation_search_res = milvus_client.search(
    collection_name=relation_col_name,
    data=[query_embedding],
    <span class="hljs-built_in">limit</span>=top_k,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
)[0]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expand-Subgraph" class="common-anchor-header">Расширение подграфа</h3><p>Мы используем извлеченные сущности и отношения для расширения подграфа и получения отношений-кандидатов, а затем объединяем их двумя способами. Ниже приведена блок-схема процесса расширения подграфа:  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/graph_rag_with_milvus_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Здесь мы строим матрицу смежности и используем матричное умножение для вычисления информации о сопоставлении смежности в пределах нескольких степеней. Таким образом, мы можем быстро получить информацию о любой степени расширения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Construct the adjacency matrix of entities and relations where the value of the adjacency matrix is 1 if an entity is related to a relation, otherwise 0.</span>
entity_relation_adj = np.zeros((<span class="hljs-built_in">len</span>(entities), <span class="hljs-built_in">len</span>(relations)))
<span class="hljs-keyword">for</span> entity_id, entity <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(entities):
    entity_relation_adj[entity_id, entityid_2_relationids[entity_id]] = <span class="hljs-number">1</span>

<span class="hljs-comment"># Convert the adjacency matrix to a sparse matrix for efficient computation.</span>
entity_relation_adj = csr_matrix(entity_relation_adj)

<span class="hljs-comment"># Use the entity-relation adjacency matrix to construct 1 degree entity-entity and relation-relation adjacency matrices.</span>
entity_adj_1_degree = entity_relation_adj @ entity_relation_adj.T
relation_adj_1_degree = entity_relation_adj.T @ entity_relation_adj

<span class="hljs-comment"># Specify the target degree of the subgraph to be expanded.</span>
<span class="hljs-comment"># 1 or 2 is enough for most cases.</span>
target_degree = <span class="hljs-number">1</span>

<span class="hljs-comment"># Compute the target degree adjacency matrices using matrix multiplication.</span>
entity_adj_target_degree = entity_adj_1_degree
<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(target_degree - <span class="hljs-number">1</span>):
    entity_adj_target_degree = entity_adj_target_degree * entity_adj_1_degree
relation_adj_target_degree = relation_adj_1_degree
<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(target_degree - <span class="hljs-number">1</span>):
    relation_adj_target_degree = relation_adj_target_degree * relation_adj_1_degree

entity_relation_adj_target_degree = entity_adj_target_degree @ entity_relation_adj
<button class="copy-code-btn"></button></code></pre>
<p>Взяв значение из матрицы расширения целевой степени, мы можем легко расширить соответствующую степень из найденных сущностей и отношений, чтобы получить все отношения в подграфе.</p>
<pre><code translate="no" class="language-python">expanded_relations_from_relation = <span class="hljs-built_in">set</span>()
expanded_relations_from_entity = <span class="hljs-built_in">set</span>()
<span class="hljs-comment"># You can set the similarity threshold here to guarantee the quality of the retrieved ones.</span>
<span class="hljs-comment"># entity_sim_filter_thresh = ...</span>
<span class="hljs-comment"># relation_sim_filter_thresh = ...</span>

filtered_hit_relation_ids = [
    relation_res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>]
    <span class="hljs-keyword">for</span> relation_res <span class="hljs-keyword">in</span> relation_search_res
    <span class="hljs-comment"># if relation_res[&#x27;distance&#x27;] &gt; relation_sim_filter_thresh</span>
]
<span class="hljs-keyword">for</span> hit_relation_id <span class="hljs-keyword">in</span> filtered_hit_relation_ids:
    expanded_relations_from_relation.update(
        relation_adj_target_degree[hit_relation_id].nonzero()[<span class="hljs-number">1</span>].tolist()
    )

filtered_hit_entity_ids = [
    one_entity_res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>]
    <span class="hljs-keyword">for</span> one_entity_search_res <span class="hljs-keyword">in</span> entity_search_res
    <span class="hljs-keyword">for</span> one_entity_res <span class="hljs-keyword">in</span> one_entity_search_res
    <span class="hljs-comment"># if one_entity_res[&#x27;distance&#x27;] &gt; entity_sim_filter_thresh</span>
]

<span class="hljs-keyword">for</span> filtered_hit_entity_id <span class="hljs-keyword">in</span> filtered_hit_entity_ids:
    expanded_relations_from_entity.update(
        entity_relation_adj_target_degree[filtered_hit_entity_id].nonzero()[<span class="hljs-number">1</span>].tolist()
    )

<span class="hljs-comment"># Merge the expanded relations from the relation and entity retrieval ways.</span>
relation_candidate_ids = <span class="hljs-built_in">list</span>(
    expanded_relations_from_relation | expanded_relations_from_entity
)

relation_candidate_texts = [
    relations[relation_id] <span class="hljs-keyword">for</span> relation_id <span class="hljs-keyword">in</span> relation_candidate_ids
]
<button class="copy-code-btn"></button></code></pre>
<p>Расширив подграф, мы получили отношения-кандидаты, которые будут ранжированы LLM на следующем шаге.</p>
<h3 id="LLM-reranking" class="common-anchor-header">Ранжирование LLM</h3><p>На этом этапе мы используем мощный механизм самонаблюдения LLM для дальнейшей фильтрации и уточнения набора отношений-кандидатов. Мы используем одноразовую подсказку, включающую запрос и набор отношений-кандидатов в подсказку, и поручаем LLM выбрать потенциальные отношения, которые могут помочь ответить на запрос. Учитывая, что некоторые запросы могут быть сложными, мы используем подход "Цепочка мыслей", позволяя LLM выразить свой мыслительный процесс в ответе. Мы оговариваем, что ответ LLM должен быть в формате json для удобства разбора.</p>
<pre><code translate="no" class="language-python">query_prompt_one_shot_input = <span class="hljs-string">&quot;&quot;&quot;I will provide you with a list of relationship descriptions. Your task is to select 3 relationships that may be useful to answer the given question. Please return a JSON object containing your thought process and a list of the selected relationships in order of their relevance.

Question:
When was the mother of the leader of the Third Crusade born?

Relationship descriptions:
[1] Eleanor was born in 1122.
[2] Eleanor married King Louis VII of France.
[3] Eleanor was the Duchess of Aquitaine.
[4] Eleanor participated in the Second Crusade.
[5] Eleanor had eight children.
[6] Eleanor was married to Henry II of England.
[7] Eleanor was the mother of Richard the Lionheart.
[8] Richard the Lionheart was the King of England.
[9] Henry II was the father of Richard the Lionheart.
[10] Henry II was the King of England.
[11] Richard the Lionheart led the Third Crusade.

&quot;&quot;&quot;</span>
query_prompt_one_shot_output = <span class="hljs-string">&quot;&quot;&quot;{&quot;thought_process&quot;: &quot;To answer the question about the birth of the mother of the leader of the Third Crusade, I first need to identify who led the Third Crusade and then determine who his mother was. After identifying his mother, I can look for the relationship that mentions her birth.&quot;, &quot;useful_relationships&quot;: [&quot;[11] Richard the Lionheart led the Third Crusade&quot;, &quot;[7] Eleanor was the mother of Richard the Lionheart&quot;, &quot;[1] Eleanor was born in 1122&quot;]}&quot;&quot;&quot;</span>

query_prompt_template = <span class="hljs-string">&quot;&quot;&quot;Question:
{question}

Relationship descriptions:
{relation_des_str}

&quot;&quot;&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">rerank_relations</span>(<span class="hljs-params">
    query: <span class="hljs-built_in">str</span>, relation_candidate_texts: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>], relation_candidate_ids: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]
</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
    relation_des_str = <span class="hljs-string">&quot;\n&quot;</span>.join(
        <span class="hljs-built_in">map</span>(
            <span class="hljs-keyword">lambda</span> item: <span class="hljs-string">f&quot;[<span class="hljs-subst">{item[<span class="hljs-number">0</span>]}</span>] <span class="hljs-subst">{item[<span class="hljs-number">1</span>]}</span>&quot;</span>,
            <span class="hljs-built_in">zip</span>(relation_candidate_ids, relation_candidate_texts),
        )
    ).strip()
    rerank_prompts = ChatPromptTemplate.from_messages(
        [
            HumanMessage(query_prompt_one_shot_input),
            AIMessage(query_prompt_one_shot_output),
            HumanMessagePromptTemplate.from_template(query_prompt_template),
        ]
    )
    rerank_chain = (
        rerank_prompts
        | llm.bind(response_format={<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;json_object&quot;</span>})
        | JsonOutputParser()
    )
    rerank_res = rerank_chain.invoke(
        {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;relation_des_str&quot;</span>: relation_des_str}
    )
    rerank_relation_ids = []
    rerank_relation_lines = rerank_res[<span class="hljs-string">&quot;useful_relationships&quot;</span>]
    id_2_lines = {}
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> rerank_relation_lines:
        id_ = <span class="hljs-built_in">int</span>(line[line.find(<span class="hljs-string">&quot;[&quot;</span>) + <span class="hljs-number">1</span> : line.find(<span class="hljs-string">&quot;]&quot;</span>)])
        id_2_lines[id_] = line.strip()
        rerank_relation_ids.append(id_)
    <span class="hljs-keyword">return</span> rerank_relation_ids


rerank_relation_ids = rerank_relations(
    query,
    relation_candidate_texts=relation_candidate_texts,
    relation_candidate_ids=relation_candidate_ids,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Get-Final-Results" class="common-anchor-header">Получение окончательных результатов</h3><p>Мы можем получить окончательные результаты извлечения отрывков из ранжированных отношений.</p>
<pre><code translate="no" class="language-python">final_top_k = <span class="hljs-number">2</span>

final_passages = []
final_passage_ids = []
<span class="hljs-keyword">for</span> relation_id in rerank_relation_ids:
    <span class="hljs-keyword">for</span> passage_id in relationid_2_passageids[relation_id]:
        <span class="hljs-keyword">if</span> passage_id not in final_passage_ids:
            final_passage_ids.<span class="hljs-built_in">append</span>(passage_id)
            final_passages.<span class="hljs-built_in">append</span>(passages[passage_id])
passages_from_our_method = final_passages[:final_top_k]
<button class="copy-code-btn"></button></code></pre>
<p>Мы можем сравнить результаты с наивным методом RAG, который извлекает topK отрывков, основанных на вложении запроса, непосредственно из коллекции отрывков.</p>
<pre><code translate="no" class="language-python">naive_passage_res = milvus_client.search(
    collection_name=passage_col_name,
    data=[query_embedding],
    limit=final_top_k,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
)[<span class="hljs-number">0</span>]
passages_from_naive_rag = [res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> naive_passage_res]

<span class="hljs-built_in">print</span>(
    <span class="hljs-string">f&quot;Passages retrieved from naive RAG: \n<span class="hljs-subst">{passages_from_naive_rag}</span>\n\n&quot;</span>
    <span class="hljs-string">f&quot;Passages retrieved from our method: \n<span class="hljs-subst">{passages_from_our_method}</span>\n\n&quot;</span>
)


prompt = ChatPromptTemplate.from_messages(
    [
        (
            <span class="hljs-string">&quot;human&quot;</span>,
            <span class="hljs-string">&quot;&quot;&quot;Use the following pieces of retrieved context to answer the question. If there is not enough information in the retrieved context to answer the question, just say that you don&#x27;t know.
Question: {question}
Context: {context}
Answer:&quot;&quot;&quot;</span>,
        )
    ]
)

rag_chain = prompt | llm | StrOutputParser()

answer_from_naive_rag = rag_chain.invoke(
    {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;context&quot;</span>: <span class="hljs-string">&quot;\n&quot;</span>.join(passages_from_naive_rag)}
)
answer_from_our_method = rag_chain.invoke(
    {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;context&quot;</span>: <span class="hljs-string">&quot;\n&quot;</span>.join(passages_from_our_method)}
)

<span class="hljs-built_in">print</span>(
    <span class="hljs-string">f&quot;Answer from naive RAG: <span class="hljs-subst">{answer_from_naive_rag}</span>\n\nAnswer from our method: <span class="hljs-subst">{answer_from_our_method}</span>&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Passages retrieved from naive RAG: 
['Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.', 'Johann Bernoulli (1667–1748): Johann, Jakob’s younger brother, was also a major figure in the development of calculus. He worked on infinitesimal calculus and was instrumental in spreading the ideas of Leibniz across Europe. Johann also contributed to the calculus of variations and was known for his work on the brachistochrone problem, which is the curve of fastest descent between two points.']

Passages retrieved from our method: 
['Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.', 'Daniel Bernoulli (1700–1782): The son of Johann Bernoulli, Daniel made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.']


Answer from naive RAG: I don't know. The retrieved context does not provide information about the contributions made by the son of Euler's teacher.

Answer from our method: The son of Euler's teacher, Daniel Bernoulli, made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.
</code></pre>
<p>Как мы видим, отрывки, полученные с помощью наивного метода RAG, не содержат истинного отрывка, что привело к неправильному ответу. Отрывки, полученные с помощью нашего метода, верны, и это помогает получить точный ответ на вопрос.</p>
