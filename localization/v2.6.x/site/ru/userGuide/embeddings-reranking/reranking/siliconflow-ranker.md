---
id: siliconflow-ranker.md
title: Ранжировщик SiliconFlowCompatible with Milvus 2.6.x
summary: >-
  SiliconFlow Ranker использует комплексные модели рерайтинга SiliconFlow для
  повышения релевантности поиска путем семантического рерайтинга. Он
  обеспечивает гибкие возможности разбиения документов на части и поддерживает
  широкий спектр специализированных моделей ранжирования от различных
  поставщиков.
beta: Milvus 2.6.x
---
<h1 id="SiliconFlow-Ranker" class="common-anchor-header">Ранжировщик SiliconFlow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFlow-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>SiliconFlow Ranker использует комплексные модели ранжирования <a href="https://www.siliconflow.com/">SiliconFlow</a> для повышения релевантности поиска путем семантического ранжирования. Он обеспечивает гибкие возможности разбиения документов на куски и поддерживает широкий спектр специализированных моделей ранжирования от различных поставщиков.</p>
<p>SiliconFlow Ranker особенно ценен для приложений, требующих:</p>
<ul>
<li><p>Расширенное измельчение документов с настраиваемым перекрытием для работы с длинными документами</p></li>
<li><p>Доступ к различным моделям ранжирования, включая серию BAAI/bge-reranker и другие специализированные модели</p></li>
<li><p>Гибкая оценка на основе фрагментов, когда фрагмент с наивысшей оценкой представляет оценку документа</p></li>
<li><p>Экономичный рерайтинг с поддержкой стандартных и профессиональных моделей.</p></li>
</ul>
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
    </button></h2><p>Перед внедрением SiliconFlow Ranker в Milvus убедитесь, что у вас есть:</p>
<ul>
<li><p>Коллекция Milvus с полем <code translate="no">VARCHAR</code>, содержащим текст для повторного ранжирования.</p></li>
<li><p>Действительный API-ключ SiliconFlow с доступом к моделям ранжирования. Зарегистрируйтесь на <a href="https://www.siliconflow.com/">платформе SiliconFlow</a>, чтобы получить учетные данные API. Вы можете либо:</p>
<ul>
<li><p>Задать переменную окружения <code translate="no">SILICONFLOW_API_KEY</code>, либо</p></li>
<li><p>Указать ключ API непосредственно в конфигурации ранжировщика.</p></li>
</ul></li>
</ul>
<h2 id="Create-a-SiliconFlow-ranker-function" class="common-anchor-header">Создание функции ранжирования SiliconFlow<button data-href="#Create-a-SiliconFlow-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать ранжировщик SiliconFlow в вашем приложении Milvus, создайте объект Function, который определяет, как должен работать ранжировщик. Эта функция будет передаваться в поисковые операции Milvus для улучшения ранжирования результатов.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure SiliconFlow Ranker</span>
siliconflow_ranker = Function(
    name=<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>,     <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,          <span class="hljs-comment"># Specifies SiliconFlow as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>, <span class="hljs-comment"># SiliconFlow reranking model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>: <span class="hljs-number">5</span>,            <span class="hljs-comment"># Optional: max chunks per document for supported models</span>
        <span class="hljs-string">&quot;overlap_tokens&quot;</span>: <span class="hljs-number">50</span>,               <span class="hljs-comment"># Optional: token overlap between chunks for supported models</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-siliconflow-api-key&quot; # Optional: if not set, uses SILICONFLOW_API_KEY env var</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SiliconFlow-ranker-specific-parameters" class="common-anchor-header">Специфические параметры ранжировщика SiliconFlow<button data-href="#SiliconFlow-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующие параметры специфичны для ранжировщика SiliconFlow:</p>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Требуемый?</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
     <th><p><strong>Значение / Пример</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Должно быть установлено значение <code translate="no">"model"</code>, чтобы включить повторное ранжирование моделей.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Да</p></td>
     <td><p>Поставщик услуг модели, который будет использоваться для повторного ранжирования.</p></td>
     <td><p><code translate="no">"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Модель реранкинга SiliconFlow для использования из поддерживаемых моделей на платформе SiliconFlow. Список доступных моделей реранкинга см. в <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">документации SiliconFlow</a>.</p></td>
     <td><p><code translate="no">"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список строк запросов, используемых моделью ранжирования для расчета баллов релевантности. Количество строк запросов должно точно соответствовать количеству запросов в вашей поисковой операции (даже при использовании векторов запросов вместо текста), иначе будет выдано сообщение об ошибке.</p></td>
     <td><p><em>["поисковый запрос"].</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Поскольку сервисы моделей могут обрабатывать не все данные сразу, здесь задается размер пакета для обращения к сервису моделей при нескольких запросах.</p></td>
     <td><p><code translate="no">128</code> (по умолчанию)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_chunks_per_doc</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Максимальное количество чанков, генерируемых внутри документа. Длинные документы делятся на несколько фрагментов для расчета, и наибольший балл среди фрагментов принимается за балл документа. Поддерживается только в определенных моделях: <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code>, и <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">5</code>, <code translate="no">10</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">overlap_tokens</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Количество перекрытий лексем между соседними фрагментами при разбивке документов на фрагменты. Это обеспечивает непрерывность по границам чанков для лучшего семантического понимания. Поддерживается только определенными моделями: <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code>, и <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">50</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Учетные данные для аутентификации при доступе к сервисам SiliconFlow API. Если он не указан, система будет искать переменную окружения <code translate="no">SILICONFLOW_API_KEY</code>.</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>
<p><strong>Поддержка функций, специфичных для конкретной модели</strong>: Параметры <code translate="no">max_chunks_per_doc</code> и <code translate="no">overlap_tokens</code> поддерживаются только определенными моделями. При использовании других моделей эти параметры будут игнорироваться.</p>
<div class="alert note">
<p>Общие параметры, общие для всех ранжировщиков моделей (например, <code translate="no">provider</code>, <code translate="no">queries</code>), см. в разделе <a href="/docs/ru/model-ranker-overview.md#Create-a-model-ranker">Создание ранжировщика моделей</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Применение к стандартному векторному поиску<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы применить ранжировщик SiliconFlow к стандартному векторному поиску:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with SiliconFlow reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                  <span class="hljs-comment"># Apply SiliconFlow reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">Применить к гибридному поиску<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>SiliconFlow Ranker также можно использовать с гибридным поиском для комбинирования плотных и разреженных методов поиска:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with SiliconFlow reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                 <span class="hljs-comment"># Apply SiliconFlow reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
