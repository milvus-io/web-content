---
id: users_and_roles.md
related_key: 'users, roles'
summary: '역할 기반 액세스 제어(RBAC)에서 사용자, 역할, 개체 및 권한의 정의에 대해 알아보세요.'
title: '사용자, 권한 및 역할'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">사용자, 권한 및 역할<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus의 역할 기반 액세스 제어(RBAC)에 대한 개요를 제공하며 사용자, 역할, 개체 및 권한 간의 정의와 관계를 자세히 설명합니다.</p>
<p>다음 그림은 개체, 권한, 역할 및 사용자 간의 관계를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>USERS_AND_ROOLS</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">주요 개념<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 리소스에 대한 액세스 제어를 관리하려면 개체 유형, 개체 이름, 사용자, 역할 및 권한과 같은 RBAC의 주요 구성 요소를 이해하는 것이 중요합니다.</p>
<ul>
<li><p>개체<strong>유형</strong>: 권한이 할당되는 개체의 범주입니다. 개체 유형은 다음과 같습니다:</p>
<ul>
<li><code translate="no">Global</code>: 시스템 전체 개체로, 사용자가 모든 컬렉션, 사용자 또는 시스템 전체 설정에 영향을 주는 작업을 수행할 수 있습니다.</li>
<li><code translate="no">Collection</code>: 컬렉션별 개체 - 사용자가 특정 컬렉션 내에서 인덱스 만들기, 데이터 로드, 데이터 삽입 또는 삭제, 데이터 쿼리 등의 작업을 수행할 수 있도록 허용하는 개체입니다.</li>
<li><code translate="no">User</code>: 사용자 관리와 관련된 개체로, 사용자가 사용자 자격 증명 업데이트 또는 사용자 세부 정보 보기와 같은 데이터베이스 사용자의 자격 증명 및 역할을 관리할 수 있습니다.</li>
</ul></li>
<li><p><strong>개체 이름</strong>: 액세스를 제어할 개체의 특정 이름입니다. 예를 들어</p>
<ul>
<li>개체 유형이 <code translate="no">Global</code> 인 경우 개체 이름은 와일드카드(<code translate="no">*</code>)로 설정하여 지정된 유형의 모든 개체를 나타내야 합니다.</li>
<li>개체 유형이 <code translate="no">Collection</code> 인 경우 개체 이름은 컬렉션의 이름입니다.</li>
<li>개체 유형이 <code translate="no">User</code> 인 경우 개체 이름은 데이터베이스 사용자의 이름입니다.</li>
</ul></li>
<li><p><strong>사용자</strong>: 사용자 이름과 해당 비밀번호로 구성된 Milvus와 상호 작용하는 사람 또는 애플리케이션입니다.</p></li>
<li><p><strong>권한</strong>: 수행할 수 있는 작업과 액세스할 수 있는 리소스를 정의합니다. 권한은 사용자에게 직접 부여되지 않고 역할에 할당됩니다.</p></li>
<li><p><strong>역할</strong>: 사용자가 특정 개체에 대해 갖는 권한 집합을 정의합니다. 역할이 사용자에게 바인딩되면 사용자는 해당 역할에 부여된 모든 권한을 상속받습니다.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">예시: 권한 부여하기<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 특정 컬렉션의 역할에 <code translate="no">CreateIndex</code> 권한을 부여하는 방법을 보여줍니다:</p>
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
<pre><code translate="no" class="language-javascript">milvusClient.grantPrivilege({
   roleName: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-built_in">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   objectName: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   privilegeName: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>권한 관련 API에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p>권한 관련 API에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> 및 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege를</a> 참조하세요.</p>
</div>
<div class="language-javascript">
<p>권한 관련 API에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> 및 <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege를</a> 참조하세요.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">기본 사용자 및 역할<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 기본 비밀번호 <code translate="no">Milvus</code> 를 사용하여 <code translate="no">root</code> 사용자를 기본적으로 생성합니다. <code translate="no">root</code> 사용자에게는 <code translate="no">admin</code> 권한이 부여되며, 이는 이 <code translate="no">root</code> 사용자가 모든 리소스에 액세스하고 모든 작업을 수행할 수 있음을 의미합니다.</p>
<p><code translate="no">public</code> 역할에 연결된 사용자에게는 다음과 같은 권한이 부여됩니다:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">개체 유형 및 권한 목록<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 <a href="/docs/ko/v2.4.x/rbac.md">RBAC를 사용</a> 설정할 때 선택할 수 있는 값이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>개체 유형</th><th>권한 이름</th><th>클라이언트 측의 관련 API 설명</th></tr>
</thead>
<tbody>
<tr><td>Collection</td><td>CreateIndex</td><td>CreateIndex</td></tr>
<tr><td>컬렉션</td><td>DropIndex</td><td>DropIndex</td></tr>
<tr><td>컬렉션</td><td>IndexDetail</td><td>색인 설명/색인 상태 가져오기/색인 빌드 진행률 가져오기</td></tr>
<tr><td>컬렉션</td><td>Load</td><td>로드 컬렉션/로드 진행률/로드 상태 가져오기</td></tr>
<tr><td>컬렉션</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>컬렉션</td><td>GetLoadState</td><td>GetLoadState</td></tr>
<tr><td>컬렉션</td><td>Release</td><td>ReleaseCollection</td></tr>
<tr><td>컬렉션</td><td>Insert</td><td>삽입</td></tr>
<tr><td>컬렉션</td><td>삭제</td><td>삭제</td></tr>
<tr><td>컬렉션</td><td>Upsert</td><td>Upsert</td></tr>
<tr><td>컬렉션</td><td>검색</td><td>검색</td></tr>
<tr><td>컬렉션</td><td>Flush</td><td>플러시/겟플러시 상태</td></tr>
<tr><td>컬렉션</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>컬렉션</td><td>Query</td><td>Query</td></tr>
<tr><td>Collection</td><td>GetStatistics</td><td>GetCollectionStatistics</td></tr>
<tr><td>컬렉션</td><td>압축</td><td>Compact</td></tr>
<tr><td>Collection</td><td>Import</td><td>대량 삽입/가져오기</td></tr>
<tr><td>Collection</td><td>LoadBalance</td><td>LoadBalance</td></tr>
<tr><td>컬렉션</td><td>CreatePartition</td><td>CreatePartition</td></tr>
<tr><td>컬렉션</td><td>DropPartition</td><td>드롭 파티션</td></tr>
<tr><td>컬렉션</td><td>파티션 표시</td><td>파티션 표시</td></tr>
<tr><td>컬렉션</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>Global</td><td>All</td><td>이 표의 모든 API 작업 권한</td></tr>
<tr><td>Global</td><td>CreateCollection</td><td>CreateCollection</td></tr>
<tr><td>글로벌</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>글로벌</td><td>컬렉션 설명</td><td>DescribeCollection</td></tr>
<tr><td>글로벌</td><td>쇼 컬렉션</td><td>쇼 컬렉션</td></tr>
<tr><td>글로벌</td><td>RenameCollection</td><td>RenameCollection</td></tr>
<tr><td>Global</td><td>FlushAll</td><td>FlushAll</td></tr>
<tr><td>Global</td><td>CreateOwnership</td><td>CreateUser CreateRole</td></tr>
<tr><td>글로벌</td><td>DropOwnership</td><td>삭제 자격 증명 드롭 역할</td></tr>
<tr><td>글로벌</td><td>SelectOwnership</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>글로벌</td><td>ManageOwnership</td><td>운영 사용자 역할 운영 권한</td></tr>
<tr><td>글로벌</td><td>CreateResourceGroup</td><td>CreateResourceGroup</td></tr>
<tr><td>글로벌</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>글로벌</td><td>자원 그룹 설명</td><td>자원 그룹 설명</td></tr>
<tr><td>Global</td><td>리소스 그룹 목록</td><td>리소스 그룹 리스트</td></tr>
<tr><td>Global</td><td>전송 노드</td><td>전송 노드</td></tr>
<tr><td>Global</td><td>TransferReplica</td><td>TransferReplica</td></tr>
<tr><td>Global</td><td>CreateDatabase</td><td>CreateDatabase</td></tr>
<tr><td>글로벌</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>글로벌</td><td>목록 데이터베이스</td><td>목록 데이터베이스</td></tr>
<tr><td>Global</td><td>별칭 만들기</td><td>별칭 만들기</td></tr>
<tr><td>글로벌</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>별칭 설명</td><td>별칭 설명</td></tr>
<tr><td>Global</td><td>ListAliases</td><td>ListAliases</td></tr>
<tr><td>User</td><td>UpdateUser</td><td>UpdateCredential</td></tr>
<tr><td>사용자</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>개체 및 권한 이름은 대소문자를 구분합니다.</li>
<li>컬렉션, 전역, 사용자 등의 개체에 모든 권한을 부여하려면 권한 이름에 "*"를 사용합니다. </li>
<li>모든 권한에는 컬렉션 및 사용자 개체를 포함한 모든 권한이 포함되므로 Global 개체의 "*" 권한 이름에는 모든 권한이 포함되지 않습니다.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/v2.4.x/rbac.md">RBAC를 사용</a> 설정하는 방법을 알아보세요.</li>
</ul>
