---
id: rbac.md
related_key: enable RBAC
summary: 'Aprenda a gestionar usuarios, funciones y privilegios.'
title: Habilitar RBAC
---
<h1 id="Enable-RBAC" class="common-anchor-header">Habilitar RBAC<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>Habilitando RBAC, puede controlar el acceso a recursos específicos de Milvus (Ej. una colección o una partición) o permisos basados en el rol y privilegios del usuario. Actualmente, esta característica sólo está disponible en Python y Java.</p>
<p>Este tema describe cómo habilitar RBAC y gestionar <a href="/docs/es/v2.4.x/users_and_roles.md">usuarios y roles</a>.</p>
<div class="alert note">
<p>Los fragmentos de código de esta página utilizan el nuevo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) para interactuar con Milvus. En futuras actualizaciones se publicarán nuevos SDK de MilvusClient para otros lenguajes.</p>
</div>
<h2 id="1-Initiate-a-Milvus-client-to-establish-a-connection" class="common-anchor-header">1. Inicie un cliente Milvus para establecer una conexión<button data-href="#1-Initiate-a-Milvus-client-to-establish-a-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de habilitar la <a href="/docs/es/v2.4.x/authenticate.md">autenticación de usuario</a>, conéctese a su instancia Milvus utilizando <code translate="no">token</code> que consiste en un nombre de usuario y una contraseña. Por defecto, Milvus utiliza el usuario <code translate="no">root</code> con la contraseña <code translate="no">Milvus</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span> <span class="hljs-comment"># replace with your own Milvus server token</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-user" class="common-anchor-header">2. Cree un usuario<button data-href="#2-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Cree un usuario llamado <code translate="no">user_1</code> con la contraseña <code translate="no">P@ssw0rd</code>:</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_user</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Después de crear un usuario, puede:</p>
<ul>
<li>Actualizar la contraseña de un usuario. Debe proporcionar tanto la contraseña original como la nueva.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">update_password</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    old_password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
    new_password=<span class="hljs-string">&#x27;P@ssw0rd123&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Listar todos los usuarios.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_users()

<span class="hljs-comment"># output:</span>
<span class="hljs-comment"># [&#x27;root&#x27;, &#x27;user_1&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Comprobar el rol de un usuario en particular.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_user(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: ()}
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Create-a-role" class="common-anchor-header">3. Crear un rol<button data-href="#3-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo crea un rol llamado <code translate="no">roleA</code>.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_role</span>(
    role_name=<span class="hljs-string">&quot;roleA&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Después de crear un rol, puede:</p>
<ul>
<li>Listar todos los roles.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_roles()

# output:
# [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;public&#x27;</span>, <span class="hljs-string">&#x27;roleA&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Grant-a-privilege-to-a-role" class="common-anchor-header">4. 4. Conceder un privilegio a un rol<button data-href="#4-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo muestra cómo conceder el permiso de búsqueda en todas las colecciones al rol denominado <code translate="no">roleA</code>.</p>
<p>En <code translate="no">object_type</code> se especifica el tipo de objeto, que también puede entenderse como el tipo de recurso. Actualmente, los valores válidos incluyen Colección/Usuario/Global, etc., donde Global significa que no hay un tipo de recurso específico. <code translate="no">object_name</code> es el nombre del recurso. Si objecttype<em>es Collection, entonces el nombre del objeto puede referirse a un nombre de colección específico, o puede utilizar * para especificar todas las colecciones. Si objecttype</em>es Global, entonces el nombre del objeto sólo puede especificarse como *. Consulte <a href="/docs/es/v2.4.x/users_and_roles.md">Usuarios y roles</a> para conocer otros tipos de privilegios que puede conceder.</p>
<p>Antes de gestionar privilegios de rol, asegúrese de que ha activado la autenticación de usuario. De lo contrario, puede producirse un error. Para obtener información sobre cómo activar la autenticación de usuarios, consulte <a href="/docs/es/v2.4.x/authenticate.md">Autenticar el acceso de usuarios</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant privilege to a role</span>

client.grant_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Después de conceder un privilegio a un rol, puede:</p>
<ul>
<li>Ver los privilegios concedidos a un rol.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_role(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;role&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#  <span class="hljs-string">&#x27;privileges&#x27;</span>: [{<span class="hljs-string">&#x27;object_type&#x27;</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
#    <span class="hljs-string">&#x27;object_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
#    <span class="hljs-string">&#x27;db_name&#x27;</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
#    <span class="hljs-string">&#x27;role_name&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#    <span class="hljs-string">&#x27;privilege&#x27;</span>: <span class="hljs-string">&#x27;SelectUser&#x27;</span>,
#    <span class="hljs-string">&#x27;grantor_name&#x27;</span>: <span class="hljs-string">&#x27;root&#x27;</span>}]}
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Grant-a-role-to-a-user" class="common-anchor-header">5. Conceder un rol a un usuario<button data-href="#5-Grant-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Conceder el rol a un usuario para que éste pueda heredar todos los privilegios del rol.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant a role to a user</span>

client.grant_role(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Después de conceder el rol, verificar que se ha concedido:</p>
<pre><code translate="no" class="language-python">client.describe_user(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: (<span class="hljs-string">&#x27;roleA&#x27;</span>)}
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Revoke-privileges" class="common-anchor-header">6. Revocar privilegios<button data-href="#6-Revoke-privileges" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert caution">
<p>Tenga cuidado al realizar las siguientes operaciones, ya que son irreversibles.</p>
</div>
<ul>
<li>Eliminar un privilegio de un rol. Si revoca un privilegio que no se ha concedido al rol, se producirá un error.</li>
</ul>
<pre><code translate="no" class="language-python">client.revoke_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Eliminar un usuario de un rol. Si revoca un rol que no ha sido concedido al usuario, se producirá un error.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">revoke_role</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Eliminar un rol.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_role</span>(role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Dar de baja a un usuario.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Aprenda a gestionar <a href="/docs/es/v2.4.x/authenticate.md">la autenticación de usuarios</a>.</p></li>
<li><p>Aprenda a habilitar <a href="/docs/es/v2.4.x/tls.md">el proxy TLS</a> en Milvus.</p></li>
</ul>
