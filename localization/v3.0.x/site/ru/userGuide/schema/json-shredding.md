---
id: json-shredding.md
title: Шреддинг JSONCompatible with Milvus 2.6.2+
summary: >-
  Шреддинг JSON ускоряет выполнение запросов к JSON за счет преобразования
  традиционного строчного хранилища в оптимизированное столбцовое хранилище.
  Сохраняя гибкость JSON при моделировании данных, Milvus выполняет в фоновом
  режиме столбцовую оптимизацию, что значительно повышает эффективность доступа
  и запросов.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Шреддинг JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Шреддинг JSON ускоряет выполнение запросов JSON за счет преобразования традиционного строчного хранилища в оптимизированное столбцовое хранилище. Сохраняя гибкость JSON при моделировании данных, Milvus выполняет скрытую столбцовую оптимизацию, которая значительно повышает эффективность доступа и запросов.</p>
<p>Шреддинг JSON эффективен для большинства сценариев запросов к JSON. Преимущества в производительности становятся более заметными при:</p>
<ul>
<li><p><strong>Более крупных и сложных JSON-документов</strong> — рост производительности по мере увеличения размера документа</p></li>
<li><p><strong>Рабочих нагрузках с интенсивным чтением</strong> — при частой фильтрации, сортировке или поиске по ключам JSON</p></li>
<li><p><strong>Смешанных шаблонов запросов</strong> — запросы, охватывающие разные ключи JSON, выигрывают от гибридного подхода к хранению</p></li>
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
    </button></h2><p>Процесс фрагментации JSON проходит в три отдельных этапа для оптимизации данных с целью быстрого извлечения.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Этап 1: Прием данных и классификация ключей<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>По мере записи новых JSON-документов Milvus непрерывно отбирает их образцы и анализирует, чтобы составить статистику для каждого ключа JSON. Этот анализ включает частоту встречаемости ключа и стабильность типа (сохраняется ли тип данных во всех документах).</p>
<p>На основе этих статистических данных ключи JSON классифицируются по следующим категориям для оптимального хранения.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Категории ключей JSON</h4><table>
   <tr>
     <th><p>Тип ключа</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p>Ключи с типом данных</p></td>
     <td><p>Ключи, которые присутствуют в большинстве документов и всегда имеют один и тот же тип данных (например, все целые числа или все строки).</p></td>
   </tr>
   <tr>
     <td><p>Динамические ключи</p></td>
     <td><p>Ключи, которые встречаются часто, но имеют смешанный тип данных (например, иногда строка, иногда целое число).</p></td>
   </tr>
   <tr>
     <td><p>Общие ключи</p></td>
     <td><p>Редко встречающиеся или вложенные ключи, частота которых ниже настраиваемого порогового значения<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Пример классификации</h4><p>Рассмотрим пример данных JSON, содержащих следующие ключи JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>На основании этих данных ключи будут классифицированы следующим образом:</p>
<ul>
<li><p><strong>Типизированные ключи</strong>: <code translate="no">a</code> и <code translate="no">f</code> (всегда целое число)</p></li>
<li><p><strong>Динамические ключи</strong>: <code translate="no">b</code> (смешанный тип: строка/целое число)</p></li>
<li><p><strong>Общие ключи</strong>: <code translate="no">e</code> (редко встречающийся ключ)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Этап 2: Оптимизация хранения<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>Классификация, полученная на <a href="/docs/ru/json-shredding.md#Phase-1-Ingestion--key-classification">этапе 1</a>, определяет структуру хранения. Milvus использует столбцовый формат, оптимизированный для запросов.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>Процесс фрагментации JSON</span>
  
 </span></p>
<ul>
<li><p><strong>Разбитые столбцы</strong>: для <strong>типизированных</strong> и <strong>динамических</strong> <strong>ключей</strong> данные записываются в выделенные столбцы. Такое столбцовое хранение позволяет осуществлять быстрое и прямое сканирование при выполнении запросов, поскольку Milvus может считывать только данные, необходимые для данного ключа, без обработки всего документа.</p></li>
<li><p><strong>Общий столбец</strong>: все <strong>общие ключи</strong> хранятся вместе в одном компактном двоичном столбце JSON. На основе этого столбца создается <strong>инвертированный индекс</strong> общих ключей. Этот индекс имеет решающее значение для ускорения запросов по редко встречающимся ключам, поскольку позволяет Milvus быстро отсеивать данные, эффективно сужая пространство поиска только до тех строк, которые содержат указанный ключ.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Этап 3: Выполнение запроса<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>На заключительном этапе используется оптимизированная структура хранения для интеллектуального выбора самого быстрого пути для каждого предиката запроса.</p>
<ul>
<li><p><strong>Быстрый путь</strong>: запросы по типизированным/динамическим ключам (например, <code translate="no">json['a'] &lt; 100</code>) обращаются напрямую к выделенным столбцам</p></li>
<li><p><strong>Оптимизированный путь</strong>: запросы по общим ключам (например, <code translate="no">json['e'] = 'rare'</code>) используют инвертированный индекс для быстрого поиска соответствующих документов</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Включение фрагментации JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы активировать эту функцию, в файле конфигурации <code translate="no">milvus.yaml</code> установите значение параметра <code translate="no">common.enabledJSONShredding</code> равным <code translate="no">true</code>. Новые данные автоматически запустят процесс фрагментации.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>После включения этой функции Milvus начнёт анализировать и реструктурировать ваши данные JSON сразу после их импорта без какого-либо дополнительного ручного вмешательства.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Настройка параметров<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Для большинства пользователей после включения разбиения JSON достаточно настроек по умолчанию для остальных параметров. Однако вы можете точно настроить поведение разбиения JSON с помощью следующих параметров в файле ` <code translate="no">milvus.yaml</code>`.</p>
<table>
   <tr>
     <th><p>Название параметра</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение по умолчанию</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Определяет, включены ли процессы сборки и загрузки при фрагментации JSON.</p></td>
     <td><p>false</p></td>
     <td><p>Для активации этой функции необходимо установить значение <strong>true</strong>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Определяет, использует ли Milvus фрагментированные данные для ускорения.</p></td>
     <td><p>true</p></td>
     <td><p>Установите значение <strong>«false»</strong> в качестве меры восстановления в случае сбоя запросов, чтобы вернуться к исходному пути запроса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Определяет, использует ли Milvus mmap при загрузке фрагментированных данных.</p><p>Подробности см. в разделе <a href="/docs/ru/mmap.md">«Использование mmap</a>».</p></td>
     <td><p>true</p></td>
     <td><p>Этот параметр, как правило, оптимизирован для обеспечения производительности. Изменяйте его только в том случае, если у вас есть особые требования к управлению памятью или ограничения в вашей системе.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Максимальное количество ключей JSON, которые будут храниться в столбцах с фрагментацией. </p><p>Если количество часто встречающихся ключей превышает этот предел, Milvus будет отдавать приоритет наиболее частым ключам при фрагментации, а остальные ключи будут храниться в общем столбце.</p></td>
     <td><p>1024</p></td>
     <td><p>Этого достаточно для большинства сценариев. Для JSON с тысячами часто встречающихся ключей может потребоваться увеличить это значение, но при этом необходимо отслеживать использование хранилища.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Минимальный коэффициент встречаемости, который должен иметь ключ JSON, чтобы его можно было рассмотреть для фрагментации в фрагментированный столбец.</p><p>Ключ считается часто встречающимся, если его коэффициент превышает этот порог.</p></td>
     <td><p>0,3</p></td>
     <td><p><strong>Увеличьте значение</strong> (например, до 0,5), если количество ключей, соответствующих критериям фрагментации, превышает ограничение « <code translate="no">dataCoord.jsonShreddingMaxColumns</code> ». Это ужесточает пороговое значение, уменьшая количество ключей, подходящих для фрагментации.</p><p><strong>Уменьшите значение</strong> (например, до 0,1), если хотите разбивать больше ключей, которые встречаются реже, чем предусмотрено по умолчанию (пороговое значение 30 %).</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Тесты производительности<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Наши тесты демонстрируют значительное повышение производительности при работе с различными типами ключей JSON и шаблонами запросов.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Тестовая среда и методология<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Оборудование</strong>: кластер с 1 ядром и 8 ГБ памяти</p></li>
<li><p><strong>Набор данных</strong>: 1 миллион документов из <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Средний размер документа</strong>: 478,89 байт</p></li>
<li><p><strong>Продолжительность тестирования</strong>: 100 секунд, измерение QPS и задержки</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Результаты: ключи с типом данных<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом тесте измерялась производительность при запросе ключа, присутствующего в большинстве документов.</p>
<table>
   <tr>
     <th><p>Выражение запроса</p></th>
     <th><p>Тип значения ключа</p></th>
     <th><p>QPS (без фрагментации)</p></th>
     <th><p>QPS (с фрагментацией)</p></th>
     <th><p>Повышение производительности</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Целое число</p></td>
     <td><p>8,69</p></td>
     <td><p>287,50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Строка</p></td>
     <td><p>8,42</p></td>
     <td><p>126,1</p></td>
     <td><p>14,9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Результаты: общие ключи<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Этот тест был посвящён запросам к разреженным вложенным ключам, относящимся к категории «общих».</p>
<table>
   <tr>
     <th><p>Выражение запроса</p></th>
     <th><p>Тип значения ключа</p></th>
     <th><p>QPS (без фрагментации)</p></th>
     <th><p>QPS (с фрагментацией)</p></th>
     <th><p>Повышение производительности</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Вложенное целое число</p></td>
     <td><p>4,33</p></td>
     <td><p>385</p></td>
     <td><p>88,9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Вложенная строка</p></td>
     <td><p>7,6</p></td>
     <td><p>352</p></td>
     <td><p>46,3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Основные выводы<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>Запросы с общим ключом</strong> демонстрируют наиболее значительное улучшение производительности (до 89x быстрее)</p></li>
<li><p><strong>Запросы с типизированными ключами</strong> обеспечивают стабильное повышение производительности в 15–30 раз</p></li>
<li><p><strong>Все типы запросов</strong> получают выгоду от JSON-шреддинга без снижения производительности</p></li>
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
    </button></h2><ul>
<li><p><strong>Как проверить, правильно ли работает JSON-шреддинг?</strong></p>
<ol>
<li><p>Сначала проверьте, были ли данные сгенерированы, с помощью команды « <code translate="no">show segment --format table</code> » в инструменте <a href="/docs/ru/birdwatcher_usage_guides.md">Birdwatcher</a>. В случае успеха в поле <strong>«Json Key Stats</strong> » в выводе будут указаны значения « <code translate="no">shredding_data/</code> » и « <code translate="no">shared_key_index/</code> ».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Вывод Birdwatcher</span>
  
 </span></p></li>
<li><p>Затем убедитесь, что данные были загружены, запустив команду ` <code translate="no">show loaded-json-stats</code> ` на узле запроса. В выводе будут отображены сведения о загруженных фрагментированных данных для каждого узла запроса.</p></li>
</ol></li>
<li><p><strong>Что делать, если возникла ошибка?</strong></p>
<p>Если процесс сборки или загрузки завершился сбоем, вы можете быстро отключить эту функцию, установив значение <code translate="no">common.enabledJSONShredding=false</code>. Чтобы очистить оставшиеся задачи, используйте команду <code translate="no">remove stats-task &lt;task_id&gt;</code> в <a href="/docs/ru/birdwatcher_usage_guides.md">Birdwatcher</a>. Если запрос завершился сбоем, установите значение <code translate="no">common.usingjsonShreddingForQuery=false</code>, чтобы вернуться к исходному пути запроса, минуя фрагментированные данные.</p></li>
</ul>
<ul>
<li><p><strong>Как выбрать между фрагментацией JSON и индексированием JSON?</strong></p>
<ul>
<li><p><strong>Фрагментация JSON</strong> идеально подходит для ключей, которые часто встречаются в ваших документах, особенно для сложных структур JSON. Она сочетает в себе преимущества столбчатого хранения и инвертированной индексации, что делает её подходящей для сценариев с интенсивным чтением, где выполняются запросы по множеству различных ключей. Однако её не рекомендуется использовать для очень маленьких документов JSON, так как прирост производительности в этом случае минимален. Чем меньше доля значения ключа по отношению к общему размеру JSON-документа, тем выше оптимизация производительности за счёт фрагментации.</p></li>
<li><p><strong>Индексирование JSON</strong> лучше подходит для целенаправленной оптимизации конкретных запросов по ключам и имеет меньшие накладные расходы на хранение. Оно подходит для более простых структур JSON. Обратите внимание, что фрагментация JSON не охватывает запросы по ключам внутри массивов, поэтому для их ускорения вам понадобится индекс JSON.</p></li>
</ul>
<p>Подробности см. в разделе <a href="/docs/ru/json-field-overview.md#Next-Accelerate-JSON-queries">«Обзор полей JSON</a>».</p></li>
</ul>
