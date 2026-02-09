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
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
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
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Репозиторий Milvus Helm Charts по адресу <code translate="no">https://github.com/milvus-io/milvus-helm</code> был заархивирован. Теперь мы используем новый репозиторий по адресу <code translate="no">https://github.com/zilliztech/milvus-helm</code>. Архивное хранилище по-прежнему доступно для графиков до версии 4.0.31, но для более поздних версий используйте новое хранилище.</p>
</div>
<p>Затем извлеките графики Milvus из репозитория следующим образом:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Разверните кластер Milvus<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>После установки диаграммы Helm вы можете запустить Milvus на Kubernetes. В этом разделе мы расскажем вам, как развернуть кластер Milvus.</p>
<div class="alert note" id="standalone-deployment-note">
<p><strong>Вам нужно автономное развертывание?</strong></p>
<p>Если вы предпочитаете развернуть Milvus в автономном режиме (на одном узле) для разработки или тестирования, используйте эту команду:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.10 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Примечание</strong>: Автономный режим использует Woodpecker в качестве очереди сообщений по умолчанию и включает компонент Streaming Node. Подробнее см. в разделах <a href="/docs/ru/architecture_overview.md">Обзор архитектуры</a> и <a href="/docs/ru/use-woodpecker.md">Использование Woodpecker</a>.</p>
</div>
<p><strong>Развертывание кластера Milvus:</strong></p>
<p>Следующая команда развертывает кластер Milvus с оптимизированными настройками для версии 2.6.10, используя Woodpecker в качестве рекомендуемой очереди сообщений:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.10 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Что делает эта команда:</strong></p>
<ul>
<li>Использует <strong>Woodpecker</strong> в качестве очереди сообщений (рекомендуется для снижения затрат на обслуживание).</li>
<li>Включает новый компонент <strong>Streaming Node</strong> для повышения производительности</li>
<li>Отключает устаревший компонент <strong>Index Node</strong> (функциональность теперь выполняется компонентом Data Node)</li>
<li>Отключает Pulsar, чтобы использовать вместо него Woodpecker</li>
</ul>
<div class="alert note">
<p><strong>Изменения архитектуры в Milvus 2.6.x:</strong></p>
<ul>
<li><strong>Очередь сообщений</strong>: Теперь рекомендуется использовать <strong>Woodpecker</strong> (сокращает обслуживание инфраструктуры по сравнению с Pulsar)</li>
<li><strong>Новый компонент</strong>: <strong>Streaming Node</strong> представлен и включен по умолчанию</li>
<li><strong>Объединенные компоненты</strong>: <strong>Index Node</strong> и <strong>Data Node</strong> объединены в один <strong>Data Node</strong>.</li>
</ul>
<p>Полную информацию об архитектуре см. в разделе " <a href="/docs/ru/architecture_overview.md">Обзор архитектуры"</a>.</p>
</div>
<p><strong>Альтернативные варианты очереди сообщений:</strong></p>
<p>Если вы предпочитаете использовать <strong>Pulsar</strong> (традиционный вариант) вместо Woodpecker:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.10 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Следующие шаги:</strong>Приведенная выше команда развертывает Milvus с рекомендуемыми конфигурациями. Для производственного использования:</p>
<ul>
<li>Используйте <a href="https://milvus.io/tools/sizing">инструмент Milvus Sizing Tool</a> для оптимизации настроек в зависимости от объема данных.</li>
<li>Просмотрите <a href="https://milvus.io/docs/system_configuration.md">контрольный список конфигураций системы Milvus</a> для получения информации о дополнительных параметрах конфигурации.</li>
</ul>
<div class="alert note">
<p><strong>Важные замечания:</strong></p>
<ul>
<li><strong>Именование релизов</strong>: Используйте только буквы, цифры и тире (точки запрещены).</li>
<li><strong>Kubernetes v1.25+</strong>: Если у вас возникли проблемы с PodDisruptionBudget, воспользуйтесь этим обходным решением:<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> pulsar.bookkeeper.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.broker.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.proxy.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.zookeeper.pdb.usePolicy=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Дополнительные сведения см. в <a href="https://helm.sh/docs/">документации</a> <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> и <a href="https://helm.sh/docs/">Helm</a>.</p>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Проверьте состояние кластера Milvus<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь в том, что развертывание прошло успешно, проверив состояние стручков:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p><strong>Дождитесь, пока все поды покажут статус "Running".</strong> В конфигурации v2.6.10 вы должны увидеть поды, похожие на эти:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streaming<span class="hljs-operator">-</span>node<span class="hljs-operator">-</span>xxxxxxxxx       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>autorecovery<span class="hljs-number">-86</span>f5dbdf77<span class="hljs-operator">-</span>lchpc  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">98</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-556</span>ff89d4c<span class="hljs-number">-2</span>m29m        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>fbd75db75<span class="hljs-operator">-</span>nhg4v         <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-operator">-</span>metadata<span class="hljs-number">-98</span>zbr       <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>   Completed  <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ключевые компоненты для проверки:</strong></p>
<ul>
<li><strong>Компоненты Milvus</strong>: <code translate="no">mixcoord</code>, <code translate="no">datanode</code>, <code translate="no">querynode</code>, <code translate="no">proxy</code>, <code translate="no">streaming-node</code></li>
<li><strong>Зависимости</strong>: <code translate="no">etcd</code> (метаданные), <code translate="no">minio</code> (хранилище объектов), <code translate="no">pulsar</code> (очередь сообщений).</li>
</ul>
<p>Вы также можете получить доступ к <strong>Milvus WebUI</strong> по адресу <code translate="no">http://127.0.0.1:9091/webui/</code> после настройки переадресации портов (см. следующий шаг). Подробности см. в разделе <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Connect-to-Milvus" class="common-anchor-header">3. Подключение к Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы подключиться к кластеру Milvus извне Kubernetes, необходимо настроить переадресацию портов.</p>
<p><strong>Настройте переадресацию портов:</strong></p>
<pre><code translate="no" class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда перенаправляет ваш локальный порт <code translate="no">27017</code> на порт Milvus <code translate="no">19530</code>. Вы должны увидеть:</p>
<pre><code translate="no"><span class="hljs-attribute">Forwarding</span> from <span class="hljs-number">127.0.0.1:27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Детали подключения:</strong></p>
<ul>
<li><strong>Локальное соединение</strong>: <code translate="no">localhost:27017</code></li>
<li><strong>Порт Milvus по умолчанию</strong>: <code translate="no">19530</code></li>
</ul>
<div class="alert note">
<p><strong>Опции для перенаправления порта:</strong></p>
<ul>
<li><strong>Автоматическое назначение локального порта</strong>: Используйте <code translate="no">:19530</code> вместо <code translate="no">27017:19530</code>, чтобы позволить kubectl выбрать доступный порт.</li>
<li><strong>Слушать на всех интерфейсах</strong>: Добавьте <code translate="no">--address 0.0.0.0</code>, чтобы разрешить соединения с других машин:<pre><code translate="no" class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre></li>
<li><strong>Автономное развертывание</strong>: При использовании автономного режима имя сервиса остается прежним</li>
</ul>
</div>
<p><strong>Держите этот терминал открытым</strong> во время работы с Milvus. Теперь вы можете подключиться к Milvus с помощью любого Milvus SDK по адресу <code translate="no">localhost:27017</code>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Необязательно) Обновление конфигураций Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете обновить конфигурацию кластера Milvus, отредактировав файл <code translate="no">values.yaml</code> и применив его снова.</p>
<ol>
<li><p>Создайте файл <code translate="no">values.yaml</code> с нужными конфигурациями.</p>
<p>Ниже предполагается, что вы хотите включить <code translate="no">proxy.http</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        enabled: true
</span><button class="copy-code-btn"></button></code></pre>
<p>Соответствующие элементы конфигурации см. в разделе <a href="/docs/ru/system_configuration.md">Конфигурация системы</a>.</p></li>
<li><p>Примените файл <code translate="no">values.yaml</code>.</p></li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<ol>
<li><p>Проверьте обновленные конфигурации.</p>
<pre><code translate="no" class="language-shell">helm get values my-release
<button class="copy-code-btn"></button></code></pre>
<p>В выводе должны отображаться обновленные конфигурации.</p></li>
</ol>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
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
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Получите манифест Milvus<button data-href="#1-Get-Milvus-manifest" class="anchor-icon" translate="no">
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
    </button></h3><p>Выполните следующую команду, чтобы получить манифест Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release zilliztech/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Приведенная выше команда создает шаблоны графиков для кластера Milvus и сохраняет результаты в файле манифеста с именем <code translate="no">milvus_manifest.yaml</code>. Используя этот манифест, вы можете установить кластер Milvus с его компонентами и зависимостями в отдельных капсулах.</p>
<div class="alert note">
<ul>
<li>Для установки экземпляра Milvus в автономном режиме, когда все компоненты Milvus содержатся в одном подкате, следует запустить <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false zilliztech/milvus &gt; milvus_manifest.yaml</code>, чтобы вывести шаблоны графиков для экземпляра Milvus в автономном режиме.</li>
<li>Чтобы изменить конфигурацию Milvus, загрузите <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> шаблон, поместите в него нужные настройки и используйте <code translate="no">helm template -f values.yaml my-release zilliztech/milvus &gt; milvus_manifest.yaml</code> для рендеринга манифеста в соответствии с ними.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Скачайте скрипт извлечения изображений<button data-href="#2-Download-image-pulling-script" class="anchor-icon" translate="no">
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
    </button></h3><p>Скрипт извлечения изображений разработан на языке Python. Вы должны загрузить скрипт вместе с его зависимостями в файле <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Извлечение и сохранение изображений<button data-href="#3-Pull-and-save-images" class="anchor-icon" translate="no">
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
    </button></h3><p>Выполните следующую команду, чтобы извлечь и сохранить нужные изображения.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Изображения будут извлечены в подпапку с именем <code translate="no">images</code> в текущем каталоге.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Загрузка изображений<button data-href="#4-Load-images" class="anchor-icon" translate="no">
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
    </button></h3><p>Теперь вы можете загрузить образы на хосты в среде с сетевыми ограничениями следующим образом:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Развертывание Milvus<button data-href="#5-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --reset-then-reuse-values</span>
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
    </button></h2><p>Выполните следующую команду для удаления Milvus.</p>
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
<li><p>Изучите <a href="https://github.com/zilliztech/attu">Attu</a>, инструмент с открытым исходным кодом GUI для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
