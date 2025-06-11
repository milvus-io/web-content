---
id: integrate_with_snowpark.md
summary: يوضح هذا الدليل كيفية بدء عرض Milvus التجريبي على خدمات حاوية Snowpark.
title: ميلفوس على خدمات حاويات Snowpark
---

<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">ميلفوس على خدمات حاويات Snowpark<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا الدليل كيفية بدء عرض Milvus التجريبي على خدمات حاويات Snowpark.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">حول Snowpark Container Services<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>خدمات حاويات Snowpark Container Services عبارة عن عرض حاويات مُدار بالكامل مصمم لتسهيل نشر التطبيقات المعبأة في حاويات وإدارتها وتوسيع نطاقها داخل نظام Snowflake البيئي. تمكّن هذه الخدمة المستخدمين من تشغيل أعباء العمل في حاويات مباشرةً داخل Snowflake، مما يضمن عدم الحاجة إلى نقل البيانات خارج بيئة Snowflake للمعالجة. لمزيد من المعلومات، يرجى الرجوع إلى المقدمة الرسمية: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">خدمات Snowpark Container Services</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">تكوين عرض ميلفوس التجريبي<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>سيتيح ما يلي للمستخدمين فهم إمكانيات Milvus وكيفية استخدام Milvus في SPCS من خلال التكوين والتعليمات البرمجية.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. الحصول على معلومات الحساب</h3><p>قم بتنزيل عميل SPCS: <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL،</a> ثم قم بتسجيل الدخول إلى حسابك.</p>
<pre><code translate="no" class="language-shell">snowsql -a <span class="hljs-variable">${instance_name}</span> -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>قاعدة <code translate="no">${instance_name}</code> هي <code translate="no">${org_name}-${acct_name}</code>. يمكن الحصول على المعلومات ذات الصلة عن طريق تسجيل الدخول إلى <a href="http://app.snowflake.com/sn">app.snowflake.com</a> والتحقق من معلومات الحساب الشخصي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>معلومات حساب Snowflake</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. تكوين الدور والامتيازات</h3><p>تكوين تكامل OAUTH.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">CREATE</span> <span class="hljs-variable constant_">SECURITY</span> <span class="hljs-variable constant_">INTEGRATION</span> <span class="hljs-variable constant_">SNOWSERVICES_INGRESS_OAUTH</span>
  <span class="hljs-variable constant_">TYPE</span>=oauth
  <span class="hljs-variable constant_">OAUTH_CLIENT</span>=snowservices_ingress
  <span class="hljs-variable constant_">ENABLED</span>=<span class="hljs-literal">true</span>;
  
<span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">GRANT</span> <span class="hljs-variable constant_">BIND</span> <span class="hljs-variable constant_">SERVICE</span> <span class="hljs-variable constant_">ENDPOINT</span> <span class="hljs-variable constant_">ON</span> <span class="hljs-variable constant_">ACCOUNT</span> <span class="hljs-variable constant_">TO</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">SYSADMIN</span>;
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء دور للخدمة، لاحظ أن الجزء <code translate="no">${PASSWORD}</code> هنا يجب استبداله من قبل المستخدم عندما يكون العرض التوضيحي</p>
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

<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. إنشاء تكوين تخزين البيانات</h3><ul>
<li><p>إنشاء مستودع وقاعدة بيانات</p>
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

<li><p>منح امتيازات الدور</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT ALL PRIVILEGES ON DATABASE MILVUS_DEMO TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON SCHEMA MILVUS_DEMO.PUBLIC TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON WAREHOUSE MILVUS_WAREHOUSE TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON STAGE MILVUS_DEMO.PUBLIC.FILES TO MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تكوين ACL</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. إنشاء الصور</h3><p>يجب إنشاء الصورة المستخدمة من قبل Milvus محليًا ثم تحميلها من قبل المستخدم. للحصول على التكوين المناسب للصورة، يرجى الرجوع إلى <a href="https://github.com/dald001/milvus_on_spcs">هذا الريبو</a>. بعد استنساخ الشيفرة، انتقل إلى الدليل الجذر للمشروع واستعد لبناء الصورة.</p>
<ul>
<li><p>بناء الصور محليًا</p>
<p>افتح الصدفة المحلية وابدأ في بناء الصور.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> <span class="hljs-variable">${repo_git_root_path}</span>
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>هناك صورتان هنا، الأولى تقوم بتشغيل قاعدة بيانات Milvus، والثانية هي دفتر الملاحظات المستخدم للعرض.</p>
<p>بعد بناء الصور المحلية، استعد لتمييزها وتحميلها.</p></li>
<li><p>وسم الصور المبنية</p>
<p>قم بتسجيل الدخول إلى محور docker لـ SPCS.</p>
<pre><code translate="no" class="language-shell">docker login <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>ويمكنك وضع علامة على الصور لـ spcs الآن.</p>
<pre><code translate="no" class="language-shell">docker tag milvus <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم <code translate="no">docker images | grep milvus</code> في الغلاف المحلي للتحقق مما إذا كانت الصورة قد تم تجميعها ووسمها بنجاح.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus

<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB
<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter latest 20633f5bcadf 2 days ago 2GB
<button class="copy-code-btn"></button></code></pre></li>

<li><p>ادفع الصور إلى SPCS</p>
<pre><code translate="no" class="language-shell">docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. إنشاء الخدمات وبدء تشغيلها</h3><p>دعنا نعود إلى قذيفة SnowSQL.</p>
<ul>
<li>إنشاء تجمعات الحوسبة</li>
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
<p>تحقق من تجمعات الحوسبة من خلال <code translate="no">DESCRIBE</code> حتى الحالة <code translate="no">ACTIVE</code> أو <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql">DESCRIBE COMPUTE POOL MILVUS_COMPUTE_POOL;
DESCRIBE COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>حالة تجمعات الحوسبة</span> </span></p>
<ul>
<li>تحميل ملفات المواصفات</li>
</ul>
<p>بعد إنشاء تجمع الحوسبة، ابدأ في إعداد ملف spce للخدمة. الملفات موجودة أيضًا في <a href="https://github.com/dald001/milvus_on_spcs">هذا الريبو</a>. يرجى الرجوع إلى دليل المواصفات.</p>
<p>افتح ملفات المواصفات الخاصة بهاتين الخدمتين، وابحث عن <code translate="no">${org_name}-${acct_name}</code> في ملف المواصفات، واستبدلها بـ ${instance_name} لحسابك الخاص. بعد التعديل، استخدم SnowSQL لإكمال التحميل.</p>
<pre><code translate="no" class="language-sql">PUT file://<span class="hljs-variable">${path/to/jupyter.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
PUT file://<span class="hljs-variable">${path/to/milvus.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء الخدمة</li>
</ul>
<p>عند اكتمال التحميل، تكون جاهزًا لإنشاء الخدمة، تابع لإكمال عملية إنشاء الخدمة.</p>
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

<p>يمكن أيضًا عرض الخدمات من خلال <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql">SHOW SERVICES;

+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| name | database_name | schema_name | owner | compute_pool | dns_name | ......
|---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| JUPYTER | MILVUS_DEMO | PUBLIC | SYSADMIN | JUPYTER_COMPUTE_POOL | jupyter.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ......
| MILVUS | MILVUS_DEMO | PUBLIC | SYSADMIN | MILVUS_COMPUTE_POOL | milvus.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ......
+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
<button class="copy-code-btn"></button></code></pre>

<p>إذا واجهتك مشاكل في بدء الخدمة، يمكنك عرض معلومات الخدمة من خلال <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>حالة الخدمة</span> </span></p>
<p>يمكن الحصول على مزيد من المعلومات من خلال <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">استخدام دفتر الملاحظات<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم <strong>SnowSQL</strong> لمنح الأذونات.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT USAGE ON SERVICE MILVUS_DEMO.PUBLIC.JUPYTER TO ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بعرض وتسجيل نقطة نهاية دفتر ملاحظات جوبيتر.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
SHOW ENDPOINTS IN SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>سجّل الجزء <code translate="no">ingress_url</code> من المعلومات، ثم افتح المتصفح وأدخل <code translate="no">ingress_url</code> ، استخدم حساب milvus_user لتسجيل الدخول إلى الموقع الإلكتروني.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>الحصول على عنوان URL للدخول</span> </span></p>
<p>افتح دفتر الملاحظات من خلال <code translate="no">ingress_url</code> ، انقر نقرًا مزدوجًا على ملف <code translate="no">TestMilvus.ipynb</code> على الصفحة لتجربة ميلفوس. حدد الجزء الأول من كتلة التعليمات البرمجية، وانقر فوق الزر <strong>تشغيل</strong> لبدء إنشاء الاتصال وتهيئة وظيفة التضمين.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>قم بتشغيل TestMilvus.ipynb في دفتر الملاحظات</span> </span></p>
<p>بعد إنشاء الاتصال، تابع النقر على <strong>تشغيل</strong>. سيقوم الرمز بتحويل جزء من النص إلى بيانات متجهة بعد معالجة التضمين، ثم إدراجه في ملفوس.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم نصًا كاستعلام: &quot;من بدأ أبحاث الذكاء الاصطناعي؟&quot;، وقم بإجراء الاستعلام بعد تضمين المعالجة، وأخيرًا الحصول على النتائج الأكثر صلة وعرضها.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>الحصول على النتائج الأكثر صلة وعرضها</span> </span></p>
<p>لمزيد من المعلومات حول استخدام عميل ميلفوس، يمكنك الرجوع إلى قسم <a href="/docs/ar/v2.5.x/quickstart.md">مستند ميلفوس</a>.</p>
<h2 id="7-Clean-up" class="common-anchor-header">7. التنظيف<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد التحقق، يمكنك استخدام SnowSQL لتنظيف الخدمات والأدوار وموارد البيانات.</p>
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

<h2 id="About-Milvus" class="common-anchor-header">حول ملفوس<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>لمزيد من المعلومات حول ميلفوس، يمكنك البدء <a href="/docs/ar/v2.5.x/overview.md">بمقدمة ميلفوس</a> <a href="/docs/ar/v2.5.x/quickstart.md">والبداية السريعة</a>. وبالطبع، هناك مقدمة أكثر تفصيلاً عن واجهة برمجة التطبيقات، وارجع إلى إصدارات <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> و <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java،</a> وهناك أيضًا معلومات حول <a href="https://milvus.io/docs/embeddings.md">التضمينات</a> <a href="https://milvus.io/docs/integrate_with_openai.md">والتكاملات</a> للرجوع إليها.</p>
