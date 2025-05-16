---
id: allocate.md
title: Allouer des ressources à Milvus sur Kubernetes
summary: Découvrez comment allouer des ressources à Milvus sur Kubernetes.
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Allouer des ressources sur Kubernetes<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment allouer des ressources à un cluster Milvus sur Kubernetes.</p>
<p>En règle générale, les ressources allouées à un cluster Milvus en production doivent être proportionnelles à la charge de travail de la machine. Vous devez également prendre en compte le type de machine lors de l'allocation des ressources. Bien que vous puissiez mettre à jour les configurations lorsque le cluster est en cours d'exécution, nous vous recommandons de définir les valeurs avant de <a href="/docs/fr/v2.4.x/install_cluster-helm.md">déployer le cluster</a>.</p>
<div class="alert note">
<p>Pour plus d'informations sur l'allocation des ressources avec Milvus Operator, voir <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Allocation des ressources avec Milvus Operator</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. Afficher les ressources disponibles<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez <code translate="no">kubectl describe nodes</code> pour afficher les ressources disponibles sur les instances que vous avez provisionnées.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. Allouer des ressources<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez Helm pour allouer des ressources CPU et mémoire aux composants Milvus.</p>
<div class="alert note">
L'utilisation de Helm pour mettre à niveau les ressources entraînera l'exécution d'une mise à jour continue par les pods en cours d'exécution.</div>
<p>Il existe deux façons d'allouer des ressources :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/allocate.md#Allocate-resources-with-commands">Utiliser les commandes</a></li>
<li><a href="/docs/fr/v2.4.x/allocate.md#Allocate-resources-by-setting-configuration-file">Définir les paramètres dans le fichier <code translate="no">YAML</code> </a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">Allouer des ressources avec des commandes</h3><p>Vous devez définir les variables de ressources pour chaque composant Milvus si vous utilisez <code translate="no">--set</code> pour mettre à jour les configurations de ressources.</p>
<div class="filter">
<a href="#standalone">Milvus autonome</a> <a href="#cluster">Milvus cluster</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">Allouer des ressources en définissant le fichier de configuration</h3><p>Vous pouvez également allouer des ressources CPU et mémoire en spécifiant les paramètres <code translate="no">resources.requests</code> et <code translate="no">resources.limits</code> dans le fichier <code translate="no">resources.yaml</code>.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. Appliquer les configurations<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez la commande suivante pour appliquer les nouvelles configurations à votre cluster Milvus.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Si <code translate="no">resources.limits</code> n'est pas spécifié, les pods consommeront toutes les ressources CPU et mémoire disponibles. Veillez donc à spécifier <code translate="no">resources.requests</code> et <code translate="no">resources.limits</code> pour éviter la surallocation des ressources lorsque d'autres tâches en cours d'exécution sur la même instance nécessitent une consommation de mémoire plus importante.</div>
<p>Consultez la <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">documentation de Kubernetes</a> pour plus d'informations sur la gestion des ressources.</p>
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
<li>Vous voudrez peut-être aussi apprendre à<ul>
<li><a href="/docs/fr/v2.4.x/scaleout.md">Faire évoluer un cluster Milvus</a></li>
<li><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-operator.md">Mettre à niveau le cluster Milvus</a></li>
<li><a href="/docs/fr/v2.4.x/upgrade_milvus_standalone-operator.md">Mettre à niveau Milvus Standalone</a></li>
</ul></li>
<li>Si vous êtes prêt à déployer votre cluster sur des nuages :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/eks.md">déployer Milvus sur Amazon EKS avec Terraform</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/gcp.md">déployer le cluster Milvus sur GCP avec Kubernetes</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/azure.md">déployer Milvus sur Microsoft Azure avec Kubernetes</a></li>
</ul></li>
</ul>
