---
id: authenticate.md
summary: Descubre cómo gestionar la autenticación de usuarios en Milvus.
title: Autenticación del acceso de los usuarios
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">Autenticación del acceso de los usuarios<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía explica cómo gestionar la autenticación de usuarios en Milvus, incluyendo cómo habilitar la autenticación, cómo conectarse como usuario y cómo modificar las credenciales de usuario.</p>
<div class="alert note">
<ul>
<li><p>TLS y la autenticación de usuarios son dos enfoques de seguridad distintos. Si ha habilitado tanto la autenticación de usuarios como TLS en su sistema Milvus, deberá proporcionar un nombre de usuario, una contraseña y las rutas de los archivos de certificados. Para obtener información sobre cómo habilitar TLS, consulte <a href="/docs/es/tls.md">«Cifrado en tránsito</a>».</p></li>
<li><p>Los fragmentos de código de esta página utilizan new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) para interactuar con Milvus. En futuras actualizaciones se lanzarán nuevos SDK de MilvusClient para otros lenguajes.</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">Habilitar la autenticación de usuario<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
    </button></h2><div class="filter">
 <a href="#docker">Docker Compose</a>
 <a href="#helm"> Helm</a>
 <a href="#operator"> Milvus Operator</a>
</div>
<div class="filter-docker">
<p>Para habilitar la autenticación de usuarios en su servidor Milvus, establezca common.security.authorizationEnabled en «true» en el archivo de configuración de Milvus <code translate="no">milvus.yaml</code>. Para obtener más información sobre las configuraciones, consulte <a href="https://milvus.io/docs/configure-docker.md?tab=component">«Configurar Milvus con Docker Compose</a>».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
<span class="hljs-string">...</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>Para habilitar la autenticación de usuarios en su servidor Milvus, establezca authorizationEnabled en «true» en el archivo de configuración de Milvus <code translate="no">values.yaml</code>. Para obtener más información sobre las configuraciones, consulte <a href="https://milvus.io/docs/configure-helm.md?tab=component">«Configurar Milvus con Helm Charts</a>».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        authorizationEnabled: true
</span><span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>Para habilitar la autenticación, establezca ` <code translate="no">spec.config.common.security.authorizationEnabled</code> ` en ` <code translate="no">true</code> ` en el CRD de ` <code translate="no">Milvus</code> `. Para obtener más información sobre el CRD de Milvus, consulte <a href="https://milvus.io/docs/configure_operator.md?tab=component">«Configurar Milvus con Milvus Operator</a>».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">Conectarse a Milvus con autenticación<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Tras habilitar la autenticación, deberá conectarse a Milvus utilizando un nombre de usuario y una contraseña. De forma predeterminada, al iniciar Milvus se crea el usuario « <code translate="no">root</code> » con la contraseña « <code translate="no">Milvus</code> ». A continuación se muestra un ejemplo de cómo conectarse a Milvus con la autenticación habilitada utilizando el usuario predeterminado « <code translate="no">root</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
) 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Si no se proporciona un token válido al conectarse a Milvus con la autenticación activada, se producirá un error de gRPC.
</div>
<h2 id="Create-a-new-user" class="common-anchor-header">Crear un nuevo usuario<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Mientras esté conectado como <code translate="no">root</code>, cree un usuario con <code translate="no">create_user()</code>. Elija una contraseña de entre 6 y 72 bytes UTF-8, a menos que su implementación utilice <a href="/docs/es/authenticate.md#Password-requirements">límites de longitud de contraseña</a> personalizados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre la creación de usuarios, consulta <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>.</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">Conéctese a Milvus con un nuevo usuario<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Conéctese utilizando las credenciales del usuario recién creado:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Update-user-password" class="common-anchor-header">Actualizar la contraseña de un usuario<button data-href="#Update-user-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Para cambiar la contraseña de un usuario, introduce la contraseña actual y una nueva que cumpla los mismos <a href="/docs/es/authenticate.md#Password-requirements">requisitos</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre cómo actualizar las contraseñas de los usuarios, consulta <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>.</p>
<p>Si olvidas tu contraseña anterior, Milvus ofrece una opción de configuración que te permite designar a determinados usuarios como superusuarios. De este modo, no es necesario introducir la contraseña anterior al restablecerla.</p>
<p>Por defecto, el campo « <code translate="no">common.security.superUsers</code> » del archivo de configuración de Milvus está vacío, lo que significa que todos los usuarios deben introducir la contraseña antigua al restablecerla. Sin embargo, puede designar a usuarios específicos como superusuarios que no necesiten introducir la contraseña antigua. En el fragmento de código siguiente, <code translate="no">root</code> y <code translate="no">foo</code> se designan como superusuarios.</p>
<p>Debes añadir el siguiente elemento de configuración en el archivo de configuración de Milvus que rige el funcionamiento de tu instancia de Milvus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
    <span class="hljs-attr">security:</span>
        <span class="hljs-attr">superUsers:</span> <span class="hljs-string">root,</span> <span class="hljs-string">foo</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">Eliminar un usuario<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Para eliminar un usuario, utiliza el método <code translate="no">drop_user()</code>.</p>
<pre><code translate="no" class="language-python">client.drop_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Para eliminar un usuario, no puede ser usted mismo el usuario que se va a eliminar. De lo contrario, se producirá un error.
</div>
<h2 id="List-all-users" class="common-anchor-header">Mostrar todos los usuarios<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostrar todos los usuarios.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Limitaciones<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Username-requirements" class="common-anchor-header">Requisitos del nombre de usuario<button data-href="#Username-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Los nombres de usuario no deben estar vacíos ni superar los 32 caracteres. Deben comenzar con una letra y contener únicamente letras, números o guiones bajos.</p>
<h3 id="Password-requirements" class="common-anchor-header">Requisitos de la contraseña<button data-href="#Password-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Por defecto, las contraseñas deben tener una longitud de entre 6 y 72 bytes UTF-8. Cada carácter ASCII ocupa un byte; los caracteres multibyte ocupan más de uno. Milvus no exige una combinación específica de mayúsculas, minúsculas, números o caracteres especiales.</p>
<p>Para cambiar los límites de longitud, configura <code translate="no">proxy.minPasswordLength</code> y <code translate="no">proxy.maxPasswordLength</code>. El máximo no puede superar los 72 bytes. Un valor de <code translate="no">proxy.maxPasswordLength</code> igual a cero o inferior, o superior a 72, se considera igual a 72. Para obtener instrucciones de configuración, consulta <a href="/docs/es/dynamic_config.md">«Configurar Milvus sobre la marcha</a>».</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Quizá también te interese aprender a:
<ul>
<li><a href="/docs/es/scaleout.md">Escalar un clúster de Milvus</a></li>
</ul></li>
<li>Si estás listo para implementar tu clúster en la nube:
<ul>
<li>Aprende a <a href="/docs/es/eks.md">implementar Milvus en Amazon EKS con Terraform</a></li>
<li>Aprende a <a href="/docs/es/gcp.md">implementar un clúster de Milvus en GCP con Kubernetes</a></li>
<li>Aprende a <a href="/docs/es/azure.md">implementar Milvus en Microsoft Azure con Kubernetes</a></li>
</ul></li>
</ul>
