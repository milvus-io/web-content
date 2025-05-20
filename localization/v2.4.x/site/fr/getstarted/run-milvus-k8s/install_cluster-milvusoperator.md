---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Apprenez à installer le cluster Milvus sur Kubernetes à l'aide de Milvus
  Operator.
title: Installer Milvus Cluster avec Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Exécuter Milvus dans Kubernetes avec Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment démarrer une instance Milvus dans Kubernetes à l'aide de <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a>.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator est une solution qui vous aide à déployer et à gérer une pile de services Milvus complète pour cibler les clusters Kubernetes (K8s). La pile comprend tous les composants Milvus et les dépendances pertinentes telles que etcd, Pulsar et MinIO.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/fr/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Créer un cluster K8s</a>.</p></li>
<li><p>Installer une <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Vous pouvez vérifier la StorageClass installée comme suit.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Vérifier la <a href="/docs/fr/v2.4.x/prerequisite-helm.md">configuration matérielle et logicielle requise</a> avant l'installation.</p></li>
<li><p>Avant d'installer Milvus, il est recommandé d'utiliser l'<a href="https://milvus.io/tools/sizing">outil de dimensionnement Milvus</a> pour estimer la configuration matérielle requise en fonction de la taille de vos données. Cela permet de garantir des performances et une allocation de ressources optimales pour l'installation de Milvus.</p></li>
</ul>
<div class="alert note">
<p>Si vous rencontrez des problèmes en tirant l'image, contactez-nous à l'adresse <a href="mailto:community@zilliz.com">community@zilliz.com</a> en précisant le problème, et nous vous fournirons l'assistance nécessaire.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Installer l'opérateur Milvus<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator définit les ressources personnalisées d'un cluster Milvus au-dessus des <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">ressources personnalisées de Kubernetes</a>. Lorsque des ressources personnalisées sont définies, vous pouvez utiliser les API K8s de manière déclarative et gérer la pile de déploiement Milvus pour garantir son évolutivité et sa haute disponibilité.</p>
<p>Vous pouvez installer Milvus Operator de l'une des manières suivantes :</p>
<ul>
<li><a href="#Install-with-Helm">Avec Helm</a></li>
<li><a href="#Install-with-kubectl">Avec kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Installation avec Helm</h3><p>Exécutez la commande suivante pour installer Milvus Operator avec Helm.</p>
<pre><code translate="no" class="language-shell">$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.1.9/milvus-operator-1.1.9.tgz
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le processus d'installation terminé, vous obtiendrez un résultat similaire à celui qui suit.</p>
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
<h3 id="Install-with-kubectl" class="common-anchor-header">Installation avec kubectl</h3><p>Exécutez la commande suivante pour installer Milvus Operator avec <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous obtiendrez un résultat similaire à ce qui suit à la fin du processus d'installation.</p>
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
<p>Vous pouvez vérifier si le pod Milvus Operator est en cours d'exécution comme suit :</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods -n milvus-<span class="hljs-keyword">operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Déployer Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Déployer un cluster Milvus</h3><p>Une fois que le pod Milvus Operator fonctionne, vous pouvez déployer un cluster Milvus comme suit.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>La commande ci-dessus déploie un cluster Milvus avec ses composants et dépendances dans des pods séparés en utilisant les configurations par défaut. Pour personnaliser ces paramètres, nous vous recommandons d'utiliser l'<a href="https://milvus.io/tools/sizing">outil de dimensionnement Milvus</a> pour ajuster les configurations en fonction de la taille réelle de vos données, puis de télécharger le fichier YAML correspondant. Pour en savoir plus sur les paramètres de configuration, reportez-vous à la <a href="https://milvus.io/docs/system_configuration.md">liste de contrôle des configurations du système Milvus</a>.</p>
<div class="alert note">
<ul>
<li>Le nom de la version ne doit contenir que des lettres, des chiffres et des tirets. Les points ne sont pas autorisés dans le nom de la version.</li>
<li>Vous pouvez également déployer une instance Milvus en mode autonome, où tous ses composants sont contenus dans un seul pod. Pour ce faire, modifiez l'URL du fichier de configuration dans la commande ci-dessus en <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Vérifier l'état du cluster Milvus</h4><p>Exécutez la commande suivante pour vérifier l'état du cluster Milvus</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que votre cluster Milvus est prêt, la sortie de la commande ci-dessus devrait être similaire à ce qui suit. Si le champ <code translate="no">status.status</code> reste à <code translate="no">Unhealthy</code>, votre cluster Milvus est toujours en cours de création.</p>
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
<p>Milvus Operator crée les dépendances Milvus, telles que etcd, Pulsar et MinIO, puis les composants Milvus, tels que le proxy, les coordinateurs et les nœuds.</p>
<p>Une fois que votre cluster Milvus est prêt, l'état de tous les pods dans le cluster Milvus doit être similaire à ce qui suit.</p>
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
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Transférer un port local vers Milvus</h3><p>Exécutez la commande suivante pour obtenir le port auquel votre cluster Milvus sert.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>La sortie montre que l'instance Milvus dessert le port par défaut <strong>19530</strong>.</p>
<div class="alert note">
<p>Si vous avez déployé Milvus en mode autonome, modifiez le nom du pod de <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> à <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Ensuite, exécutez la commande suivante pour transférer un port local vers le port sur lequel Milvus fonctionne.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>En option, vous pouvez utiliser <code translate="no">:19530</code> au lieu de <code translate="no">27017:19530</code> dans la commande ci-dessus pour permettre à <code translate="no">kubectl</code> d'allouer un port local pour vous afin que vous n'ayez pas à gérer les conflits de port.</p>
<p>Par défaut, le port-forwarding de kubectl n'écoute que sur <code translate="no">localhost</code>. Utilisez l'indicateur <code translate="no">address</code> si vous souhaitez que Milvus écoute sur l'adresse IP sélectionnée ou sur toutes les adresses IP. La commande suivante permet à port-forward d'écouter toutes les adresses IP de la machine hôte.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Désinstaller Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez la commande suivante pour désinstaller le cluster Milvus.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Lorsque vous supprimez le cluster Milvus à l'aide de la configuration par défaut, les dépendances telles que etcd, Pulsar et MinIO ne sont pas supprimées. Par conséquent, la prochaine fois que vous installerez la même instance de cluster Milvus, ces dépendances seront à nouveau utilisées.</li>
<li>Pour supprimer les dépendances et les nuages virtuels privés (PVC) avec le cluster Milvus, voir le <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">fichier de configuration</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Désinstaller Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Il existe également deux façons de désinstaller Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Désinstaller avec Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Désinstaller avec kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Désinstallation avec Helm</h4><pre><code translate="no" class="language-shell">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Désinstallation avec kubectl</h4><pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/v1.1.9/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Ce qui suit<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir installé Milvus dans Docker, vous pouvez :</p>
<ul>
<li><p>Vérifier <a href="/docs/fr/v2.4.x/quickstart.md">Hello Milvus</a> pour voir ce que Milvus peut faire.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/v2.4.x/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/v2.4.x/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/v2.4.x/insert-update-delete.md">Insérer, surinsérer et supprimer</a></li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md">Recherche à vecteur unique</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-helm.md">Mise à niveau de Milvus à l'aide de Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/v2.4.x/scaleout.md">Faire évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployer votre cluster Milvus sur des clouds :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, un outil open-source pour les sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, un outil open-source pour le débogage de Milvus et les mises à jour dynamiques de la configuration.</p></li>
<li><p>Découvrez <a href="https://milvus.io/docs/attu.md">Attu</a>, un outil GUI open-source pour la gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/v2.4.x/monitor.md">Surveiller Milvus avec Prometheus</a>.</p></li>
</ul>
