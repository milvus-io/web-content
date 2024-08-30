---
id: integrate_with_airbyte.md
summary: >-
  Airbyte 是一种开源数据移动基础架构，用于构建提取和加载（EL）数据管道。它具有多功能性、可扩展性和易用性。Airbyte 的连接器目录
  "开箱即用"，预置了 350 多个连接器。这些连接器可用于在短短几分钟内开始将数据从源复制到目标。
title: Airbyte：开源数据移动基础设施
---

<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte：开源数据移动基础架构<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte 是一种开源数据移动基础架构，用于构建提取和加载（EL）数据管道。它专为多功能性、可扩展性和易用性而设计。Airbyte 的连接器目录 "开箱即用"，预置了 350 多个连接器。使用这些连接器，只需几分钟就能开始从数据源向目的地复制数据。</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Airbyte 的主要组件<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1.连接器目录</h3><ul>
<li><strong>350 多个预建连接器</strong>：Airbyte 的连接器目录 "开箱即用"，包含 350 多个预建连接器。这些连接器可用于在几分钟内开始将数据从源复制到目标。</li>
<li><strong>无代码连接器生成器</strong>：您可以通过<a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">无代码连接器生成器等</a>工具轻松扩展 Airbyte 的功能，以支持您的自定义用例。</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2.平台</h3><p>Airbyte 平台提供配置和扩展数据移动操作所需的所有水平服务，可作为<a href="https://airbyte.com/product/airbyte-cloud">云管理</a>或<a href="https://airbyte.com/product/airbyte-enterprise">自我管理</a>。</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3.用户界面</h3><p>Airbyte 具有用户界面、<a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a>（Python 库）、<a href="https://docs.airbyte.com/api-documentation">API</a> 和<a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a>，可与您偏好的工具和基础设施管理方法集成。</p>
<p>借助 Airbyte 的功能，用户可将数据源集成到 Milvus 集群，进行相似性搜索。</p>
<h2 id="Before-You-Begin" class="common-anchor-header">开始之前<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要</p>
<ul>
<li>Zendesk 账户（或其他要同步数据的数据源）</li>
<li>Airbyte 账户或本地实例</li>
<li>OpenAI API 密钥</li>
<li>Milvus 集群</li>
<li>本地已安装 Python 3.10</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">设置 Milvus 集群<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您已经为生产部署了 K8s 集群，则可以跳过此步骤，直接<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">部署 Milvus Operator</a>。如果没有，可以按照<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">以下步骤</a>使用 Milvus Operator 部署 Milvus 群集。</p>
<p>单个实体（在我们的例子中是支持票单和知识库文章）存储在 "集合 "中--群集设置完成后，您需要创建一个集合。选择一个合适的名称，并将维度设置为 1536，以便与 OpenAI 嵌入服务生成的向量维度相匹配。</p>
<p>创建后，记录端点和<a href="https://milvus.io/docs/authenticate.md?tab=docker">验证</a>信息。</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">在 Airbyte 中设置连接<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>我们的数据库已经准备就绪，现在就来移动一些数据！为此，我们需要在 Airbyte 中配置连接。要么在<a href="https://cloud.airbyte.com">cloud.airbyte.com</a>注册<a href="https://cloud.airbyte.com">Airbyte</a>云账户<a href="https://cloud.airbyte.com">，</a>要么按照<a href="https://docs.airbyte.com/using-airbyte/getting-started/">文档中的</a>说明启动本地实例。</p>
<h3 id="Set-Up-Source" class="common-anchor-header">设置源</h3><p>实例运行后，我们需要设置连接--单击 "新建连接 "并选择 "Zendesk Support "连接器作为源。单击 "测试并保存 "按钮后，Airbyte 将检查是否可以建立连接。</p>
<p>在 Airbyte 云上，单击 "验证 "按钮即可轻松验证。使用本地 Airbyte 实例时，请遵循<a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">文档</a>页面上概述的说明。</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">设置目的地</h3><p>如果一切正常，下一步就是设置要将数据移动到的目的地。在这里，选择 "Milvus "连接器。</p>
<p>Milvus 连接器有三个功能：</p>
<ul>
<li><strong>分块和格式化</strong>- 将 Zendesk 记录分割成文本和元数据。如果文本大于指定的分块大小，记录会被分割成多个部分，分别加载到集合中。拆分文本（或分块）可能发生在大型支持票单或知识文章等情况下。通过分割文本，可以确保搜索总是能得到有用的结果。</li>
</ul>
<p>让我们使用 1000 个标记的分块大小，以及正文、标题、描述和主题等文本字段，因为这些将出现在我们从 Zendesk 收到的数据中。</p>
<ul>
<li><strong>嵌入</strong>--使用机器学习模型将处理部分生成的文本块转换为向量嵌入，然后就可以搜索语义相似性了。要创建嵌入，您必须提供 OpenAI API 密钥。Airbyte 会将每个文本块发送到 OpenAI，并将生成的向量添加到加载到 Milvus 集群的实体中。</li>
<li><strong>索引</strong>--一旦完成了块的向量化，就可以将其加载到数据库中。为此，请插入在 Milvus 集群中设置集群和集合时获得的信息。 <div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_1.png" width="40%"/></div>点击 "测试并保存 "将检查一切是否正确（有效凭证、集合存在且与配置的嵌入具有相同的向量维度等）。</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">设置流同步流程</h3><p>数据流准备就绪前的最后一步是选择要同步的 "流"。数据流是源中记录的集合。由于 Zendesk 支持大量与我们的用例无关的流，因此我们只选择 "票单 "和 "文章"，禁用所有其他流，以节省带宽，并确保只有相关信息才会显示在搜索中：<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_2.png" width="40%"/></div>您可以通过单击流名称来选择要从源中提取的字段。增量|追加+删减 "同步模式意味着后续连接运行将保持 Zendesk 和 Milvus 同步，同时传输最少的数据（仅传输自上次运行以来发生变化的文章和票单）。</p>
<p>连接建立后，Airbyte 将立即开始同步数据。它可能需要几分钟才能出现在你的 Milvus 收集中。</p>
<p>如果您选择了复制频率，Airbyte 将定期运行，使您的 Milvus 收集与 Zendesk 文章和新创建问题的更改保持同步。</p>
<h3 id="Check-flow" class="common-anchor-header">检查流程</h3><p>你可以在 Milvus 集群用户界面中检查数据在集合中的结构，方法是导航到 playground 并执行 "Query Data"（查询数据）查询，并将过滤器设置为"_ab_stream == \"ticket/""。<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_3.png" width="40%"/></div>在结果视图中可以看到，来自 Zendesk 的每条记录都作为独立实体存储在 Milvus 中，并带有所有指定的元数据。嵌入所基于的文本块显示为 "text "属性--这是使用 OpenAI 嵌入的文本，也是我们要搜索的内容。</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">构建查询集合的 Streamlit 应用程序<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>我们的数据已经准备就绪--现在我们需要构建应用程序来使用它。在本例中，应用程序将是一个简单的支持表单，供用户提交支持案例。当用户点击提交时，我们将做两件事：</p>
<ul>
<li>搜索同一组织用户提交的类似单子</li>
<li>搜索可能与用户相关的基于知识的文章</li>
</ul>
<p>在这两种情况下，我们都将使用 OpenAI 嵌入利用语义搜索。为此，用户输入的问题描述也会被嵌入，并用于从 Milvus 集群中检索类似的实体。如果有相关结果，则会显示在表单下方。</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">设置用户界面环境</h3><p>您需要在本地安装 Python，因为我们将使用 Streamlit 来实现应用程序。</p>
<p>首先，在本地安装 Streamlit、Milvus 客户端库和 OpenAI 客户端库：</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>要渲染基本的支持表单，请创建一个 python 文件<code translate="no">basic_support_form.py</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)

<button class="copy-code-btn"></button></code></pre>

<p>使用 Streamlit run 运行应用程序：</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>这将渲染一个基本表单：<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>本示例的代码也可在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a> 上找到。</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">设置后台查询服务</h3><p>接下来，让我们检查现有的可能相关的未结票单。为此，我们使用 OpenAI 嵌入用户输入的文本，然后在我们的集合中进行相似性搜索，筛选仍未结案的票据。如果所提供的票单与现有票单之间的距离非常小，就会让用户知道，并且不会提交：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)


<button class="copy-code-btn"></button></code></pre>

<p>这里发生了几件事：</p>
<ul>
<li>建立与 Milvus 集群的连接。</li>
<li>使用 OpenAI 服务对用户输入的描述进行嵌入。</li>
<li>执行相似性搜索，根据票单状态和组织 ID 过滤结果（因为只有同一组织的开放票单才相关）。</li>
<li>如果有结果，且现有票单的嵌入向量与新输入文本的嵌入向量之间的距离低于某个阈值，则会提示这一事实。</li>
</ul>
<p>要运行新应用程序，首先需要设置 OpenAI 和 Milvus 的环境变量：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>

<p>当尝试提交已存在的票单时，结果将是这样的：<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_5.png" width="40%"/></div>本示例的代码也可以在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a> 上找到。</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">显示更多相关信息</h3><p>从隐藏在最终版本中的绿色调试输出中可以看到，有两张票单符合我们的搜索条件（状态为新票、来自当前组织且靠近嵌入向量）。但是，第一张（相关）的排名高于第二张（在这种情况下不相关），这反映在较低的距离值上。这种关系在嵌入向量中得到了体现，而不像常规全文搜索那样直接匹配单词。</p>
<p>最后，让我们在提交票单后显示有用的信息，为用户提供尽可能多的相关信息。</p>
<p>为此，我们将在提交票单后进行第二次搜索，获取匹配度最高的知识库文章：</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>

<p>如果没有相似度较高的开放支持票单，则提交新票单，相关知识文章将显示在下方：<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_6.png" width="40%"/></div>此示例的代码也可在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a> 上找到。</p>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>虽然这里显示的用户界面不是一个实际的支持表单，而是一个用来说明用例的示例，但 Airbyte 和 Milvus 的结合是非常强大的--它可以轻松地从各种来源（从 Postgres 等数据库到 Zendesk 或 GitHub 等 API，再到使用 Airbyte 的 SDK 或可视化连接器生成器构建的完全自定义来源）加载文本，并在 Milvus 中以嵌入形式进行索引，Milvus 是一个强大的向量搜索引擎，可以扩展到海量数据。</p>
<p>Airbyte 和 Milvus 是开源的，完全免费，可在您的基础设施上使用，如果需要，还可通过云服务卸载操作。</p>
<p>除了本文介绍的经典语义搜索用例外，一般设置还可用于使用 RAG 方法（检索增强生成）构建问题解答聊天机器人、推荐系统，或帮助提高广告的相关性和效率。</p>
