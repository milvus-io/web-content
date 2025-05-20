---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Apprenez à mettre à l'échelle manuellement ou automatiquement un cluster
  Milvus.
title: Échelle d'un amas de Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Mise à l'échelle d'un cluster Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge la mise à l'échelle horizontale de ses composants. Cela signifie que vous pouvez augmenter ou diminuer le nombre de nœuds de travail de chaque type en fonction de vos besoins.</p>
<p>Cette rubrique décrit comment mettre à l'échelle un cluster Milvus. Nous supposons que vous avez déjà <a href="/docs/fr/v2.4.x/install_cluster-helm.md">installé un cluster Milvus</a> avant de procéder à la mise à l'échelle. Nous vous recommandons également de vous familiariser avec l'<a href="/docs/fr/v2.4.x/architecture_overview.md">architecture Milvus</a> avant de commencer.</p>
<p>Ce didacticiel prend pour exemple la mise à l'échelle de trois nœuds de requête. Pour mettre à l'échelle d'autres types de nœuds, remplacez <code translate="no">queryNode</code> par le type de nœud correspondant dans la ligne de commande.</p>
<div class="alert note">
<p>Pour plus d'informations sur la mise à l'échelle d'un cluster avec Milvus Operator, reportez-vous à la section <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Mise à l'échelle d'un cluster avec Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">Qu'est-ce que la mise à l'échelle horizontale ?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>La mise à l'échelle horizontale comprend la mise à l'échelle vers le bas et la mise à l'échelle vers le haut.</p>
<h3 id="Scaling-out" class="common-anchor-header">Mise à l'échelle</h3><p>La mise à l'échelle consiste à augmenter le nombre de nœuds dans un cluster. Contrairement à la mise à l'échelle, la mise à l'échelle n'exige pas que vous allouiez davantage de ressources à un nœud de la grappe. Au contraire, la mise à l'échelle étend la grappe horizontalement en ajoutant des nœuds supplémentaires.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Scaleout</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Mise à l'échelle</span> </span></p>
<p>Selon l'<a href="/docs/fr/v2.4.x/architecture_overview.md">architecture Milvus</a>, les nœuds de travail sans état comprennent le nœud de requête, le nœud de données, le nœud d'index et le proxy. Par conséquent, vous pouvez étendre ce type de nœuds en fonction des besoins de votre entreprise et des scénarios d'application. La mise à l'échelle du cluster Milvus peut se faire manuellement ou automatiquement.</p>
<p>En règle générale, vous devrez redimensionner le cluster Milvus que vous avez créé s'il est surutilisé. Vous trouverez ci-dessous quelques situations typiques dans lesquelles vous pouvez avoir besoin d'une mise à l'échelle du cluster Milvus :</p>
<ul>
<li>L'utilisation de l'UC et de la mémoire est élevée pendant un certain temps.</li>
<li>Le débit des requêtes augmente.</li>
<li>Une vitesse d'indexation plus élevée est nécessaire.</li>
<li>Des volumes massifs de grands ensembles de données doivent être traités.</li>
<li>La haute disponibilité du service Milvus doit être assurée.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Mise à l'échelle</h3><p>La mise à l'échelle consiste à diminuer le nombre de nœuds dans un cluster. En général, vous devrez mettre à l'échelle le cluster Milvus que vous avez créé s'il est sous-utilisé. Voici quelques situations typiques dans lesquelles il est nécessaire de procéder à une mise à l'échelle du cluster Milvus :</p>
<ul>
<li>L'utilisation de l'UC et de la mémoire est faible pendant un certain temps.</li>
<li>Le débit des requêtes diminue.</li>
<li>Une vitesse d'indexation plus élevée n'est pas nécessaire.</li>
<li>La taille de l'ensemble de données à traiter est faible.</li>
</ul>
<div class="alert note">
Nous ne recommandons pas de réduire considérablement le nombre de nœuds de travail. Par exemple, s'il y a cinq nœuds de données dans le cluster, nous recommandons de réduire un nœud de données à la fois pour assurer la disponibilité du service. Si le service est disponible après la première tentative de mise à l'échelle, vous pouvez continuer à réduire le nombre de nœuds de données.</div>
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
    </button></h2><p>Exécutez <code translate="no">kubectl get pods</code> pour obtenir une liste des composants et de leur état de fonctionnement dans le cluster Milvus que vous avez créé.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvus prend uniquement en charge l'ajout de nœuds de travail et ne prend pas en charge l'ajout de composants de coordinateur.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Mise à l'échelle d'un cluster Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez faire évoluer votre cluster Milvus manuellement ou automatiquement. Si la mise à l'échelle automatique est activée, le cluster Milvus se réduit ou s'étend automatiquement lorsque la consommation des ressources CPU et mémoire atteint la valeur que vous avez définie.</p>
<p>Actuellement, Milvus 2.1.0 ne prend en charge que la mise à l'échelle manuelle.</p>
<h4 id="Scaling-out" class="common-anchor-header">Mise à l'échelle</h4><p>Exécutez <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> pour mettre à l'échelle manuellement le nœud de requête.</p>
<p>En cas de succès, trois pods en cours d'exécution sur le nœud de requête sont ajoutés comme indiqué dans l'exemple suivant.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">Mise à l'échelle</h4><p>Exécutez <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> pour mettre à l'échelle le nœud de requête.</p>
<p>En cas de succès, les trois pods en cours d'exécution sur le nœud de requête sont réduits à un seul, comme le montre l'exemple suivant.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
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
    </button></h2><ul>
<li><p>Si vous souhaitez apprendre à surveiller les services Milvus et à créer des alertes :</p>
<ul>
<li>Apprenez à <a href="/docs/fr/v2.4.x/monitor.md">surveiller Milvus avec Prometheus Operator sur Kubernetes</a>.</li>
</ul></li>
<li><p>Si vous êtes prêt à déployer votre cluster sur des clouds :</p>
<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/eks.md">déployer Milvus sur Amazon EKS avec Terraform</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/gcp.md">déployer le cluster Milvus sur GCP avec Kubernetes</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/azure.md">déployer Milvus sur Microsoft Azure avec Kubernetes</a></li>
</ul></li>
<li><p>Si vous cherchez des instructions sur la façon d'allouer des ressources :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/allocate.md#standalone">Allocation de ressources sur Kubernetes</a></li>
</ul></li>
</ul>
