---
id: search-aggregation.md
title: Агрегация результатов поискаCompatible with Milvus 3.0.x
summary: >-
  Сгруппировать результаты векторного поиска по корзинам, вычислить показатели
  по каждой корзине, отсортировать корзины и вернуть репрезентативные
  результаты.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Агрегация результатов поиска<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Когда покупатель ищет «черные кроссовки для ежедневных тренировок», поиск по методу ближайшего соседа (ANN) ранжирует товары по сходству векторов и возвращает плоский список Top-K. Результаты могут быть релевантными, но повторяющимися: в приведенном ниже примере четыре из первых шести результатов — товары бренда A, а бренды B и C появляются по одному разу.</p>
<p>Простой список не позволяет напрямую сформировать сводку, ориентированную на сегменты. Приложению может потребоваться сравнить бренды по количеству отобранных кандидатов или средней цене, проанализировать небольшое количество репрезентативных товаров от каждого бренда или сгруппировать результаты по нескольким уровням сегментов.</p>
<p>Агрегация результатов поиска группирует отобранные кандидаты ANN в сегменты на основе выбранных скалярных полей. В данном примере каждый бренд становится отдельным сегментом. Milvus может рассчитывать статистику для каждого сегмента, упорядочивать сегменты и привязывать к ним репрезентативные продукты. Приложение получает этот ответ, ориентированный на сегменты, через интерфейс « <code translate="no">result.agg_buckets</code> ».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Плоский набор результатов поиска кроссовок превращается в набор сопоставимых групп по брендам</span>
  
 </span></p>
<p>Агрегация результатов поиска не выполняет точную агрегацию по всей коллекции. Наличие корзин, количество элементов, метрики, порядок и репрезентативные результаты зависят от кандидатов, отобранных на этапах ANN и группировки.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Кандидаты ANN, сгруппированные по ключам сегментов и возвращаемые с подсчётами, метриками и репрезентативными результатами</span>
  
 </span></p>
<ol>
<li><p><strong>Извлечение кандидатов.</strong> Milvus запускает поиск с помощью ANN, чтобы найти сущности, наиболее близкие к вектору запроса. Затем на этапе группировки сохраняется ограниченное количество кандидатов для каждого полного составного ключа. Этот лимит кандидатов на ключ равен наибольшему значению <code translate="no">TopHits.size</code> в любом месте дерева агрегации или <code translate="no">1</code>, если ни на одном уровне не задано значение <code translate="no">top_hits</code>.</p></li>
<li><p><strong>Построение корзин.</strong> <code translate="no">SearchAggregation.fields</code> определяет ключ корзины. Каждая уникальная комбинация значений полей создаёт отдельный ключ. На рисунке <code translate="no">fields=[&quot;brand&quot;]</code> создаёт ключи корзин <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> и <code translate="no">(Brand C)</code>. Сохраненные кандидаты с одинаковым ключом относятся к одной корзине и вносят вклад в её <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> ограничивает количество корзин, возвращаемых Milvus.</p></li>
<li><p><strong>Вычисление и возвращение результатов.</strong> Каждый возвращаемый бакет содержит свой ключ и количество сохраненных кандидатов. Milvus также может вычислять настроенные метрики, упорядочивать бакеты, возвращать репрезентативные сущности и создавать дочерние бакеты. Каждый <code translate="no">AggregationBucket</code> в <code translate="no">result.agg_buckets</code> предоставляет <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> и <code translate="no">sub_groups</code>. Когда включена агрегация поиска, обычный список результатов поиска пуст.</p></li>
</ol>
<p>На диаграмме <code translate="no">TopHits.size=4</code> предоставляет бюджет кандидатов в размере четырех на каждый ключ, поэтому четыре сохраненных кандидата бренда A формируют <code translate="no">count: 4</code>. На готовой карте бренда A показаны только два из четырех возвращенных репрезентативных результатов, чтобы рисунок оставался компактным.</p>
<p>При использовании « <code translate="no">sub_aggregation</code> » Milvus повторяет шаги 2 и 3 внутри каждого родительского сегмента. Изменения в коэффициенте воспроизведения ANN или бюджете кандидатов на ключ могут повлиять на количество сегментов, метрики, порядок, результаты поиска и вложенные результаты.</p>
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
    </button></h2><p>Перед использованием агрегации поиска обратите внимание на следующие ограничения:</p>
<ul>
<li><p><strong>Вложенные агрегации:</strong> запрос может содержать одну корневую агрегацию « <code translate="no">SearchAggregation</code> » и до трёх вложенных уровней « <code translate="no">sub_aggregation</code> », что в сумме даёт не более четырёх уровней. На всех уровнях для создания ключей корзин можно использовать не более 10 полей.</p></li>
<li><p><strong>Поля, используемые для создания ключей корзины:</strong> « <code translate="no">SearchAggregation.fields</code> » поддерживает поля типа «Boolean», «integer», « <code translate="no">VARCHAR</code> » и « <code translate="no">TIMESTAMPTZ</code> ». Не поддерживаются поля типа « <code translate="no">FLOAT</code> », « <code translate="no">DOUBLE</code> », « <code translate="no">ARRAY</code> », « <code translate="no">JSON</code> », « <code translate="no">GEOMETRY</code> », « <code translate="no">TEXT</code> », а также векторные и динамические поля.</p></li>
<li><p><strong>Поля метрики:</strong> <code translate="no">count</code> принимает <code translate="no">&quot;*&quot;</code> или любое не-<code translate="no">JSON</code>, нединамическое поле и пропускает значения <code translate="no">NULL</code>, если указано поле. <code translate="no">sum</code> и <code translate="no">avg</code> принимают целочисленные и поля с плавающей запятой. <code translate="no">min</code> и <code translate="no">max</code> дополнительно принимают строковые и <code translate="no">TIMESTAMPTZ</code> поля.</p></li>
<li><p><strong>Поля сортировки Top Hits:</strong> <code translate="no">TopHits.sort</code> допускает сопоставимые поля типа «Boolean», «integer», «floating-point», «string» и « <code translate="no">TIMESTAMPTZ</code> », а также « <code translate="no">_score</code> ». Не поддерживаются поля типа « <code translate="no">ARRAY</code> », « <code translate="no">JSON</code> », « <code translate="no">GEOMETRY</code> », векторные или динамические поля.</p></li>
<li><p><strong>Бюджет кандидатов:</strong> наибольшее значение <code translate="no">TopHits.size</code> в любом месте дерева агрегации также является количеством кандидатов, сохраняемых на каждый полный составной ключ. Если ни на одном уровне не настроено <code translate="no">top_hits</code>, Milvus сохраняет одного кандидата на каждый ключ. Размер корзины <code translate="no">count</code> и метрики рассчитываются на основе этих сохраненных кандидатов, поэтому изменение <code translate="no">TopHits.size</code> может повлиять на них.</p></li>
<li><p><strong>Поля корзины, допускающие значение null:</strong> значение <code translate="no">NULL</code> формирует собственный ключ корзины. Чтобы исключить корзину с нулевыми значениями, добавьте в запрос на поиск фильтр, например <code translate="no">brand is not null</code>.</p></li>
<li><p><strong>Повторяющиеся поля:</strong> одно и то же поле не может фигурировать более чем в одном списке <code translate="no">SearchAggregation.fields</code>. Например, если корневая агрегация использует <code translate="no">fields=[&quot;category&quot;]</code>, вложенная агрегация <code translate="no">sub_aggregation</code> не может одновременно использовать <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Неподдерживаемые комбинации:</strong> агрегация поиска не может сочетаться с ненулевым значением параметра « <code translate="no">offset</code> », итераторами поиска, гибридным поиском, выделением результатов или групповым поиском. Значение параметра « <code translate="no">offset</code> » верхнего уровня, равное « <code translate="no">0</code> », эквивалентно пропуску этого параметра. В запросах поиска REST v2 параметры « <code translate="no">searchAggregation</code> » и « <code translate="no">ids</code> » не могут указываться одновременно.</p></li>
<li><p><strong>Возвращаемые записи:</strong> по умолчанию Milvus отклоняет запрос на агрегацию результатов поиска, если рассчитанное максимальное количество записей в результатах превышает 10 000. Этот порог регулируется параметром <code translate="no">proxy.maxSearchAggregationResultEntries</code>. Чтобы отключить эту проверку, установите значение конфигурации равным <code translate="no">0</code> или отрицательному числу.</p>
<p>Milvus рассчитывает это максимальное количество следующим образом:</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Для этого вычисления на стороне сервера эффективным значением параметра « <code translate="no">search_size</code> » на уровне является явно настроенное значение « <code translate="no">search_size</code> » или значение « <code translate="no">size</code> » для данного уровня, если параметр « <code translate="no">search_size</code> » опущен. API PyMilvus, используемое в данном руководстве, в настоящее время не предоставляет доступ к параметру « <code translate="no">search_size</code> », поэтому запросы PyMilvus используют значение « <code translate="no">size</code> » каждого уровня для этого вычисления. Используйте <code translate="no">1</code> для последнего множителя, если ни на одном уровне не настроено <code translate="no">TopHits</code>. Например, один вектор запроса, 10 корневых корзин, пять дочерних корзин на каждую корневую корзину и два совпадения на каждую дочернюю корзину дают расчётный максимум:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Используйте агрегацию поиска<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите пример в зависимости от того, что вы хотите достичь:</p>
<table>
<thead>
<tr><th>Перейдите в</th><th>Описание</th><th>Ключевые настройки</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Сравнение и сортировка корзин</a></td><td>Рассчитайте статистику по каждому сегменту для их сравнения, а затем отсортируйте полученные сегменты по метрикам, количествам или ключам.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Показать репрезентативные результаты из каждого сегмента</a></td><td>Верните ограниченное количество объектов из каждого сегмента и отсортируйте эти объекты независимо друг от друга по скалярным полям или векторной оценке.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Группировка результатов на нескольких уровнях</a></td><td>Сгруппируйте результаты по уровням родительских и дочерних корзин для последовательного анализа нескольких измерений.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>В приведенных ниже примерах используется коллекция товаров с полями «бренд», «категория», «цвет», «цена» и «рейтинг». Все названия брендов, названия товаров, цены, рейтинги и результаты поиска являются синтетическими примерами данных. Разверните следующий раздел, чтобы создать коллекцию и определить общие переменные поиска.</p>
<p><details></p>
<p><summary>Настройка примерной коллекции</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Приведенная выше настройка конфигурирует <code translate="no">COSINE</code> как для векторного индекса, так и для параметров поиска. Поэтому в последующих примерах используется <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code>, чтобы сначала отображать результаты с более высоким косинусным сходством. Для метрики расстояния, такой как <code translate="no">L2</code>, используйте <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Сравнение и сортировка корзин<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте этот шаблон, когда вам нужно сравнить группы найденных объектов с помощью вычисленных статистических показателей и контролировать порядок, в котором возвращаются корзины. В этом примере Milvus группирует найденные продукты по <code translate="no">brand</code>, вычисляет показатели цены для каждой корзины по брендам и сортирует корзины по средней цене.</p>
<p>Если ваша цель заключается лишь в повышении разнообразия результатов за счёт возврата одного или нескольких объектов на каждое значение поля, используйте вместо этого <a href="/docs/ru/grouping-search.md">групповой поиск</a>.</p>
<p>Следующая конфигурация создаёт до трёх групп по брендам, вычисляет показатели для каждой группы и сортирует группы по средней цене:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Передайте объект в параметр <code translate="no">search_aggregation</code> метода <code translate="no">MilvusClient.search()</code>:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Когда установлен параметр ` <code translate="no">search_aggregation</code> `, PyMilvus не возвращает обычные совпадения сущностей в ` <code translate="no">result[0]</code>`. Вместо этого считывайте ответ по сегментам из ` <code translate="no">result.agg_buckets[0]</code> `. Параметр ` <code translate="no">output_fields</code> ` контролирует, какие скалярные поля появляются в каждом возвращаемом отображении ` <code translate="no">AggregationHit.fields</code> `; Milvus по-прежнему может использовать поля источника метрик и сортировки, которые не перечислены в ` <code translate="no">output_fields</code>`.</p>
<p><details></p>
<p><summary>Просмотр примера вывода данных из бакета</summary></p>
<p>Следующий вывод был получен из вышеуказанного запроса и сериализован в формат JSON для удобства чтения. PyMilvus возвращает объекты <code translate="no">AggregationBucket</code>, а не JSON. Значение <code translate="no">key</code> всегда представляет собой упорядоченный список компонентов ключа, даже если <code translate="no">fields</code> содержит только одно поле. Это позволяет сохранить порядок полей для составных ключей.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Для вектора с одним запросом, приведённого в данном руководстве, прочитайте возвращаемые корзины верхнего уровня из <code translate="no">result.agg_buckets[0]</code>. Каждая корзина предоставляет свои упорядоченные компоненты ключа, сохраненные кандидаты <code translate="no">count</code>, вычисленные значения <code translate="no">metrics</code>, репрезентативные значения <code translate="no">hits</code> и вложенные корзины в <code translate="no">sub_groups</code>.</p>
<p>Прочитайте конфигурацию следующим образом:</p>
<table>
<thead>
<tr><th>Параметр</th><th>Что контролирует</th><th>В данном примере</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Как Milvus создает ключи корзин</td><td>Создает один бакет для каждого уникального значения <code translate="no">brand</code>.</td></tr>
<tr><td><code translate="no">size</code></td><td>Максимальное количество возвращаемых корзин</td><td>Возвращает до трёх корзин по брендам.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Статистика, рассчитанная для каждого бакета</td><td>Рассчитывает количество товаров, среднюю цену и минимальную цену.</td></tr>
<tr><td><code translate="no">order</code></td><td>Как Milvus сортирует возвращаемые сегменты</td><td>Сортировка производится по средней цене, а при равенстве значений используется ключ сегмента для определения порядка.</td></tr>
</tbody>
</table>
<p>Milvus игнорирует параметр « <code translate="no">limit</code> », если установлен параметр « <code translate="no">search_aggregation</code> ». Используйте значение корневого параметра « <code translate="no">SearchAggregation.size</code> » для управления количеством сегментов верхнего уровня.</p>
<p>При таких настройках Milvus возвращает сегменты «Brand B», «Brand A» и «Brand C» в порядке убывания значения <code translate="no">avg_price</code>. Критерий « <code translate="no">_key</code> » применяется только в том случае, если корзины имеют одинаковую среднюю цену. Поскольку в данной конфигурации не задан параметр « <code translate="no">top_hits</code> », список « <code translate="no">hits</code> » для каждой корзины пуст, а бюджет кандидата для каждого ключа равен « <code translate="no">1</code> ». Поэтому отображаемые значения количества и метрики описывают одного сохраненного кандидата на каждый бренд. Настройте параметр « <code translate="no">top_hits</code> » с более крупным значением « <code translate="no">TopHits.size</code> », если для агрегации требуется более широкое окно метрики для каждого ключа.</p>
<p><details></p>
<p><summary>Метрики и правила сортировки</summary></p>
<p>Каждая запись в файле <code translate="no">SearchAggregation.metrics</code> сопоставляет пользовательский псевдоним с <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Источник</th><th>Поддерживаемые операции</th><th>Поведение</th></tr>
</thead>
<tbody>
<tr><td>Любое поле, не являющееся полем<code translate="no">JSON</code> и не являющееся динамическим полем</td><td><code translate="no">count</code></td><td>Подсчитывает сохраненные кандидаты, исходное поле которых не является полем типа <code translate="no">NULL</code>.</td></tr>
<tr><td>Поле целого или с плавающей запятой</td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Вычисляется по непустым сохраненным значениям.</td></tr>
<tr><td>Поле типа «строка» или « <code translate="no">TIMESTAMPTZ</code> »</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>выбирает минимальное или максимальное непустое сохраненное значение.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Подсчитывает количество всех сохраненных кандидатов в корзине. Результат соответствует <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Агрегирует значения сходства или расстояния по ANN для сохраненных кандидатов.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Принимает следующие ключи:</p>
<table>
<thead>
<tr><th>Ключ «Order»</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td>Псевдоним метрики</td><td>Сортировка по значению, вычисленному в <code translate="no">metrics</code> на том же уровне агрегации, например <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Сортировка по количеству сохраненных кандидатов в каждом сегменте.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Сортировка по ключу корзины, а не по полю коллекции с именем « <code translate="no">_key</code> ».</td></tr>
</tbody>
</table>
<p>Каждая запись в « <code translate="no">order</code> » сопоставляет ключ значению « <code translate="no">&quot;asc&quot;</code> » или « <code translate="no">&quot;desc&quot;</code> ». Milvus оценивает несколько записей от первой до последней. Если опустить « <code translate="no">order</code> », Milvus сохраняет порядок обнаружения корзин из набора сохраненных кандидатов.</p>
<p>Чтобы отсортировать корзины по качеству совпадения векторов, сначала вычислите метрику на уровне корзины из <code translate="no">_score</code>, а затем используйте псевдоним метрики в <code translate="no">order</code>. Нельзя использовать <code translate="no">_score</code> напрямую в качестве ключа для упорядочивания корзин, поскольку каждая корзина может содержать несколько оценок сущностей. Например, при использовании <code translate="no">COSINE</code> или <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Используя <code translate="no">L2</code>, вычислите минимальное значение <code translate="no">_score</code> и отсортируйте псевдоним метрики по возрастанию, чтобы корзины с наименьшим расстоянием располагались первыми.</p>
<p></details></p>
<p><details></p>
<p><summary>Создание составных ключей сегментов</summary></p>
<p>Чтобы создать составной ключ корзины, передайте несколько имен полей в одном списке:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Такая конфигурация может генерировать ключи, такие как <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code> и <code translate="no">(Brand B, white)</code>. Две сущности находятся в одном сегменте только в том случае, если оба значения совпадают. Milvus сохраняет порядок списка, поэтому <code translate="no">brand</code> является первым компонентом ключа, а <code translate="no">color</code> — вторым. Когда <code translate="no">_key</code> используется в <code translate="no">order</code>, Milvus сравнивает компоненты составного ключа в том же порядке. Передавайте несколько строк в одном плоском списке; вложенные списки не поддерживаются.</p>
<p><code translate="no">size=6</code> — это максимальное количество составных корзин, возвращаемых на данном уровне агрегации. Пример данных содержит пять различных комбинаций бренда и цвета, поэтому могут быть возвращены все пять. В <a href="#Limits">пределе возвращаемых записей</a> этот запрос вносит <code translate="no">1 query vector × 6 buckets × 1 = 6</code> настроенных записей результатов.</p>
<p>Наличие нескольких полей в одном списке <code translate="no">SearchAggregation.fields</code> создает составной ключ сегмента на данном уровне агрегации. Для создания иерархии сегментов «родитель-потомок» используйте <a href="#Group-results-at-multiple-levels">вложенную агрегацию</a>.</p>
<p></details></p>
<p>В приведенных ниже примерах переопределяется <code translate="no">aggregation</code>. Передайте обновленный объект в тот же параметр <code translate="no">search_aggregation</code> и повторно выполните вызов поиска.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Показать репрезентативные результаты из каждого сегмента<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Включите репрезентативные сущности, если приложению необходимо отобразить реальные продукты из каждого сегмента. В этом примере Milvus возвращает до двух продуктов из каждого сегмента по бренду, отсортированных по рейтингу, а затем по векторному баллу.</p>
<p>Настройте параметр ` <code translate="no">TopHits</code> ` следующим образом:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Просмотр корзины с репрезентативными результатами</summary></p>
<p>Следующий сегмент «Бренд A» был извлечен из приведенного выше запроса и сериализован в формате JSON для удобства чтения.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Параметр</th><th>Назначение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Необязательный. Настраивает репрезентативные сущности для данного уровня агрегации. Если параметр опущен, поле « <code translate="no">bucket.hits</code> » остается пустым, а бюджет кандидатов на ключ по умолчанию равен единице.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Возвращает до двух репрезентативных объектов из каждого выбранного сегмента и устанавливает бюджет кандидатов на ключ равным двум для всего дерева агрегации.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Упорядочивает сущности внутри каждого сегмента с использованием перечисленных критериев.</td></tr>
</tbody>
</table>
<p>Настройте параметр « <code translate="no">top_hits</code> », если приложению требуются репрезентативные сущности или если для подсчётов и метрик необходимо более широкое окно кандидатов на ключ. Увеличение значения параметра « <code translate="no">TopHits.size</code> » повышает как бюджет кандидатов, так и максимальное количество возвращаемых записей при вычислении в <a href="#Limits">разделе «Limits</a>».</p>
<p><code translate="no">SearchAggregation.order</code> сортирует корзины, в то время как « <code translate="no">TopHits.sort</code> » сортирует сохраненные сущности внутри каждой корзины. Порядок сортировки не влияет на то, какие кандидаты были сохранены для « <code translate="no">count</code> » и метрик. « <code translate="no">TopHits.sort</code> » принимает имена поддерживаемых сравниваемых скалярных полей и встроенное поле « <code translate="no">_score</code> », которое представляет сходство или расстояние по ANN. Milvus оценивает записи « <code translate="no">sort</code> » от первой до последней. В данном примере продукты сортируются по <code translate="no">rating</code> от наибольшего к наименьшему значению, а <code translate="no">_score</code> используется только в случае равенства двух оценок. Поскольку в настройках используется <code translate="no">COSINE</code>, убывающая сортировка по <code translate="no">_score</code> помещает более похожий продукт на первое место.</p>
<p>Поля, используемые в <code translate="no">metrics</code> или <code translate="no">TopHits.sort</code>, не обязательно должны фигурировать в <code translate="no">output_fields</code>. Milvus извлекает эти поля внутренне, но в отображение <code translate="no">fields</code> каждого возвращаемого результата включаются только поля, явно перечисленные в <code translate="no">output_fields</code>. Первичные ключи и векторные оценки остаются доступными через <code translate="no">AggregationHit.pk</code> и <code translate="no">AggregationHit.score</code>.</p>
<p>Каждый возвращаемый результат <code translate="no">AggregationHit</code> предоставляет свой первичный ключ в <code translate="no">pk</code>, векторный балл в <code translate="no">score</code> и запрашиваемые выходные поля в <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Группировка результатов на нескольких уровнях<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте вложенную агрегацию, когда вам нужен один уровень корзин внутри другого. В этом примере Milvus сначала создает корзины категорий, а затем создает корзины брендов внутри каждой категории.</p>
<p>Дочерняя агрегация получает только сущности, назначенные её родительскому сегменту. Параметр <code translate="no">fields</code> управляет ключом сегмента на каждом уровне агрегации, а параметр <code translate="no">sub_aggregation</code> формирует иерархию «родитель-дочерний».</p>
<p>Приведенная ниже конфигурация создает корзину категории с ключом <code translate="no">(running_shoes)</code>. Внутри этой родительской корзины дочерняя агрегация создает отдельные корзины брендов с такими ключами, как <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> и <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>На каждом уровне можно независимо использовать несколько полей. Например, использование <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> в дочерней агрегации приведет к созданию составных дочерних ключей, таких как <code translate="no">(Brand A, black)</code>.</p>
<p>Следующая конфигурация реализует эту иерархию:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Просмотр результата вложенного контейнера</summary></p>
<p>В приведённом ниже сериализованном отрывке показан родительский бакет <code translate="no">running_shoes</code> и его дочерний бакет «Brand B». Дочерние бакеты «Brand A» и «Brand C» опущены для краткости.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Отображаемый результат представляет путь к корзине <code translate="no">(running_shoes) → (Brand B)</code>, а не отдельный составной ключ корзины <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Сначала Milvus выбирает до двух корзин категорий, упорядоченных по <code translate="no">product_count</code>. Затем он независимо запускает запрос <code translate="no">sub_aggregation</code> в каждой выбранной категории и возвращает до трёх корзин брендов, упорядоченных по <code translate="no">avg_rating</code>.</p>
<p>В приведённом выше выводе:</p>
<ul>
<li>корневой блок « <code translate="no">running_shoes</code> » содержит четыре отобранных кандидата по своим дочерним составным ключам. Его « <code translate="no">metrics</code> » содержат значения « <code translate="no">avg_price</code> » и « <code translate="no">product_count</code> » корневого уровня.</li>
<li>Список <code translate="no">sub_groups</code> корневого сегмента содержит дочерние сегменты брендов. Отображаемый сегмент бренда B содержит один сохраненный кандидат и собственные значения <code translate="no">avg_rating</code> и <code translate="no">brand_count</code>.</li>
<li>Список <code translate="no">hits</code> корневого корзины пуст, поскольку для корневой агрегации не настроено значение <code translate="no">top_hits</code>. Дочерний корзина бренда B содержит репрезентативное совпадение, поскольку значение <code translate="no">top_hits</code> настроено в <code translate="no">sub_aggregation</code>.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Часто задаваемые вопросы<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Насколько точны подсчёты и метрики корзин?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Агрегация поиска суммирует сохраненные кандидаты ANN. Она не выполняет агрегацию по всей коллекции.</p>
<p>Сохранение кандидатов проходит два этапа аппроксимации. Поиск ANN может пропустить релевантные объекты коллекции, а на этапе группировки сохраняется не более <code translate="no">TopHits.size</code> кандидатов для каждого полного составного ключа. Если ни на одном уровне не настроено <code translate="no">top_hits</code>, это ограничение на ключ составляет один.</p>
<p>Например, предположим, что коллекция содержит 5 000 продуктов бренда A, и многие из них релевантны векторному запросу. Если при агрегации используется параметр ` <code translate="no">TopHits(size=4)</code>`, корзина бренда A может сохранить не более четырёх кандидатов для полного составного ключа. Параметры ` <code translate="no">count</code> ` и метрики описывают именно эти сохраненные кандидаты, а не все релевантные продукты бренда A и не все 5 000 объектов коллекции.</p>
<p>Приближенность имеет наибольшее значение, когда в агрегации « <code translate="no">order</code> » используется псевдоним метрики. Изменения в полноте поиска могут изменить значения метрик и, следовательно, повлиять на то, какие корзины попадают в « <code translate="no">SearchAggregation.size</code> ». Вложенная агрегация может усилить этот эффект, поскольку каждый дочерний уровень работает с сущностями, доступными в своей родительской корзине.</p>
<p>Если вам нужны точные статистические данные по каждому соответствующему объекту, используйте рабочий процесс агрегации точных запросов вместо агрегации поиска.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Чем агрегация поиска отличается от группированного поиска?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Выбор следует делать исходя из основной формы результатов приложения:</p>
<table>
<thead>
<tr><th>Основная потребность</th><th>Рекомендуется</th><th>Результат для использования</th></tr>
</thead>
<tbody>
<tr><td>Возвращает стандартный ранжированный список сущностей с меньшим количеством повторяющихся значений в поле группировки</td><td><a href="/docs/ru/grouping-search.md">Групповой поиск</a></td><td>Результаты плоского поиска для каждого вектора запроса</td></tr>
<tr><td>Просмотр или сравнение групп в виде корзин с ключами, подсчётами, метриками, упорядочением, репрезентативными результатами или дочерними корзинами</td><td>Агрегация результатов поиска</td><td><code translate="no">AggregationBucket</code> объекты в <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Даже если в настройках агрегации результатов поиска задано « <code translate="no">top_hits</code> », основным ответом по-прежнему остаётся дерево корзин. Групповой поиск по-прежнему полезен, когда приложение уже обрабатывает обычные результаты поиска и в первую очередь нуждается в разнообразии результатов.</p>
<p>Эти API являются взаимоисключающими. PyMilvus генерирует исключение « <code translate="no">ParamError</code> », если в одном запросе сочетаются « <code translate="no">search_aggregation</code> » с « <code translate="no">group_by_field</code> » или « <code translate="no">group_by_fields</code> ».</p>
