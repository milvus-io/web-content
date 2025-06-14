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
<pre><code translate="no" class="language-shell">snowsql -a ${instance_name} -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>قاعدة <code translate="no">${instance_name}</code> هي <code translate="no">${org_name}-${acct_name}</code>. يمكن الحصول على المعلومات ذات الصلة عن طريق تسجيل الدخول إلى <a href="http://app.snowflake.com/sn">app.snowflake.com</a> والتحقق من معلومات الحساب الشخصي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>معلومات حساب Snowflake</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. تكوين الدور والامتيازات</h3><p>تكوين تكامل OAUTH.</p>
<pre><code translate="no" class="language-sql">USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">CREATE</span> SECURITY INTEGRATION SNOWSERVICES_INGRESS_OAUTH
  TYPE<span class="hljs-operator">=</span>oauth
  OAUTH_CLIENT<span class="hljs-operator">=</span>snowservices_ingress
  ENABLED<span class="hljs-operator">=</span><span class="hljs-literal">true</span>;
  
USE ROLE ACCOUNTADMIN;
<span class="hljs-keyword">GRANT</span> BIND SERVICE ENDPOINT <span class="hljs-keyword">ON</span> ACCOUNT <span class="hljs-keyword">TO</span> ROLE SYSADMIN;
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء دور للخدمة، لاحظ أن الجزء <code translate="no">${PASSWORD}</code> هنا يجب استبداله من قبل المستخدم عندما يكون العرض التوضيحي</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. إنشاء تكوين تخزين البيانات</h3><ul>
<li><p>إنشاء مستودع وقاعدة بيانات</p>
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
<li><p>منح امتيازات الدور</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> DATABASE MILVUS_DEMO <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> SCHEMA MILVUS_DEMO.PUBLIC <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> WAREHOUSE MILVUS_WAREHOUSE <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> STAGE MILVUS_DEMO.PUBLIC.FILES <span class="hljs-keyword">TO</span> MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تكوين ACL</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. إنشاء الصور</h3><p>يجب إنشاء الصورة المستخدمة من قبل Milvus محليًا ثم تحميلها من قبل المستخدم. للحصول على التكوين المناسب للصورة، يرجى الرجوع إلى <a href="https://github.com/dald001/milvus_on_spcs">هذا الريبو</a>. بعد استنساخ الشيفرة، انتقل إلى الدليل الجذر للمشروع واستعد لبناء الصورة.</p>
<ul>
<li><p>بناء الصور محليًا</p>
<p>افتح الصدفة المحلية وابدأ في بناء الصور.</p>
<pre><code translate="no" class="language-shell">cd ${repo_git_root_path}
docker build --rm --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --rm --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>هناك صورتان هنا، الأولى تقوم بتشغيل قاعدة بيانات Milvus، والثانية هي دفتر الملاحظات المستخدم للعرض.</p>
<p>بعد بناء الصور المحلية، استعد لتمييزها وتحميلها.</p></li>
<li><p>وسم الصور المبنية</p>
<p>قم بتسجيل الدخول إلى محور docker لـ SPCS.</p>
<pre><code translate="no" class="language-shell">docker login ${instance_name}.registry.snowflakecomputing.com -u ${user_name}
<button class="copy-code-btn"></button></code></pre>
<p>ويمكنك وضع علامة على الصور لـ spcs الآن.</p>
<pre><code translate="no" class="language-shell">docker tag milvus ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم <code translate="no">docker images | grep milvus</code> في الغلاف المحلي للتحقق مما إذا كانت الصورة قد تم تجميعها ووسمها بنجاح.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus
<span class="hljs-meta prompt_">
$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB</span>
<span class="hljs-meta prompt_">$</span><span class="language-bash">{instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ادفع الصور إلى SPCS</p>
<pre><code translate="no" class="language-shell">docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push ${instance_name}.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. إنشاء الخدمات وبدء تشغيلها</h3><p>دعنا نعود إلى قذيفة SnowSQL.</p>
<ul>
<li>إنشاء تجمعات الحوسبة</li>
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
<p>تحقق من تجمعات الحوسبة من خلال <code translate="no">DESCRIBE</code> حتى الحالة <code translate="no">ACTIVE</code> أو <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL MILVUS_COMPUTE_POOL;
<span class="hljs-keyword">DESCRIBE</span> COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>حالة تجمعات الحوسبة</span> </span></p>
<ul>
<li>تحميل ملفات المواصفات</li>
</ul>
<p>بعد إنشاء تجمع الحوسبة، ابدأ في إعداد ملف spce للخدمة. الملفات موجودة أيضًا في <a href="https://github.com/dald001/milvus_on_spcs">هذا الريبو</a>. يرجى الرجوع إلى دليل المواصفات.</p>
<p>افتح ملفات المواصفات الخاصة بهاتين الخدمتين، وابحث عن <code translate="no">${org_name}-${acct_name}</code> في ملف المواصفات، واستبدلها بـ ${instance_name} لحسابك الخاص. بعد التعديل، استخدم SnowSQL لإكمال التحميل.</p>
<pre><code translate="no" class="language-sql">PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>jupyter.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
PUT file:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>${path<span class="hljs-operator">/</span><span class="hljs-keyword">to</span><span class="hljs-operator">/</span>milvus.yaml} <span class="hljs-variable">@yaml_stage</span> overwrite<span class="hljs-operator">=</span><span class="hljs-literal">true</span> auto_compress<span class="hljs-operator">=</span><span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء الخدمة</li>
</ul>
<p>عند اكتمال التحميل، تكون جاهزًا لإنشاء الخدمة، تابع لإكمال عملية إنشاء الخدمة.</p>
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
<p>يمكن أيضًا عرض الخدمات من خلال <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SHOW</span> SERVICES;

<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> name    <span class="hljs-operator">|</span> database_name <span class="hljs-operator">|</span> schema_name <span class="hljs-operator">|</span> owner    <span class="hljs-operator">|</span> compute_pool         <span class="hljs-operator">|</span> dns_name                                               <span class="hljs-operator">|</span> ......
<span class="hljs-operator">|</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<span class="hljs-operator">|</span> JUPYTER <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> JUPYTER_COMPUTE_POOL <span class="hljs-operator">|</span> jupyter.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal <span class="hljs-operator">|</span> ...... 
<span class="hljs-operator">|</span> MILVUS  <span class="hljs-operator">|</span> MILVUS_DEMO   <span class="hljs-operator">|</span> PUBLIC      <span class="hljs-operator">|</span> SYSADMIN <span class="hljs-operator">|</span> MILVUS_COMPUTE_POOL  <span class="hljs-operator">|</span> milvus.public.milvus<span class="hljs-operator">-</span>demo.snowflakecomputing.internal  <span class="hljs-operator">|</span> ......
<span class="hljs-operator">+</span><span class="hljs-comment">---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------</span>
<button class="copy-code-btn"></button></code></pre>
<p>إذا واجهتك مشاكل في بدء الخدمة، يمكنك عرض معلومات الخدمة من خلال <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
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
<span class="hljs-keyword">GRANT</span> USAGE <span class="hljs-keyword">ON</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER <span class="hljs-keyword">TO</span> ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بعرض وتسجيل نقطة نهاية دفتر ملاحظات جوبيتر.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
<span class="hljs-keyword">SHOW</span> ENDPOINTS <span class="hljs-keyword">IN</span> SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>سجّل الجزء <code translate="no">ingress_url</code> من المعلومات، ثم افتح المتصفح وأدخل <code translate="no">ingress_url</code> ، استخدم حساب milvus_user لتسجيل الدخول إلى الموقع الإلكتروني.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>الحصول على عنوان URL للدخول</span> </span></p>
<p>افتح دفتر الملاحظات من خلال <code translate="no">ingress_url</code> ، انقر نقرًا مزدوجًا على ملف <code translate="no">TestMilvus.ipynb</code> على الصفحة لتجربة ميلفوس. حدد الجزء الأول من كتلة التعليمات البرمجية، وانقر فوق الزر <strong>تشغيل</strong> لبدء إنشاء الاتصال وتهيئة وظيفة التضمين.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>قم بتشغيل TestMilvus.ipynb في دفتر الملاحظات</span> </span></p>
<p>بعد إنشاء الاتصال، تابع النقر على <strong>تشغيل</strong>. سيقوم الرمز بتحويل جزء من النص إلى بيانات متجهة بعد معالجة التضمين، ثم إدراجه في ملفوس.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم نصًا كاستعلام: "، وإجراء الاستعلام بعد تضمين المعالجة، وأخيرًا الحصول على النتائج الأكثر صلة وعرضها.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>الحصول على النتائج الأكثر صلة وعرضها</span> </span></p>
<p>لمزيد من المعلومات حول استخدام عميل ميلفوس، يمكنك الرجوع إلى قسم <a href="/docs/ar/quickstart.md">مستند ميلفوس</a>.</p>
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
    </button></h2><p>لمزيد من المعلومات حول ميلفوس، يمكنك البدء <a href="/docs/ar/overview.md">بمقدمة ميلفوس</a> <a href="/docs/ar/quickstart.md">والبداية السريعة</a>. وبالطبع، هناك مقدمة أكثر تفصيلاً عن واجهة برمجة التطبيقات، وارجع إلى إصدارات <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> و <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java،</a> وهناك أيضًا معلومات حول <a href="https://milvus.io/docs/embeddings.md">التضمينات</a> <a href="https://milvus.io/docs/integrate_with_openai.md">والتكاملات</a> للرجوع إليها.</p>
