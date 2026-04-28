---
id: integrate_with_snowpark.md
summary: >-
  Questa guida mostra come avviare una demo di Milvus sui servizi container di
  Snowpark.
title: Milvus su servizi container Snowpark
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Milvus su servizi container Snowpark<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida illustra come avviare una demo di Milvus sui servizi container di Snowpark.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">Informazioni su Snowpark Container Services<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Services è un'offerta di container completamente gestita, progettata per facilitare la distribuzione, la gestione e la scalabilità di applicazioni containerizzate all'interno dell'ecosistema Snowflake. Questo servizio consente agli utenti di eseguire carichi di lavoro containerizzati direttamente all'interno di Snowflake, garantendo che i dati non debbano essere spostati fuori dall'ambiente Snowflake per l'elaborazione. Per ulteriori informazioni, consultare l'introduzione ufficiale: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Services</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Configurazione della demo Milvus<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Di seguito, gli utenti potranno comprendere le funzionalità di Milvus e come utilizzare Milvus in SPCS attraverso la configurazione e il codice.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. Ottenere le informazioni sull'account</h3><p>Scaricare il client SPCS: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>, quindi accedere al proprio account.</p>
<pre><code translate="no" class="language-shell">snowsql -a ${instance_name} -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>La regola di <code translate="no">${instance_name}</code> è <code translate="no">${org_name}-${acct_name}</code>. Le informazioni pertinenti possono essere ottenute accedendo a <a href="http://app.snowflake.com/sn">app.snowflake.com</a> e controllando le informazioni sull'account personale.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>Informazioni sull'account Snowflake</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. Configurare ruolo e privilegi</h3><p>Configurare l'integrazione OAUTH.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">CREATE</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH
  TYPE<span class="hljs-operator">=</span>oauth
  OAUTH_CLIENT<span class="hljs-operator">=</span>snowservices_ingress
  ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">true</span>;
  
USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">GRANT</span> BIND SERVICE ENDPOINT <span class="hljs-keyword">ON</span> ACCOUNT <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre>
<p>Creare un ruolo per il servizio, tenendo presente che la parte <code translate="no">${PASSWORD}</code> deve essere sostituita dall'utente quando la demo viene eseguita.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">CREATE</span> ROLE MILVUS_ROLE;

USE ROLE USERADMIN;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">USER</span> milvus_user
  PASSWORD<span class="hljs-operator">=</span><span class="hljs-string">&#x27;milvususerok&#x27;</span>
  DEFAULT_ROLE <span class="hljs-operator">=</span> MILVUS_ROLE
  DEFAULT_SECONDARY_ROLES <span class="hljs-operator">=</span> (<span class="hljs-string">&#x27;ALL&#x27;</span>)
  MUST_CHANGE_PASSWORD <span class="hljs-operator">=</span> <span class="hljs-literal">FALSE</span>;
  
USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> ROLE MILVUS_ROLE <span class="hljs-keyword">TO</span> <span class="hljs-keyword">USER</span> milvus_user;
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. Creare la configurazione dell'archiviazione dei dati</h3><ul>
<li><p>Creare il magazzino e il database</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">WITH</span>
WAREHOUSE_SIZE<span class="hljs-operator">=</span><span class="hljs-string">&#x27;X-SMALL&#x27;</span>
AUTO_SUSPEND <span class="hljs-operator">=</span> <span class="hljs-number">180</span>
AUTO_RESUME <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>
INITIALLY_SUSPENDED<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;

USE ROLE SYSADMIN;
<span class="hljs-keyword">CREATE</span> DATABASE IF <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> MILVUS_DEMO;
USE DATABASE MILVUS_DEMO;
<span class="hljs-keyword">CREATE</span> IMAGE REPOSITORY MILVUS_DEMO.PUBLIC.MILVUS_REPO;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE STAGE YAML_STAGE;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE STAGE DATA ENCRYPTION <span class="hljs-operator">=</span> (TYPE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;SNOWFLAKE_SSE&#x27;</span>);
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE STAGE FILES ENCRYPTION <span class="hljs-operator">=</span> (TYPE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;SNOWFLAKE_SSE&#x27;</span>);
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Assegnare i privilegi del ruolo</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> DATABASE MILVUS_DEMO <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> SCHEMA MILVUS_DEMO.PUBLIC <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> STAGE MILVUS_DEMO.PUBLIC.FILES <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurare le ACL</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
USE DATABASE MILVUS_DEMO;
USE SCHEMA PUBLIC;
<span class="hljs-keyword">CREATE</span> NETWORK RULE allow_all_rule
TYPE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;HOST_PORT&#x27;</span>
MODE<span class="hljs-operator">=</span> <span class="hljs-string">&#x27;EGRESS&#x27;</span>
VALUE_LIST <span class="hljs-operator">=</span> (<span class="hljs-string">&#x27;0.0.0.0:443&#x27;</span>,<span class="hljs-string">&#x27;0.0.0.0:80&#x27;</span>);

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">EXTERNAL</span> ACCESS INTEGRATION allow_all_eai
ALLOWED_NETWORK_RULES<span class="hljs-operator">=</span>(allow_all_rule)
ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">TRUE</span>;

<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> INTEGRATION allow_all_eai <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="4-Create-images" class="common-anchor-header">4. Creare le immagini</h3><p>L'immagine utilizzata da Milvus deve essere costruita localmente e poi caricata dall'utente. Per la configurazione dell'immagine, fare riferimento a <a href="https://github.com/dald001/milvus_on_spcs">questo repo</a>. Dopo aver clonato il codice, andare nella directory principale del progetto e prepararsi a costruire l'immagine.</p>
<ul>
<li><p>Costruire le immagini localmente</p>
<p>Aprire la shell locale e iniziare a costruire le immagini.</p>
<pre><code translate="no" class="language-shell">cd ${repo_git_root_path}
docker build --rm --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --rm --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Ci sono due immagini: la prima gestisce il database di Milvus e la seconda è il notebook utilizzato per la visualizzazione.</p>
<p>Una volta costruite le immagini locali, preparatevi a taggarle e a caricarle.</p></li>
<li><p>Taggare le immagini costruite</p>
<p>Accedere all'hub docker di SPCS.</p>
<pre><code translate="no" class="language-shell">docker login ${instance_name}.registry.snowflakecomputing.com -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>È possibile taggare le immagini per SPCS.</p>
<pre><code translate="no" class="language-shell">docker tag milvus ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Quindi utilizzare <code translate="no">docker images | grep milvus</code> nella shell locale per verificare se l'immagine è stata impacchettata e taggata con successo.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus
<span class="hljs-meta prompt_">
$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB</span>
<span class="hljs-meta prompt_">$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Spingere le immagini su SPCS</p>
<pre><code translate="no" class="language-shell">docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. Creare e avviare i servizi</h3><p>Torniamo alla shell di SnowSQL.</p>
<ul>
<li>Creare i pool di calcolo</li>
</ul>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">CREATE</span> COMPUTE POOL IF <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> MILVUS_COMPUTE_POOL
  MIN_NODES <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  MAX_NODES <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  INSTANCE_FAMILY <span class="hljs-operator">=</span> CPU_X64_S
  AUTO_RESUME <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
<span class="hljs-keyword">CREATE</span> COMPUTE POOL IF <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> JUPYTER_COMPUTE_POOL
  MIN_NODES <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  MAX_NODES <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  INSTANCE_FAMILY <span class="hljs-operator">=</span> CPU_X64_S
  AUTO_RESUME <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Controllate i pool di calcolo attraverso <code translate="no">DESCRIBE</code> fino a quando lo stato è <code translate="no">ACTIVE</code> o <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>Stato del pool di calcolo</span> </span></p>
<ul>
<li>Caricare i file delle specifiche</li>
</ul>
<p>Dopo aver creato il pool di calcolo, iniziare a preparare il file spce per il servizio. I file si trovano anche in <a href="https://github.com/dald001/milvus_on_spcs">questo repo</a>. Fare riferimento alla cartella specs.</p>
<p>Aprire i file spec di questi due servizi, trovare <code translate="no">${org_name}-${acct_name}</code> nel file spec e sostituirlo con ${nome_instanza} del proprio account. Dopo la modifica, usare SnowSQL per completare il caricamento.</p>
<pre><code translate="no" class="language-sql">PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>jupyter.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>milvus.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Creare il servizio</li>
</ul>
<p>Una volta completato il caricamento, si è pronti a creare il servizio: continuare per completare il processo di creazione del servizio.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
USE DATABASE MILVUS_DEMO;
USE SCHEMA PUBLIC;

<span class="hljs-keyword">CREATE</span> SERVICE MILVUS
  <span class="hljs-keyword">IN</span> COMPUTE POOL MILVUS_COMPUTE_POOL 
  <span class="hljs-keyword">FROM</span> <span class="hljs-variable">@YAML_STAGE</span>
  SPEC<span class="hljs-operator">=</span><span class="hljs-string">&#x27;milvus.yaml&#x27;</span>
  MIN_INSTANCES<span class="hljs-operator">=</span><span class="hljs-number">1</span>
  MAX_INSTANCES<span class="hljs-operator">=</span><span class="hljs-number">1</span>;

<span class="hljs-keyword">CREATE</span> SERVICE JUPYTER
  <span class="hljs-keyword">IN</span> COMPUTE POOL JUPYTER_COMPUTE_POOL 
  <span class="hljs-keyword">FROM</span> <span class="hljs-variable">@YAML_STAGE</span>
  SPEC<span class="hljs-operator">=</span><span class="hljs-string">&#x27;jupyter.yaml&#x27;</span>
  MIN_INSTANCES<span class="hljs-operator">=</span><span class="hljs-number">1</span>
  MAX_INSTANCES<span class="hljs-operator">=</span><span class="hljs-number">1</span>;
<button class="copy-code-btn"></button></code></pre>
<p>I servizi possono essere visualizzati anche attraverso <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SHOW</span> SERVICES;

<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> name    <span class="hljs-operator">|</span> database_name <span class="hljs-operator">|</span> schema_name <span class="hljs-operator">|</span> owner    <span class="hljs-operator">|</span> compute_pool         <span class="hljs-operator">|</span> dns_name                                               <span class="hljs-operator">|</span> ......
<span class="hljs-operator">|</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> JUPYTER <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> JUPYTER_COMPUTE_POOL <span class="hljs-operator">|</span> jupyter.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal <span class="hljs-operator">|</span> ...... 
<span class="hljs-operator">|</span> MILVUS  <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> MILVUS_COMPUTE_POOL  <span class="hljs-operator">|</span> milvus.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal  <span class="hljs-operator">|</span> ......
<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<button class="copy-code-btn"></button></code></pre>
<p>Se si riscontrano problemi nell'avvio del servizio, è possibile visualizzare le informazioni sul servizio tramite <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>Stato del servizio</span> </span></p>
<p>Ulteriori informazioni possono essere ottenute tramite <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">Utilizzare il blocco note<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare <strong>SnowSQL</strong> per concedere le autorizzazioni.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER <span class="hljs-keyword">TO</span> ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>Quindi visualizzare e registrare l'endpoint del Jupyter nootbook.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">SHOW</span> ENDPOINTS <span class="hljs-keyword">IN</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>Registrare la parte <code translate="no">ingress_url</code> delle informazioni, quindi aprire il browser e inserire <code translate="no">ingress_url</code>, utilizzare l'account milvus_user per accedere al sito web.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>Ottenere l'URL di ingresso</span> </span></p>
<p>Aprire il blocco note attraverso <code translate="no">ingress_url</code>, fare doppio clic sul file <code translate="no">TestMilvus.ipynb</code> nella pagina per provare Milvus. Selezionate la prima parte del blocco di codice e fate clic sul pulsante <strong>Esegui</strong> per iniziare a stabilire la connessione e inizializzare la funzione di incorporamento.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>Esecuzione di TestMilvus.ipynb nel blocco note</span> </span></p>
<p>Dopo aver stabilito la connessione, continuare a fare clic su <strong>ESEGUI</strong>. Il codice trasformerà un testo in dati vettoriali dopo l'elaborazione di embedding e lo inserirà in Milvus.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzare quindi un testo come query: "Chi ha iniziato la ricerca sull'IA?", esegue la query dopo l'elaborazione dell'incorporazione e infine ottiene e visualizza i risultati più rilevanti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>Ottenere e visualizzare i risultati più rilevanti</span> </span></p>
<p>Per ulteriori informazioni sull'uso del client Milvus, è possibile consultare la sezione <a href="/docs/it/quickstart.md">Milvus Doc</a>.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. Pulire<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo la verifica, è possibile utilizzare SnowSQL per ripulire i servizi, i ruoli e le risorse di dati.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">DROP</span> <span class="hljs-keyword">USER</span> milvus_user;

USE ROLE SYSADMIN;
<span class="hljs-keyword">DROP</span> SERVICE MILVUS;
<span class="hljs-keyword">DROP</span> SERVICE JUPYTER;

<span class="hljs-keyword">DROP</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DROP</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;

<span class="hljs-keyword">DROP</span> IMAGE REPOSITORY MILVUS_DEMO.PUBLIC.MILVUS_REPO;
<span class="hljs-keyword">DROP</span> DATABASE MILVUS_DEMO;
<span class="hljs-keyword">DROP</span> WAREHOUSE MILVUS_WAREHOUSE;

USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">DROP</span> ROLE MILVUS_ROLE;
<span class="hljs-keyword">DROP</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH;
<button class="copy-code-btn"></button></code></pre>
<h2 id="About-Milvus" class="common-anchor-header">Informazioni su Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Per maggiori informazioni su Milvus, potete iniziare con l'<a href="/docs/it/overview.md">introduzione</a> e l'<a href="/docs/it/quickstart.md">avvio rapido di</a> <a href="/docs/it/overview.md">Milvus</a>. Naturalmente, c'è un'introduzione più dettagliata all'API, si può fare riferimento alle versioni <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> e <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a>, e ci sono anche informazioni su <a href="https://milvus.io/docs/embeddings.md">Embeddings</a> e <a href="https://milvus.io/docs/integrate_with_openai.md">Integrations</a> come riferimento.</p>
