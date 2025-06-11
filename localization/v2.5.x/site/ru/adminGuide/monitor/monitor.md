---
id: monitor.md
title: Развертывание служб мониторинга
related_key: "monitor, alert"
summary: >-
  Узнайте, как развернуть службы мониторинга для кластера Milvus с помощью
  Prometheus.
---

<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Развертывание служб мониторинга на Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как использовать Prometheus для развертывания служб мониторинга для кластера Milvus на Kubernetes.</p>
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
    </button></h2><p>Метрики - это индикаторы, предоставляющие информацию о состоянии работы вашей системы. Например, с помощью метрик вы можете понять, сколько памяти или ресурсов процессора потребляет узел данных в Milvus. Знание производительности и состояния компонентов вашего кластера Milvus позволяет вам быть хорошо информированным, а значит, принимать лучшие решения и своевременно корректировать распределение ресурсов.</p>
<p>Обычно метрики хранятся в базе данных временных рядов (TSDB), например <a href="https://prometheus.io/">в Prometheus</a>, и метрики записываются с меткой времени. В случае мониторинга служб Milvus вы можете использовать Prometheus для получения данных из конечных точек, установленных экспортерами. Затем Prometheus экспортирует метрики каждого компонента Milvus по адресу <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Однако у вас может быть несколько реплик для одного компонента, что делает ручную настройку Prometheus слишком сложной. Поэтому вы можете использовать <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, расширение для Kubernetes, для автоматического и эффективного управления экземплярами мониторинга Prometheus. Использование Prometheus Operator избавит вас от необходимости вручную добавлять метрические цели и поставщиков услуг.</p>
<p>ServiceMonitor Custom Resource Definition (CRD) позволяет декларативно определить, как отслеживается динамический набор сервисов. Оно также позволяет выбирать сервисы для мониторинга с нужной конфигурацией с помощью выбора меток. С помощью Prometheus Operator можно ввести соглашения, определяющие способ отображения метрик. Новые службы могут быть автоматически обнаружены в соответствии с установленными соглашениями без необходимости ручной перенастройки.</p>
<p>Следующее изображение иллюстрирует рабочий процесс Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Архитектура Prometheus</span> </span></p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<p>Kube-prometheus собирает манифесты Kubernetes, приборные панели <a href="http://grafana.com/">Grafana</a> и <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">правила Prometheus</a> в сочетании с документацией и скриптами.</p>
<p>Перед развертыванием служб мониторинга необходимо создать стек мониторинга, используя конфигурацию в каталоге kube-prometheus manifests.</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Кластерроль по умолчанию prometheus-k8s не может перехватывать метрики milvus, необходимо внести исправления:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы удалить стек, выполните команду <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Развертывание служб мониторинга на Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Получите доступ к панелям мониторинга</h3><p>Перенаправьте службу Prometheus на порт <code translate="no">9090</code>, а службу Grafana - на порт <code translate="no">3000</code>.</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Включите ServiceMonitor</h3><p>По умолчанию ServiceMonitor не включен в Milvus Helm. После установки Prometheus Operator в кластере Kubernetes вы можете включить его, добавив параметр <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Когда установка завершится, используйте <code translate="no">kubectl</code> для проверки ресурса ServiceMonitor.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
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
<li>Если вы развернули службы мониторинга для кластера Milvus, вам также будет интересно узнать следующее:<ul>
<li><a href="/docs/ru/v2.5.x/visualize.md">Визуализировать метрики Milvus в Grafana</a></li>
<li><a href="/docs/ru/v2.5.x/alert.md">Создавать оповещения для служб Milvus</a></li>
<li>Настроить <a href="/docs/ru/v2.5.x/allocate.md">распределение ресурсов</a></li>
</ul></li>
<li>Если вы ищете информацию о том, как масштабировать кластер Milvus:<ul>
<li>Обучение <a href="/docs/ru/v2.5.x/scaleout.md">масштабированию кластера Milvus</a></li>
</ul></li>
<li>Если вы заинтересованы в обновлении версии Milvus,<ul>
<li>прочитайте <a href="/docs/ru/v2.5.x/upgrade_milvus_cluster-operator.md">руководство по обновлению кластера Milvus</a> и <a href="/docs/ru/v2.5.x/upgrade_milvus_cluster-operator.md">руководство</a> <a href="/docs/ru/v2.5.x/upgrade_milvus_standalone-operator.md">по обновлению автономной версии Milvus</a>.</li>
</ul></li>
</ul>
