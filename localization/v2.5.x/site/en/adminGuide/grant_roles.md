---
id: grant_roles.md
related_key: enable RBAC
summary: >-
  After creating a role and granting privileges to the role, you can grant the
  role to users so that the users can access resources and perform actions that
  are defined by the role. You can grant multiple roles to a user or grant a
  role to multiple users. This guide introduces how to grant roles to users.​
title: Grant Roles to Users​
---
<h1 id="Grant-Roles-to-Users​" class="common-anchor-header">Grant Roles to Users​<button data-href="#Grant-Roles-to-Users​" class="anchor-icon" translate="no">
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
    </button></h1><p>After creating a role and granting privileges to the role, you can grant the role to users so that the users can access resources and perform actions that are defined by the role. You can grant multiple roles to a user or grant a role to multiple users. This guide introduces how to grant roles to users.​</p>
<p>The built-in user <code translate="no">root</code> in Milvus has already been granted the <code translate="no">admin</code> role, which has all privileges. You do not need to assign any other roles to it.​</p>
<h2 id="Grant-a-role-to-a-user​" class="common-anchor-header">Grant a role to a user​<button data-href="#Grant-a-role-to-a-user​" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example demonstrates how to grant the role <code translate="no">role_a</code> to the user <code translate="no">user_1</code>.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
client.grant_role(user_name=<span class="hljs-string">&quot;user_1&quot;</span>, role_name=<span class="hljs-string">&quot;role_a&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantRoleReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
​
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
    .uri(CLUSTER_ENDPOINT)​
    .token(TOKEN)​
    .build();​
    ​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">GrantRoleReq</span> <span class="hljs-variable">grantRoleReq</span> <span class="hljs-operator">=</span> GrantRoleReq.builder()​
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .build();​
client.grantRole(grantRoleReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
milvusClient.<span class="hljs-title function_">grantRole</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>​
 })​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export CLUSTER_ENDPOINT=&quot;http://localhost:19530&quot;​
export TOKEN=&quot;root:Milvus&quot;​
​
curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/users/grant_role&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d &#x27;{​
    &quot;roleName&quot;: &quot;role_a&quot;,​
    &quot;userName&quot;: &quot;user_1&quot;​
}&#x27;​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-user​" class="common-anchor-header">Describe user​<button data-href="#Describe-user​" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you grant a role to a user, you can check if the grant operation is successful via the <code translate="no">describe_user()</code> method.​</p>
<p>The following example demonstrates how to check the role(s) of the user <code translate="no">user_1</code>.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client.describe_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeUserReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeUserResp;​
​
<span class="hljs-type">DescribeUserReq</span> <span class="hljs-variable">describeUserReq</span> <span class="hljs-operator">=</span> DescribeUserReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .build();​
<span class="hljs-type">DescribeUserResp</span> <span class="hljs-variable">describeUserResp</span> <span class="hljs-operator">=</span> client.describeUser(describeUserReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
milvusClient.<span class="hljs-title function_">describeUser</span>({<span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/users/describe&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d &#x27;{​
    &quot;userName&quot;: &quot;user_1&quot;​
}&#x27;​

<button class="copy-code-btn"></button></code></pre>
<p>Below is an example output.​</p>
<pre><code translate="no">{<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>}​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-role​" class="common-anchor-header">Revoke a role​<button data-href="#Revoke-a-role​" class="anchor-icon" translate="no">
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
    </button></h2><p>You can also revoke a role that has been assigned to a user.​</p>
<p>The following example demonstrates how to revoke the role <code translate="no">role_a</code> assigned to the user <code translate="no">user_1</code>.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client.revoke_role(​
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,​
    role_name=<span class="hljs-string">&#x27;role_a&#x27;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokeRoleReq;​
​
client.revokeRole(RevokeRoleReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/users/revoke_role&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d &#x27;{​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;roleName&quot;: &quot;role_a&quot;​
}&#x27;​

<button class="copy-code-btn"></button></code></pre>
