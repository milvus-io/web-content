---
id: gcs.md
title: Konfigurieren des GCS-Zugriffs über die Workload-Identität
related_key: 'gcs, storage, workload identity, iam'
summary: 'Erfahren Sie, wie Sie gcs mit Workload Identity konfigurieren.'
---
<h1 id="Configure-GCS-Access-by-Workload-Identity" class="common-anchor-header">Konfigurieren des GCS-Zugriffs über die Workload-Identität<button data-href="#Configure-GCS-Access-by-Workload-Identity" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird erläutert, wie Sie den GCS-Zugriff über die Workload-Identität konfigurieren, wenn Sie Milvus mit helm installieren. Weitere Einzelheiten finden Sie unter <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload-Identität</a>.</p>
<h2 id="Before-you-start" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Aktivieren Sie die Workload-Identität auf Clustern und Knotenpools mithilfe der Google Cloud CLI oder der Google Cloud-Konsole. Workload-Identität muss auf Clusterebene aktiviert werden, bevor Sie Workload-Identität auf Knotenpools aktivieren können.</p>
<h2 id="Configure-applications-to-use-Workload-Identity" class="common-anchor-header">Konfigurieren Sie Anwendungen für die Verwendung von Workload-Identität<button data-href="#Configure-applications-to-use-Workload-Identity" class="anchor-icon" translate="no">
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
<li>Bucket erstellen.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create <span class="hljs-attr">gs</span>:<span class="hljs-comment">//milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Erstellen Sie ein Kubernetes-Dienstkonto, das Ihre Anwendung verwenden soll.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl create serviceaccount milvus-gcs-access-sa
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Erstellen Sie ein IAM-Dienstkonto für Ihre Anwendung oder verwenden Sie stattdessen ein vorhandenes IAM-Dienstkonto. Sie können jedes beliebige IAM-Dienstkonto in jedem Projekt in Ihrer Organisation verwenden.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts create milvus-gcs-access-sa \
    --project=milvus-testing-nonprod
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Vergewissern Sie sich, dass Ihr IAM-Servicekonto über die benötigten Rollen verfügt. Sie können zusätzliche Rollen mit dem folgenden Befehl zuweisen:</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud projects <span class="hljs-keyword">add</span>-iam-policy-binding milvus-testing-nonprod \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com&quot;</span> \
    --role <span class="hljs-string">&quot;roles/storage.admin&quot;</span> \
    --condition=<span class="hljs-string">&#x27;title=milvus-testing-nonprod,expression=resource.service == &quot;storage.googleapis.com&quot; &amp;&amp; resource.name.startsWith(&quot;projects/_/buckets/milvus-testing-nonprod&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Erlauben Sie dem Kubernetes-Dienstkonto, das IAM-Dienstkonto zu verkörpern, indem Sie eine IAM-Richtlinienbindung zwischen den beiden Dienstkonten hinzufügen. Diese Bindung ermöglicht es dem Kubernetes-Dienstkonto, als IAM-Dienstkonto zu fungieren.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts add-iam-policy-binding milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com \
    --role <span class="hljs-string">&quot;roles/iam.workloadIdentityUser&quot;</span> \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-testing-nonprod.svc.id.goog[default/milvus-gcs-access-sa]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Vermerken Sie das Kubernetes-Dienstkonto mit der E-Mail-Adresse des IAM-Dienstkontos.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl annotate serviceaccount milvus-gcs-access-sa \
    --namespace <span class="hljs-keyword">default</span> \
    iam.gke.io/gcp-service-account=milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-Workload-Identity-setup" class="common-anchor-header">Überprüfen Sie die Einrichtung der Workload-Identität<button data-href="#Verify-the-Workload-Identity-setup" class="anchor-icon" translate="no">
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
    </button></h2><p>Weitere Informationen finden Sie unter <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload-Identität</a>. Führen Sie den folgenden Befehl innerhalb des Pods aus:</p>
<pre><code translate="no" class="language-bash">curl -H <span class="hljs-string">&quot;Metadata-Flavor: Google&quot;</span> http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/email
<button class="copy-code-btn"></button></code></pre>
<p>Wenn das Ergebnis <code translate="no">milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com</code> lautet, ist es in Ordnung.</p>
<h2 id="Deploy-Milvus" class="common-anchor-header">Stellen Sie Milvus bereit<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>den Inhalt der values.yaml:</p>
<pre><code translate="no" class="language-yaml">cluster:
    enabled: <span class="hljs-literal">true</span>

service:
    <span class="hljs-built_in">type</span>: LoadBalancer

minio:
    enabled: <span class="hljs-literal">false</span>

serviceAccount:
    create: <span class="hljs-literal">false</span>
    name: milvus-gcs-access-sa

externalS3:
    enabled: <span class="hljs-literal">true</span>
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: <span class="hljs-literal">true</span>
    useIAM: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
