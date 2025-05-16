---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: Aprenda a instalar el clúster Milvus en Kubernetes utilizando Milvus Operator
title: Instalar Milvus Cluster con Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Ejecutar Milvus en Kubernetes con Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra cómo iniciar una instancia Milvus en Kubernetes utilizando <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a>.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator es una solución que le ayuda a desplegar y gestionar una pila completa de servicios Milvus en clusters Kubernetes (K8s). La pila incluye todos los componentes de Milvus y las dependencias relevantes como etcd, Pulsar y MinIO.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/es/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Crear un clúster K8s</a>.</p></li>
<li><p>Instale una <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Puede comprobar la StorageClass instalada de la siguiente manera.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compruebe <a href="/docs/es/v2.4.x/prerequisite-helm.md">los requisitos de hardware y software</a> antes de la instalación.</p></li>
<li><p>Antes de instalar Milvus, se recomienda utilizar la <a href="https://milvus.io/tools/sizing">Herramienta de Dimensionamiento de Milvus</a> para estimar los requisitos de hardware basados en el tamaño de sus datos. Esto ayuda a garantizar un rendimiento y una asignación de recursos óptimos para su instalación de Milvus.</p></li>
</ul>
<div class="alert note">
<p>Si encuentra algún problema al tirar de la imagen, póngase en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con detalles sobre el problema, y le proporcionaremos la asistencia necesaria.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Instalar Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator define los recursos personalizados de un cluster Milvus sobre <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">los recursos personalizados de Kubernetes</a>. Cuando se definen los recursos personalizados, puede utilizar las API de K8s de forma declarativa y gestionar la pila de despliegue de Milvus para garantizar su escalabilidad y alta disponibilidad.</p>
<p>Puede instalar Milvus Operator de cualquiera de las siguientes maneras:</p>
<ul>
<li><a href="#Install-with-Helm">Con Helm</a></li>
<li><a href="#Install-with-kubectl">Con kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Instalar con Helm</h3><p>Ejecute el siguiente comando para instalar Milvus Operator con Helm.</p>
<pre><code translate="no" class="language-shell">$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.1.9/milvus-operator-1.1.9.tgz
<button class="copy-code-btn"></button></code></pre>
<p>Verá una salida similar a la siguiente una vez finalizado el proceso de instalación.</p>
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
<h3 id="Install-with-kubectl" class="common-anchor-header">Instalar con kubectl</h3><p>Ejecute el siguiente comando para instalar Milvus Operator con <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verá un resultado similar al siguiente una vez finalizado el proceso de instalación.</p>
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
<p>Puede comprobar si el pod Milvus Operator se está ejecutando de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods -n milvus-<span class="hljs-keyword">operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Despliegue Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Despliegue de un cluster Milvus</h3><p>Una vez que el pod Milvus Operator se está ejecutando, puede desplegar un cluster Milvus como sigue.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>El comando anterior despliega un cluster Milvus con sus componentes y dependencias en pods separados utilizando configuraciones por defecto. Para personalizar estas configuraciones, le recomendamos que utilice la <a href="https://milvus.io/tools/sizing">herramienta Milvus Sizing Tool</a> para ajustar las configuraciones en función del tamaño real de sus datos y, a continuación, descargue el archivo YAML correspondiente. Para saber más sobre los parámetros de configuración, consulte <a href="https://milvus.io/docs/system_configuration.md">Milvus System Configurations Checklist</a>.</p>
<div class="alert note">
<ul>
<li>El nombre de la versión sólo debe contener letras, números y guiones. Los puntos no están permitidos en el nombre de la versión.</li>
<li>También puede desplegar una instancia de Milvus en modo autónomo, donde todos sus componentes están contenidos en un único pod. Para ello, cambie la URL del archivo de configuración en el comando anterior a <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Comprobar el estado del cluster Milvus</h4><p>Ejecute el siguiente comando para comprobar el estado del cluster Milvus</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que su cluster Milvus esté listo, la salida del comando anterior debería ser similar a la siguiente. Si el campo <code translate="no">status.status</code> permanece <code translate="no">Unhealthy</code>, su cluster Milvus está todavía en proceso de creación.</p>
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
<p>Milvus Operator crea dependencias Milvus, como etcd, Pulsar y MinIO, y luego componentes Milvus, como proxy, coordinadores y nodos.</p>
<p>Una vez que su cluster Milvus esté listo, el estado de todos los pods en el cluster Milvus debería ser similar al siguiente.</p>
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
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Reenvíe un puerto local a Milvus</h3><p>Ejecute el siguiente comando para obtener el puerto en el que sirve su cluster Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>La salida muestra que la instancia Milvus sirve en el puerto por defecto <strong>19530</strong>.</p>
<div class="alert note">
<p>Si ha desplegado Milvus en modo autónomo, cambie el nombre del pod de <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> a <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>A continuación, ejecute el siguiente comando para reenviar un puerto local al puerto en el que sirve Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, puede utilizar <code translate="no">:19530</code> en lugar de <code translate="no">27017:19530</code> en el comando anterior para dejar que <code translate="no">kubectl</code> asigne un puerto local para usted de modo que no tenga que gestionar conflictos de puertos.</p>
<p>Por defecto, el reenvío de puertos de kubectl sólo escucha en <code translate="no">localhost</code>. Utilice la bandera <code translate="no">address</code> si desea que Milvus escuche en las direcciones IP seleccionadas o en todas. El siguiente comando hace que port-forward escuche en todas las direcciones IP de la máquina anfitriona.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Desinstalar Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para desinstalar el cluster Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Cuando elimina el cluster Milvus utilizando la configuración por defecto, las dependencias como etcd, Pulsar y MinIO no se eliminan. Por lo tanto, la próxima vez que instale la misma instancia de cluster Milvus, estas dependencias se utilizarán de nuevo.</li>
<li>Para eliminar las dependencias y nubes virtuales privadas (PVCs) junto con el cluster Milvus, vea <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">archivo de configuración</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Desinstalar Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>También hay dos formas de desinstalar Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Desinstalar con Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Desinstalar con kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Desinstalar con Helm</h4><pre><code translate="no" class="language-shell">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Desinstalar con kubectl</h4><pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/v1.1.9/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Habiendo instalado Milvus en Docker, puede:</p>
<ul>
<li><p>Comprobar <a href="/docs/es/v2.4.x/quickstart.md">Hello Milvus</a> para ver lo que Milvus puede hacer.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/v2.4.x/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/v2.4.x/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/v2.4.x/manage-partitions.md">Gestionar Particiones</a></li>
<li><a href="/docs/es/v2.4.x/insert-update-delete.md">Insertar, Subinsertar y Eliminar</a></li>
<li><a href="/docs/es/v2.4.x/single-vector-search.md">Búsqueda monovectorial</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda Híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-helm.md">Actualice Milvus utilizando Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/v2.4.x/scaleout.md">Escale su cluster Milvus</a>.</p></li>
<li><p>Despliegue su clúster Milvu en nubes:</p>
<ul>
<li><a href="/docs/es/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/es/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Explore <a href="/docs/es/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para depurar Milvus y actualizaciones dinámicas de configuración.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/v2.4.x/monitor.md">Supervise Milvus con Prometheus</a>.</p></li>
</ul>
