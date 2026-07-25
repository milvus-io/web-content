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
    </button></h1><p>Когда покупатель ищет «черные кроссовки для ежедневных тренировок», поиск по методу ближайшего соседа (ANN) ранжирует товары по сходству векторов и возвращает плоский список Top-K. Результаты могут быть релевантными, но повторяющимися: в приведенном ниже примере четыре из первых шести результатов — товары Nike, а Adidas и Puma появляются по одному разу.</p>
<p>Простой список не может напрямую обеспечить разнообразие на уровне брендов или предоставить статистические данные. Приложению может потребоваться до двух репрезентативных товаров от каждого бренда, количество найденных товаров по каждому бренду или средняя цена по каждому бренду.</p>
<p>Агрегация результатов поиска группирует найденные объекты в корзины на основе выбранного скалярного поля. В данном примере каждый бренд становится отдельной корзиной. Затем Milvus может рассчитывать статистику независимо для каждой корзины и возвращать репрезентативные продукты из каждой корзины, что делает результаты поиска более удобными для сравнения и более разнообразными.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Результат поиска по кроссовкам превращается в набор сопоставимых групп по брендам</span>
  
 </span></p>
<p>Агрегация поиска обобщает найденные кандидаты, а не каждую сущность в коллекции. Поэтому количество элементов в группах и метрики являются приблизительными и остаются привязанными к векторной релевантности.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="Three-stage Search Aggregation workflow from ANN retrieval to bucket results" class="doc-image" id="three-stage-search-aggregation-workflow-from-ann-retrieval-to-bucket-results" /> 
   <span>Трехэтапный рабочий процесс агрегации результатов поиска — от извлечения с помощью ANN до результатов по группам</span>
  
 </span></p>
<ol>
<li><p><strong>Извлечение кандидатов.</strong> Milvus запускает поиск с использованием нейронной сети (ANN), чтобы сформировать пул объектов, наиболее близких к вектору запроса. Агрегация результатов поиска работает с этим пулом, а не с каждым объектом в коллекции, поэтому именно пул определяет, какие объекты могут войти в корзины.</p></li>
<li><p><strong>Формирование корзин.</strong> Параметр « <code translate="no">SearchAggregation.fields</code> » определяет скалярные поля, составляющие ключ каждой корзины. На рисунке параметр « <code translate="no">brand</code> » распределяет шесть кандидатов по корзинам «Nike», «Adidas» и «Puma». При указании нескольких полей объекты попадают в одну корзину только в том случае, если их комбинации полей и значений совпадают.</p></li>
<li><p><strong>Вычисление и возврат результатов.</strong> Milvus вычисляет настроенные метрики для каждого сегмента, упорядочивает готовые сегменты и использует <code translate="no">TopHits</code> для выбора репрезентативных объектов. Каждый сегмент в <code translate="no">result.agg_buckets</code> содержит свой ключ, количество, метрики, совпадения и дополнительные дочерние сегменты.</p></li>
</ol>
<p>С помощью функции « <code translate="no">sub_aggregation</code> » Milvus повторяет шаги 2 и 3 внутри каждого родительского бакета. Поскольку каждый этап работает с пулом извлечения ANN, изменения в коэффициенте полноты поиска могут повлиять на количество бакетов, метрики, порядок, количество совпадений и вложенные результаты.</p>
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
<li><p><strong>Вложенные агрегации:</strong> запрос может содержать одну корневую агрегацию типа « <code translate="no">SearchAggregation</code> » и до трёх вложенных уровней типа « <code translate="no">sub_aggregation</code> », то есть в общей сложности не более четырёх уровней.</p></li>
<li><p><strong>Поля, используемые для создания ключей корзины:</strong> агрегация поиска ( <code translate="no">SearchAggregation.fields</code> ) не поддерживает поля <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, векторные поля (vector), поля <code translate="no">JSON</code> или динамические поля.</p></li>
<li><p><strong>Поля метрик и сортировки:</strong> « <code translate="no">metrics</code> » и « <code translate="no">TopHits.sort</code> » не поддерживают « <code translate="no">JSON</code> » или динамические поля.</p></li>
<li><p><strong>Повторяющиеся поля:</strong> одно и то же поле не может фигурировать более чем в одном списке <code translate="no">SearchAggregation.fields</code>. Например, если корневая агрегация использует <code translate="no">fields=[&quot;category&quot;]</code>, вложенная агрегация <code translate="no">sub_aggregation</code> не может одновременно использовать <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Неподдерживаемые комбинации:</strong> агрегация поиска не может сочетаться с « <code translate="no">offset</code> », итераторами поиска, гибридным поиском, инструментом выделения, « <code translate="no">group_by_field</code> » или « <code translate="no">group_by_fields</code> ».</p></li>
<li><p><strong>Возвращаемые записи:</strong> максимальное количество записей в результатах должно быть не более 10 000. Рассчитайте это максимальное значение следующим образом:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Используйте « <code translate="no">1</code> » в качестве последнего множителя, если ни на одном уровне не настроена функция « <code translate="no">TopHits</code> ». Например, один вектор запроса, 10 корневых сегментов, пять дочерних сегментов на каждый корневой сегмент и два совпадения на каждый дочерний сегмент дают настроенное максимальное значение:</p>
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
    </button></h2><p>Выберите пример, соответствующий тому, что вы хотите настроить:</p>
<table>
<thead>
<tr><th>Цель</th><th>Ключевые настройки</th><th>Пример</th></tr>
</thead>
<tbody>
<tr><td>Создание ключей корзины</td><td><code translate="no">fields</code>, <code translate="no">size</code></td><td><a href="#build-bucket-keys">Создание ключей корзин</a></td></tr>
<tr><td>Рассчитать статистику и упорядочить корзины</td><td><code translate="no">metrics</code>, <code translate="no">order</code></td><td><a href="#calculate-metrics-and-order-buckets">Рассчитать метрики и упорядочить корзины</a></td></tr>
<tr><td>Возврат и сортировка репрезентативных запросов</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td><td><a href="#return-and-sort-representative-hits">Возврат и сортировка репрезентативных результатов</a></td></tr>
<tr><td>Создание иерархических результатов</td><td><code translate="no">sub_aggregation</code></td><td><a href="#create-nested-buckets">Создание вложенных групп</a></td></tr>
</tbody>
</table>
<p>В приведенных ниже примерах используется коллекция товаров с полями «бренд», «категория», «цвет», «цена» и «рейтинг». Разверните следующий раздел, чтобы создать коллекцию и определить общие переменные поиска.</p>
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
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Puma Velocity Nitro&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Puma&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Windrunner Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Own The Run Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Vomero 17&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike InfinityRN 4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.flush(collection_name)
client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>В приведенной выше настройке для векторного индекса и параметров поиска задано значение « <code translate="no">COSINE</code> ». Поэтому в последующих примерах используется значение « <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> », чтобы результаты с более высоким косинусным сходством отображались первыми. Для метрики расстояния, такой как « <code translate="no">L2</code> », используйте значение « <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> ».</p>
<h3 id="Build-bucket-keys" class="common-anchor-header">Создание ключей корзин<button data-href="#Build-bucket-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Начните с создания объекта <code translate="no">SearchAggregation</code>. Приведенная ниже конфигурация создает по одному бакету для каждого уникального значения <code translate="no">brand</code> и выбирает до трех бакетов для возврата:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span>
    size=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Чаще всего используются следующие параметры:</p>
<table>
<thead>
<tr><th>Параметр</th><th>Значение в данном примере</th><th>Назначение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td><code translate="no">[&quot;brand&quot;]</code></td><td>Непустой список скалярных полей, образующих ключ корзины. Одно поле создает однокомпонентный ключ.</td></tr>
<tr><td><code translate="no">size</code></td><td><code translate="no">3</code></td><td>Максимальное количество корзин, возвращаемых на данном уровне агрегации.</td></tr>
</tbody>
</table>
<p>Передайте объект в параметр « <code translate="no">search_aggregation</code> » команды « <code translate="no">MilvusClient.search()</code> »:</p>
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
<p><details></p>
<p><summary>Просмотр примера вывода корзины</summary></p>
<p>Следующий вывод был получен из вышеуказанного запроса и сериализован в формат JSON для удобства чтения. PyMilvus возвращает объекты ` <code translate="no">AggregationBucket</code> `, а не JSON.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Puma&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Для вектора с одним запросом, рассматриваемого в данном руководстве, считывайте возвращаемые корзины верхнего уровня из ` <code translate="no">result.agg_buckets[0]</code>`. Каждая корзина предоставляет доступ к своим ` <code translate="no">key</code>`, сущности пула извлечения ` <code translate="no">count</code>`, вычисленным значениям ` <code translate="no">metrics</code>`, представителю ` <code translate="no">hits</code>` и вложенным корзинам в ` <code translate="no">sub_groups</code>`.</p>
<p>В следующих разделах даны переопределения параметра <code translate="no">aggregation</code> для других сценариев использования. Передайте обновленный объект в тот же параметр <code translate="no">search_aggregation</code> и повторно выполните вызов поиска.</p>
<p>Milvus игнорирует <code translate="no">limit</code>, если задан параметр <code translate="no">search_aggregation</code>. Используйте корневое значение <code translate="no">SearchAggregation.size</code> для управления количеством корневых корзин.</p>
<p>Чтобы создать составной ключ корзины, передайте несколько имен полей в одном списке:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Такая конфигурация может генерировать ключи, такие как <code translate="no">(Nike, black)</code>, <code translate="no">(Nike, blue)</code> и <code translate="no">(Adidas, white)</code>. Две сущности относятся к одному и тому же сегменту только в том случае, если оба значения совпадают. Milvus сохраняет порядок в списке, поэтому <code translate="no">brand</code> является первым компонентом ключа, а <code translate="no">color</code> — вторым. Передавайте несколько строк в одном плоском списке; вложенные списки не поддерживаются.</p>
<p><code translate="no">size=6</code> — это максимальное количество составных корзин, возвращаемых на данном уровне агрегации. Пример данных содержит пять различных комбинаций бренда и цвета, поэтому могут быть возвращены все пять. В рамках <a href="#limits">ограничения на количество возвращаемых записей</a> этот запрос вносит <code translate="no">1 query vector × 6 buckets × 1 = 6</code> настроенных записей результатов.</p>
<h3 id="Calculate-metrics-and-order-buckets" class="common-anchor-header">Расчет метрик и упорядочивание корзин<button data-href="#Calculate-metrics-and-order-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Добавьте параметры ` <code translate="no">metrics</code> ` и ` <code translate="no">order</code> `, если вам нужна статистика по корзинам и детерминированный порядок корзин:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
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
<p><strong>Определите метрики корзин.</strong></p>
<p>Каждая запись <code translate="no">SearchAggregation.metrics</code> сопоставляет пользовательский псевдоним с <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Псевдоним</th><th>Операция</th><th>Источник</th><th>Результат</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">product_count</code></td><td><code translate="no">count</code></td><td><code translate="no">&quot;*&quot;</code></td><td>Подсчитывает количество всех объектов пула извлечения, назначенных данному баку.</td></tr>
<tr><td><code translate="no">avg_price</code></td><td><code translate="no">avg</code></td><td><code translate="no">price</code></td><td>Вычисляет среднее значение непустых значений <code translate="no">price</code>.</td></tr>
<tr><td><code translate="no">min_price</code></td><td><code translate="no">min</code></td><td><code translate="no">price</code></td><td>Возвращает наименьшее значение <code translate="no">price</code>, отличное от null.</td></tr>
</tbody>
</table>
<p>Агрегация поиска поддерживает следующие операции с метриками:</p>
<ul>
<li><code translate="no">count</code> принимает специальный источник <code translate="no">&quot;*&quot;</code> для подсчёта всех сущностей в корзине или имя поля для подсчёта сущностей, значение поля которых не равно <code translate="no">NULL</code>. Например, если корзина содержит 10 сущностей и у двух из них значение <code translate="no">price</code> установлено в <code translate="no">NULL</code>, то метрика <code translate="no">count</code> с источником <code translate="no">&quot;*&quot;</code> возвращает 10, а метрика с источником <code translate="no">&quot;price&quot;</code> — 8.</li>
<li><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code> и <code translate="no">max</code> принимают поддерживаемое числовое поле или встроенный источник <code translate="no">_score</code>, который представляет степень сходства или расстояние по ANN. Эти операции игнорируют значения <code translate="no">NULL</code>.</li>
</ul>
<p>Чтобы упорядочить корзины по значению, полученному из <code translate="no">_score</code>, определите псевдоним метрики на основе <code translate="no">_score</code>, а затем используйте этот псевдоним в <code translate="no">order</code>. <code translate="no">_score</code> не является прямым ключом для упорядочивания корзин. Например, поскольку в данном руководстве используется <code translate="no">COSINE</code>, определите <code translate="no">&quot;max_score&quot;: {&quot;max&quot;: &quot;_score&quot;}</code> в <code translate="no">metrics</code>, а затем используйте <code translate="no">{&quot;max_score&quot;: &quot;desc&quot;}</code> в <code translate="no">order</code>. Это позволит разместить в начале корзины, в которых сущность с наилучшим совпадением имеет более высокий показатель сходства.</p>
<p><strong>Порядок корзин.</strong></p>
<p><code translate="no">SearchAggregation.order</code> Управляет порядком возвращаемых корзин. Каждая запись сопоставляет ключ сортировки значению <code translate="no">&quot;asc&quot;</code> или <code translate="no">&quot;desc&quot;</code>. Milvus оценивает несколько записей от первой до последней.</p>
<p>Ключ сортировки может быть:</p>
<ul>
<li>псевдонимом метрики, определённым в <code translate="no">metrics</code> на том же уровне агрегации, например <code translate="no">avg_price</code>;</li>
<li>встроенный ключ <code translate="no">_count</code>, представляющий количество объектов пула извлечения в корзине; или</li>
<li>встроенный ключ <code translate="no">_key</code>, который представляет ключ корзины, а не поле коллекции с именем <code translate="no">_key</code>.</li>
</ul>
<p>Если вы не укажете <code translate="no">order</code>, Milvus сохранит порядок обнаружения корзин из пула извлечения. Установите <code translate="no">order</code>, если корзины должны следовать за метрикой, счётчиком или ключом.</p>
<p>В этом примере:</p>
<table>
<thead>
<tr><th>Запись</th><th>Результат</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">{&quot;avg_price&quot;: &quot;desc&quot;}</code></td><td>Упорядочивает бакеты от наибольшего к наименьшему значению <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">{&quot;_key&quot;: &quot;asc&quot;}</code></td><td>При равенстве значений сортирует корзины по возрастающему порядку ключей. При использовании параметра ` <code translate="no">fields=[&quot;brand&quot;]</code>` корзины с одинаковыми ценами сортируются в лексическом порядке: ` <code translate="no">Adidas</code>`, ` <code translate="no">Nike</code>`, затем ` <code translate="no">Puma</code>`. Корзины с разными значениями ` <code translate="no">avg_price</code> ` не затрагиваются. При использовании параметра ` <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code>` Milvus сначала сравнивает ` <code translate="no">brand</code> `, а ` <code translate="no">color</code> ` сравнивает только в том случае, если значения `brand` равны.</td></tr>
</tbody>
</table>
<h3 id="Return-and-sort-representative-hits" class="common-anchor-header">Возврат и сортировка репрезентативных результатов<button data-href="#Return-and-sort-representative-hits" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">TopHits</code> для возврата и сортировки репрезентативных сущностей из каждого выбранного сегмента:</p>
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
<p><summary>Просмотр сегмента с репрезентативными результатами</summary></p>
<p>Следующий сегмент Nike был извлечен из приведенного выше запроса и сериализован в формате JSON для удобства чтения.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997663497924805</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997047781944275</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span><span class="hljs-punctuation">,</span>
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
<tr><td><code translate="no">top_hits</code></td><td>Необязательный. Настраивает репрезентативные сущности для данного уровня агрегации. Если этот параметр опущен, Milvus все равно возвращает ключ сегмента, количество, метрики и дочерние сегменты, но массив ` <code translate="no">bucket.hits</code> ` будет пустым.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Возвращает до двух репрезентативных сущностей из каждого выбранного бакета.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Упорядочивает сущности внутри каждого бакета с использованием перечисленных критериев.</td></tr>
</tbody>
</table>
<p>Устанавливайте параметр « <code translate="no">top_hits</code> » только в том случае, если приложению требуются репрезентативные сущности из каждого корзины.</p>
<p><code translate="no">SearchAggregation.order</code> sorts сортирует корзины, а <code translate="no">TopHits.sort</code> — сущности внутри каждой корзины. Параметр « <code translate="no">TopHits.sort</code> » принимает имена поддерживаемых скалярных полей и встроенное поле « <code translate="no">_score</code> », которое представляет сходство или расстояние ANN. Milvus оценивает записи « <code translate="no">sort</code> » от первой до последней. В данном примере продукты сортируются по <code translate="no">rating</code> от наибольшего к наименьшему значению, а <code translate="no">_score</code> используется только в случае равенства двух оценок. Поскольку в настройках используется <code translate="no">COSINE</code>, убывающий порядок <code translate="no">_score</code> помещает более схожий продукт на первое место.</p>
<p>Поля, используемые в <code translate="no">TopHits.sort</code>, не обязательно должны присутствовать в <code translate="no">output_fields</code>. Однако в сопоставление <code translate="no">fields</code> каждого возвращаемого результата включаются только поля из <code translate="no">output_fields</code>.</p>
<p>Каждый возвращаемый результат из <code translate="no">AggregationHit</code> предоставляет свой первичный ключ в <code translate="no">pk</code>, векторный балл в <code translate="no">score</code> и запрашиваемые поля вывода в <code translate="no">fields</code>.</p>
<h3 id="Create-nested-buckets" class="common-anchor-header">Создание вложенных корзин<button data-href="#Create-nested-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">sub_aggregation</code> для запуска другой агрегации внутри каждого родительского бакета. Дочерняя агрегация получает только сущности, назначенные её родительскому бакету. В следующей конфигурации сначала производится группировка продуктов по категориям, а затем — группировка продуктов в каждой категории по брендам:</p>
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
<p><summary>Просмотр результатов вложенного контейнера</summary></p>
<p>В приведенном ниже сериализованном фрагменте показан родительский бакет « <code translate="no">running_shoes</code> » и его дочерний бакет «Adidas». Дочерние бакеты «Nike» и «Puma» опущены для краткости.</p>
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
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
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
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.999454140663147</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span><span class="hljs-punctuation">,</span>
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
<p>Milvus сначала выбирает до двух корзин категорий, упорядоченных по <code translate="no">product_count</code>. Затем он независимо запускает операцию « <code translate="no">sub_aggregation</code> » внутри каждой выбранной категории и возвращает до трёх корзин брендов, упорядоченных по <code translate="no">avg_rating</code>.</p>
<p>В приведённом выше выводе:</p>
<ul>
<li>корневой блок « <code translate="no">running_shoes</code> » содержит четыре сущности из пула извлечения. Его « <code translate="no">metrics</code> » содержат значения « <code translate="no">avg_price</code> » и « <code translate="no">product_count</code> » корневого уровня.</li>
<li>Список <code translate="no">sub_groups</code> корневого контейнера содержит дочерние контейнеры брендов. Отображаемый контейнер Adidas содержит один объект и собственные значения <code translate="no">avg_rating</code> и <code translate="no">brand_count</code>.</li>
<li>Список <code translate="no">hits</code> корневого контейнера пуст, поскольку в корневой агрегации не настроено значение <code translate="no">top_hits</code>. Дочерний контейнер Adidas содержит репрезентативный хит, поскольку значение <code translate="no">top_hits</code> настроено в <code translate="no">sub_aggregation</code>.</li>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Насколько точны подсчёты количества корзин и метрики?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Агрегация поиска обобщает пул результатов ANN. Она не выполняет агрегацию по всей коллекции.</p>
<p>Например, предположим, что коллекция содержит 5 000 товаров Nike, но пул результатов поиска для одного запроса содержит 35 товаров Nike. Метрика « <code translate="no">product_count</code> » в корзине Nike описывает эти 35 найденных товаров. Она не сообщает о 5 000.</p>
<p>Приблизительность имеет наибольшее значение, когда агрегация поиска ( <code translate="no">order</code> ) использует псевдоним метрики. Изменения в полноте поиска (search recall) могут изменить значения метрик и, следовательно, повлиять на то, какие корзины попадают в диапазон «повторяемость» ( <code translate="no">SearchAggregation.size</code>). Вложенная агрегация может усилить этот эффект, поскольку каждый дочерний уровень работает с сущностями, доступными в своей родительской корзине.</p>
<p>Если вам нужна точная статистика по каждому соответствующему объекту, используйте рабочий процесс агрегации точных запросов вместо агрегации поиска.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Чем агрегация по поиску отличается от группированного поиска?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <a href="/docs/ru/grouping-search.md">групповой поиск</a>, если ваша цель — повысить разнообразие результатов и контролировать количество сущностей, возвращаемых каждой группой.</p>
<p>Используйте «Агрегацию поиска» (Search Aggregation), если вам нужны структурированные результаты по корзинам, такие как составные ключи, метрики по корзинам, упорядочение корзин, независимо отсортированные репрезентативные совпадения или вложенные корзины. «Агрегация поиска» использует отдельный API и возвращает результаты через <code translate="no">result.agg_buckets</code>.</p>
<p>Не следует объединять <code translate="no">search_aggregation</code> с <code translate="no">group_by_field</code> или <code translate="no">group_by_fields</code> в одном запросе.</p>
