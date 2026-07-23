---
id: hugging-face-ranker.md
title: Hugging Face RankerCompatible with Milvus v2.6.20+
summary: >-
  В этой статье описывается, как переранжировать результаты поиска Milvus с
  помощью размещенных на хостинге моделей оценки сходства предложений от Hugging
  Face.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Векторный поиск сортирует результаты по векторному расстоянию, но исходный порядок может не отражать, насколько хорошо текст каждого кандидата соответствует запросу. Hugging Face Ranker отправляет запрос и текст кандидатов в хостируемые <a href="https://huggingface.co/docs/inference-providers/index">провайдеры инференции Hugging Face</a> и использует оценки « <code translate="no">sentence-similarity</code> » для переупорядочения кандидатов, возвращаемых Milvus.</p>
<p>В этой интеграции используется хостируемый маршрутизатор Hugging Face. Чтобы выполнить переранжирование с помощью отдельно развернутого сервиса Text Embeddings Inference (TEI), см. <a href="/docs/ru/tei-ranker.md">TEI Ranker</a>.</p>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Функция должна ссылаться ровно на одно поле <code translate="no">VARCHAR</code>, не допускающее нулевых значений, в <code translate="no">input_field_names</code>.</li>
<li>Количество строк в <code translate="no">queries</code> должно равняться количеству поисковых запросов (<code translate="no">nq</code>).</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Как это работает<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-flow.png" alt="Hugging Face Ranker workflow" class="doc-image" id="hugging-face-ranker-workflow" /> 
   <span>Рабочий процесс Hugging Face Ranker</span>
  
 </span></p>
<p>Hugging Face Ranker запускается после первоначального векторного поиска:</p>
<ol>
<li><strong>Извлечение кандидатов-сущностей.</strong> Milvus выполняет поиск по настроенному векторному полю и собирает кандидатов-сущности.</li>
<li><strong>Подготовка текста для повторного ранжирования.</strong> Функция считывает текст запроса из <code translate="no">params.queries</code> и текст кандидатов из поля <code translate="no">VARCHAR</code>, указанного в <code translate="no">input_field_names</code>.</li>
<li><strong>Запрос оценок сходства.</strong> Milvus отправляет запрос как <code translate="no">source_sentence</code>, а тексты кандидатов как <code translate="no">sentences</code> через <code translate="no">hf-inference</code> в конвейер Hugging Face <code translate="no">sentence-similarity</code>.</li>
<li><strong>Переранжировка кандидатов.</strong> Hugging Face возвращает один показатель для каждого кандидата. Milvus упорядочивает кандидатов от наивысшего к наименьшему показателю и возвращает переранжированные результаты.</li>
</ol>
<p><strong>Как рассчитываются оценки сходства</strong></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-scoring.png" alt="How Hugging Face Ranker calculates similarity scores" class="doc-image" id="how-hugging-face-ranker-calculates-similarity-scores" /> 
   <span>Как Hugging Face Ranker рассчитывает оценки сходства</span>
  
 </span></p>
<p>Модель Hugging Face рассчитывает оценки в три этапа:</p>
<ol>
<li><strong>Подготовка текстовых входных данных.</strong> Ranker считывает текст запроса из <code translate="no">params.queries</code> и текст кандидатов из настроенного поля <code translate="no">VARCHAR</code>.</li>
<li><strong>Создание отдельных представлений модели.</strong> Milvus отправляет запрос как <code translate="no">source_sentence</code>, а тексты кандидатов — как <code translate="no">sentences</code>. Модель внутренне кодирует запрос и каждого кандидата отдельно.</li>
<li><strong>Сравнение и возвращение оценок.</strong> Модель сравнивает представление запроса с представлением каждого кандидата и возвращает одну оценку схожести для каждого кандидата.</li>
</ol>
<p>Встраивания или представления, используемые моделью Hugging Face, являются промежуточными этапами обработки модели. Hugging Face возвращает оценки, а не векторы. Поэтому для первоначального извлечения векторов и повторного ранжирования модели используются отдельные представления и могут применяться разные модели.</p>
<h2 id="Before-you-start" class="common-anchor-header">Перед началом работы<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед использованием Hugging Face Ranker убедитесь, что у вас установлена:</p>
<ul>
<li>Milvus 2.6.20 или более поздней версии из линейки релизов 2.6.</li>
<li>PyMilvus 2.6.16 или более поздней версии.</li>
<li>Токен доступа пользователя Hugging Face, позволяющий вызывать провайдеры инференции.</li>
<li>Модель, которая в данный момент обслуживается <code translate="no">hf-inference</code> для <a href="https://huggingface.co/tasks/sentence-similarity"><code translate="no">sentence-similarity</code></a> задачи.</li>
<li>Коллекция, в которой хранится текст-кандидат в поле <code translate="no">VARCHAR</code>, не допускающем нулевого значения.</li>
</ul>
<div class="alert note">
<p>Milvus не контролирует, останется ли модель Hugging Face доступной через <code translate="no">hf-inference</code>, а также соответствует ли модель вашим требованиям к стабильности, задержке и качеству вывода. Перед использованием модели в производственной среде проверьте её на Hugging Face и оцените её применительно к вашей рабочей нагрузке.</p>
</div>
<p>В примерах используется <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a> используются исключительно для демонстрации конфигурации. Модель не является рекомендацией или сертификатом со стороны Milvus.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Настройка учетных данных<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете настроить токен доступа пользователя Hugging Face на сайте <code translate="no">milvus.yaml</code> или с помощью переменной среды.</p>
<p>Приоритет учетных данных следующий:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Вариант 1: Файл конфигурации<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Определите токен в разделе верхнего уровня <code translate="no">credential</code>, а затем укажите провайдеру ранжирования Hugging Face метку учетных данных:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">huggingface:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
          <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>Параметр « <code translate="no">credential</code> » на уровне функции может переопределить метку на уровне провайдера. Его значением должна быть метка учетных данных, определённая в <code translate="no">milvus.yaml</code>, а не сам токен.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Вариант 2: Переменная среды<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Если ни в конфигурации функции, ни в конфигурации провайдера не указан ярлык учетных данных, задайте параметр ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ` в среде службы Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Hugging-Face-Ranker" class="common-anchor-header">Использование Hugging Face Ranker<button data-href="#Use-Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Hugging Face Ranker определяется и применяется во время поиска. Вы можете изменять или опускать ранжировщик для каждого поиска, не изменяя схему коллекции.</p>
<h3 id="Step-1-Prepare-a-collection" class="common-anchor-header">Шаг 1: Подготовка коллекции<button data-href="#Step-1-Prepare-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующем примере создается коллекция с текстовым полем для повторного ранжирования и векторным полем для первоначального извлечения:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_rerank_demo&quot;</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Recent renewable energy developments include improved solar efficiency.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Climate policy and carbon markets have evolved rapidly in recent years.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.39</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;New battery technology helps stabilize wind and solar power generation.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.90</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.02</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector databases support similarity search for machine learning applications.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.01</span>, <span class="hljs-number">0.02</span>, <span class="hljs-number">0.03</span>, <span class="hljs-number">0.04</span>],
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-the-rerank-Function" class="common-anchor-header">Шаг 2: Определение функции переранжирования<button data-href="#Step-2-Define-the-rerank-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Определите функцию « <code translate="no">RERANK</code> », которая считывает текст кандидатов из <code translate="no">document</code> и использует текст запроса из <code translate="no">queries</code>:</p>
<pre><code translate="no" class="language-python">hugging_face_ranker = Function(
    name=<span class="hljs-string">&quot;hugging_face_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Если вы используете только учетные данные на уровне провайдера или переменную среды, опустите <code translate="no">credential</code> из параметров функции.</p>
<p>В следующей таблице описаны параметры Hugging Face Ranker:</p>
<table>
<thead>
<tr><th>Параметр</th><th>Обязателен?</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">reranker</code></td><td>Да</td><td>Реализация переранжирования. Установите для этого параметра значение « <code translate="no">model</code> ».</td></tr>
<tr><td><code translate="no">provider</code></td><td>Да</td><td>Поставщик модели. Установите для этого параметра значение « <code translate="no">huggingface</code> ».</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Да</td><td>Идентификатор модели Hugging Face для модели, предоставляемой через <code translate="no">hf-inference</code> для задачи « <code translate="no">sentence-similarity</code> ».</td></tr>
<tr><td><code translate="no">queries</code></td><td>Да</td><td>Строки запроса, используемые для повторного ранжирования. Укажите ровно одну строку на каждый поисковый запрос, даже если при первоначальном извлечении используются векторы запросов.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>Нет</td><td>Маршрут провайдера инференции Hugging Face. По умолчанию и единственное поддерживаемое значение в Milvus 2.6.20 — <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>Нет</td><td>Метка учетных данных, определённая в разделе верхнего уровня <code translate="no">credential</code> файла <code translate="no">milvus.yaml</code>. Это значение не является самим токеном.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>Нет</td><td>Максимальное количество текстов-кандидатов, отправляемых в одном запросе Hugging Face. Значение по умолчанию — <code translate="no">32</code>, и оно должно быть больше, чем <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Search-with-the-ranker" class="common-anchor-header">Шаг 3: Поиск с помощью ранжера<button data-href="#Step-3-Search-with-the-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Передайте функцию через параметр <code translate="no">ranker</code> на сайте <code translate="no">search()</code>:</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.41</span>]

results = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
<span class="highlighted-wrapper-line">    ranker=hugging_face_ranker,</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus сначала извлекает кандидаты из <code translate="no">dense</code>, затем использует текст запроса в <code translate="no">queries</code> и текст кандидата в <code translate="no">document</code> для расчёта оценок сходства предложений. Возвращаемые кандидаты упорядочиваются по оценкам Hugging Face.</p>
<h2 id="Troubleshooting" class="common-anchor-header">Устранение неполадок<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-sentence-similarity" class="common-anchor-header">Модель недоступна для оценки сходства предложений<button data-href="#The-model-is-unavailable-for-sentence-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Откройте страницу модели на Hugging Face и проверьте раздел <strong>«Inference Providers</strong> ». Убедитесь, что модель, доступная по адресу <code translate="no">hf-inference</code>, используется для задачи <code translate="no">sentence-similarity</code>. Если это не так, выберите другую модель, поддерживающую данную задачу.</p>
<h3 id="The-number-of-query-strings-does-not-match-the-search-request" class="common-anchor-header">Количество строк запроса не соответствует поисковому запросу<button data-href="#The-number-of-query-strings-does-not-match-the-search-request" class="anchor-icon" translate="no">
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
    </button></h3><p>Количество строк в <code translate="no">queries</code> должно равняться количеству поисковых запросов (<code translate="no">nq</code>). Для поиска с одним вектором запроса укажите ровно одну строку запроса.</p>
<h3 id="Candidate-text-is-missing-or-nullable" class="common-anchor-header">Отсутствует текст кандидата или он может принимать значение null<button data-href="#Candidate-text-is-missing-or-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь, что поле <code translate="no">input_field_names</code> содержит ровно одно поле <code translate="no">VARCHAR</code>, не допускающее нулевого значения, и что каждая сущность-кандидат содержит текст в этом поле.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus сообщает об отсутствии учетных данных Hugging Face<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь, что в файле ` <code translate="no">milvus.yaml</code>` присутствует метка учетных данных `Function`, что метка на уровне провайдера действительна или что ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ` присутствует в среде службы Milvus.</p>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Информацию о поведении и ограничениях общего доступа к ранжерам моделей см. в разделе <a href="/docs/ru/model-ranker-overview.md">«Обзор ранжеров моделей</a>».</li>
<li>Чтобы сгенерировать вложения с помощью размещенных провайдеров инференса Hugging Face, см. раздел <a href="/docs/ru/hugging-face.md">«Hugging Face</a>».</li>
<li>Чтобы применить ранжировщик к гибридному поиску, см. раздел <a href="/docs/ru/multi-vector-search.md">«Гибридный поиск с несколькими векторами</a>».</li>
</ul>
