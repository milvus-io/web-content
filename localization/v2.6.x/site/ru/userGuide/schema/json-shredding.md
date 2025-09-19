---
id: json-shredding.md
title: Измельчение JSONCompatible with Milvus 2.6.2+
summary: >-
  Измельчение JSON ускоряет запросы JSON, преобразуя традиционное хранилище на
  основе строк в оптимизированное столбцовое хранилище. Сохраняя гибкость JSON
  для моделирования данных, Milvus выполняет скрытую оптимизацию столбцов, что
  значительно повышает эффективность доступа и запросов.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Измельчение JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Измельчение JSON ускоряет запросы JSON, преобразуя традиционное хранилище на основе строк в оптимизированное столбцовое хранилище. Сохраняя гибкость JSON для моделирования данных, Milvus выполняет скрытую оптимизацию столбцов, что значительно повышает эффективность доступа и запросов.</p>
<p>Измельчение JSON эффективно для большинства сценариев запросов к JSON. Преимущества производительности становятся более заметными при:</p>
<ul>
<li><p><strong>Большие, более сложные документы JSON</strong> - Больший прирост производительности по мере увеличения размера документа</p></li>
<li><p><strong>Нагрузки, связанные с чтением</strong> - частая фильтрация, сортировка или поиск по ключам JSON.</p></li>
<li><p><strong>Смешанные шаблоны запросов</strong> - Запросы с использованием различных ключей JSON выигрывают от применения гибридного подхода к хранению.</p></li>
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
    </button></h2><p>Процесс измельчения JSON происходит в три этапа, чтобы оптимизировать данные для быстрого поиска.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Этап 1: Всасывание и классификация ключей<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>По мере создания новых JSON-документов Milvus непрерывно отбирает и анализирует их, чтобы собрать статистику по каждому JSON-ключу. Этот анализ включает в себя коэффициент встречаемости ключа и стабильность типа (совпадает ли тип данных в разных документах).</p>
<p>На основе этой статистики ключи JSON классифицируются на следующие категории для оптимального хранения.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Категории ключей JSON</h4><table>
   <tr>
     <th><p>Тип ключа</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p>Типовые ключи</p></td>
     <td><p>Ключи, которые существуют в большинстве документов и всегда имеют один и тот же тип данных (например, все целые числа или все строки).</p></td>
   </tr>
   <tr>
     <td><p>Динамические ключи</p></td>
     <td><p>Ключи, которые встречаются часто, но имеют смешанный тип данных (например, иногда строка, иногда целое число).</p></td>
   </tr>
   <tr>
     <td><p>Общие ключи</p></td>
     <td><p>Нечасто появляющиеся или вложенные ключи, частота которых ниже настраиваемого порога<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Пример классификации</h4><p>Рассмотрим пример JSON-данных, содержащих следующие JSON-ключи:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>На основе этих данных ключи можно классифицировать следующим образом:</p>
<ul>
<li><p><strong>Типизированные ключи</strong>: <code translate="no">a</code> и <code translate="no">f</code> (всегда целое число).</p></li>
<li><p><strong>Динамические ключи</strong>: <code translate="no">b</code> (смешанная строка/целое число)</p></li>
<li><p><strong>Общие ключи</strong>: <code translate="no">e</code> (редко встречающийся ключ).</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Этап 2: Оптимизация хранения данных<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>Классификация, полученная на <a href="/docs/ru/json-shredding.md#Phase-1-Ingestion--key-classification">этапе 1</a>, диктует схему хранения. Milvus использует колоночный формат, оптимизированный для запросов.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Поток измельчения Json</span> </span></p>
<ul>
<li><p><strong>Измельченные столбцы</strong>: Для <strong>типизированных</strong> и <strong>динамических</strong> <strong>ключей</strong> данные записываются в специальные колонки. Такое столбцовое хранение позволяет быстро выполнять прямое сканирование при запросах, поскольку Milvus может считывать только необходимые данные для данного ключа, не обрабатывая весь документ.</p></li>
<li><p><strong>Общий столбец</strong>: Все <strong>общие ключи</strong> хранятся вместе в одном компактном двоичном JSON-столбце. По этому столбцу строится <strong>инвертированный индекс</strong> общих ключей. Этот индекс имеет решающее значение для ускорения запросов по низкочастотным ключам, позволяя Milvus быстро подрезать данные, эффективно сужая пространство поиска только до тех строк, которые содержат указанный ключ.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Этап 3: Выполнение запросов<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>На заключительном этапе оптимизированная схема хранения данных используется для интеллектуального выбора наиболее быстрого пути для каждого предиката запроса.</p>
<ul>
<li><p><strong>Быстрый путь</strong>: Запросы по типизированным/динамическим ключам (например, <code translate="no">json['a'] &lt; 100</code>) обращаются непосредственно к выделенным столбцам.</p></li>
<li><p><strong>Оптимизированный путь</strong>: Запросы по общим ключам (например, <code translate="no">json['e'] = 'rare'</code>) используют инвертированный индекс для быстрого поиска соответствующих документов.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Включить функцию измельчения JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы активировать эту функцию, установите <code translate="no">common.enabledJSONKeyStats</code> на <code translate="no">true</code> в конфигурационном файле <code translate="no">milvus.yaml</code>. Новые данные будут автоматически запускать процесс уничтожения.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>После включения этой функции Milvus начнет анализировать и реструктурировать ваши JSON-данные при их поступлении без какого-либо дополнительного ручного вмешательства.</p>
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
    </button></h2><p>Для большинства пользователей после включения измельчения JSON достаточно настроек по умолчанию для других параметров. Однако вы можете точно настроить поведение JSON-измельчения с помощью этих параметров на странице <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Имя параметра</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение по умолчанию</p></th>
     <th><p>Совет по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>Контролирует, включены ли процессы сборки и загрузки JSON-измельчения.</p></td>
     <td><p>false</p></td>
     <td><p>Должно быть установлено значение <strong>true</strong>, чтобы активировать функцию.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>Контролирует, использует ли Milvus измельченные данные для ускорения.</p></td>
     <td><p>true</p></td>
     <td><p>Устанавливает значение <strong>false</strong> в качестве меры восстановления при неудачных запросах, возвращаясь к исходному пути запроса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>Определяет, использует ли Milvus mmap при загрузке измельченных данных.</p><p>Подробности см. в разделе <a href="/docs/ru/mmap.md">Использовать mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>Эта настройка обычно оптимизирована для производительности. Настраивайте его только в том случае, если у вас есть особые потребности в управлении памятью или ограничения в вашей системе.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>Максимальное количество JSON-ключей, которые будут храниться в измельченных столбцах. </p><p>Если количество часто встречающихся ключей превысит этот предел, Milvus будет отдавать предпочтение наиболее частым ключам для измельчения, а остальные ключи будут храниться в общей колонке.</p></td>
     <td><p>1024</p></td>
     <td><p>Этого достаточно для большинства сценариев. Для JSON с тысячами часто встречающихся ключей может потребоваться увеличить это значение, но следите за использованием хранилища.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>Минимальный коэффициент встречаемости ключа JSON, чтобы его можно было рассматривать для измельчения в столбец shredded.</p><p>Ключ считается часто появляющимся, если его отношение превышает этот порог.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Увеличивается</strong> (например, до 0,5), если количество ключей, удовлетворяющих критериям измельчения, превышает лимит <code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code>. Это делает порог более строгим, уменьшая количество ключей, удовлетворяющих критериям уничтожения.</p><p><strong>Уменьшите значение</strong> (например, до 0,1), если вы хотите уничтожить больше ключей, которые появляются реже, чем стандартный порог 30 %.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Контрольные показатели производительности<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Наше тестирование показало значительное повышение производительности при использовании различных типов ключей JSON и шаблонов запросов.</p>
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
<li><p><strong>Оборудование</strong>: 1 ядро/8 ГБ кластер</p></li>
<li><p><strong>Набор данных</strong>: 1 миллион документов из <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Средний размер документа</strong>: 478,89 байт</p></li>
<li><p><strong>Продолжительность теста</strong>: 100 секунд, измерение QPS и задержки</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Результаты: набранные ключи<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
     <th><p>QPS (без измельчения)</p></th>
     <th><p>QPS (с измельчением)</p></th>
     <th><p>Повышение производительности</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Целое число</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Строка</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
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
    </button></h3><p>Этот тест был посвящен запросам к разрозненным вложенным ключам, которые относятся к категории "общие".</p>
<table>
   <tr>
     <th><p>Выражение запроса</p></th>
     <th><p>Тип значения ключа</p></th>
     <th><p>QPS (без измельчения)</p></th>
     <th><p>QPS (с измельчением)</p></th>
     <th><p>Увеличение производительности</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Вложенное целое число</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Вложенная строка</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Ключевые моменты<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p>Наиболее значительные улучшения демонстрируют<strong>общие ключевые запросы</strong> (до 89 раз быстрее).</p></li>
<li><p><strong>Типизированные ключевые запросы</strong> обеспечивают постоянный 15-30-кратный прирост производительности</p></li>
<li><p><strong>Все типы запросов</strong> выигрывают от измельчения JSON, при этом производительность не снижается.</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>Как проверить, правильно ли работает измельчение JSON?</strong></p>
<ol>
<li><p>Сначала проверьте, были ли данные собраны, используя команду <code translate="no">show segment --format table</code> в инструменте <a href="/docs/ru/birdwatcher_usage_guides.md">Birdwatcher</a>. В случае успеха в поле <strong>Json Key Stats</strong> будет указано <code translate="no">shredding_data/</code> и <code translate="no">shared_key_index/</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Выходные данные Birdwatcher</span> </span></p></li>
<li><p>Далее проверьте, что данные были загружены, выполнив команду <code translate="no">show loaded-json-stats</code> на узле запроса. На выходе вы увидите подробную информацию о загруженных измельченных данных для каждого узла запроса.</p></li>
</ol></li>
<li><p><strong>Как выбрать между измельчением JSON и индексированием JSON?</strong></p>
<ul>
<li><p><strong>Измельчение JSON</strong> идеально подходит для ключей, которые часто встречаются в ваших документах, особенно для сложных структур JSON. Оно сочетает в себе преимущества столбцового хранения и инвертированного индексирования, что делает его хорошо подходящим для сценариев с интенсивным чтением, когда вы запрашиваете множество различных ключей. Однако его не рекомендуется использовать для очень маленьких JSON-документов, так как выигрыш в производительности будет минимальным. Чем меньше доля значения ключа в общем размере JSON-документа, тем лучше оптимизация производительности при измельчении.</p></li>
<li><p><strong>Индексирование JSON</strong> лучше подходит для целенаправленной оптимизации конкретных запросов на основе ключей и имеет меньшие накладные расходы на хранение. Она подходит для более простых структур JSON. Обратите внимание, что измельчение JSON не распространяется на запросы к ключам внутри массивов, поэтому для их ускорения вам понадобится JSON-индекс.</p></li>
</ul></li>
<li><p><strong>Что делать, если я столкнулся с ошибкой?</strong></p>
<p>Если процесс сборки или загрузки завершился неудачно, вы можете быстро отключить эту функцию, установив <code translate="no">common.enabledJSONKeyStats=false</code>. Чтобы снять все оставшиеся задачи, используйте команду <code translate="no">remove stats-task &lt;task_id&gt;</code> в <a href="/docs/ru/birdwatcher_usage_guides.md">Birdwatcher</a>. Если запрос завершился неудачно, установите <code translate="no">common.usingJsonStatsForQuery=false</code>, чтобы вернуться к исходному пути запроса, минуя измельченные данные.</p></li>
</ul>
