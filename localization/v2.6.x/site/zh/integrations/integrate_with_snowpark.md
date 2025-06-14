---
id: integrate_with_snowpark.md
summary: 本指南演示如何在 Snowpark 容器服务上启动 Milvus 演示。
title: 在 Snowpark 容器服务上使用 Milvus
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">在 Snowpark 容器服务上使用 Milvus<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南演示如何在 Snowpark 容器服务上启动 Milvus 演示。</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">关于雪园容器服务<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark 容器服务是一种完全托管的容器产品，旨在促进 Snowflake 生态系统内容器化应用程序的部署、管理和扩展。这项服务使用户能够直接在 Snowflake 内运行容器化工作负载，确保数据无需移出 Snowflake 环境进行处理。有关详细信息，请参阅官方介绍：<a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark 容器服务</a>。</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">配置 Milvus 演示<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>下面将通过配置和代码让用户了解 Milvus 的功能，以及如何在 SPCS 中使用 Milvus。</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1.获取账户信息</h3><p>下载 SPCS 客户端：<a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>，然后登录您的账户。</p>
<pre><code translate="no" class="language-shell">snowsql -a ${instance_name} -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">${instance_name}</code> 的规则是<code translate="no">${org_name}-${acct_name}</code> 。登录<a href="http://app.snowflake.com/sn">app.snowflake.com</a>，查看个人账户信息即可获取相关信息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>Snowflake 账户信息</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2.配置角色和权限</h3><p>配置 OAUTH 集成。</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">CREATE</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH
  TYPE<span class="hljs-operator">=</span>oauth
  OAUTH_CLIENT<span class="hljs-operator">=</span>snowservices_ingress
  ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">true</span>;
  
USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">GRANT</span> BIND SERVICE ENDPOINT <span class="hljs-keyword">ON</span> ACCOUNT <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre>
<p>为服务创建一个角色，注意此处的<code translate="no">${PASSWORD}</code> 部分需要在演示时由用户替换。</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3.创建数据存储配置</h3><ul>
<li><p>创建仓库和数据库</p>
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
<li><p>授予角色权限</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> DATABASE MILVUS_DEMO <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> SCHEMA MILVUS_DEMO.PUBLIC <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> STAGE MILVUS_DEMO.PUBLIC.FILES <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>配置 ACL</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4.创建镜像</h3><p>Milvus 使用的镜像需要在本地构建，然后由用户上传。有关镜像的相关配置，请参考<a href="https://github.com/dald001/milvus_on_spcs">此 repo</a>。克隆代码后，进入项目根目录，准备构建镜像。</p>
<ul>
<li><p>本地构建镜像</p>
<p>打开本地 shell，开始构建镜像。</p>
<pre><code translate="no" class="language-shell">cd ${repo_git_root_path}
docker build --rm --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --rm --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>这里有两个镜像，第一个是运行 Milvus 数据库，第二个是用于显示的笔记本。</p>
<p>本地图像构建完成后，准备标记和上传它们。</p></li>
<li><p>标记已构建的镜像</p>
<p>登录 SPCS 的 docker hub。</p>
<pre><code translate="no" class="language-shell">docker login ${instance_name}.registry.snowflakecomputing.com -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>现在就可以为 spcs 标记图像了。</p>
<pre><code translate="no" class="language-shell">docker tag milvus ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>然后在本地 shell 中使用<code translate="no">docker images | grep milvus</code> 检查图像是否已成功打包和标记。</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus
<span class="hljs-meta prompt_">
$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB</span>
<span class="hljs-meta prompt_">$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>将图像推送到 SPCS</p>
<pre><code translate="no" class="language-shell">docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5.创建并启动服务</h3><p>让我们回到 SnowSQL shell。</p>
<ul>
<li>创建计算池</li>
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
<p>通过<code translate="no">DESCRIBE</code> 检查计算池，直到状态为<code translate="no">ACTIVE</code> 或<code translate="no">IDLE</code> 。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>计算池状态</span> </span></p>
<ul>
<li>上传规范文件</li>
</ul>
<p>创建计算池后，开始为服务准备 spce 文件。这些文件也在<a href="https://github.com/dald001/milvus_on_spcs">此 repo</a> 中。请参考规格目录。</p>
<p>打开这两个服务的规格文件，在规格文件中找到<code translate="no">${org_name}-${acct_name}</code> ，并用自己账户的 ${instance_name} 替换。修改后，使用 SnowSQL 完成上传。</p>
<pre><code translate="no" class="language-sql">PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>jupyter.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>milvus.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>创建服务</li>
</ul>
<p>上传完成后，就可以创建服务了，继续完成创建服务的过程。</p>
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
<p>也可通过<code translate="no">SHOW SERVICES;</code> 查看服务。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SHOW</span> SERVICES;

<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> name    <span class="hljs-operator">|</span> database_name <span class="hljs-operator">|</span> schema_name <span class="hljs-operator">|</span> owner    <span class="hljs-operator">|</span> compute_pool         <span class="hljs-operator">|</span> dns_name                                               <span class="hljs-operator">|</span> ......
<span class="hljs-operator">|</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> JUPYTER <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> JUPYTER_COMPUTE_POOL <span class="hljs-operator">|</span> jupyter.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal <span class="hljs-operator">|</span> ...... 
<span class="hljs-operator">|</span> MILVUS  <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> MILVUS_COMPUTE_POOL  <span class="hljs-operator">|</span> milvus.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal  <span class="hljs-operator">|</span> ......
<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<button class="copy-code-btn"></button></code></pre>
<p>如果在启动服务时遇到问题，可通过<code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code> 查看服务信息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>服务状态</span> </span></p>
<p>可通过<code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code> 获取更多信息。</p>
<h2 id="Use-Notebook" class="common-anchor-header">使用笔记本<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<strong>SnowSQL</strong>授予权限。</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER <span class="hljs-keyword">TO</span> ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>然后查看并记录 Jupyter nootbook 的端点。</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">SHOW</span> ENDPOINTS <span class="hljs-keyword">IN</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>记录<code translate="no">ingress_url</code> 部分信息，然后打开浏览器并输入<code translate="no">ingress_url</code> ，使用 milvus_user 账户登录网站。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>获取入口 URL</span> </span></p>
<p>通过<code translate="no">ingress_url</code> 打开笔记本，双击页面上的<code translate="no">TestMilvus.ipynb</code> 文件试用 Milvus。选择代码块的第一部分，点击<strong>运行</strong>按钮开始建立连接并初始化 Embeddings 函数。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>在笔记本中运行 TestMilvus.ipynb</span> </span></p>
<p>建立连接后，继续点击<strong>运行</strong>。代码会将一段文本经过嵌入处理后变成向量数据，然后插入到 Milvus 中。</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>然后使用一段文本作为查询："谁开始了人工智能研究？"，进行嵌入处理后执行查询，最后获取并显示最相关的结果。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>获取并显示最相关的结果</span> </span></p>
<p>有关 Milvus 客户端使用方法的更多信息，可以参考<a href="/docs/zh/quickstart.md">Milvus 文档</a>部分。</p>
<h2 id="7-Clean-up" class="common-anchor-header">7.清理<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>验证后，您可以使用 SnowSQL 清理服务、角色和数据资源。</p>
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
<h2 id="About-Milvus" class="common-anchor-header">关于 Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>有关 Milvus 的更多信息，可以从<a href="/docs/zh/overview.md">Milvus 介绍</a>和<a href="/docs/zh/quickstart.md">快速入门</a>开始。当然，还有更详细的 API 介绍，可参考<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a>和<a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a>版本，还有关于<a href="https://milvus.io/docs/embeddings.md">Embeddings</a>和<a href="https://milvus.io/docs/integrate_with_openai.md">Integrations</a>的信息可供参考。</p>
