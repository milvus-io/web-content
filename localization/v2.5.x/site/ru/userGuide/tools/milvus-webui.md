---
id: milvus-webui.md
summary: >-
  Milvus Web UI - это графический инструмент управления для Milvus. Он улучшает
  наблюдаемость системы благодаря простому и интуитивно понятному интерфейсу. Вы
  можете
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI - это графический инструмент управления для Milvus. Он повышает наблюдаемость системы благодаря простому и интуитивно понятному интерфейсу. С помощью Milvus Web UI можно просматривать статистику и метрики компонентов и зависимостей Milvus, проверять детали базы данных и коллекции, а также выводить список подробных конфигураций Milvus.</p>
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
    </button></h2><p>Milvus Web UI отличается от Birdwatcher и Attu тем, что это встроенный инструмент, обеспечивающий общую наблюдаемость системы с помощью простого и интуитивно понятного интерфейса.</p>
<p>В следующей таблице приведено сравнение возможностей Milvus Web UI и Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Характеристика</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Операционная форма</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Целевые пользователи</td><td>Мейнтейнеры, разработчики</td><td>Мейнтейнеры</td><td>Разработчики</td></tr>
<tr><td>Установка</td><td>Встроенный</td><td>Автономный инструмент</td><td>Автономный инструмент</td></tr>
<tr><td>Зависимости</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Основные функциональные возможности</td><td>Среда выполнения, детали базы данных/коллекции, сегменты, каналы, задачи и медленные запросы</td><td>Проверка метаданных и выполнение Milvus API</td><td>Управление базой данных и оперативные задачи</td></tr>
<tr><td>Доступно с</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>Начиная с версии 2.5.0, вы можете получить доступ к Milvus Web UI, используя следующий URL на работающем экземпляре Milvus:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI предоставляет следующие возможности:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Обзор Milvus Web UI</span> </span></p>
<ul>
<li><p><a href="#Home">Главная страница</a></p>
<p>Вы можете найти информацию о текущем запущенном экземпляре Milvus, его компонентах, подключенных клиентах и зависимостях.</p></li>
<li><p><a href="#Collections">Коллекции</a></p>
<p>Вы можете просмотреть список баз данных и коллекций, находящихся в Milvus, и проверить их детали.</p></li>
<li><p><a href="#Query">Запрос</a></p>
<p>Вы можете просмотреть собранную статистику узлов запросов и координаторов запросов по сегментам, каналам, репликам и группам ресурсов.</p></li>
<li><p><a href="#Data">Данные</a></p>
<p>Вы можете просмотреть собранную статистику узлов данных в терминах сегментов и каналов.</p></li>
<li><p><a href="#Tasks">Задачи</a></p>
<p>Вы можете просмотреть список задач, запущенных в Milvus, включая задачи планировщика Querycoord, задачи уплотнения, задачи построения индексов, задачи импорта и задачи синхронизации данных.</p></li>
<li><p><a href="#Slow-requests">Медленные запросы</a></p>
<p>Вы можете просмотреть список медленных запросов в Milvus, включая тип запроса, длительность запроса и параметры запроса.</p></li>
<li><p><a href="#Configurations">Конфигурации</a></p>
<p>Вы можете просмотреть список конфигураций Milvus и их значения.</p></li>
<li><p><a href="#Tools">Инструменты</a></p>
<p>Из веб-интерфейса можно получить доступ к двум встроенным инструментам, pprof и инструменту визуализации данных Milvus.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Главная<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>На главной странице вы можете найти следующую информацию:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Home</span> </span></p>
<ul>
<li><p><strong>Информация о системе</strong>: Просмотр информации о системе, включая сведения о режиме развертывания, образе, используемом при развертывании, и сопутствующей информации.</p></li>
<li><p><strong>Информация о компонентах</strong>: Просмотр состояния и метрик компонентов Milvus, включая состояние и метрики узлов запросов, узлов данных, узлов индексов, координаторов и прокси.</p></li>
<li><p><strong>Подключенные клиенты</strong>: Просмотр подключенных клиентов и информации о них, включая тип и версию SDK, имя пользователя и историю доступа.</p></li>
<li><p><strong>Системные зависимости</strong>: Просмотр состояния и метрик зависимостей Milvus, включая состояние и метрики метахранилища, очереди сообщений и хранилища объектов.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Коллекции<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>На странице "Коллекции" можно просмотреть список баз данных и коллекций, находящихся в Milvus, и узнать их подробную информацию.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Коллекции Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>База данных</strong>: Просмотр списка баз данных, находящихся в Milvus, и сведений о них.</p></li>
<li><p><strong>Коллекция</strong>: Просмотр списка коллекций в каждой базе данных и их подробной информации.</p>
<p>Вы можете щелкнуть коллекцию, чтобы просмотреть ее детали, включая количество полей, разделы, индексы и другую подробную информацию.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Сведения о коллекции</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Запрос<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Страница запроса в Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Сегменты</strong>: Просмотр списка сегментов и их подробной информации, включая идентификатор сегмента, соответствующую коллекцию, состояние, размер и т. д.</p></li>
<li><p><strong>Каналы</strong>: Просмотр списка каналов и их подробной информации, включая название канала, соответствующие коллекции и т. д.</p></li>
<li><p><strong>Реплики</strong>: Просмотр списка реплик и их сведений, включая идентификатор реплики, соответствующую коллекцию и т. д.</p></li>
<li><p><strong>Группы ресурсов</strong>: Просмотр списка групп ресурсов и их сведений, включая имя группы ресурсов, количество узлов запросов в группе, ее конфигурации и т. д.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Данные<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Страница данных Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Сегменты</strong>: Просмотр списка сегментов из узлов данных/координаторов и их подробной информации, включая идентификатор сегмента, соответствующую коллекцию, состояние, размер и т. д.</p></li>
<li><p><strong>Каналы</strong>: Просмотр списка каналов из узлов/координаторов данных и их подробной информации, включая название канала, соответствующие коллекции и т. д.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Задачи<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Страница задач Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Задачи</strong>: Просмотр списка задач, запущенных в Milvus, включая тип задачи, состояние и действия.</p>
<ul>
<li><p><strong>Задачи QueryCoord</strong>: Просмотр всех задач планировщика QueryCoord, включая задачи балансировщика, проверки индексов/сегментов/каналов/лидеров за последние 15 минут.</p></li>
<li><p><strong>Compaction Tasks (Задачи уплотнения</strong>): Просмотр всех задач по уплотнению данных от координаторов данных за последние 15 минут.</p></li>
<li><p><strong>Index-Building Tasks</strong>: Просмотр всех задач построения индексов от координаторов данных за последние 30 минут.</p></li>
<li><p><strong>Import Tasks (Задачи импорта</strong>): Просмотр всех задач импорта от координаторов данных за последние 30 минут.</p></li>
<li><p><strong>Задачи синхронизации данных</strong>: Просмотр всех задач синхронизации данных от узлов данных за последние 15 минут.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Медленные запросы<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Страница медленных запросов Milvus Web UI</span> </span></p>
<ul>
<li><strong>Медленные запросы</strong>: Медленный запрос - это поиск или запрос, задержка которого превышает значение <code translate="no">proxy.slowQuerySpanInSeconds</code>, указанное в конфигурации. В списке медленных запросов отображаются все медленные запросы за последние 15 минут.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Конфигурации<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Страница конфигураций Milvus Web UI</span> </span></p>
<ul>
<li><strong>Конфигурации</strong>: Просмотр списка конфигураций времени выполнения Milvus и их значений.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Инструменты<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: доступ к инструменту pprof для профилирования и отладки Milvus.</p></li>
<li><p><strong>Инструмент визуализации данных Milvus</strong>: Доступ к инструменту визуализации данных Milvus для визуализации данных в Milvus.</p></li>
</ul>
