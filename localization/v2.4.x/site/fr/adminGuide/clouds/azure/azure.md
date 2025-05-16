---
id: azure.md
title: Déployer Milvus sur Microsoft Azure avec Kubernetes
related_key: cluster
summary: Découvrez comment déployer un cluster Milvus sur Azure.
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">Déployer Milvus sur Azure avec AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment provisionner et créer un cluster avec <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) et le <a href="https://portal.azure.com">portail Azure.</a></p>
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
    </button></h2><p>Assurez-vous que votre projet Azure a été correctement configuré et que vous avez accès aux ressources que vous souhaitez utiliser. Contactez vos administrateurs si vous n'êtes pas sûr de votre autorisation d'accès.</p>
<h2 id="Software-requirements" class="common-anchor-header">Logiciels requis<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">CLI Azure</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>Vous pouvez également utiliser le <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a>, qui contient l'Azure CLI, kubectl et Helm préinstallés.</p>
<div class="alert note">Après avoir installé l'Azure CLI, assurez-vous que vous êtes correctement authentifié. </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Provisionner un cluster Kubernetes<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Connectez-vous au portail Azure.</li>
<li>Dans le menu du portail Azure ou sur la page d <strong>'accueil</strong>, sélectionnez <strong>Créer une ressource</strong>.</li>
<li>Sélectionnez <strong>Conteneurs</strong> &gt; <strong>Service Kubernetes</strong>.</li>
<li>Sur la page de <strong>base</strong>, configurez les options suivantes :</li>
</ol>
<ul>
<li><p><strong>Détails du projet</strong>:</p>
<ul>
<li><p><strong>Abonnement</strong>: Contactez l'administrateur Azure de votre organisation pour déterminer l'abonnement à utiliser.</p>
<ul>
<li><strong>Groupe de ressources</strong>: Contactez l'administrateur Azure de votre organisation pour déterminer le groupe de ressources à utiliser.</li>
</ul></li>
</ul></li>
<li><p><strong>Détails du cluster</strong>:</p>
<ul>
<li><p><strong>Nom du cluster Kubernetes</strong>: Saisissez un nom de cluster.</p></li>
<li><p><strong>Région</strong>: Sélectionnez une région.</p></li>
<li><p><strong>Zones de disponibilité</strong>: Sélectionnez les <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">zones de disponibilité</a> dont vous avez besoin. Pour les clusters de production, nous vous recommandons de sélectionner plusieurs zones de disponibilité.</p></li>
</ul></li>
<li><p><strong>Pool de nœuds primaires</strong>:</p>
<ul>
<li><p><strong>Taille du nœud</strong>: Nous vous recommandons de choisir des machines virtuelles dotées d'un minimum de 16 Go de RAM, mais vous pouvez choisir la taille des machines virtuelles selon vos besoins.</p></li>
<li><p><strong>Méthode de mise à l'échelle</strong>: Choisissez une méthode de mise à l'échelle.</p></li>
<li><p><strong>Node count range (Nombre de nœuds</strong>) : Sélectionnez une fourchette pour le nombre de nœuds.</p></li>
</ul></li>
<li><p><strong>Pools de nœuds</strong>:</p>
<ul>
<li><p><strong>Activer les nœuds virtuels</strong>: Cochez la case pour activer les nœuds virtuels.</p></li>
<li><p><strong>Activer les jeux d'échelle de machines virtuelles</strong>: Nous vous recommandons de choisir <code translate="no">enabled</code>.</p></li>
</ul></li>
<li><p><strong>Réseau</strong>:</p>
<ul>
<li><p><strong>Configuration du réseau</strong>: Nous vous recommandons de choisir <code translate="no">Kubenet</code>.</p></li>
<li><p><strong>Préfixe de nom DNS</strong>: Entrez un préfixe de nom DNS.</p></li>
<li><p><strong>Routage du trafic</strong>:</p>
<ul>
<li><p><strong>Équilibreur de charge</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>Routage de l'application HTTP</strong>: Non requis.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>Après avoir configuré les options, cliquez sur <strong>Review + create</strong>, puis sur <strong>Create</strong> lorsque la validation est terminée. La création du cluster prend quelques minutes.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">Se connecter au cluster<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Naviguez jusqu'au cluster que vous avez créé dans les services Kubernetes et cliquez dessus.</li>
<li>Dans le volet de navigation de gauche, cliquez sur <code translate="no">Overview</code>.</li>
<li>Sur la page d'<strong>aperçu</strong> qui s'affiche, cliquez sur <strong>Connecter</strong> pour afficher le groupe de ressources et l'abonnement.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">Définir un abonnement et des informations d'identification<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">Vous pouvez utiliser Azure Cloud Shell pour effectuer les procédures suivantes.</div>
<ol>
<li>Exécutez la commande suivante pour définir votre abonnement.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Exécutez la commande suivante pour télécharger les informations d'identification et configurer la CLI de Kubernetes pour qu'elle les utilise.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Utilisez le même shell pour les procédures suivantes. Si vous passez à un autre shell, exécutez à nouveau les commandes précédentes.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">Utilisation d'Azure Blob Storage en tant que stockage d'objets externe<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage est la version Azure de AWS Simple Storage Service (S3).</p>
<ul>
<li>Créer un compte de stockage et un conteneur</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Obtenir la clé secrète, utiliser la première valeur</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Ajouter values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
  <span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: <span class="hljs-literal">false</span>

externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
  cloudProvider: azure
  useSSL: <span class="hljs-literal">true</span>
  accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
  secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span> 
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
    </button></h2><p>Le cluster Kubernetes est maintenant prêt. Déployons Milvus dès maintenant.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Dans les commandes précédentes, nous ajoutons le repo des cartes Milvus Helm localement et mettons à jour le repo pour récupérer les dernières cartes. Ensuite, nous installons une instance Milvus et la nommons <strong>my-release</strong>.</p>
<p>Remarquez la valeur de config <code translate="no">service.type</code>, qui indique que nous souhaitons exposer l'instance Milvus via un équilibreur de charge de niveau 4.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">Vérifier le déploiement<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que tous les pods fonctionnent, exécutez la commande suivante pour obtenir l'adresse IP externe.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Bonjour Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Veuillez vous référer à <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, changez la valeur host en adresse IP externe, puis exécutez le code.</p>
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
    </button></h2><p>Si vous souhaitez apprendre à déployer Milvus sur d'autres clouds :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/eks.md">Déployer Milvus Cluster sur AWS avec Kubernetes</a></li>
<li><a href="/docs/fr/v2.4.x/gcp.md">Déployer Milvus Cluster sur GCP avec Kubernetes</a></li>
</ul>
