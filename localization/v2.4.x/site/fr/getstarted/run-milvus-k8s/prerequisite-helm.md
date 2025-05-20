---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Apprenez les préparations nécessaires avant d'installer Milvus avec Helm.
title: Conditions requises pour l'exécution de Milvus sur Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Configuration requise pour l'exécution de Milvus sur Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page répertorie la configuration matérielle et logicielle requise pour que Milvus soit opérationnel.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Configuration matérielle requise<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Composant</th><th>Exigences</th><th>Recommandation</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>UNITÉ CENTRALE</td><td><ul><li>Intel 2nd Gen Core CPU ou supérieur</li><li>Silicium Apple</li></ul></td><td><ul><li>Autonome : 4 cœurs ou plus</li><li>Cluster : 8 cœurs ou plus</li></ul></td><td></td></tr>
<tr><td>Jeu d'instructions du CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La recherche de similarités vectorielles et la construction d'index dans Milvus nécessitent la prise en charge par l'unité centrale d'ensembles d'extensions SIMD (instructions uniques, données multiples). Assurez-vous que l'unité centrale prend en charge au moins l'une des extensions SIMD répertoriées. Voir <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU avec AVX</a> pour plus d'informations.</td></tr>
<tr><td>RAM</td><td><ul><li>Autonome : 8G</li><li>Cluster : 32G</li></ul></td><td><ul><li>Autonome : 16G</li><li>Cluster : 128G</li></ul></td><td>La taille de la RAM dépend du volume de données.</td></tr>
<tr><td>Disque dur</td><td>SSD SATA 3.0 ou CloudStorage</td><td>NVMe SSD ou supérieur</td><td>La taille du disque dur dépend du volume de données.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Exigences logicielles<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<p>kubectl est l'outil de ligne de commande pour Kubernetes. Utilisez une version de kubectl qui ne diffère pas de plus d'une version mineure de votre cluster. L'utilisation de la dernière version de kubectl permet d'éviter des problèmes imprévus.</p>
<p>minikube est nécessaire pour l'exécution locale d'un cluster Kubernetes. minikube nécessite Docker comme dépendance. Veillez à installer Docker avant d'installer Milvus à l'aide de Helm. Voir <a href="https://docs.docker.com/get-docker">Obtenir Docker</a> pour plus d'informations.</p>
<table>
<thead>
<tr><th>Système d'exploitation</th><th>Logiciel</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>Plateformes Linux</td><td><ul><li>Kubernetes 1.16 ou version ultérieure</li><li>kubectl</li><li>Helm 3.0.0 ou version ultérieure</li><li>minikube (pour Milvus standalone)</li><li>Docker 19.03 ou version ultérieure (pour Milvus standalone)</li></ul></td><td>Voir <a href="https://helm.sh/docs/">Helm Docs</a> pour plus d'informations.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Logiciel</th><th>Version</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Voir les <a href="#Additional-disk-requirements">exigences supplémentaires en matière de disque</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Exigences supplémentaires pour les disques</h3><p>Les performances des disques sont essentielles pour etcd. Il est fortement recommandé d'utiliser des disques SSD NVMe locaux. Une réponse plus lente du disque peut entraîner des élections fréquentes du cluster qui finiront par dégrader le service etcd.</p>
<p>Pour tester si votre disque est qualifié, utilisez <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idéalement, votre disque devrait atteindre plus de 500 IOPS et moins de 10ms pour la latence fsync du 99ème percentile. Lisez la <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentation</a> etcd pour plus de détails.</p>
<h2 id="FAQs" class="common-anchor-header">FAQs<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Comment puis-je démarrer un cluster K8s localement à des fins de test ?</h3><p>Vous pouvez utiliser des outils comme <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, et <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, pour configurer rapidement un cluster Kubernetes localement. La procédure suivante utilise minikube comme exemple.</p>
<ol>
<li>Télécharger minikube</li>
</ol>
<p>Allez sur la page <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, vérifiez que vous remplissez les conditions énumérées dans la section <strong>What you'll need</strong>, cliquez sur les boutons qui décrivent votre plateforme cible, et copiez les commandes pour télécharger et installer le binaire.</p>
<ol start="2">
<li>Démarrer un cluster K8s avec minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Vérifier l'état de la grappe K8s</li>
</ol>
<p>Vous pouvez vérifier l'état du cluster K8s installé à l'aide de la commande suivante.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Assurez-vous que vous pouvez accéder au cluster K8s via <code translate="no">kubectl</code>. Si vous n'avez pas installé <code translate="no">kubectl</code> localement, voir <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utiliser kubectl dans minikube</a>.</p>
</div>
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
    </button></h2><ul>
<li><p>Si votre matériel et vos logiciels répondent aux exigences, vous pouvez :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/install_cluster-milvusoperator.md">Exécuter Milvus dans Kubernets avec Milvus Operator</a></li>
<li><a href="/docs/fr/v2.4.x/install_cluster-helm.md">Exécuter Milvus dans Kubernetes avec Helm</a></li>
</ul></li>
<li><p>Voir <a href="/docs/fr/v2.4.x/system_configuration.md">Configuration du système</a> pour les paramètres que vous pouvez définir lors de l'installation de Milvus.</p></li>
</ul>
