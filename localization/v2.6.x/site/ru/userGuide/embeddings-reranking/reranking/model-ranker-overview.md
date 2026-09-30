---
id: model-ranker-overview.md
title: Обзор Model RankerCompatible with Milvus 2.6.x
summary: >-
  При традиционном векторном поиске результаты ранжируются исключительно по
  математическому сходству — то есть по степени совпадения векторов в
  многомерном пространстве. Несмотря на свою эффективность, этот подход зачастую
  не учитывает истинную семантическую релевантность. Рассмотрим, например, поиск
  по запросу «лучшие практики оптимизации баз данных»: вы можете получить
  документы с высоким векторным сходством, в которых эти термины упоминаются
  часто, но которые на самом деле не содержат практических стратегий
  оптимизации.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Обзор Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Традиционный векторный поиск ранжирует результаты исключительно по математическому сходству — то есть по тому, насколько близко векторы совпадают в многомерном пространстве. Несмотря на свою эффективность, этот подход часто упускает истинную семантическую релевантность. Возьмем, к примеру, поиск <strong>по запросу «лучшие практики оптимизации баз данных»:</strong> вы можете получить документы с высоким векторным сходством, в которых эти термины упоминаются часто, но которые на самом деле не содержат практических стратегий оптимизации.</p>
<p>Model Ranker преобразует поиск в Milvus за счет интеграции передовых языковых моделей, которые понимают семантические связи между запросами и документами. Вместо того чтобы полагаться исключительно на векторное сходство, он оценивает смысл и контекст контента, чтобы предоставлять более интеллектуальные и релевантные результаты.</p>
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
<li><p>Model Ranker нельзя использовать при групповом поиске.</p></li>
<li><p>Поля, используемые для переранжирования с помощью модели, должны быть текстового типа (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Каждый ранжировщик на основе модели может использовать для оценки только одно поле типа « <code translate="no">VARCHAR</code> » за раз.</p></li>
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
    </button></h2><p>Ранжировщики моделей интегрируют возможности понимания языковых моделей в процесс поиска Milvus посредством четко определённого рабочего процесса:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Обзор ранжера на основе языковой модели</span>
  
 </span></p>
<ol>
<li><p><strong>Начальный запрос</strong>: ваше приложение отправляет запрос в Milvus</p></li>
<li><p><strong>Векторный поиск</strong>: Milvus выполняет стандартный векторный поиск для выявления документов-кандидатов</p></li>
<li><p><strong>Извлечение подходящих документов</strong>: система определяет начальный набор подходящих документов на основе векторного сходства</p></li>
<li><p><strong>Оценка модели</strong>: функция «Model Ranker» обрабатывает пары «запрос-документ»:</p>
<ul>
<li><p>отправляет исходный запрос и документы-кандидаты во внешний сервис модели</p></li>
<li><p>Языковая модель оценивает семантическую релевантность между запросом и каждым документом</p></li>
<li><p>Каждому документу присваивается оценка релевантности на основе семантического анализа</p></li>
</ul></li>
<li><p><strong>Интеллектуальное переранжирование</strong>: документы переупорядочиваются на основе оценок релевантности, сгенерированных моделью</p></li>
<li><p><strong>Улучшенные результаты</strong>: ваше приложение получает результаты, ранжированные по семантической релевантности, а не только по векторному сходству</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Выберите поставщика моделей в соответствии с вашими потребностями<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает следующие поставщики моделей для переранжирования, каждый из которых обладает своими особенностями:</p>
<table>
   <tr>
     <th><p>Поставщик</p></th>
     <th><p>Идеально подходит для</p></th>
     <th><p>Характеристики</p></th>
     <th><p>Пример использования</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Сложные приложения, требующие глубокого семантического понимания и настройки</p></td>
     <td><ul><li><p>Поддерживает различные крупные языковые модели</p></li><li><p>Гибкие варианты развертывания</p></li><li><p>Более высокие вычислительные требования</p></li><li><p>Больший потенциал настройки</p></li></ul></td>
     <td><p>Платформа для юридических исследований, использующая отраслевые модели, которые понимают юридическую терминологию и взаимосвязи в судебной практике</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Быстрое внедрение с эффективным использованием ресурсов</p></td>
     <td><ul><li><p>Легкий сервис, оптимизированный для работы с текстом</p></li><li><p>Простое развертывание с меньшими требованиями к ресурсам</p></li><li><p>Предварительно оптимизированные модели переранжирования</p></li><li><p>Минимальные накладные расходы на инфраструктуру</p></li></ul></td>
     <td><p>Система управления контентом, требующая эффективных возможностей переранжирования с учетом стандартных требований</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Корпоративные приложения, в которых приоритетными являются надежность и простота интеграции</p></td>
     <td><ul><li><p>Надежность и масштабируемость корпоративного уровня</p></li><li><p>Управляемый сервис без необходимости обслуживания инфраструктуры</p></li><li><p>Возможности переранжирования на нескольких языках</p></li><li><p>Встроенное ограничение скорости и обработка ошибок</p></li></ul></td>
     <td><p>Платформа электронной коммерции, требующая поиска с высокой доступностью, стабильной производительностью API и многоязычными каталогами товаров</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Приложения RAG с конкретными требованиями к производительности и контексту</p></td>
     <td><ul><li><p>Модели, специально обученные для задач переранжирования</p></li><li><p>Детальные настройки усечения для документов различной длины</p></li><li><p>Оптимизированный вывод для рабочих нагрузок в производственной среде</p></li><li><p>Несколько вариантов моделей (rerank-2, rerank-lite и т. д.)</p></li></ul></td>
     <td><p>Исследовательская база данных с документами различной длины, требующая тонкой настройки производительности и специализированного семантического понимания</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Приложения, обрабатывающие длинные документы с приоритетом экономической эффективности</p></td>
     <td><ul><li><p>Расширенное разбиение документов на фрагменты с настраиваемым перекрытием</p></li><li><p>Оценка на основе фрагментов (фрагмент с наивысшим баллом представляет документ)</p></li><li><p>Поддержка различных моделей переранжирования</p></li><li><p>Экономичность благодаря наличию стандартной и профессиональной версий</p></li></ul></td>
     <td><p>Система поиска технической документации, обрабатывающая объемные руководства и статьи, требующие интеллектуальной сегментации и управления перекрытием</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>Приложения, использующие размещенные на хостинге модели Hugging Face для оценки сходства предложений</p></td>
     <td><ul><li><p>Использует хостируемый провайдер « <code translate="no">hf-inference</code> »</p></li><li><p>Выбор моделей из Hugging Face Hub</p></li><li><p>Рассчитывает один показатель сходства предложений для каждого кандидата</p></li><li><p>Использует аутентификацию по API-ключу</p></li></ul></td>
     <td><p>Приложения семантического поиска, в которых требуется переранжировать тексты-кандидаты с помощью модели Hugging Face без запуска отдельного сервиса вывода</p></td>
   </tr>
</table>
<p>Подробную информацию о реализации каждого сервиса модели см. в соответствующей документации:</p>
<ul>
<li><p><a href="/docs/ru/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/hugging-face-ranker.md">Hugging Face Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Реализация<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед реализацией Model Ranker убедитесь, что у вас есть:</p>
<ul>
<li><p>Коллекция Milvus с полем « <code translate="no">VARCHAR</code> », содержащим текст, который необходимо переранжировать</p></li>
<li><p>Работающий внешний сервис модели, доступный для вашего экземпляра Milvus</p></li>
<li><p>Надлежащее сетевое соединение между Milvus и выбранным вами сервисом модели</p></li>
</ul>
<p>Ранжировщики моделей легко интегрируются как со стандартным векторным поиском, так и с гибридными поисковыми операциями. Реализация предполагает создание объекта Function, который определяет конфигурацию переранжирования, и передачу его в поисковые операции.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Создание рангера на основе модели<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Для реализации переранжирования с помощью модели сначала определите объект Function с соответствующей конфигурацией. В этом примере в качестве поставщика сервиса используется TEI:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Обязателен?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение / Пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Идентификатор вашей функции, используемый при выполнении поиска.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Имя текстового поля, которое будет использоваться для переранжирования.</p><p>Должно быть полем типа « <code translate="no">VARCHAR</code> ».</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает тип создаваемой функции.</p><p>Для всех ранжировщиков моделей должно быть установлено значение « <code translate="no">RERANK</code> ».</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Да</p></td>
     <td><p>Словарь, содержащий настройки для функции переранжирования на основе модели. Доступные параметры (ключи) зависят от поставщика услуг.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Должно быть установлено в значение « <code translate="no">"model"</code> » для включения переранжирования на основе модели.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Да</p></td>
     <td><p>Поставщик услуг модели, который будет использоваться для переранжирования.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список строк запроса, используемых моделью переранжирования для расчета оценок релевантности.</p><p>Количество строк запроса должно точно соответствовать количеству запросов в вашей операции поиска (даже при использовании векторов запросов вместо текста), в противном случае будет выведено сообщение об ошибке.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Да</p></td>
     <td><p>URL-адрес службы модели.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Максимальное количество документов для обработки в одной партии. Более высокие значения увеличивают пропускную способность, но требуют большего объема памяти.</p></td>
     <td><p><code translate="no">32</code> (по умолчанию)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Применить к стандартному векторному поиску<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>После определения ранжера на основе модели вы можете применять его во время операций поиска, передавая его в параметр ranker:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
