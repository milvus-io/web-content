---
id: configure_grafana_loki.md
title: Configurar o Grafana Loki
summary: >-
  Este tópico descreve como coletar logs usando o Loki e consultar logs de um
  cluster Milvus usando o Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Configurar o Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece instruções sobre como configurar o Loki para coletar logs e o Grafana para consultar e exibir logs para um cluster Milvus.</p>
<p>Neste guia, você aprenderá como:</p>
<ul>
<li>Implantar <a href="https://grafana.com/docs/loki/latest/get-started/overview/">o Loki</a> e <a href="https://grafana.com/docs/loki/latest/get-started/overview/">o</a> <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> em um cluster Milvus usando o Helm.</li>
<li>Configurar o armazenamento de objetos para o Loki.</li>
<li>Consultar logs usando o Grafana.</li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Você instalou <a href="/docs/pt/v2.4.x/install_cluster-helm.md">um cluster do Milvus no K8s</a>.</li>
<li>Você instalou as ferramentas necessárias, incluindo <a href="https://helm.sh/docs/intro/install/">Helm</a> e <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Implantar o Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>O Loki é um sistema de agregação de logs inspirado no Prometheus. Implante o Loki usando o Helm para coletar logs do seu cluster Milvus.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Adicionar o repositório de gráficos do Helm do Grafana</h3><p>Adicione o repositório de gráficos do Grafana ao Helm e atualize-o:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configurar o armazenamento de objetos para o Loki</h3><p>Escolha uma das seguintes opções de armazenamento e crie um arquivo de configuração <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Opção 1: Usando MinIO para armazenamento</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Opção 2: usar o AWS S3 para armazenamento</p>
<p>No exemplo a seguir, substitua <code translate="no">&lt;accessKey&gt;</code> e <code translate="no">&lt;keyId&gt;</code> pela sua própria chave de acesso e ID do S3, <code translate="no">s3.endpoint</code> pelo ponto de extremidade do S3 e <code translate="no">s3.region</code> pela região do S3.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Instalar o Loki</h3><p>Execute os seguintes comandos para instalar o Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Implantar o Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>O Promtail é um agente de coleta de logs para o Loki. Ele lê os logs dos pods do Milvus e os envia para o Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Criar a configuração do Promtail</h3><p>Crie um arquivo de configuração <code translate="no">promtail.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Instalar o Promtail</h3><p>Instalar o Promtail usando o Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Consultar logs com o Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Implante o Grafana e configure-o para se conectar ao Loki para consultar os logs.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Implantar o Grafana</h3><p>Instale o Grafana usando os seguintes comandos:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Antes de poder acessar o Grafana, é necessário recuperar a senha <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, encaminhe a porta do Grafana para sua máquina local:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Adicionar o Loki como uma fonte de dados no Grafana</h3><p>Quando o Grafana estiver em execução, você precisa adicionar o Loki como uma fonte de dados para consultar os logs.</p>
<ol>
<li>Abra um navegador da Web e navegue até <code translate="no">127.0.0.1:3000</code>. Faça login usando o nome de usuário <code translate="no">admin</code> e a senha obtida anteriormente.</li>
<li>No menu do lado esquerdo, escolha <strong>Conexões</strong> &gt; <strong>Adicionar nova conexão</strong>.</li>
<li>Na página que aparece, escolha <strong>Loki</strong> como o tipo de fonte de dados. Pode introduzir <strong>loki</strong> na barra de pesquisa para encontrar a fonte de dados.</li>
<li>Nas definições da fonte de dados Loki, especifique o <strong>Nome</strong> e o <strong>URL</strong> e, em seguida, clique em <strong>Guardar e testar</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Fonte de dados</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Consultar registos do Milvus</h3><p>Depois de adicionar o Loki como uma fonte de dados, consulte os logs do Milvus no Grafana:</p>
<ol>
<li>No menu do lado esquerdo, clique em <strong>Explore (Explorar</strong>).</li>
<li>No canto superior esquerdo da página, escolha a fonte de dados loki.</li>
<li>Use o <strong>navegador de rótulos</strong> para selecionar rótulos e consultar logs.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Consultar</span> </span></p>
