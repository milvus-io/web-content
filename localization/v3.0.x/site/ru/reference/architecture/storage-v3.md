---
id: storage-v3.md
title: Хранение V3Compatible with Milvus 3.0.x
summary: >-
  Узнайте, для каких функций Milvus 3.0 требуется Storage V3, как его включить и
  какие ограничения по совместимости действуют.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Хранение V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Наборы данных для искусственного интеллекта часто развиваются после создания коллекции. По мере изменения моделей и рабочих процессов командам может потребоваться добавить текст, сгенерировать новые векторные поля для существующих сущностей или использовать данные, хранящиеся за пределами Milvus. Для поддержки таких рабочих процессов требуется модель хранения, способная развиваться вместе с набором данных.</p>
<p>Хранение V3 предоставляет такую модель в Milvus 3.0. Оно использует версионированную структуру хранения, позволяющую включать данные, добавленные или перезаписанные с течением времени, при этом приложения продолжают получать доступ к коллекциям через те же API Milvus.</p>
<p>Хранение V3 по умолчанию отключено. После вступления в силу команды « <code translate="no">common.storage.useLoonFFI</code> » новые записи и результаты уплотнения будут использовать хранение V3. Существующие данные остаются в текущей структуре до тех пор, пока подходящие данные не будут перезаписаны в ходе фонового уплотнения. Во время этого перехода Milvus может считывать данные из обеих структур. Включите хранение V3 для использования функций, которые от него зависят, а не в целях общей оптимизации производительности.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Форматы данных в Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 использует манифесты для описания данных коллекции независимо от базового формата данных. Это позволяет одному и тому же уровню хранения работать как с данными, управляемыми Milvus, так и с данными, которые остаются во внешней системе.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Форматы файлов управляемых коллекций<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Для управляемых коллекций в « <code translate="no">dataNode.storage.format</code> » выбирается формат файлов для новых данных Storage V3. Этот параметр поддерживает следующие значения:</p>
<table>
<thead>
<tr><th>Формат</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Стандартный, широко используемый столбцовый формат файлов, отличающийся широкой совместимостью с экосистемой и наличием отлаженного набора инструментов. Parquet организует данные в группы строк и поддерживает кодирование и сжатие по столбцам, что позволяет Milvus считывать только необходимые столбцы и эффективно обрабатывать большие последовательные сканирования.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Дополнительный столбцовый формат файлов нового поколения, построенный на основе расширяемых, комбинируемых кодировок и обширной статистики. В Milvus формат Vortex поддерживает проекцию столбцов, чтение по диапазонам и чтение с произвольным доступом. Эти возможности позволяют сократить количество ненужных операций чтения данных для подходящих рабочих нагрузок.</td></tr>
</tbody>
</table>
<p>Изменение параметра ` <code translate="no">dataNode.storage.format</code> ` влияет на новые записи в Storage V3. Существующие файлы сохраняют свой текущий формат до тех пор, пока уплотнение не перезапишет соответствующие сегменты. В большинстве развертываний следует сохранять формат по умолчанию ` <code translate="no">parquet</code> `, если только репрезентативные тесты не покажут, что формат ` <code translate="no">vortex</code> ` лучше подходит для их данных и моделей доступа.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Внешние коллекции и поддерживаемые форматы источников<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Внешние коллекции позволяют Milvus использовать данные, хранящиеся во внешних файлах или таблицах. Storage V3 поддерживает следующие форматы внешних источников:</p>
<table>
<thead>
<tr><th>Формат</th><th>Категория</th><th>Ожидаемый источник</th><th>Поддержка Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Формат файла</td><td>Каталог или префикс объектного хранилища, содержащий файлы Parquet.</td><td>Обнаруживает файлы, считывает их метаданные и группы строк, а также записывает их в манифест Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Формат файла</td><td>Каталог или префикс объектного хранилища, содержащий файлы Vortex.</td><td>Обнаруживает файлы и использует структуру и статистику Vortex для проекции, чтения диапазонов и чтения с произвольным доступом.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Формат таблицы</td><td>Каталог наборов данных Lance.</td><td>Считывает метаданные набора данных и сопоставляет его фрагменты с манифестом Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Формат таблицы</td><td>Файл метаданных Iceberg в формате JSON и идентификатор моментального снимка.</td><td>Определяет указанный снимок, планирует его файлы данных и сохраняет метаданные удаления по позиции. Удаления по равенству не поддерживаются и должны быть преобразованы в удаления по позиции перед обновлением внешней коллекции.</td></tr>
</tbody>
</table>
<p>Внешние источники доступны только для чтения. Storage V3 создает и обновляет собственный манифест, не изменяя и не копируя исходные данные. Затем Milvus может создавать индексы и выполнять поиск и запросы по данным через внешнюю коллекцию.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Облачное хранилище и аутентификация между учетными записями</h4><p>В приведенной ниже таблице описано только то, как внешняя коллекция получает доступ к исходным данным, хранящимся в другой облачной учетной записи. В ней не описывается объектное хранилище, используемое для данных, управляемых Milvus.</p>
<table>
<thead>
<tr><th>Облачное хранилище</th><th>Поддерживаемые внешние форматы</th><th>Межаккаунтная аутентификация для внешних коллекций</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Все четыре формата, перечисленные выше.</td><td>Укажите ARN роли IAM, принадлежащей клиенту. Storage V3 использует AWS STS <code translate="no">AssumeRole</code> для получения временных учетных данных и обновляет их по мере необходимости. Вы также можете предоставить внешний идентификатор, если это требуется политикой доверия роли.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Все четыре формата, перечисленные выше.</td><td>Укажите целевую служебную учетную запись. Storage V3 действует от имени этой служебной учетной записи, использует ее кратковременные токены доступа OAuth для доступа к исходному корзине и обновляет токены до истечения их срока действия.</td></tr>
<tr><td>Хранилище BLOB-объектов Azure</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> и <code translate="no">lance-table</code>. Формат <code translate="no">iceberg-table</code> не поддерживается.</td><td>Milvus запрашивает краткосрочные учетные данные SAS через частный сервис gRPC <code translate="no">milvus-tools</code>. Storage V3 использует учетные данные SAS для доступа к исходному контейнеру, и эти учетные данные обновляются до истечения их срока действия.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Все четыре перечисленные выше формата.</td><td>Milvus запрашивает краткосрочные учетные данные SAS через частный сервис gRPC <code translate="no">milvus-tools</code>. Storage V3 использует учетные данные SAS для доступа к исходному контейнеру, и эти учетные данные обновляются до истечения срока их действия.</td></tr>
<tr><td>Служба объектного хранения Alibaba Cloud (OSS)</td><td>Все четыре формата, перечисленные выше.</td><td>Укажите ARN роли RAM, принадлежащей клиенту. Storage V3 принимает на себя эту роль, используя идентификатор рабочей нагрузки среды выполнения или роль RAM ECS, а затем использует временные учетные данные для доступа к исходному корзине.</td></tr>
</tbody>
</table>
<p>Инструкции по настройке и использованию внешней коллекции см. в разделе <a href="/docs/ru/create-an-external-collection.md">«Создание внешней коллекции</a>».</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Функции, требующие Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Функция</th><th>Описание</th><th>Требуемая конфигурация</th></tr>
</thead>
<tbody>
<tr><td>Формат файлов Vortex</td><td>Запись новых данных управляемой коллекции в формате Vortex.</td><td><ul><li><a href="/docs/ru/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/ru/text.md"><code translate="no">TEXT</code> поле</a></td><td>Хранение длинного исходного текста, такого как отрывки, документы, заявки или журналы, без установки фиксированной максимальной длины в схеме коллекции.</td><td><a href="/docs/ru/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ru/add-fields-to-an-existing-collection.md">Векторные поля, сгенерированные функциями</a></td><td>Добавьте функцию BM25 или MinHash к существующей коллекции, чтобы Milvus сгенерировал новое векторное поле на основе существующего поля « <code translate="no">VARCHAR</code> ». Milvus асинхронно заполняет сгенерированные значения для существующих сущностей посредством фоновой компактизации.</td><td><ul><li><a href="/docs/ru/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ru/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ru/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/ru/create-an-external-collection.md">Внешние коллекции</a></td><td>Выполняйте запросы к данным, хранящимся за пределами Milvus, без их копирования в управляемую коллекцию. Обновляйте внешнюю коллекцию при изменении исходных данных. Чтобы сделать доступными дополнительные исходные поля, см. раздел <a href="/docs/ru/alter-external-collection-schema.md">«Изменение схемы внешней коллекции</a>».</td><td><a href="/docs/ru/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Перед включением Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>После того как Milvus запишет данные в Storage V3, переход на более раннюю версию Milvus, не поддерживающую чтение данных из Storage V3, не допускается. Отключение Storage V3 впоследствии не приводит к немедленному преобразованию всех существующих данных Storage V3 или восстановлению совместимости со старой версией.</p>
</div>
<p>Перед включением Storage V3 учтите следующие особенности поведения данных:</p>
<ul>
<li>Поскольку функция « <code translate="no">dataCoord.compaction.storageVersion.enabled</code> » включена по умолчанию, подходящие существующие данные могут постепенно переноситься в Storage V3 посредством фоновой уплотнения.</li>
<li>Отключение Storage V3 изменяет целевую версию хранилища для будущих записей и подходящих результатов уплотнения. Оно не приводит к синхронному преобразованию всех существующих данных Storage V3 и не гарантирует безопасность перехода на более раннюю версию.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Включение Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Установите для параметра « <code translate="no">common.storage.useLoonFFI</code> » значение « <code translate="no">true</code> » в конфигурации Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus рассматривает этот параметр как обновляемый. Примените изменение с помощью рабочего процесса обновления конфигурации, поддерживаемого вашим развертыванием. Простое редактирование статического файла конфигурации не гарантирует, что запущенное развертывание получило новое значение.</p>
<p>Если вы планируете добавить функцию и сгенерированное ею векторное поле в существующую коллекцию, также включите два параметра уплотнения, необходимых для заполнения существующих данных:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вывод функции для существующих сущностей генерируется асинхронно посредством фоновой уплотнения. Успешное обновление схемы не означает, что заполнение данных для всех существующих сущностей завершено.</p>
<h2 id="Related-documentation" class="common-anchor-header">Связанная документация<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/ru/text.md">Текстовое поле</a></li>
<li><a href="/docs/ru/add-fields-to-an-existing-collection.md">Изменение схемы коллекции</a></li>
<li><a href="/docs/ru/create-an-external-collection.md">Создание внешней коллекции</a></li>
<li><a href="/docs/ru/install-overview.md">Обзор вариантов развертывания Milvus</a></li>
<li><a href="/docs/ru/upgrade_milvus_standalone-helm.md">Обновление автономной версии Milvus с помощью Helm Chart</a></li>
<li><a href="/docs/ru/upgrade_milvus_cluster-helm.md">Обновление кластера Milvus с помощью диаграммы Helm</a></li>
<li><a href="/docs/ru/configure_common.md">Общие настройки</a></li>
<li><a href="/docs/ru/configure_datacoord.md">Настройки, связанные с dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Почему мы создали Loon: механизм хранения данных для ИИ, которые постоянно меняются</a> — технические подробности о мотивах проектирования Storage V3.</li>
</ul>
