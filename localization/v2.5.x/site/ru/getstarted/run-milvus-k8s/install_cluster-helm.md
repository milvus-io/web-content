---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: 'Узнайте, как установить кластер Milvus на Kubernetes.'
title: Установите кластер Milvus с помощью Helm
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">Запуск Milvus в Kubernetes с помощью Helm<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить экземпляр Milvus в Kubernetes с помощью <a href="https://github.com/zilliztech/milvus-helm">диаграмм Milvus Helm</a>.</p>
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
    </button></h2><p>Helm использует формат упаковки, называемый диаграммами. Диаграмма - это набор файлов, которые описывают связанный набор ресурсов Kubernetes. Milvus предоставляет набор диаграмм, чтобы помочь вам развернуть зависимости и компоненты Milvus.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Установите Helm CLI</a>.</p></li>
<li><p><a href="/docs/ru/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Создайте кластер K8s</a>.</p></li>
<li><p>Установите <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Проверить установленный StorageClass можно следующим образом.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Перед установкой проверьте <a href="/docs/ru/prerequisite-helm.md">требования к аппаратному и программному обеспечению</a>.</p></li>
<li><p>Перед установкой Milvus рекомендуется использовать <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> для оценки требований к оборудованию в зависимости от объема данных. Это поможет обеспечить оптимальную производительность и распределение ресурсов при установке Milvus.</p></li>
</ul>
<div class="alert note">
<p>Если у вас возникнут проблемы с установкой образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a> и подробно расскажите о проблеме, и мы окажем вам необходимую поддержку.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Установка Milvus Helm Chart<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед установкой Milvus Helm Charts необходимо добавить репозиторий Milvus Helm.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Репозиторий Milvus Helm Charts по адресу <code translate="no">https://github.com/milvus-io/milvus-helm</code> был заархивирован, и вы можете получать дальнейшие обновления с <code translate="no">https://github.com/zilliztech/milvus-helm</code> следующим образом:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Архивное хранилище по-прежнему доступно для графиков до версии 4.0.31. Для более поздних выпусков используйте новое репо.</p>
</div>
<p>Затем извлеките графики Milvus из репозитория следующим образом:</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>Вы всегда можете выполнить эту команду, чтобы получить последние диаграммы Milvus Helm.</p>
<h2 id="Online-install" class="common-anchor-header">Онлайн-установка<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Разверните кластер Milvus</h3><p>После установки диаграммы Helm вы можете запустить Milvus на Kubernetes. В этом разделе мы рассмотрим шаги по запуску Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>В приведенной выше команде <code translate="no">my-release</code> - это название релиза, а <code translate="no">milvus/milvus</code> - локально установленный репозиторий графика. Чтобы использовать другое имя, замените <code translate="no">my-release</code> на то, которое вы считаете нужным.</p>
<p>Приведенная выше команда развертывает кластер Milvus с его компонентами и зависимостями, используя конфигурации по умолчанию. Чтобы настроить эти параметры, мы рекомендуем использовать <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> для настройки конфигураций на основе фактического объема данных, а затем загрузить соответствующий YAML-файл. Чтобы узнать больше о параметрах конфигурации, обратитесь к разделу <a href="https://milvus.io/docs/system_configuration.md">Контрольный список конфигураций системы Milvus</a>.</p>
<div class="alert note">
  <ul>
    <li>Название релиза должно содержать только буквы, цифры и тире. Точки в имени релиза не допускаются.</li>
    <li>Командная строка по умолчанию устанавливает кластерную версию Milvus при установке Milvus с Helm. При самостоятельной установке Milvus требуется дополнительная настройка.</li>
    <li>Согласно <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">руководству по миграции устаревших API в Kubernetes</a>, версия API <b>policy/v1beta1</b> для PodDisruptionBudget больше не обслуживается, начиная с версии 1.25. Вам предлагается перевести манифесты и API-клиенты на использование версии API <b>policy/v1</b>. <br/>В качестве обходного пути для пользователей, которые все еще используют API-версию PodDisruptionBudget <b>policy/v1beta1</b> на Kubernetes v1.25 и более поздних версиях, вы можете выполнить следующую команду для установки Milvus:<br/>. <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>Дополнительные сведения см. в разделах <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> и <a href="https://helm.sh/docs/">Helm</a>.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Проверка состояния кластера Milvus</h3><p>Выполните следующую команду, чтобы проверить состояние всех стручков в вашем кластере Milvus.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Если все подсистемы запущены, результат выполнения команды должен быть похож на следующий:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<p>Вы также можете получить доступ к Milvus WebUI по адресу <code translate="no">http://127.0.0.1:9091/webui/</code>, чтобы узнать больше о вашем экземпляре Milvus. Для получения подробной информации см. раздел <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Перенаправление локального порта в Milvus</h3><p>Выполните следующую команду, чтобы узнать порт, на котором работает ваш кластер Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Результат показывает, что экземпляр Milvus обслуживается на порту по умолчанию <strong>19530</strong>.</p>
<div class="alert note">
<p>Если вы развернули Milvus в автономном режиме, измените имя стручка с <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> на <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Затем выполните следующую команду, чтобы перенаправить локальный порт на порт, на котором работает Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>По желанию вы можете использовать <code translate="no">:19530</code> вместо <code translate="no">27017:19530</code> в приведенной выше команде, чтобы <code translate="no">kubectl</code> выделил локальный порт для вас, и вам не пришлось бы управлять конфликтами портов.</p>
<p>По умолчанию переадресация портов в kubectl прослушивает только <code translate="no">localhost</code>. Используйте флаг <code translate="no">address</code>, если хотите, чтобы Milvus слушал выбранный или все IP-адреса. Следующая команда заставляет port-forward слушать все IP-адреса на хост-машине.</p>
<p>Теперь вы можете подключиться к Milvus, используя перенаправленный порт.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Доступ к Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поставляется со встроенным GUI-инструментом Milvus WebUI, доступ к которому можно получить через браузер. Milvus Web UI улучшает наблюдаемость системы благодаря простому и интуитивно понятному интерфейсу. С помощью Milvus Web UI можно просматривать статистику и метрики компонентов и зависимостей Milvus, проверять детали баз данных и коллекций, а также выводить список подробных конфигураций Milvus. Подробные сведения о Milvus Web UI см. в разделе <a href="/docs/ru/milvus-webui.md">Milvus WebUI.</a></p>
<p>Чтобы включить доступ к Milvus Web UI, вам нужно перенаправить порт прокси-под на локальный порт.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27018</span>:<span class="hljs-number">9091</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27018</span> -&gt; <span class="hljs-number">9091</span>
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете получить доступ к Milvus Web UI по адресу <code translate="no">http://localhost:27018</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете подключиться к Milvus, используя перенаправленный порт.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Доступ к Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поставляется со встроенным GUI-инструментом Milvus WebUI, доступ к которому можно получить через браузер. Milvus Web UI улучшает наблюдаемость системы благодаря простому и интуитивно понятному интерфейсу. С помощью Milvus Web UI можно просматривать статистику и метрики компонентов и зависимостей Milvus, проверять детали баз данных и коллекций, а также выводить список подробных конфигураций Milvus. Подробные сведения о Milvus Web UI см. в разделе <a href="/docs/ru/milvus-webui.md">Milvus WebUI.</a></p>
<p>Чтобы включить доступ к Milvus Web UI, вам нужно перенаправить порт прокси-под на локальный порт.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27018</span>:<span class="hljs-number">9091</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27018</span> -&gt; <span class="hljs-number">9091</span>
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете получить доступ к Milvus Web UI по адресу <code translate="no">http://localhost:27018</code>.</p>
<h2 id="Offline-install" class="common-anchor-header">Автономная установка<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы находитесь в среде с ограниченными сетевыми возможностями, выполните процедуру, описанную в этом разделе, чтобы запустить кластер Milvus.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Получите манифест Milvus</h3><p>Выполните следующую команду, чтобы получить манифест Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Приведенная выше команда создает шаблоны графиков для кластера Milvus и сохраняет результаты в файле манифеста с именем <code translate="no">milvus_manifest.yaml</code>. Используя этот манифест, вы можете установить кластер Milvus с его компонентами и зависимостями в отдельных капсулах.</p>
<div class="alert note">
<ul>
<li>Для установки экземпляра Milvus в автономном режиме, когда все компоненты Milvus содержатся в одном подкате, следует запустить <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code>, чтобы вывести шаблоны графиков для экземпляра Milvus в автономном режиме.</li>
<li>Чтобы изменить конфигурацию Milvus, загрузите <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> шаблон, поместите в него нужные настройки и используйте <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> для рендеринга манифеста в соответствии с ними.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Скачайте скрипт извлечения изображений</h3><p>Скрипт извлечения изображений разработан на языке Python. Вы должны загрузить скрипт вместе с его зависимостями в файле <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Извлечение и сохранение изображений</h3><p>Выполните следующую команду, чтобы извлечь и сохранить нужные изображения.</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Изображения будут извлечены в подпапку с именем <code translate="no">images</code> в текущем каталоге.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Загрузка изображений</h3><p>Теперь вы можете загрузить образы на хосты в среде с сетевыми ограничениями следующим образом:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Развертывание Milvus</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>До этого момента вы можете выполнить шаги <a href="#2-Check-Milvus-cluster-status">2</a> и <a href="#3-Forward-a-local-port-to-Milvus">3</a> онлайн-установки, чтобы проверить состояние кластера и перенаправить локальный порт на Milvus.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">Обновление запущенного кластера Milvus<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующую команду, чтобы обновить работающий кластер Milvus до последней версии:</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Деинсталляция Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующую команду, чтобы удалить Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
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
    </button></h2><p>Установив Milvus в Docker, вы можете:</p>
<ul>
<li><p>Проверить <a href="/docs/ru/quickstart.md">Hello Milvus</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Изучить основные операции Milvus:</p>
<ul>
<li><a href="/docs/ru/manage_databases.md">Управлять базами данных</a></li>
<li><a href="/docs/ru/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управлять разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставка, вставка и удаление</a></li>
<li><a href="/docs/ru/single-vector-search.md">Одновекторный поиск</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабирование кластера Milvus</a>.</p></li>
<li><p>Развертывание кластера Milvus в облаках:</p>
<ul>
<li><a href="/docs/ru/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Изучите <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>, интуитивно понятный веб-интерфейс для наблюдения и управления Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/milvus_backup_overview.md">Milvus Backup</a>, инструмент с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/birdwatcher_overview.md">Birdwatcher</a>, инструмент с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Изучите <a href="https://milvus.io/docs/attu.md">Attu</a>, инструмент с открытым исходным кодом GUI для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
