---
id: monitor.md
title: Развертывание служб мониторинга
related_key: 'monitor, alert'
summary: >-
  Узнайте, как развернуть службы мониторинга для кластера Milvus с помощью
  Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Развертывание служб мониторинга в Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом разделе описывается, как использовать Prometheus для развертывания служб мониторинга для кластера Milvus в Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Мониторинг метрик с помощью Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Метрики — это показатели, предоставляющие информацию о состоянии работы вашей системы. Например, с помощью метрик можно понять, сколько ресурсов памяти или ЦП потребляет узел данных в Milvus. Осведомленность о производительности и состоянии компонентов в вашем кластере Milvus позволяет вам принимать более обоснованные решения и своевременно корректировать распределение ресурсов.</p>
<p>Как правило, метрики хранятся в базе данных временных рядов (TSDB), такой как <a href="https://prometheus.io/">Prometheus</a>, и записываются с отметкой времени. При мониторинге сервисов Milvus вы можете использовать Prometheus для извлечения данных из конечных точек, настроенных экспортерами. Затем Prometheus экспортирует метрики каждого компонента Milvus по адресу <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Однако у вас может быть несколько реплик одного компонента, что делает ручную настройку Prometheus слишком сложной. Поэтому для автоматизированного и эффективного управления экземплярами мониторинга Prometheus можно использовать <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a> — расширение для Kubernetes. Использование Prometheus Operator избавляет вас от необходимости вручную добавлять цели метрик и поставщиков услуг.</p>
<p>Определение пользовательского ресурса (CRD) ServiceMonitor позволяет декларативно определять, как осуществляется мониторинг динамического набора сервисов. Оно также позволяет выбирать, какие сервисы следует мониторить с нужной конфигурацией, с помощью выбора меток. С помощью Prometheus Operator вы можете ввести соглашения, определяющие, как раскрываются метрики. Новые сервисы могут автоматически обнаруживаться в соответствии с установленными вами соглашениями без необходимости ручной перенастройки.</p>
<p>На следующем изображении показан рабочий процесс Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>В этом руководстве используется <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a>, чтобы избавить вас от необходимости устанавливать и вручную настраивать каждый компонент мониторинга и оповещения.</p>
<p>Kube-prometheus объединяет манифесты Kubernetes, дашборды <a href="http://grafana.com/">Grafana</a> и <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">правила Prometheus</a>, а также документацию и скрипты.</p>
<p>Перед развертыванием служб мониторинга необходимо создать стек мониторинга, используя конфигурацию из каталога манифестов kube-prometheus.</p>
<p>Следующие команды используют ветвь « <code translate="no">release-0.19</code> » проекта kube-prometheus, которая поддерживает Kubernetes версий 1.35, 1.36 и 1.37. Чтобы выбрать ветвь для вашей версии Kubernetes, ознакомьтесь с <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">матрицей совместимости kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Кластерная роль `prometheus-k8s` по умолчанию не может собирать метрики milvus, поэтому необходимо внести исправление:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы удалить стек, выполните команду ` <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>`.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Развертывание служб мониторинга в Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Доступ к панелям мониторинга<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Перенаправьте сервис Prometheus на порт <code translate="no">9090</code>, а сервис Grafana — на порт <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Включение ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor по умолчанию не включен для Milvus Helm. После установки Prometheus Operator в кластере Kubernetes вы можете включить его, добавив параметр <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">С помощью Helm</h4><p>Вы можете включить ServiceMonitor, установив параметр <code translate="no">metrics.serviceMonitor.enabled=true</code> следующим образом, если у вас установлен чарт Milvus Helm.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>В этой команде используется параметр ` <code translate="no">--reset-then-reuse-values</code>`, для которого требуется Helm версии 3.14 или более поздней. С помощью этого параметра Helm сбрасывает значения до значений по умолчанию для версии диаграммы, указанной в ` <code translate="no">--version</code>`, применяет значения вашего текущего релиза, а затем применяет значения из ` <code translate="no">--set</code>`. Чтобы найти ` <code translate="no">&lt;current-chart-version&gt;</code>`, выполните команду ` <code translate="no">helm list</code> ` и удалите префикс ` <code translate="no">milvus-</code> ` из значения в столбце ` <code translate="no">CHART</code> `. Если вы запустите команду <code translate="no">helm upgrade</code> с параметрами <code translate="no">-f</code> или <code translate="no">--set</code>, но без параметров <code translate="no">--reset-then-reuse-values</code> или <code translate="no">--reuse-values</code>, Helm не сохранит значения, заданные вами во время установки.</p>
</div>
<p>По завершении установки воспользуйтесь командой <code translate="no">kubectl</code>, чтобы проверить ресурс ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">С оператором Milvus</h4><p>Если вы установили Milvus с помощью Milvus Operator, оператор создает PodMonitor вместо ServiceMonitor. PodMonitor имеет такое же имя, как и пользовательский ресурс Milvus. Оператор создает его только в том случае, если метрики не отключены в пользовательском ресурсе и CRD PodMonitor существует в кластере. Этот CRD устанавливается из каталога <code translate="no">manifests/setup</code> пакета kube-prometheus. Чтобы убедиться, что метрики включены, выполните следующие действия.</p>
<ol>
<li><p>Выполните следующую команду, чтобы отредактировать пользовательский ресурс Milvus. В приведённой ниже команде предполагается, что пользовательский ресурс имеет имя <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Измените значение поля <code translate="no">spec.components.disableMetric</code> на <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Сохраните изменения и закройте редактор.</p></li>
<li><p>Дождитесь, пока оператор синхронизирует изменения. Вы можете проверить PodMonitor, выполнив следующую команду.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Проверка метрик<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>После включения ServiceMonitor или PodMonitor вы можете перейти на панель мониторинга Prometheus по адресу <code translate="no">http://localhost:9090/</code>.</p>
<p>Перейдите на вкладку « <code translate="no">Status</code> », а затем выберите « <code translate="no">Targets</code> ». Вы должны увидеть целевые объекты компонентов Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Перейдите на вкладку « <code translate="no">Graph</code> » и введите выражение « <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> » в поле ввода выражения. Вы должны увидеть метрики компонентов Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Проверьте ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы установили Milvus с помощью Helm, выполните следующую команду, чтобы отобразить список ServiceMonitor. В диаграмме он называется « <code translate="no">my-release-milvus</code> » для кластера Milvus и « <code translate="no">my-release-milvus-standalone</code> » для автономной версии Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
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
<li>Если вы развернули службы мониторинга для кластера Milvus, вам также может быть интересно узнать, как:
<ul>
<li><a href="/docs/ru/visualize.md">Визуализировать метрики Milvus в Grafana</a></li>
<li><a href="/docs/ru/alert.md">Создавать оповещения для сервисов Milvus</a></li>
<li>Настраивать <a href="/docs/ru/allocate.md">распределение ресурсов</a></li>
</ul></li>
<li>Если вы ищете информацию о том, как масштабировать кластер Milvus:
<ul>
<li>Узнайте, как <a href="/docs/ru/scaleout.md">масштабировать кластер Milvus</a></li>
</ul></li>
<li>Если вас интересует обновление версии Milvus,
<ul>
<li>Ознакомьтесь с <a href="/docs/ru/upgrade_milvus_cluster-operator.md">руководством по обновлению кластера Milvus</a> и <a href="/docs/ru/upgrade_milvus_standalone-operator.md">руководством по обновлению автономной версии Milvus</a>.</li>
</ul></li>
</ul>
