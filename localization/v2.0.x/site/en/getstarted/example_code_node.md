---
id: example_code_node.md
label: Node.js
order: 1
group: example_code.md
summary: Get started with Milvus faster using this Node.js example code.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.0.x/example_code.md" class=''>Python</a><a href="/docs/v2.0.x/example_code_node.md" class='active '>Node.js</a></div>
<h1 id="Run-Milvus-using-Nodejs" class="common-anchor-header">Run Milvus using Node.js<button data-href="#Run-Milvus-using-Nodejs" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to run Milvus using Node.js.</p>
<h2 id="1--Initialize-a-Nodejs-Project" class="common-anchor-header">1.  Initialize a Node.js Project<button data-href="#1--Initialize-a-Nodejs-Project" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">npm <span class="hljs-keyword">init</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Node.js version 12 or later is required. View <a href="https://www.cloudbees.com/blog/node-js-tutorial">Node.js Beginners Guide</a> for information about installing the correct version for your system.
</div>
<h2 id="2--Install-TypeScript-and-Node-Milvus-SDK-and-its-dependencies" class="common-anchor-header">2.  Install TypeScript and Node Milvus SDK and its dependencies<button data-href="#2--Install-TypeScript-and-Node-Milvus-SDK-and-its-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">npm install <span class="hljs-meta">@zilliz</span>/milvus2-sdk-node typescript --save
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Download-sample-code-HelloMilvusts" class="common-anchor-header">3. Download sample code HelloMilvus.ts<button data-href="#3-Download-sample-code-HelloMilvusts" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-sdk-node/main/example/HelloMilvus.ts</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Scan-HelloMilvusts" class="common-anchor-header">4. Scan HelloMilvus.ts<button data-href="#4-Scan-HelloMilvusts" class="anchor-icon" translate="no">
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
    </button></h2><p>This sample code does the following:</p>
<ul>
<li>Imports the Node.js SDK package:</li>
</ul>
<pre><code translate="no" class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node/dist/milvus/types/Common&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">InsertReq</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node/dist/milvus/types/Insert&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Connects to the Milvus server:</li>
</ul>
<pre><code translate="no" class="language-ts"><span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;localhost:19530&quot;</span>);
<span class="hljs-keyword">const</span> collectionManager = milvusClient.<span class="hljs-property">collectionManager</span>;
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Creates a collection:</li>
</ul>
<pre><code translate="no" class="language-ts"><span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>;
    <span class="hljs-keyword">const</span> dim = <span class="hljs-string">&quot;4&quot;</span>;
    <span class="hljs-keyword">const</span> createRes = <span class="hljs-keyword">await</span> collectionManager.<span class="hljs-title function_">createCollection</span>(
        {
            <span class="hljs-attr">collection_name</span>: collectionName,
            <span class="hljs-attr">fields</span>: [
                {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;count&quot;</span>,
                    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
                    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
                }, 
                {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;random_value&quot;</span>,
                    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span>,
                    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
                }, 
                {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;float_vector&quot;</span>,
                    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
                    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
                    <span class="hljs-attr">type_params</span>: {
                      dim
                    }
                }
            ]
          }
    );


    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Create collection ---&quot;</span>, createRes, collectionName);
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Inserts vectors in the new collection:</li>
</ul>
<pre><code translate="no" class="language-ts"><span class="hljs-keyword">const</span> generateInsertData = <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateInsertData</span>(<span class="hljs-params">
  fields: { isVector: boolean; dim?: number; name: string; isBool?: boolean }[],
  count: number</span>) {
    <span class="hljs-keyword">const</span> results = [];
    <span class="hljs-keyword">while</span> (count &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">let</span> <span class="hljs-attr">value</span>: any = {};
  
      fields.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> { isVector, dim, name, isBool } = v;
        value[name] = isVector
          ? [...<span class="hljs-title class_">Array</span>(dim)].<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">10</span>)
          : isBool
          ? count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>
          : count;
      });

      value[<span class="hljs-string">&quot;count&quot;</span>] = count;
      results.<span class="hljs-title function_">push</span>(value);
      count--;
    }
    <span class="hljs-keyword">return</span> results;
}

    <span class="hljs-keyword">const</span> fields = [
      {
        <span class="hljs-attr">isVector</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;float_vector&quot;</span>,
      },
      {
        <span class="hljs-attr">isVector</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;random_value&quot;</span>,
      },
    ];
    <span class="hljs-keyword">const</span> vectorsData = <span class="hljs-title function_">generateInsertData</span>(fields, <span class="hljs-number">1000</span>);
  
    <span class="hljs-keyword">const</span> <span class="hljs-attr">params</span>: <span class="hljs-title class_">InsertReq</span> = {
      <span class="hljs-attr">collection_name</span>: collectionName,
      <span class="hljs-attr">fields_data</span>: vectorsData,
      <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;test&quot;</span>,
    };
  
    <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">insert</span>(params);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Insert Data to Collection ---&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Loads the collection and builds index on it:</li>
</ul>
<pre><code translate="no" class="language-ts">    <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">indexManager</span>.<span class="hljs-title function_">createIndex</span>({
      <span class="hljs-attr">collection_name</span>: collectionName,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;float_vector&quot;</span>,
      <span class="hljs-attr">extra_params</span>: {
        <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
        <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">nlist</span>: <span class="hljs-number">10</span> }),
      },
    });
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Create Index in Collection ---&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Searches the collection:</li>
</ul>
<pre><code translate="no" class="language-ts">        <span class="hljs-comment">// need load collection before search</span>
    <span class="hljs-keyword">const</span> loadCollectionRes = <span class="hljs-keyword">await</span> collectionManager.<span class="hljs-title function_">loadCollectionSync</span>({
      <span class="hljs-attr">collection_name</span>: collectionName,
    });
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Load collection (&quot;</span> + collectionName + <span class="hljs-string">&quot;) ---&quot;</span>, loadCollectionRes);


    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
      <span class="hljs-attr">collection_name</span>: collectionName,
      <span class="hljs-attr">vectors</span>: [vectorsData[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;float_vector&quot;</span>]],
      <span class="hljs-attr">search_params</span>: {
        <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;float_vector&quot;</span>,
        <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;4&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
        <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">nprobe</span>: <span class="hljs-number">1024</span> }),
        <span class="hljs-attr">round_decimal</span>: <span class="hljs-number">4</span>,
      },
      <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count&quot;</span>],
      <span class="hljs-attr">vector_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    });

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Search collection (&quot;</span> + collectionName + <span class="hljs-string">&quot;) ---&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Releases the collection:</li>
</ul>
<pre><code translate="no" class="language-ts">    <span class="hljs-keyword">const</span> releaseRes = <span class="hljs-keyword">await</span> collectionManager.<span class="hljs-title function_">releaseCollection</span>({
      <span class="hljs-attr">collection_name</span>: collectionName,
    });
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Release Collection ---&quot;</span>, releaseRes);
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Drops the collection:</li>
</ul>
<pre><code translate="no" class="language-tw">    <span class="hljs-keyword">const</span> dropRes = <span class="hljs-keyword">await</span> collectionManager.<span class="hljs-title function_">dropCollection</span>({
      <span class="hljs-attr">collection_name</span>: collectionName,
    });
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;--- Drop Collection ---&quot;</span>, dropRes);
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Compile-the-file" class="common-anchor-header">5. Compile the file<button data-href="#5-Compile-the-file" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">tsc MilvusHello.ts
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Run-the-example" class="common-anchor-header">6. Run the example<button data-href="#6-Run-the-example" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">node MilvusHello.ts
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p><em>Congratulations! You have successfully booted Milvus Standalone and created your first collection.</em></p>
