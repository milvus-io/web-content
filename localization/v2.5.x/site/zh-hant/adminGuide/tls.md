---
id: tls.md
title: 傳輸中的加密
summary: 了解如何在 Milvus 中啟用 TLS 代理。
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">傳輸中的加密<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS（傳輸層安全）是一種加密協議，以確保通訊安全。Milvus 代理使用 TLS 單向和雙向認證。</p>
<p>本主題描述如何在 Milvus 代理中為 gRPC 和 RESTful 流量啟用 TLS。</p>
<div class="alert note">
<p>TLS 和用戶認證是兩種不同的安全方法。如果你在 Milvus 系統中同時啟用了用戶認證和 TLS，你將需要提供用戶名、密碼和證書檔路徑。有關如何啟用使用者驗證的資訊，請參考<a href="/docs/zh-hant/authenticate.md">驗證使用者存取</a>。</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">建立你自己的證書<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">先決條件</h3><p>確定已安裝 OpenSSL。如果尚未安裝，請先<a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">建立並安裝</a>OpenSSL。</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>如果未安裝 OpenSSL。可在 Ubuntu 中使用下列指令安裝。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">建立檔案</h3><ol>
<li>建立<code translate="no">gen.sh</code> 檔案。</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>將下列腳本複製到<code translate="no">gen.sh</code> 。</li>
</ol>
<p>有必要在<code translate="no">gen.sh</code> 檔案中設定<code translate="no">CommonName</code> 。<code translate="no">CommonName</code> 指的是客戶端在連線時應指定的伺服器名稱。</p>
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
<p><code translate="no">gen.sh</code> 檔案中的變數對建立證書簽章請求檔案的過程至關重要。前五個變數是基本的簽署資訊，包括國家、州、地點、組織、組織單位。配置<code translate="no">CommonName</code> 時必須謹慎，因為它會在客戶端與伺服器通訊期間進行驗證。</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">執行<code translate="no">gen.sh</code> 以產生憑證</h3><p>執行<code translate="no">gen.sh</code> 檔案以建立憑證。</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>將會建立下列七個檔案：<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code>,<code translate="no">server.key</code>,<code translate="no">server.pem</code>,<code translate="no">client.key</code>,<code translate="no">client.pem</code> 。</p>
<p>請務必確保<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code> 的安全，以便稍後更新您的憑證。<code translate="no">server.key</code> 和<code translate="no">server.pem</code> 檔案供伺服器使用，而<code translate="no">client.key</code> 和<code translate="no">client.pem</code> 檔案供用戶端使用。</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">更新憑證 (選用)</h3><p>如果您想在某些情況下更新證書，例如證書即將過期，您可以使用下列腳本。</p>
<p>您的工作目錄中需要<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code> 。</p>
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
<p>執行<code translate="no">renew.sh</code> 檔案來建立證書。</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">使用 TLS 設定 Milvus 伺服器<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>本節概述使用 TLS 加密設定 Milvus 伺服器的步驟。</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">為 Docker Compose 設定</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1.修改 Milvus 伺服器設定</h4><p>要啟用外部 TLS，請在<code translate="no">milvus.yaml</code> 檔案中加入下列配置：</p>
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
<p>參數：</p>
<ul>
<li><code translate="no">serverPemPath</code>:伺服器證書檔案的路徑。</li>
<li><code translate="no">serverKeyPath</code>:伺服器金鑰檔案的路徑。</li>
<li><code translate="no">caPemPath</code>:CA 憑證檔案的路徑。</li>
<li><code translate="no">tlsMode</code>:外部服務的 TLS 模式。有效值：<ul>
<li><code translate="no">1</code>:單向驗證，只有伺服器需要憑證，用戶端驗證憑證。此模式需要伺服器端提供<code translate="no">server.pem</code> 和<code translate="no">server.key</code> ，用戶端提供<code translate="no">server.pem</code> 。</li>
<li><code translate="no">2</code>:雙向認證：伺服器和用戶端都需要憑證才能建立安全連線。此模式需要伺服器端的<code translate="no">server.pem</code>,<code translate="no">server.key</code>, 和<code translate="no">ca.pem</code> ，以及用戶端的<code translate="no">client.pem</code>,<code translate="no">client.key</code>, 和<code translate="no">ca.pem</code> 。</li>
</ul></li>
</ul>
<p>若要啟用內部 TLS，請在<code translate="no">milvus.yaml</code> 檔案中加入下列設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls</span>:
  <span class="hljs-attr">serverPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">pem</span>
  <span class="hljs-attr">serverKeyPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">key</span>
  <span class="hljs-attr">caPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/ca.<span class="hljs-property">pem</span>

<span class="hljs-attr">common</span>:
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">internaltlsEnabled</span>: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>參數：</p>
<ul>
<li><code translate="no">serverPemPath</code>:伺服器證書檔案的路徑。</li>
<li><code translate="no">serverKeyPath</code>:伺服器金鑰檔案的路徑。</li>
<li><code translate="no">caPemPath</code>:CA 憑證檔案的路徑。</li>
<li><code translate="no">internaltlsEnabled</code>:是否啟用內部 TLS。目前只支援單向 TLS。</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2.將憑證檔案映射到容器</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">準備證書檔案</h5><p>在與您的<code translate="no">docker-compose.yaml</code> 相同的目錄下建立一個名為<code translate="no">tls</code> 的新資料夾。將<code translate="no">server.pem</code> 、<code translate="no">server.key</code> 及<code translate="no">ca.pem</code> 複製到<code translate="no">tls</code> 資料夾。將它們放置在如下的目錄結構中：</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
<button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">更新 Docker Compose 配置</h4><p>編輯<code translate="no">docker-compose.yaml</code> 檔案以對應容器內的憑證檔案路徑，如下所示：</p>
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
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 部署 Milvus</h5><p>執行下列指令部署 Milvus：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">為 Milvus 操作員設定</h3><p>將憑證檔案放到您的工作目錄中。目錄結構應如下所示：</p>
<pre><code translate="no">├── milvus.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>使用證書檔案建立一個秘密：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要啟用外部 TLS，請在<code translate="no">milvus.yaml</code> 檔案中加入下列設定：</p>
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
<p>要啟用內部 TLS，請在<code translate="no">milvus.yaml</code> 檔案中加入下列設定：</p>
<p>記住在證書中以 CommonName 取代<code translate="no">internaltls.sni</code> 欄位。</p>
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
<p>建立 Milvus CR：</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">設定為 Milvus Helm</h3><p>把證書檔案放到你的工作目錄。目錄結構應該是這樣的</p>
<pre><code translate="no">├── values.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>使用證書檔案建立一個秘密：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要啟用外部 TLS，請在<code translate="no">values.yaml</code> 檔案中加入下列設定：</p>
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
<p>要啟用內部 TLS，請在<code translate="no">values.yaml</code> 檔案中加入下列設定：</p>
<p>切記在憑證中以 CommonName 取代<code translate="no">internaltls.sni</code> 欄位。</p>
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
<p>建立 milvus 版本：</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">驗證內部 TLS 已啟用<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>很難直接驗證內部 TLS。你可以檢查 Milvus 日誌，看看內部 TLS 是否啟用。</p>
<p>在 Milvus 日誌中，如果內部 TLS 已啟用，你應該會看到以下訊息：</p>
<pre><code translate="no">[...<span class="hljs-built_in">date</span> time...] [INFO] [utils/util.go:56] [<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>] [value=<span class="hljs-literal">true</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">使用 TLS 連線到 Milvus 伺服器<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 SDK 互動，根據 TLS 模式使用下列設定。</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">單向 TLS 連線</h3><p>提供<code translate="no">server.pem</code> 的路徑，並確保<code translate="no">server_name</code> 與證書中設定的<code translate="no">CommonName</code> 吻合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">雙向 TLS 連線</h3><p>提供<code translate="no">client.pem</code>,<code translate="no">client.key</code>, 和<code translate="no">ca.pem</code> 的路徑，並確保<code translate="no">server_name</code> 與證書中設定的<code translate="no">CommonName</code> 吻合。</p>
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
<p>更多資訊請參閱<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">example_tls1.py</a>和<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py">example_tls2.</a> <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">py</a>。</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">使用 TLS 連線到 Milvus RESTful 伺服器<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 RESTful API，您可以使用<code translate="no">curl</code> 指令檢查 tls。</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">單向 TLS 連線</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">雙向 TLS 連線</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
