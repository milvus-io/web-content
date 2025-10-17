---
id: warm-up.md
title: Warm UpCompatible with Milvus 2.6.4+
summary: >-
  В Milvus функция Warm Up дополняет Tiered Storage, устраняя задержки при
  первом обращении к холодным данным, которые возникают при первом обращении к
  ним. После настройки Warm Up предварительно загружает выбранные поля или
  индексы в кэш до того, как сегмент станет доступным для запроса, гарантируя,
  что часто используемые данные будут доступны сразу после загрузки.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Warm Up<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus функция <strong>Warm Up</strong> дополняет Tiered Storage, устраняя задержки при первом обращении к холодным данным, которые возникают при первом обращении к ним. После настройки Warm Up предварительно загружает выбранные поля или индексы в кэш до того, как сегмент станет доступным для запроса, гарантируя, что часто используемые данные будут доступны сразу после загрузки.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Зачем нужен Warm Up<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ru/tiered-storage-overview.md#Lazy-load">Ленивая загрузка</a> в многоуровневом хранилище повышает эффективность за счет первоначальной загрузки только метаданных. Однако это может привести к задержке при первом запросе к холодным данным, поскольку необходимые фрагменты или индексы должны быть извлечены из объектного хранилища.</p>
<p><strong>Функция Warm Up</strong> решает эту проблему путем упреждающего кэширования критических данных во время инициализации сегмента.</p>
<p>Это особенно полезно, когда:</p>
<ul>
<li><p>Определенные <strong>скалярные индексы</strong> часто используются в условиях фильтрации.</p></li>
<li><p><strong>Векторные индексы</strong> важны для производительности поиска и должны быть готовы немедленно.</p></li>
<li><p><strong>Задержка холодного старта</strong> после перезапуска QueryNode или загрузки нового сегмента неприемлема.</p></li>
</ul>
<p>В отличие от этого, Warm Up <strong>не рекомендуется</strong> использовать для полей или индексов, запрашиваемых нечасто. Отключение Warm Up сокращает время загрузки сегмента и экономит место в кэше - идеальный вариант для больших векторных полей или некритичных скалярных полей.</p>
<h2 id="Configuration" class="common-anchor-header">Конфигурация<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Управление Warm Up осуществляется в разделе <code translate="no">queryNode.segcore.tieredStorage.warmup</code> на странице <code translate="no">milvus.yaml</code>. Вы можете настроить его отдельно для скалярных полей, скалярных индексов, векторных полей и векторных индексов. Каждая цель поддерживает два режима:</p>
<table>
   <tr>
     <th><p>Режим</p></th>
     <th><p>Описание</p></th>
     <th><p>Типичный сценарий</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> (по умолчанию)</p></td>
     <td><p>Предварительная загрузка до того, как сегмент станет доступным для запроса. Время загрузки немного увеличивается, но первый запрос выполняется без задержек.</p></td>
     <td><p>Используйте для критически важных данных, которые должны быть доступны немедленно, например высокочастотные скалярные индексы или ключевые векторные индексы, используемые в поиске.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Пропустить предварительную загрузку. Сегмент становится доступным для запросов быстрее, но первый запрос может вызвать загрузку по требованию.</p></td>
     <td><p>Используйте для редко обращающихся или больших данных, таких как необработанные векторные поля или некритичные скалярные поля.</p></td>
   </tr>
</table>
<p><strong>Пример YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Значения</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой данных скалярных полей.</p></td>
     <td><p>Используйте <code translate="no">sync</code> только в том случае, если скалярные поля малы и часто используются в фильтрах. В противном случае используйте <code translate="no">disable</code>, чтобы сократить время загрузки.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой скалярных индексов.</p></td>
     <td><p>Используйте <code translate="no">sync</code> для скалярных индексов, участвующих в частых условиях фильтрации или запросах диапазона.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой данных векторных полей.</p></td>
     <td><p>Как правило, <code translate="no">disable</code> позволяет избежать интенсивного использования кэша. Включите <code translate="no">sync</code> только в тех случаях, когда необработанные векторы должны быть получены сразу после поиска (например, результаты сходства с отзывом векторов).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой векторных индексов.</p></td>
     <td><p>Используйте <code translate="no">sync</code> для векторных индексов, которые критичны к задержке поиска. При пакетной или низкочастотной нагрузке используйте <code translate="no">disable</code> для ускорения готовности сегментов.</p></td>
   </tr>
</table>
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
    </button></h2><p>Warm Up влияет только на <strong>начальную загрузку</strong>. Если кэшированные данные позже будут удалены, следующий запрос перезагрузит их по требованию.</p>
<ul>
<li><p>Избегайте чрезмерного использования <code translate="no">sync</code>. Предварительная загрузка слишком большого количества полей увеличивает время загрузки и нагрузку на кэш.</p></li>
<li><p>Начинайте консервативно - включайте Warm Up только для полей и индексов, к которым часто обращаются.</p></li>
<li><p>Следите за задержкой запросов и показателями кэша, а затем по мере необходимости расширяйте предварительную загрузку.</p></li>
<li><p>При смешанных рабочих нагрузках применяйте <code translate="no">sync</code> для коллекций, чувствительных к производительности, и <code translate="no">disable</code> для коллекций, ориентированных на емкость.</p></li>
</ul>
