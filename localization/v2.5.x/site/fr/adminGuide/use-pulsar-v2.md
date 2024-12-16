---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus vous recommande de mettre à niveau Pulsar vers la version 3 pour Milvus
  v2.5.x. Toutefois, si vous préférez utiliser Pulsar v2, cet article vous
  guidera dans les étapes à suivre pour continuer à utiliser Pulsar v2 avec
  Milvus v2.5.x.
title: Utiliser Pulsar v2 avec Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Utiliser Pulsar v2 avec Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus vous recommande de mettre à niveau Pulsar vers la version 3 pour exécuter Milvus v2.5.x. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/upgrade-pulsar-v3.md">Mise à niveau de Pulsar</a>. Toutefois, si vous préférez utiliser Pulsar v2 avec Milvus v2.5.x, cet article vous guidera dans la procédure d'exécution de Milvus v2.5.x avec Pulsar v2.</p>
<p>Si vous avez déjà une instance Milvus en cours d'exécution et que vous souhaitez la mettre à niveau vers la version 2.5.x tout en continuant à utiliser Pulsar v2, vous pouvez suivre les étapes de cette page.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Continuer à utiliser Pulsar v2 tout en mettant à niveau Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section vous guidera dans les étapes à suivre pour continuer à utiliser Pulsar v2 tout en mettant à niveau votre instance Milvus en cours d'exécution vers Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Pour les utilisateurs de Milvus Operator</h3><p>Milvus Operator est compatible par défaut avec les mises à niveau de Pulsar v2. Vous pouvez mettre à niveau votre instance Milvus vers la version 2.5.x en vous reportant à la section <a href="/docs/fr/upgrade_milvus_cluster-operator.md">Mise à niveau du cluster Milvus avec Milvus Operator</a>.</p>
<p>Une fois la mise à niveau terminée, vous pouvez continuer à utiliser Pulsar v2 avec votre instance Milvus.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Pour les utilisateurs de Helm</h3><p>Avant la mise à niveau, assurez-vous que</p>
<ul>
<li><p>Votre version de Helm est supérieure à v3.12, et la dernière version est recommandée.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="https://helm.sh/docs/intro/install/">Installer Helm</a>.</p></li>
<li><p>Votre version de Kubernetes est supérieure à la version 1.20.</p></li>
</ul>
<p>Les opérations de cet article supposent que :</p>
<ul>
<li><p>Milvus a été installé dans l'espace de noms <code translate="no">default</code>.</p></li>
<li><p>Le nom de la version de Milvus est <code translate="no">my-release</code>.</p></li>
</ul>
<p>Vous devez modifier le fichier <code translate="no">values.yaml</code> pour spécifier la version de Pulsar comme v2 avant de mettre à niveau Milvus. Les étapes sont les suivantes :</p>
<ol>
<li><p>Obtenez le fichier <code translate="no">values.yaml</code> actuel de votre instance Milvus.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modifier le fichier <code translate="no">values.yaml</code> pour spécifier la version de Pulsar comme v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Pour <code translate="no">image</code>, remplacer <code translate="no">tag</code> par la version souhaitée de Milvus (par exemple <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Mettre à jour la carte Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mettre à niveau l'instance Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Création d'une nouvelle instance Milvus avec Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section vous guidera à travers les étapes de création d'une nouvelle instance Milvus avec Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Pour les utilisateurs de Milvus Operator</h3><p>Avant de déployer Milvus v2.5.x, vous devez télécharger et modifier le fichier Milvus Customer Resource Definition (CRD). Pour plus de détails sur l'installation de Milvus à l'aide de Milvus Operator, voir <a href="/docs/fr/install_cluster-milvusoperator.md">Installer Milvus Cluster avec Milvus Operator</a>.</p>
<ol>
<li><p>Télécharger le fichier CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modifier le fichier <code translate="no">milvus_cluster_default.yaml</code> pour spécifier la version de Pulsar comme v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Pour <code translate="no">dependencies</code>, remplacer <code translate="no">pulsar.inCluster.chartVersion</code> par <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Continuer avec les étapes de la section <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Installer Milvus Cluster avec Milvus Operator</a> pour déployer Milvus v2.5.x avec Pulsar v2 à l'aide du fichier CRD modifié.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Pour les utilisateurs de Helm</h3><p>Avant de déployer Milvus v2.5.x, vous pouvez préparer un fichier <code translate="no">values.yaml</code> ou utiliser les paramètres en ligne pour spécifier la version de Pulsar. Pour plus de détails sur l'installation de Milvus à l'aide de Helm, voir <a href="/docs/fr/install_cluster-helm.md">Installer Milvus Cluster avec Helm</a>.</p>
<ul>
<li><p>Utilisez les paramètres en ligne pour spécifier la version de Pulsar comme v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utiliser un fichier <code translate="no">values.yaml</code> pour spécifier la version de Pulsar comme v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, déployer Milvus v2.5.x avec Pulsar v2 à l'aide du fichier <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
