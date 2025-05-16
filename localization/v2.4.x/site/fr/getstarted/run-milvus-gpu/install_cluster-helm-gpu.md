---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: Découvrez comment installer le cluster Milvus sur Kubernetes.
title: Exécuter Milvus avec le support GPU en utilisant Helm Chart
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Exécution de Milvus avec prise en charge du GPU à l'aide de Helm Chart<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment démarrer une instance Milvus avec prise en charge du GPU à l'aide de Helm Chart.</p>
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
    </button></h2><p>Helm utilise un format d'emballage appelé diagramme. Un diagramme est une collection de fichiers qui décrivent un ensemble connexe de ressources Kubernetes. Milvus fournit un ensemble de diagrammes pour vous aider à déployer les dépendances et les composants Milvus. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chart</a> est une solution qui démarre le déploiement de Milvus sur un cluster Kubernetes (K8s) à l'aide du gestionnaire de paquets Helm.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Installer Helm CLI</a>.</p></li>
<li><p><a href="/docs/fr/v2.4.x/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">Créer un cluster K8s avec des nœuds de travail GPU</a>.</p></li>
<li><p>Installer une <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Vous pouvez vérifier la StorageClass installée comme suit.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Vérifiez la <a href="/docs/fr/v2.4.x/prerequisite-gpu.md">configuration matérielle et logicielle requise</a> avant l'installation.</p></li>
</ul>
<div class="alert note">
<p>Si vous rencontrez des problèmes lors de l'extraction de l'image, contactez-nous à l'adresse <a href="mailto:community@zilliz.com">community@zilliz.com</a> en précisant le problème, et nous vous fournirons l'assistance nécessaire.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Installer la carte Helm pour Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm est un gestionnaire de paquets K8s qui peut vous aider à déployer Milvus rapidement.</p>
<ol>
<li>Ajouter le dépôt Milvus Helm.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Le dépôt Milvus Helm Charts à l'adresse <code translate="no">https://milvus-io.github.io/milvus-helm/</code> a été archivé et vous pouvez obtenir des mises à jour supplémentaires à l'adresse <code translate="no">https://zilliztech.github.io/milvus-helm/</code> comme suit :</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Le dépôt archivé est toujours disponible pour les cartes jusqu'à la version 4.0.31. Pour les versions ultérieures, utilisez le nouveau repo à la place.</p>
</div>
<ol start="2">
<li>Mettre à jour les graphiques localement.</li>
</ol>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Démarrer Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez installé la carte Helm, vous pouvez démarrer Milvus sur Kubernetes. Dans cette section, nous allons vous guider à travers les étapes pour démarrer Milvus avec le support GPU.</p>
<p>Vous devez démarrer Milvus avec Helm en spécifiant le nom de la version, la carte et les paramètres que vous souhaitez modifier. Dans ce guide, nous utilisons <code translate="no">my-release</code> comme nom de version. Pour utiliser un nom de version différent, remplacez <code translate="no">my-release</code> dans les commandes suivantes par celui que vous utilisez.</p>
<p>Milvus vous permet d'affecter un ou plusieurs dispositifs GPU à Milvus.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. Affectation d'un seul périphérique GPU</h3><p>Milvus avec prise en charge GPU vous permet d'affecter un ou plusieurs dispositifs GPU.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus autonome</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. Affectation de plusieurs dispositifs GPU</h3><p>En plus d'un seul dispositif GPU, il est possible d'affecter plusieurs dispositifs GPU à Milvus.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans la configuration ci-dessus, l'indexNode et le queryNode partagent deux GPU. Pour affecter des GPU différents à l'indexNode et au queryNode, vous pouvez modifier la configuration en conséquence en définissant <code translate="no">extraEnv</code> dans le fichier de configuration comme suit :</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>Le nom de la version ne doit contenir que des lettres, des chiffres et des tirets. Les points ne sont pas autorisés dans le nom de la version.</li>
      <li>La ligne de commande par défaut installe la version cluster de Milvus lors de l'installation de Milvus avec Helm. D'autres paramètres sont nécessaires lors de l'installation autonome de Milvus.</li>
      <li>Selon le <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guide de migration des API obsolètes de Kuberenetes</a>, la version API <b>policy/v1beta1</b> de PodDisruptionBudget n'est plus servie à partir de la version 1.25. Il vous est suggéré de migrer les manifestes et les clients API pour utiliser la version API <b>policy/v1</b> à la place. <br/>En guise de solution pour les utilisateurs qui utilisent encore la version API <b>policy/v1beta1</b> de PodDisruptionBudget sur les Kuberenetes v1.25 et ultérieures, vous pouvez exécuter la commande suivante pour installer Milvus :<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>Voir <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> et <a href="https://helm.sh/docs/">Helm</a> pour plus d'informations.</li>
    </ul>
  </div>
</li>
<li><p>Milvus autonome</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans la configuration ci-dessus, l'indexNode et le queryNode partagent deux GPU. Pour affecter des GPU différents à l'indexNode et au queryNode, vous pouvez modifier la configuration en conséquence en définissant extraEnv dans le fichier de configuration comme suit :</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Vérifier l'état de Milvus</h3><p>Exécutez la commande suivante pour vérifier l'état de Milvus :</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Après le démarrage de Milvus, la colonne <code translate="no">READY</code> affiche <code translate="no">1/1</code> pour tous les pods.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
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
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus autonome</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Transférer un port local vers Milvus</h3><p>Vérifier le port local sur lequel le serveur Milvus écoute. Remplacez le nom du pod par le vôtre.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, exécutez la commande suivante pour transférer un port local vers le port utilisé par Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>En option, vous pouvez utiliser <code translate="no">:19530</code> au lieu de <code translate="no">27017:19530</code> dans la commande ci-dessus pour permettre à <code translate="no">kubectl</code> d'allouer un port local pour vous afin que vous n'ayez pas à gérer les conflits de port.</p>
<p>Par défaut, le port-forwarding de kubectl n'écoute que sur <code translate="no">localhost</code>. Utilisez l'indicateur <code translate="no">address</code> si vous souhaitez que Milvus écoute sur l'adresse IP sélectionnée ou sur toutes les adresses IP. La commande suivante fait en sorte que port-forward écoute sur toutes les adresses IP de la machine hôte.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
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
    </button></h2><p>Exécutez la commande suivante pour désinstaller Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir installé Milvus, vous pouvez :</p>
<ul>
<li><p>Consulter <a href="/docs/fr/v2.4.x/quickstart.md">Quickstart</a> pour voir ce que Milvus peut faire.</p></li>
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
