---
id: config_jaeger_tracing.md
title: Настройка трассировки
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  В данном руководстве приведены инструкции по настройке Jaeger для сбора
  трассировок для Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Настройка трассировки<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве приведены инструкции по настройке Jaeger для сбора трассировок для Milvus.</p>
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
<li>У вас установлены необходимые инструменты, включая <a href="https://helm.sh/docs/intro/install/">Helm</a> и <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">Развертывание Jaeger<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger — это платформа распределенного трассирования, выпущенная компанией <a href="http://uber.github.io/">Uber Technologies</a> в виде открытого исходного кода.</p>
<p>В данном руководстве описывается развертывание Jaeger v2 с помощью <a href="https://github.com/jaegertracing/helm-charts">диаграммы Helm для Jaeger</a>. По умолчанию диаграмма развертывает Jaeger по модели «все в одном» с хранением данных в оперативной памяти, что подходит для тестирования. О других способах запуска Jaeger в Kubernetes см. в разделе <a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">«Развертывание в Kubernetes</a>».</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. Установка Jaeger<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>Установите Jaeger в том же пространстве имён, где установлен Milvus. Настройки Milvus, описанные в следующем разделе, ссылаются на сервис Jaeger по его краткому имени — <code translate="no">jaeger</code> — а Kubernetes разрешает имя сервиса без указания пространства имён только в пределах пространства имён того под, который выполняет запрос.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>В файле README чарта указано, что чарт является экспериментальным и что в второстепенных версиях могут происходить изменения, нарушающие совместимость, поэтому команда фиксирует версию чарта. Версия чарта 4.19.0 развертывает Jaeger 2.23.0.</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. Проверка работы пода Jaeger<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы убедиться, что под Jaeger работает, выполните следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чарт создаёт сервис с именем <code translate="no">jaeger</code>. Сервис предоставляет доступ к gRPC-приёмнику OTLP на порту <code translate="no">4317</code> и к пользовательскому интерфейсу Jaeger на порту <code translate="no">16686</code>.</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Установка Milvus с помощью диаграммы Helm<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы отправлять трассировки из Milvus в Jaeger по OTLP, сохраните следующие настройки в файле с именем <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>С этими настройками Milvus отбирает образцы каждого запроса (<code translate="no">sampleFraction: 1</code>) и экспортирует трасы через OTLP gRPC без TLS (<code translate="no">secure: false</code>) на порт <code translate="no">4317</code> службы <code translate="no">jaeger</code>.</p>
<p>Чтобы применить вышеуказанные настройки к новому развертыванию Milvus, выполните следующие команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы применить вышеуказанные настройки к существующему развертыванию Milvus, выполните следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Эта команда использует параметр ` <code translate="no">--reset-then-reuse-values</code>`, для которого требуется Helm версии 3.14 или более поздней. С этим параметром Helm сбрасывает значения до значений по умолчанию для версии диаграммы, заданных в файле ` <code translate="no">--version</code>`, применяет значения вашего текущего релиза, а затем применяет значения из файла ` <code translate="no">-f</code>`. Таким образом, каждое значение в файле ` <code translate="no">values.yaml</code> ` переопределяет значение вашего текущего релиза, а запись ` <code translate="no">user.yaml</code> ` в файле ` <code translate="no">extraConfigFiles</code> ` заменяется целиком. Чтобы найти <code translate="no">&lt;current-chart-version&gt;</code>, запустите <code translate="no">helm list</code> и удалите префикс <code translate="no">milvus-</code> из значения в столбце <code translate="no">CHART</code>. Если вы запустите <code translate="no">helm upgrade</code> с <code translate="no">-f</code> или <code translate="no">--set</code>, но без <code translate="no">--reset-then-reuse-values</code> или <code translate="no">--reuse-values</code>, Helm не сохранит значения, которые вы установили во время установки.</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">Просмотр трассировок<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Служба <code translate="no">jaeger</code> имеет тип <code translate="no">ClusterIP</code>, и по умолчанию диаграмма не создает вход (ingress). Чтобы открыть интерфейс Jaeger с локального компьютера, перенаправьте порт интерфейса:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем откройте <code translate="no">http://localhost:16686</code> в браузере.</p>
<p>На следующем снимке экрана показан интерфейс Jaeger с трассировками Milvus во время операции поиска и операции сбора нагрузки:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>Запрос на поиск трассировки</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>Трассировка запроса на сбор данных</span>
  
 </span></p>
