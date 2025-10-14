---
id: tiered-storage-overview.md
title: Обзор многоуровневого хранилищаCompatible with Milvus 2.6.4+
summary: >-
  В Milvus традиционный режим полной загрузки требует, чтобы каждый узел
  QueryNode при инициализации загружал все поля схемы и индексы сегмента, даже
  те данные, к которым, возможно, никогда не будет доступа. Это обеспечивает
  немедленную доступность данных, но часто приводит к нерациональному
  расходованию ресурсов, включая большое количество памяти, высокую дисковую
  активность и значительные накладные расходы на ввод-вывод, особенно при работе
  с большими массивами данных.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Обзор многоуровневого хранилища<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus традиционный <strong>режим полной загрузки</strong> требует, чтобы каждый узел QueryNode загружал все поля схемы и индексы <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">сегмента</a> при инициализации, даже данные, к которым, возможно, никогда не будет доступа. Это обеспечивает немедленную доступность данных, но часто приводит к нерациональному расходованию ресурсов, включая высокое потребление памяти, большую дисковую активность и значительные накладные расходы на ввод-вывод, особенно при работе с большими массивами данных.</p>
<p><strong>Многоуровневое хранилище</strong> решает эту проблему, отделяя кэширование данных от загрузки сегментов. Вместо того чтобы загружать все данные сразу, Milvus внедряет слой кэширования, который различает "горячие" данные (кэшированные локально) и "холодные" (хранящиеся удаленно). Теперь узел QueryNode изначально загружает только легкие метаданные и динамически извлекает или удаляет данные по требованию. Это значительно сокращает время загрузки, оптимизирует использование локальных ресурсов и позволяет узлам QueryNode обрабатывать наборы данных, значительно превышающие объем их физической памяти или диска.</p>
<p>Вы можете рассмотреть возможность включения многоуровневого хранилища в таких сценариях, как:</p>
<ul>
<li><p>Коллекции, которые превышают доступную память или емкость NVMe одного узла QueryNode</p></li>
<li><p>Аналитические или пакетные рабочие нагрузки, для которых более быстрая загрузка важнее, чем задержка первого запроса</p></li>
<li><p>Смешанные рабочие нагрузки, которые могут терпеть случайные пропуски кэша для менее часто обращающихся данных.</p></li>
</ul>
<div class="alert note">
<p>Более подробную информацию о сегментах и чанках см. в разделе <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">"Объяснение сегментов</a>".</p>
</div>
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
    </button></h2><p>Многоуровневое хранение изменяет способ управления QueryNode данными сегментов. Вместо того чтобы кэшировать каждое поле и индекс во время загрузки, QueryNode теперь загружает только <strong>метаданные</strong> и использует слой кэширования для динамической выборки и удаления данных.</p>
<div class="alert note">
<p><strong>Метаданные</strong> включают в себя схему, определения индексов, карты чанков, количество строк и ссылки на удаленные объекты. Эти данные невелики, всегда кэшируются и никогда не удаляются.</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Режим полной загрузки по сравнению с режимом многоуровневого хранения<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Хотя режимы полной загрузки и многоуровневого хранения обрабатывают одни и те же данные, они различаются тем, когда и как QueryNode кэширует эти компоненты.</p>
<ul>
<li><p><strong>Режим полной загрузки</strong>: Во время загрузки QueryNode кэширует полные данные коллекции, включая метаданные, данные полей и индексы, из объектного хранилища.</p></li>
<li><p><strong>Режим многоуровневого хранения</strong>: Во время загрузки QueryNode кэширует только метаданные. Данные полей извлекаются по требованию с гранулярностью чанка. Файлы индексов остаются удаленными до тех пор, пока они не понадобятся первому запросу; затем извлекается и кэшируется весь индекс каждого сегмента.</p></li>
</ul>
<p>На диаграмме ниже показаны эти различия.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Режим полной загрузки и многоуровневый режим хранения</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Рабочий процесс загрузки узла QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>В режиме многоуровневого хранения рабочий процесс состоит из трех фаз:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс загрузки узла Querynode</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">Ленивая загрузка</h4><p>При инициализации Milvus выполняет ленивую загрузку, кэшируя только <strong>метаданные</strong>, содержащие определения схем, информацию об индексах, сопоставления чанков и количество строк.</p>
<p>На этом этапе не загружаются данные полей и файлы индексов. Это позволяет быстро выполнять запросы к коллекциям и минимизировать использование ресурсов при запуске.</p>
<p><strong>Преимущества</strong></p>
<ul>
<li><p>Значительно более быстрое время загрузки коллекции</p></li>
<li><p>Минимальный объем памяти и дискового пространства</p></li>
<li><p>Позволяет узлам запросов обрабатывать больше сегментов одновременно</p></li>
</ul>
<p><strong>Конфигурация</strong></p>
<p>Автоматически применяется при включении многоуровневого хранения. Ручная настройка не требуется.</p>
<h4 id="Partial-load" class="common-anchor-header">Частичная загрузка</h4><p>Когда начинается операция запроса или поиска, узел QueryNode выполняет частичную загрузку, получая из хранилища объектов только необходимые фрагменты полей или индексов и временно кэшируя их для повторного использования.</p>
<ul>
<li><p><strong>Поля</strong>: Загружаются по требованию на уровне <strong>чанков</strong>.</p></li>
<li><p><strong>Индексы:</strong> Загружаются при первом обращении к ним на уровне <strong>сегмента</strong>.</p></li>
</ul>
<p><strong>Преимущества</strong></p>
<ul>
<li><p>Снижает нагрузку на память и диск</p></li>
<li><p>Позволяет Milvus эффективно запрашивать большие наборы данных</p></li>
<li><p>Баланс между задержкой запросов и эффективностью использования ресурсов</p></li>
</ul>
<p><strong>Конфигурация</strong></p>
<p>Частичная загрузка - это поведение по умолчанию, когда включено многоуровневое хранение. Чтобы свести к минимуму задержки при первом обращении к критическим полям или индексам, используйте <strong>Warm Up</strong> для предварительной загрузки данных перед запросами. Примеры конфигурации см. в разделе <a href="/docs/ru/warm-up.md">Warm Up</a>.</p>
<h4 id="Eviction" class="common-anchor-header">Выселение</h4><p>Для поддержания здорового использования ресурсов Milvus автоматически освобождает неиспользуемые кэшированные данные при достижении пороговых значений.</p>
<p>Вытеснение происходит в соответствии с политикой <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">наименее часто используемых данных (LRU)</a> и регулируется настраиваемыми параметрами:</p>
<ul>
<li><p><strong>Водяные знаки:</strong> Определяют пороги начала и остановки вытеснения.</p></li>
<li><p><strong>TTL кэша:</strong> удаление устаревших элементов кэша по истечении определенного времени.</p></li>
<li><p><strong>Overcommit ratio:</strong> Допускает временную переподписку до ускорения вытеснения.</p></li>
</ul>
<p><strong>Преимущества</strong></p>
<ul>
<li><p>Поддерживает стабильное использование кэша при различных рабочих нагрузках</p></li>
<li><p>Максимальное повторное использование кэша при предотвращении сбоев</p></li>
<li><p>Поддерживает предсказуемую производительность с течением времени</p></li>
</ul>
<p><strong>Конфигурация</strong></p>
<p>Включите и настройте параметры выселения на сайте <code translate="no">milvus.yaml</code>. Подробную информацию о настройке см. в разделе <a href="/docs/ru/eviction.md">Выселение</a>.</p>
<h2 id="Getting-started" class="common-anchor-header">Начало работы<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes с выделенной памятью и дисковыми ресурсами</p></li>
<li><p>Бэкэнд для хранения объектов (S3, MinIO и т. д.).</p></li>
</ul>
<div class="alert warning">
<p>Ресурсы QueryNode не должны использоваться совместно с другими рабочими нагрузками. Совместное использование ресурсов может привести к тому, что Tiered Storage неправильно оценит доступную емкость, что приведет к сбоям.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Базовый шаблон конфигурации<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Отредактируйте файл конфигурации Milvus (<code translate="no">milvus.yaml</code>), чтобы настроить параметры Tiered Storage:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Настройте Warm Up</strong> - оптимизируйте предварительную загрузку для шаблонов доступа. См. раздел <a href="/docs/ru/warm-up.md">"Теплая загрузка</a>".</p></li>
<li><p><strong>Настройка выселения</strong> - установите соответствующие водяные знаки и TTL для ваших ограничений ресурсов. См. раздел <a href="/docs/ru/eviction.md">Выселение</a>.</p></li>
<li><p><strong>Мониторинг производительности</strong> - отслеживайте частоту обращений к кэшу, частоту вытеснения и задержку запросов.</p></li>
<li><p><strong>Итерация конфигурации</strong> - корректировка настроек на основе наблюдаемых характеристик рабочей нагрузки.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">Можно ли изменить параметры Tiered Storage во время выполнения?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. Все параметры должны быть установлены в <code translate="no">milvus.yaml</code> перед запуском Milvus. Для вступления изменений в силу требуется перезапуск.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Влияет ли Tiered Storage на долговечность данных?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. Сохранность данных по-прежнему обеспечивается удаленным хранилищем объектов. Tiered Storage управляет кэшированием только на QueryNodes.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Всегда ли запросы будут выполняться быстрее при использовании Tiered Storage?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Не обязательно. Tiered Storage сокращает время загрузки и использование ресурсов, но запросы, обращающиеся к некэшированным (холодным) данным, могут работать с большей задержкой. Для рабочих нагрузок, чувствительных к задержкам, рекомендуется использовать режим полной загрузки.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Почему на узле QueryNode не хватает ресурсов даже при включенном многоуровневом хранении?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Две распространенные причины:</p>
<ul>
<li><p>Узел QueryNode был настроен со слишком малым количеством ресурсов. Водяные знаки соотносятся с доступными ресурсами, поэтому недостаточное выделение ресурсов усиливает ошибочные суждения.</p></li>
<li><p>Ресурсы узла QueryNode используются совместно с другими рабочими нагрузками, поэтому Tiered Storage не может правильно оценить фактическую доступную емкость.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Почему некоторые запросы терпят неудачу при высоком параллелизме?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Если слишком много запросов одновременно обращаются к горячим данным, лимиты ресурсов QueryNode все равно могут быть превышены. Некоторые потоки могут потерпеть неудачу из-за таймаутов резервирования ресурсов. Повторные попытки после снижения нагрузки или выделение большего количества ресурсов могут решить эту проблему.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Почему после включения многоуровневого хранилища увеличивается задержка поиска/запроса?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Возможные причины включают:</p>
<ul>
<li><p>Частые запросы к холодным данным, которые необходимо извлекать из хранилища.</p></li>
<li><p>Слишком высокий коэффициент избыточной коммисии, приводящий к частым выгрузкам.</p></li>
<li><p>Водяные знаки установлены слишком близко друг к другу, что приводит к частому синхронному вытеснению.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">Может ли многоуровневое хранилище обрабатывать неограниченное количество данных за счет перераспределения кэша?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. Коэффициенты избыточной фиксации позволяют узлам запросов работать с большим количеством сегментов, чем позволяет физическая память, но слишком высокие коэффициенты могут привести к частому вытеснению, переполнению кэша или сбоям запросов.</p>
