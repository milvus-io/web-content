---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: 'Узнайте, как установить кластер Milvus на Kubernetes.'
title: Запуск Milvus с поддержкой GPU с помощью Helm Chart
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Запуск Milvus с поддержкой GPU с помощью Helm Chart<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить экземпляр Milvus с поддержкой GPU с помощью Helm Chart.</p>
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
    </button></h2><p>Helm использует формат упаковки, называемый «чартами». Чарт представляет собой набор файлов, описывающих связанный набор ресурсов Kubernetes. Milvus предоставляет набор чартов, которые помогут вам развернуть зависимости и компоненты Milvus. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Чарт Helm для Milvus</a> — это решение, которое инициирует развертывание Milvus в кластере Kubernetes (K8s) с помощью менеджера пакетов Helm.</p>
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
<li><p><a href="/docs/ru/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">Создайте кластер K8s с рабочими узлами с GPU</a>.</p></li>
<li><p>Установите <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Проверить установленный StorageClass можно следующим образом.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Перед установкой проверьте <a href="/docs/ru/prerequisite-gpu.md">аппаратные и программные требования</a>.</p></li>
</ul>
<div class="alert note">
<p>Если у вас возникнут проблемы с загрузкой образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a>, указав подробности проблемы, и мы предоставим вам необходимую поддержку.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Установите Helm Chart для Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm — это менеджер пакетов K8s, который поможет вам быстро развернуть Milvus.</p>
<ol>
<li>Добавьте репозиторий Helm для Milvus.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Репозиторий Helm-чартов Milvus по адресу <code translate="no">https://milvus-io.github.io/milvus-helm/</code> был заархивирован, и вы можете получать дальнейшие обновления с сайта <code translate="no">https://zilliztech.github.io/milvus-helm/</code> следующим образом:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Архивированный репозиторий по-прежнему доступен для диаграмм версий до 4.0.31. Для более поздних выпусков используйте новый репозиторий.</p>
</div>
<ol start="2">
<li>Обновите диаграммы локально.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Запуск Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>После установки диаграммы Helm вы можете запустить Milvus в Kubernetes. В этом разделе мы расскажем, как запустить Milvus с поддержкой GPU.</p>
<p>Запускать Milvus с помощью Helm следует, указав имя релиза, чарт и параметры, которые вы планируете изменить. В данном руководстве в качестве имени релиза используется « <code translate="no">my-release</code> ». Чтобы использовать другое имя релиза, замените « <code translate="no">my-release</code> » в приведенных ниже командах на используемое вами.</p>
<p>Milvus позволяет назначить одно или несколько GPU-устройств для работы с Milvus.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. Назначение одного устройства GPU<button data-href="#1-Assign-a-single-GPU-device" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus с поддержкой GPU позволяет назначить одно или несколько устройств GPU.</p>
<ul>
<li><p>Кластер Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Автономная версия Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. Назначение нескольких графических процессоров<button data-href="#2-Assign-multiple-GPU-devices" class="anchor-icon" translate="no">
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
    </button></h3><p>Помимо одного устройства GPU, вы также можете назначить Milvus несколько устройств GPU.</p>
<ul>
<li><p>Кластер Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенной выше конфигурации доступно четыре процессора (CPU), и каждый узел dataNode и queryNode использует по два графических процессора (GPU). Чтобы назначить разные графические процессоры для узлов dataNode и queryNode, можно соответствующим образом изменить конфигурацию, установив параметр « <code translate="no">extraEnv</code> » в файле конфигурации следующим образом:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>Имя релиза должно содержать только буквы, цифры и дефисы. Точки в имени релиза не допускаются.</li>
      <li>По умолчанию при установке Milvus с помощью Helm устанавливается кластерная версия Milvus. При установке автономной версии Milvus требуется дополнительная настройка.</li>
      <li>Согласно <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">руководству по миграции устаревших версий API Kubernetes</a>, версия API <b>policy/v1beta1</b> для PodDisruptionBudget больше не поддерживается, начиная с версии v1.25. Рекомендуется перенести манифесты и API-клиенты на использование версии API <b>policy/v1</b>. <br/>В качестве обходного решения для пользователей, которые по-прежнему используют версию API <b>policy/v1beta1</b> для PodDisruptionBudget в Kubernetes версии 1.25 и более поздних, можно вместо этого выполнить следующую команду для установки Milvus:<br/>
     <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>Дополнительную информацию см. в документации по <a href="https://artifacthub.io/packages/helm/milvus/milvus">Helm-чарту Milvus</a> и <a href="https://helm.sh/docs/">Helm</a>.</li>
    </ul>
  </div>
</li>
<li><p>Автономная версия Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенной выше конфигурации доступно четыре процессора (CPU), и каждый узел dataNode и queryNode использует по два графических процессора (GPU). Чтобы назначить разные графические процессоры для узлов dataNode и queryNode, можно соответствующим образом изменить конфигурацию, установив параметр extraEnv в конфигурационном файле следующим образом:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Проверка состояния Milvus<button data-href="#2-Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Выполните следующую команду, чтобы проверить состояние Milvus:</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>После запуска Milvus в столбце « <code translate="no">READY</code> » для всех под (pods) отображается значение « <code translate="no">1/1</code> ».</p>
<ul>
<li><p>Кластер Milvus</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                  1/1     Running     0             3m24s
my-release-etcd-1                                  1/1     Running     0             3m24s
my-release-etcd-2                                  1/1     Running     0             3m24s
my-release-milvus-datanode-698dbf7d77-rjkkq        1/1     Running     0             3m24s
my-release-milvus-mixcoord-856d666559-rpj8z        1/1     Running     0             3m24s
my-release-milvus-proxy-7f7cf47689-pzltw           1/1     Running     0             3m24s
my-release-milvus-querynode-7fb6d5b5f8-92phj       1/1     Running     0             3m24s
my-release-milvus-streamingnode-5867bfbcbf-cg9xx   1/1     Running     0             3m24s
my-release-minio-0                                 1/1     Running     0             3m24s
my-release-minio-1                                 1/1     Running     0             3m24s
my-release-minio-2                                 1/1     Running     0             3m24s
my-release-minio-3                                 1/1     Running     0             3m24s
my-release-pulsarv3-bookie-0                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-1                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-2                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-init-p8hcq              0/1     Completed   0             3m24s
my-release-pulsarv3-broker-0                       1/1     Running     0             3m24s
my-release-pulsarv3-broker-1                       1/1     Running     0             3m24s
my-release-pulsarv3-proxy-0                        1/1     Running     0             3m24s
my-release-pulsarv3-proxy-1                        1/1     Running     0             3m24s
my-release-pulsarv3-pulsar-init-8kjsj              0/1     Completed   0             3m24s
my-release-pulsarv3-recovery-0                     1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-0                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-1                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-2                    1/1     Running     0             3m24s
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Автономная версия Milvus</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Перенаправьте локальный порт на Milvus<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь, на каком локальном порте прослушивает сервер Milvus. Замените имя под на своё собственное.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>Затем выполните следующую команду, чтобы перенаправить локальный порт на порт, на котором работает Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>При желании вы можете использовать <code translate="no">:19530</code> вместо <code translate="no">27017:19530</code> в приведённой выше команде, чтобы <code translate="no">kubectl</code> автоматически выделил вам локальный порт, и вам не пришлось заниматься устранением конфликтов портов.</p>
<p>По умолчанию перенаправление портов с помощью `kubectl` осуществляется только на <code translate="no">localhost</code>. Используйте флаг <code translate="no">address</code>, если хотите, чтобы Milvus прослушивал выбранные или все IP-адреса. Следующая команда настраивает перенаправление портов на прослушивание всех IP-адресов хост-машины.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете подключиться к Milvus через перенаправленный порт.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Доступ к веб-интерфейсу Milvus<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поставляется со встроенным графическим инструментом под названием Milvus WebUI, доступ к которому можно получить через браузер. Milvus WebUI улучшает наблюдаемость системы благодаря простому и интуитивно понятному интерфейсу. С помощью Milvus WebUI можно просматривать статистику и метрики компонентов и зависимостей Milvus, проверять сведения о базе данных и коллекциях, а также просматривать подробные конфигурации Milvus. Подробнее о Milvus WebUI см. в разделе <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a></p>
<p>Чтобы включить доступ к Milvus WebUI, необходимо настроить перенаправление портов прокси-пода на локальный порт.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете получить доступ к Milvus Web UI по адресу <code translate="no">http://localhost:27018</code>.</p>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Удаление Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
<div class="alert note">
<p>Storage V3 по умолчанию отключен. Включите его перед использованием функций, которые от него зависят. Требования и рекомендации по совместимости см. в разделе <a href="/docs/ru/storage-v3.md">«Storage V3</a>».</p>
</div>
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
    </button></h2><p>После установки Milvus вы можете:</p>
<ul>
<li><p>Ознакомьтесь с <a href="/docs/ru/quickstart.md">разделом «Быстрый старт»</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Ознакомьтесь с основными операциями Milvus:</p>
<ul>
<li><a href="/docs/ru/manage_databases.md">Управление базами данных</a></li>
<li><a href="/docs/ru/manage-collections.md">Управление коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставка, обновление и удаление</a></li>
<li><a href="/docs/ru/single-vector-search.md">Поиск по одному вектору</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабируйте кластер Milvus</a>.</p></li>
<li><p>Разверните кластер Milvus в облаке:</p>
<ul>
<li><a href="/docs/ru/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a> — интуитивно понятным веб-интерфейсом для мониторинга и управления Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/milvus_backup_overview.md">Milvus Backup</a> — инструментом с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/birdwatcher_overview.md">Birdwatcher</a> — инструментом с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Познакомьтесь с <a href="https://github.com/zilliztech/attu">Attu</a> — инструментом с графическим интерфейсом с открытым исходным кодом для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/monitor.md">Осуществляйте мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
