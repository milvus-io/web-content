---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Узнайте об определении пользователей, ролей, объектов и привилегий в системе
  управления доступом на основе ролей (RBAC).
title: 'Пользователи, привилегии и роли'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Пользователи, привилегии и роли<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме представлен обзор управления доступом на основе ролей (RBAC) в Milvus, подробно описаны определения и отношения между пользователями, ролями, объектами и привилегиями.</p>
<p>На следующем рисунке показана взаимосвязь между объектами, привилегиями, ролями и пользователями.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>пользователи_и_роли</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Ключевые понятия<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы управлять контролем доступа к ресурсам Milvus, важно понимать ключевые компоненты RBAC: типы объектов, имена объектов, пользователи, роли и привилегии.</p>
<ul>
<li><p><strong>Тип объекта</strong>: категория объекта, для которого назначается привилегия. Тип объекта может быть:</p>
<ul>
<li><code translate="no">Global</code>: : Общесистемные объекты, позволяющие пользователю выполнять действия, которые влияют на все коллекции, пользователей или общесистемные настройки.</li>
<li><code translate="no">Collection</code>: Объекты, относящиеся к конкретной коллекции, позволяющие пользователю выполнять такие действия, как создание индексов, загрузка данных, вставка или удаление данных и запрос данных в конкретной коллекции.</li>
<li><code translate="no">User</code>: Объекты, связанные с управлением пользователями, позволяющие пользователю управлять учетными данными и ролями пользователей базы данных, например, обновлять учетные данные пользователей или просматривать их сведения.</li>
</ul></li>
<li><p><strong>Имя объекта</strong>: конкретное имя объекта, для которого необходимо контролировать доступ. Например:</p>
<ul>
<li>Если тип объекта - <code translate="no">Global</code>, имя объекта должно быть установлено в виде подстановочного знака (<code translate="no">*</code>), указывающего на все объекты указанного типа.</li>
<li>Если тип объекта <code translate="no">Collection</code>, то имя объекта - это имя коллекции.</li>
<li>Если тип объекта <code translate="no">User</code>, то имя объекта - это имя пользователя базы данных.</li>
</ul></li>
<li><p><strong>Пользователь</strong>: лицо или приложение, взаимодействующее с Milvus, которое состоит из имени пользователя и соответствующего пароля.</p></li>
<li><p><strong>Привилегии</strong>: определяют действия, которые можно выполнять, и ресурсы, к которым можно получить доступ. Привилегии не предоставляются непосредственно пользователям, а назначаются ролям.</p></li>
<li><p><strong>Роль</strong>: определяет набор привилегий, которые пользователь имеет для определенных объектов. Как только роль привязывается к пользователю, он наследует все привилегии, предоставленные этой ролью.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Пример: Предоставление привилегий<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем фрагменте кода показано, как предоставить роли привилегию <code translate="no">CreateIndex</code> на определенную коллекцию:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>Для получения дополнительной информации об API, связанных с привилегиями, обратитесь к разделам <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Чтобы получить дополнительные сведения об API, связанных с привилегиями, см. <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> и <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы получить дополнительную информацию об API, связанных с привилегиями, см. разделы <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> и <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Пользователи и роли по умолчанию<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>По умолчанию Milvus создает пользователя <code translate="no">root</code> с паролем по умолчанию <code translate="no">Milvus</code>. Пользователю <code translate="no">root</code> предоставляются привилегии <code translate="no">admin</code>, что означает, что этот пользователь <code translate="no">root</code> может иметь доступ ко всем ресурсам и выполнять все действия.</p>
<p>Если пользователь связан с ролью <code translate="no">public</code>, ему предоставляются следующие привилегии:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Список типов объектов и привилегий<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице перечислены значения, которые можно выбрать при <a href="/docs/ru/rbac.md">включении RBAC</a>.</p>
<table>
<thead>
<tr><th>Тип объекта</th><th>Имя привилегии</th><th>Соответствующее описание API на стороне клиента</th></tr>
</thead>
<tbody>
<tr><td>Коллекция</td><td>CreateIndex</td><td>CreateIndex</td></tr>
<tr><td>Коллекция</td><td>DropIndex</td><td>DropIndex</td></tr>
<tr><td>Коллекция</td><td>IndexDetail</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Коллекция</td><td>Загрузка</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Коллекция</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>Коллекция</td><td>GetLoadState</td><td>GetLoadState</td></tr>
<tr><td>Коллекция</td><td>Освобождение</td><td>ReleaseCollection</td></tr>
<tr><td>Коллекция</td><td>Вставить</td><td>Вставка</td></tr>
<tr><td>Коллекция</td><td>Удалить</td><td>Удалить</td></tr>
<tr><td>Коллекция</td><td>Upsert</td><td>Upsert</td></tr>
<tr><td>Коллекция</td><td>Поиск</td><td>Поиск</td></tr>
<tr><td>Коллекция</td><td>Flush</td><td>Flush/GetFlushState</td></tr>
<tr><td>Коллекция</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Коллекция</td><td>Запрос</td><td>Запрос</td></tr>
<tr><td>Коллекция</td><td>GetStatistics</td><td>GetCollectionStatistics</td></tr>
<tr><td>Коллекция</td><td>Компактификация</td><td>Уплотнение</td></tr>
<tr><td>Коллекция</td><td>Импорт</td><td>Массовый ввоз/импорт</td></tr>
<tr><td>Коллекция</td><td>LoadBalance</td><td>Баланс нагрузки</td></tr>
<tr><td>Коллекция</td><td>CreatePartition</td><td>CreatePartition</td></tr>
<tr><td>Коллекция</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Коллекция</td><td>ShowPartitions</td><td>ShowPartitions</td></tr>
<tr><td>Коллекция</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>Глобальный</td><td>Все</td><td>Все разрешения операций API в этой таблице</td></tr>
<tr><td>Глобальный</td><td>CreateCollection</td><td>СоздатьКоллекцию</td></tr>
<tr><td>Глобальный</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Глобальный</td><td>DescribeCollection</td><td>DescribeCollection</td></tr>
<tr><td>Глобальный</td><td>ShowCollections</td><td>ShowCollections</td></tr>
<tr><td>Глобальный</td><td>Переименовать коллекцию</td><td>Переименовать коллекцию</td></tr>
<tr><td>Глобальный</td><td>FlushAll</td><td>FlushAll</td></tr>
<tr><td>Глобальный</td><td>CreateOwnership</td><td>CreateUser CreateRole</td></tr>
<tr><td>Глобальный</td><td>DropOwnership</td><td>Удалить учетную запись DropRole</td></tr>
<tr><td>Глобальный</td><td>SelectOwnership</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Глобальный</td><td>ManageOwnership</td><td>OperateUserRole OperatePrivilege</td></tr>
<tr><td>Глобальный</td><td>CreateResourceGroup</td><td>CreateResourceGroup</td></tr>
<tr><td>Глобальный</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Глобальный</td><td>DescribeResourceGroup</td><td>DescribeResourceGroup</td></tr>
<tr><td>Глобальный</td><td>ListResourceGroups</td><td>ListResourceGroups</td></tr>
<tr><td>Глобальный</td><td>TransferNode</td><td>TransferNode</td></tr>
<tr><td>Глобальный</td><td>TransferReplica</td><td>TransferReplica</td></tr>
<tr><td>Глобальный</td><td>CreateDatabase</td><td>Создать базу данных</td></tr>
<tr><td>Глобальный</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Глобальный</td><td>ListDatabases</td><td>Базы данных списков</td></tr>
<tr><td>Глобальный</td><td>CreateAlias</td><td>CreateAlias</td></tr>
<tr><td>Глобальный</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Глобальный</td><td>DescribeAlias</td><td>DescribeAlias</td></tr>
<tr><td>Глобальный</td><td>ListAliases</td><td>ListAliases</td></tr>
<tr><td>Пользователь</td><td>UpdateUser</td><td>UpdateCredential</td></tr>
<tr><td>Пользователь</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Имена объектов и привилегий чувствительны к регистру.</li>
<li>Чтобы предоставить все привилегии какому-либо объекту, например Collection, Global, User, используйте "*" для имени привилегии. </li>
<li>Имя привилегии "*" для объекта Global не включает привилегию All, потому что привилегия All включает все разрешения, включая любые объекты коллекций и пользователей.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Узнайте, как <a href="/docs/ru/rbac.md">включить RBAC</a>.</li>
</ul>
