---
id: tiered-storage-overview.md
title: Обзор многоуровневого хранилищаCompatible with Milvus 2.6.4+
summary: >-
  В Milvus традиционный режим полной загрузки требует, чтобы каждый узел
  QueryNode загружал все поля данных и индексы сегмента при инициализации, даже
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
    </button></h1><p>В Milvus традиционный режим <em>полной загрузки</em> требует, чтобы каждый узел QueryNode загружал все поля данных и индексы <a href="/docs/ru/glossary.md#Segment">сегмента</a> при инициализации, даже те данные, к которым, возможно, никогда не будет доступа. Это обеспечивает немедленную доступность данных, но часто приводит к нерациональному расходованию ресурсов, включая высокое потребление памяти, большую дисковую активность и значительные накладные расходы на ввод-вывод, особенно при работе с большими наборами данных.</p>
<p><em>Многоуровневое хранилище</em> решает эту проблему, отделяя кэширование данных от загрузки сегментов. Вместо того чтобы загружать все данные сразу, Milvus внедряет слой кэширования, который различает "горячие" данные (кэшированные локально) и "холодные" (хранящиеся удаленно). Теперь узел QueryNode изначально загружает только легкие <em>метаданные</em> и динамически извлекает или удаляет данные о полях по требованию. Это значительно сокращает время загрузки, оптимизирует использование локальных ресурсов и позволяет узлам QueryNode обрабатывать наборы данных, значительно превышающие объем их физической памяти или диска.</p>
<p>Рассмотрите возможность включения многоуровневого хранилища в таких сценариях, как:</p>
<ul>
<li><p>Коллекции, которые превышают доступную память или емкость NVMe одного узла QueryNode</p></li>
<li><p>Аналитические или пакетные рабочие нагрузки, для которых более быстрая загрузка важнее, чем задержка первого запроса</p></li>
<li><p>Смешанные рабочие нагрузки, которые могут терпеть случайные пропуски кэша для менее часто обращающихся данных.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>Метаданные</em> включают схему, определения индексов, карты чанков, количество строк и ссылки на удаленные объекты. Этот тип данных небольшой, всегда кэшируется и никогда не вытесняется.</p></li>
<li><p>Более подробную информацию о сегментах и чанках см. в разделе <a href="/docs/ru/glossary.md#Segment">Сегмент</a>.</p></li>
</ul>
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
    </button></h2><p>Многоуровневое хранение изменяет то, как QueryNode управляет данными сегментов. Вместо того чтобы кэшировать каждое поле и индекс во время загрузки, QueryNode теперь загружает только метаданные и использует слой кэширования для динамической выборки и удаления данных.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Режим полной загрузки против режима многоуровневого хранения<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Хотя режимы полной загрузки и многоуровневого хранения обрабатывают одни и те же данные, они отличаются тем, <em>когда</em> и <em>как</em> QueryNode кэширует эти компоненты.</p>
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
    </button></h3><p>В режиме многоуровневого хранения рабочий процесс состоит из следующих этапов:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс загрузки узла Querynode</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Фаза 1: Ленивая загрузка</h4><p>При инициализации Milvus выполняет ленивую загрузку, кэшируя только метаданные на уровне сегментов, такие как определения схем, информация об индексах и сопоставления чанков.</p>
<p>Фактические данные полей и файлы индексов на этом этапе не кэшируются. Благодаря этому коллекции становятся доступными для запросов практически сразу после запуска, а потребление памяти и диска остается минимальным.</p>
<p>Поскольку данные полей и индексные файлы остаются в удаленном хранилище до первого обращения к ним, при <em>первом запросе</em> может возникнуть дополнительная задержка, поскольку необходимые данные должны быть получены по запросу. Чтобы смягчить этот эффект для критически важных полей или индексов, можно использовать стратегию <a href="/docs/ru/tiered-storage-overview.md#Phase-2-Warm-up">Warm Up</a> для их предварительной загрузки до того, как сегмент станет доступным для запросов.</p>
<p><strong>Конфигурация</strong></p>
<p>Автоматически применяется при включении многоуровневого хранения. Ручная настройка не требуется.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Этап 2: разогрев</h4><p>Чтобы уменьшить задержку при первом попадании, возникающую при <a href="/docs/ru/tiered-storage-overview.md#Phase-1-Lazy-load">ленивой загрузке</a>, Milvus предоставляет механизм <em>Warm Up</em>.</p>
<p>Прежде чем сегмент станет доступным для запросов, Milvus может заблаговременно получить и кэшировать определенные поля или индексы из объектного хранилища, гарантируя, что первый запрос напрямую обратится к кэшированным данным, а не вызовет загрузку по требованию.</p>
<p>Во время прогрева поля будут предварительно загружены на уровне чанков, а индексы - на уровне сегментов.</p>
<p><strong>Конфигурация</strong></p>
<p>Настройки Warm Up определяются в разделе Tiered Storage на сайте <code translate="no">milvus.yaml</code>. Вы можете включить или отключить предварительную загрузку для каждого типа полей или индексов и указать предпочтительную стратегию. Подробные настройки см. в разделе <a href="/docs/ru/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Этап 3: Частичная загрузка</h4><p>После начала запросов или поиска узел QueryNode выполняет <em>частичную загрузку</em>, извлекая из хранилища объектов только необходимые фрагменты данных или файлы индексов.</p>
<ul>
<li><p><strong>Поля</strong>: Загружаются по требованию на <strong>уровне чанков</strong>. Извлекаются только те блоки данных, которые соответствуют текущим условиям запроса, что минимизирует ввод-вывод и использование памяти.</p></li>
<li><p><strong>Индексы</strong>: Загружаются по требованию на <strong>уровне сегментов</strong>. Файлы индексов должны загружаться как целые единицы и не могут быть разделены на фрагменты.</p></li>
</ul>
<p><strong>Конфигурация</strong></p>
<p>Частичная загрузка применяется автоматически, если включено многоуровневое хранение. Ручная настройка не требуется. Для минимизации задержки при первом попадании критически важных данных сочетайте с <a href="/docs/ru/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Фаза 4: Выселение</h4><p>Для поддержания нормального использования ресурсов Milvus автоматически освобождает неиспользуемые кэшированные данные при достижении определенных пороговых значений.</p>
<p>Вытеснение происходит в соответствии с политикой <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">наименее часто используемых данных (LRU)</a>, что гарантирует, что редко используемые данные будут удаляться первыми, а активные данные останутся в кэше.</p>
<p>Вытеснение регулируется следующими настраиваемыми параметрами:</p>
<ul>
<li><p><strong>Водяные знаки</strong>: Определите пороговые значения для памяти или диска, которые запускают и останавливают вытеснение.</p></li>
<li><p><strong>TTL кэша</strong>: удаление устаревших кэшированных данных после определенного периода бездействия.</p></li>
</ul>
<p><strong>Конфигурация</strong></p>
<p>Включите и настройте параметры выселения в файле <strong>milvus.yaml</strong>. Подробную информацию о настройке см. в разделе <a href="/docs/ru/eviction.md">Выселение</a>.</p>
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
<li><p><strong>Настройка Warm Up</strong> - оптимизация предварительной загрузки для ваших шаблонов доступа. См. раздел <a href="/docs/ru/warm-up.md">"Теплая загрузка</a>".</p></li>
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
    </button></h3><p>Нет. Сохранность данных по-прежнему обеспечивается удаленным хранилищем объектов. Tiered Storage управляет кэшированием только на узлах запросов.</p>
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
<li><p>Ресурсы QueryNode используются совместно с другими рабочими нагрузками, поэтому Tiered Storage не может правильно оценить фактическую доступную емкость.</p></li>
</ul>
<p>Чтобы решить эту проблему, рекомендуется выделять специальные ресурсы для узлов QueryNode.</p>
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
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Почему задержка поиска/запроса увеличивается после включения многоуровневого хранилища?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
<li><p>Частые запросы к холодным данным, которые приходится извлекать из хранилища.</p></li>
<li><p>Водяные знаки установлены слишком близко друг к другу, что приводит к частому синхронному вытеснению.</p></li>
</ul>
