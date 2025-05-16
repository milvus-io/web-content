---
id: deploy_s3.md
title: Configurar o armazenamento de objetos com o Docker Compose ou Helm
related_key: 'S3, storage'
summary: >-
  Saiba como configurar o armazenamento S3 para o Milvus com o Docker Compose ou
  Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurar o armazenamento de objetos com o Docker Compose ou Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus usa o MinIO para armazenamento de objetos por padrão, mas também suporta o uso do <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> como armazenamento persistente de objetos para arquivos de log e índice. Este tópico descreve como configurar o S3 para o Milvus. Você pode pular este tópico se estiver satisfeito com o MinIO.</p>
<p>É possível configurar o S3 com o <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> ou no K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Configurar o S3 com o Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurar o S3</h3><p><a href="https://min.io/product/overview">O MinIO</a> é compatível com o S3. Para configurar o S3 com o Docker Compose, forneça seus valores para a seção <code translate="no">minio</code> no arquivo <code translate="no">milvus.yaml</code> no caminho milvus/configs.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_minio.md">Configurações do MinIO/S3</a> para obter mais informações.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Refinar o docker-compose.yaml</h3><p>Você também removeria a variável de ambiente <code translate="no">MINIO_ADDRESS</code> para o serviço milvus em <code translate="no">docker-compose.yaml</code>. Por padrão, o milvus usará o minio local em vez do S3 externo.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Executar o Milvus</h3><p>Execute o seguinte comando para iniciar o Milvus que usa as configurações do S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">As configurações só entram em vigor após o início do Milvus. Consulte <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Iniciar o Milvus</a> para obter mais informações.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Configurar o S3 no K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters do Milvus no K8s, é possível configurar o S3 no mesmo comando que inicia o Milvus. Como alternativa, é possível configurar o S3 usando o arquivo <code translate="no">values.yml</code> no caminho /charts/milvus no repositório <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar o Milvus.</p>
<p>A tabela seguinte lista as chaves para configurar o S3 no ficheiro YAML.</p>
<table>
<thead>
<tr><th>Chave</th><th>Descrição do ficheiro</th><th>Valor</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Ativa ou desactiva o MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Ativa ou desactiva S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>O ponto final para aceder ao S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>A porta para aceder ao S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>O caminho da raiz do armazenamento S3.</td><td>Uma cadeia de caracteres emtpy por predefinição.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>O ID da chave de acesso para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>A chave de acesso secreta para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>O nome do bucket do S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Se deve ser usado SSL ao conectar</td><td>Os valores são predefinidos para <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Usando o arquivo YAML</h3><ol>
<li>Configure a secção <code translate="no">minio</code> no ficheiro <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure a secção <code translate="no">externalS3</code> utilizando os seus valores no ficheiro <code translate="no">values.yaml</code>.</li>
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
<li>Após configurar as secções anteriores e guardar o ficheiro <code translate="no">values.yaml</code>, execute o seguinte comando para instalar o Milvus que utiliza as configurações S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Usando um comando</h3><p>Para instalar o Milvus e configurar o S3, execute o seguinte comando utilizando os seus valores.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Saiba como configurar outras dependências do Milvus com o Docker Compose ou o Helm:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/deploy_etcd.md">Configurar o armazenamento de meta com o Docker Compose ou Helm</a></li>
<li><a href="/docs/pt/v2.4.x/deploy_pulsar.md">Configurar o armazenamento de mensagens com o Docker Compose ou Helm</a></li>
</ul>
