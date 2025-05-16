---
id: allocate.md
title: Zuweisung von Ressourcen an Milvus auf Kubernetes
summary: 'Erfahren Sie, wie Sie Milvus auf Kubernetes Ressourcen zuweisen können.'
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Ressourcen auf Kubernetes zuweisen<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird beschrieben, wie Sie einem Milvus-Cluster unter Kubernetes Ressourcen zuweisen.</p>
<p>Im Allgemeinen sollten die Ressourcen, die Sie einem Milvus-Cluster in der Produktion zuweisen, im Verhältnis zur Maschinenauslastung stehen. Sie sollten bei der Ressourcenzuweisung auch den Maschinentyp berücksichtigen. Obwohl Sie die Konfigurationen aktualisieren können, wenn der Cluster ausgeführt wird, empfehlen wir, die Werte vor der <a href="/docs/de/v2.4.x/install_cluster-helm.md">Bereitstellung des Clusters</a> festzulegen.</p>
<div class="alert note">
<p>Informationen über die Ressourcenzuweisung mit Milvus Operator finden Sie unter <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Ressourcenzuweisung mit Milvus Operator</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. Verfügbare Ressourcen anzeigen<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie <code translate="no">kubectl describe nodes</code> aus, um die verfügbaren Ressourcen auf den von Ihnen bereitgestellten Instanzen anzuzeigen.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. Zuweisen von Ressourcen<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie Helm, um den Milvus-Komponenten CPU- und Speicherressourcen zuzuweisen.</p>
<div class="alert note">
Die Verwendung von Helm zur Aktualisierung von Ressourcen führt dazu, dass die laufenden Pods ein rollendes Update durchführen.</div>
<p>Es gibt zwei Möglichkeiten, Ressourcen zuzuweisen:</p>
<ul>
<li><a href="/docs/de/v2.4.x/allocate.md#Allocate-resources-with-commands">Verwenden Sie die Befehle</a></li>
<li><a href="/docs/de/v2.4.x/allocate.md#Allocate-resources-by-setting-configuration-file">Setzen Sie die Parameter in der Datei <code translate="no">YAML</code> </a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">Zuweisung von Ressourcen mit Befehlen</h3><p>Sie müssen die Ressourcenvariablen für jede Milvus-Komponente festlegen, wenn Sie <code translate="no">--set</code> zur Aktualisierung der Ressourcenkonfigurationen verwenden.</p>
<div class="filter">
<a href="#standalone">Eigenständiger Milvus</a> <a href="#cluster">Milvus-Cluster</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">Ressourcenzuteilung durch Setzen der Konfigurationsdatei</h3><p>Sie können CPU- und Speicherressourcen auch zuweisen, indem Sie die Parameter <code translate="no">resources.requests</code> und <code translate="no">resources.limits</code> in der Datei <code translate="no">resources.yaml</code> angeben.</p>
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
<h2 id="3-Apply-configurations" class="common-anchor-header">3. Konfigurationen anwenden<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um die neuen Konfigurationen auf Ihren Milvus-Cluster anzuwenden.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Wenn <code translate="no">resources.limits</code> nicht angegeben ist, werden die Pods alle verfügbaren CPU- und Speicherressourcen verbrauchen. Stellen Sie daher sicher, dass Sie <code translate="no">resources.requests</code> und <code translate="no">resources.limits</code> angeben, um eine Überallokation von Ressourcen zu vermeiden, wenn andere laufende Aufgaben auf derselben Instanz einen höheren Speicherbedarf haben.</div>
<p>Weitere Informationen zur Verwaltung von Ressourcen finden Sie in der <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">Kubernetes-Dokumentation</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Sie möchten vielleicht auch lernen, wie man:<ul>
<li><a href="/docs/de/v2.4.x/scaleout.md">Skalieren eines Milvus-Clusters</a></li>
<li><a href="/docs/de/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus Cluster aktualisieren</a></li>
<li><a href="/docs/de/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus Standalone aktualisieren</a></li>
</ul></li>
<li>Wenn Sie bereit sind, Ihren Cluster in der Cloud einzusetzen:<ul>
<li>Lernen Sie, wie Sie <a href="/docs/de/v2.4.x/eks.md">Milvus auf Amazon EKS mit Terraform bereitstellen</a></li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/gcp.md">Milvus Cluster auf GCP mit Kubernetes bereitstellen</a> können</li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/azure.md">Milvus auf Microsoft Azure mit Kubernetes bereitstellen</a> können</li>
</ul></li>
</ul>
