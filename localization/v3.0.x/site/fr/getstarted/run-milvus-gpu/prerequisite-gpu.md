---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Apprenez les préparations nécessaires avant d'installer Milvus avec GPU.
title: Configuration requise pour l'installation de Milvus avec GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Configuration requise pour l'installation de Milvus avec GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page répertorie la configuration matérielle et logicielle requise pour installer Milvus avec prise en charge du GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Capacité de calcul<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>La capacité de calcul de votre périphérique GPU doit être l'une des suivantes : 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Pour vérifier si votre périphérique GPU répond à cette exigence, vérifiez la <a href="https://developer.nvidia.com/cuda-gpus">capacité de calcul de votre GPU</a> sur le site web des développeurs NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Pilote NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Le pilote NVIDIA de votre périphérique GPU doit être installé sur l'une des <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">distributions Linux prises en charge</a>, et le NVIDIA Container Toolkit a été installé en suivant <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">ce guide</a>.</p>
<p>Pour les utilisateurs d'Ubuntu 22.04, vous pouvez installer le pilote et le kit d'outils de conteneur à l'aide des commandes suivantes :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour les utilisateurs d'autres systèmes d'exploitation, reportez-vous au <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">guide d'installation officiel</a>.</p>
<p>Vous pouvez vérifier si le pilote a été installé correctement en exécutant la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>Il est recommandé d'utiliser les pilotes de la version 545 et plus.</p>
<h2 id="Software-requirements" class="common-anchor-header">Configuration logicielle requise<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Il est recommandé d'exécuter le cluster Kubernetes sur des plateformes Linux.</p>
<ul>
<li>kubectl est l'outil de ligne de commande pour Kubernetes. Utilisez une version de kubectl qui se situe à moins d'une différence de version mineure de votre cluster. L'utilisation de la dernière version de kubectl permet d'éviter des problèmes imprévus.</li>
<li>minikube est nécessaire pour l'exécution locale d'un cluster Kubernetes. minikube nécessite Docker comme dépendance. Veillez à installer Docker avant d'installer Milvus à l'aide de Helm. Voir <a href="https://docs.docker.com/get-docker">Obtenir Docker</a> pour plus d'informations.</li>
</ul>
<table>
<thead>
<tr><th>Système d'exploitation</th><th>Logiciel</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>Plateformes Linux</td><td><ul><li>Kubernetes 1.16 ou version ultérieure</li><li>kubectl</li><li>Helm 3.0.0 ou version ultérieure</li><li>minikube (pour Milvus standalone)</li><li>Docker 19.03 ou version ultérieure (pour Milvus standalone)</li></ul></td><td>Voir <a href="https://helm.sh/docs/">Helm Docs</a> pour plus d'informations.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Questions fréquemment posées<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Comment puis-je démarrer un cluster K8s localement à des fins de test ?</h3><p>Vous pouvez utiliser des outils tels que <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> et <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> pour configurer rapidement un cluster Kubernetes localement. La procédure suivante utilise minikube comme exemple.</p>
<ol>
<li>Télécharger minikube</li>
</ol>
<p>Allez sur la page <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, vérifiez que vous remplissez les conditions énumérées dans la section <strong>What you'll need</strong>, cliquez sur les boutons qui décrivent votre plateforme cible, et copiez les commandes pour télécharger et installer le binaire.</p>
<ol start="2">
<li>Démarrer un cluster K8s avec minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Vérifier l'état de la grappe K8s</li>
</ol>
<p>Vous pouvez vérifier l'état du cluster K8s installé à l'aide de la commande suivante.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Assurez-vous que vous pouvez accéder au cluster K8s via <code translate="no">kubectl</code>. Si vous n'avez pas installé <code translate="no">kubectl</code> localement, voir <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utiliser kubectl dans minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Comment puis-je démarrer un cluster K8s avec des nœuds de travail GPU ?</h3><p>Si vous préférez utiliser des nœuds de travail GPU, vous pouvez suivre les étapes ci-dessous pour créer un cluster K8s avec des nœuds de travail GPU. Nous recommandons d'installer Milvus sur un cluster K8s avec des nœuds de travail GPU et d'utiliser la classe de stockage par défaut provisionnée.</p>
<ol>
<li>Préparation des nœuds de travail GPU</li>
</ol>
<p>Pour utiliser des nœuds de travail GPU, suivez les étapes de la section <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Préparer vos nœuds GPU</a>.</p>
<ol start="2">
<li>Activer la prise en charge du GPU sur K8s</li>
</ol>
<p>Déployez le <strong>plugin nvidia-device</strong> avec Helm en suivant <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">ces étapes</a>.</p>
<p>Après la configuration, affichez les ressources GPU à l'aide de la commande suivante. Remplacez <code translate="no">&lt;gpu-worker-node&gt;</code> par le nom réel du nœud.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
