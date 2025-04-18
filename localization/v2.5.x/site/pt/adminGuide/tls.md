---
id: tls.md
title: Encriptação em trânsito
summary: Saiba como ativar o proxy TLS no Milvus.
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">Encriptação em trânsito<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>O TLS (Transport Layer Security) é um protocolo de encriptação que garante a segurança das comunicações. O proxy Milvus utiliza a autenticação unidirecional e bidirecional TLS.</p>
<p>Este tópico descreve como ativar o TLS no proxy Milvus para os tráfegos gRPC e RESTful.</p>
<div class="alert note">
<p>O TLS e a autenticação do utilizador são duas abordagens de segurança distintas. Se tiver ativado a autenticação do utilizador e o TLS no seu sistema Milvus, terá de fornecer um nome de utilizador, uma palavra-passe e caminhos de ficheiros de certificados. Para obter informações sobre como ativar a autenticação do utilizador, consulte <a href="/docs/pt/authenticate.md">Autenticar o acesso do utilizador</a>.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">Criar seu próprio certificado<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Pré-requisitos</h3><p>Certifique-se de que o OpenSSL esteja instalado. Se não o tiver instalado, <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">compile e instale</a> o OpenSSL primeiro.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>Se o OpenSSL não estiver instalado. Ele pode ser instalado com o seguinte comando no Ubuntu.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">Criar ficheiros</h3><ol>
<li>Crie o ficheiro <code translate="no">gen.sh</code>.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Copie o seguinte script para o ficheiro <code translate="no">gen.sh</code>.</li>
</ol>
<p>É necessário configurar o <code translate="no">CommonName</code> no ficheiro <code translate="no">gen.sh</code>. O <code translate="no">CommonName</code> refere-se ao nome do servidor que o cliente deve especificar durante a ligação.</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta">#!/usr/bin/env sh</span>
<span class="hljs-comment"># your variables</span>
Country=<span class="hljs-string">&quot;US&quot;</span>
State=<span class="hljs-string">&quot;CA&quot;</span>
Location=<span class="hljs-string">&quot;Redwood City&quot;</span>
Organization=<span class="hljs-string">&quot;zilliz&quot;</span>
OrganizationUnit=<span class="hljs-string">&quot;devops&quot;</span>
CommonName=<span class="hljs-string">&quot;localhost&quot;</span>
ExpireDays=3650 <span class="hljs-comment"># 10 years</span>

<span class="hljs-comment"># generate private key for ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out ca.key
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

<span class="hljs-comment"># create a new ca certificate</span>
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>

<span class="hljs-comment"># prepare extension config for signing certificates</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;</span><span class="hljs-variable">$CommonName</span> &gt; openssl.cnf

<span class="hljs-comment"># sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<span class="hljs-comment"># sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>As variáveis no ficheiro <code translate="no">gen.sh</code> são cruciais para o processo de criação de um ficheiro de pedido de assinatura de certificado. As primeiras cinco variáveis são as informações básicas de assinatura, incluindo país, estado, localização, organização e unidade organizacional. É necessário ter cuidado ao configurar o <code translate="no">CommonName</code>, pois ele será verificado durante a comunicação cliente-servidor.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">Execute <code translate="no">gen.sh</code> para gerar o certificado</h3><p>Execute o ficheiro <code translate="no">gen.sh</code> para criar o certificado.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>Serão criados os sete ficheiros seguintes: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>.</p>
<p>Certifique-se de que mantém os ficheiros <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code> seguros para poder renovar os seus certificados mais tarde. Os ficheiros <code translate="no">server.key</code> e <code translate="no">server.pem</code> são utilizados pelo servidor e os ficheiros <code translate="no">client.key</code> e <code translate="no">client.pem</code> são utilizados pelo cliente.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">Renovar certificados (opcional)</h3><p>Se pretender renovar os certificados em alguns casos, por exemplo, se expirarem em breve, pode utilizar o seguinte script.</p>
<p>É necessário ter <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code> no seu diretório de trabalho.</p>
<p><details><summary><code translate="no">renew.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta">#!/usr/bin/env sh</span>
<span class="hljs-comment"># your variables</span>
Country=<span class="hljs-string">&quot;US&quot;</span>
State=<span class="hljs-string">&quot;CA&quot;</span>
Location=<span class="hljs-string">&quot;Redwood City&quot;</span>
Organization=<span class="hljs-string">&quot;zilliz&quot;</span>
OrganizationUnit=<span class="hljs-string">&quot;devops&quot;</span>
CommonName=<span class="hljs-string">&quot;localhost&quot;</span>
ExpireDays=3650 <span class="hljs-comment"># 10 years</span>

<span class="hljs-comment"># generate private key for ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

<span class="hljs-comment"># prepare extension config for signing certificates</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;</span><span class="hljs-variable">$CommonName</span> &gt; openssl.cnf

<span class="hljs-comment"># sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<span class="hljs-comment"># sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Execute o ficheiro <code translate="no">renew.sh</code> para criar o certificado.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">Configurar um servidor Milvus com TLS<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção descreve os passos para configurar um servidor Milvus com encriptação TLS.</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">Configuração para o Docker Compose</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Modificar a configuração do servidor Milvus</h4><p>Para ativar o TLS externo, adicione as seguintes configurações no ficheiro <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">proxy:
  http:
    <span class="hljs-comment"># for now milvus do not support config restful on same port with grpc</span>
    <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
    port: <span class="hljs-number">8080</span> 
tls:
  serverPemPath: /milvus/tls/server.pem
  serverKeyPath: /milvus/tls/server.key
  caPemPath: /milvus/tls/ca.pem

common:
  security:
    tlsMode: <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parâmetros:</p>
<ul>
<li><code translate="no">serverPemPath</code>: O caminho para o ficheiro de certificado do servidor.</li>
<li><code translate="no">serverKeyPath</code>: O caminho para o ficheiro da chave do servidor.</li>
<li><code translate="no">caPemPath</code>: O caminho para o ficheiro do certificado da CA.</li>
<li><code translate="no">tlsMode</code>: O modo TLS para o serviço externo. Valores válidos:<ul>
<li><code translate="no">1</code>: Autenticação unidirecional, em que apenas o servidor requer um certificado e o cliente o verifica. Este modo requer <code translate="no">server.pem</code> e <code translate="no">server.key</code> do lado do servidor, e <code translate="no">server.pem</code> do lado do cliente.</li>
<li><code translate="no">2</code>: Autenticação bidirecional, em que tanto o servidor como o cliente necessitam de certificados para estabelecer uma ligação segura. Este modo requer <code translate="no">server.pem</code>, <code translate="no">server.key</code>, e <code translate="no">ca.pem</code> do lado do servidor, e <code translate="no">client.pem</code>, <code translate="no">client.key</code>, e <code translate="no">ca.pem</code> do lado do cliente.</li>
</ul></li>
</ul>
<p>Para ativar o TLS interno, adicione as seguintes configurações no arquivo <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls</span>:
  <span class="hljs-attr">serverPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">pem</span>
  <span class="hljs-attr">serverKeyPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">key</span>
  <span class="hljs-attr">caPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/ca.<span class="hljs-property">pem</span>

<span class="hljs-attr">common</span>:
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">internaltlsEnabled</span>: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Parâmetros:</p>
<ul>
<li><code translate="no">serverPemPath</code>: O caminho para o arquivo de certificado do servidor.</li>
<li><code translate="no">serverKeyPath</code>: O caminho para o ficheiro da chave do servidor.</li>
<li><code translate="no">caPemPath</code>: O caminho para o ficheiro do certificado da CA.</li>
<li><code translate="no">internaltlsEnabled</code>: Se deve ativar o TLS interno. Por enquanto, apenas o tls unidirecional é suportado.</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. Mapear ficheiros de certificado para o contentor</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">Preparar ficheiros de certificados</h5><p>Crie uma nova pasta chamada <code translate="no">tls</code> no mesmo diretório que o seu <code translate="no">docker-compose.yaml</code>. Copie os arquivos <code translate="no">server.pem</code>, <code translate="no">server.key</code> e <code translate="no">ca.pem</code> para a pasta <code translate="no">tls</code>. Coloque-os em uma estrutura de diretório como a seguir:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
<button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Atualizar a configuração do Docker Compose</h4><p>Edite o ficheiro <code translate="no">docker-compose.yaml</code> para mapear os caminhos do ficheiro de certificado dentro do contentor, conforme mostrado abaixo:</p>
<pre><code translate="no" class="language-yaml">  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:latest
    <span class="hljs-built_in">command</span>: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    security_opt:
    - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/tls:/milvus/tls
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Implantar o Milvus usando o Docker Compose</h5><p>Execute o seguinte comando para implantar o Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">Configuração para o operador do Milvus</h3><p>Coloque os ficheiros de certificado no seu diretório de trabalho. A estrutura do diretório deve ser semelhante a esta:</p>
<pre><code translate="no">├── milvus.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Crie um segredo com os ficheiros de certificado:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para ativar o TLS externo, adicione as seguintes configurações no ficheiro <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        tlsMode: <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable</span>
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
  components:
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>Para ativar o TLS interno, adicione as seguintes configurações no arquivo <code translate="no">milvus.yaml</code>:</p>
<p>Não se esqueça de substituir o campo <code translate="no">internaltls.sni</code> pelo CommonName nos seus certificados.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        internaltlsEnabled: true <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost <span class="hljs-comment"># the CommonName in your certificates</span>
  components:
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>criar o Milvus CR:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">configuração para o Milvus Helm</h3><p>Coloque os ficheiros de certificados no seu diretório de trabalho. A estrutura do diretório deve ter o seguinte aspeto:</p>
<pre><code translate="no">├── values.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Crie um segredo com os ficheiros de certificados:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para ativar o TLS externo, adicione as seguintes configurações no ficheiro <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        tlsMode: <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 means set to 2 to enable Mutual TLS</span>
    <span class="hljs-comment"># Configure tls certificates path for external service</span>
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
<span class="hljs-comment"># mount the certs secret to the milvus container</span>
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>Para ativar o TLS interno, adicione as seguintes configurações no arquivo <code translate="no">values.yaml</code>:</p>
<p>Não se esqueça de substituir o campo <code translate="no">internaltls.sni</code> pelo CommonName nos seus certificados.</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        internaltlsEnabled: <span class="hljs-literal">true</span> <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
<span class="hljs-comment"># mount the certs secret to the milvus container</span>
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Criar a versão milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">Verificar se o TLS interno está ativado<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>É difícil verificar o TLS interno diretamente. Pode verificar o registo do Milvus para ver se o TLS interno está ativado.</p>
<p>No registo do Milvus, deverá ver a seguinte mensagem se o TLS interno estiver ativado:</p>
<pre><code translate="no">[...<span class="hljs-built_in">date</span> time...] [INFO] [utils/util.go:56] [<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>] [value=<span class="hljs-literal">true</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">Ligar ao servidor Milvus com TLS<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Para interações SDK, utilize as seguintes configurações, dependendo do modo TLS.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Ligação TLS unidirecional</h3><p>Forneça o caminho para <code translate="no">server.pem</code> e certifique-se de que <code translate="no">server_name</code> corresponde a <code translate="no">CommonName</code> configurado no certificado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Ligação TLS bidirecional</h3><p>Forneça os caminhos para <code translate="no">client.pem</code>, <code translate="no">client.key</code>, e <code translate="no">ca.pem</code>, e certifique-se de que <code translate="no">server_name</code> corresponde a <code translate="no">CommonName</code> configurado no certificado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    client_pem_path=<span class="hljs-string">&quot;path_to/client.pem&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;path_to/client.key&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;path_to/ca.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Consulte <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">example_tls1.py</a> e <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py">example_tls2.py</a> para obter mais informações.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">Ligar ao servidor Milvus RESTful com TLS<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Para APIs RESTful, pode verificar o tls utilizando o comando <code translate="no">curl</code>.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Conexão TLS unidirecional</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Ligação TLS bidirecional</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
