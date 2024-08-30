---
id: integrate_with_snowpark.md
summary: >-
  This guide demonstrates how to start a Milvus demo on Snowpark container
  services.
title: Milvus on Snowpark Container Services
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Milvus on Snowpark Container Services<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide demonstrates how to start a Milvus demo on Snowpark container services.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">About Snowpark Container Services<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Services is a fully managed container offering designed to facilitate the deployment, management, and scaling of containerized applications within the Snowflake ecosystem. This service enables users to run containerized workloads directly within Snowflake, ensuring that data doesn’t need to be moved out of the Snowflake environment for processing. For more information, please refer to the official introduction: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Services</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Configure Milvus demo<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>The following will let users understand the capabilities of Milvus and how to use Milvus in SPCS through configuration and code.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. Obtain account information</h3><p>Download the SPCS client: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>, then log in to your account.</p>
<pre><code translate="no" class="language-shell">snowsql -a <span class="hljs-variable">${instance_name}</span> -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>The rule of <code translate="no">${instance_name}</code> is <code translate="no">${org_name}-${acct_name}</code>. The relevant information can be obtained by logging in to <a href="http://app.snowflake.com/sn">app.snowflake.com</a> and checking the personal account information.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
    <span>Snowflake account information</span>
  </span>
</p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. Configure Role and privileges</h3><p>Configure OAUTH integration.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">CREATE</span> <span class="hljs-variable constant_">SECURITY</span> <span class="hljs-variable constant_">INTEGRATION</span> <span class="hljs-variable constant_">SNOWSERVICES_INGRESS_OAUTH</span>
  <span class="hljs-variable constant_">TYPE</span>=oauth
  <span class="hljs-variable constant_">OAUTH_CLIENT</span>=snowservices_ingress
  <span class="hljs-variable constant_">ENABLED</span>=<span class="hljs-literal">true</span>;
  
<span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">GRANT</span> <span class="hljs-variable constant_">BIND</span> <span class="hljs-variable constant_">SERVICE</span> <span class="hljs-variable constant_">ENDPOINT</span> <span class="hljs-variable constant_">ON</span> <span class="hljs-variable constant_">ACCOUNT</span> <span class="hljs-variable constant_">TO</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">SYSADMIN</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Create a role for the service, note that the <code translate="no">${PASSWORD}</code> part here needs to be replaced by the user when the demo is</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
CREATE ROLE MILVUS_ROLE;

USE ROLE USERADMIN;
CREATE USER milvus_user
  PASSWORD=<span class="hljs-string">&#x27;milvususerok&#x27;</span>
  DEFAULT_ROLE = <span class="hljs-type">MILVUS_ROLE</span>
  <span class="hljs-variable">DEFAULT_SECONDARY_ROLES</span> <span class="hljs-operator">=</span> (<span class="hljs-string">&#x27;ALL&#x27;</span>)
  MUST_CHANGE_PASSWORD = FALSE;
  
USE ROLE SECURITYADMIN;
GRANT ROLE MILVUS_ROLE TO USER milvus_user;
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. Create data storage configuration</h3><ul>
<li><p>Create warehouse and database</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
CREATE OR REPLACE WAREHOUSE MILVUS_WAREHOUSE WITH
WAREHOUSE_SIZE=<span class="hljs-string">&#x27;X-SMALL&#x27;</span>
AUTO_SUSPEND = <span class="hljs-number">180</span>
AUTO_RESUME = <span class="hljs-literal">true</span>
INITIALLY_SUSPENDED=<span class="hljs-literal">false</span>;

USE ROLE SYSADMIN;
CREATE DATABASE IF NOT EXISTS MILVUS_DEMO;
USE DATABASE MILVUS_DEMO;
CREATE IMAGE REPOSITORY MILVUS_DEMO.PUBLIC.MILVUS_REPO;
CREATE OR REPLACE STAGE YAML_STAGE;
CREATE OR REPLACE STAGE <span class="hljs-type">DATA</span> <span class="hljs-variable">ENCRYPTION</span> <span class="hljs-operator">=</span> (TYPE = <span class="hljs-string">&#x27;SNOWFLAKE_SSE&#x27;</span>);
CREATE OR REPLACE STAGE <span class="hljs-type">FILES</span> <span class="hljs-variable">ENCRYPTION</span> <span class="hljs-operator">=</span> (TYPE = <span class="hljs-string">&#x27;SNOWFLAKE_SSE&#x27;</span>);
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Grant role privileges</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT ALL PRIVILEGES ON DATABASE MILVUS_DEMO TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON SCHEMA MILVUS_DEMO.PUBLIC TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON WAREHOUSE MILVUS_WAREHOUSE TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON STAGE MILVUS_DEMO.PUBLIC.FILES TO MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configure ACL</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
USE DATABASE MILVUS_DEMO;
USE SCHEMA PUBLIC;
CREATE NETWORK RULE <span class="hljs-type">allow_all_rule</span>
<span class="hljs-variable">TYPE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;HOST_PORT&#x27;</span>
MODE= <span class="hljs-string">&#x27;EGRESS&#x27;</span>
VALUE_LIST = (<span class="hljs-string">&#x27;0.0.0.0:443&#x27;</span>,<span class="hljs-string">&#x27;0.0.0.0:80&#x27;</span>);

CREATE EXTERNAL ACCESS INTEGRATION allow_all_eai
ALLOWED_NETWORK_RULES=(allow_all_rule)
ENABLED=TRUE;

GRANT USAGE ON INTEGRATION allow_all_eai TO ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="4-Create-images" class="common-anchor-header">4. Create images</h3><p>The image used by Milvus needs to be built locally and then uploaded by user. For the relevant configuration of the image, please refer to <a href="https://github.com/dald001/milvus_on_spcs">this repo</a>. After cloning the code, go to the root directory of the project and prepare to build the image.</p>
<ul>
<li><p>Build images locally</p>
<p>Open your local shell and begin to build images.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> <span class="hljs-variable">${repo_git_root_path}</span>
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>There are two images here, the first one is running the Milvus database, and the second one is the notebook used for display.</p>
<p>After the local images are built, prepare to tag and upload them.</p></li>
<li><p>Tag built images</p>
<p>Log in to the docker hub of SPCS.</p>
<pre><code translate="no" class="language-shell">docker login <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>And you can tag images for spcs now.</p>
<pre><code translate="no" class="language-shell">docker tag milvus <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Then use <code translate="no">docker images | grep milvus</code> in the local shell to check whether the image has been packaged and tagged successfully.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus

<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB
<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Push images to SPCS</p>
<pre><code translate="no" class="language-shell">docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. Create and start services</h3><p>Let us go back to the SnowSQL shell.</p>
<ul>
<li>Create Compute pools</li>
</ul>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
CREATE COMPUTE POOL IF NOT EXISTS <span class="hljs-type">MILVUS_COMPUTE_POOL</span>
  <span class="hljs-variable">MIN_NODES</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  MAX_NODES = <span class="hljs-number">1</span>
  INSTANCE_FAMILY = <span class="hljs-type">CPU_X64_S</span>
  <span class="hljs-variable">AUTO_RESUME</span> <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
CREATE COMPUTE POOL IF NOT EXISTS <span class="hljs-type">JUPYTER_COMPUTE_POOL</span>
  <span class="hljs-variable">MIN_NODES</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
  MAX_NODES = <span class="hljs-number">1</span>
  INSTANCE_FAMILY = <span class="hljs-type">CPU_X64_S</span>
  <span class="hljs-variable">AUTO_RESUME</span> <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Check the compute pools through <code translate="no">DESCRIBE</code> until the status is <code translate="no">ACTIVE</code> or <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql">DESCRIBE COMPUTE POOL MILVUS_COMPUTE_POOL;
DESCRIBE COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
    <span>Compute pool status</span>
  </span>
</p>
<ul>
<li>Upload spec files</li>
</ul>
<p>After creating the compute pool, start preparing the spce file for the service. The files are also in <a href="https://github.com/dald001/milvus_on_spcs">this repo</a>. Please refer to the specs directory.</p>
<p>Open the spec files of these two services, find <code translate="no">${org_name}-${acct_name}</code> in the spec file, and replace them with ${instance_name} of your own account. After modification, use SnowSQL to complete the upload.</p>
<pre><code translate="no" class="language-sql">PUT file://<span class="hljs-variable">${path/to/jupyter.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
PUT file://<span class="hljs-variable">${path/to/milvus.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Create service</li>
</ul>
<p>When the upload is complete, you are ready to create the service, Continue to complete the process of creating the service.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
USE DATABASE MILVUS_DEMO;
USE SCHEMA PUBLIC;

CREATE SERVICE MILVUS
  IN COMPUTE POOL MILVUS_COMPUTE_POOL 
  FROM <span class="hljs-meta">@YAML_STAGE</span>
  SPEC=<span class="hljs-string">&#x27;milvus.yaml&#x27;</span>
  MIN_INSTANCES=<span class="hljs-number">1</span>
  MAX_INSTANCES=<span class="hljs-number">1</span>;

CREATE SERVICE JUPYTER
  IN COMPUTE POOL JUPYTER_COMPUTE_POOL 
  FROM <span class="hljs-meta">@YAML_STAGE</span>
  SPEC=<span class="hljs-string">&#x27;jupyter.yaml&#x27;</span>
  MIN_INSTANCES=<span class="hljs-number">1</span>
  MAX_INSTANCES=<span class="hljs-number">1</span>;
<button class="copy-code-btn"></button></code></pre>
<p>The services can also be viewed through <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql">SHOW SERVICES;

+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| name    | database_name | schema_name | owner    | compute_pool         | dns_name                                               | ......
|---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| JUPYTER | MILVUS_DEMO   | PUBLIC      | SYSADMIN | JUPYTER_COMPUTE_POOL | jupyter.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ...... 
| MILVUS  | MILVUS_DEMO   | PUBLIC      | SYSADMIN | MILVUS_COMPUTE_POOL  | milvus.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span>  | ......
+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
<button class="copy-code-btn"></button></code></pre>
<p>If you encounter problems starting the service, you can view service information through <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
    <span>Service status</span>
  </span>
</p>
<p>More information can be obtained through <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">Use Notebook<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Use <strong>SnowSQL</strong> to grant permissions.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT USAGE ON SERVICE MILVUS_DEMO.PUBLIC.JUPYTER TO ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>Then view and record the endpoint of the Jupyter nootbook.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
SHOW ENDPOINTS IN SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>Record the <code translate="no">ingress_url</code> part of the information, then open the browser and enter the <code translate="no">ingress_url</code>, use the milvus_user account to log in to the website.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
    <span>Obtain the ingress URL</span>
  </span>
</p>
<p>Opening the notebook through the <code translate="no">ingress_url</code>, double-click the <code translate="no">TestMilvus.ipynb</code> file on the page to try out Milvus. Select the first part of the code block, and click the <strong>Run</strong> button to start establishing the connection and initializing the embedding function.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
    <span>Run TestMilvus.ipynb in the notebook</span>
  </span>
</p>
<p>After establishing the connection, continue to click <strong>RUN</strong>. The code will turn a piece of text into vector data after embedding processing, and then insert it into Milvus.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>Then use a text as a query: &quot;Who started AI research?&quot;, perform the query after embedding processing, and finally obtain and display the most relevant results.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
    <span>Obtain and display the most relevant results</span>
  </span>
</p>
<p>For more information on the usage of the Milvus client, you can refer to the <a href="/docs/quickstart.md">Milvus Doc</a> section.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. Clean up<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>After verification, you can use SnowSQL to cleanup the  services, roles, and data resources.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
DROP USER milvus_user;

USE ROLE SYSADMIN;
DROP SERVICE MILVUS;
DROP SERVICE JUPYTER;

DROP COMPUTE POOL MILVUS_COMPUTE_POOL;
DROP COMPUTE POOL JUPYTER_COMPUTE_POOL;

DROP IMAGE REPOSITORY MILVUS_DEMO.PUBLIC.MILVUS_REPO;
DROP DATABASE MILVUS_DEMO;
DROP WAREHOUSE MILVUS_WAREHOUSE;

USE ROLE ACCOUNTADMIN;
DROP ROLE MILVUS_ROLE;
DROP SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH;
<button class="copy-code-btn"></button></code></pre>
<h2 id="About-Milvus" class="common-anchor-header">About Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>For more information about Milvus, you can start with the <a href="/docs/overview.md">Milvus introduction</a> and <a href="/docs/quickstart.md">Quick start</a>. Of course, there is a more detailed introduction to the API, refer to the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> and <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a> versions, and there is also information about <a href="https://milvus.io/docs/embeddings.md">Embeddings</a> and <a href="https://milvus.io/docs/integrate_with_openai.md">Integrations</a> for reference.</p>
