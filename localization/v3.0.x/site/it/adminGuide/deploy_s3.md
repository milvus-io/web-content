---
id: deploy_s3.md
title: Configurare l'object storage con Docker Compose o Helm
related_key: 'S3, storage'
summary: Scopri come configurare lo storage S3 per Milvus con Docker Compose o Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurare l'object storage con Docker Compose o Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza MinIO come storage a oggetti predefinito, ma supporta anche l'uso di <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> e di altri storage a oggetti compatibili con S3 (ad esempio, Backblaze B2 o Cloudflare R2) come storage a oggetti persistente per i file di log e di indice. Questo argomento descrive come configurare S3 per Milvus. È possibile saltare questo argomento se si è soddisfatti di MinIO.</p>
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurare S3<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIO</a> è compatibile con S3. Per configurare S3 con Docker Compose, specificare i valori nella sezione <code translate="no">minio</code> del file <code translate="no">milvus.yaml</code>, presente nel percorso milvus/configs.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/configure_minio.md">Configurazioni MinIO/S3</a>.</p>
<p>È possibile specificare in modo statico una chiave di accesso e una chiave segreta, ma se si esegue Milvus su un host o un cluster che supporta l’identità del carico di lavoro (ad esempio, un profilo di istanza EC2 o IRSA su EKS), si consiglia di utilizzare invece un ruolo IAM. Impostare ` <code translate="no">useIAM</code> ` su ` <code translate="no">true</code> ` e rimuovere ` <code translate="no">accessKeyID</code> ` e ` <code translate="no">secretAccessKey</code>`:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus otterrà quindi le credenziali temporanee dal ruolo IAM associato al carico di lavoro. <code translate="no">cloudProvider</code> accetta <code translate="no">aws</code>, <code translate="no">gcp</code> o <code translate="no">aliyun</code>, mentre <code translate="no">iamEndpoint</code> può specificare facoltativamente un endpoint personalizzato per il recupero delle credenziali del ruolo IAM.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Modifica il file docker-compose.yaml<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>È inoltre necessario rimuovere la variabile d’ambiente ` <code translate="no">MINIO_ADDRESS</code> ` per il servizio Milvus all’indirizzo <code translate="no">docker-compose.yaml</code>. Per impostazione predefinita, Milvus utilizzerà Minio locale anziché S3 esterno.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Eseguire Milvus<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguire il seguente comando per avviare Milvus utilizzando le configurazioni S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Le configurazioni hanno effetto solo dopo l’avvio di Milvus. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Avvio di Milvus</a>.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Configurare S3 su K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i cluster Milvus su K8s, è possibile configurare S3 nello stesso comando che avvia Milvus. In alternativa, è possibile configurare S3 utilizzando il file ` <code translate="no">values.yml</code> ` presente nel percorso `/charts/milvus` del repository <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> prima di avviare Milvus.</p>
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
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Il percorso radice dell'archivio S3.</td><td>Per impostazione predefinita, è una stringa vuota.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>L'ID della chiave di accesso per S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La chiave di accesso segreta per S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Il nome del bucket S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Se utilizzare SSL durante la connessione</td><td>I valori predefiniti sono <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.useIAM</code></td><td>Se utilizzare un ruolo IAM al posto delle chiavi di accesso e segrete per accedere a S3.</td><td>Il valore predefinito è <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.cloudProvider</code></td><td>Fornitore di servizi cloud che emette le credenziali del ruolo IAM.</td><td><code translate="no">aws</code>, <code translate="no">gcp</code> o <code translate="no">aliyun</code>; il valore predefinito è <code translate="no">aws</code></td></tr>
<tr><td><code translate="no">externalS3.iamEndpoint</code></td><td>Endpoint personalizzato per il recupero delle credenziali del ruolo IAM.</td><td>Lasciare vuoto per utilizzare l’impostazione predefinita del provider.</td></tr>
</tbody>
</table>
<p>Se il cluster supporta l’identità del carico di lavoro (ad esempio, IRSA su EKS), impostare <code translate="no">externalS3.useIAM</code> su <code translate="no">true</code> e rimuovere <code translate="no">externalS3.accessKey</code> e <code translate="no">externalS3.secretKey</code> — Milvus otterrà le credenziali temporanee dal ruolo IAM associato al carico di lavoro.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilizzo del file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configurare la sezione <code translate="no">minio</code> nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configurare la sezione <code translate="no">externalS3</code> utilizzando i propri valori nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Dopo aver configurato le sezioni precedenti e salvato il file <code translate="no">values.yaml</code>, eseguire il comando seguente per installare Milvus utilizzando le configurazioni S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Utilizzo di un comando<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>Per installare Milvus e configurare S3, eseguire il comando seguente utilizzando i propri valori.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Scopri come configurare altre dipendenze di Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/it/deploy_etcd.md">Configurare Meta Storage con Docker Compose o Helm</a></li>
<li><a href="/docs/it/deploy_pulsar.md">Configurare Message Storage con Docker Compose o Helm</a></li>
</ul>
