---
id: disk_index.md
related_key: disk_index
summary: >-
  Механизм дисковых индексов в Milvus для оптимизированного под диск векторного
  поиска.
title: Индекс на диске
---
<h1 id="On-disk-Index" class="common-anchor-header">Индекс на диске<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой статье представлен DiskANN, алгоритм индексирования на диске для оптимизированного векторного поиска. Основанный на графах Vamana, DiskANN обеспечивает эффективный векторный поиск на диске в больших наборах данных.</p>
<p>Чтобы повысить производительность запросов, можно <a href="/docs/ru/index-vector-fields.md">указать тип индекса</a> для каждого векторного поля.</p>
<div class="alert note"> 
В настоящее время векторное поле поддерживает только один тип индекса. При переключении типа индекса Milvus автоматически удаляет старый индекс.</div>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать DiskANN в Milvus, обратите внимание, что</p>
<ul>
<li>Экземпляр Milvus работает под управлением Ubuntu 18.04.6 или более поздней версии.</li>
<li>Путь данных Milvus должен быть смонтирован на NVMe SSD для обеспечения полной производительности:<ul>
<li>Для автономного экземпляра Milvus путь к данным должен быть <strong>/var/lib/milvus/data</strong> в контейнере, в котором запущен экземпляр.</li>
<li>Для экземпляра Milvus Cluster путь к данным должен быть <strong>/var/lib/milvus/data</strong> в контейнерах, где работают QueryNodes и IndexNodes.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать DiskANN, убедитесь, что вы</p>
<ul>
<li>Используйте в данных только векторы с плавающей точкой и размерностью не менее 1.</li>
<li>Для измерения расстояния между векторами используйте только евклидово расстояние (L2), внутреннее произведение (IP) или COSINE.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Настройки индекса и поиска<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Параметры построения индекса</p>
<p>При построении индекса DiskANN в качестве типа индекса используйте <code translate="no">DISKANN</code>. Параметры индекса не требуются.</p></li>
<li><p>Параметры поиска</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Размер списка кандидатов, больший размер обеспечивает более высокий процент запоминания с ухудшением производительности.</td><td>[topk, int32_max].</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Конфигурации Milvus, связанные с DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN можно настраивать. Вы можете изменить параметры, связанные с DiskANN, в <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code>, чтобы улучшить его производительность.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон значений</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Максимальная степень графа Vamana. <br/> Большее значение обеспечивает более высокую скорость отзыва, но увеличивает размер и время построения индекса.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Размер списка кандидатов. <br/> Большее значение увеличивает время, затрачиваемое на построение индекса, но обеспечивает более высокий процент отзыва. <br/> Установите значение меньше, чем <code translate="no">MaxDegree</code>, если вам не нужно сокращать время построения индекса.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Ограничение на размер кода PQ. <br/> Большее значение обеспечивает более высокую скорость запоминания, но увеличивает потребление памяти.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Отношение кэшированных номеров узлов к исходным данным. <br/> Большее значение повышает производительность построения индексов, но увеличивает расход памяти.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Соотношение между максимальным количеством запросов ввода-вывода за итерацию поиска и количеством CPU.</td><td>[1, max(128 / количество CPU, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Устранение неполадок<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>Как справиться с ошибкой <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>Ядро Linux предоставляет функцию асинхронного неблокирующего ввода/вывода (AIO), которая позволяет процессу инициировать несколько операций ввода/вывода одновременно, не дожидаясь завершения ни одной из них. Это помогает увеличить производительность приложений, которые могут совмещать обработку и ввод-вывод.</p>
<p>Производительность можно настроить с помощью виртуального файла <code translate="no">/proc/sys/fs/aio-max-nr</code> в файловой системе proc. Параметр <code translate="no">aio-max-nr</code> определяет максимальное количество допустимых одновременных запросов.</p>
<p>Параметр <code translate="no">aio-max-nr</code> по умолчанию равен <code translate="no">65535</code>, вы можете установить его на <code translate="no">10485760</code>.</p></li>
</ul>
