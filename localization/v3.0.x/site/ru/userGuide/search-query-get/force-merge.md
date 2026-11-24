---
id: force-merge.md
title: Принудительная уплотнение слияниемCompatible with Milvus 3.0.x
summary: >-
  Используйте уплотнение с принудительным слиянием для объединения небольших
  сегментов и повышения производительности запросов и эффективности хранения
  данных.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Принудительная уплотнение слиянием<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Функция принудительного слияния предназначена для объединения мелких и фрагментированных сегментов в меньшее количество более крупных с целью повышения производительности запросов и эффективности хранения данных. В данном руководстве объясняется, как использовать уплотнение с принудительным слиянием.</p>
<div class="alert note">
<p>Эта функция находится в стадии открытой предварительной версии. Не используйте её в производственных средах.</p>
</div>
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
    </button></h2><p><code translate="no">maxSize</code> Стандартная <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">уплотнение</a> поддерживает размер сегментов на уровне, близком к настроенному значению параметра « <code translate="no">maxSize</code> » (Максимальный размер сегмента), посредством слияний «многие к одному», но при этом могут оставаться фрагменты среднего размера, которые невозможно слить дальше без превышения ограничений. Например, как показано ниже, если коллекция содержит пять сегментов по 2 МБ, а параметр « » (Максимальный размер сегмента) установлен на 3 МБ, объединение любых двух сегментов приведет к превышению этого предела, поэтому стандартная уплотнение не сможет дальше уменьшить количество сегментов, и фрагментированная структура останется.</p>
<p>Опция «Force merge» добавляет параметр « <code translate="no">target_size</code> » и, по возможности, поддерживает реорганизацию сегментов до желаемого размера с соблюдением жестких допусков. Как показано ниже, если указанный параметр ` <code translate="no">target_size</code> ` равен 4 МБ, пять небольших сегментов по 2 МБ можно дополнительно объединить в меньшее количество более крупных сегментов. Это сокращает избыточное количество сегментов, позволяет использовать целевые значения, превышающие настройки по умолчанию ` <code translate="no">maxSize</code> `, а также, когда целевое значение очень велико, позволяет системе выбрать практичный выходной размер и количество сегментов с учётом текущего оборудования и топологии QueryNode.</p>
<p>Чтобы понять, какой метод уплотнения следует использовать, см. раздел «Часто задаваемые <a href="#faq">вопросы</a>» ( <a href="#faq">FAQ)</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>Уплотнение с принудительным слиянием расширяет существующий <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API, добавляя параметр ` <code translate="no">target_size</code> `. Он полностью обратно совместим: существующие вызовы уплотнения без параметра ` <code translate="no">target_size</code> ` продолжают работать как и раньше.</p>
<p>Принудительное слияние работает асинхронно. Оно не блокирует операции поиска или запросов, хотя во время выполнения потребляет ресурсы ввода-вывода и памяти.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Использование принудительной слиятельной уплотнения<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Требования<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus версии 3.0 или более поздней</p></li>
<li><p>PyMilvus 3.0 или более поздней версии</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Глобальная конфигурация<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующие параметры конфигурации управляют поведением функции «Force Merge». Укажите их в файле конфигурации Milvus или с помощью переменных среды.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Значение по умолчанию</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>Максимальный размер сегмента по умолчанию в МБ. Используется в качестве целевого значения, когда параметр ` <code translate="no">target_size</code> ` равен 0 или опущен. Также служит минимально допустимым значением для явного параметра ` <code translate="no">target_size</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Пороговое значение количества сегментов для выбора алгоритма. Когда количество сегментов превышает это значение, Milvus использует более быстрый алгоритм жадного слияния для планирования слияния.</p><ul><li><p><strong>Стандартный алгоритм</strong> (используется, когда количество сегментов &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): даёт более оптимальные результаты слияния, но требует больше времени на вычисления.</p></li><li><p><strong>Алгоритм жадности</strong> (используется, когда количество сегментов &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): завершает планирование гораздо быстрее за счёт чуть менее оптимальной группировки сегментов.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Память DataNode делится на этот коэффициент для расчёта максимального размера сегмента, допустимого системой.</p><ul><li><p>Более высокое значение выделяет меньше памяти на слияние, но оставляет больше для других операций DataNode, повышая  стабильность узла.</p></li><li><p>Меньшее значение позволяет выполнять слияния большего объема, но увеличивает нагрузку на память.</p></li><li><p>Например, при коэффициенте по умолчанию 4,0 и DataNode с 16 ГБ памяти бюджет слияния составляет 4 ГБ. Это означает, что общий размер сегментов, сливаемых за одну операцию, не может превышать 4 ГБ.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>Минимальный объем памяти узла запросов (QueryNode) делится на этот коэффициент. Используется при автоматическом расчете размера (<code translate="no">target_size=max_int64</code>), чтобы гарантировать, что объединенные сегменты могут быть загружены узлами запросов (QueryNodes).</p><ul><li><p>Более высокое значение приводит к образованию сегментов меньшего размера, которые QueryNodes загружают легче.</p></li><li><p>Меньшее значение допускает создание более крупных сегментов, но может привести к сбоям при загрузке на узлах QueryNode с ограниченным объемом памяти.</p></li><li><p>Например, при коэффициенте по умолчанию 4,0 и самом маленьком узле QueryNode с 16 ГБ памяти автоматически рассчитанный целевой размер не превысит 4 ГБ. Это предотвращает создание функцией Force Merge сегментов, которые настолько велики, что узлы QueryNode не могут их загрузить.</p></li></ul></td>
   </tr>
</table>
<p>Чтобы применить вышеуказанные изменения к вашему кластеру Milvus, выполните действия, описанные в разделах <a href="/docs/ru/configure-helm.md#Configure-Milvus-via-configuration-file">«Настройка Milvus с помощью Helm</a> » и <a href="/docs/ru/configure_operator.md">«Настройка Milvus с помощью Milvus Operators</a>».</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Запуск уплотнения с принудительным слиянием<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Компактизацию Force Merge запускают путем вызова команды ` <code translate="no">compact()</code> ` с параметром ` <code translate="no">target_size</code> `. Подробную информацию о параметрах см. в разделе <a href="#parameter-reference">«Справочник по параметрам»</a> ниже.</p>
<p>Доступны три режима принудительной слияния:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>Ниже приведены примеры, демонстрирующие использование каждого режима принудительной компактизации слиянием.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">По умолчанию (стандартная компактизация)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Явно заданный целевой размер</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Автоматический расчет размера</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Справочник по параметрам</h4><p>В следующей таблице приведены пояснения к параметрам.</p>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Тип</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Обязательный. Имя коллекции, которую необходимо уплотнить.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Необязательный. Целевой размер сегмента в МБ. Существует 3 варианта значения параметра:</p><ul><li><p><strong>0 или не указан</strong>: используется настроенный размер сегмента ( <code translate="no">dataCoord.segment.maxSize</code> ) (по умолчанию: 1024 МБ). Эквивалентно стандартной компактизации.</p></li><li><p><strong>Явное значение</strong>: объединяет сегменты до размера, приблизительно равного указанному в МБ (например, 2048). Должно быть больше или равно настроенному параметру ` <code translate="no">dataCoord.segment.maxSize</code>`.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: автоматически рассчитывает оптимальный размер на основе текущего распределения сегментов и доступных ресурсов узла.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Если указанное значение <code translate="no">target_size</code> меньше настроенного значения <code translate="no">dataCoord.segment.maxSize</code>, запрос отклоняется с ошибкой.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Проверка хода уплотнения<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Компактизация с принудительным слиянием выполняется асинхронно. Для проверки хода выполнения используйте возвращаемый идентификатор задания:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Рекомендации<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Не используйте уплотнение с принудительным слиянием в производственных средах.</strong></p></li>
<li><p><strong>В большинстве случаев используйте режим автоматического расчета размера.</strong> Установка параметра « <code translate="no">target_size</code> » в значение « <code translate="no">max_int64</code> » позволяет Milvus проанализировать распределение сегментов и ресурсы узлов для определения оптимального размера. Это рекомендуемый подход, если у вас нет особых требований к размеру.</p></li>
<li><p><strong>Учитывайте компромисс между производительностью и ресурсоемкостью.</strong> Принудительная слиятельная уплотнение — это ресурсоемкая операция. Она считывает, объединяет и перезаписывает данные сегментов. Планируйте её выполнение в периоды низкой нагрузки, чтобы минимизировать влияние на задержку запросов.</p></li>
<li><p><strong>Отслеживайте количество сегментов до и после операции.</strong> Воспользуйтесь командами ` <code translate="no">get_compaction_state()</code> ` и ` <code translate="no">list_persistent_segments</code> `, чтобы убедиться, что в результате уплотнения, как и ожидалось, образовалось меньшее количество более крупных сегментов.</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>Чем операция Force Merge отличается от стандартной уплотнения?</strong></p>
<p>Эти два типа операций уплотнения служат разным целям.</p>
<ul>
<li><p>Стандартная уплотнение (targetSize=0 или не указано) — это инкрементный путь очистки, выполняемый по принципу «по мере возможности».</p></li>
<li><p>Принудительное слияние (targetSize &gt; 0) — это переупаковка на уровне коллекции, направленная на создание меньшего количества более крупных сегментов, близких к целевому размеру.</p></li>
</ul>
<p>Ключевое отличие заключается в форме слияния: стандартная уплотнение фактически представляет собой m → 1 на задачу, тогда как принудительное слияние — это m → n по сгруппированным входам. Именно поэтому принудительное слияние позволяет решать задачи размещения сегментов, с которыми не справляется стандартная уплотнение. В следующей таблице сравниваются эти два типа операций.</p>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Стандартная уплотнение (по умолчанию)</strong></p></th>
     <th><p><strong>Принудительное слияние</strong></p></th>
   </tr>
   <tr>
     <td><p>Триггер API</p></td>
     <td><p>targetSize=0 (или не задан), флаг Major/L0 отсутствует</p></td>
     <td><p>targetSize &gt; 0 (МБ)</p></td>
   </tr>
   <tr>
     <td><p>Основная цель</p></td>
     <td><p>Постепенная очистка явных фрагментов; плановое обслуживание</p></td>
     <td><p>Консолидация по всей коллекции для поиска и балансировки</p></td>
   </tr>
   <tr>
     <td><p>Источник размера сегмента</p></td>
     <td><p>Фиксированное значение dataCoord.segment.maxSize (конфигурация сервера)</p></td>
     <td><p>Значение targetSize, заданное пользователем, с последующим ограничением в сторону безопасности значением maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Допустимые значения параметра</p></td>
     <td><p>Настройка размера пользователем не допускается</p></td>
     <td><p>Значение targetSize, заданное пользователем, должно быть не меньше, чем dataCoord.segment.maxSize; в противном случае оно отклоняется</p></td>
   </tr>
   <tr>
     <td><p>Безопасная верхняя граница</p></td>
     <td><p>Только ограничение конфигурации</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (автономный режим без объединения: значение делится еще на половину)</p></td>
   </tr>
   <tr>
     <td><p>Форма слияния</p></td>
     <td><p>m → 1 на задачу, выход &lt;= configMaxSize</p></td>
     <td><p>m → n, выходы близки к targetSize</p></td>
   </tr>
   <tr>
     <td><p>Поведение средних сегментов</p></td>
     <td><p>Может застрять навсегда (например, два сегмента по 60% не могут легально объединиться в один сегмент размером 120%)</p></td>
     <td><p>Переупаковка + разделение работают; отсутствует паттерн «застрял на 60%»</p></td>
   </tr>
   <tr>
     <td><p>Способность к сглаживанию коллекции</p></td>
     <td><p>Ограничена; при повторных прогонах может оставаться много средних сегментов</p></td>
     <td><p>Высокая; разработана для уменьшения количества сегментов и повышения степени заполнения</p></td>
   </tr>
   <tr>
     <td><p>Учет топологии</p></td>
     <td><p>Отсутствует</p></td>
     <td><p>Да; использует расположение QueryNode/реплики/шарда</p></td>
   </tr>
   <tr>
     <td><p>Настройка параллелизма пути чтения</p></td>
     <td><p>Отсутствует</p></td>
     <td><p>Регулирует количество выходов с помощью queryNodeCount / (реплики × шарды), если это допустимо</p></td>
   </tr>
   <tr>
     <td><p>Типичный сценарий использования</p></td>
     <td><p>Ежедневная очистка с высокой текучестью данных после операций записи/удаления</p></td>
     <td><p>Подготовка к тестированию, оптимизация поиска, согласование параллелизма нагрузки</p></td>
   </tr>
   <tr>
     <td><p>Ожидаемый объем</p></td>
     <td><p>Не следует ожидать полной переупаковки коллекции</p></td>
     <td><p>Предназначено для получения результата переупаковки на уровне коллекции</p></td>
   </tr>
</table>
<p><strong>Рекомендации по выбору:</strong></p>
<ul>
<li><p>Выбирайте стандартную уплотнение для инкрементальной очистки с низким уровнем риска.</p></li>
<li><p>Выбирайте принудительное слияние, если вы явно хотите изменить структуру коллекции, разделив её на меньшее количество более крупных сегментов, соответствующих поведению поиска и загрузки.</p></li>
</ul>
<p><strong>Чем принудительное слияние отличается от кластерной уплотнения?</strong></p>
<p>Кластеризационная уплотнение (<code translate="no">is_clustering=True</code>) реорганизует данные внутри сегментов на основе кластеризационного ключа для улучшения отсеивания результатов поиска. Принудительное слияние (<code translate="no">target_size=N</code>) оптимизирует размеры сегментов без изменения распределения данных. Они служат разным целям и могут использоваться вместе — сначала запустите кластеризационную уплотнение для упорядочивания данных, а затем принудительное слияние для консолидации полученных сегментов.</p>
<p><strong>Можно ли запустить Force Merge для коллекции, по которой выполняются запросы?</strong></p>
<p>Да. Force Merge выполняется асинхронно и не блокирует запросы. Однако она потребляет ресурсы DataNode и дискового ввода-вывода, поэтому задержка запросов может увеличиться во время уплотнения. Для достижения наилучших результатов планируйте запуск Force Merge в периоды низкой нагрузки.</p>
<p><strong>Что произойдет, если я установлю значение target_size меньше, чем maxSize?</strong></p>
<p>Запрос будет отклонен с ошибкой. Целевой размер должен быть не меньше настроенного значения ` <code translate="no">dataCoord.segment.maxSize</code>`.</p>
