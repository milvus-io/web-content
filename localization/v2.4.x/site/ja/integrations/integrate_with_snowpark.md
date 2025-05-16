---
id: integrate_with_snowpark.md
summary: このガイドでは、Snowparkコンテナサービス上でMilvusデモを開始する方法を示します。
title: スノーパークのコンテナサービスについて
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Snowparkコンテナサービス上のMilvus<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Snowparkコンテナサービス上でMilvusのデモを開始する方法を示します。</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">Snowpark コンテナサービスについて<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Servicesは、Snowflakeエコシステム内でのコンテナ化されたアプリケーションのデプロイ、管理、およびスケーリングを容易にするように設計されたフルマネージドコンテナサービスです。このサービスにより、ユーザーはコンテナ化されたワークロードをSnowflake内で直接実行できるようになり、処理のためにデータをSnowflake環境から移動する必要がなくなります。詳細については、公式の紹介を参照してください：<a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Servicesを</a>参照してください。</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Milvusデモの構成<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>以下では、Milvusの機能とSPCSでのMilvusの使用方法を設定とコードを通して理解していただきます。</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1.アカウント情報の取得</h3><p>SPCSクライアントをダウンロードします：<a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQLをダウンロード</a>し、アカウントにログインする。</p>
<pre><code translate="no" class="language-shell">snowsql -a <span class="hljs-variable">${instance_name}</span> -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">${instance_name}</code> のルールは<code translate="no">${org_name}-${acct_name}</code> です。関連情報は、<a href="http://app.snowflake.com/sn">app.snowflake.com</a>にログインし、個人アカウント情報を確認することで取得できます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>スノーフレークのアカウント情報</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2.役割と権限の設定</h3><p>OAUTH 連携を設定する。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">CREATE</span> <span class="hljs-variable constant_">SECURITY</span> <span class="hljs-variable constant_">INTEGRATION</span> <span class="hljs-variable constant_">SNOWSERVICES_INGRESS_OAUTH</span>
  <span class="hljs-variable constant_">TYPE</span>=oauth
  <span class="hljs-variable constant_">OAUTH_CLIENT</span>=snowservices_ingress
  <span class="hljs-variable constant_">ENABLED</span>=<span class="hljs-literal">true</span>;
  
<span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">GRANT</span> <span class="hljs-variable constant_">BIND</span> <span class="hljs-variable constant_">SERVICE</span> <span class="hljs-variable constant_">ENDPOINT</span> <span class="hljs-variable constant_">ON</span> <span class="hljs-variable constant_">ACCOUNT</span> <span class="hljs-variable constant_">TO</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">SYSADMIN</span>;
<button class="copy-code-btn"></button></code></pre>
<p>サービス用のロールを作成します。ここでの<code translate="no">${PASSWORD}</code> の部分は、デモが実行されるときにユーザーで置き換える必要があることに注意してください。</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3.データストレージ構成の作成</h3><ul>
<li><p>ウェアハウスとデータベースを作成します。</p>
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
<li><p>ロールに権限を付与する。</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT ALL PRIVILEGES ON DATABASE MILVUS_DEMO TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON SCHEMA MILVUS_DEMO.PUBLIC TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON WAREHOUSE MILVUS_WAREHOUSE TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON STAGE MILVUS_DEMO.PUBLIC.FILES TO MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ACLの設定</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4.イメージの作成</h3><p>Milvusで使用するイメージはローカルでビルドし、ユーザがアップロードする必要があります。関連するイメージの設定については、<a href="https://github.com/dald001/milvus_on_spcs">こちらのレポを</a>参照してください。コードをクローンした後、プロジェクトのルートディレクトリに移動し、イメージをビルドする準備をします。</p>
<ul>
<li><p>ローカルでイメージをビルドする</p>
<p>ローカルシェルを開き、イメージのビルドを開始します。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> <span class="hljs-variable">${repo_git_root_path}</span>
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>イメージは2つあり、1つ目はMilvusデータベースを実行するもの、2つ目は表示に使用するノートブックです。</p>
<p>ローカルイメージのビルドが完了したら、タグ付けとアップロードの準備をします。</p></li>
<li><p>ビルドしたイメージにタグを付ける</p>
<p>SPCSのdocker hubにログインする。</p>
<pre><code translate="no" class="language-shell">docker login <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>そして、spcs用のイメージにタグを付けます。</p>
<pre><code translate="no" class="language-shell">docker tag milvus <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>その後、ローカルのシェルで<code translate="no">docker images | grep milvus</code> を使って、イメージのパッケージ化とタグ付けが成功したかどうかを確認します。</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus

<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB
<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>SPCSにイメージをプッシュする</p>
<pre><code translate="no" class="language-shell">docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5.サービスの作成と起動</h3><p>SnowSQLシェルに戻りましょう。</p>
<ul>
<li>計算プールの作成</li>
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
<p>ステータスが<code translate="no">ACTIVE</code> または<code translate="no">IDLE</code> になるまで、<code translate="no">DESCRIBE</code> を通してコンピュートプールをチェックしてください。</p>
<pre><code translate="no" class="language-sql">DESCRIBE COMPUTE POOL MILVUS_COMPUTE_POOL;
DESCRIBE COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>コンピュートプールのステータス</span> </span></p>
<ul>
<li>specファイルのアップロード</li>
</ul>
<p>コンピュートプールを作成したら、サービス用のspceファイルの準備を始めます。このファイルも<a href="https://github.com/dald001/milvus_on_spcs">このリポジトリに</a>あります。specsディレクトリを参照してください。</p>
<p>これら2つのサービスのspecファイルを開き、<code translate="no">${org_name}-${acct_name}</code> 、自分のアカウントの${instance_name}に置き換えてください。変更後、SnowSQL を使用してアップロードを完了します。</p>
<pre><code translate="no" class="language-sql">PUT file://<span class="hljs-variable">${path/to/jupyter.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
PUT file://<span class="hljs-variable">${path/to/milvus.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>サービスの作成</li>
</ul>
<p>アップロードが完了したら、Continue でサービスの作成が完了します。</p>
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
<p>サービスは<code translate="no">SHOW SERVICES;</code> から確認することもできます。</p>
<pre><code translate="no" class="language-sql">SHOW SERVICES;

+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| name    | database_name | schema_name | owner    | compute_pool         | dns_name                                               | ......
|---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| JUPYTER | MILVUS_DEMO   | PUBLIC      | SYSADMIN | JUPYTER_COMPUTE_POOL | jupyter.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ...... 
| MILVUS  | MILVUS_DEMO   | PUBLIC      | SYSADMIN | MILVUS_COMPUTE_POOL  | milvus.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span>  | ......
+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
<button class="copy-code-btn"></button></code></pre>
<p>サービスの開始時に問題が発生した場合は、<code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code> からサービス情報を参照できます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>サービスのステータス</span> </span></p>
<p>詳しい情報は、<code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code> から入手できます。</p>
<h2 id="Use-Notebook" class="common-anchor-header">ノートブックの使用<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>SnowSQL を</strong>使用して権限を付与します。</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT USAGE ON SERVICE MILVUS_DEMO.PUBLIC.JUPYTER TO ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>Jupyter nootbook のエンドポイントを表示して記録します。</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
SHOW ENDPOINTS IN SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ingress_url</code> の部分を記録し、ブラウザを開き、<code translate="no">ingress_url</code> を入力し、milvus_user アカウントを使用してウェブサイトにログインします。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>イングレスURLの取得</span> </span></p>
<p><code translate="no">ingress_url</code> からノートブックを開き、ページ上の<code translate="no">TestMilvus.ipynb</code> ファイルをダブルクリックして、Milvus を試してみる。コードブロックの最初の部分を選択し、[<strong>実行]</strong>ボタンをクリックして、接続の確立と埋め込み関数の初期化を開始します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>ノートブックでTestMilvus.ipynbを実行する</span> </span>。</p>
<p>接続を確立したら、引き続き<strong>RUNを</strong>クリックします。エンベッディング処理後、テキストがベクトルデータに変換され、Milvusに挿入されます。</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>次に、テキストをクエリとして使用します。&quot;Who started AI research?&quot;、埋め込み処理後にクエリを実行し、最後に最も関連性の高い結果を取得して表示します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>最も関連性の高い結果を取得・表示</span> </span></p>
<p>Milvusクライアントの使い方については、<a href="/docs/ja/v2.4.x/quickstart.md">Milvus Docを</a>ご参照ください。</p>
<h2 id="7-Clean-up" class="common-anchor-header">7.クリーンアップ<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>検証後、SnowSQLを使用してサービス、ロール、データリソースをクリーンアップすることができます。</p>
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
<h2 id="About-Milvus" class="common-anchor-header">Milvusについて<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの詳細については、<a href="/docs/ja/v2.4.x/overview.md">Milvusの紹介と</a> <a href="/docs/ja/v2.4.x/quickstart.md">クイックスタートから</a>始めることができます。もちろん、APIのより詳細な紹介や<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a>版、<a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a>版もありますし、<a href="https://milvus.io/docs/embeddings.md">Embeddingsや</a> <a href="https://milvus.io/docs/integrate_with_openai.md">Integrationsの</a>情報もありますので参考にしてください。</p>
