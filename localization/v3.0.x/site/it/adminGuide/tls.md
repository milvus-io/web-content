---
id: tls.md
title: Crittografia in transito
summary: Scopri come abilitare il proxy TLS in Milvus.
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">Crittografia in transito<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS (Transport Layer Security) è un protocollo di crittografia che garantisce la sicurezza delle comunicazioni. Il proxy Milvus utilizza l'autenticazione TLS unidirezionale e bidirezionale.</p>
<p>In questa sezione viene descritto come abilitare il TLS nel proxy Milvus sia per il traffico gRPC che per quello RESTful.</p>
<div class="alert note">
<p>TLS e l’autenticazione utente sono due approcci di sicurezza distinti. Se nel sistema Milvus sono stati abilitati sia l’autenticazione utente che il TLS, sarà necessario fornire un nome utente, una password e i percorsi dei file dei certificati. Per informazioni su come abilitare l’autenticazione utente, consultare la sezione <a href="/docs/it/authenticate.md">Autenticazione dell’accesso utente</a>.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">Creare un certificato personalizzato<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>Assicurarsi che OpenSSL sia installato. Se non è installato, <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">compilare e installare</a> prima OpenSSL.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>Se OpenSSL non è installato, è possibile installarlo con il seguente comando in Ubuntu.</p>
<pre><code translate="no" class="language-shell">sudo apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">Creare i file<button data-href="#Create-files" class="anchor-icon" translate="no">
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
<li>Crea il file <code translate="no">gen.sh</code>.</li>
</ol>
<pre><code translate="no" class="language-shell">mkdir cert &amp;&amp; cd cert
touch gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Copiare il seguente script nel file ` <code translate="no">gen.sh</code>`.</li>
</ol>
<p>È necessario configurare l'<code translate="no">CommonName</code> nel file <code translate="no">gen.sh</code>. L'<code translate="no">CommonName</code> si riferisce al nome del server che il client deve specificare durante la connessione.</p>
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
<p>Le variabili nel file <code translate="no">gen.sh</code> sono fondamentali per il processo di creazione di un file di richiesta di firma del certificato. Le prime cinque variabili rappresentano le informazioni di firma di base, tra cui paese, stato, località, organizzazione e unità organizzativa. È necessario prestare attenzione durante la configurazione di <code translate="no">CommonName</code> poiché verrà verificato durante la comunicazione client-server.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">Eseguire <code translate="no">gen.sh</code> per generare il certificato<button data-href="#Run-gensh-to-generate-certificate" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguire il file <code translate="no">gen.sh</code> per creare il certificato.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>Verranno creati i seguenti sette file: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>.</p>
<p>Assicurarsi di conservare in un luogo sicuro i file <code translate="no">ca.key</code>, <code translate="no">ca.pem</code> e <code translate="no">ca.srl</code> per poter rinnovare i certificati in un secondo momento. I file <code translate="no">server.key</code> e <code translate="no">server.pem</code> vengono utilizzati dal server, mentre i file <code translate="no">client.key</code> e <code translate="no">client.pem</code> vengono utilizzati dal client.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">Rinnovo dei certificati (facoltativo)<button data-href="#Renew-certificates-optional" class="anchor-icon" translate="no">
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
    </button></h3><p>Se in alcuni casi si desidera rinnovare i certificati, ad esempio se stanno per scadere, è possibile utilizzare il seguente script.</p>
<p>È necessario che nella directory di lavoro siano presenti i file <code translate="no">ca.key</code>, <code translate="no">ca.pem</code> e <code translate="no">ca.srl</code>.</p>
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
<p>Eseguire il file <code translate="no">renew.sh</code> per creare il certificato.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">Configurazione di un server Milvus con TLS<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione illustra i passaggi per configurare un server Milvus con crittografia TLS.</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">Configurazione per Docker Compose<button data-href="#Setup-for-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Modifica la configurazione del server Milvus</h4><p>Per abilitare il TLS esterno, aggiungere le seguenti configurazioni nel file ` <code translate="no">milvus.yaml</code> `:</p>
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
<p>Parametri:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Il percorso del file del certificato del server.</li>
<li><code translate="no">serverKeyPath</code>: Il percorso del file della chiave del server.</li>
<li><code translate="no">caPemPath</code>: Il percorso del file del certificato CA.</li>
<li><code translate="no">tlsMode</code>: La modalità TLS per il servizio esterno. Valori validi:
<ul>
<li><code translate="no">1</code>: Autenticazione unidirezionale, in cui solo il server richiede un certificato e il client lo verifica. Questa modalità richiede <code translate="no">server.pem</code> e <code translate="no">server.key</code> dal lato server, e <code translate="no">server.pem</code> dal lato client.</li>
<li><code translate="no">2</code>: Autenticazione bidirezionale, in cui sia il server che il client richiedono certificati per stabilire una connessione sicura. Questa modalità richiede <code translate="no">server.pem</code>, <code translate="no">server.key</code> e <code translate="no">ca.pem</code> dal lato server, e <code translate="no">client.pem</code>, <code translate="no">client.key</code> e <code translate="no">ca.pem</code> dal lato client.</li>
</ul></li>
</ul>
<p>Per abilitare il TLS interno, aggiungere le seguenti configurazioni nel file ` <code translate="no">milvus.yaml</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Parametri:</p>
<ul>
<li><code translate="no">serverPemPath</code>: Il percorso del file del certificato del server.</li>
<li><code translate="no">serverKeyPath</code>: Il percorso del file della chiave del server.</li>
<li><code translate="no">caPemPath</code>: Il percorso del file del certificato CA.</li>
<li><code translate="no">internaltlsEnabled</code>: Se abilitare il TLS interno. Per ora è supportato solo il TLS unidirezionale.</li>
</ul>
<div class="alert note">
<blockquote>
<p>Per impostazione predefinita, i percorsi <code translate="no">tls</code> e <code translate="no">internaltls</code> in <code translate="no">milvus.yaml</code> puntano ai file di certificato e chiave di esempio presenti in <code translate="no">configs/cert</code>. Questi file, comprese le relative chiavi private, sono pubblicati nel repository del codice sorgente di Milvus. Non utilizzarli nella tua distribuzione. Imposta <code translate="no">serverPemPath</code>, <code translate="no">serverKeyPath</code> e <code translate="no">caPemPath</code> sui file che hai generato.</p>
</blockquote>
</div>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. Associare i file dei certificati al container</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">Preparare i file dei certificati</h5><p>Creare una nuova cartella denominata <code translate="no">tls</code> nella stessa directory di <code translate="no">docker-compose.yaml</code>. Copiare i file <code translate="no">server.pem</code>, <code translate="no">server.key</code> e <code translate="no">ca.pem</code> nella cartella <code translate="no">tls</code>. Disporli nella seguente struttura di directory:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
<span class="hljs-code">     ├── server.pem
     ├── server.key
     └── ca.pem
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Aggiornamento della configurazione di Docker Compose</h4><p>Modifica il file <code translate="no">docker-compose.yaml</code> per mappare i percorsi dei file dei certificati all'interno del container come mostrato di seguito:</p>
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
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Distribuisci Milvus utilizzando Docker Compose</h5><p>Eseguire il seguente comando per distribuire Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">Configurazione di Milvus Operator<button data-href="#Setup-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>Inserire i file dei certificati nella directory di lavoro. La struttura della directory dovrebbe essere la seguente:</p>
<pre><code translate="no">├── milvus.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Creare un segreto con i file dei certificati:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Per abilitare il TLS esterno, aggiungere le seguenti configurazioni nel file <code translate="no">milvus.yaml</code>:</p>
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
<p>Per abilitare il TLS interno, aggiungere le seguenti configurazioni nel file ` <code translate="no">milvus.yaml</code> `:</p>
<p>Ricordarsi di sostituire il campo <code translate="no">internaltls.sni</code> con il CommonName presente nei propri certificati.</p>
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
<p>Creare il CR di Milvus:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">Configurazione di Milvus Helm<button data-href="#setup-for-Milvus-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>Inserisci i file dei certificati nella tua directory di lavoro. La struttura della directory dovrebbe essere la seguente:</p>
<pre><code translate="no">├── values.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Crea un segreto con i file dei certificati:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>Per abilitare il TLS esterno, aggiungi le seguenti configurazioni nel file <code translate="no">values.yaml</code>:</p>
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
<p>Per abilitare il TLS interno, aggiungere le seguenti configurazioni nel file ` <code translate="no">values.yaml</code> `:</p>
<p>Ricordarsi di sostituire il campo <code translate="no">internaltls.sni</code> con il CommonName presente nei propri certificati.</p>
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
<p>Crea la release di Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update zilliztech
helm install my-release zilliztech/milvus --version 5.0.22 -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">Verifica che il TLS interno sia abilitato<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>È difficile verificare direttamente il TLS interno. È possibile controllare il log di Milvus per verificare se il TLS interno è abilitato.</p>
<p>Nel log di Milvus, se il TLS interno è abilitato, dovrebbe comparire il seguente messaggio:</p>
<pre><code translate="no"><span class="hljs-selector-attr">[...date time...]</span> <span class="hljs-selector-attr">[INFO]</span> <span class="hljs-selector-attr">[utils/util.go:56]</span> <span class="hljs-selector-attr">[<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>]</span> <span class="hljs-selector-attr">[value=true]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">Connettiti al server Milvus con TLS<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Per le interazioni con l'SDK, utilizzare le seguenti configurazioni a seconda della modalità TLS.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Connessione TLS unidirezionale<button data-href="#One-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><p>Specificare il percorso <code translate="no">server.pem</code> e assicurarsi che l'<code translate="no">server_name</code> corrisponda all'<code translate="no">CommonName</code> configurato nel certificato.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Connessione TLS bidirezionale<button data-href="#Two-way-TLS-connection" class="anchor-icon" translate="no">
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
    </button></h3><p>Fornire i percorsi di <code translate="no">client.pem</code>, <code translate="no">client.key</code> e <code translate="no">ca.pem</code> e assicurarsi che <code translate="no">server_name</code> corrisponda a <code translate="no">CommonName</code>, come configurato nel certificato.</p>
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
<p>Per ulteriori informazioni, consultare <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls1.py">example_tls1.py</a> e <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls2.py">example_tls2.py</a>.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">Connettersi al server RESTful di Milvus con TLS<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>Per le API RESTful, è possibile verificare il TLS utilizzando il comando <code translate="no">curl</code>.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">Connessione TLS unidirezionale<button data-href="#One-way-TLS-connection" class="anchor-icon" translate="no">
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
<h3 id="Two-way-TLS-connection" class="common-anchor-header">Connessione TLS bidirezionale<button data-href="#Two-way-TLS-connection" class="anchor-icon" translate="no">
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
