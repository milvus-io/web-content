---
id: clustering-compaction.md
title: Кластерное уплотнение
related_key: 'clustering, compaction'
summary: >-
  Функция уплотнения кластеров предназначена для повышения производительности
  поиска и снижения затрат в больших коллекциях. Это руководство поможет вам
  понять, что такое уплотнение кластеров и как эта функция может повысить
  производительность поиска.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Кластерное уплотнение<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Функция уплотнения кластеров предназначена для повышения производительности поиска и снижения затрат в больших коллекциях. Это руководство поможет вам понять, что такое уплотнение кластеров и как эта функция может повысить производительность поиска.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus хранит входящие сущности в сегментах коллекции и уплотняет сегмент, когда он переполнен. Если это происходит, создается новый сегмент для размещения дополнительных сущностей. В результате сущности произвольно распределяются по сегментам. Такое распределение требует от Milvus поиска в нескольких сегментах ближайших соседей для заданного вектора запроса.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Уплотнение без кластеризации</span> </span></p>
<p>Если Milvus может распределить сущности между сегментами на основе значений в определенном поле, область поиска может быть ограничена в пределах одного сегмента, что повышает производительность поиска.</p>
<p><strong>Clustering Compaction</strong> - это функция в Milvus, которая перераспределяет сущности между сегментами в коллекции на основе значений в скалярном поле. Чтобы включить эту функцию, сначала нужно выбрать скалярное поле в качестве <strong>ключа кластеризации</strong>. Это позволит Milvus перераспределять сущности в сегмент, если значения их ключа кластеризации попадают в определенный диапазон. Когда вы запускаете уплотнение кластеризации, Milvus генерирует/обновляет глобальный индекс <strong>PartitionStats</strong>, который записывает отношения сопоставления между сегментами и значениями ключей кластеризации.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>При кластерном уплотнении</span> </span></p>
<p>Используя <strong>PartitionStats</strong> в качестве ссылки, Milvus может отсеивать нерелевантные данные при получении запроса на поиск/запрос, содержащего значение ключа кластеризации, и ограничивать область поиска сегментами, сопоставленными с этим значением, тем самым повышая производительность поиска. Подробнее об улучшении производительности см. в разделе "Бенчмарк-тесты".</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Использование уплотнения кластеров<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Функция Clustering Compaction в Milvus является очень настраиваемой. Вы можете запустить ее вручную или настроить ее автоматическое включение через определенные промежутки времени с помощью Milvus. Чтобы включить уплотнение кластеров, выполните следующие действия:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Глобальная конфигурация</h3><p>Вам необходимо изменить конфигурационный файл Milvus, как показано ниже.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Элемент конфигурации</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Указывает, включать ли уплотнение кластеризации.<br>Установите значение <code translate="no">true</code>, если вам нужно включить эту функцию для каждой коллекции, имеющей ключ кластеризации.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Указывает, следует ли включать автоматически запускаемое уплотнение.<br>Значение <code translate="no">true</code> означает, что Milvus уплотняет коллекции, имеющие ключ кластеризации, через указанные интервалы времени.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Указывает интервал в миллисекундах, через который Milvus начинает уплотнение кластеров.<br>Этот параметр действителен только в том случае, если для <code translate="no">autoEnable</code> установлено значение <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Указывает минимальный интервал в секундах.<br>Этот параметр действителен только в том случае, если для <code translate="no">autoEnable</code> установлено значение <code translate="no">true</code>.<br>Установка целого числа, большего, чем triggerInterval, помогает избежать повторных уплотнений в течение короткого периода.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Указывает максимальный интервал в секундах.<br>Этот параметр действителен только в том случае, если для <code translate="no">autoEnable</code> установлено значение <code translate="no">true</code>.<br>Если Milvus обнаруживает, что коллекция не была уплотнена кластеризацией в течение периода, превышающего это значение, он принудительно выполняет уплотнение кластеризации.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Указывает верхний порог для запуска кластерного уплотнения.<br>Этот параметр действителен только в том случае, если для параметра <code translate="no">autoEnable</code> установлено значение <code translate="no">true</code>.<br>Как только Milvus обнаружит, что объем данных в коллекции превышает это значение, он инициирует процесс кластерного уплотнения.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Указывает длительность таймаута для кластерного уплотнения.<br>Если время выполнения кластерного уплотнения превышает это значение, кластерное уплотнение завершается неудачно.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Элемент конфигурации</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Указывает, обрезает ли Milvus данные, обращаясь к PartitionStats при получении запросов поиска/запроса.<br>Установка этого значения в <code translate="no">true</code> позволяет Milvus отсеивать нерелевантные данные из сегментов во время запроса поиска/запроса.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Элемент конфигурации</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Определяет соотношение буферов памяти для задач уплотнения кластеризации. <br>Milvus удаляет данные, когда размер данных превышает размер выделенного буфера, рассчитанный с помощью этого соотношения.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Указание размера рабочего пула для задачи кластерного уплотнения.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Элемент конфигурации</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Указывает, использовать ли ключ раздела в коллекциях в качестве ключа кластеризации.<br>Значение <code translate="no">true</code> означает, что ключ раздела будет использоваться в качестве ключа кластеризации.<br>Вы всегда можете отменить эту настройку в коллекции, явно задав ключ кластеризации.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Чтобы применить вышеуказанные изменения к кластеру Milvus, выполните действия, описанные в разделах <a href="/docs/ru/v2.4.x/configure-helm.md">Настройка Milvus с помощью Helm</a> и <a href="/docs/ru/v2.4.x/configure_operator.md">Настройка Milvus с помощью Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Конфигурация коллекции</h3><p>Для уплотнения кластера в определенной коллекции необходимо выбрать скалярное поле из коллекции в качестве ключа кластеризации.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>В качестве ключа кластеризации можно использовать скалярные поля следующих типов данных: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code> и <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Запуск уплотнения кластеризации<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы включили автоматическое уплотнение кластеризации, Milvus автоматически запускает уплотнение через указанный интервал времени. В качестве альтернативы вы можете вручную запустить уплотнение следующим образом:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Тест бенчмарка</h3><p>Объем данных и шаблоны запросов в совокупности определяют повышение производительности уплотнения кластеризации. Внутренний эталонный тест демонстрирует, что уплотнение кластеризации дает 25-кратное улучшение количества запросов в секунду (QPS).</p>
<p>Эталонный тест проводился на коллекции, содержащей сущности из 20-миллионного 768-мерного набора данных LAION с ключевым полем, назначенным в качестве ключа кластеризации. После запуска уплотнения кластеризации в коллекции параллельные поиски выполняются до тех пор, пока загрузка процессора не достигнет высокого уровня.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Фильтр поиска</th>
      <th rowspan="2">Коэффициент отсева</th>
      <th colspan="5">Задержка (мс)</th>
      <th rowspan="2">QPS (запросов/с)</th>
    </tr>
    <tr>
      <th>Avg</th>
      <th>Min</th>
      <th>Max</th>
      <th>Медиана</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Нет</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>ключ &gt; 200 и ключ &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>ключ &gt; 200 и ключ &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>ключ &gt; 200 и ключ &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>ключ == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>По мере сужения диапазона поиска в фильтрах поиска коэффициент обрезки увеличивается. Это означает, что в процессе поиска пропускается больше сущностей. Сравнивая статистику в первой и последней строках, можно заметить, что поиск без уплотнения кластеров требует сканирования всей коллекции. С другой стороны, поиск с уплотнением кластеризации по определенному ключу позволяет добиться 25-кратного улучшения.</p>
<h2 id="Best-practices" class="common-anchor-header">Лучшие практики<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Вот несколько советов по эффективному использованию кластерного уплотнения:</p>
<ul>
<li><p>Включите эту функцию для коллекций с большим объемом данных. Производительность поиска повышается при увеличении объема данных в коллекции. Лучше всего включать эту функцию для коллекций, содержащих более 1 миллиона сущностей.</p></li>
<li><p>Выберите подходящий ключ кластеризации. В качестве ключа кластеризации можно использовать скалярные поля, обычно используемые в качестве условий фильтрации. Для коллекции, содержащей данные от нескольких арендаторов, в качестве ключа кластеризации можно использовать поле, которое отличает одного арендатора от другого.</p></li>
<li><p>Использовать ключ раздела в качестве ключа кластеризации. Вы можете установить значение <code translate="no">common.usePartitionKeyAsClusteringKey</code> в true, если хотите включить эту функцию для всех коллекций в вашем экземпляре Milvus или если вы все еще сталкиваетесь с проблемами производительности в большой коллекции с ключом раздела. При этом у вас будет ключ кластеризации и ключ раздела, когда вы выбираете скалярное поле в коллекции в качестве ключа раздела.</p>
<p>Обратите внимание, что эта настройка не мешает выбрать другое скалярное поле в качестве ключа кластеризации. Явно указанный ключ кластеризации всегда имеет приоритет.</p></li>
</ul>
