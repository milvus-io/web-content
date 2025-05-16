---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Découvrez comment mettre à niveau le cluster Milvus avec Helm Chart.
title: Mise à niveau du cluster Milvus avec les cartes Helm
---
<div class="tab-wrapper"><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>Opérateur</a><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>MilvusHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Mise à niveau du cluster Milvus avec les cartes Helm<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit comment mettre à niveau votre cluster Milvus avec les cartes Milvus Helm.</p>
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
<li>Version de Helm &gt;= 3.14.0</li>
<li>Version de Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Depuis la version 4.2.21 de la carte Milvus-Helm, nous avons introduit la carte pulsar-v3.x comme dépendance. Pour une compatibilité ascendante, veuillez mettre à jour votre helm vers la version 3.14 ou une version plus récente, et assurez-vous d'ajouter l'option <code translate="no">--reset-then-reuse-values</code> chaque fois que vous utilisez <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">Vérifier la carte Milvus Helm<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez les commandes suivantes pour vérifier les nouvelles versions de Milvus.</p>
<pre><code translate="no">$ helm repo update zilliztech
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Le repo Milvus Helm Charts à l'adresse <code translate="no">https://milvus-io.github.io/milvus-helm/</code> a été archivé et vous pouvez obtenir d'autres mises à jour à l'adresse <code translate="no">https://zilliztech.github.io/milvus-helm/</code> comme suit :</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Le répertoire archivé est toujours disponible pour les cartes jusqu'à la version 4.0.31. Pour les versions ultérieures, utilisez plutôt le nouveau repo.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez choisir le chemin de mise à niveau pour votre Milvus comme suit :</p>
<div style="display: none;">- [Effectuer une mise à niveau continue](#conduct-a-rolling-upgrade) de Milvus v2.2.3 et versions ultérieures vers v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Mettre à niveau Milvus à l'aide de Helm</a> pour une mise à niveau d'une version mineure antérieure à v2.2.3 vers v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrer les métadonnées</a> avant la mise à niveau de Milvus v2.1.x vers v2.4.23.</p></li>
</ul>
<div style="display: none;">
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Effectuer une mise à niveau continue<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Depuis Milvus 2.2.3, vous pouvez configurer les coordinateurs Milvus pour qu'ils fonctionnent en mode actif-veille et activer la fonction de mise à niveau continue pour eux, afin que Milvus puisse répondre aux demandes entrantes pendant les mises à niveau des coordinateurs. Dans les versions précédentes, les coordinateurs doivent être supprimés puis créés lors d'une mise à niveau, ce qui peut entraîner certains temps d'arrêt du service.</p>
<p>Les mises à niveau en continu exigent que les coordinateurs fonctionnent en mode actif-veille. Vous pouvez utiliser <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">le script</a> que nous fournissons pour configurer les coordinateurs afin qu'ils travaillent en mode veille active et lancer la mise à jour continue.</p>
<p>Basé sur les capacités de mise à jour continue fournies par Kubernetes, le script ci-dessus applique une mise à jour ordonnée des déploiements en fonction de leurs dépendances. En outre, Milvus met en œuvre un mécanisme garantissant que ses composants restent compatibles avec ceux qui en dépendent pendant la mise à niveau, ce qui réduit considérablement les temps d'arrêt potentiels des services.</p>
<p>Le script s'applique uniquement à la mise à niveau de Milvus installé avec Helm. Le tableau suivant répertorie les drapeaux de commande disponibles dans les scripts.</p>
<table>
<thead>
<tr><th>Paramètres</th><th>Description de la commande</th><th>Valeur par défaut</th><th>Requis</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nom de l'instance Milvus</td><td><code translate="no">None</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">n</code></td><td>Espace de noms dans lequel Milvus est installé</td><td><code translate="no">default</code></td><td>Faux</td></tr>
<tr><td><code translate="no">t</code></td><td>Version cible de Milvus</td><td><code translate="no">None</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">w</code></td><td>Nouvelle balise d'image Milvus</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">o</code></td><td>Fonctionnement</td><td><code translate="no">update</code></td><td>Faux</td></tr>
</tbody>
</table>
<p>Une fois que vous vous êtes assuré que tous les déploiements de votre instance Milvus sont dans leur état normal. Vous pouvez exécuter la commande suivante pour mettre à niveau l'instance Milvus vers la version 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>Le script code en dur l'ordre de mise à niveau des déploiements et ne peut pas être modifié.</li>
<li>Le script utilise <code translate="no">kubectl patch</code> pour mettre à jour les déploiements et <code translate="no">kubectl rollout status</code> pour surveiller leur état.</li>
<li>Le script utilise <code translate="no">kubectl patch</code> pour mettre à jour l'étiquette <code translate="no">app.kubernetes.io/version</code> des déploiements avec celle spécifiée après l'indicateur <code translate="no">-t</code> dans la commande.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Mise à niveau de Milvus à l'aide de Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour mettre à niveau Milvus à partir d'une version mineure antérieure à la v2.2.3 vers la dernière version, exécutez les commandes suivantes :</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez la version du diagramme Helm dans la commande précédente. Pour plus d'informations sur la manière d'obtenir la version du tableau Helm, reportez-vous à la section <a href="#Check-the-Milvus-version">Vérifier la version de Milvus</a>.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrer les métadonnées<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Depuis Milvus 2.2.0, les métadonnées sont incompatibles avec celles des versions précédentes. Les exemples suivants supposent une mise à niveau de Milvus 2.1.4 vers Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Vérifier la version de Milvus</h3><p>Exécutez <code translate="no">$ helm list</code> pour vérifier la version de votre application Milvus. Vous pouvez voir que <code translate="no">APP VERSION</code> est 2.1.4.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>    
<span class="hljs-keyword">new</span>-release         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Vérifier les pods en cours d'exécution</h3><p>Exécutez <code translate="no">$ kubectl get pods</code> pour vérifier les pods en cours d'exécution. Vous pouvez voir la sortie suivante.</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datacoord<span class="hljs-number">-664</span>c58798d-fl75s    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datanode<span class="hljs-number">-5f</span>75686c55-xfg2r     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexcoord<span class="hljs-number">-5f</span>98b97589<span class="hljs-number">-2l</span>48r   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexnode<span class="hljs-number">-857b</span>4ddf98-vmd75    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querycoord-c454f44cd-dwmwq    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querynode<span class="hljs-number">-76b</span>b4946d-lbrz6     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-tjxpj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-c8vvc             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Vérifier la balise image</h3><p>Vérifiez la balise d'image pour le pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Vous pouvez voir que la version de votre cluster Milvus est v2.1.4.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrer les métadonnées</h3><p>Un changement majeur dans Milvus 2.2 est la structure des métadonnées des index de segments. Par conséquent, vous devez utiliser Helm pour migrer les métadonnées lors de la mise à niveau de Milvus de la version 2.1.x à la version 2.2.0. Voici un <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">script</a> qui vous permettra de migrer vos métadonnées en toute sécurité.</p>
<p>Ce script ne s'applique qu'à Milvus installé sur un cluster K8s. Revenez d'abord à la version précédente à l'aide de l'opération de retour en arrière si une erreur se produit pendant le processus.</p>
<p>Le tableau suivant répertorie les opérations que vous pouvez effectuer pour la migration des métadonnées.</p>
<table>
<thead>
<tr><th>Paramètres</th><th>Description de l'opération</th><th>Valeur par défaut</th><th>Nom de l'instance Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Le nom de l'instance Milvus.</td><td><code translate="no">None</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">n</code></td><td>L'espace de noms dans lequel Milvus est installé.</td><td><code translate="no">default</code></td><td>Faux</td></tr>
<tr><td><code translate="no">s</code></td><td>La version source de Milvus.</td><td><code translate="no">None</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">t</code></td><td>La version cible de Milvus.</td><td><code translate="no">None</code></td><td>Vrai</td></tr>
<tr><td><code translate="no">r</code></td><td>Le chemin racine de Milvus meta.</td><td><code translate="no">by-dev</code></td><td>Faux</td></tr>
<tr><td><code translate="no">w</code></td><td>La nouvelle balise image de Milvus.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>Faux</td></tr>
<tr><td><code translate="no">m</code></td><td>La balise meta de l'image de migration.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>Faux</td></tr>
<tr><td><code translate="no">o</code></td><td>L'opération de méta-migration.</td><td><code translate="no">migrate</code></td><td>Faux</td></tr>
<tr><td><code translate="no">d</code></td><td>S'il faut supprimer le pod de migration une fois la migration terminée.</td><td><code translate="no">false</code></td><td>Faux</td></tr>
<tr><td><code translate="no">c</code></td><td>La classe de stockage pour le pvc de métamigration.</td><td><code translate="no">default storage class</code></td><td>Faux</td></tr>
<tr><td><code translate="no">e</code></td><td>Le point d'entrée etcd utilisé par milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>Faux</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrer les métadonnées</h4><ol>
<li>Télécharger le <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">script de migration</a>.</li>
<li>Arrêter les composants Milvus. Toute session en direct dans le Milvus etcd peut entraîner un échec de la migration.</li>
<li>Créer une sauvegarde des métadonnées Milvus.</li>
<li>Migrer les métadonnées Milvus.</li>
<li>Démarrer les composants Milvus avec une nouvelle image.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2. Mise à niveau de Milvus de la version 2.1.x à la version 2.2.0</h4><p>Les commandes suivantes supposent que vous mettez à niveau Milvus de la version 2.1.4 à la version 2.2.0. Modifiez-les pour obtenir les versions qui répondent à vos besoins.</p>
<ol>
<li><p>Spécifier le nom de l'instance Milvus, la version source de Milvus et la version cible de Milvus.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Spécifiez l'espace de noms avec <code translate="no">-n</code> si votre Milvus n'est pas installé dans l'espace de noms K8s par défaut.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Spécifiez le chemin d'accès à la racine avec <code translate="no">-r</code> si votre Milvus est installé avec le chemin d'accès personnalisé <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Spécifier la balise d'image avec <code translate="no">-w</code> si votre Milvus est installé avec une balise personnalisée <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Définissez <code translate="no">-d true</code> si vous souhaitez supprimer automatiquement le pod de migration une fois la migration terminée.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Revenir en arrière et migrer à nouveau si la migration échoue.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
