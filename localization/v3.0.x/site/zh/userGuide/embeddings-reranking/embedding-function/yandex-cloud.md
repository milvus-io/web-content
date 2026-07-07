---
id: yandex-cloud.md
title: Yandex CloudCompatible with Milvus 2.6.x
summary: 本主题介绍了如何在 Milvus 中配置和使用 Yandex Cloud 的 Embeddings 函数。
beta: Milvus 2.6.x
---
<h1 id="Yandex-Cloud" class="common-anchor-header">Yandex Cloud<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Yandex-Cloud" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍了如何在 Milvus 中配置和使用 Yandex Cloud 的嵌入函数。</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">选择嵌入模型<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 通过<code translate="no">yc</code> 提供商支持 Yandex Cloud AI Studio 的文本向量模型。在“函数参数”中，将 `<code translate="no">model_name</code> ` 设置为 Milvus 应调用的 Yandex Cloud 模型 URI。</p>
<p>例如，Yandex文档Text Embeddings模型使用的模型URI为<code translate="no">emb://&lt;folder_ID&gt;/text-search-doc/latest</code> ，并返回256维向量。有关可用模型URI和维度，请参阅<a href="https://aistudio.yandex.ru/docs/en/ai-studio/concepts/embeddings">“文本向量化模型”</a>。</p>
<h2 id="Configure-credentials" class="common-anchor-header">配置凭据<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 必须先获取您的 Yandex Cloud API 密钥，才能请求 Embeddings。您可以在<code translate="no">milvus.yaml</code> 中配置 API 密钥，或通过环境变量进行配置。</p>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">选项 1：配置文件<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>将您的 API 密钥存储在<code translate="no">milvus.yaml</code> 中，并将 Yandex Cloud 提供商指向凭据标签。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">yandex_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_YC_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">yc:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">yandex_apikey</span>
        <span class="hljs-comment"># url: https://llm.api.cloud.yandex.net/foundationModels/v1/textEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">选项 2：环境变量<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>如果<code translate="no">milvus.yaml</code> 中未配置匹配的凭据，Milvus 可以从以下环境变量中读取 Yandex Cloud API 密钥：</p>
<table>
   <tr>
     <th><p>变量</p></th>
     <th><p>必填？</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_YC_API_KEY</code></p></td>
     <td><p>是</p></td>
     <td><p>Milvus 服务用于调用 Yandex Cloud AI Studio 的 Yandex Cloud API 密钥。</p></td>
   </tr>
</table>
<h2 id="Use-embedding-function" class="common-anchor-header">使用嵌入函数<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>配置好凭据后，请定义一个包含输入文本字段和输出向量字段的 Schema，然后将 Yandex Cloud Embeddings 函数添加到该 Schema 中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

text_embedding_function = Function(
    name=<span class="hljs-string">&quot;yandex_cloud_embedding&quot;</span>,
    function_type=FunctionType.TEXTEMBEDDING,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;yc&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;emb://&lt;folder_ID&gt;/text-search-doc/latest&quot;</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;yandex_apikey&quot;</span>,
        <span class="hljs-string">&quot;dim&quot;</span>: <span class="hljs-string">&quot;256&quot;</span>,
    },
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Yandex-Cloud-specific-parameters" class="common-anchor-header">Yandex Cloud 特定参数<button data-href="#Yandex-Cloud-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必填？</p></th>
     <th><p>描述</p></th>
     <th><p>值 / 示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>是</p></td>
     <td><p>要使用的嵌入模型提供程序。</p></td>
     <td><p><code translate="no">"yc"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>是</p></td>
     <td><p>要调用的 Yandex Cloud 模型 URI。</p></td>
     <td><p><code translate="no">"emb://&lt;folder_ID&gt;/text-search-doc/latest"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>否</p></td>
     <td><p>在<code translate="no">milvus.yaml</code> 的顶级<code translate="no">credential:</code> 部分中定义的凭据标签。</p></td>
     <td><p><code translate="no">"yandex_apikey"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>否</p></td>
     <td><p>输出向量的维度。若设置此参数，其值必须与输出向量字段的维度一致。</p></td>
     <td><p><code translate="no">"256"</code></p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">后续步骤<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>配置好嵌入函数后，请参阅《<a href="/docs/zh/embedding-function-overview.md">嵌入函数概述</a>》，了解如何创建索引、插入数据以及运行语义搜索。</p>
