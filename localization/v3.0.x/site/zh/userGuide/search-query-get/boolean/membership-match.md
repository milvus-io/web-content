---
id: membership-match.md
title: 会员配对Compatible with Milvus v3.0.2+
summary: 使用紧凑的布隆过滤器或精确的Roaring位图，根据大型成员集对实体进行过滤，包括语法、SDK请求模式、删除语义和操作限制。
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">会员配对<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>成员匹配通过测试标量字段值是否属于调用方提供的集合来过滤实体。客户端会构建一个紧凑的二进制成员匹配过滤器数据块，并将其作为表达式模板值传递。</p>
<p>它取代了庞大的<code translate="no">IN [...]</code> 列表。<code translate="no">IN</code> 过滤器会将每个成员序列化到请求中，因此规模足够大的成员集可能会超过代理的gRPC接收限制。使用<code translate="no">membership_match</code> 时，代理会验证该blob并将其嵌入查询计划中，而无需重新构建成员列表。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>成员匹配工作流：客户端构建一个可重用的 blob，代理对其进行验证，而 QueryNodes 则对其进行评估。</span>
  
 </span></p>
<p>该图展示了固定的分工机制：客户端仅需构建一次 blob 即可在多个请求中复用；代理会验证封装结构和大小限制，并将 blob 原样嵌入查询计划；而 QueryNodes 则根据原始数据或索引对该计划进行评估。</p>
<p>该操作符提供两种编码方式，其正确性保证程度不同：</p>
<ul>
<li><strong>布卢姆</strong>（<code translate="no">type=bloom</code> ）：近似成员资格。可能出现误报；但对于有效的过滤器，不应出现漏报。典型用途：面向海量受众或排除过滤器，其中偶尔出现的误报是可以接受的。</li>
<li><strong>Roaring</strong>（<code translate="no">type=roaring</code> ）：针对整数值提供精确成员资格判定。典型用途：访问控制列表（ACL）、租户可见性、合规性过滤器以及按 ID 集合删除的操作。</li>
</ul>
<p>请勿<strong>将布卢姆（Bloom）</strong>成员资格用于授权决策或破坏性删除操作。误报可能会导致未包含在目标集合中的实体被暴露或被删除。</p>
<h3 id="Operational-checklist" class="common-anchor-header">操作检查清单<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>确认目标字段类型，并基于该值域构建 BLOB。</li>
<li>仅在可接受误报的情况下才选择布隆算法。</li>
<li>对于 ACL、合规性、租户隔离和删除操作，请选择 Roaring。</li>
<li>大型 Blob 应构建一次并重复使用；请勿在每次请求中重新构建。</li>
<li>按序列化字节数（而非成员数量）规划 Blob 大小。</li>
<li>在混合版本集群上，请先完成代理的滚动升级，然后再启用<code translate="no">membership_match</code> 。</li>
<li>在启用破坏性工作流之前，请先在非生产环境Collection上测试该表达式。</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">表达式语法<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>第二个参数是模板占位符。SDK 会将占位符值作为 protobuf<code translate="no">bytes</code> 提供，其中包含客户端构建的过滤器 Blob。在生产环境表达式中应显式保留<code translate="no">type</code> ，以便在代码和日志中清晰显示预期的正确性契约。</p>
<p><code translate="no">type</code> 参数是可选的。每个blob都携带一个自描述的魔术头（Bloom的为<code translate="no">MBF1</code> ，Roaring的为<code translate="no">MRB1</code> ），当省略<code translate="no">type</code> 时，服务器会嗅探该头。与blob头冲突的显式<code translate="no">type</code> 将被视为请求错误而拒绝，未知或截断的头将导致失败关闭状态。</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">选择编码<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>当可接受误报时，请使用 Bloom。Bloom 支持有符号整数字段（<strong>INT8/16/32/64</strong>）、<strong>VARCHAR</strong>字段以及<strong>JSON</strong>路径。Bloom 过滤器并非精确的允许列表。</p>
<p><code translate="no">fpr</code> （误报率）是指当某个值从未被插入时，布隆过滤器将其报告为成员的概率：<code translate="no">fpr=0.005</code> 意味着大约每 200 个非成员值中，会有一个被错误地报告为存在。更低的误报率会导致 Blob 体积增大。</p>
<p>当每个匹配都必须完全精确时，请使用<strong>Roaring</strong>。<strong>Roaring</strong>仅接受有符号整数字段；在序列化之前，成员会进行符号扩展为<strong>INT64</strong>，因此 INT8 类型的 -1 和 INT64 类型的 -1 属于同一个成员。请勿将其用于 UUID 或其他字符串字段。</p>
<table>
<thead>
<tr><th>维度</th><th>Bloom（type=bloom）</th><th>Roaring（type=roaring）</th></tr>
</thead>
<tbody>
<tr><td>精度</td><td>近似；可能出现假阳性；无假阴性</td><td>精确；无假阳性，无假阴性</td></tr>
<tr><td>字段</td><td>INT8/16/32/64、VARCHAR、JSON 路径</td><td>仅限有符号 INT8/16/32/64</td></tr>
<tr><td>BLOB 大小</td><td>成员数量和 FPR；当 FPR 为 0.005 时，每个成员约占 11 位；二进制幂结构</td><td>值分布；稠密集合可压缩至远小于原始大小的体积；随机 64 位值会达到 262,144 的容器上限</td></tr>
<tr><td>删除</td><td>在解析时被拒绝</td><td>允许</td></tr>
<tr><td>典型用途</td><td>受众和排除过滤器</td><td>访问控制列表（ACL）、合规性、租户隔离、按 ID 集合删除</td></tr>
</tbody>
</table>
<p><strong>JSON</strong>路径是严格类型化的，按行处理：<strong>JSON</strong>字符串被视为<strong>VARCHAR</strong>值，<strong>JSON</strong>整数被视为<strong>INT64</strong>值，而<strong>JSON</strong>双精度数永远不会与整数成员匹配，这与精确的<code translate="no">IN</code> 不同，在后者中 5.0 等于 5. 如果您的写入程序将整数浮点编码，请在写入时对其进行规范化处理，或者使用类型化的标量字段。</p>
<p>无论采用哪种编码方式，都应从与目标字段相同的值域中构建成员集。 请勿基于字符串<code translate="no">&quot;10086&quot;</code> 构建布隆过滤器，并将其应用于<code translate="no">INT64</code> 字段。BLOB 头记录了插入的值域，如果 BLOB 的值域错误，代理会返回参数错误，而不是默默地不进行匹配。请在不同请求中复用已构建的 BLOB，而不是为每个查询重新构建。</p>
<p>对于成员数在几千个或更少的集合，普通的 `<code translate="no">IN</code> ` 仍是 simplest 选项。服务器不会在<strong>`IN`</strong>、<strong>`Bloom</strong>` 和<strong>`Roaring</strong>` 之间进行选择。选择编码是调用方的责任。</p>
<p>选择编码时：</p>
<ol>
<li>确定工作负载能否容忍误报。如果不能，则绝不能选择<strong>Bloom</strong>编码。</li>
<li>若需精确成员资格判定，请使用带符号整数字段的<strong>Roaring 编码</strong>。密集或簇状的值可压缩为最小的 blob。</li>
<li>检查大小限制。均匀随机生成的 64 位值可能会超过 262,144 的高容器上限或大小限制。如果超出，请使用符合请求限制的传统<strong>IN</strong>列表。</li>
<li>对于非整数字段的精确成员资格，请使用<strong>IN</strong>。这些字段没有精确成员资格编码。</li>
</ol>
<p>RESTful HTTP API 不支持成员资格匹配。HTTP 表达式模板参数仅接受 bool、number、string 和 array 值；不存在用于 blob 的二进制<code translate="no">bytes</code> 类型。请使用基于 gRPC 的 SDK 传递成员资格 blob。</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDK 请求模式<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>以下代码片段重点介绍如何构建成员资格 blob 并将它们作为过滤器模板参数传递。这些示例假设 Collection 和字段已存在并已加载，SDK 客户端已连接，且查询向量、成员列表及其他引用的变量均已定义。本文省略了 Collection 的设置和完整的应用程序框架。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">使用 Roaring 进行删除<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>在删除由外部整数 ID 集合选中的实体时，请使用精确的<strong>Roaring</strong>Blob。在执行删除操作前，请检查成员集和 Collection 字段类型。请勿使用 Bloom：近似成员关系并非安全的删除谓词，且在解析时，Delete 表达式中的 Bloom 形式会被拒绝。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>删除语义遵循精确的三值匹配规则：</p>
<table>
<thead>
<tr><th>字段值</th><th>membership_match(…)</th><th>非 membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>无匹配 (NULL)</td><td>无匹配项 (NULL)</td></tr>
<tr><td>在成员集中</td><td>匹配</td><td>无匹配项</td></tr>
<tr><td>不在集合中</td><td>未匹配</td><td>匹配</td></tr>
</tbody>
</table>
<p>该表按行解读如下：使用<code translate="no">membership_match</code> 的Delete操作会删除集合内的实体，使用<code translate="no">not membership_match</code> 的Delete操作会删除集合外的实体，而NULL实体在两种极性下均不会被删除。</p>
<ul>
<li>无论采用哪种极性，字段值为 NULL 的实体都不会被删除。</li>
<li>空位图不会删除任何内容。<code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> 会删除所有字段值不为 NULL 的实体，即精确补集，根据设计，这可能是一个很大的集合。</li>
<li><code translate="no">not membership_match</code> 是成员集在非 NULL 实体上的精确补集，而非近似值。</li>
</ul>
<p>对于以索引方式加载且不包含原始标量数据的密封段，当索引支持时，评估将使用有界反向查找。当既没有原始字段数据也没有符合条件的索引时，请求将返回<code translate="no">FieldNotLoaded</code> 并失败，而不是返回未过滤的实体。</p>
<h2 id="Operational-limits" class="common-anchor-header">操作限制<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>设置</th><th>默认值</th><th>可配置</th><th>限制对象</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>一个 blob 主体</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>每次请求的聚合值</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>整个请求</td></tr>
<tr><td>Roaring 高容器上限</td><td>262,144</td><td>在代码中已修复</td><td>每个过滤器</td></tr>
<tr><td>Roaring解码内存估计值</td><td>64 MiB</td><td>在代码中固定</td><td>每个滤波器</td></tr>
<tr><td>MBF1 格式上限</td><td>128 MiB</td><td>在代码中固定</td><td>blob 格式上限</td></tr>
<tr><td>布鲁姆<code translate="no">fpr</code></td><td>0.005</td><td>客户端构建器</td><td>误报阈值</td></tr>
</tbody>
</table>
<p><code translate="no">proxy.*</code> 设置属于Milvus服务器配置：这些设置由集群管理员在<code translate="no">milvus.yaml</code> 的<code translate="no">proxy</code> 部分中进行配置，无法在过滤时针对单个请求或单个表达式进行调整。<strong>Roaring</strong>准入和 MBF1 格式上限在实现中是固定的，无法在任何地方进行配置。<code translate="no">fpr</code> 行是唯一的客户端控制项：它在构建 blob 时被选定，允许的范围为 0.0001 到 0.05。</p>
<p>在默认 FPR 条件下，BLOB 主体最多可容纳约 4860 万个 INT64 成员，此外还允许附加固定的 32 字节信封头。 请求级配额涵盖包含成员信息的计划的总序列化大小，以及 Roaring 过滤器的总估计解码大小，HybridSearch 子请求和评分器过滤器共享该配额。Bloom 主体大小为 2 的幂：当成员数刚超过一个层级边界时，Blob 大小会翻倍；而略高的 fpr 通常可适配下一级层级。 当代理拒绝超大尺寸的布卢姆数据块时，错误信息会建议使用一个符合要求的<code translate="no">fpr</code> 。</p>
<ul>
<li>成员资格表达式的结果不会在不同请求之间进行缓存。</li>
<li>混合版本集群会以“关闭”状态失败：运行旧版代码的 QueryNodes 会拒绝包含成员资格计划节点的计划。请先升级代理，然后在启用操作符之前完成滚动升级。</li>
<li>服务器日志会屏蔽 Blob 字节。表达式文本仅包含模板名称；二进制有效载荷通过模板值以带外方式传输。</li>
</ul>
