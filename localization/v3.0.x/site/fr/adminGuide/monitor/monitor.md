---
id: monitor.md
title: Déployer des services de surveillance
related_key: 'monitor, alert'
summary: >-
  Découvrez comment déployer des services de surveillance pour un cluster Milvus
  à l'aide de Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Déploiement de services de surveillance sur Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment utiliser Prometheus pour déployer des services de surveillance pour un cluster Milvus sur Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Surveiller les métriques avec Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Les métriques sont des indicateurs fournissant des informations sur l’état de fonctionnement de votre système. Par exemple, grâce aux métriques, vous pouvez connaître la quantité de mémoire ou de ressources CPU consommée par un nœud de données dans Milvus. En connaissant les performances et l’état des composants de votre cluster Milvus, vous disposez de toutes les informations nécessaires pour prendre de meilleures décisions et ajuster l’allocation des ressources en temps opportun.</p>
<p>En général, les métriques sont stockées dans une base de données de séries chronologiques (TSDB), telle que <a href="https://prometheus.io/">Prometheus</a>, et sont enregistrées avec un horodatage. Dans le cas de la surveillance des services Milvus, vous pouvez utiliser Prometheus pour extraire des données à partir des points de terminaison définis par les exportateurs. Prometheus exporte ensuite les métriques de chaque composant Milvus à l’adresse <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Cependant, il se peut que vous disposiez de plusieurs répliques pour un même composant, ce qui rend la configuration manuelle de Prometheus trop complexe. Vous pouvez donc utiliser <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, une extension de Kubernetes, pour une gestion automatisée et efficace des instances de surveillance Prometheus. L’utilisation de Prometheus Operator vous évite d’avoir à ajouter manuellement des cibles de métriques et des fournisseurs de services.</p>
<p>La définition de ressource personnalisée (CRD) ServiceMonitor vous permet de définir de manière déclarative comment un ensemble dynamique de services est surveillé. Elle permet également de sélectionner les services à surveiller avec la configuration souhaitée à l’aide de sélections d’étiquettes. Avec Prometheus Operator, vous pouvez mettre en place des conventions précisant comment les métriques sont exposées. Les nouveaux services peuvent être automatiquement détectés selon la convention que vous avez définie, sans qu’une reconfiguration manuelle ne soit nécessaire.</p>
<p>L’image suivante illustre le flux de travail de Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce tutoriel utilise <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> pour vous éviter d’avoir à installer et à configurer manuellement chaque composant de surveillance et d’alerte.</p>
<p>Kube-prometheus regroupe les manifestes Kubernetes, les tableaux de bord <a href="http://grafana.com/">Grafana</a> et <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">les règles Prometheus</a>, ainsi que la documentation et les scripts.</p>
<p>Avant de déployer les services de surveillance, vous devez créer une pile de surveillance à l’aide de la configuration située dans le répertoire des manifestes de kube-prometheus.</p>
<p>Les commandes suivantes utilisent la branche « <code translate="no">release-0.19</code> » de kube-prometheus, qui prend en charge les versions 1.35, 1.36 et 1.37 de Kubernetes. Pour choisir la branche adaptée à votre version de Kubernetes, consultez la <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">matrice de compatibilité de kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Le clusterrole « prometheus-k8s » par défaut ne permet pas de collecter les métriques de Milvus ; un correctif est nécessaire :
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour supprimer une pile, exécutez la commande ` <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>`.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Déployer des services de surveillance sur Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Accédez aux tableaux de bord<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Redirigez le service Prometheus vers le port <code translate="no">9090</code> et le service Grafana vers le port <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Activer ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor n’est pas activé par défaut pour Milvus Helm. Après avoir installé Prometheus Operator dans le cluster Kubernetes, vous pouvez l’activer en ajoutant le paramètre <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Avec Helm</h4><p>Vous pouvez activer ServiceMonitor en définissant le paramètre <code translate="no">metrics.serviceMonitor.enabled=true</code> comme suit si vous avez installé le chart Milvus Helm.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Cette commande utilise ` <code translate="no">--reset-then-reuse-values</code>`, ce qui nécessite Helm 3.14 ou une version ultérieure. Avec cette option, Helm réinitialise les valeurs aux valeurs par défaut de la version du chart définie dans ` <code translate="no">--version</code>`, applique les valeurs de votre version actuelle, puis applique les valeurs provenant de ` <code translate="no">--set</code>`. Pour trouver ` <code translate="no">&lt;current-chart-version&gt;</code>`, exécutez ` <code translate="no">helm list</code> ` et supprimez le préfixe ` <code translate="no">milvus-</code> ` de la valeur dans la colonne ` <code translate="no">CHART</code> `. Si vous exécutez <code translate="no">helm upgrade</code> avec <code translate="no">-f</code> ou <code translate="no">--set</code> mais sans <code translate="no">--reset-then-reuse-values</code> ou <code translate="no">--reuse-values</code>, Helm ne conserve pas les valeurs que vous avez définies lors de l’installation.</p>
</div>
<p>Une fois l’installation terminée, utilisez <code translate="no">kubectl</code> pour vérifier la ressource ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Avec Milvus Operator</h4><p>Si vous avez installé Milvus à l’aide de Milvus Operator, celui-ci crée un PodMonitor à la place d’un ServiceMonitor. Le PodMonitor porte le même nom que la ressource personnalisée Milvus. L’opérateur ne le crée que si les métriques ne sont pas désactivées dans la ressource personnalisée et si le CRD PodMonitor existe dans le cluster. Le répertoire <code translate="no">manifests/setup</code> de kube-prometheus installe ce CRD. Pour vous assurer que les métriques sont activées, procédez comme suit.</p>
<ol>
<li><p>Exécutez la commande suivante pour modifier la ressource personnalisée Milvus. La commande suivante part du principe que la ressource personnalisée est nommée <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modifiez le champ <code translate="no">spec.components.disableMetric</code> pour qu’il prenne la valeur <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Enregistrez et quittez l’éditeur.</p></li>
<li><p>Attendez que l’opérateur synchronise les modifications. Vous pouvez vérifier le PodMonitor en exécutant la commande suivante.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Vérifier les métriques<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Après avoir activé le ServiceMonitor ou le PodMonitor, vous pouvez accéder au tableau de bord Prometheus à l’adresse <code translate="no">http://localhost:9090/</code>.</p>
<p>Cliquez sur l’onglet « <code translate="no">Status</code> », puis sur « <code translate="no">Targets</code> ». Vous devriez voir les cibles des composants Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Cliquez sur l’onglet « <code translate="no">Graph</code> » et saisissez l’expression « <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> » dans le champ de saisie de l’expression. Vous devriez voir s’afficher les métriques des composants Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Vérifier le ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous avez installé Milvus avec Helm, exécutez la commande suivante pour lister le ServiceMonitor. Le chart le nomme « <code translate="no">my-release-milvus</code> » pour un cluster Milvus et « <code translate="no">my-release-milvus-standalone</code> » pour une instance Milvus autonome.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si vous avez déployé des services de surveillance pour le cluster Milvus, vous souhaiterez peut-être également apprendre à :
<ul>
<li><a href="/docs/fr/visualize.md">Visualiser les métriques Milvus dans Grafana</a></li>
<li><a href="/docs/fr/alert.md">Créer une alerte pour les services Milvus</a></li>
<li>Ajuster <a href="/docs/fr/allocate.md">l’allocation</a> de vos <a href="/docs/fr/allocate.md">ressources</a></li>
</ul></li>
<li>Si vous recherchez des informations sur la manière de faire évoluer un cluster Milvus :
<ul>
<li>Apprenez <a href="/docs/fr/scaleout.md">à faire évoluer un cluster Milvus</a></li>
</ul></li>
<li>Si vous souhaitez mettre à niveau la version de Milvus,
<ul>
<li>Consultez le <a href="/docs/fr/upgrade_milvus_cluster-operator.md">guide de mise à niveau d'un cluster Milvus</a> et <a href="/docs/fr/upgrade_milvus_standalone-operator.md">celui consacré à la mise à niveau de Milvus en mode autonome</a>.</li>
</ul></li>
</ul>
