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
    </button></h2><p>Les métriques sont des indicateurs qui fournissent des informations sur l'état de fonctionnement de votre système. Par exemple, avec les métriques, vous pouvez comprendre combien de ressources mémoire ou CPU sont consommées par un nœud de données dans Milvus. Le fait de connaître les performances et l'état des composants de votre cluster Milvus vous permet d'être bien informé et donc de prendre de meilleures décisions et d'ajuster l'allocation des ressources de manière plus opportune.</p>
<p>En général, les mesures sont stockées dans une base de données de séries temporelles (TSDB), comme <a href="https://prometheus.io/">Prometheus</a>, et les mesures sont enregistrées avec un horodatage. Dans le cas de la surveillance des services Milvus, vous pouvez utiliser Prometheus pour extraire des données des points d'extrémité définis par les exportateurs. Prometheus exporte ensuite les métriques de chaque composant Milvus à l'adresse <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Cependant, vous pouvez avoir plusieurs répliques pour un composant, ce qui rend la configuration manuelle de Prometheus trop compliquée. Vous pouvez donc utiliser <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, une extension de Kubernetes, pour une gestion automatisée et efficace des instances de surveillance Prometheus. L'utilisation de Prometheus Operator vous évite d'ajouter manuellement des cibles métriques et des fournisseurs de services.</p>
<p>La définition de ressource personnalisée (CRD) ServiceMonitor vous permet de définir de manière déclarative la manière dont un ensemble dynamique de services est surveillé. Il permet également de sélectionner les services à surveiller avec la configuration souhaitée à l'aide de sélections d'étiquettes. Avec Prometheus Operator, vous pouvez introduire des conventions spécifiant comment les métriques sont exposées. Les nouveaux services peuvent être automatiquement découverts en suivant la convention que vous avez définie, sans qu'il soit nécessaire de procéder à une reconfiguration manuelle.</p>
<p>L'image suivante illustre le flux de travail de Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Architecture de Prometheus</span> </span></p>
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
    </button></h2><p>Ce tutoriel utilise <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> pour vous éviter d'installer et de configurer manuellement chaque composant de surveillance et d'alerte.</p>
<p>Kube-prometheus rassemble les manifestes Kubernetes, les tableaux de bord <a href="http://grafana.com/">Grafana</a> et les <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">règles Prometheus</a> combinés à la documentation et aux scripts.</p>
<p>Avant de déployer des services de surveillance, vous devez créer une pile de surveillance en utilisant la configuration dans le répertoire kube-prometheus manifests.</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Le rôle de cluster prometheus-k8s par défaut ne peut pas capturer les métriques de milvus, il est nécessaire de le corriger :</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour supprimer une pile, exécutez <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Accéder aux tableaux de bord</h3><p>Transférer le service Prometheus vers le port <code translate="no">9090</code>, et le service Grafana vers le port <code translate="no">3000</code>.</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Activer ServiceMonitor</h3><p>Le ServiceMonitor n'est pas activé par défaut pour Milvus Helm. Après avoir installé l'opérateur Prometheus dans le cluster Kubernetes, vous pouvez l'activer en ajoutant le paramètre <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Une fois l'installation terminée, utilisez <code translate="no">kubectl</code> pour vérifier la ressource ServiceMonitor.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
my-release-milvus              54s
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
<li>Si vous avez déployé des services de surveillance pour le cluster Milvus, vous pouvez également apprendre à :<ul>
<li><a href="/docs/fr/v2.4.x/visualize.md">Visualiser les métriques Milvus dans Grafana</a></li>
<li><a href="/docs/fr/v2.4.x/alert.md">Créer une alerte pour les services Milvus</a></li>
<li>Ajuster l'<a href="/docs/fr/v2.4.x/allocate.md">allocation des ressources</a></li>
</ul></li>
<li>Si vous recherchez des informations sur la manière de faire évoluer un cluster Milvus :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/scaleout.md">faire évoluer un cluster Milvus</a></li>
</ul></li>
<li>Si vous souhaitez mettre à niveau la version de Milvus,<ul>
<li>Lisez le <a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-operator.md">guide de mise à niveau du cluster Milvus</a> et celui <a href="/docs/fr/v2.4.x/upgrade_milvus_standalone-operator.md">de mise à niveau de Milvus standalone</a>.</li>
</ul></li>
</ul>
