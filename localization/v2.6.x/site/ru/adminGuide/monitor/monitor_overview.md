---
id: monitor_overview.md
title: Обзор монитора
related_key: 'monitor, alert'
summary: >-
  Узнайте, как Prometheus и Grafana используются в Milvus для мониторинга и
  оповещения.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Обзор системы мониторинга Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме рассказывается о том, как Milvus использует Prometheus для мониторинга показателей и Grafana для визуализации показателей и создания оповещений.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus в Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> - это набор инструментов мониторинга и оповещения с открытым исходным кодом для реализации Kubernetes. Он собирает и хранит метрики в виде временных рядов. Это означает, что метрики хранятся с временными метками при записи, а также с дополнительными парами ключ-значение, называемыми метками.</p>
<p>В настоящее время Milvus использует следующие компоненты Prometheus:</p>
<ul>
<li>Конечная точка Prometheus для получения данных из конечных точек, установленных экспортерами.</li>
<li>Оператор Prometheus для эффективного управления экземплярами мониторинга Prometheus.</li>
<li>Kube-prometheus для обеспечения простого в управлении сквозного мониторинга кластера Kubernetes.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Имена метрик</h3><p>Правильное имя метрики в Prometheus состоит из трех элементов: пространства имен, подсистемы и имени. Эти три элемента соединяются символом "_".</p>
<p>Пространство имен метрик Milvus, отслеживаемых Prometheus, - "milvus". В зависимости от роли, к которой принадлежит метрика, ее подсистема должна быть одной из следующих восьми ролей: "rootcoord", "proxy", "querycoord", "querynode", "indexcoord", "indexnode", "datacoord", "datanode".</p>
<p>Например, метрика Milvus, которая подсчитывает общее количество запрошенных векторов, называется <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Типы метрик</h3><p>Prometheus поддерживает четыре типа метрик:</p>
<ul>
<li>Счетчик: тип кумулятивной метрики, значение которой может только увеличиваться или обнуляться при перезапуске.</li>
<li>Манометр: тип метрики, значение которой может как увеличиваться, так и уменьшаться.</li>
<li>Гистограмма: тип метрик, которые подсчитываются на основе настраиваемых бакетов. Частым примером является длительность запроса.</li>
<li>Сводка: тип метрики, похожий на гистограмму, который вычисляет настраиваемые квантили в скользящем временном окне.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Метки метрик</h3><p>Prometheus различает выборки с одинаковыми именами метрик путем их маркировки. Метка - это определенный атрибут метрики. Метрики с одинаковыми именами должны иметь одинаковое значение для поля <code translate="no">variable_labels</code>. В следующей таблице перечислены названия и значения общих меток метрик Milvus.</p>
<table>
<thead>
<tr><th>Имя метки</th><th>Определение</th><th>Значения</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>Уникальный идентификатор роли.</td><td>Глобально уникальный идентификатор, генерируемый milvus.</td></tr>
<tr><td>"status"</td><td>Статус обработанной операции или запроса.</td><td>"abandon", "success" или "fail".</td></tr>
<tr><td>"query_type"</td><td>Тип запроса на чтение.</td><td>"поиск" или "запрос".</td></tr>
<tr><td>"msg_type"</td><td>Тип сообщений.</td><td>"вставка", "удаление", "поиск" или "запрос".</td></tr>
<tr><td>"segment_state"</td><td>Статус сегмента.</td><td>"Запечатан", "растет", "промыт", "промывка", "сброшен" или "импортируется".</td></tr>
<tr><td>"cache_state"</td><td>Состояние кэшированного объекта.</td><td>"Попадание" или "Промах".</td></tr>
<tr><td>"имя_кэша"</td><td>Имя кэшированного объекта. Эта метка используется вместе с меткой "cache_state".</td><td>Например, "CollectionID", "Schema" и т. д.</td></tr>
<tr><td>"имя_канала"</td><td>Физические темы в хранилище сообщений (Pulsar или Kafka).</td><td>Например, "by-dev-rootcoord-dml_0", "by-dev-rootcoord-dml_255" и т. д.</td></tr>
<tr><td>"имя_функции"</td><td>Имя функции, которая обрабатывает определенные запросы.</td><td>Например, "CreateCollection", "CreatePartition", "CreateIndex" и т. д.</td></tr>
<tr><td>"имя_пользователя"</td><td>Имя пользователя, используемое для аутентификации.</td><td>Имя пользователя по вашему усмотрению.</td></tr>
<tr><td>"index_task_status"</td><td>Статус индексной задачи в метахранилище.</td><td>"Невыполненная", "В процессе", "Не удалось", "Завершена" или "Переработана".</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana в Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> - это стек визуализации с открытым исходным кодом, который может подключаться ко всем источникам данных. Выводя метрики, он помогает пользователям понимать, анализировать и контролировать массивные данные.</p>
<p>Milvus использует настраиваемые панели Grafana для визуализации метрик.</p>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>После изучения базового рабочего процесса мониторинга и оповещения вы узнаете:</p>
<ul>
<li><a href="/docs/ru/monitor.md">Развертывать службы мониторинга</a></li>
<li><a href="/docs/ru/visualize.md">Визуализировать метрики Milvus</a></li>
<li><a href="/docs/ru/alert.md">Создавать оповещения</a></li>
</ul>
