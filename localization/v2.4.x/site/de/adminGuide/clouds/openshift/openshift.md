---
id: openshift.md
title: Bereitstellung eines Milvus-Clusters auf OpenShift
related_key: cluster
summary: 'Erfahren Sie, wie Sie einen Milvus-Cluster auf OpenShift bereitstellen.'
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">Bereitstellung eines Milvus-Clusters auf OpenShift<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema enthält eine Schritt-für-Schritt-Anleitung für die Bereitstellung von Milvus auf OpenShift.</p>
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
    </button></h2><p>Bevor Sie mit dem Bereitstellungsprozess beginnen, stellen Sie sicher, dass Sie Folgendes haben</p>
<ul>
<li>Ein laufender OpenShift-Cluster.</li>
<li>Zugriff auf den OpenShift-Cluster mit ausreichenden Rechten (Rolle<code translate="no">cluster-admin</code> oder gleichwertig).</li>
<li>Zugriff auf die Webkonsole der OpenShift Container Platform.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">Schritt 1: Installieren Sie Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>Cert Manager ist für die Verwaltung von TLS-Zertifikaten für Milvus Operator erforderlich.</p>
<ol>
<li><p>Suchen Sie eine geeignete Cert-Manager-Version für Ihre OpenShift-Version: <a href="https://cert-manager.io/docs/releases/">Cert Manager Releases</a>.</p></li>
<li><p>Installieren Sie Cert Manager gemäß der offiziellen Anleitung: <a href="https://cert-manager.io/docs/installation/">Cert Manager-Installation</a>.</p></li>
<li><p>Überprüfen Sie, ob Ihr Cert Manager funktioniert:</p>
<ol>
<li><p>Navigieren Sie in Ihrer OpenShift-Konsole zu <strong>Workloads</strong> &gt; <strong>Pods</strong>. Wählen Sie das Projekt <strong>cert-manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>Stellen Sie sicher, dass alle Pods bereit sind. Das Bild unten zeigt zum Beispiel, dass die Pods noch am Starten sind. Warten Sie, bis alle diese Pods bereit sind.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>cert-verwalter-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">Schritt 2: Ausstellen eines selbstsignierten Zertifikats für Milvus Operator<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergewissern Sie sich, dass Sie als <code translate="no">kubeadmin</code> oder mit gleichwertigen Rechten angemeldet sind.</p>
<ol>
<li><p>Erstellen Sie die folgende Manifestdatei mit dem Namen <code translate="no">milvus-operator-certificate.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: milvus-operator-serving-cert
  namespace: milvus-operator
spec:
  dnsNames:
  - milvus-operator-webhook-service.milvus-operator.svc
  - milvus-operator-webhook-service.milvus-operator.svc.cluster.local
  issuerRef:
    kind: Issuer
    name: milvus-operator-selfsigned-issuer
  secretName: milvus-operator-webhook-cert
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: milvus-operator-selfsigned-issuer
  namespace: milvus-operator
spec:
  selfSigned: {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Wenden Sie die Datei an:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-<span class="hljs-keyword">operator</span>-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">Schritt 3: Installieren Sie Milvus Operator<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Nun können Sie mit der Installation von Milvus Operator beginnen. Es wird empfohlen, Helm für die Installation von Milvus Operator zu verwenden, um den Konfigurationsprozess zu vereinfachen.</p>
<ol>
<li><p>Fügen Sie das Milvus Operator Helm-Repository hinzu:</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Installieren Sie Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">Schritt 4: Milvus bereitstellen<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Folgen Sie dem Rest der Anleitung auf der Milvus-Dokumentationsseite: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Milvus bereitstellen</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li><a href="/docs/de/v2.4.x/azure.md">Bereitstellung von Milvus Cluster auf Azure mit Kubernetes</a></li>
<li><a href="/docs/de/v2.4.x/gcp.md">Bereitstellung von Milvus Cluster auf GCP mit Kubernetes</a></li>
</ul>
