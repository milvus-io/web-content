---
id: model-ranker-overview.md
title: Обзор Model RankerCompatible with Milvus 2.6.x
summary: >-
  Традиционный векторный поиск ранжирует результаты исключительно по
  математическому сходству - насколько близко векторы совпадают в
  высокоразмерном пространстве. Несмотря на свою эффективность, такой подход
  часто не учитывает истинную семантическую релевантность. Рассмотрим поиск по
  запросу "лучшие практики оптимизации баз данных": вы можете получить документы
  с высокой векторной схожестью, в которых часто упоминаются эти термины, но в
  действительности не предлагаются действенные стратегии оптимизации.
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
    </button></h1><p>Традиционный векторный поиск ранжирует результаты исключительно по математическому сходству - насколько близко векторы совпадают в высокоразмерном пространстве. Несмотря на свою эффективность, такой подход часто не учитывает истинную семантическую релевантность. Подумайте о поиске <strong>"лучших практик оптимизации баз данных":</strong> вы можете получить документы с высокой степенью векторного сходства, в которых часто упоминаются эти термины, но которые на самом деле не содержат действенных стратегий оптимизации.</p>
<p>Model Ranker преобразует поиск Milvus за счет интеграции усовершенствованных языковых моделей, которые понимают семантические связи между запросами и документами. Вместо того чтобы полагаться исключительно на векторное сходство, он оценивает значение контента и контекст, чтобы предоставлять более интеллектуальные и релевантные результаты.</p>
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
<li><p>Ранжирование моделей не может использоваться при поиске по группам.</p></li>
<li><p>Поля, используемые для ранжирования моделей, должны быть текстового типа (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Каждый ранжировщик моделей может одновременно использовать для оценки только одно поле <code translate="no">VARCHAR</code>.</p></li>
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
    </button></h2><p>Ранжировщики моделей интегрируют возможности понимания языковых моделей в процесс поиска Milvus с помощью четко определенного рабочего процесса:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Обзор ранжировщика моделей</span> </span></p>
<ol>
<li><p><strong>Первоначальный запрос</strong>: Ваше приложение отправляет запрос в Milvus.</p></li>
<li><p><strong>Векторный поиск</strong>: Milvus выполняет стандартный векторный поиск для определения документов-кандидатов</p></li>
<li><p><strong>Поиск кандидатов</strong>: Система определяет начальный набор документов-кандидатов на основе векторного сходства</p></li>
<li><p><strong>Оценка модели</strong>: Функция ранжирования моделей обрабатывает пары запрос-документ:</p>
<ul>
<li><p>Отправляет исходный запрос и документы-кандидаты на внешний модельный сервис.</p></li>
<li><p>Языковая модель оценивает семантическую релевантность между запросом и каждым документом</p></li>
<li><p>Каждый документ получает оценку релевантности, основанную на семантическом понимании</p></li>
</ul></li>
<li><p><strong>Интеллектуальное ранжирование</strong>: Документы упорядочиваются на основе сгенерированных моделью оценок релевантности</p></li>
<li><p><strong>Улучшенные результаты</strong>: Ваше приложение получает результаты, ранжированные по семантической релевантности, а не просто по векторному сходству.</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Выберите поставщика моделей для своих нужд<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает следующие поставщики модельных услуг для повторного ранжирования, каждый из которых имеет свои отличительные особенности:</p>
<table>
   <tr>
     <th><p>Провайдер</p></th>
     <th><p>Лучший для</p></th>
     <th><p>Характеристики</p></th>
     <th><p>Пример использования</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Сложные приложения, требующие глубокого семантического понимания и настройки</p></td>
     <td><ul>
<li><p>Поддержка различных больших языковых моделей</p></li>
<li><p>Гибкие возможности развертывания</p></li>
<li><p>Более высокие вычислительные требования</p></li>
<li><p>Больший потенциал кастомизации</p></li>
</ul></td>
     <td><p>Платформа для юридических исследований, развертывающая модели, специфичные для конкретной области, которые понимают юридическую терминологию и связи с прецедентным правом</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Быстрая реализация с эффективным использованием ресурсов</p></td>
     <td><ul>
<li><p>Легкий сервис, оптимизированный для работы с текстом</p></li>
<li><p>Более простое развертывание с меньшими требованиями к ресурсам</p></li>
<li><p>Предварительно оптимизированные модели ранжирования</p></li>
<li><p>Минимальные накладные расходы на инфраструктуру</p></li>
</ul></td>
     <td><p>Система управления контентом, нуждающаяся в эффективных возможностях рерайтинга при стандартных требованиях</p></td>
   </tr>
</table>
<p>Для получения подробной информации о реализации каждой модели сервиса обратитесь к специальной документации:</p>
<ul>
<li><p><a href="/docs/ru/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ru/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
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
    </button></h2><p>Перед внедрением Model Ranker убедитесь, что у вас есть:</p>
<ul>
<li><p>Коллекция Milvus с полем <code translate="no">VARCHAR</code>, содержащим текст для ранжирования.</p></li>
<li><p>Работающий внешний сервис моделей (vLLM или TEI), доступный вашему экземпляру Milvus</p></li>
<li><p>Соответствующее сетевое соединение между Milvus и выбранным вами сервисом моделей.</p></li>
</ul>
<p>Ранжирование моделей легко интегрируется как со стандартным векторным поиском, так и с гибридными поисковыми операциями. Реализация заключается в создании объекта Function, определяющего конфигурацию ранжирования, и передаче его операциям поиска.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Создание ранжировщика моделей</h3><p>Чтобы реализовать ранжирование моделей, сначала определите объект Function с соответствующей конфигурацией:</p>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Требуемый?</p></th>
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
     <td><p>Имя текстового поля, используемого для повторного ранжирования. Должно быть полем типа <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает тип создаваемой функции. Должно быть установлено значение <code translate="no">RERANK</code> для всех ранжировщиков моделей.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Да</p></td>
     <td><p>Словарь, содержащий конфигурацию для функции ранжирования на основе модели. Доступные параметры (ключи) зависят от поставщика (<code translate="no">tei</code> или <code translate="no">vllm</code>). Дополнительные сведения см. в <a href="/docs/ru/v2.6.x/vllm-ranker.md">vLLM Ranker</a> или <a href="/docs/ru/v2.6.x/tei-ranker.md">TEI Ranker</a>.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Должно быть установлено значение <code translate="no">"model"</code>, чтобы включить ранжирование по модели.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Да</p></td>
     <td><p>Поставщик услуг модели, используемый для повторного ранжирования.</p></td>
     <td><p><code translate="no">"tei"</code> или <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список строк запросов, используемых моделью ранжирования для расчета баллов релевантности. Количество строк запросов должно точно соответствовать количеству запросов в вашей поисковой операции (даже при использовании векторов запросов вместо текста), иначе будет выдано сообщение об ошибке.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Да</p></td>
     <td><p>URL-адрес службы модели.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Максимальное количество документов, обрабатываемых в одной партии. Большие значения увеличивают пропускную способность, но требуют больше памяти.</p></td>
     <td><p><code translate="no">32</code> (по умолчанию)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Применить к стандартному векторному поиску</h3><p>После определения ранжирующей модели вы можете применить ее во время поисковых операций, передав параметр ranker:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Применить к гибридному поиску</h3><p>Ранжирование моделей можно также применять в гибридных поисковых операциях, объединяющих несколько векторных полей:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
