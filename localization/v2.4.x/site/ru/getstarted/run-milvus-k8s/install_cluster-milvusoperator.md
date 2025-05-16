---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Узнайте, как установить кластер Milvus на Kubernetes с помощью Milvus
  Operator.
title: Установите Milvus Cluster с помощью Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Запуск Milvus в Kubernetes с помощью Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить экземпляр Milvus в Kubernetes с помощью <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a>.</p>
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
    </button></h2><p>Milvus Operator - это решение, которое помогает развернуть и управлять полным стеком сервисов Milvus в целевых кластерах Kubernetes (K8s). Стек включает в себя все компоненты Milvus и соответствующие зависимости, такие как etcd, Pulsar и MinIO.</p>
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
<li><p><a href="/docs/ru/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Создайте кластер K8s</a>.</p></li>
<li><p>Установите <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Проверить установленный StorageClass можно следующим образом.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Перед установкой проверьте <a href="/docs/ru/v2.4.x/prerequisite-helm.md">требования к оборудованию и программному обеспечению</a>.</p></li>
<li><p>Перед установкой Milvus рекомендуется использовать <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> для оценки требований к оборудованию в зависимости от объема данных. Это поможет обеспечить оптимальную производительность и распределение ресурсов при установке Milvus.</p></li>
</ul>
<div class="alert note">
<p>Если у вас возникнут проблемы с установкой образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a> и подробно расскажите о проблеме, и мы окажем вам необходимую поддержку.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Установка Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator определяет пользовательские ресурсы кластера Milvus поверх <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Kubernetes Custom Resources</a>. Когда пользовательские ресурсы определены, вы можете использовать API K8s в декларативном виде и управлять стеком развертывания Milvus для обеспечения его масштабируемости и высокой доступности.</p>
<p>Вы можете установить Milvus Operator одним из следующих способов:</p>
<ul>
<li><a href="#Install-with-Helm">С помощью Helm</a></li>
<li><a href="#Install-with-kubectl">С помощью kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Установка с помощью Helm</h3><p>Выполните следующую команду для установки Milvus Operator с помощью Helm.</p>
<pre><code translate="no" class="language-shell">$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.1.9/milvus-operator-1.1.9.tgz
<button class="copy-code-btn"></button></code></pre>
<p>По окончании процесса установки вы увидите вывод, похожий на следующий.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  <span class="hljs-number">7</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">40</span> <span class="hljs-number">2022</span>
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: <span class="hljs-number">1</span>
TEST SUITE: <span class="hljs-literal">None</span>
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check <span class="hljs-keyword">if</span> its successfully installed
If Operator <span class="hljs-keyword">not</span> started successfully, check the checke<span class="hljs-string">r&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
</span><button class="copy-code-btn"></button></code></pre>
<h3 id="Install-with-kubectl" class="common-anchor-header">Установка с помощью kubectl</h3><p>Выполните следующую команду для установки Milvus Operator с помощью <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>После завершения процесса установки вы увидите результат, аналогичный следующему.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>Проверить, запущена ли капсула Milvus Operator, можно следующим образом:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods -n milvus-<span class="hljs-keyword">operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Развернуть Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Развертывание кластера Milvus</h3><p>После того как капсула Milvus Operator запущена, вы можете развернуть кластер Milvus следующим образом.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Приведенная выше команда развертывает кластер Milvus с его компонентами и зависимостями в отдельных подкадах с использованием конфигураций по умолчанию. Чтобы настроить эти параметры, мы рекомендуем использовать <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> для корректировки конфигураций на основе фактического объема данных, а затем загрузить соответствующий YAML-файл. Чтобы узнать больше о параметрах конфигурации, обратитесь к разделу <a href="https://milvus.io/docs/system_configuration.md">Контрольный список конфигураций системы Milvus</a>.</p>
<div class="alert note">
<ul>
<li>Название релиза должно содержать только буквы, цифры и тире. Точки в имени релиза не допускаются.</li>
<li>Вы также можете развернуть экземпляр Milvus в автономном режиме, когда все его компоненты находятся в одной капсуле. Для этого измените URL-адрес файла конфигурации в приведенной выше команде на <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Проверка состояния кластера Milvus</h4><p>Выполните следующую команду, чтобы проверить состояние кластера Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>Когда ваш кластер Milvus будет готов, результат выполнения вышеуказанной команды должен быть похож на следующий. Если поле <code translate="no">status.status</code> остается <code translate="no">Unhealthy</code>, ваш кластер Milvus все еще находится в процессе создания.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    reason: StorageReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    message: Pulsar <span class="hljs-keyword">is</span> ready
    reason: PulsarReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    message: Etcd endpoints <span class="hljs-keyword">is</span> healthy
    reason: EtcdReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    message: All Milvus components are healthy
    reason: MilvusClusterHealthy
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:<span class="hljs-number">19530</span>
  status: Healthy
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Operator создает зависимости Milvus, такие как etcd, Pulsar и MinIO, а затем компоненты Milvus, такие как прокси, координаторы и узлы.</p>
<p>Когда ваш кластер Milvus будет готов, состояние всех стручков в кластере Milvus должно быть примерно таким, как показано ниже.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods

NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-milvus-datanode<span class="hljs-number">-5</span>c686bd65-wxtmf      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-indexnode<span class="hljs-number">-5b</span>9787b54-xclbx     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-querynode<span class="hljs-number">-5b</span>cb59f6-nhqqw      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-mixcoord-fdcccfc84<span class="hljs-number">-9964</span>g      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-toolset<span class="hljs-number">-0</span>                     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Перенаправьте локальный порт в Milvus</h3><p>Выполните следующую команду, чтобы узнать порт, через который работает ваш кластер Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Результат показывает, что экземпляр Milvus обслуживается на порту по умолчанию <strong>19530</strong>.</p>
<div class="alert note">
<p>Если вы развернули Milvus в автономном режиме, измените имя стручка с <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> на <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Затем выполните следующую команду, чтобы перенаправить локальный порт на порт, на котором работает Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>По желанию вы можете использовать <code translate="no">:19530</code> вместо <code translate="no">27017:19530</code> в приведенной выше команде, чтобы <code translate="no">kubectl</code> выделил локальный порт для вас, и вам не пришлось бы управлять конфликтами портов.</p>
<p>По умолчанию переадресация портов в kubectl прослушивает только <code translate="no">localhost</code>. Используйте флаг <code translate="no">address</code>, если хотите, чтобы Milvus слушал выбранный или все IP-адреса. Следующая команда заставляет port-forward слушать все IP-адреса на хост-машине.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Выполните следующую команду, чтобы удалить кластер Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>При удалении кластера Milvus с использованием конфигурации по умолчанию такие зависимости, как etcd, Pulsar и MinIO, не удаляются. Поэтому в следующий раз при установке того же экземпляра кластера Milvus эти зависимости будут использоваться снова.</li>
<li>Чтобы удалить зависимости и частные виртуальные облака (PVC) вместе с кластером Milvus, см. <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">файл конфигурации</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Деинсталляция Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Существует также два способа удаления Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Деинсталляция с помощью Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Деинсталляция с помощью kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Деинсталляция с помощью Helm</h4><pre><code translate="no" class="language-shell">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Деинсталляция с помощью kubectl</h4><pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/v1.1.9/deploy/manifests/deployment.yaml</span>
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
<li><p>Проверить <a href="/docs/ru/v2.4.x/quickstart.md">Hello Milvus</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Изучить основные операции Milvus:</p>
<ul>
<li><a href="/docs/ru/v2.4.x/manage_databases.md">Управлять базами данных</a></li>
<li><a href="/docs/ru/v2.4.x/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/v2.4.x/manage-partitions.md">Управлять разделами</a></li>
<li><a href="/docs/ru/v2.4.x/insert-update-delete.md">Вставка, вставка и удаление</a></li>
<li><a href="/docs/ru/v2.4.x/single-vector-search.md">Одновекторный поиск</a></li>
<li><a href="/docs/ru/v2.4.x/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/v2.4.x/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/v2.4.x/scaleout.md">Масштабирование кластера Milvus</a>.</p></li>
<li><p>Развертывание кластера Milvu в облаках:</p>
<ul>
<li><a href="/docs/ru/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Изучите <a href="/docs/ru/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, инструмент с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, инструмент с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Изучите <a href="https://milvus.io/docs/attu.md">Attu</a>, инструмент с открытым исходным кодом GUI для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/v2.4.x/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
