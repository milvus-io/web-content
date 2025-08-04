---
id: users_and_roles.md
title: Créer des utilisateurs et des rôles
summary: >-
  Milvus permet un contrôle d'accès précis par le biais de RBAC. Vous pouvez
  commencer par créer des utilisateurs et des rôles, puis attribuer des
  privilèges ou des groupes de privilèges aux rôles, et enfin gérer le contrôle
  d'accès en accordant des rôles aux utilisateurs. Cette méthode garantit
  l'efficacité et la sécurité de la gestion des accès. Cette page explique
  comment créer des utilisateurs et des rôles dans Milvus.
---
<h1 id="Create-Users--Roles" class="common-anchor-header">Créer des utilisateurs et des rôles<button data-href="#Create-Users--Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus permet un contrôle d'accès précis grâce à la méthode RBAC. Vous pouvez commencer par créer des utilisateurs et des rôles, puis attribuer des privilèges ou des groupes de privilèges aux rôles, et enfin gérer le contrôle d'accès en accordant des rôles aux utilisateurs. Cette méthode garantit l'efficacité et la sécurité de la gestion des accès. Cette page présente la création d'utilisateurs et de rôles dans Milvus.</p>
<h2 id="User" class="common-anchor-header">Utilisateur<button data-href="#User" class="anchor-icon" translate="no">
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
    </button></h2><p>Après l'initialisation d'une instance Milvus, un utilisateur racine est automatiquement généré pour l'authentification lors de la première connexion à Milvus. Le nom d'utilisateur de l'utilisateur racine est <code translate="no">root</code> et le mot de passe est <code translate="no">Milvus</code>. Le rôle par défaut de l'utilisateur racine est <code translate="no">admin</code>, qui a accès à toutes les ressources. Pour garantir la sécurité des données, veuillez conserver les informations d'identification de l'utilisateur racine afin d'éviter tout accès non autorisé.</p>
<p>Pour les opérations quotidiennes, nous recommandons de créer des utilisateurs au lieu d'utiliser l'utilisateur racine.</p>
<h3 id="Create-a-user" class="common-anchor-header">Créer un utilisateur</h3><p>L'exemple suivant montre comment créer un utilisateur avec le nom d'utilisateur <code translate="no">user_1</code> et le mot de passe <code translate="no">P@ssw0rd</code>. Le nom d'utilisateur et le mot de passe de l'utilisateur doivent respecter les règles suivantes :</p>
<ul>
<li><p>Nom d'utilisateur : doit commencer par une lettre et ne peut inclure que des lettres majuscules ou minuscules, des chiffres et des traits de soulignement.</p></li>
<li><p>Mot de passe : il doit être composé de 8 à 64 caractères et doit inclure trois des éléments suivants : lettres majuscules, lettres minuscules, chiffres et caractères spéciaux.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>, password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateUserReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
        
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">CreateUserReq</span> <span class="hljs-variable">createUserReq</span> <span class="hljs-operator">=</span> CreateUserReq.builder()
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)
        .build();
        
client.createUser(createUserReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.CreateUser(ctx, milvusclient.NewCreateUserOption(<span class="hljs-string">&quot;user_1&quot;</span>, <span class="hljs-string">&quot;P@ssw0rd&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createUser</span>({
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;userName&quot;: &quot;user_1&quot;,
    &quot;password&quot;: &quot;P@ssw0rd&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Update-password" class="common-anchor-header">Mise à jour du mot de passe</h3><p>Après avoir créé un utilisateur, vous pouvez mettre à jour le mot de passe en cas d'oubli.</p>
<p>Le nouveau mot de passe doit également respecter la règle suivante :</p>
<ul>
<li>Il doit être composé de 8 à 64 caractères et inclure trois des éléments suivants : lettres majuscules, lettres minuscules, chiffres et caractères spéciaux.</li>
</ul>
<p>L'exemple suivant montre comment mettre à jour le mot de passe de l'utilisateur <code translate="no">user_1</code> en <code translate="no">NewP@ssw0rd</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.UpdatePasswordReq;

<span class="hljs-type">UpdatePasswordReq</span> <span class="hljs-variable">updatePasswordReq</span> <span class="hljs-operator">=</span> UpdatePasswordReq.builder()
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)
        .newPassword(<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>)
        .build();
client.updatePassword(updatePasswordReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.UpdatePassword(ctx, milvusclient.NewUpdatePasswordOption(<span class="hljs-string">&quot;user_1&quot;</span>, <span class="hljs-string">&quot;P@ssw0rd&quot;</span>, <span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">updateUser</span>({
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
   <span class="hljs-attr">newPassword</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
   <span class="hljs-attr">oldPassword</span>: <span class="hljs-string">&#x27;NewP@ssw0rd&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/update_password&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;newPassword&quot;: &quot;P@ssw0rd!&quot;,
    &quot;userName&quot;: &quot;user_1&quot;,
    &quot;password&quot;: &quot;P@ssw0rd&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-users" class="common-anchor-header">Lister les utilisateurs</h3><p>Après avoir créé plusieurs utilisateurs, vous pouvez dresser la liste de tous les utilisateurs existants et les afficher.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;String&gt; resp = client.listUsers();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">users, err := client.ListUsers(ctx, milvusclient.NewListUserOption())
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listUsers</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Voici un exemple de résultat. <code translate="no">root</code> est l'utilisateur par défaut généré automatiquement dans Milvus. <code translate="no">user_1</code> est le nouvel utilisateur qui vient d'être créé.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;root&#x27;</span>, <span class="hljs-string">&#x27;user_1&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Role" class="common-anchor-header">Rôle<button data-href="#Role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fournit un rôle intégré appelé <code translate="no">admin</code>, qui est un rôle d'administrateur pouvant accéder aux ressources sous toutes les instances et disposant de privilèges pour toutes les opérations. Pour une gestion plus fine des accès et une meilleure sécurité des données, il est recommandé de créer des rôles personnalisés en fonction de vos besoins.</p>
<h3 id="Create-a-role" class="common-anchor-header">Créer un rôle</h3><p>L'exemple suivant montre comment créer un rôle nommé <code translate="no">role_a</code>.</p>
<p>Le nom du rôle doit respecter la règle suivante :</p>
<ul>
<li>Il doit commencer par une lettre et ne peut comprendre que des lettres majuscules ou minuscules, des chiffres et des traits de soulignement.</li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.create_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateRoleReq;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateRoleReq</span> <span class="hljs-variable">createRoleReq</span> <span class="hljs-operator">=</span> CreateRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateRole(ctx, milvusclient.NewCreateRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createRole</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-roles" class="common-anchor-header">Lister les rôles</h3><p>Après avoir créé plusieurs rôles, vous pouvez lister et visualiser tous les rôles existants.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.list_roles()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;String&gt; roles = client.listRoles();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roles, err := client.ListRoles(ctx, milvusclient.NewListRoleOption())
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listRoles</span>({
    <span class="hljs-attr">includeUserInfo</span>: <span class="hljs-literal">true</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Voici un exemple de sortie. <code translate="no">admin</code> est le rôle par défaut dans Milvus. <code translate="no">role_a</code> est le nouveau rôle qui vient d'être créé.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;role_a&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
