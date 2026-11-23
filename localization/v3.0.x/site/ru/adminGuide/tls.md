---
id: tls.md
title: Шифрование при передаче данных
summary: 'Узнайте, как включить TLS-прокси в Milvus.'
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">Шифрование при передаче данных<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS (Transport Layer Security) — это протокол шифрования, обеспечивающий безопасность связи. Прокси-сервер Milvus использует одностороннюю и двустороннюю аутентификацию TLS.</p>
<p>В данном разделе описано, как включить TLS в прокси Milvus как для трафика gRPC, так и для RESTful.</p>
<div class="alert note">
<p>TLS и аутентификация пользователей — это два разных подхода к обеспечению безопасности. Если в системе Milvus включены как аутентификация пользователей, так и TLS, необходимо указать имя пользователя, пароль и пути к файлам сертификатов. Информацию о том, как включить аутентификацию пользователей, см. в разделе <a href="/docs/ru/authenticate.md">«Аутентификация доступа пользователей</a>».</p>
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь, что OpenSSL установлен. Если вы его ещё не установили, сначала <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">скомпилируйте и установите</a> OpenSSL.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>Если OpenSSL не установлен, его можно установить в Ubuntu с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell">sudo apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">Создание файлов<button data-href="#Create-files" class="anchor-icon" translate="no">
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
<li>Создайте файл « <code translate="no">gen.sh</code> ».</li>
</ol>
<pre><code translate="no" class="language-shell">mkdir cert &amp;&amp; cd cert
touch gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Скопируйте следующий скрипт в файл ` <code translate="no">gen.sh</code>`.</li>
</ol>
<p>Необходимо настроить файл ` <code translate="no">CommonName</code> ` в файле ` <code translate="no">gen.sh</code> `. Параметр ` <code translate="no">CommonName</code> ` указывает имя сервера, которое клиент должен указать при подключении.</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out ca.key
openssl genpkey -quiet -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out server.key
openssl genpkey -quiet -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">create a new ca certificate</span>
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[v3_client]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_client

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Переменные в файле <code translate="no">gen.sh</code> играют ключевую роль в процессе создания файла запроса на подписание сертификата. Первые пять переменных содержат основную информацию для подписания, включая страну, штат, населённый пункт, организацию и подразделение организации. При настройке файла <code translate="no">CommonName</code> следует проявлять осторожность, так как эти данные будут проверяться во время взаимодействия между клиентом и сервером.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">Запустите файл <code translate="no">gen.sh</code> для генерации сертификата<button data-href="#Run-gensh-to-generate-certificate" class="anchor-icon" translate="no">
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
    </button></h3><p>Запустите файл <code translate="no">gen.sh</code> для создания сертификата.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>Будут созданы следующие семь файлов: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>.</p>
<p>Обязательно сохраните файлы <code translate="no">ca.key</code>, <code translate="no">ca.pem</code> и <code translate="no">ca.srl</code> в надежном месте, чтобы впоследствии можно было продлить сертификаты. Файлы <code translate="no">server.key</code> и <code translate="no">server.pem</code> используются сервером, а файлы <code translate="no">client.key</code> и <code translate="no">client.pem</code> — клиентом.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">Продление сертификатов (необязательно)<button data-href="#Renew-certificates-optional" class="anchor-icon" translate="no">
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
    </button></h3><p>Если в некоторых случаях вам необходимо обновить сертификаты, например, если срок их действия скоро истекает, вы можете воспользоваться следующим скриптом.</p>
<p>В рабочем каталоге должны находиться файлы <code translate="no">ca.key</code>, <code translate="no">ca.pem</code> и <code translate="no">ca.srl</code>.</p>
<p><details><summary><code translate="no">renew.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out server.key
openssl genpkey -quiet -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[v3_client]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_client
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Запустите файл <code translate="no">renew.sh</code>, чтобы создать сертификат.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">Настройка сервера Milvus с использованием TLS<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">Настройка для Docker Compose<button data-href="#Setup-for-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Измените конфигурацию сервера Milvus</h4><p>Чтобы включить внешний TLS, добавьте следующие настройки в файл ` <code translate="no">milvus.yaml</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">http:</span>
    <span class="hljs-comment"># for now milvus do not support config restful on same port with grpc</span>
    <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
<span class="hljs-attr">tls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Параметры:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Путь к файлу сертификата сервера.</li>
<li><code translate="no">serverKeyPath</code>: Путь к файлу ключа сервера.</li>
<li><code translate="no">caPemPath</code>: Путь к файлу сертификата центра сертификации (CA).</li>
<li><code translate="no">tlsMode</code>: Режим TLS для внешнего сервиса. Допустимые значения:
<ul>
<li><code translate="no">1</code>: Односторонняя аутентификация, при которой сертификат требуется только от сервера, а клиент его проверяет. Для этого режима требуется использование протоколов <code translate="no">server.pem</code> и <code translate="no">server.key</code> со стороны сервера, а также <code translate="no">server.pem</code> со стороны клиента.</li>
<li><code translate="no">2</code>: Двусторонняя аутентификация, при которой и серверу, и клиенту требуются сертификаты для установления безопасного соединения. Для этого режима со стороны сервера требуются файлы <code translate="no">server.pem</code>, <code translate="no">server.key</code> и <code translate="no">ca.pem</code>, а со стороны клиента — <code translate="no">client.pem</code>, <code translate="no">client.key</code> и <code translate="no">ca.pem</code>.</li>
</ul></li>
</ul>
<p>Чтобы включить внутренний TLS, добавьте следующие настройки в файл ` <code translate="no">milvus.yaml</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Параметры:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Путь к файлу сертификата сервера.</li>
<li><code translate="no">serverKeyPath</code>: Путь к файлу ключа сервера.</li>
<li><code translate="no">caPemPath</code>: Путь к файлу сертификата центра сертификации (CA).</li>
<li><code translate="no">internaltlsEnabled</code>: Указание необходимости включения внутреннего TLS. На данный момент поддерживается только односторонний TLS.</li>
</ul>
<div class="alert note">
<blockquote>
<p>По умолчанию пути <code translate="no">tls</code> и <code translate="no">internaltls</code> в файле <code translate="no">milvus.yaml</code> указывают на примеры файлов сертификатов и ключей, расположенных в папке <code translate="no">configs/cert</code>. Эти файлы, включая их закрытые ключи, опубликованы в репозитории исходного кода Milvus. Не используйте их при развертывании. Укажите в файлах <code translate="no">serverPemPath</code>, <code translate="no">serverKeyPath</code> и <code translate="no">caPemPath</code> пути к файлам, которые вы сгенерировали самостоятельно.</p>
</blockquote>
</div>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. Привяжите файлы сертификатов к контейнеру</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">Подготовьте файлы сертификатов</h5><p>Создайте новую папку с именем « <code translate="no">tls</code> » в том же каталоге, что и ваш файл « <code translate="no">docker-compose.yaml</code> ». Скопируйте файлы « <code translate="no">server.pem</code> », « <code translate="no">server.key</code> » и « <code translate="no">ca.pem</code> » в папку « <code translate="no">tls</code> ». Расположите их в следующей иерархии каталогов:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
<span class="hljs-code">     ├── server.pem
     ├── server.key
     └── ca.pem
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Обновите конфигурацию Docker Compose</h4><p>Отредактируйте файл <code translate="no">docker-compose.yaml</code>, чтобы указать пути к файлам сертификатов внутри контейнера, как показано ниже:</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:latest</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    <span class="hljs-attr">security_opt:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">seccomp:unconfined</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/tls:/milvus/tls</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Разверните Milvus с помощью Docker Compose</h5><p>Выполните следующую команду для развертывания Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">Настройка Milvus Operator<button data-href="#Setup-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>Поместите файлы сертификатов в рабочий каталог. Структура каталогов должна выглядеть следующим образом:</p>
<pre><code translate="no">├── milvus.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Создайте секрет с файлами сертификатов:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внешний TLS, добавьте следующие настройки в файл ` <code translate="no">milvus.yaml</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable</span>
    <span class="hljs-attr">tls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внутренний TLS, добавьте следующие настройки в файл ` <code translate="no">milvus.yaml</code> `:</p>
<p>Не забудьте заменить поле « <code translate="no">internaltls.sni</code> » на значение CommonName из ваших сертификатов.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    <span class="hljs-attr">internaltls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
      <span class="hljs-attr">sni:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># the CommonName in your certificates</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте CR Milvus:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">Настройка Milvus Helm<button data-href="#setup-for-Milvus-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>Поместите файлы сертификатов в рабочий каталог. Структура каталогов должна выглядеть следующим образом:</p>
<pre><code translate="no">├── values.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Создайте секрет с файлами сертификатов:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внешний TLS, добавьте следующие настройки в файл <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        tlsMode: 1 # tlsMode for external service 1 means set to 2 to enable Mutual TLS
    # Configure tls certificates path for external service
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы включить внутренний TLS, добавьте следующие настройки в файл ` <code translate="no">values.yaml</code> `:</p>
<p>Не забудьте заменить поле <code translate="no">internaltls.sni</code> на значение CommonName из ваших сертификатов.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        internaltlsEnabled: true # whether to enable internal tls
    # Configure tls certificates path for internal service
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте релиз Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update zilliztech
helm install my-release zilliztech/milvus --version 5.0.22 -f values.yaml
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
    </button></h2><p>Прямо проверить включение внутреннего TLS сложно. Вы можете проверить журнал Milvus, чтобы убедиться, что внутренний TLS включен.</p>
<p>В журнале Milvus должно отображаться следующее сообщение, если внутренний TLS включен:</p>
<pre><code translate="no"><span class="hljs-selector-attr">[...date time...]</span> <span class="hljs-selector-attr">[INFO]</span> <span class="hljs-selector-attr">[utils/util.go:56]</span> <span class="hljs-selector-attr">[<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>]</span> <span class="hljs-selector-attr">[value=true]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">Подключение к серверу Milvus с использованием TLS<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
<h3 id="One-way-TLS-connection" class="common-anchor-header">Одностороннее TLS-соединение<button data-href="#One-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><p>Укажите путь к <code translate="no">server.pem</code> и убедитесь, что <code translate="no">server_name</code> совпадает с <code translate="no">CommonName</code>, указанным в сертификате.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Двустороннее соединение TLS<button data-href="#Two-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><p>Укажите пути к <code translate="no">client.pem</code>, <code translate="no">client.key</code> и <code translate="no">ca.pem</code> и убедитесь, что <code translate="no">server_name</code> совпадает с <code translate="no">CommonName</code>, указанным в сертификате.</p>
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
<p>Дополнительную информацию см. в файлах <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls1.py">example_tls1.py</a> и <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls2.py">example_tls2.py</a>.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">Подключение к RESTful-серверу Milvus с использованием TLS<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Для RESTful API вы можете проверить TLS с помощью команды <code translate="no">curl</code>.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Одностороннее соединение TLS<button data-href="#One-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Двустороннее соединение TLS<button data-href="#Two-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem \
  --key path_to/client.key \
  --cacert path_to/ca.pem \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
