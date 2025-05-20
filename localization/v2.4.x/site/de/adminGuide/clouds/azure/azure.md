---
id: azure.md
title: Bereitstellung von Milvus auf Microsoft Azure mit Kubernetes
related_key: cluster
summary: 'Erfahren Sie, wie Sie einen Milvus-Cluster auf Azure bereitstellen.'
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">Bereitstellung von Milvus auf Azure mit AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt die Bereitstellung und Erstellung eines Clusters mit <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) und dem <a href="https://portal.azure.com">Azure-Portal</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass Ihr Azure-Projekt ordnungsgemäß eingerichtet wurde und Sie Zugriff auf die Ressourcen haben, die Sie verwenden möchten. Wenden Sie sich an Ihre Administratoren, wenn Sie sich über Ihre Zugriffsberechtigung nicht sicher sind.</p>
<h2 id="Software-requirements" class="common-anchor-header">Software-Anforderungen<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>Alternativ können Sie auch die <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a> verwenden, auf der Azure CLI, kubectl und Helm vorinstalliert sind.</p>
<div class="alert note">Stellen Sie nach der Installation von Azure CLI sicher, dass Sie ordnungsgemäß authentifiziert sind. </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Bereitstellung eines Kubernetes-Clusters<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
<li>Melden Sie sich beim Azure-Portal an.</li>
<li>Wählen Sie im Menü des Azure-Portals oder auf der <strong>Startseite</strong> die Option <strong>Ressource erstellen</strong>.</li>
<li>Wählen Sie <strong>Container</strong> &gt; <strong>Kubernetes-Dienst</strong>.</li>
<li>Konfigurieren Sie auf der Seite " <strong>Grundlagen"</strong> die folgenden Optionen:</li>
</ol>
<ul>
<li><p><strong>Projektdetails</strong>:</p>
<ul>
<li><p><strong>Abonnement</strong>: Wenden Sie sich an den Azure-Administrator Ihres Unternehmens, um festzustellen, welches Abonnement Sie verwenden sollten.</p>
<ul>
<li><strong>Ressourcengruppe</strong>: Wenden Sie sich an den Azure-Administrator Ihres Unternehmens, um zu ermitteln, welche Ressourcengruppe Sie verwenden sollten.</li>
</ul></li>
</ul></li>
<li><p><strong>Cluster-Details</strong>:</p>
<ul>
<li><p><strong>Kubernetes-Clustername</strong>: Geben Sie einen Clusternamen ein.</p></li>
<li><p><strong>Region</strong>: Wählen Sie eine Region aus.</p></li>
<li><p><strong>Verfügbarkeitszonen</strong>: Wählen Sie <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">Verfügbarkeitszonen</a> nach Bedarf aus. Für Produktionscluster wird empfohlen, mehrere Verfügbarkeitszonen auszuwählen.</p></li>
</ul></li>
<li><p><strong>Primärer Knotenpool</strong>:</p>
<ul>
<li><p><strong>Größe des Knotens</strong>: Wir empfehlen Ihnen, VMs mit mindestens 16 GB RAM zu wählen, aber Sie können die Größe der virtuellen Maschine nach Bedarf wählen.</p></li>
<li><p><strong>Skalierungsmethode</strong>: Wählen Sie eine Skalierungsmethode.</p></li>
<li><p><strong>Bereich der Knotenanzahl</strong>: Wählen Sie einen Bereich für die Anzahl der Knoten.</p></li>
</ul></li>
<li><p><strong>Knotenpools</strong>:</p>
<ul>
<li><p><strong>Virtuelle Knoten aktivieren</strong>: Aktivieren Sie das Kontrollkästchen, um virtuelle Knoten zu aktivieren.</p></li>
<li><p><strong>Skalierungssätze für virtuelle Maschinen aktivieren</strong>: Wir empfehlen, dass Sie <code translate="no">enabled</code> wählen.</p></li>
</ul></li>
<li><p><strong>Netzwerkbetrieb</strong>:</p>
<ul>
<li><p><strong>Netzwerkkonfiguration</strong>: Es wird empfohlen, <code translate="no">Kubenet</code> zu wählen.</p></li>
<li><p><strong>DNS-Namen-Präfix</strong>: Geben Sie ein DNS-Namenspräfix ein.</p></li>
<li><p><strong>Traffic-Routing</strong>:</p>
<ul>
<li><p><strong>Load Balancer</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>HTTP-Anwendungs-Routing</strong>: Nicht erforderlich.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>Nachdem Sie die Optionen konfiguriert haben, klicken Sie auf <strong>Überprüfen + Erstellen</strong> und dann auf <strong>Erstellen</strong>, wenn die Überprüfung abgeschlossen ist. Die Erstellung des Clusters nimmt einige Minuten in Anspruch.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">Verbinden Sie sich mit dem Cluster<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
<li>Navigieren Sie zu dem Cluster, den Sie in den Kubernetes-Diensten erstellt haben, und klicken Sie auf ihn.</li>
<li>Klicken Sie im Navigationsbereich auf der linken Seite auf <code translate="no">Overview</code>.</li>
<li>Klicken Sie auf der daraufhin angezeigten <strong>Übersichtsseite</strong> auf <strong>Verbinden</strong>, um die Ressourcengruppe und das Abonnement anzuzeigen.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">Einrichten eines Abonnements und von Anmeldeinformationen<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">Sie können Azure Cloud Shell verwenden, um die folgenden Verfahren durchzuführen.</div>
<ol>
<li>Führen Sie den folgenden Befehl aus, um Ihr Abonnement festzulegen.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Führen Sie den folgenden Befehl aus, um Anmeldeinformationen herunterzuladen und die Kubernetes-CLI für deren Verwendung zu konfigurieren.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Verwenden Sie für die folgenden Vorgänge dieselbe Shell. Wenn Sie zu einer anderen Shell wechseln, führen Sie die vorangegangenen Befehle erneut aus.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">Verwenden von Azure Blob Storage als externer Objektspeicher<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage ist die Azure-Version von AWS Simple Storage Service (S3).</p>
<ul>
<li>Speicherkonto und Container erstellen</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>geheimen Schlüssel abrufen, den ersten Wert verwenden</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>values.yaml hinzufügen</li>
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
<h2 id="Deploy-Milvus" class="common-anchor-header">Milvus bereitstellen<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Jetzt ist der Kubernetes-Cluster bereit. Lassen Sie uns jetzt Milvus bereitstellen.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>In den vorangegangenen Befehlen fügen wir das Repo der Milvus-Helm-Charts lokal hinzu und aktualisieren das Repo, um die neuesten Charts abzurufen. Dann installieren wir eine Milvus-Instanz und nennen sie <strong>my-release</strong>.</p>
<p>Beachten Sie den Wert von config <code translate="no">service.type</code>, der angibt, dass wir die Milvus-Instanz über einen Layer-4-Loadbalancer bereitstellen möchten.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">Überprüfen Sie die Bereitstellung<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald alle Pods laufen, führen Sie den folgenden Befehl aus, um die externe IP-Adresse zu ermitteln.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Hallo Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Beziehen Sie sich bitte auf <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, ändern Sie den Host-Wert in externe IP-Adresse und führen Sie den Code aus.</p>
<h2 id="Whats-next" class="common-anchor-header">Wie geht's weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie erfahren möchten, wie Sie Milvus in anderen Clouds einsetzen können:</p>
<ul>
<li><a href="/docs/de/v2.4.x/eks.md">Bereitstellung von Milvus Cluster auf AWS mit Kubernetes</a></li>
<li><a href="/docs/de/v2.4.x/gcp.md">Bereitstellung von Milvus Cluster auf GCP mit Kubernetes</a></li>
</ul>
