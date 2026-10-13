---
id: membership-match.md
title: Поиск партнеров среди членов клубаCompatible with Milvus v3.0.2+
summary: >-
  Фильтрация сущностей по большим наборам элементов с использованием компактных
  фильтров Блума или точных «ревущих» битовых карт с учетом синтаксиса, шаблонов
  запросов SDK, семантики удаления и операционных ограничений.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Поиск партнеров среди членов клуба<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Фильтр членства фильтрует сущности, проверяя, принадлежит ли значение скалярного поля набору, предоставленному вызывающим. Клиент создает компактный двоичный блок фильтра членства и передает его в качестве значения шаблона выражения.</p>
<p>Он заменяет большие списки « <code translate="no">IN [...]</code> ». Фильтр « <code translate="no">IN</code> » сериализует каждого элемента в запрос, поэтому достаточно большие наборы элементов могут превысить лимит приема прокси gRPC. С помощью « <code translate="no">membership_match</code> » прокси проверяет блоб и встраивает его в план запроса без построения списка элементов заново.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Рабочий процесс сопоставления членства: клиент создаёт многократно используемый BLOB, прокси проверяет его, а QueryNodes оценивают его.</span>
  
 </span></p>
<p>На диаграмме показано фиксированное распределение обязанностей. Клиент создает BLOB один раз и повторно использует его в разных запросах; прокси проверяет соответствие ограничениям по конверту и размеру и встраивает BLOB в план запроса без изменений; а QueryNodes оценивают план на основе необработанных данных или индекса.</p>
<p>Оператор имеет два вида кодирования с разными гарантиями корректности:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): приблизительная принадлежность. Возможны ложные срабатывания; ложные пропуски не ожидаются при использовании корректного фильтра. Типичное применение: фильтры с большим объемом аудитории или фильтры исключения, где допустимы единичные ложные срабатывания.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): точное членство для целочисленных значений. Типичное применение: списки контроля доступа (ACL), видимость арендаторов, фильтры соответствия требованиям и операции удаления по набору идентификаторов.</li>
</ul>
<p>Не используйте принадлежность <strong>по алгоритму Блума</strong> для принятия решений об авторизации или разрушительного удаления. Ложное срабатывание может привести к раскрытию информации об объекте или удалению объекта, который не входит в предполагаемый набор.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Контрольный список для эксплуатации<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Убедитесь в типе целевого поля и сформируйте BLOB на основе того же домена значений.</li>
<li>Выбирайте алгоритм Блума только в тех случаях, когда допустимы ложные срабатывания.</li>
<li>Выбирайте алгоритм Roaring для операций с ACL, обеспечения соответствия требованиям, изоляции арендаторов и удаления.</li>
<li>Создавайте большие BLOB-объекты один раз и повторно используйте их; не создавайте их заново в каждом запросе.</li>
<li>Рассчитывайте размер BLOB в байтах сериализованных данных, а не по количеству элементов.</li>
<li>В кластере со смешанными версиями завершите постепенное обновление, сначала прокси, прежде чем включать функцию « <code translate="no">membership_match</code> ».</li>
<li>Перед включением разрушающего рабочего процесса протестируйте выражение на непроизводственной коллекции.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Синтаксис выражения<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>Второй аргумент — это заполнитель шаблона. SDK предоставляет значение заполнителя в виде protobuf-объекта <code translate="no">bytes</code>, содержащего BLOB-объект фильтра, сгенерированный клиентом. В выражениях для производственной среды явно указывайте <code translate="no">type</code>, чтобы договор о корректности был виден в коде и журналах.</p>
<p>Аргумент <code translate="no">type</code> является необязательным. Каждый блоб содержит самоописывающий магический заголовок: <code translate="no">MBF1</code> для алгоритма Блума и <code translate="no">MRB1</code> для алгоритма Roaring; сервер анализирует этот заголовок, если <code translate="no">type</code> опущен. Явно указанный <code translate="no">type</code>, вступающий в конфликт с заголовком блоба, отклоняется как ошибка запроса, а неизвестные или усеченные заголовки приводят к состоянию «fail-closed».</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Выбор кодировки<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте фильтр Блума, когда допустимы ложные срабатывания. Фильтр Блума поддерживает поля со знаковыми целыми числами (<strong>INT8/16/32/64</strong>), поля <strong>VARCHAR</strong> и пути <strong>JSON</strong>. Фильтр Блума не является точным списком разрешенных элементов.</p>
<p><code translate="no">fpr</code> (коэффициент ложных срабатываний, false-positive rate) — это вероятность того, что фильтр Блума сообщит о значении как о входящем в набор, хотя это значение никогда не вставлялось: <code translate="no">fpr=0.005</code> означает, что примерно одно значение из 200, не входящее в набор, ошибочно сообщается как присутствующее. Более низкий fpr приводит к увеличению размера блоба.</p>
<p>Используйте <strong>алгоритм Roaring</strong>, когда каждое совпадение должно быть точным. <strong>Алгоритм Roaring</strong> принимает только поля со знаковыми целыми числами; перед сериализацией знаки элементов расширяются до <strong>INT64</strong>, поэтому INT8 -1 и INT64 -1 считаются одним и тем же элементом. Не используйте его для UUID или других строковых полей.</p>
<table>
<thead>
<tr><th>Размерность</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Точность</td><td>Приблизительная; возможны ложные срабатывания; отсутствуют ложные пропуски</td><td>Точные; отсутствуют ложные срабатывания и ложные пропуски</td></tr>
<tr><td>Поля</td><td>INT8/16/32/64, VARCHAR, пути JSON</td><td>Только INT8/16/32/64 со знаком</td></tr>
<tr><td>Размер BLOB</td><td>Количество элементов и FPR; около 11 бит на элемент при FPR 0,005; тело в виде степени числа два</td><td>Распределение значений; плотные множества сжимаются до гораздо меньших размеров; случайные 64-битные значения достигают верхнего предела контейнера в 262 144</td></tr>
<tr><td>Удаление</td><td>Отклоняется на этапе синтаксического анализа</td><td>Разрешено</td></tr>
<tr><td>Типичное использование</td><td>Фильтры аудитории и исключений</td><td>ACL, соответствие требованиям, изоляция арендаторов, удаление по набору идентификаторов</td></tr>
</tbody>
</table>
<p>Пути<strong>JSON</strong> строго типизированы построчно: строка <strong>JSON</strong> проверяется как значение <strong>VARCHAR</strong>, целое число <strong>JSON</strong> — как значение <strong>INT64</strong>, а число типа double <strong>в JSON</strong> никогда не сопоставляется с целочисленным элементом, в отличие от точного выражения « <code translate="no">IN</code> », где 5.0 равно 5. Если ваши модули записи кодируют целые числа с плавающей запятой, нормализуйте их при записи или используйте типизированное скалярное поле.</p>
<p>Для любого из этих видов кодирования создавайте набор элементов из той же области значений, что и целевое поле. Не создавайте фильтр Блума на основе строкового <code translate="no">&quot;10086&quot;</code> и не применяйте его к полю <code translate="no">INT64</code>. Заголовок BLOB фиксирует домены вставленных значений, и BLOB с неверным доменом отклоняется прокси с ошибкой параметра, а не проходит сопоставление без ошибок, не найдя ничего подходящего. Используйте уже созданный BLOB для нескольких запросов, а не создавайте его заново для каждого запроса.</p>
<p>Для наборов, состоящих из нескольких тысяч элементов или меньше, простый <code translate="no">IN</code> остаётся самым простым вариантом. Сервер не выбирает между <strong>IN</strong>, <strong>Bloom</strong> и <strong>Roaring</strong>. Выбор кодировки лежит на вызывающей стороне.</p>
<p>Чтобы выбрать кодировку:</p>
<ol>
<li>Определите, допускает ли рабочая нагрузка ложные срабатывания. Если нет, <strong>Bloom</strong> никогда не является вариантом.</li>
<li>Для точной принадлежности используйте <strong>Roaring</strong> с полем знаковых целых чисел. Плотные или сгруппированные значения сжимаются до самых маленьких блобов.</li>
<li>Проверьте ограничения по размеру. Равномерно случайные 64-битные значения могут превышать ограничение на количество контейнеров (262 144) или ограничения по размеру. В этом случае используйте традиционный список <strong>IN</strong>, который укладывается в ограничения запроса.</li>
<li>Для точного определения принадлежности по нецелочисленным полям используйте <strong>IN</strong>. Для этих полей не существует кодировки точного определения принадлежности.</li>
</ol>
<p>Сопоставление принадлежности недоступно через RESTful HTTP API. Параметры шаблонов выражений HTTP принимают только значения типа bool, number, string и array; для BLOB отсутствует двоичный тип « <code translate="no">bytes</code> ». Для передачи BLOB-объектов принадлежности используйте SDK на основе gRPC.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Шаблоны запросов SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Приведенные ниже фрагменты кода посвящены созданию BLOB-объектов членства и их передаче в качестве параметров шаблонов фильтров. В них предполагается, что коллекции и поля уже существуют и загружены, клиенты SDK подключены, а векторы запросов, списки членов и другие переменные, на которые есть ссылки, определены. Настройка коллекций и полный каркас приложения опущены.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Удаление с помощью Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте точный BLOB <strong>типа Roaring</strong> при удалении сущностей, выбранных по внешнему набору целочисленных идентификаторов. Перед выполнением удаления проверьте набор членов и тип поля коллекции. Не используйте Bloom: приблизительное членство не является безопасным предикатом удаления, и формы Bloom отклоняются в выражениях Delete на этапе синтаксического анализа.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>Семантика удаления следует точному трёхзначному сопоставлению:</p>
<table>
<thead>
<tr><th>Значение поля</th><th>membership_match(…)</th><th>не membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>соответствия нет (NULL)</td><td>не найдено совпадения (NULL)</td></tr>
<tr><td>в множестве элементов</td><td>совпадение</td><td>не совпадает</td></tr>
<tr><td>вне множества</td><td>не найдено</td><td>соответствие</td></tr>
</tbody>
</table>
<p>Таблица читается построчно: операция «Delete» с параметром « <code translate="no">membership_match</code> » удаляет сущности, входящие в набор, операция «Delete» с параметром « <code translate="no">not membership_match</code> » удаляет сущности, не входящие в набор, а сущности с значением NULL сохраняются при обеих полярностях.</p>
<ul>
<li>Элементы со значением поля NULL никогда не удаляются ни при одной из полярностей.</li>
<li>Пустая растровая карта ничего не удаляет. « <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> » удаляет все сущности со значением поля, отличным от NULL — точное дополнение, которое по замыслу может представлять собой большое множество.</li>
<li><code translate="no">not membership_match</code> является точным дополнением к множеству элементов, состоящему из сущностей с не-NULL-значениями полей, а не приближением.</li>
</ul>
<p>Для запечатанных сегментов, загруженных только по индексу, без исходных скалярных данных, при вычислении используется ограниченный обратный поиск, если индекс это поддерживает. Если доступны ни исходные данные полей, ни соответствующий индекс, запрос завершается с ошибкой « <code translate="no">FieldNotLoaded</code> » вместо возврата нефильтрованных сущностей.</p>
<h2 id="Operational-limits" class="common-anchor-header">Операционные ограничения<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Параметр</th><th>По умолчанию</th><th>Настраиваемо</th><th>Что ограничивается</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> прокси</td><td>одно тело BLOB</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 МБ</td><td><code translate="no">milvus.yaml</code> прокси</td><td>агрегат на запрос</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> прокси</td><td>весь запрос</td></tr>
<tr><td>Максимальный размер контейнера</td><td>262 144</td><td>зафиксировано в коде</td><td>на фильтр</td></tr>
<tr><td>Оценка объёма декодированной памяти Roaring</td><td>64 MiB</td><td>фиксировано в коде</td><td>на фильтр</td></tr>
<tr><td>Ограничение формата MBF1</td><td>128 МБ</td><td>зафиксировано в коде</td><td>максимальный размер блока</td></tr>
<tr><td>Блум <code translate="no">fpr</code></td><td>0,005</td><td>построитель клиента</td><td>цель ложных срабатываний</td></tr>
</tbody>
</table>
<p>Настройки « <code translate="no">proxy.*</code> » относятся к конфигурации сервера Milvus: они задаются оператором кластера в файле <code translate="no">milvus.yaml</code> в разделе « <code translate="no">proxy</code> » и не могут быть изменены для отдельного запроса или выражения во время фильтрации. Параметры <strong>Roaring</strong> admissions и ограничение формата MBF1 зафиксированы в реализации и нигде не настраиваются. Строка « <code translate="no">fpr</code> » — единственный элемент управления на стороне клиента: она выбирается при построении BLOB, допустимый диапазон значений составляет от 0,0001 до 0,05.</p>
<p>Максимальный размер тела BLOB допускает около 48,6 миллиона элементов типа INT64 при значении fpr по умолчанию, с фиксированным заголовком оболочки размером 32 байта, добавляемым сверху. Общий бюджет запроса покрывает совокупный сериализованный размер схем, содержащих элементы, плюс совокупный расчетный размер фильтров Roaring после декодирования; этот бюджет совместно используют подзапросы HybridSearch и фильтры оценщиков. Тела BLOOM представляют собой степени числа два: количество элементов, чуть превышающее границу уровня, удваивает размер BLOB, а немного более высокий показатель fpr часто позволяет уместиться в следующий уровень ниже. Когда прокси отклоняет блоб Блума, превышающий допустимый размер, в сообщении об ошибке предлагается альтернативный вариант ( <code translate="no">fpr</code> ), который помещается в пределы.</p>
<ul>
<li>Результаты выражения принадлежности не кэшируются между запросами.</li>
<li>Кластеры со смешанными версиями работают в режиме «закрыто»: QueryNodes, работающие на старом коде, отклоняют планы, содержащие узлы плана принадлежности. Сначала обновите прокси, затем завершите постепенное обновление, прежде чем включить оператор.</li>
<li>В журналах сервера байты блоба замазываются. Текст выражения содержит только имя шаблона; двоичные данные передаются вне полосы в значениях шаблона.</li>
</ul>
