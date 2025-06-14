---
id: visualize.md
title: Визуализация показателей
related_key: "monitor, alert"
summary: "Узнайте, как визуализировать метрики Milvus в Grafana."
---

<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Визуализация метрик Milvus в Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как визуализировать метрики Milvus с помощью Grafana.</p>
<p>Как описано в <a href="/docs/ru/v2.5.x/monitor.md">руководстве по мониторингу</a>, метрики содержат полезную информацию, например, о том, сколько памяти используется конкретным компонентом Milvus. Мониторинг метрик помогает лучше понять производительность Milvus и состояние его работы, чтобы своевременно корректировать распределение ресурсов.</p>
<p>Визуализация - это график, показывающий изменение использования ресурсов во времени, что позволяет быстро увидеть и заметить изменения в использовании ресурсов, особенно когда происходит какое-либо событие.</p>
<p>В этом руководстве используется Grafana, платформа с открытым исходным кодом для аналитики временных рядов, для визуализации различных показателей производительности кластера Milvus, развернутого на Kubernetes (K8s).</p>
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
    </button></h2><ul>
<li>Вы <a href="/docs/ru/v2.5.x/install_cluster-helm.md">установили кластер Milvus на K8s)</a>.</li>
<li>Вам необходимо <a href="/docs/ru/v2.5.x/monitor.md">настроить Prometheus</a> на мониторинг и сбор метрик, прежде чем использовать Grafana для визуализации метрик. Если настройка прошла успешно, вы можете получить доступ к Grafana по адресу <code translate="no">http://localhost:3000</code>. Также вы можете получить доступ к Grafana, используя стандартный адрес Grafana <code translate="no">user:password</code> <code translate="no">admin:admin</code> .</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Визуализация метрик с помощью Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Скачайте и импортируйте дашборд</h3><p>Загрузите и импортируйте дашборд Milvus из файла JSON.</p>
<pre><code translate="no">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/deployments/monitor/grafana/milvus-dashboard.json</span>
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Загрузить_и_импортировать</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Просмотр метрик</h3><p>Выберите экземпляр Milvus, который вы хотите отслеживать. После этого вы увидите панель компонентов Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Выбрать_экземпляр</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_panel</span> </span></p>
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
    </button></h2><ul>
<li>Если вы настроили Grafana на визуализацию метрик Milvus, вам также может быть интересно:<ul>
<li>Узнайте, как <a href="/docs/ru/v2.5.x/alert.md">создать оповещение для служб Milvus</a>.</li>
<li>Настроить <a href="/docs/ru/v2.5.x/allocate.md">распределение ресурсов</a></li>
<li><a href="/docs/ru/v2.5.x/scaleout.md">Масштабировать или увеличить масштаб кластера Milvus.</a></li>
</ul></li>
<li>Если вы заинтересованы в обновлении версии Milvus,<ul>
<li>прочитайте <a href="/docs/ru/v2.5.x/upgrade_milvus_cluster-operator.md">руководство по обновлению кластера Milvus</a> и <a href="/docs/ru/v2.5.x/upgrade_milvus_cluster-operator.md">руководство</a> <a href="/docs/ru/v2.5.x/upgrade_milvus_standalone-operator.md">по обновлению автономной версии Milvus</a>.</li>
</ul></li>
</ul>
