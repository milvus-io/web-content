---
id: tls.md
title: Шифрование в пути
summary: 'Узнайте, как включить TLS-прокси в Milvus.'
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">Шифрование в пути<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS (Transport Layer Security) - это протокол шифрования, обеспечивающий безопасность связи. Milvus proxy использует TLS для односторонней и двусторонней аутентификации.</p>
<p>В этой теме описывается, как включить TLS в Milvus proxy для gRPC и RESTful трафика.</p>
<div class="alert note">
<p>TLS и аутентификация пользователя - это два разных подхода к безопасности. Если вы включили аутентификацию пользователя и TLS в своей системе Milvus, вам нужно будет указать имя пользователя, пароль и путь к файлу сертификата. Информацию о том, как включить аутентификацию пользователей, см. в разделе <a href="/docs/ru/authenticate.md">Аутентификация доступа пользователей</a>.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">Создание собственного сертификата<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Необходимые условия</h3><p>Убедитесь, что OpenSSL установлен. Если он не установлен, сначала <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">соберите и установите</a> OpenSSL.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>Если OpenSSL не установлен. В Ubuntu его можно установить с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">Создайте файлы</h3><ol>
<li>Создайте файл <code translate="no">gen.sh</code>.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Скопируйте следующий скрипт в папку <code translate="no">gen.sh</code>.</li>
</ol>
<p>Необходимо настроить <code translate="no">CommonName</code> в файле <code translate="no">gen.sh</code>. <code translate="no">CommonName</code> означает имя сервера, которое клиент должен указать при подключении.</p>
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
<p>Переменные в файле <code translate="no">gen.sh</code> имеют решающее значение для процесса создания файла запроса на подписание сертификата. Первые пять переменных - это основная информация о подписи, включая страну, штат, местоположение, организацию, подразделение организации. При настройке <code translate="no">CommonName</code> необходимо соблюдать осторожность, поскольку эта информация будет проверяться во время взаимодействия клиента и сервера.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">Запустите файл <code translate="no">gen.sh</code> для создания сертификата</h3><p>Запустите файл <code translate="no">gen.sh</code> для создания сертификата.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>Будут созданы следующие семь файлов: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>.</p>
<p>Обязательно сохраните файлы <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, чтобы впоследствии обновить сертификаты. Файлы <code translate="no">server.key</code> и <code translate="no">server.pem</code> используются сервером, а файлы <code translate="no">client.key</code> и <code translate="no">client.pem</code> - клиентом.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">Обновление сертификатов (необязательно)</h3><p>Если вы хотите обновить сертификаты в некоторых случаях, например, если срок их действия скоро истечет, вы можете использовать следующий скрипт.</p>
<p>В рабочем каталоге должны находиться файлы <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>.</p>
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
<p>Запустите файл <code translate="no">renew.sh</code> для создания сертификата.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">Настройка сервера Milvus с TLS<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе описаны шаги по настройке сервера Milvus с шифрованием TLS.</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">Настройка для Docker Compose</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Измените конфигурацию сервера Milvus</h4><p>Чтобы включить внешний TLS, добавьте следующие конфигурации в файл <code translate="no">milvus.yaml</code>:</p>
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
<p>Параметры:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Путь к файлу сертификата сервера.</li>
<li><code translate="no">serverKeyPath</code>: : Путь к файлу ключа сервера.</li>
<li><code translate="no">caPemPath</code>: Путь к файлу сертификата центра сертификации.</li>
<li><code translate="no">tlsMode</code>: Режим TLS для внешнего сервиса. Допустимые значения:<ul>
<li><code translate="no">1</code>: Односторонняя аутентификация, при которой только сервер требует сертификат, а клиент его проверяет. Для этого режима требуются <code translate="no">server.pem</code> и <code translate="no">server.key</code> со стороны сервера и <code translate="no">server.pem</code> со стороны клиента.</li>
<li><code translate="no">2</code>: Двусторонняя аутентификация, когда и серверу, и клиенту требуются сертификаты для установления безопасного соединения. Для этого режима требуются <code translate="no">server.pem</code>, <code translate="no">server.key</code> и <code translate="no">ca.pem</code> со стороны сервера и <code translate="no">client.pem</code>, <code translate="no">client.key</code> и <code translate="no">ca.pem</code> со стороны клиента.</li>
</ul></li>
</ul>
<p>Чтобы включить внутренний TLS, добавьте следующие конфигурации в файл <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls</span>:
  <span class="hljs-attr">serverPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">pem</span>
  <span class="hljs-attr">serverKeyPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">key</span>
  <span class="hljs-attr">caPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/ca.<span class="hljs-property">pem</span>

<span class="hljs-attr">common</span>:
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">internaltlsEnabled</span>: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Параметры:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Путь к файлу сертификата сервера.</li>
<li><code translate="no">serverKeyPath</code>: : Путь к файлу ключа сервера.</li>
<li><code translate="no">caPemPath</code>: Путь к файлу сертификата центра сертификации.</li>
<li><code translate="no">internaltlsEnabled</code>: Включать ли внутренний TLS. На данный момент поддерживается только односторонний tls.</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. Соотнесите файлы сертификатов с контейнером</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">Подготовьте файлы сертификатов</h5><p>Создайте новую папку с именем <code translate="no">tls</code> в том же каталоге, что и <code translate="no">docker-compose.yaml</code>. Скопируйте файлы <code translate="no">server.pem</code>, <code translate="no">server.key</code> и <code translate="no">ca.pem</code> в папку <code translate="no">tls</code>. Поместите их в структуру каталогов следующим образом:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
<button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Обновление конфигурации Docker Compose</h4><p>Отредактируйте файл <code translate="no">docker-compose.yaml</code>, чтобы указать пути к файлам сертификатов внутри контейнера, как показано ниже:</p>
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
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Развертывание Milvus с помощью Docker Compose</h5><p>Выполните следующую команду для развертывания Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">Setup for Milvus Operator</h3><p>Поместите файлы сертификатов в рабочий каталог. Структура каталога должна выглядеть следующим образом:</p>
<pre><code translate="no">├── milvus.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Создайте секрет с файлами сертификатов:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внешний TLS, добавьте следующие конфигурации в файл <code translate="no">milvus.yaml</code>:</p>
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
<p>Чтобы включить внутренний TLS, добавьте следующие конфигурации в файл <code translate="no">milvus.yaml</code>:</p>
<p>Не забудьте заменить поле <code translate="no">internaltls.sni</code> на CommonName в ваших сертификатах.</p>
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
<p>создайте Milvus CR:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">настройка для Milvus Helm</h3><p>Поместите файлы сертификатов в рабочий каталог. Структура каталога должна выглядеть следующим образом:</p>
<pre><code translate="no">├── values.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Создайте секрет с файлами сертификатов:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внешний TLS, добавьте следующие конфигурации в файл <code translate="no">values.yaml</code>:</p>
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
<p>Чтобы включить внутренний TLS, добавьте следующие конфигурации в файл <code translate="no">values.yaml</code>:</p>
<p>Не забудьте заменить поле <code translate="no">internaltls.sni</code> на CommonName в ваших сертификатах.</p>
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
<p>Создайте выпуск milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">Проверка включения внутреннего TLS<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Проверить внутренний TLS напрямую довольно сложно. Вы можете проверить журнал Milvus, чтобы узнать, включен ли внутренний TLS.</p>
<p>В журнале Milvus вы должны увидеть следующее сообщение, если внутренний TLS включен:</p>
<pre><code translate="no">[...<span class="hljs-built_in">date</span> time...] [INFO] [utils/util.go:56] [<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>] [value=<span class="hljs-literal">true</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">Connect to the Milvus server with TLS<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Для взаимодействия с SDK используйте следующие настройки в зависимости от режима TLS.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Одностороннее TLS-соединение</h3><p>Укажите путь к <code translate="no">server.pem</code> и убедитесь, что <code translate="no">server_name</code> совпадает с <code translate="no">CommonName</code>, указанным в сертификате.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Двустороннее TLS-соединение</h3><p>Укажите пути к <code translate="no">client.pem</code>, <code translate="no">client.key</code> и <code translate="no">ca.pem</code> и убедитесь, что <code translate="no">server_name</code> соответствует <code translate="no">CommonName</code>, указанному в сертификате.</p>
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
<p>Дополнительные сведения см. в файлах <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">example_tls1.py</a> и <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py">example_tls2.py</a>.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">Подключение к RESTful-серверу Milvus с помощью TLS<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Для RESTful API можно проверить TLS с помощью команды <code translate="no">curl</code>.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Одностороннее TLS-соединение</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Двустороннее TLS-соединение</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
