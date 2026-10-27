---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN объединяет алгоритмы IVF, двоичное квантование RaBitQ и
  пакетное сканирование SIMD, обеспечивая векторный поиск с низким потреблением
  памяти и высокой пропускной способностью.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> объединяет в себе разбиение IVF, двоичное квантование RaBitQ и пакетную обработку FastScan. Он хранит однобитовые коды RaBitQ для векторов базы данных и обрабатывает эти коды в блоках по 32 вектора базы данных, оптимизированных для SIMD. Это делает его хорошим выбором для высокопроизводительных рабочих нагрузок с ограниченным объемом памяти, при которых допустимы приближенные результаты.</p>
<p>Выбирайте « <code translate="no">IVF_RABITQ_FASTSCAN</code> » вместо <a href="/docs/ru/ivf-rabitq.md">IVF_RABITQ</a>, если при поиске просматривается большое количество кандидатов и главной целью является пропускная способность. Затраты на настройку FastScan для каждого запроса амортизируются за счёт упакованных блоков кода, поэтому этот алгоритм, как правило, более выгоден для больших наборов данных или длинных списков IVF. Для небольших наборов данных или поисков, в которых проверяется небольшое количество кандидатов, вместо этого используйте <code translate="no">IVF_RABITQ</code>. Он также поддерживает настраиваемую квантование запросов, больше типов уточнения и итераторы.</p>
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> Используются следующие этапы:</p>
<ol>
<li><strong>Разделение на части по методу IVF</strong>: IVF группирует векторы в кластеры « <code translate="no">nlist</code> » и выполняет поиск в ближайших кластерах по методу « <code translate="no">nprobe</code> ».</li>
<li><strong>Кодирование RaBitQ</strong>: остаток каждого вектора кодируется в виде кода RaBitQ с одним битом на каждое измерение.</li>
<li><strong>FastScan</strong>: индекс упаковывает коды для удобной для кэша пакетной обработки с использованием SIMD. Он оценивает 32 вектора из базы данных в каждой партии.</li>
<li><strong>Дополнительное уточнение</strong>: при включении этой функции рефайнер FP32 пересчитывает оценки кандидатов, прежде чем Milvus вернет окончательные результаты.</li>
</ol>
<p>Базовый индекс Faiss находится по адресу <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere обертывает его преобразованием случайного поворота и, при желании, добавляет уточнение FP32.</p>
<p>FastScan выполняет подготовительную работу для каждого запроса, такую как построение и квантование таблиц поиска, связанных с запросом, перед сканированием упакованных блоков кода. Проведите тестирование производительности как <code translate="no">IVF_RABITQ</code>, так и <code translate="no">IVF_RABITQ_FASTSCAN</code> с использованием ваших данных и параметров поиска.</p>
<h2 id="Build-index" class="common-anchor-header">Создание индекса<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы построить индекс <code translate="no">IVF_RABITQ_FASTSCAN</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. В данном примере установите значение <code translate="no">IVF_RABITQ_FASTSCAN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаемые значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробности см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса. Подробности см. в разделе <a href="/docs/ru/ivf-rabitq-fastscan.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>После настройки параметров индекса можно создать индекс, непосредственно воспользовавшись методом ` <code translate="no">create_index()</code> ` или передав параметры индекса в методе ` <code translate="no">create_collection</code> `. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
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
    </button></h2><p>После построения индекса и вставки сущностей можно выполнять поиск по схожести в индексе.</p>
<p>Укажите параметр ` <code translate="no">nprobe</code> `, чтобы контролировать количество кластеров IVF, по которым выполняется поиск. Если индекс был построен с использованием уточнения, используйте метод ` <code translate="no">refine_k</code> ` для управления пулом кандидатов, передаваемым в модуль уточнения FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><code translate="no">params</code>: Дополнительные параметры настройки для поиска по индексу. Подробности см. в разделе <a href="/docs/ru/ivf-rabitq-fastscan.md#Index-specific-search-params">«Параметры поиска, специфичные для индекса</a>».</li>
</ul>
<div class="alert note">
<p>В отличие от параметра « <code translate="no">IVF_RABITQ</code> », параметр « <code translate="no">IVF_RABITQ_FASTSCAN</code> » не поддерживает параметр поиска « <code translate="no">rbq_bits_query</code> ». FastScan всегда использует 8-битное квантование запросов внутренне, поэтому опустите параметр « <code translate="no">rbq_bits_query</code> » или установите его значение равным « <code translate="no">0</code> »; более высокие значения отклоняются.</p>
</div>
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по индексу.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/ivf-rabitq-fastscan.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Количество кластеров, которые будут созданы с помощью алгоритма k-средних при построении индекса. Каждый кластер, представленный центроидом, хранит список векторов. Увеличение значения этого параметра уменьшает количество векторов в каждом кластере, создавая более мелкие и целенаправленные разбиения.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, 65536]<br><strong>Значение по умолчанию</strong>: <code translate="no">128</code></p></td>
     <td><p>Более высокие значения параметра « <code translate="no">nlist</code> » улучшают показатель recall за счет создания более точных кластеров, но увеличивают время построения индекса. Оптимизируйте значение с учётом размера набора данных и доступных ресурсов. В большинстве случаев рекомендуется устанавливать значение в пределах диапазона: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Включает процесс уточнения и сохраняет уточнённые данные. <code translate="no">IVF_RABITQ_FASTSCAN</code> поддерживает уточнение только в формате FP32.</p></td>
     <td><p><strong>Тип</strong>: Boolean<br><strong>Диапазон</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Установите значение <code translate="no">true</code>, если требуется коэффициент восстановления 0,9 или выше. Включение уточнения повышает точность, но увеличивает требования к объему памяти и время построения индекса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Определяет формат представления данных, используемый для уточнения, когда включена опция « <code translate="no">refine</code> ». Требуется только в том случае, если значение параметра « <code translate="no">refine</code> » равно « <code translate="no">true</code> ».</p></td>
     <td><p><strong>Тип</strong>: Строка<br><strong>Диапазон</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Значение по умолчанию</strong>: нет</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> поддерживает только уточнение FP32, и <code translate="no">FLAT</code> идентично <code translate="no">FP32</code>. При сопоставлении значений регистр не учитывается.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/ivf-rabitq-fastscan.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Количество кластеров, в которых будет производиться поиск кандидатов. Более высокие значения позволяют просматривать большее количество кластеров, что повышает коэффициент обнаружения за счет расширения области поиска, но за счет увеличения задержки выполнения запроса.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, <em>nlist</em>]<br><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Увеличение этого значения повышает коэффициент обнаружения, но может замедлить поиск. Установите значение параметра « <code translate="no">nprobe</code> » пропорционально значению параметра « <code translate="no">nlist</code> », чтобы сбалансировать скорость и точность. В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Процесс уточнения использует квантование более высокого качества для выбора необходимого количества ближайших соседей из пула кандидатов, в <code translate="no">refine_k</code> раз большего, чем тот, который был выбран с помощью IVF_RABITQ_FASTSCAN. Не имеет эффекта, если уточнение отключено.</p></td>
     <td><p><strong>Тип</strong>: Float<br><strong>Диапазон</strong>: [1, <em>float_max</em>)<br><strong>Значение по умолчанию</strong>: <code translate="no">1</code></p></td>
     <td><p>Более высокие значения <code translate="no">refine_k</code> снижают QPS, но повышают коэффициент охвата. Начните со значения <code translate="no">1</code> и протестируйте значения <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> и <code translate="no">5</code>, чтобы найти оптимальный компромисс между QPS и коэффициентом охвата для вашего набора данных.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Определяет, применяется ли дополнительная скалярная квантование вектора запроса. <strong>Не поддерживается для <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: индекс всегда использует 8-битное квантование запросов внутренне. Опустите этот параметр или установите его значение равным <code translate="no">0</code>; значения, превышающие <code translate="no">0</code>, отклоняются.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [0, 0]<br><strong>Значение по умолчанию</strong>: <code translate="no">0</code></p></td>
     <td><p>Оставьте не заданным. Для настраиваемого квантования запросов используйте вместо этого <a href="/docs/ru/ivf-rabitq.md">IVF_RABITQ</a>.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Ограничения<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan использует фиксированное 1-битное кодирование базы данных RaBitQ и 8-битное квантование запросов. Параметр « <code translate="no">rbq_bits_query</code> » должен быть опущен или установлен в значение « <code translate="no">0</code> ».</li>
<li>Поддерживается только уточнение FP32 (эквивалентно <code translate="no">FLAT</code>).</li>
<li>Итераторы не поддерживаются.</li>
<li>Это индекс для ЦП. Он не работает на графическом процессоре (GPU).</li>
<li>Фактическая производительность зависит от поддержки SIMD процессором, размерности вектора, параметров <code translate="no">nlist</code> и <code translate="no">nprobe</code>, а также распределения данных. Перед развертыванием в производственной среде проведите тестирование на вашей рабочей нагрузке.</li>
</ul>
<p>Информацию о варианте RaBitQ без FastScan и его дополнительных параметрах уточнения см. в <a href="/docs/ru/ivf-rabitq.md">IVF_RABITQ</a>.</p>
