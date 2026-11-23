---
id: monitor_overview.md
title: Обзор монитора
related_key: 'monitor, alert'
summary: >-
  Узнайте, как в Milvus используются Prometheus и Grafana для мониторинга и
  оповещения о состоянии сервисов.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Обзор платформы мониторинга Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом разделе объясняется, как Milvus использует Prometheus для мониторинга метрик, а Grafana — для их визуализации и создания оповещений.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> — это набор инструментов с открытым исходным кодом для мониторинга и оповещения в средах Kubernetes. Он собирает и хранит метрики в виде временных рядов. Это означает, что метрики хранятся с отметками времени, с которыми они были записаны, а также с дополнительными парами «ключ-значение», называемыми метками.</p>
<p>В настоящее время Milvus использует следующие компоненты Prometheus:</p>
<ul>
<li>Конечная точка Prometheus для извлечения данных из конечных точек, заданных экспортерами.</li>
<li>Оператор Prometheus для эффективного управления экземплярами мониторинга Prometheus.</li>
<li>Kube-prometheus для обеспечения простого в использовании сквозного мониторинга кластера Kubernetes.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Имена метрик<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Допустимое имя метрики в Prometheus состоит из трёх элементов: пространства имён, подсистемы и имени. Эти три элемента соединяются символом «_».</p>
<p>Пространство имён метрик Milvus, мониторинг которых осуществляет Prometheus, — «milvus». Подсистемой метрики является одно из следующих значений: «cdc», «cgo», «datacoord», «datanode», «indexnode», «logging», «meta», «msg_queue», «msgstream», «proxy», «querycoord», «querynode», «rootcoord», «storage», «streaming», «streamingcoord», «streamingnode» и «wal». Некоторые метрики, такие как <code translate="no">milvus_build_info</code> и <code translate="no">milvus_num_node</code>, не имеют подсистемы.</p>
<p>Например, метрика Milvus, которая вычисляет общее количество векторов, по которым выполнялись запросы, называется <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Типы метрик<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus поддерживает четыре типа метрик:</p>
<ul>
<li>Counter: тип накопительных метрик, значение которых может только увеличиваться или сбрасываться в ноль при перезапуске.</li>
<li>Gauge: тип метрик, значение которых может как увеличиваться, так и уменьшаться.</li>
<li>Гистограмма (Histogram): тип метрик, подсчёт которых осуществляется на основе настраиваемых интервалов. Типичным примером является продолжительность запроса.</li>
<li>Сводка (Summary): тип метрик, аналогичный гистограмме, который вычисляет настраиваемые квантили в скользящем временном окне.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Метки метрик<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus различает выборки с одинаковым именем метрики с помощью меток. Метка — это определённый атрибут метрики. Метрики с одинаковым именем должны иметь одинаковое значение для поля « <code translate="no">variable_labels</code> ». В следующей таблице приведены названия и значения распространённых меток метрик Milvus.</p>
<table>
<thead>
<tr><th>Название метки</th><th>Определение</th><th>Значения</th></tr>
</thead>
<tbody>
<tr><td>«node_id»</td><td>Уникальный идентификатор роли.</td><td>Глобально уникальный идентификатор, сгенерированный milvus.</td></tr>
<tr><td>«status»</td><td>Статус обработанной операции или запроса.</td><td>«abandon», «success» или «fail».</td></tr>
<tr><td>«query_type»</td><td>Тип запроса на чтение.</td><td>«search» или «query».</td></tr>
<tr><td>«msg_type»</td><td>Тип сообщений.</td><td>«insert», «delete», «search» или «query».</td></tr>
<tr><td>«segment_state»</td><td>Состояние сегмента.</td><td>«Sealed», «Growing», «Flushed», «Flushing», «Dropped» или «Importing».</td></tr>
<tr><td>«cache_state»</td><td>Состояние объекта в кэше.</td><td>«hit» или «miss».</td></tr>
<tr><td>«cache_name»</td><td>Имя объекта в кэше. Этот ярлык используется вместе с ярлыком «cache_state».</td><td>Например: «CollectionID», «Schema» и т. д.</td></tr>
<tr><td>«channel_name»</td><td>Физические темы в хранилище сообщений (Pulsar или Kafka).</td><td>Например: «by-dev-rootcoord-dml_0», «by-dev-rootcoord-dml_255» и т. д.</td></tr>
<tr><td>«function_name»</td><td>Имя функции, обрабатывающей определённые запросы.</td><td>Например: «CreateCollection», «CreatePartition», «CreateIndex» и т. д.</td></tr>
<tr><td>«user_name»</td><td>Имя пользователя, используемое для аутентификации.</td><td>Имя пользователя по вашему усмотрению.</td></tr>
<tr><td>«index_task_status»</td><td>Статус задачи индексирования в мета-хранилище.</td><td>«unissued», «in-progress», «failed», «finished» или «recycled».</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> — это стек визуализации с открытым исходным кодом, который может подключаться ко всем источникам данных. Отображая метрики, он помогает пользователям понимать, анализировать и отслеживать большие объемы данных.</p>
<p>Milvus использует настраиваемые дашборды Grafana для визуализации метрик.</p>
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
    </button></h2><p>Ознакомившись с основным рабочим процессом мониторинга и оповещения, изучите:</p>
<ul>
<li><a href="/docs/ru/monitor.md">Развертывать службы мониторинга</a></li>
<li><a href="/docs/ru/visualize.md">Визуализировать метрики Milvus</a></li>
<li><a href="/docs/ru/alert.md">Создание оповещения</a></li>
</ul>
