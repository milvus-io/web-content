---
id: integrate_with_snowpark.md
summary: >-
  Diese Anleitung zeigt Ihnen, wie Sie eine Milvus-Demo auf
  Snowpark-Containerdiensten starten.
title: Milvus auf Snowpark-Containerdiensten
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Milvus auf Snowpark-Containerdiensten<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Anleitung zeigt, wie man eine Milvus-Demo auf Snowpark Container Services startet.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">Über Snowpark Containerdienste<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Services ist ein vollständig verwaltetes Container-Angebot, das die Bereitstellung, Verwaltung und Skalierung von containerisierten Anwendungen innerhalb des Snowflake-Ökosystems erleichtert. Dieser Service ermöglicht es Anwendern, containerisierte Workloads direkt in Snowflake auszuführen und sicherzustellen, dass Daten zur Verarbeitung nicht aus der Snowflake-Umgebung herausgenommen werden müssen. Weitere Informationen finden Sie in der offiziellen Einführung: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Dienste</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Konfigurieren der Milvus-Demo<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden werden die Fähigkeiten von Milvus und die Verwendung von Milvus in SPCS anhand von Konfiguration und Code erläutert.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. Beschaffung von Kontoinformationen</h3><p>Laden Sie den SPCS-Client herunter: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>, dann melden Sie sich bei Ihrem Konto an.</p>
<pre><code translate="no" class="language-shell">snowsql -a ${instance_name} -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>Die Regel von <code translate="no">${instance_name}</code> lautet <code translate="no">${org_name}-${acct_name}</code>. Die entsprechenden Informationen erhalten Sie, wenn Sie sich bei <a href="http://app.snowflake.com/sn">app.snowflake.com</a> anmelden und die persönlichen Kontoinformationen überprüfen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>Snowflake-Kontoinformationen</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. Konfigurieren von Rolle und Berechtigungen</h3><p>Konfigurieren Sie die OAUTH-Integration.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">CREATE</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH
  TYPE<span class="hljs-operator">=</span>oauth
  OAUTH_CLIENT<span class="hljs-operator">=</span>snowservices_ingress
  ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">true</span>;
  
USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">GRANT</span> BIND SERVICE ENDPOINT <span class="hljs-keyword">ON</span> ACCOUNT <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine Rolle für den Dienst. Beachten Sie, dass der <code translate="no">${PASSWORD}</code> -Teil hier durch den Benutzer ersetzt werden muss, wenn die Demo läuft.</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. Konfiguration der Datenspeicherung erstellen</h3><ul>
<li><p>Lager und Datenbank erstellen</p>
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
<li><p>Rollenprivilegien erteilen</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> DATABASE MILVUS_DEMO <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> SCHEMA MILVUS_DEMO.PUBLIC <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> STAGE MILVUS_DEMO.PUBLIC.FILES <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ACL konfigurieren</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. Bilder erstellen</h3><p>Das von Milvus verwendete Image muss lokal erstellt und dann vom Benutzer hochgeladen werden. Für die entsprechende Konfiguration des Images verweisen wir auf <a href="https://github.com/dald001/milvus_on_spcs">dieses Repo</a>. Nachdem Sie den Code geklont haben, wechseln Sie in das Stammverzeichnis des Projekts und bereiten die Erstellung des Images vor.</p>
<ul>
<li><p>Images lokal erstellen</p>
<p>Öffnen Sie Ihre lokale Shell und beginnen Sie mit dem Erstellen der Images.</p>
<pre><code translate="no" class="language-shell">cd ${repo_git_root_path}
docker build --rm --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --rm --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Es gibt hier zwei Images, das erste läuft auf der Milvus-Datenbank, das zweite ist das Notebook, das für die Anzeige verwendet wird.</p>
<p>Nachdem die lokalen Abbilder erstellt wurden, bereiten Sie sie zum Markieren und Hochladen vor.</p></li>
<li><p>Erstellte Images taggen</p>
<p>Loggen Sie sich in den Docker-Hub von SPCS ein.</p>
<pre><code translate="no" class="language-shell">docker login ${instance_name}.registry.snowflakecomputing.com -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>Sie können jetzt Bilder für spcs taggen.</p>
<pre><code translate="no" class="language-shell">docker tag milvus ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie dann <code translate="no">docker images | grep milvus</code> in der lokalen Shell, um zu überprüfen, ob das Image erfolgreich verpackt und getaggt wurde.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus
<span class="hljs-meta prompt_">
$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB</span>
<span class="hljs-meta prompt_">$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bilder an SPCS übertragen</p>
<pre><code translate="no" class="language-shell">docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. Dienste erstellen und starten</h3><p>Kehren wir zurück in die SnowSQL-Shell.</p>
<ul>
<li>Compute-Pools erstellen</li>
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
<p>Überprüfen Sie die Compute-Pools über <code translate="no">DESCRIBE</code>, bis der Status <code translate="no">ACTIVE</code> oder <code translate="no">IDLE</code> lautet.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>Compute-Pool-Status</span> </span></p>
<ul>
<li>Hochladen von Spezifikationsdateien</li>
</ul>
<p>Nachdem Sie den Compute-Pool erstellt haben, beginnen Sie mit der Vorbereitung der spce-Datei für den Dienst. Die Dateien befinden sich ebenfalls in <a href="https://github.com/dald001/milvus_on_spcs">diesem Repo</a>. Bitte sehen Sie sich das Verzeichnis specs an.</p>
<p>Öffnen Sie die spec-Dateien dieser beiden Dienste, suchen Sie <code translate="no">${org_name}-${acct_name}</code> in der spec-Datei und ersetzen Sie sie durch ${instance_name} Ihres eigenen Kontos. Nach der Änderung verwenden Sie SnowSQL, um den Upload abzuschließen.</p>
<pre><code translate="no" class="language-sql">PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>jupyter.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>milvus.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Dienst erstellen</li>
</ul>
<p>Wenn der Upload abgeschlossen ist, können Sie den Dienst erstellen. Fahren Sie fort, um den Prozess der Erstellung des Dienstes abzuschließen.</p>
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
<p>Die Dienste können auch über <code translate="no">SHOW SERVICES;</code> eingesehen werden.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SHOW</span> SERVICES;

<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> name    <span class="hljs-operator">|</span> database_name <span class="hljs-operator">|</span> schema_name <span class="hljs-operator">|</span> owner    <span class="hljs-operator">|</span> compute_pool         <span class="hljs-operator">|</span> dns_name                                               <span class="hljs-operator">|</span> ......
<span class="hljs-operator">|</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> JUPYTER <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> JUPYTER_COMPUTE_POOL <span class="hljs-operator">|</span> jupyter.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal <span class="hljs-operator">|</span> ...... 
<span class="hljs-operator">|</span> MILVUS  <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> MILVUS_COMPUTE_POOL  <span class="hljs-operator">|</span> milvus.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal  <span class="hljs-operator">|</span> ......
<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Probleme beim Starten des Dienstes haben, können Sie die Dienstinformationen unter <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code> einsehen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>Status des Dienstes</span> </span></p>
<p>Weitere Informationen erhalten Sie unter <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">Notebook verwenden<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie <strong>SnowSQL</strong>, um Berechtigungen zu erteilen.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER <span class="hljs-keyword">TO</span> ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>Zeigen Sie dann den Endpunkt des Jupyter-Notizbuchs an und zeichnen Sie ihn auf.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">SHOW</span> ENDPOINTS <span class="hljs-keyword">IN</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>Zeichnen Sie den <code translate="no">ingress_url</code> Teil der Informationen auf, öffnen Sie dann den Browser und geben Sie die <code translate="no">ingress_url</code> ein, verwenden Sie das milvus_user Konto, um sich auf der Website anzumelden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>Erhalten Sie die Ingress-URL</span> </span></p>
<p>Öffnen Sie das Notebook über <code translate="no">ingress_url</code>, doppelklicken Sie auf die Datei <code translate="no">TestMilvus.ipynb</code> auf der Seite, um Milvus auszuprobieren. Wählen Sie den ersten Teil des Codeblocks aus und klicken Sie auf die Schaltfläche <strong>Ausführen</strong>, um die Verbindung herzustellen und die Einbettungsfunktion zu initialisieren.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>TestMilvus.ipynb im Notizbuch ausführen</span> </span></p>
<p>Nachdem Sie die Verbindung hergestellt haben, klicken Sie weiter auf <strong>RUN</strong>. Der Code wandelt einen Text nach der Einbettung in Vektordaten um und fügt ihn dann in Milvus ein.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie dann einen Text als Abfrage: "Wer hat mit der KI-Forschung begonnen?", führen Sie die Abfrage nach der Einbettung durch und erhalten Sie schließlich die relevantesten Ergebnisse und zeigen Sie diese an.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>Ermitteln und Anzeigen der relevantesten Ergebnisse</span> </span></p>
<p>Weitere Informationen über die Verwendung des Milvus-Clients finden Sie im Abschnitt <a href="/docs/de/quickstart.md">Milvus Doc</a>.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. Aufräumen<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach der Überprüfung können Sie SnowSQL verwenden, um die Dienste, Rollen und Datenressourcen zu bereinigen.</p>
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
<h2 id="About-Milvus" class="common-anchor-header">Über Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Weitere Informationen über Milvus finden Sie in der <a href="/docs/de/overview.md">Milvus-Einführung</a> und im <a href="/docs/de/quickstart.md">Schnellstart</a>. Natürlich gibt es auch eine detailliertere Einführung in die API, die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python-</a> und <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java-Versionen</a> sowie Informationen zu <a href="https://milvus.io/docs/embeddings.md">Einbettungen</a> und <a href="https://milvus.io/docs/integrate_with_openai.md">Integrationen</a> als Referenz.</p>
