---
id: integrate_with_snowpark.md
summary: >-
  Esta guía muestra cómo iniciar una demostración de Milvus en los servicios de
  contenedores Snowpark.
title: Milvus en Snowpark Servicios de contenedores
---
<h1 id="Milvus-on-Snowpark-Container-Services" class="common-anchor-header">Milvus en los servicios de contenedores Snowpark<button data-href="#Milvus-on-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía muestra cómo iniciar una demostración de Milvus en los servicios de contenedores Snowpark.</p>
<h2 id="About-Snowpark-Container-Services" class="common-anchor-header">Acerca de Snowpark Container Services<button data-href="#About-Snowpark-Container-Services" class="anchor-icon" translate="no">
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
    </button></h2><p>Snowpark Container Services es una oferta de contenedores totalmente gestionados diseñada para facilitar el despliegue, la gestión y el escalado de aplicaciones en contenedores dentro del ecosistema Snowflake. Este servicio permite a los usuarios ejecutar cargas de trabajo en contenedores directamente dentro de Snowflake, asegurando que los datos no necesitan ser movidos fuera del entorno Snowflake para su procesamiento. Para más información, consulte la introducción oficial: <a href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview">Snowpark Container Services</a>.</p>
<h2 id="Configure-Milvus-demo" class="common-anchor-header">Configurar la demostración de Milvus<button data-href="#Configure-Milvus-demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo siguiente permitirá a los usuarios comprender las capacidades de Milvus y cómo utilizar Milvus en SPCS a través de la configuración y el código.</p>
<h3 id="1-Obtain-account-information" class="common-anchor-header">1. Obtener la información de la cuenta</h3><p>Descargue el cliente SPCS <a href="https://docs.snowflake.com/en/user-guide/snowsql-install-config">SnowSQL</a>, y a continuación inicie sesión en su cuenta.</p>
<pre><code translate="no" class="language-shell">snowsql -a <span class="hljs-variable">${instance_name}</span> -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>La regla de <code translate="no">${instance_name}</code> es <code translate="no">${org_name}-${acct_name}</code>. La información pertinente puede obtenerse iniciando sesión en <a href="http://app.snowflake.com/sn">app.snowflake.com</a> y comprobando la información de la cuenta personal.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-01.png" alt="Snowflake account information" class="doc-image" id="snowflake-account-information" />
   </span> <span class="img-wrapper"> <span>Información de la cuenta de copo de nieve</span> </span></p>
<h3 id="2-Configure-Role-and-privileges" class="common-anchor-header">2. Configurar rol y privilegios</h3><p>Configure la integración OAUTH.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">CREATE</span> <span class="hljs-variable constant_">SECURITY</span> <span class="hljs-variable constant_">INTEGRATION</span> <span class="hljs-variable constant_">SNOWSERVICES_INGRESS_OAUTH</span>
  <span class="hljs-variable constant_">TYPE</span>=oauth
  <span class="hljs-variable constant_">OAUTH_CLIENT</span>=snowservices_ingress
  <span class="hljs-variable constant_">ENABLED</span>=<span class="hljs-literal">true</span>;
  
<span class="hljs-variable constant_">USE</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">ACCOUNTADMIN</span>;
<span class="hljs-variable constant_">GRANT</span> <span class="hljs-variable constant_">BIND</span> <span class="hljs-variable constant_">SERVICE</span> <span class="hljs-variable constant_">ENDPOINT</span> <span class="hljs-variable constant_">ON</span> <span class="hljs-variable constant_">ACCOUNT</span> <span class="hljs-variable constant_">TO</span> <span class="hljs-variable constant_">ROLE</span> <span class="hljs-variable constant_">SYSADMIN</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Cree un rol para el servicio, tenga en cuenta que la parte <code translate="no">${PASSWORD}</code> aquí necesita ser reemplazada por el usuario cuando la demo sea</p>
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
<h3 id="3-Create-data-storage-configuration" class="common-anchor-header">3. Crear configuración de almacenamiento de datos</h3><ul>
<li><p>Crear almacén y base de datos</p>
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
<li><p>Conceder privilegios de rol</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT ALL PRIVILEGES ON DATABASE MILVUS_DEMO TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON SCHEMA MILVUS_DEMO.PUBLIC TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON WAREHOUSE MILVUS_WAREHOUSE TO MILVUS_ROLE;
GRANT ALL PRIVILEGES ON STAGE MILVUS_DEMO.PUBLIC.FILES TO MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurar ACL</p>
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
<h3 id="4-Create-images" class="common-anchor-header">4. Crear imágenes</h3><p>La imagen utilizada por Milvus necesita ser construida localmente y luego cargada por el usuario. Para la configuración pertinente de la imagen, consulte <a href="https://github.com/dald001/milvus_on_spcs">este repositorio</a>. Después de clonar el código, vaya al directorio raíz del proyecto y prepárese para construir la imagen.</p>
<ul>
<li><p>Construir imágenes localmente</p>
<p>Abre tu shell local y comienza a construir las imágenes.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> <span class="hljs-variable">${repo_git_root_path}</span>
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t milvus ./images/milvus
docker build --<span class="hljs-built_in">rm</span> --no-cache --platform linux/amd64 -t jupyter ./images/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>Hay dos imágenes aquí, la primera está ejecutando la base de datos Milvus, y el segundo es el cuaderno utilizado para la visualización.</p>
<p>Una vez construidas las imágenes locales, prepárese para etiquetarlas y subirlas.</p></li>
<li><p>Etiquetar las imágenes construidas</p>
<p>Inicie sesión en el docker hub de SPCS.</p>
<pre><code translate="no" class="language-shell">docker login <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com -u <span class="hljs-variable">${user_name}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Y ya puedes etiquetar imágenes para spcs.</p>
<pre><code translate="no" class="language-shell">docker tag milvus <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker tag jupyter <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, utilice <code translate="no">docker images | grep milvus</code> en el shell local para comprobar si la imagen se ha empaquetado y etiquetado correctamente.</p>
<pre><code translate="no" class="language-shell">docker images | grep milvus

<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus    latest        3721bbb8f62b   2 days ago    2.95GB
<span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter   latest        20633f5bcadf   2 days ago    2GB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Empujar imágenes a SPCS</p>
<pre><code translate="no" class="language-shell">docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/milvus
docker push <span class="hljs-variable">${instance_name}</span>.registry.snowflakecomputing.com/milvus_demo/public/milvus_repo/jupyter
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="5-Create-and-start-services" class="common-anchor-header">5. Crear e iniciar servicios</h3><p>Volvamos al shell SnowSQL.</p>
<ul>
<li>Crear pools de computación</li>
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
<p>Compruebe los pools de computación a través de <code translate="no">DESCRIBE</code> hasta que el estado sea <code translate="no">ACTIVE</code> o <code translate="no">IDLE</code>.</p>
<pre><code translate="no" class="language-sql">DESCRIBE COMPUTE POOL MILVUS_COMPUTE_POOL;
DESCRIBE COMPUTE POOL JUPYTER_COMPUTE_POOL;
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-02.png" alt="Compute pool status" class="doc-image" id="compute-pool-status" />
   </span> <span class="img-wrapper"> <span>Estado de los pools</span> </span>de <span class="img-wrapper"> <span>computación</span> </span></p>
<ul>
<li>Cargar archivos de especificaciones</li>
</ul>
<p>Después de crear el compute pool, comience a preparar el archivo spce para el servicio. Los archivos también se encuentran en <a href="https://github.com/dald001/milvus_on_spcs">este repositorio</a>. Consulte el directorio de especificaciones.</p>
<p>Abra los archivos spec de estos dos servicios, busque <code translate="no">${org_name}-${acct_name}</code> en el archivo spec y sustitúyalo por ${instance_name} de su propia cuenta. Después de la modificación, utilice SnowSQL para completar la carga.</p>
<pre><code translate="no" class="language-sql">PUT file://<span class="hljs-variable">${path/to/jupyter.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
PUT file://<span class="hljs-variable">${path/to/milvus.yaml}</span> @yaml_stage overwrite=<span class="hljs-literal">true</span> auto_compress=<span class="hljs-literal">false</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Crear servicio</li>
</ul>
<p>Cuando la carga se haya completado, usted está listo para crear el servicio, Continuar para completar el proceso de creación del servicio.</p>
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
<p>Los servicios también pueden visualizarse a través de <code translate="no">SHOW SERVICES;</code>.</p>
<pre><code translate="no" class="language-sql">SHOW SERVICES;

+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| name    | database_name | schema_name | owner    | compute_pool         | dns_name                                               | ......
|---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
| JUPYTER | MILVUS_DEMO   | PUBLIC      | SYSADMIN | JUPYTER_COMPUTE_POOL | jupyter.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span> | ...... 
| MILVUS  | MILVUS_DEMO   | PUBLIC      | SYSADMIN | MILVUS_COMPUTE_POOL  | milvus.<span class="hljs-keyword">public</span>.milvus-demo.snowflakecomputing.<span class="hljs-keyword">internal</span>  | ......
+---------+---------------+-------------+----------+----------------------+--------------------------------------------------------+-----------------
<button class="copy-code-btn"></button></code></pre>
<p>Si tiene problemas para iniciar el servicio, puede ver la información del servicio a través de <code translate="no">CALL SYSTEM$GET_SERVICE_STATUS('milvus');</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-03.png" alt="Service status" class="doc-image" id="service-status" />
   </span> <span class="img-wrapper"> <span>Estado del servicio</span> </span></p>
<p>Puede obtener más información a través de <code translate="no">CALL SYSTEM$GET_SERVICE_LOGS('milvus', '0', 'milvus', 10);</code>.</p>
<h2 id="Use-Notebook" class="common-anchor-header">Utilizar Notebook<button data-href="#Use-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice <strong>SnowSQL</strong> para conceder permisos.</p>
<pre><code translate="no" class="language-sql">USE ROLE SECURITYADMIN;
GRANT USAGE ON SERVICE MILVUS_DEMO.PUBLIC.JUPYTER TO ROLE MILVUS_ROLE;
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, visualice y registre el punto final del nootbook Jupyter.</p>
<pre><code translate="no" class="language-sql">USE ROLE SYSADMIN;
SHOW ENDPOINTS IN SERVICE MILVUS_DEMO.PUBLIC.JUPYTER;
<button class="copy-code-btn"></button></code></pre>
<p>Registre la parte <code translate="no">ingress_url</code> de la información, a continuación, abra el navegador y entre en <code translate="no">ingress_url</code>, utilice la cuenta milvus_user para iniciar sesión en el sitio web.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-04.png" alt="Obtain the ingress URL" class="doc-image" id="obtain-the-ingress-url" />
   </span> <span class="img-wrapper"> <span>Obtener la URL de entrada</span> </span></p>
<p>Abra el cuaderno a través de <code translate="no">ingress_url</code>, haga doble clic en el archivo <code translate="no">TestMilvus.ipynb</code> de la página para probar Milvus. Seleccione la primera parte del bloque de código y haga clic en el botón <strong>Ejecutar</strong> para empezar a establecer la conexión e inicializar la función de incrustación.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-05.png" alt="Run TestMilvus.ipynb in the notebook" class="doc-image" id="run-testmilvus.ipynb-in-the-notebook" />
   </span> <span class="img-wrapper"> <span>Ejecute TestMilvus.ipynb en el bloc de notas</span> </span></p>
<p>Después de establecer la conexión, continúe haciendo clic en <strong>EJECUTAR</strong>. El código convertirá un trozo de texto en datos vectoriales después del procesamiento de incrustación, y luego lo insertará en Milvus.</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, utilice un texto como consulta: &quot;¿Quién inició la investigación en IA?&quot;, realice la consulta tras el procesamiento de incrustación y, por último, obtenga y muestre los resultados más relevantes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/snowflake-06.png" alt="Obtain and display the most relevant results" class="doc-image" id="obtain-and-display-the-most-relevant-results" />
   </span> <span class="img-wrapper"> <span>Obtener y mostrar los resultados más relevantes</span> </span></p>
<p>Para más información sobre el uso del cliente Milvus, puede consultar la sección <a href="/docs/es/v2.4.x/quickstart.md">Milvus Doc.</a> </p>
<h2 id="7-Clean-up" class="common-anchor-header">7. Limpieza<button data-href="#7-Clean-up" class="anchor-icon" translate="no">
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
    </button></h2><p>Tras la verificación, puede utilizar SnowSQL para limpiar los servicios, roles y recursos de datos.</p>
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
<h2 id="About-Milvus" class="common-anchor-header">Acerca de Milvus<button data-href="#About-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Para más información sobre Milvus, puede empezar con la <a href="/docs/es/v2.4.x/overview.md">introducción a Milvus</a> y el <a href="/docs/es/v2.4.x/quickstart.md">inicio rápido</a>. Por supuesto, hay una introducción más detallada a la API, consulte las versiones <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">Python</a> y <a href="https://milvus.io/api-reference/java/v2.3.x/About.md">Java</a>, y también hay información sobre <a href="https://milvus.io/docs/embeddings.md">Embeddings</a> e <a href="https://milvus.io/docs/integrate_with_openai.md">Integraciones</a> como referencia.</p>
