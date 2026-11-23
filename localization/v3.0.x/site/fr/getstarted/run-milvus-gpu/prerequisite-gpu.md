---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Découvrez les préparatifs nécessaires avant d'installer Milvus avec un GPU.
title: Configuration requise pour l'installation de Milvus avec prise en charge GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Configuration requise pour l'installation de Milvus avec prise en charge GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page répertorie la configuration matérielle et logicielle requise pour configurer Milvus avec prise en charge du GPU.</p>
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
    </button></h2><p>L'image GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> est conçue pour les cartes graphiques dotées d'une capacité de calcul de 7,0, 7,5, 8,0, 8,6, 9,0, 10,0 ou 12,0. Votre carte graphique doit disposer de l’une de ces capacités de calcul, ou d’une capacité de calcul plus récente capable d’exécuter du code conçu pour l’une d’entre elles, comme 8.9 ou 12.1. Pour plus de détails, consultez la section « <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">Compatibilité binaire</a> et <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">fonctionnalités spécifiques à chaque famille</a> ».</p>
<p>Pour vérifier si votre carte graphique répond à cette exigence, consultez la section « <a href="https://developer.nvidia.com/cuda-gpus">Capacité de calcul de votre GPU</a> » sur le site Web des développeurs NVIDIA.</p>
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
    </button></h2><p>Votre hôte doit exécuter l’une des <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">distributions Linux prises en charge par le NVIDIA Container Toolkit</a> et disposer du pilote NVIDIA correspondant à votre carte graphique.</p>
<p>L’image GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> est basée sur CUDA 12.9 Update 1. Son paramètre « <code translate="no">NVIDIA_REQUIRE_CUDA</code> » nécessite la version <code translate="no">cuda&gt;=12.9</code>; le pilote NVIDIA doit donc prendre en charge CUDA 12.9 ou une version ultérieure. Pour CUDA 12.9 Update 1, NVIDIA indique la version 575.57.08 ou ultérieure du pilote sous Linux x86_64. Pour connaître les versions de pilote correspondant à chaque version de CUDA, consultez <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">les notes de mise à jour du CUDA Toolkit</a>.</p>
<p>Ce même paramètre accepte également les pilotes des branches 535, 550, 560, 565 et 570 sur certaines marques de GPU, mais pas sur les GPU GeForce ou Titan. Avec ces pilotes, l’image repose sur <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">la compatibilité ascendante de CUDA</a>, que NVIDIA ne prend en charge que sur les GPU NVIDIA Data Center, certaines références NGC Server Ready des cartes RTX et les cartes Jetson. Si le pilote ne répond pas à ces exigences, le NVIDIA Container Toolkit signale une erreur « <code translate="no">unsatisfied condition</code> » et ne configure pas le GPU pour le conteneur.</p>
<p>Pour les utilisateurs d’Ubuntu 22.04, vous pouvez installer le pilote à l’aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les GPU dotés d’une capacité de calcul de 10,0 ou 12,0 (Blackwell) ne sont pris en charge que par les modules open source du pilote NVIDIA. Pour ces GPU, installez <code translate="no">nvidia-headless-580-open</code> au lieu de <code translate="no">nvidia-headless-580</code>. Les modules open source du noyau ne prennent pas en charge les GPU antérieurs à Turing (capacité de calcul 7,5), tels que Volta (7,0) ; conservez donc <code translate="no">nvidia-headless-580</code> pour ceux-ci.</p>
<p>Pour les autres distributions Linux, consultez le <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Guide d’installation du pilote NVIDIA</a>.</p>
<p>Vous pouvez vérifier si le pilote a été correctement installé en exécutant la commande suivante. La sortie affiche la version du pilote installé.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Installez le NVIDIA Container Toolkit en suivant les étapes correspondant à votre distribution Linux dans le <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">guide d’installation du NVIDIA Container Toolkit</a>.</p>
<p>Si vous installez Milvus avec Docker Compose, configurez Docker pour qu’il utilise le NVIDIA Container Runtime, redémarrez le démon Docker, puis exécutez une charge de travail d’exemple pour vérifier que les conteneurs peuvent accéder au GPU :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>La dernière commande exécute ` <code translate="no">nvidia-smi</code> ` dans un conteneur et affiche des informations sur les périphériques GPU présents sur l’hôte. Si vous installez Milvus sur Kubernetes, préparez plutôt vos nœuds de travail GPU comme décrit dans la FAQ à la fin de cette page.</p>
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
    </button></h2><p>Les exigences de cette section et de la FAQ ci-dessous s’appliquent lorsque vous installez Milvus avec prise en charge du GPU sur Kubernetes à l’aide de Helm.</p>
<p>Il est recommandé d’exécuter le cluster Kubernetes sur des plateformes Linux.</p>
<ul>
<li>kubectl est l’outil en ligne de commande de Kubernetes. Utilisez une version de kubectl dont la version mineure ne diffère pas de plus d’une version de celle de votre cluster. L’utilisation de la dernière version de kubectl permet d’éviter des problèmes imprévus.</li>
<li>minikube est requis pour exécuter un cluster Kubernetes en local. minikube nécessite Docker comme dépendance. Assurez-vous d’installer Docker avant d’installer Milvus à l’aide de Helm. Consultez la section « <a href="https://docs.docker.com/get-docker">Obtenir Docker</a> » pour plus d’informations.</li>
</ul>
<table>
<thead>
<tr><th>Système d’exploitation</th><th>Logiciels</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>Plateformes Linux</td><td><ul><li>Kubernetes 1.16 ou version ultérieure</li><li>kubectl</li><li>Helm 3.0.0 ou version ultérieure</li><li>minikube (pour Milvus en mode autonome)</li><li>Docker 19.03 ou version ultérieure (pour Milvus en mode autonome)</li></ul></td><td>Consultez <a href="https://helm.sh/docs/">la documentation Helm</a> pour plus d'informations.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Foire aux questions<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Comment puis-je démarrer un cluster K8s localement à des fins de test ?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous pouvez utiliser des outils tels que <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> et <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> pour configurer rapidement un cluster Kubernetes en local. La procédure suivante utilise minikube à titre d'exemple.</p>
<ol>
<li>Télécharger minikube</li>
</ol>
<p>Rendez-vous sur la page <a href="https://minikube.sigs.k8s.io/docs/start/">« Get Started</a> », vérifiez que vous remplissez les conditions énumérées dans la section <strong>« What you’ll need</strong> », cliquez sur les boutons correspondant à votre plateforme cible, puis copiez les commandes pour télécharger et installer le binaire.</p>
<ol start="2">
<li>Démarrer un cluster K8s à l’aide de minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Vérifier l’état du cluster K8s</li>
</ol>
<p>Vous pouvez vérifier l’état du cluster K8s installé à l’aide de la commande suivante.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Assurez-vous de pouvoir accéder au cluster K8s via <code translate="no">kubectl</code>. Si vous n’avez pas installé <code translate="no">kubectl</code> localement, consultez la section « <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utiliser kubectl dans minikube</a> ».</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Comment démarrer un cluster K8s avec des nœuds de travail équipés de GPU ?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous préférez utiliser des nœuds de travail équipés de GPU, vous pouvez suivre les étapes ci-dessous pour créer un cluster K8s avec des nœuds de travail GPU. Nous vous recommandons d’installer Milvus sur un cluster K8s avec des nœuds de travail GPU et d’utiliser la classe de stockage par défaut fournie.</p>
<ol>
<li>Préparation des nœuds de travail GPU</li>
</ol>
<p>Pour utiliser des nœuds de travail équipés d’un GPU, suivez les étapes décrites dans la section « <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">Préparer vos nœuds GPU</a> ».</p>
<ol start="2">
<li>Activer la prise en charge des GPU sur K8s</li>
</ol>
<p>Déployez le <strong>plugin nvidia-device-plugin</strong> avec Helm en suivant <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">ces étapes</a>.</p>
<p>Une fois la configuration terminée, affichez les ressources GPU à l'aide de la commande suivante. Remplacez « <code translate="no">&lt;gpu-worker-node&gt;</code> » par le nom réel du nœud.</p>
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
