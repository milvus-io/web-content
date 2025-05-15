---
id: install_embedded_milvus.md
related_key: installation
title: Install Embedded Milvus
summary: Learn how to install embedded Milvus.
---
<h1 id="Install-Embedded-Milvus" class="common-anchor-header">Install Embedded Milvus<button data-href="#Install-Embedded-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install <a href="https://github.com/milvus-io/embd-milvus">embedded Milvus</a>.</p>
<div class="alert caution">
Do not use embedded Milvus in production environment or if you require high performance.
</div>
<p>Embedded Milvus is suitable for the following scenarios:</p>
<ul>
<li>You want to use Milvus directly without having it installed using <a href="/docs/v2.1.x/install_standalone-docker.md">Docker Compose, Helm, etc.</a>.</li>
<li>You do not want to use any containers like Docker.</li>
<li>You want to use Milvus without keeping a long-running Milvus process in your machine.</li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Python 3.6 or later</li>
<li>Supported operating systems include:
<ul>
<li>Ubuntu 18.04</li>
<li>Mac x86_64 &gt;= 10.4</li>
<li>Mac M1 &gt;= 11.0</li>
</ul></li>
</ul>
<h2 id="Install-embedded-Milvus" class="common-anchor-header">Install embedded Milvus<button data-href="#Install-embedded-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Run the following command to install embedded Milvus.</li>
</ol>
<pre><code translate="no">$ python3 -m pip install milvus
<button class="copy-code-btn"></button></code></pre>
<p>You can also install a specific version of embedded Milvus. The following example installs the 2.1.0 version of embedded Milvus.</p>
<pre><code translate="no">$ python3 -m pip install milvus==2.1.0
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Create data folder for embedded Milvus under <code translate="no">/var/bin/e-milvus</code>.</li>
</ol>
<pre><code translate="no">$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /var/bin/e-milvus
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">chmod</span> -R 777 /var/bin/e-milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-embedded-Milvus" class="common-anchor-header">Start embedded Milvus<button data-href="#Start-embedded-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>When running embedded Milvus for the first time, import Milvus and run <code translate="no">milvus.before()</code> to set up embedded Milvus.</li>
</ol>
<pre><code translate="no">$ python3
Python 3.9.10 (main, Jan 15 2022, 11:40:53)
[Clang 13.0.0 (clang-1300.0.29.3)] on darwin
Type <span class="hljs-string">&quot;help&quot;</span>, <span class="hljs-string">&quot;copyright&quot;</span>, <span class="hljs-string">&quot;credits&quot;</span> or <span class="hljs-string">&quot;license&quot;</span> <span class="hljs-keyword">for</span> more information.
&gt;&gt;&gt; import milvus
--- <span class="hljs-keyword">if</span> you are running Milvus <span class="hljs-keyword">for</span> the first time, <span class="hljs-built_in">type</span> milvus.before() <span class="hljs-keyword">for</span> pre-run instructions ---
--- otherwise, <span class="hljs-built_in">type</span> milvus.start() ---
&gt;&gt;&gt;
&gt;&gt;&gt; milvus.before()
please <span class="hljs-keyword">do</span> the following <span class="hljs-keyword">if</span> you have not already <span class="hljs-keyword">done</span> so:
1. install required dependencies: bash /var/bin/e-milvus/lib/install_deps.sh
2. (Linux system only) <span class="hljs-built_in">export</span> LD_PRELOAD=/Users/yuchengao/Documents/GitHub/soothing-rain/embd-milvus/milvus/bin/embd-milvus.so
3. (on Linux systems) <span class="hljs-built_in">export</span> LD_LIBRARY_PATH=<span class="hljs-variable">$LD_LIBRARY_PATH</span>:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
   (on MacOS systems) <span class="hljs-built_in">export</span> DYLD_FALLBACK_LIBRARY_PATH=DYLD_FALLBACK_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
&gt;&gt;&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Install required dependencies.</li>
</ol>
<pre><code translate="no"><span class="hljs-comment"># exit() python interactive mode first</span>
<span class="hljs-comment"># Note that this must be done AFTER `import milvus`</span>
$ bash /var/<span class="hljs-built_in">bin</span>/e-milvus/lib/install_deps.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Set the environment variable.</li>
</ol>
<pre><code translate="no"><span class="hljs-comment"># exit() python interactive mode first</span>
<span class="hljs-comment"># Note that this must be done AFTER `import milvus`</span>
$ (Linux system only) <span class="hljs-built_in">export</span> LD_PRELOAD=/Users/yuchengao/Documents/GitHub/soothing-rain/embd-milvus/milvus/bin/embd-milvus.so
(on Linux systems) $ <span class="hljs-built_in">export</span> LD_LIBRARY_PATH=<span class="hljs-variable">$LD_LIBRARY_PATH</span>:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
(on MacOS systems) $ <span class="hljs-built_in">export</span> DYLD_FALLBACK_LIBRARY_PATH=DYLD_FALLBACK_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Start embedded Milvus.</li>
</ol>
<pre><code translate="no">$ python3
Python <span class="hljs-number">3.9</span><span class="hljs-number">.10</span> (main, Jan <span class="hljs-number">15</span> <span class="hljs-number">2022</span>, <span class="hljs-number">11</span>:<span class="hljs-number">40</span>:<span class="hljs-number">53</span>)
[Clang <span class="hljs-number">13.0</span><span class="hljs-number">.0</span> (clang-<span class="hljs-number">1300.0</span><span class="hljs-number">.29</span><span class="hljs-number">.3</span>)] on darwin
<span class="hljs-type">Type</span> <span class="hljs-string">&quot;help&quot;</span>, <span class="hljs-string">&quot;copyright&quot;</span>, <span class="hljs-string">&quot;credits&quot;</span> <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;license&quot;</span> <span class="hljs-keyword">for</span> more information.
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> milvus
--- <span class="hljs-keyword">if</span> you are running Milvus <span class="hljs-keyword">for</span> the first time, <span class="hljs-built_in">type</span> milvus.before() <span class="hljs-keyword">for</span> pre-run instructions ---
--- otherwise, <span class="hljs-built_in">type</span> milvus.start() ---
&gt;&gt;&gt;
<span class="hljs-meta">&gt;&gt;&gt; </span>milvus.start()
---Milvus Proxy successfully initialized <span class="hljs-keyword">and</span> ready to serve!---
&gt;&gt;&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Play-with-embedded-Milvus" class="common-anchor-header">Play with embedded Milvus<button data-href="#Play-with-embedded-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>There are two ways to play with embedded Milvus.</p>
<ol>
<li>Start another terminal window and run your Milvus client script.The following is an example.</li>
</ol>
<pre><code translate="no"><span class="hljs-comment"># Download hello_milvus script</span>
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.1.0/examples/hello_milvus.py
<span class="hljs-comment"># Run Hello Milvus </span>
$ python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>In the same terminal window, import and run PyMilvus script immediately after running <code translate="no">milvus.start()</code>.</li>
</ol>
<div class="alert note">
This method is not suggested in Linux systems.
</div>
<pre><code translate="no" class="language-python">$ python3
Python <span class="hljs-number">3.9</span><span class="hljs-number">.10</span> (main, Jan <span class="hljs-number">15</span> <span class="hljs-number">2022</span>, <span class="hljs-number">11</span>:<span class="hljs-number">40</span>:<span class="hljs-number">53</span>)
[Clang <span class="hljs-number">13.0</span><span class="hljs-number">.0</span> (clang-<span class="hljs-number">1300.0</span><span class="hljs-number">.29</span><span class="hljs-number">.3</span>)] on darwin
<span class="hljs-type">Type</span> <span class="hljs-string">&quot;help&quot;</span>, <span class="hljs-string">&quot;copyright&quot;</span>, <span class="hljs-string">&quot;credits&quot;</span> <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;license&quot;</span> <span class="hljs-keyword">for</span> more information.
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> milvus
--- <span class="hljs-keyword">if</span> you are running Milvus <span class="hljs-keyword">for</span> the first time, <span class="hljs-built_in">type</span> milvus.before() <span class="hljs-keyword">for</span> pre-run instructions ---
--- otherwise, <span class="hljs-built_in">type</span> milvus.start() ---
&gt;&gt;&gt;
<span class="hljs-meta">&gt;&gt;&gt; </span>milvus.start()
---Milvus Proxy successfully initialized <span class="hljs-keyword">and</span> ready to serve!---
&gt;&gt;&gt;
&gt;&gt;&gt;
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> random
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
<span class="hljs-meta">... </span>    connections,
<span class="hljs-meta">... </span>    utility,
<span class="hljs-meta">... </span>    FieldSchema, CollectionSchema, DataType,
<span class="hljs-meta">... </span>    Collection,
<span class="hljs-meta">... </span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>has = utility.has_collection(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>fields = [
<span class="hljs-meta">... </span>    FieldSchema(name=<span class="hljs-string">&quot;pk&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>),
<span class="hljs-meta">... </span>    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
<span class="hljs-meta">... </span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>schema = CollectionSchema(fields, <span class="hljs-string">&quot;hello_milvus is the simplest demo to introduce the APIs&quot;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>hello_milvus = Collection(<span class="hljs-string">&quot;hello_milvus&quot;</span>, schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>num_entities = <span class="hljs-number">3000</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>entities = [
<span class="hljs-meta">... </span>    [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)], <span class="hljs-comment"># provide the pk field because `auto_id` is set to False</span>
<span class="hljs-meta">... </span>    [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)],  <span class="hljs-comment"># field embeddings</span>
<span class="hljs-meta">... </span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>insert_result = hello_milvus.insert(entities)
<span class="hljs-meta">&gt;&gt;&gt; </span>index = {
<span class="hljs-meta">... </span>    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
<span class="hljs-meta">... </span>    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
<span class="hljs-meta">... </span>    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
<span class="hljs-meta">... </span>}
<span class="hljs-meta">&gt;&gt;&gt; </span>hello_milvus.create_index(<span class="hljs-string">&quot;embeddings&quot;</span>, index)
<span class="hljs-meta">&gt;&gt;&gt; </span>hello_milvus.load()
<span class="hljs-meta">&gt;&gt;&gt; </span>vectors_to_search = entities[-<span class="hljs-number">1</span>][-<span class="hljs-number">2</span>:]
<span class="hljs-meta">&gt;&gt;&gt; </span>search_params = {
<span class="hljs-meta">... </span>    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;l2&quot;</span>,
<span class="hljs-meta">... </span>    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
<span class="hljs-meta">... </span>}
<span class="hljs-meta">&gt;&gt;&gt; </span>result = hello_milvus.search(vectors_to_search, <span class="hljs-string">&quot;embeddings&quot;</span>, search_params, limit=<span class="hljs-number">3</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
<span class="hljs-meta">... </span>    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
<span class="hljs-meta">... </span>        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
...
hit: (distance: <span class="hljs-number">0.0</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">2998</span>)
hit: (distance: <span class="hljs-number">0.1088758111000061</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">2345</span>)
hit: (distance: <span class="hljs-number">0.12012234330177307</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">1172</span>)
hit: (distance: <span class="hljs-number">0.0</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">2999</span>)
hit: (distance: <span class="hljs-number">0.0297045037150383</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">2000</span>)
hit: (distance: <span class="hljs-number">0.16927233338356018</span>, <span class="hljs-built_in">id</span>: <span class="hljs-number">560</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>utility.drop_collection(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
&gt;&gt;&gt;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If embedded Milvus quits with segmentation error on Linux systems, start another terminal window and run your Milvus client. Setting the environment variable <code translate="no">LD_PRELOAD</code> in Linux sysmtems might cause conflicts and segmentation error.</p>
</div>
<h2 id="Stop-embedded-Milvus-and-clean-up-the-data" class="common-anchor-header">Stop embedded Milvus and clean up the data<button data-href="#Stop-embedded-Milvus-and-clean-up-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>It is highly recommended that you stop embedded Milvus gracefully and use exit() or Ctrl-D (i.e. EOF) to exit when you finish using embedded Milvus.</p>
<pre><code translate="no" class="language-python">&gt;&gt;&gt; milvus.stop()
to clean up, run:
(Linux system only) <span class="hljs-built_in">export</span> LD_PRELOAD=
(on Linux) <span class="hljs-built_in">export</span> LD_LIBRARY_PATH=
(on MacOS) <span class="hljs-built_in">export</span> DYLD_FALLBACK_LIBRARY_PATH=
&gt;&gt;&gt;
&gt;&gt;&gt; <span class="hljs-built_in">exit</span>()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>If you encounter any problems when installing or using embedded Milvus, <a href="https://github.com/milvus-io/embd-milvus/issues/new">file an issue here</a>.</p>
