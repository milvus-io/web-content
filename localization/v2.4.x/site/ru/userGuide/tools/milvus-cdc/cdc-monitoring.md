---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC предоставляет широкие возможности мониторинга с помощью приборных
  панелей Grafana.
title: Мониторинг
---
<h1 id="Monitoring" class="common-anchor-header">Мониторинг<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC предоставляет широкие возможности мониторинга с помощью панелей Grafana, позволяя визуализировать ключевые показатели и обеспечивать бесперебойную работу задач Change Data Capture (CDC) и состояние сервера.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Метрики для задач CDC</h3><p>Чтобы начать работу, импортируйте файл <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> в Grafana. Это добавит приборную панель, специально разработанную для мониторинга состояния задач CDC.</p>
<p><strong>Обзор приборной панели CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Ключевые метрики с пояснениями:</strong></p>
<ul>
<li><p><strong>Задача</strong>: Количество задач CDC в различных состояниях, включая <strong>начальное</strong>, <strong>запущенное</strong> и <strong>приостановленное</strong>.</p></li>
<li><p><strong>Request Total</strong>: общее количество запросов, полученных Milvus-CDC.</p></li>
<li><p><strong>Успех запроса</strong>: Количество успешных запросов, полученных Milvus-CDC.</p></li>
<li><p><strong>количество задач</strong>: Количество задач в <strong>начальном</strong>, <strong>приостановленном</strong> и <strong>запущенном</strong> состояниях с течением времени.</p></li>
<li><p><strong>состояние задачи</strong>: Состояние отдельных задач.</p></li>
<li><p><strong>request count</strong>: Количество успешных и общих запросов.</p></li>
<li><p><strong>задержка запроса</strong>: Задержка запросов через p99, среднее значение и другая статистика.</p></li>
<li><p><strong>replicate data rate</strong>: Скорость передачи данных репликации для операций чтения/записи</p></li>
<li><p><strong>replicate tt lag</strong>: Задержка времени репликации для операций чтения/записи.</p></li>
<li><p><strong>api execute count</strong>: Количество раз, когда были выполнены различные API Milvus-CDC.</p></li>
<li><p><strong>center ts</strong>: Временная метка для задач чтения/записи.</p></li>
</ul>
