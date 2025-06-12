---
id: integrate_with_snowpark.md
summary: >-
  В этом руководстве показано, как запустить демонстрацию Milvus на контейнерных
  сервисах Snowpark.
title: Milvus на контейнерных сервисах Snowpark
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Milvus на контейнерных сервисах Snowpark<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как запустить демонстрацию Milvus на контейнерных сервисах Snowpark.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">О контейнерных сервисах Snowpark<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Services - это полностью управляемое контейнерное предложение, предназначенное для упрощения развертывания, управления и масштабирования контейнерных приложений в экосистеме Snowflake. Эта услуга позволяет пользователям запускать контейнерные рабочие нагрузки непосредственно в Snowflake, гарантируя, что данные не нужно выносить из среды Snowflake для обработки. Для получения дополнительной информации обратитесь к официальному представлению: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Services</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Настройка демонстрационной версии Milvus<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Ниже описано, как с помощью конфигурации и кода понять возможности Milvus и как использовать Milvus в SPCS.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. Получите информацию об учетной записи</h3><p>Загрузите клиент SPCS: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>, затем войдите в свою учетную запись.</p>
<pre><code translate="no" class="language-shell">snowsql -a ${instance_name} -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>Правило <code translate="no">${instance_name}</code> - <code translate="no">${org_name}-${acct_name}</code>. Соответствующую информацию можно получить, войдя на сайт <a href="http://app.snowflake.com/sn">app.snowflake.com</a> и проверив информацию о личном кабинете.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>Информация об учетной записи Snowflake</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. Настройка ролей и привилегий</h3><p>Настройте интеграцию OAUTH.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">CREATE</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH
  TYPE<span class="hljs-operator">=</span>oauth
  OAUTH_CLIENT<span class="hljs-operator">=</span>snowservices_ingress
  ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">true</span>;
  
USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">GRANT</span> BIND SERVICE ENDPOINT <span class="hljs-keyword">ON</span> ACCOUNT <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre>
<p>Создайте роль для сервиса, обратите внимание, что часть <code translate="no">${PASSWORD}</code> здесь должна быть заменена пользователем, когда демонстрация будет выполнена.</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. Создание конфигурации хранилища данных</h3><ul>
<li><p>Создайте хранилище и базу данных</p>
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
<li><p>Предоставьте привилегии роли</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> DATABASE MILVUS_DEMO <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> SCHEMA MILVUS_DEMO.PUBLIC <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> STAGE MILVUS_DEMO.PUBLIC.FILES <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Настройте ACL</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. Создание образов</h3><p>Образ, используемый Milvus, должен быть создан локально, а затем загружен пользователем. Для соответствующей настройки образа обратитесь к <a href="https://github.com/dald001/milvus_on_spcs">этому репозиторию</a>. После клонирования кода перейдите в корневой каталог проекта и подготовьтесь к сборке образа.</p>
<ul>
<li><p>Сборка образов локально</p>
<p>Откройте локальную оболочку и начните сборку образов.</p>
<pre><code translate="no" class="language-shell">cd ${repo_git_root_path}
docker build --rm --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --rm --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Здесь два образа, первый - это база данных Milvus, а второй - ноутбук, используемый для отображения.</p>
<p>После того как локальные образы будут собраны, подготовьтесь к их маркировке и загрузке.</p></li>
<li><p>Пометить собранные образы</p>
<p>Войдите в докер-хаб SPCS.</p>
<pre><code translate="no" class="language-shell">docker login ${instance_name}.registry.snowflakecomputing.com -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете пометить изображения для spcs.</p>
<pre><code translate="no" class="language-shell">docker tag milvus ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Затем используйте <code translate="no">docker images | grep milvus</code> в локальной оболочке, чтобы проверить, успешно ли упакован и помечен образ.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus
<span class="hljs-meta prompt_">
$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB</span>
<span class="hljs-meta prompt_">$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Отправить образы в SPCS</p>
<pre><code translate="no" class="language-shell">docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. Создание и запуск служб</h3><p>Давайте вернемся в оболочку SnowSQL.</p>
<ul>
<li>Создайте пулы вычислений</li>
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
<p>Проверьте пулы вычислений через <code translate="no">DESCRIBE</code>, пока их статус не станет <code translate="no">ACTIVE</code> или <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>Статус вычислительного пула</span> </span></p>
<ul>
<li>Загрузка файлов спецификаций</li>
</ul>
<p>После создания вычислительного пула начните подготовку spce-файла для сервиса. Файлы также находятся в <a href="https://github.com/dald001/milvus_on_spcs">этом репозитории</a>. Пожалуйста, обратитесь к директории specs.</p>
<p>Откройте файлы спецификаций этих двух сервисов, найдите <code translate="no">${org_name}-${acct_name}</code> в файле спецификации и замените его на ${имя_инстанции} вашей собственной учетной записи. После внесения изменений используйте SnowSQL для завершения загрузки.</p>
<pre><code translate="no" class="language-sql">PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>jupyter.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>milvus.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Создание службы</li>
</ul>
<p>Когда выгрузка будет завершена, вы будете готовы к созданию службы, Продолжить, чтобы завершить процесс создания службы.</p>
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
<p>Службы также можно просматривать через <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SHOW</span> SERVICES;

<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> name    <span class="hljs-operator">|</span> database_name <span class="hljs-operator">|</span> schema_name <span class="hljs-operator">|</span> owner    <span class="hljs-operator">|</span> compute_pool         <span class="hljs-operator">|</span> dns_name                                               <span class="hljs-operator">|</span> ......
<span class="hljs-operator">|</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> JUPYTER <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> JUPYTER_COMPUTE_POOL <span class="hljs-operator">|</span> jupyter.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal <span class="hljs-operator">|</span> ...... 
<span class="hljs-operator">|</span> MILVUS  <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> MILVUS_COMPUTE_POOL  <span class="hljs-operator">|</span> milvus.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal  <span class="hljs-operator">|</span> ......
<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<button class="copy-code-btn"></button></code></pre>
<p>Если у вас возникли проблемы с запуском службы, вы можете просмотреть информацию о службе через <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>Состояние службы</span> </span></p>
<p>Дополнительную информацию можно получить через <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">Использование блокнота<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте <strong>SnowSQL</strong> для предоставления разрешений.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER <span class="hljs-keyword">TO</span> ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>Затем просмотрите и запишите конечную точку блокнота Jupyter.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">SHOW</span> ENDPOINTS <span class="hljs-keyword">IN</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>Запишите часть информации на <code translate="no">ingress_url</code>, затем откройте браузер и введите <code translate="no">ingress_url</code>, используя учетную запись milvus_user для входа на сайт.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>Получение URL-адреса входа</span> </span></p>
<p>Откройте блокнот через <code translate="no">ingress_url</code>, дважды щелкните файл <code translate="no">TestMilvus.ipynb</code> на странице, чтобы опробовать Milvus. Выберите первую часть блока кода и нажмите кнопку <strong>Run</strong>, чтобы начать устанавливать соединение и инициализировать функцию встраивания.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>Запустите TestMilvus.ipynb в блокноте</span> </span></p>
<p>Установив соединение, продолжайте нажимать кнопку <strong>RUN</strong>. Код превратит фрагмент текста в векторные данные после обработки встраивания, а затем вставит его в Milvus.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>Затем используйте текст в качестве запроса: "Кто начал исследования ИИ?", выполнит запрос после обработки встраивания и, наконец, получит и отобразит наиболее релевантные результаты.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>Получение и отображение наиболее релевантных результатов</span> </span></p>
<p>Для получения дополнительной информации об использовании клиента Milvus вы можете обратиться к разделу <a href="/docs/ru/quickstart.md">Milvus Doc</a>.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. Очистка<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>После проверки вы можете использовать SnowSQL для очистки служб, ролей и ресурсов данных.</p>
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
<h2 id="About-Milvus" class="common-anchor-header">О Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Для получения дополнительной информации о Milvus вы можете начать с <a href="/docs/ru/overview.md">введения</a> и <a href="/docs/ru/quickstart.md">быстрого запуска</a> <a href="/docs/ru/overview.md">Milvus</a>. Конечно, есть более подробное введение в API, ссылки на версии для <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> и <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a>, а также информация о <a href="https://milvus.io/docs/embeddings.md">встраиваниях</a> и <a href="https://milvus.io/docs/integrate_with_openai.md">интеграциях</a> для справки.</p>
