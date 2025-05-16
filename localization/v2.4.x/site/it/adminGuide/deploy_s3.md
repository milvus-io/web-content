---
id: deploy_s3.md
title: Configurazione dell'archiviazione a oggetti con Docker Compose o Helm
related_key: 'S3, storage'
summary: Imparate a configurare lo storage S3 per Milvus con Docker Compose o Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurare l'archiviazione degli oggetti con Docker Compose o Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza MinIO per l'archiviazione degli oggetti per impostazione predefinita, ma supporta anche l'uso di <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> come archiviazione persistente degli oggetti per i file di log e di indice. Questo argomento descrive come configurare S3 per Milvus. È possibile saltare questo argomento se si è soddisfatti di MinIO.</p>
<p>È possibile configurare S3 con <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> o su K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Configurazione di S3 con Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurare S3</h3><p><a href="https://min.io/product/overview">MinIO</a> è compatibile con S3. Per configurare S3 con Docker Compose, fornire i valori della sezione <code translate="no">minio</code> nel file <code translate="no">milvus.yaml</code> nel percorso milvus/configs.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni, vedere <a href="/docs/it/v2.4.x/configure_minio.md">Configurazioni MinIO/S3</a>.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Affinare docker-compose.yaml</h3><p>Si rimuova anche la variabile d'ambiente <code translate="no">MINIO_ADDRESS</code> per il servizio milvus all'indirizzo <code translate="no">docker-compose.yaml</code>. Per impostazione predefinita, milvus utilizzerà Minio locale invece di S3 esterno.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Eseguire Milvus</h3><p>Eseguire il seguente comando per avviare Milvus che utilizza le configurazioni S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Le configurazioni diventano effettive solo dopo l'avvio di Milvus. Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Avvio di Milvus</a>.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Configurazione di S3 su K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i cluster Milvus su K8s, è possibile configurare S3 con lo stesso comando di avvio di Milvus. In alternativa, è possibile configurare S3 utilizzando il file <code translate="no">values.yml</code> nel percorso /charts/milvus nel repository <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> prima di avviare Milvus.</p>
<p>La tabella seguente elenca le chiavi per la configurazione di S3 nel file YAML.</p>
<table>
<thead>
<tr><th>Chiave</th><th>Descrizione</th><th>Valore</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Abilita o disabilita MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Abilita o disabilita S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>L'endpoint per accedere a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>La porta per accedere a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Il percorso principale dello storage S3.</td><td>Una stringa emtpy per impostazione predefinita.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>L'ID della chiave di accesso per S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La chiave di accesso segreta per S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Il nome del bucket S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Se utilizzare SSL durante la connessione</td><td>I valori sono predefiniti a <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilizzo del file YAML</h3><ol>
<li>Configurare la sezione <code translate="no">minio</code> nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configurare la sezione <code translate="no">externalS3</code> usando i propri valori nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Dopo aver configurato le sezioni precedenti e salvato il file <code translate="no">values.yaml</code>, eseguire il seguente comando per installare Milvus che utilizza le configurazioni S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Utilizzo di un comando</h3><p>Per installare Milvus e configurare S3, eseguire il seguente comando utilizzando i valori impostati.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Scoprite come configurare altre dipendenze di Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/it/v2.4.x/deploy_etcd.md">Configurazione di Meta Storage con Docker Compose o Helm</a></li>
<li><a href="/docs/it/v2.4.x/deploy_pulsar.md">Configurazione dell'archiviazione dei messaggi con Docker Compose o Helm</a></li>
</ul>
