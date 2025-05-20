---
id: rbac.md
related_key: enable RBAC
summary: 'Apprendre à gérer les utilisateurs, les rôles et les privilèges.'
title: Activer RBAC
---
<h1 id="Enable-RBAC" class="common-anchor-header">Activer RBAC<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>En activant RBAC, vous pouvez contrôler l'accès à des ressources Milvus spécifiques (par exemple, une collection ou une partition) ou les autorisations en fonction du rôle et des privilèges de l'utilisateur. Actuellement, cette fonctionnalité n'est disponible qu'en Python et Java.</p>
<p>Cette rubrique décrit comment activer RBAC et gérer les <a href="/docs/fr/v2.4.x/users_and_roles.md">utilisateurs et les rôles</a>.</p>
<div class="alert note">
<p>Les extraits de code de cette page utilisent le nouveau <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) pour interagir avec Milvus. De nouveaux SDK MilvusClient pour d'autres langages seront publiés dans de futures mises à jour.</p>
</div>
<h2 id="1-Initiate-a-Milvus-client-to-establish-a-connection" class="common-anchor-header">1. Lancer un client Milvus pour établir une connexion<button data-href="#1-Initiate-a-Milvus-client-to-establish-a-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir activé l'<a href="/docs/fr/v2.4.x/authenticate.md">authentification utilisateur</a>, connectez-vous à votre instance Milvus à l'aide de <code translate="no">token</code> qui se compose d'un nom d'utilisateur et d'un mot de passe. Par défaut, Milvus utilise l'utilisateur <code translate="no">root</code> avec le mot de passe <code translate="no">Milvus</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span> <span class="hljs-comment"># replace with your own Milvus server token</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-user" class="common-anchor-header">2. Créer un utilisateur<button data-href="#2-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Créez un utilisateur nommé <code translate="no">user_1</code> avec le mot de passe <code translate="no">P@ssw0rd</code>:</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_user</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir créé un utilisateur, vous pouvez :</p>
<ul>
<li>Mettre à jour le mot de passe d'un utilisateur. Vous devez fournir le mot de passe original et le nouveau mot de passe.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">update_password</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    old_password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
    new_password=<span class="hljs-string">&#x27;P@ssw0rd123&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Dresser la liste de tous les utilisateurs.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_users()

<span class="hljs-comment"># output:</span>
<span class="hljs-comment"># [&#x27;root&#x27;, &#x27;user_1&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Vérifier le rôle d'un utilisateur particulier.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_user(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: ()}
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Create-a-role" class="common-anchor-header">3. Créez un rôle<button data-href="#3-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant crée un rôle nommé <code translate="no">roleA</code>.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_role</span>(
    role_name=<span class="hljs-string">&quot;roleA&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir créé un rôle, vous pouvez</p>
<ul>
<li>dresser la liste de tous les rôles.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_roles()

# output:
# [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;public&#x27;</span>, <span class="hljs-string">&#x27;roleA&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Grant-a-privilege-to-a-role" class="common-anchor-header">4. Accorder un privilège à un rôle<button data-href="#4-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant montre comment accorder l'autorisation de rechercher toutes les collections au rôle nommé <code translate="no">roleA</code>.</p>
<p>L'adresse <code translate="no">object_type</code> spécifie le type d'objet, qui peut également être considéré comme le type de ressource. Actuellement, les valeurs valables sont Collection/User/Global, etc., où Global signifie qu'il n'y a pas de type de ressource spécifique. L'adresse <code translate="no">object_name</code> est le nom de la ressource. Si objecttype<em>est Collection, le nom de l'objet peut faire référence à un nom de collection spécifique, ou vous pouvez utiliser * pour spécifier toutes les collections. Si</em>le type d'objet est Global, le nom de l'objet ne peut être spécifié que par *. Voir <a href="/docs/fr/v2.4.x/users_and_roles.md">Utilisateurs et rôles</a> pour connaître les autres types de privilèges que vous pouvez accorder.</p>
<p>Avant de gérer les privilèges des rôles, assurez-vous d'avoir activé l'authentification des utilisateurs. Dans le cas contraire, une erreur risque de se produire. Pour plus d'informations sur l'activation de l'authentification des utilisateurs, reportez-vous à la section <a href="/docs/fr/v2.4.x/authenticate.md">Authentifier l'accès des utilisateurs</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant privilege to a role</span>

client.grant_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir accordé un privilège à un rôle, vous pouvez</p>
<ul>
<li>Afficher les privilèges accordés à un rôle.</li>
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
<h2 id="5-Grant-a-role-to-a-user" class="common-anchor-header">5. Accorder un rôle à un utilisateur<button data-href="#5-Grant-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Accorder le rôle à un utilisateur afin que celui-ci puisse hériter de tous les privilèges du rôle.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant a role to a user</span>

client.grant_role(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir accordé le rôle, vérifiez qu'il a bien été accordé :</p>
<pre><code translate="no" class="language-python">client.describe_user(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: (<span class="hljs-string">&#x27;roleA&#x27;</span>)}
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Revoke-privileges" class="common-anchor-header">6. Révoquer des privilèges<button data-href="#6-Revoke-privileges" class="anchor-icon" translate="no">
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
<p>Soyez prudent lorsque vous effectuez les opérations suivantes, car elles sont irréversibles.</p>
</div>
<ul>
<li>Supprimer un privilège d'un rôle. Si vous révoquez un privilège qui n'a pas été accordé au rôle, une erreur se produit.</li>
</ul>
<pre><code translate="no" class="language-python">client.revoke_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Supprimer un utilisateur d'un rôle. Si vous révoquez un rôle qui n'a pas été accordé à l'utilisateur, une erreur se produit.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">revoke_role</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Supprimer un rôle.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_role</span>(role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Supprimer un utilisateur.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Apprendre à gérer l'<a href="/docs/fr/v2.4.x/authenticate.md">authentification des utilisateurs</a>.</p></li>
<li><p>Apprendre à activer le <a href="/docs/fr/v2.4.x/tls.md">proxy TLS</a> dans Milvus.</p></li>
</ul>
