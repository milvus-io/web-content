---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Découvrez comment mettre à niveau le cluster Milvus avec Milvus Operator.
title: Mise à niveau du cluster Milvus avec Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/fr/v2.6.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/fr/v2.6.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Mise à niveau du cluster Milvus avec Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit comment mettre à niveau votre cluster Milvus avec Milvus Operator.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Depuis Milvus 2.6.0, les anciens coordinateurs distincts (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) ont été consolidés en un seul <code translate="no">mixCoord</code>. Avant de procéder à la mise à niveau, assurez-vous que votre spécification CRD utilise <code translate="no">mixCoord</code> plutôt que des composants de coordinateurs individuels.</p>
<p>Si vous utilisez les coordinateurs séparés, modifiez votre spécification :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">mixCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># set to 1 or more</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
    <span class="hljs-attr">queryCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
    <span class="hljs-attr">indexCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Mettre à niveau votre opérateur Milvus<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez la commande suivante pour mettre à niveau la version de votre opérateur Milvus vers v1.3.0-rc1-hotfix.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que vous avez mis à niveau votre opérateur Milvus vers la dernière version, les choix suivants s'offrent à vous :</p>
<ul>
<li>Pour mettre à niveau Milvus à partir de la version 2.2.3, vous pouvez <a href="#Conduct-a-rolling-upgrade">effectuer une mise à niveau continue</a>.</li>
<li>Pour mettre à niveau Milvus à partir d'une version mineure antérieure à la v2.2.3 vers la version 2.6.0-rc1, il est conseillé de <a href="#Upgrade-Milvus-by-changing-its-image">mettre à niveau Milvus en modifiant la version de son image</a>.</li>
<li>Pour mettre à niveau Milvus de la version 2.1.x à la version 2.6.0-rc1, vous devez <a href="#Migrate-the-metadata">migrer les métadonnées</a> avant la mise à niveau proprement dite.</li>
</ul>
<blockquote>
<p><strong>Note</strong>: Il est fortement recommandé de mettre à niveau une version mineure à la fois et d'utiliser la dernière version stable de cette version mineure. Par exemple, si vous passez de la version 2.4.x à la version 2.6.x, vous devez d'abord passer à la dernière version 2.4.x, puis à la dernière version 2.5.x et enfin à la version 2.6.x. Vous êtes ainsi certain d'utiliser la dernière version stable de chaque version mineure, qui a plus de chances d'être compatible avec vos données et configurations existantes.</p>
</blockquote>
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
    </button></h2><p>Depuis Milvus 2.2.3, vous pouvez configurer les coordinateurs Milvus pour qu'ils fonctionnent en mode actif-veille et activer la fonction de mise à niveau continue pour eux, afin que Milvus puisse répondre aux demandes entrantes pendant les mises à niveau des coordinateurs. Dans les versions précédentes, les coordinateurs doivent être supprimés puis créés au cours d'une mise à niveau, ce qui peut entraîner certains temps d'arrêt du service.</p>
<p>Sur la base des capacités de mise à jour en continu fournies par Kubernetes, l'opérateur Milvus applique une mise à jour ordonnée des déploiements en fonction de leurs dépendances. En outre, Milvus met en œuvre un mécanisme garantissant que ses composants restent compatibles avec ceux qui en dépendent pendant la mise à jour, ce qui réduit considérablement les temps d'arrêt potentiels du service.</p>
<p>La fonction de mise à niveau continue est désactivée par défaut. Vous devez l'activer explicitement par le biais d'un fichier de configuration.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
    <span class="hljs-comment"># Milvus Operator recognizes the image tag as a semantic version, and decides what to do based on the version.</span>
    <span class="hljs-comment"># So in case you&#x27;re using a non-sermantic verison image tag, you may also need to set the `version` field so that Milvus Operator can recognize the version correctly</span>
    <span class="hljs-attr">version:</span> <span class="hljs-string">v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans le fichier de configuration ci-dessus, définissez <code translate="no">spec.components.enableRollingUpdate</code> comme <code translate="no">true</code> et <code translate="no">spec.components.image</code> comme la version souhaitée de Milvus.</p>
<p>Par défaut, Milvus effectue une mise à niveau continue pour les coordinateurs de manière ordonnée, c'est-à-dire qu'il remplace les images des pods des coordinateurs l'une après l'autre. Pour réduire le temps de mise à niveau, envisagez de définir <code translate="no">spec.components.imageUpdateMode</code> sur <code translate="no">all</code> afin que Milvus remplace toutes les images de pods en même temps.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez définir <code translate="no">spec.components.imageUpdateMode</code> sur <code translate="no">rollingDowngrade</code> pour que Milvus remplace les images de pods coordinateurs par une version inférieure.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-old-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Enregistrez ensuite votre configuration sous forme de fichier YAML (par exemple, <code translate="no">milvusupgrade.yaml</code>) et patchez ce fichier de configuration sur votre instance Milvus comme suit :</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Mettre à niveau Milvus en changeant son image<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans les cas normaux, vous pouvez simplement mettre à jour votre Milvus en changeant son image. Toutefois, il convient de noter qu'il y aura un certain temps d'arrêt lors de la mise à niveau de Milvus de cette manière.</p>
<p>Composez un fichier de configuration comme suit et enregistrez-le sous <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez ensuite ce qui suit pour effectuer la mise à niveau :</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Depuis Milvus 2.2.0, les métadonnées sont incompatibles avec celles des versions précédentes. Les exemples suivants supposent une mise à niveau de Milvus 2.1.4 vers Milvus 2.6.0-rc1.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Création d'un fichier <code translate="no">.yaml</code> pour la migration des métadonnées</h3><p>Créer un fichier de migration des métadonnées. Voici un exemple. Vous devez spécifier les fichiers <code translate="no">name</code>, <code translate="no">sourceVersion</code> et <code translate="no">targetVersion</code> dans le fichier de configuration. L'exemple suivant définit <code translate="no">name</code> en <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> en <code translate="no">v2.1.4</code>, et <code translate="no">targetVersion</code> en <code translate="no">v2.6.0-rc1</code>. Cela signifie que votre cluster Milvus sera mis à niveau de la v2.1.4 à la v2.6.0-rc1.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.6.0-rc1&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.6.0-rc1&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Appliquer la nouvelle configuration</h3><p>Exécutez la commande suivante pour créer la nouvelle configuration.</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://github.com/zilliztech/milvus-operator/blob/main/<span class="hljs-built_in">config</span>/samples/beta/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Vérifier l'état de la migration des métadonnées</h3><p>Exécutez la commande suivante pour vérifier l'état de la migration des métadonnées.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>L'état de <code translate="no">ready</code> dans la sortie signifie que la migration des métadonnées est réussie.</p>
<p>Vous pouvez également exécuter la commande <code translate="no">kubectl get pod</code> pour vérifier tous les pods. Si tous les pods sont <code translate="no">ready</code>, la migration des métadonnées est réussie.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Supprimer <code translate="no">my-release-upgrade</code></h3><p>Lorsque la mise à niveau est réussie, supprimez <code translate="no">my-release-upgrade</code> dans le fichier YAML.</p>
