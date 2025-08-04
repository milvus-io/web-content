---
id: scann.md
title: SCANN
summary: >-
  Созданный на основе библиотеки ScaNN от Google, индекс SCANN в Milvus
  предназначен для решения масштабных задач поиска по векторному сходству,
  обеспечивая баланс между скоростью и точностью даже на больших массивах
  данных, которые традиционно представляют сложность для большинства поисковых
  алгоритмов.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Созданный на основе библиотеки <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> от Google, индекс <code translate="no">SCANN</code> в Milvus предназначен для решения задач поиска векторного сходства, обеспечивая баланс между скоростью и точностью, даже на больших наборах данных, которые традиционно представляют трудности для большинства поисковых алгоритмов.</p>
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
    </button></h2><p>ScaNN создан для решения одной из самых сложных задач векторного поиска: эффективного нахождения наиболее релевантных векторов в высокоразмерных пространствах даже при увеличении объема и сложности массивов данных. Его архитектура разбивает процесс векторного поиска на отдельные этапы:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Scann</span> </span></p>
<ol>
<li><p><strong>Разбиение на разделы</strong>: Разбивает набор данных на кластеры. Этот метод сужает пространство поиска, фокусируясь только на релевантных подмножествах данных вместо сканирования всего набора данных, что экономит время и вычислительные ресурсы. ScaNN часто использует алгоритмы кластеризации, такие как <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, для определения кластеров, что позволяет более эффективно выполнять поиск по сходству.</p></li>
<li><p><strong>Квантование</strong>: После разбиения ScaNN применяет процесс квантования, известный как <a href="https://arxiv.org/abs/1908.10396">анизотропное векторное квантование</a>. Традиционное квантование направлено на минимизацию общего расстояния между исходным и сжатым векторами, что не является идеальным для таких задач, как <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">поиск по максимальному внутреннему продукту (MIPS)</a>, где сходство определяется внутренним произведением векторов, а не прямым расстоянием. Вместо этого при анизотропном квантовании приоритет отдается сохранению параллельных компонент между векторами, или частей, наиболее важных для вычисления точного внутреннего произведения. Такой подход позволяет ScaNN поддерживать высокую точность MIPS за счет тщательного выравнивания сжатых векторов с запросом, что обеспечивает более быстрый и точный поиск сходства.</p></li>
<li><p><strong>Повторное ранжирование</strong>: Этап повторного ранжирования - это заключительный этап, на котором ScaNN точно настраивает результаты поиска, полученные на этапах разбиения и квантования. При повторном ранжировании к лучшим векторам-кандидатам применяются точные вычисления внутреннего произведения, что обеспечивает высокую точность конечных результатов. Повторное ранжирование крайне важно для высокоскоростных рекомендательных систем или приложений поиска изображений, где первоначальная фильтрация и кластеризация служат грубым слоем, а заключительный этап обеспечивает возврат пользователю только наиболее релевантных результатов.</p></li>
</ol>
<p>Производительность <code translate="no">SCANN</code> регулируется двумя ключевыми параметрами, которые позволяют точно настроить баланс между скоростью и точностью:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Контролирует, хранятся ли исходные векторные данные наряду с квантованными представлениями. Включение этого параметра повышает точность при повторном ранжировании, но увеличивает требования к хранению.</p></li>
<li><p><code translate="no">reorder_k</code>: Определяет, сколько кандидатов будет уточнено на этапе окончательного переранжирования. Более высокие значения повышают точность, но увеличивают задержку поиска.</p></li>
</ul>
<p>Подробное руководство по оптимизации этих параметров для конкретного случая использования см. в разделе <a href="/docs/ru/scann.md#Index-params">Параметры индекса</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Построение индекса<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы построить индекс <code translate="no">SCANN</code> по векторному полю в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Хранить ли исходные векторные данные вместе с квантованным представлением.</li>
</ul>
<p>Чтобы узнать больше о параметрах построения, доступных для индекса <code translate="no">SCANN</code>, обратитесь к разделу <a href="/docs/ru/scann.md#Index-building-params">Параметры построения индекса</a>.</p></li>
</ul>
<p>После того как параметры индекса настроены, вы можете создать индекс, используя метод <code translate="no">create_index()</code> напрямую или передавая параметры индекса в метод <code translate="no">create_collection</code>. Подробности см. в разделе <a href="/docs/ru/create-collection.md">Создание коллекции</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Поиск по индексу<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как индекс создан и сущности вставлены, можно выполнять поиск по сходству в индексе.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу.</p>
<ul>
<li><code translate="no">reorder_k</code>: Количество кандидатов для уточнения на этапе повторного ранжирования.</li>
</ul>
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">SCANN</code>, обратитесь к разделу <a href="/docs/ru/scann.md#Index-specific-search-params">Параметры поиска по индексу</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Параметры индекса<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по нему.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/scann.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Хранить ли исходные векторные данные вместе с квантованным представлением. Если этот параметр включен, это позволяет производить более точные расчеты сходства на этапе повторного ранжирования, используя исходные векторы вместо квантованных приближений.</p></td>
     <td><p><strong>Тип</strong>: Boolean <strong>Диапазон</strong>: <code translate="no">true</code>, <code translate="no">false</code></p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">true</code></p></td>
     <td><p>Установите значение <code translate="no">true</code> для <strong>более высокой точности поиска</strong> и когда место в памяти не является первостепенной задачей. Исходные векторные данные обеспечивают более точные расчеты сходства при повторном ранжировании. Установите значение <code translate="no">false</code>, чтобы <strong>уменьшить накладные расходы на хранение</strong> и использование памяти, особенно для больших наборов данных. Однако это может привести к некоторому снижению точности поиска, поскольку на этапе повторного ранжирования будут использоваться квантованные векторы.</p>
<p><strong>Рекомендуется</strong>: Использовать <code translate="no">true</code> для производственных приложений, где точность очень важна.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/scann.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Управляет количеством векторов-кандидатов, которые уточняются на этапе повторного ранжирования. Этот параметр определяет, сколько лучших кандидатов из начальных этапов разбиения и квантования будут повторно оценены с использованием более точных расчетов сходства.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, <em>int_max</em>].</p>
<p><strong>Значение по умолчанию</strong>: Нет</p></td>
     <td><p>Большее значение <code translate="no">reorder_k</code> обычно приводит к <strong>повышению точности поиска</strong>, поскольку на этапе окончательного уточнения рассматривается больше кандидатов. Однако это также <strong>увеличивает время поиска</strong> из-за дополнительных вычислений. Рассматривайте возможность увеличения <code translate="no">reorder_k</code>, когда достижение высокого отзыва является критически важным, а скорость поиска не так важна. Хорошей отправной точкой является 2-5-кратное увеличение желаемого <code translate="no">limit</code> (количество возвращаемых результатов TopK).</p>
<p>Рассмотрите возможность уменьшения <code translate="no">reorder_k</code>, чтобы отдать предпочтение более быстрому поиску, особенно в сценариях, где небольшое снижение точности допустимо.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне:<em>[limit</em>, <em>limit</em> * 5].</p></td>
   </tr>
</table>
