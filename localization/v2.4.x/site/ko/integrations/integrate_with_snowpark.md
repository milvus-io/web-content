---
id: integrate_with_snowpark.md
summary: 이 가이드는 스노우파크 컨테이너 서비스에서 Milvus 데모를 시작하는 방법을 설명합니다.
title: 스노우파크 컨테이너 서비스 밀버스
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Snowpark 컨테이너 서비스의 Milvus<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Snowpark 컨테이너 서비스에서 Milvus 데모를 시작하는 방법을 설명합니다.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">Snowpark 컨테이너 서비스 소개<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>스노우파크 컨테이너 서비스는 스노우플레이크 에코시스템 내에서 컨테이너화된 애플리케이션의 배포, 관리 및 확장을 용이하게 하도록 설계된 완전 관리형 컨테이너 서비스입니다. 이 서비스를 통해 사용자는 컨테이너화된 워크로드를 Snowflake 내에서 직접 실행할 수 있으므로 처리를 위해 데이터를 Snowflake 환경 외부로 옮길 필요가 없습니다. 자세한 내용은 공식 소개를 참조하세요: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark 컨테이너 서비스</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Milvus 데모 구성<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 구성과 코드를 통해 Milvus의 기능과 SPCS에서 Milvus를 사용하는 방법을 이해할 수 있는 데모입니다.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. 계정 정보 가져오기</h3><p>SPCS 클라이언트를 다운로드합니다: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL을</a> 다운로드한 다음 계정에 로그인합니다.</p>
<pre><code translate="no" class="language-shell">snowsql -a <span class="hljs-variable">${instance_name}</span> -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">${instance_name}</code> 의 규칙은 <code translate="no">${org_name}-${acct_name}</code> 입니다. 관련 정보는 <a href="http://app.snowflake.com/sn">app.snowflake.com에</a> 로그인하여 개인 계정 정보를 확인하면 얻을 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>스노우플레이크 계정 정보</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. 역할 및 권한 구성하기</h3><p>OAUTH 연동을 구성합니다.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">CREATE</span> <span class="hljs-variable constant_">SECURITY</span> <span class="hljs-variable constant_">INTEGRATION</span> <span class="hljs-variable constant_">SNOWSERVICES_INGRESS_OAUTH</span>
  <span class="hljs-variable constant_">TYPE</span>=oauth
  <span class="hljs-variable constant_">OAUTH_CLIENT</span>=snowservices_ingress
  <span class="hljs-variable constant_">ENABLED</span>=<span class="hljs-literal">true</span>;
  
<span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">GRANT</span> <span class="hljs-variable constant_">BIND</span> <span class="hljs-variable constant_">SERVICE</span> <span class="hljs-variable constant_">ENDPOINT</span> <span class="hljs-variable constant_">ON</span> <span class="hljs-variable constant_">ACCOUNT</span> <span class="hljs-variable constant_">TO</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">SYSADMIN</span>;
<button class="copy-code-btn"></button></code></pre>
<p>서비스에 대한 역할을 생성합니다. 여기서 <code translate="no">${PASSWORD}</code> 부분은 데모 시 사용자가 대체해야 합니다.</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. 데이터 저장소 구성 만들기</h3><ul>
<li><p>웨어하우스 및 데이터베이스 생성</p>
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
<li><p>역할 권한 부여</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT ALL PRIVILEGES ON DATABASE MILVUS_DEMO TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON SCHEMA MILVUS_DEMO.PUBLIC TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON WAREHOUSE MILVUS_WAREHOUSE TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON STAGE MILVUS_DEMO.PUBLIC.FILES TO MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ACL 구성</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. 이미지 생성</h3><p>Milvus에서 사용하는 이미지는 로컬에서 빌드한 후 사용자가 업로드해야 합니다. 이미지의 관련 구성은 <a href="https://github.com/dald001/milvus_on_spcs">이 리포지토리를</a> 참조하세요. 코드를 복제한 후 프로젝트의 루트 디렉토리로 이동하여 이미지 빌드를 준비합니다.</p>
<ul>
<li><p>로컬에서 이미지 빌드하기</p>
<p>로컬 셸을 열고 이미지 빌드를 시작합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> <span class="hljs-variable">${repo_git_root_path}</span>
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>여기에는 두 개의 이미지가 있는데, 첫 번째 이미지는 Milvus 데이터베이스를 실행하는 이미지이고 두 번째 이미지는 디스플레이에 사용되는 노트북입니다.</p>
<p>로컬 이미지가 빌드된 후에는 태그를 지정하고 업로드할 준비를 합니다.</p></li>
<li><p>빌드된 이미지에 태그 지정</p>
<p>SPCS의 도커 허브에 로그인합니다.</p>
<pre><code translate="no" class="language-shell">docker login <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>이제 이미지에 spcs 태그를 지정할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">docker tag milvus <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 로컬 셸에서 <code translate="no">docker images | grep milvus</code> 을 사용해 이미지가 성공적으로 패키징되고 태그가 지정되었는지 확인합니다.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus

<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB
<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>이미지를 SPCS로 푸시하기</p>
<pre><code translate="no" class="language-shell">docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. 서비스 생성 및 시작</h3><p>SnowSQL 셸로 돌아가 보겠습니다.</p>
<ul>
<li>컴퓨팅 풀 생성</li>
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
<p>상태가 <code translate="no">ACTIVE</code> 또는 <code translate="no">IDLE</code> 가 될 때까지 <code translate="no">DESCRIBE</code> 를 통해 컴퓨팅 풀을 확인합니다.</p>
<pre><code translate="no" class="language-sql">DESCRIBE COMPUTE POOL MILVUS_COMPUTE_POOL;
DESCRIBE COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>컴퓨팅 풀 상태</span> </span></p>
<ul>
<li>사양 파일 업로드</li>
</ul>
<p>컴퓨팅 풀을 생성한 후 서비스용 스페이스 파일 준비를 시작합니다. 파일은 <a href="https://github.com/dald001/milvus_on_spcs">이 리포지토리에</a> 있습니다. 사양 디렉토리를 참조하세요.</p>
<p>이 두 서비스의 스펙 파일을 열고, 스펙 파일에서 <code translate="no">${org_name}-${acct_name}</code> 을 찾아서 내 계정의 ${instance_name}으로 바꿉니다. 수정 후 SnowSQL을 사용하여 업로드를 완료합니다.</p>
<pre><code translate="no" class="language-sql">PUT file://<span class="hljs-variable">${path/to/jupyter.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
PUT file://<span class="hljs-variable">${path/to/milvus.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>서비스 생성</li>
</ul>
<p>업로드가 완료되면 서비스를 생성할 준비가 완료된 것이므로 계속해서 서비스 생성 프로세스를 진행합니다.</p>
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
<p>서비스는 <code translate="no">SHOW SERVICES;</code> 에서도 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-sql">SHOW SERVICES;

+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| name    | database_name | schema_name | owner    | compute_pool         | dns_name                                               | ......
|---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| JUPYTER | MILVUS_DEMO   | PUBLIC      | SYSADMIN | JUPYTER_COMPUTE_POOL | jupyter.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ...... 
| MILVUS  | MILVUS_DEMO   | PUBLIC      | SYSADMIN | MILVUS_COMPUTE_POOL  | milvus.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span>  | ......
+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
<button class="copy-code-btn"></button></code></pre>
<p>서비스 시작 시 문제가 발생하면 <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code> 를 통해 서비스 정보를 확인할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>서비스 상태</span> </span></p>
<p>자세한 정보는 <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code> 을 통해 확인할 수 있습니다.</p>
<h2 id="Use-Notebook" class="common-anchor-header">노트북 사용<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>SnowSQL을</strong> 사용해 권한을 부여합니다.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT USAGE ON SERVICE MILVUS_DEMO.PUBLIC.JUPYTER TO ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 Jupyter 노트북의 엔드포인트를 보고 기록합니다.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
SHOW ENDPOINTS IN SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ingress_url</code> 부분을 기록한 다음 브라우저를 열고 <code translate="no">ingress_url</code>, milvus_user 계정을 사용하여 웹사이트에 로그인합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>로그인 URL 얻기</span> </span></p>
<p><code translate="no">ingress_url</code> 을 통해 노트북을 열고 페이지에서 <code translate="no">TestMilvus.ipynb</code> 파일을 두 번 클릭하여 Milvus를 사용해 봅니다. 코드 블록의 첫 번째 부분을 선택하고 <strong>실행</strong> 버튼을 클릭하여 연결 설정 및 임베딩 기능 초기화를 시작합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>노트북에서 TestMilvus.ipynb 실행하기</span> </span></p>
<p>연결을 설정한 후 계속 <strong>실행을</strong> 클릭합니다. 이 코드는 임베딩 처리 후 텍스트를 벡터 데이터로 변환한 다음 Milvus에 삽입합니다.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 &quot;누가 AI 연구를 시작했나요?&quot;와 같은 텍스트를 쿼리로 사용하고 임베딩 처리 후 쿼리를 수행하여 가장 관련성이 높은 결과를 가져와 표시합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>가장 연관성이 높은 결과 얻기 및 표시</span> </span></p>
<p>Milvus 클라이언트 사용법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/quickstart.md">Milvus 문서</a> 섹션을 참조하세요.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. 정리하기<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>확인이 완료되면 SnowSQL을 사용하여 서비스, 역할, 데이터 리소스를 정리할 수 있습니다.</p>
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
<h2 id="About-Milvus" class="common-anchor-header">Milvus 소개<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/overview.md">Milvus 소개</a> 및 <a href="/docs/ko/v2.4.x/quickstart.md">빠른 시작에서</a> 확인할 수 있습니다. 물론 API에 대한 더 자세한 소개는 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> 및 <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a> 버전을 참조하시고, <a href="https://milvus.io/docs/embeddings.md">임베딩</a> 및 <a href="https://milvus.io/docs/integrate_with_openai.md">통합에</a> 대한 정보도 참고하시기 바랍니다.</p>
