---
id: force-merge.md
title: Уплотнение Force MergeCompatible with Milvus 3.0.x
summary: >-
  Используйте принудительное уплотнение для консолидации небольших сегментов и
  повышения производительности запросов и эффективности хранения.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Уплотнение Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Функция Force Merge предназначена для объединения мелких и фрагментированных сегментов в более мелкие и крупные для повышения производительности запросов и эффективности хранения данных. В этом руководстве объясняется, как использовать уплотнение принудительного слияния.</p>
<div class="alert note">
<p>Эта функция находится в стадии публичного предварительного просмотра. Не используйте ее в производственных средах.</p>
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
    </button></h2><p>Стандартное <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">уплотнение</a> позволяет поддерживать размеры сегментов на уровне, близком к настроенному <code translate="no">maxSize</code>, благодаря слиянию "многие к одному", но при этом могут оставаться фрагменты среднего размера, которые нельзя объединить дальше без превышения лимитов. Например, как показано ниже, если коллекция состоит из пяти сегментов по 2 МБ, а <code translate="no">maxSize</code> составляет 3 МБ, объединение любых двух сегментов превысит лимит, поэтому стандартное уплотнение не сможет еще больше уменьшить количество сегментов и останется фрагментированный макет.</p>
<p>Принудительное слияние добавляет параметр <code translate="no">target_size</code> и поддерживает реорганизацию сегментов в направлении желаемого размера в пределах жесткого допуска, когда это возможно. Как показано ниже, если указанный <code translate="no">target_size</code> составляет 4 МБ, пять небольших сегментов по 2 МБ могут быть объединены в меньшее количество больших сегментов. Это уменьшает избыточное количество сегментов, поддерживает цели большего размера, чем настройки по умолчанию <code translate="no">maxSize</code>, и, если цель очень большая, позволяет системе выбрать практичный размер выходного файла и количество сегментов для текущего оборудования и топологии QueryNode.</p>
<p>Чтобы понять, какой метод уплотнения использовать, смотрите раздел <a href="#faq">FAQ</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>Принудительное уплотнение слияния расширяет существующий <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API с помощью параметра <code translate="no">target_size</code>. Он полностью совместим с обратным развитием: существующие вызовы уплотнения без <code translate="no">target_size</code> продолжают работать как прежде.</p>
<p>Force merge работает асинхронно. Оно не блокирует операции поиска или запроса, хотя во время выполнения потребляет ресурсы ввода-вывода и памяти.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Использование уплотнения принудительного слияния<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus версии 2.6.15 или более поздней</p></li>
<li><p>pymilvus 2.6.13 или более поздняя версия</p></li>
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
    </button></h3><p>Следующие параметры конфигурации управляют поведением Force Merge. Задайте их в конфигурационном файле Milvus или с помощью переменных окружения.</p>
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
     <td><p>512</p></td>
     <td><p>Максимальный размер сегмента по умолчанию в МБ. Используется в качестве целевого значения, когда <code translate="no">target_size</code> равен 0 или опущен. Также служит минимально допустимым значением для явного <code translate="no">target_size</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Порог количества сегментов для выбора алгоритма. Когда количество сегментов превышает это значение, Milvus использует более быстрый жадный алгоритм для планирования слияния.</p><ul><li><p><strong>Стандартный алгоритм</strong> (используется, когда количество сегментов &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): дает более оптимальные результаты слияния, но требует больше времени на вычисление.</p></li><li><p><strong>Жадный алгоритм</strong> (используется, когда количество сегментов &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): завершает планирование гораздо быстрее за счет чуть менее оптимальной группировки сегментов.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Память DataNode делится на этот коэффициент, чтобы вычислить наибольший размер сегмента, который может позволить система.</p><ul><li><p>При большем значении на слияние выделяется меньше памяти, но больше остается для других операций DataNode, что повышает стабильность узла.</p></li><li><p>Меньшее значение позволяет объединять большие сегменты, но увеличивает нагрузку на память.</p></li><li><p>Например, при значении коэффициента по умолчанию 4.0 и узле DataNode с 16 ГБ памяти бюджет слияния составляет 4 ГБ. Это означает, что общий размер сегментов, объединяемых за одну операцию, не может превышать 4 ГБ.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Минимальная память QueryNode делится на этот коэффициент. Используется при автоматическом расчете размера (<code translate="no">target_size=max_int64</code>), чтобы гарантировать, что объединенные сегменты могут быть загружены узлами QueryNode.</p><ul><li><p>При большем значении получаются меньшие сегменты, которые легче загружать узлам запроса.</p></li><li><p>Меньшее значение позволяет получить более крупные сегменты, но может привести к сбоям при загрузке на узлах QueryNodes с ограниченным объемом памяти.</p></li><li><p>Например, при значении коэффициента по умолчанию 4.0 и самом маленьком узле QueryNode с памятью 16 ГБ, автоматически вычисляемый целевой размер не будет превышать 4 ГБ. Это не позволит Force Merge создавать настолько большие сегменты, что узлы QueryNodes не смогут их загрузить.</p></li></ul></td>
   </tr>
</table>
<p>Чтобы применить вышеуказанные изменения к кластеру Milvus, выполните действия, описанные в разделах <a href="/docs/ru/configure-helm.md#Configure-Milvus-via-configuration-file">Настройка Milvus с помощью Helm</a> и <a href="/docs/ru/configure_operator.md">Настройка Milvus с помощью Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Запуск уплотнения Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы запускаете уплотнение Force Merge, вызывая <code translate="no">compact()</code> с параметром <code translate="no">target_size</code>. Подробные сведения о параметре см. в разделе <a href="#parameter-reference">Ссылка на параметр</a> ниже.</p>
<p>Доступны три режима уплотнения принудительного слияния:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
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
<p>Ниже приведены примеры использования каждого режима принудительного уплотнения.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">По умолчанию (стандартное уплотнение)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Явный целевой размер</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">Ссылка на параметры</h4><p>В следующей таблице приведены пояснения к параметрам.</p>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Тип</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Требуется. Имя коллекции для уплотнения.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Необязательно. Размер целевого сегмента в МБ. Существует 3 варианта значения параметра:</p><ul><li><p><strong>0 или опущено</strong>: Используется настроенный <code translate="no">dataCoord.segment.maxSize</code> (по умолчанию: 512 МБ). Эквивалентно стандартному уплотнению.</p></li><li><p><strong>Явное значение</strong>: Объединяет сегменты примерно до указанного размера в МБ (например, 2048). Должно быть больше или равно настроенному <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Автоматически вычисляет оптимальный размер на основе текущего распределения сегментов и доступных ресурсов узла.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Если указанный <code translate="no">target_size</code> меньше сконфигурированного <code translate="no">dataCoord.segment.maxSize</code>, запрос отклоняется с ошибкой.</p>
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
    </button></h3><p>Уплотнение Force Merge выполняется асинхронно. Для проверки хода выполнения используйте возвращаемый идентификатор задания:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>Не используйте принудительное уплотнение в производственных средах.</strong></p></li>
<li><p><strong>В большинстве случаев используйте режим автоматического расчета размера.</strong> Установка <code translate="no">target_size</code> на <code translate="no">max_int64</code> позволяет Milvus анализировать распределение сегментов и ресурсы узлов для определения оптимального размера. Это рекомендуемый подход, если у вас нет особых требований к размеру.</p></li>
<li><p><strong>Учитывайте компромисс производительности.</strong> Уплотнение с принудительным слиянием - ресурсоемкая операция. Она считывает, объединяет и перезаписывает данные сегмента. Запланируйте ее на периоды с низким трафиком, чтобы минимизировать влияние на задержку запросов.</p></li>
<li><p><strong>Следите за количеством сегментов до и после операции.</strong> Используйте <code translate="no">get_compaction_state()</code> и <code translate="no">list_persistent_segments</code>, чтобы убедиться, что в результате уплотнения сегментов стало меньше и они стали больше, как и ожидалось.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Чем Force Merge отличается от стандартного уплотнения?</strong></p>
<p>Эти два типа операций уплотнения служат разным целям.</p>
<ul>
<li><p>Стандартное уплотнение (targetSize=0 или опущено) - это наилучший путь инкрементной очистки.</p></li>
<li><p>Принудительное слияние (targetSize&gt;0) - это путь переупаковки на уровне коллекции для получения меньшего количества больших сегментов, близких к целевым.</p></li>
</ul>
<p>Ключевое различие заключается в форме слияния: стандартное уплотнение эффективно m → 1 на задачу, в то время как принудительное слияние - m → n на сгруппированные входы. Именно поэтому принудительное слияние может решать задачи компоновки сегментов, которые стандартное уплотнение решить не может. В следующей таблице приведено сравнение двух типов операций.</p>
<table>
   <tr>
     <th><p><strong>Размерность</strong></p></th>
     <th><p><strong>Стандартное уплотнение (по умолчанию)</strong></p></th>
     <th><p><strong>Принудительное объединение</strong></p></th>
   </tr>
   <tr>
     <td><p>API-триггер</p></td>
     <td><p>targetSize=0 (или не установлен), флаг Major/L0 отсутствует</p></td>
     <td><p>targetSize&gt;0 (МБ)</p></td>
   </tr>
   <tr>
     <td><p>Основная цель</p></td>
     <td><p>Инкрементная очистка очевидных фрагментов; рутинное обслуживание</p></td>
     <td><p>Консолидация всей коллекции для поиска и баланса</p></td>
   </tr>
   <tr>
     <td><p>Источник размера сегмента</p></td>
     <td><p>Фиксированный dataCoord.segment.maxSize (конфигурация сервера)</p></td>
     <td><p>Пользовательский целевой размер (targetSize), затем безопасный размер (maxSafeSize)</p></td>
   </tr>
   <tr>
     <td><p>Действие параметра</p></td>
     <td><p>Нет настройки размера пользователя</p></td>
     <td><p>Пользовательский targetSize должен быть &gt;= dataCoord.segment.maxSize; в противном случае отклоняется</p></td>
   </tr>
   <tr>
     <td><p>Верхняя граница безопасности</p></td>
     <td><p>Только ограничение конфигурации</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (автономная работа без пулинга: дополнительно уменьшается вдвое)</p></td>
   </tr>
   <tr>
     <td><p>Форма слияния</p></td>
     <td><p>m → 1 на задачу, выход &lt;= configMaxSize</p></td>
     <td><p>m → n, выходы близки к targetSize</p></td>
   </tr>
   <tr>
     <td><p>Поведение среднего сегмента</p></td>
     <td><p>Может застрять надолго (например, два 60% сегмента не могут законно стать одним 120% сегментом)</p></td>
     <td><p>Переупаковка + разбиение работает; нет шаблона "застрял на 60%"</p></td>
   </tr>
   <tr>
     <td><p>Возможность сплющивания коллекции</p></td>
     <td><p>Ограниченная; при повторных запусках может остаться много средних сегментов</p></td>
     <td><p>Сильная; предназначена для уменьшения количества сегментов и увеличения полноты</p></td>
   </tr>
   <tr>
     <td><p>Осознание топологии</p></td>
     <td><p>Нет</p></td>
     <td><p>Да; используется QueryNode/replica/shard layout</p></td>
   </tr>
   <tr>
     <td><p>Настройка параллелизма на пути чтения</p></td>
     <td><p>Нет</p></td>
     <td><p>Корректирует количество выходов, используя queryNodeCount / (реплики × шарды), если это действительно так.</p></td>
   </tr>
   <tr>
     <td><p>Типичный случай использования</p></td>
     <td><p>Высокопроизводительная ежедневная очистка после записи/удаления</p></td>
     <td><p>Подготовка бенчмарков, оптимизация поиска, выравнивание параллелизма нагрузки</p></td>
   </tr>
   <tr>
     <td><p>Ожидаемый объем</p></td>
     <td><p>Не ожидайте полного репака коллекции</p></td>
     <td><p>Предназначен для репака на уровне коллекции</p></td>
   </tr>
</table>
<p><strong>Рекомендации по выбору:</strong></p>
<ul>
<li><p>Выбирайте стандартное уплотнение для инкрементной очистки с низким риском.</p></li>
<li><p>Выбирайте принудительное слияние, если вы явно хотите изменить форму коллекции, разбив ее на меньшее количество больших сегментов в соответствии с поведением при поиске и загрузке.</p></li>
</ul>
<p><strong>Чем Force Merge отличается от кластерного уплотнения?</strong></p>
<p><a href="/docs/ru/clustering-compaction.md">Clustering compaction</a> (<code translate="no">is_clustering=True</code>) реорганизует данные в сегментах на основе ключа кластеризации, чтобы улучшить обрезку поиска. Force Merge (<code translate="no">target_size=N</code>) оптимизирует размеры сегментов без изменения распределения данных. Они служат разным целям и могут использоваться вместе - сначала запустите уплотнение кластеризации для упорядочивания данных, а затем Force Merge для консолидации полученных сегментов.</p>
<p><strong>Можно ли запустить Force Merge на коллекции, к которой выполняется запрос?</strong></p>
<p>Да. Force Merge выполняется асинхронно и не блокирует запросы. Однако она потребляет ресурсы DataNode и дискового ввода-вывода, поэтому во время уплотнения может увеличиться задержка запросов. Для достижения наилучших результатов планируйте Force Merge на периоды с низким трафиком.</p>
<p><strong>Что произойдет, если я задам target_size меньше maxSize?</strong></p>
<p>Запрос будет отклонен с ошибкой. Целевой размер должен быть больше или равен настроенному <code translate="no">dataCoord.segment.maxSize</code>.</p>
