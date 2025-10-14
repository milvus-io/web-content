---
id: eviction.md
title: EvictionCompatible with Milvus 2.6.4+
summary: >-
  Функция Eviction управляет ресурсами кэша каждого узла QueryNode в Milvus.
  Если эта функция включена, она автоматически удаляет кэшированные данные при
  достижении пороговых значений ресурсов, обеспечивая стабильную
  производительность и предотвращая истощение памяти или диска.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Eviction<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Функция Eviction управляет ресурсами кэша каждого узла QueryNode в Milvus. Если эта функция включена, она автоматически удаляет кэшированные данные при достижении пороговых значений ресурсов, обеспечивая стабильную производительность и предотвращая истощение памяти или диска.</p>
<p>При вытеснении используется политика <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">наименьшего использования (LRU)</a> для освобождения места в кэше. Метаданные всегда кэшируются и никогда не вытесняются, поскольку они важны для планирования запросов и обычно невелики.</p>
<div class="alert note">
<p>Вытеснение должно быть явно включено. Без настройки кэшированные данные будут накапливаться до тех пор, пока ресурсы не будут исчерпаны.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Типы выселения<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает два взаимодополняющих режима выселения<strong>(sync</strong> и <strong>async</strong>), которые работают вместе для оптимального управления ресурсами:</p>
<table>
   <tr>
     <th><p>Аспект</p></th>
     <th><p>Sync Eviction</p></th>
     <th><p>Асинхронное выселение</p></th>
   </tr>
   <tr>
     <td><p>Триггер</p></td>
     <td><p>Во время запроса или поиска, когда использование памяти/диска превышает внутренние лимиты.</p></td>
     <td><p>Фоновый поток периодически проверяет использование и запускает выселение, когда превышен верхний предел.</p></td>
   </tr>
   <tr>
     <td><p>Поведение</p></td>
     <td><p>Выполнение запроса приостанавливается, пока кэш восстанавливается. Выселение продолжается до тех пор, пока использование не упадет ниже низкого уровня.</p></td>
     <td><p>Работает непрерывно в фоновом режиме; удаляет данные, когда использование превышает высокий водяной знак, пока оно не упадет ниже низкого водяного знака. Запросы не блокируются.</p></td>
   </tr>
   <tr>
     <td><p>Лучше всего подходит для</p></td>
     <td><p>Рабочие нагрузки, которые могут выдержать кратковременные скачки задержки или когда асинхронное выселение не может освободить место достаточно быстро.</p></td>
     <td><p>Рабочие нагрузки, чувствительные к задержкам и требующие плавной работы. Идеально подходит для проактивного управления ресурсами.</p></td>
   </tr>
   <tr>
     <td><p>Предостережения</p></td>
     <td><p>Добавляет задержку к текущим запросам. Может вызывать таймауты при недостаточном количестве восстанавливаемых данных.</p></td>
     <td><p>Требуются правильно настроенные водяные знаки. Небольшая фоновая нагрузка на ресурсы.</p></td>
   </tr>
   <tr>
     <td><p>Конфигурация</p></td>
     <td><p>Включено через <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Включается через <code translate="no">backgroundEvictionEnabled: true</code> (требуется <code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>Рекомендуемая настройка</strong>:</p>
<p>Включите оба режима для оптимального баланса. Async eviction управляет использованием кэша проактивно, в то время как sync eviction действует как запасной вариант, когда ресурсы почти исчерпаны.</p>
<div class="alert note">
<p>Для вытесняемых полей и индексов единица вытеснения соответствует гранулярности загрузки - скалярные/векторные поля вытесняются по чанкам, а скалярные/векторные индексы - по сегментам.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Включить вытеснение<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Настройте вытеснение в разделе <code translate="no">queryNode.segcore.tieredStorage</code> на странице <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Тип</p></th>
     <th><p>Значения</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Главный переключатель для стратегии выселения. По умолчанию <code translate="no">false</code>. Включает режим синхронного выселения.</p></td>
     <td><p>В многоуровневом хранилище всегда устанавливается значение <code translate="no">true</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Запускать выселение асинхронно в фоновом режиме. Требуется <code translate="no">evictionEnabled: true</code>. По умолчанию установлено значение <code translate="no">false</code>.</p></td>
     <td><p>Используйте <code translate="no">true</code> для более плавной работы запросов; это уменьшает частоту синхронного выселения.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Настройка водяных знаков<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Водяные знаки определяют, когда начинается и заканчивается вытеснение кэша для памяти и диска. Для каждого типа ресурсов есть два пороговых значения:</p>
<ul>
<li><p><strong>Высокий водяной знак:</strong> Выселение начинается, когда использование превышает это значение.</p></li>
<li><p><strong>Низкий водяной знак:</strong> Вытеснение продолжается до тех пор, пока использование не упадет ниже этого значения.</p></li>
</ul>
<div class="alert note">
<p>Эта конфигурация вступает в силу, только если <a href="/docs/ru/eviction.md#Enable-eviction">выселение включено</a>.</p>
</div>
<p><strong>Пример YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Тип</p></th>
     <th><p>Диапазон</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Уровень использования памяти, при котором выселение прекращается.</p></td>
     <td><p>Начните с <code translate="no">0.75</code>. Немного уменьшите, если память QueryNode ограничена.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Уровень использования памяти, при котором начинается асинхронное выселение.</p></td>
     <td><p>Начало на <code translate="no">0.8</code>. Сохраняйте разумный промежуток от низкого водяного знака (например, 0,05-0,10), чтобы предотвратить частые срабатывания.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Уровень использования диска, при котором выселение прекращается.</p></td>
     <td><p>Начните с <code translate="no">0.75</code>. Отрегулируйте ниже, если дисковый ввод-вывод ограничен.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Уровень использования диска, при котором начинается асинхронное выселение.</p></td>
     <td><p>Начинается с <code translate="no">0.8</code>. Сохраняйте разумный промежуток от низкого уровня (например, 0,05-0,10), чтобы предотвратить частые срабатывания.</p></td>
   </tr>
</table>
<p><strong>Лучшие практики</strong>:</p>
<ul>
<li><p>Не устанавливайте высокие и низкие водяные знаки выше ~0.80, чтобы оставить запас для статического использования QueryNode и всплесков времени выполнения запросов.</p></li>
<li><p>Избегайте больших промежутков между высокими и низкими водяными знаками; большие промежутки удлиняют каждый цикл выселения и могут увеличить задержку.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Настройка TTL кэша<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>Функция<strong>Time-to-Live (TTL)</strong> автоматически удаляет кэшированные данные по истечении заданного времени, даже если пороговые значения ресурсов не достигнуты. Она работает вместе с LRU-вытеснением, чтобы предотвратить неограниченное занятие кэша устаревшими данными.</p>
<div class="alert note">
<p>Для работы Cache TTL требуется <code translate="no">backgroundEvictionEnabled: true</code>, так как она выполняется в одном фоновом потоке.</p>
</div>
<p><strong>Пример YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Тип</p></th>
     <th><p>Единица измерения</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>целое число</p></td>
     <td><p>секунды</p></td>
     <td><p>Длительность до истечения срока действия кэшированных данных. Просроченные элементы удаляются в фоновом режиме.</p></td>
     <td><p>Используйте короткий TTL (часы) для высокодинамичных данных; используйте длинный TTL (дни) для стабильных наборов данных. Установите 0, чтобы отключить истечение срока действия на основе времени.</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">Настройка коэффициента избыточной коммисии<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>Коэффициент overcommit определяет, какая часть кэша будет зарезервирована как вытесняемая, позволяя узлам QueryNodes временно превысить нормальную емкость, прежде чем вытеснение усилится.</p>
<div class="alert note">
<p>Эта настройка действует только при <a href="/docs/ru/eviction.md#Enable-eviction">включенном выселении</a>.</p>
</div>
<p><strong>Пример YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Тип</p></th>
     <th><p>Диапазон</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Часть кэш-памяти, выделенная для вытесняемых данных.</p></td>
     <td><p>Начало на <code translate="no">0.3</code>. Увеличить (0,5-0,7) для снижения частоты выселения; уменьшить (0,1-0,2) для увеличения емкости сегмента.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Часть дискового кэша, выделенная для вытесняемых данных.</p></td>
     <td><p>Используйте аналогичные соотношения с памятью, если только дисковый ввод-вывод не становится узким местом.</p></td>
   </tr>
</table>
<p><strong>Граничное поведение</strong>:</p>
<ul>
<li><p><code translate="no">1.0</code>: Весь кэш является выселяемым - выселение срабатывает редко, но на один узел QueryNode помещается меньше сегментов.</p></li>
<li><p><code translate="no">0.0</code>: Нет вытесняемого кэша - вытеснение происходит часто; помещается больше сегментов, но задержка может увеличиться.</p></li>
</ul>
