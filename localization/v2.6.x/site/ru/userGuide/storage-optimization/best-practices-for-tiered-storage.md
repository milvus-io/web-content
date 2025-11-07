---
id: best-practices-for-tiered-storage.md
title: >-
  Лучшие практики для многоуровневого хранения данныхCompatible with Milvus
  2.6.4+
summary: >-
  Milvus предлагает многоуровневое хранилище, которое поможет вам эффективно
  работать с большими данными, балансируя между задержкой запросов, емкостью и
  использованием ресурсов. В этом руководстве приведены рекомендуемые
  конфигурации для типичных рабочих нагрузок и объяснено обоснование каждой
  стратегии настройки.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Лучшие практики для многоуровневого хранения данных<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет многоуровневое хранилище, чтобы помочь вам эффективно работать с большими данными, балансируя между задержкой запросов, емкостью и использованием ресурсов. В этом руководстве приведены рекомендуемые конфигурации для типичных рабочих нагрузок и объяснено обоснование каждой стратегии настройки.</p>
<h2 id="Before-you-start" class="common-anchor-header">Перед началом работы<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 или более поздняя версия</p></li>
<li><p>QueryNodes должны иметь выделенные локальные ресурсы (память и диск). Совместное использование ресурсов может исказить оценку кэша и привести к ошибкам при выселении.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Выберите правильную стратегию<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Многоуровневое хранилище предлагает гибкие стратегии загрузки и кэширования, которые можно комбинировать в зависимости от рабочей нагрузки.</p>
<table>
   <tr>
     <th><p>Цель</p></th>
     <th><p>Рекомендуемая направленность</p></th>
     <th><p>Ключевой механизм</p></th>
   </tr>
   <tr>
     <td><p>Минимизация задержки при первом запросе</p></td>
     <td><p>Предварительная загрузка критических полей</p></td>
     <td><p>Разминка</p></td>
   </tr>
   <tr>
     <td><p>Эффективная работа с крупномасштабными данными</p></td>
     <td><p>Загрузка по требованию</p></td>
     <td><p>Ленивая загрузка + частичная загрузка</p></td>
   </tr>
   <tr>
     <td><p>Поддерживайте долгосрочную стабильность</p></td>
     <td><p>Предотвращение переполнения кэша</p></td>
     <td><p>Выселение</p></td>
   </tr>
   <tr>
     <td><p>Баланс производительности и емкости</p></td>
     <td><p>Комбинируйте предварительную нагрузку и динамическое кэширование</p></td>
     <td><p>Гибридная конфигурация</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Сценарий 1: поиск в режиме реального времени с низкой задержкой<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Когда использовать</strong></p>
<ul>
<li><p>Задержка запроса критична (например, рекомендации в реальном времени или ранжирование поиска)</p></li>
<li><p>К основным векторным индексам и скалярным фильтрам обращаются часто</p></li>
<li><p>Постоянная производительность важнее скорости запуска</p></li>
</ul>
<p><strong>Рекомендуемая конфигурация</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Обоснование</strong></p>
<ul>
<li><p>Прогрев устраняет задержку при первом обращении к скалярным и векторным индексам с высокой частотой.</p></li>
<li><p>Фоновое вытеснение поддерживает стабильное давление на кэш, не блокируя запросы.</p></li>
<li><p>Отключение TTL кэша позволяет избежать ненужных перезагрузок для "горячих" данных.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Сценарий 2: автономный пакетный анализ<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Когда использовать</strong></p>
<ul>
<li><p>Высокая устойчивость к задержкам запросов</p></li>
<li><p>Рабочие нагрузки включают массивные наборы данных или множество сегментов.</p></li>
<li><p>Пропускная способность и производительность приоритетнее скорости отклика.</p></li>
</ul>
<p><strong>Рекомендуемая конфигурация</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Обоснование</strong></p>
<ul>
<li><p>Отключение прогрева ускоряет запуск при инициализации многих сегментов.</p></li>
<li><p>Более высокие водяные знаки позволяют более плотно использовать кэш, повышая общую емкость нагрузки.</p></li>
<li><p>TTL кэша автоматически очищает неиспользуемые данные для освобождения локального пространства.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Сценарий 3: гибридное развертывание (смешанное онлайн + офлайн)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Когда использовать</strong></p>
<ul>
<li><p>Один кластер обслуживает как онлайн, так и аналитические рабочие нагрузки</p></li>
<li><p>Некоторым коллекциям требуется низкая задержка, для других приоритетом является емкость.</p></li>
</ul>
<p><strong>Рекомендуемая стратегия</strong></p>
<ul>
<li><p>Применяйте <strong>конфигурацию реального времени</strong> для коллекций, чувствительных к задержкам</p></li>
<li><p>Применять <strong>автономную конфигурацию</strong> для аналитических или архивных коллекций</p></li>
<li><p>Настройте коэффициенты evictableMemoryCacheRatio, cacheTtl и watermark независимо для каждого типа рабочей нагрузки.</p></li>
</ul>
<p><strong>Обоснование</strong></p>
<p>Комбинирование конфигураций позволяет осуществлять тонкий контроль над распределением ресурсов.</p>
<p>Критические коллекции поддерживают гарантии низкой задержки, в то время как вторичные коллекции могут обрабатывать больше сегментов и объемов данных.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Дополнительные советы по настройке<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Аспект</p></th>
     <th><p>Рекомендация</p></th>
     <th><p>Объяснение</p></th>
   </tr>
   <tr>
     <td><p><strong>Область разминки</strong></p></td>
     <td><p>Предварительно загружайте только поля или индексы с высокой частотой запросов.</p></td>
     <td><p>Излишняя предварительная загрузка увеличивает время загрузки и потребление ресурсов.</p></td>
   </tr>
   <tr>
     <td><p><strong>Настройка выселения</strong></p></td>
     <td><p>Начните с водяных знаков по умолчанию (75-80 %) и постепенно настраивайте их.</p></td>
     <td><p>Маленький зазор приводит к частому выселению, большой зазор задерживает освобождение ресурсов.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL кэша</strong></p></td>
     <td><p>Отключите для стабильных горячих наборов данных; включите (например, 1-3 дня) для динамических данных.</p></td>
     <td><p>Предотвращает накопление устаревшего кэша, балансируя накладные расходы на очистку.</p></td>
   </tr>
   <tr>
     <td><p><strong>Коэффициент перераспределения</strong></p></td>
     <td><p>Избегайте значений &gt; 0,7, если нет большого запаса ресурсов.</p></td>
     <td><p>Чрезмерный overcommit может привести к переполнению кэша и нестабильной задержке.</p></td>
   </tr>
   <tr>
     <td><p><strong>Мониторинг</strong></p></td>
     <td><p>Отслеживайте коэффициент попадания в кэш, использование ресурсов и частоту вытеснения.</p></td>
     <td><p>Частые холодные нагрузки могут указывать на то, что прогрев или водяные знаки нуждаются в корректировке.</p></td>
   </tr>
</table>
