---
id: config_jaeger_tracing.md
title: Configuration des traces
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Ce guide fournit des instructions sur la manière de configurer Jaeger pour
  collecter des traces pour Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Configuration des traces<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit des instructions sur la manière de configurer Jaeger pour collecter des traces pour Milvus.</p>
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
<li>Vous avez installé les outils nécessaires, y compris <a href="https://helm.sh/docs/intro/install/">Helm</a> et <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>Cert-manager version 1.6.1 ou supérieure doit être installé. Un guide d'installation est disponible <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">ici</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Déployer Jaeger<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger est une plateforme de traçage distribuée, publiée en open source par <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Installation de l'opérateur Jaeger sur Kubernetes</h3><p>Pour installer l'opérateur, exécutez :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create namespace observability</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability</span>
<button class="copy-code-btn"></button></code></pre>
<p>À ce stade, un déploiement <code translate="no">jaeger-operator</code> devrait être disponible. Vous pouvez l'afficher en exécutant la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get deployment jaeger-operator -n observability</span>

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-operator   1         1         1            1           48s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. Déployer Jaeger</h3><p>La manière la plus simple de créer une instance de Jaeger est de créer un fichier YAML comme dans l'exemple suivant. Cela installera la stratégie AllInOne par défaut, qui déploie l'image <strong>tout-en-un</strong> (combinant <strong>jaeger-agent</strong>, <strong>jaeger-collector</strong>, <strong>jaeger-query</strong>, et Jaeger UI) dans un seul pod, en utilisant le <strong>stockage en mémoire par</strong> défaut.</p>
<p>Si vous souhaitez stocker des traces pendant une longue période, veuillez vous référer à <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategy</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">jaegertracing.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Jaeger</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">jaeger</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le fichier YAML peut alors être utilisé avec <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f simplest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans quelques secondes, une nouvelle instance tout-en-un en mémoire de Jaeger sera disponible, convenant à des démonstrations rapides et à des fins de développement. Pour vérifier les instances qui ont été créées, listez les objets jaeger :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get jaegers</span>

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   1.62.0    allinone   memory    13s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Installer Milvus avec Helm Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez installer ou mettre à jour Milvus avec Helm Chart avec les paramètres suivants :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: jaeger
      sampleFraction: 1
      jaeger:
        url: &quot;http://jaeger-collector:14268/api/traces&quot;
</span><button class="copy-code-btn"></button></code></pre>
<p>Pour appliquer les paramètres ci-dessus à un nouveau déploiement de Milvus, vous pouvez exécuter la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install -f values.yaml my-release milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour appliquer les paramètres ci-dessus à un déploiement Milvus existant, vous pouvez exécuter la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release -f values.yaml milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">View Traces<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez déployé Jaeger et Milvus avec Helm Chart, une entrée a été activée par dfault. Vous pouvez visualiser l'entrée en exécutant la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get ingress</span>

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       192.168.122.34  80      14m
<button class="copy-code-btn"></button></code></pre>
<p>Une fois l'entrée disponible, vous pouvez accéder à l'interface utilisateur de Jaeger en vous rendant à l'adresse <code translate="no">http://${ADDRESS}</code>. Remplacez <code translate="no">${ADDRESS}</code> par l'adresse IP réelle de l'entrée.</p>
<p>La capture d'écran suivante montre l'interface utilisateur Jaeger avec les traces de Milvus pendant une opération de recherche et une opération de collecte de charge :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>Demande de recherche de traces</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>Trace de la demande de collecte de charge</span> </span></p>
