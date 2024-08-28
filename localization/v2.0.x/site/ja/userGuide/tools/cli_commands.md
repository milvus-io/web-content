---
id: cli_commands.md
summary: Interact with Milvus using commands.
title: ''
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Milvus_CLI Command Reference<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data.</p>
<p>This topic introduces all supported commands and the corresponding options. Some examples are also included for your reference.</p>
<h2 id="calc-distance" class="common-anchor-header">calc distance<button data-href="#calc-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Calculates the distance between two vector arrays.</p>
<p><h3 id="calc">Syntax</h3></p>
<pre><code translate="no" class="language-shell">calc distance
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="calc">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="calc">Example</h3></p>
<p>To calculate the distance between two vector arrays and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; calc distance

Import left operator vectors from existing collection? [y/N]: n

The vector<span class="hljs-string">&#x27;s type (float_vectors, bin_vectors): float_vectors

Left vectors: 
    [[0.083, 0.992, 0.931, 0.433, 0.93, 0.706, 0.668, 0.481, 0.255, 0.088, 0.121, 0.701, 0.935, 0.142, 0.012, 0.197, 0.066, 0.864, 0.263, 0.732, 0.445, 0.672, 0.184, 0.675, 0.361, 0.115, 0.396, 0.206, 0.084, 0.274, 0.523, 0.958, 0.071, 0.646, 0.864, 0.434, 0.212, 0.5, 0.319, 0.608, 0.356, 0.745, 0.672, 0.488, 0.221, 0.485, 0.193, 0.557, 0.546, 0.626, 0.593, 0.526, 0.404, 0.795, 0.076, 0.156, 0.231, 0.1, 0.18, 0.796, 0.716, 0.752, 0.816, 0.363], [0.284, 0.135, 0.172, 0.198, 0.752, 0.174, 0.314, 0.18, 0.672, 0.727, 0.062, 0.611, 0.921, 0.851, 0.238, 0.648, 0.794, 0.177, 0.639, 0.339, 0.402, 0.977, 0.887, 0.528, 0.768, 0.16, 0.698, 0.016, 0.906, 0.261, 0.902, 0.93, 0.547, 0.146, 0.65, 0.072, 0.876, 0.645, 0.303, 0.922, 0.807, 0.093, 0.063, 0.344, 0.667, 0.81, 0.662, 0.147, 0.242, 0.641, 0.903, 0.714, 0.637, 0.365, 0.512, 0.267, 0.577, 0.809, 0.698, 0.62, 0.768, 0.402, 0.922, 0.592]]

Import right operator vectors from existing collection? [y/N]: n

The vector&#x27;</span>s <span class="hljs-built_in">type</span> (float_vectors, bin_vectors): float_vectors

Right vectors: 
    [[0.518, 0.034, 0.786, 0.251, 0.04, 0.247, 0.55, 0.595, 0.638, 0.957, 0.303, 0.023, 0.007, 0.712, 0.841, 0.648, 0.807, 0.429, 0.402, 0.904, 0.002, 0.882, 0.69, 0.268, 0.732, 0.511, 0.942, 0.202, 0.749, 0.234, 0.666, 0.517, 0.787, 0.399, 0.565, 0.457, 0.57, 0.937, 0.712, 0.981, 0.928, 0.678, 0.154, 0.775, 0.754, 0.532, 0.074, 0.493, 0.288, 0.229, 0.9, 0.657, 0.936, 0.184, 0.478, 0.587, 0.592, 0.84, 0.793, 0.985, 0.826, 0.595, 0.947, 0.175], [0.704, 0.02, 0.937, 0.249, 0.431, 0.99, 0.779, 0.855, 0.731, 0.665, 0.773, 0.647, 0.135, 0.44, 0.621, 0.329, 0.718, 0.003, 0.927, 0.511, 0.515, 0.359, 0.744, 0.828, 0.31, 0.161, 0.605, 0.539, 0.331, 0.077, 0.503, 0.668, 0.275, 0.72, 0.172, 0.035, 0.88, 0.762, 0.646, 0.727, 0.83, 0.001, 0.085, 0.188, 0.583, 0.709, 0.134, 0.683, 0.246, 0.214, 0.863, 0.109, 0.168, 0.539, 0.451, 0.303, 0.064, 0.575, 0.547, 0.85, 0.75, 0.789, 0.681, 0.735], [0.648, 0.769, 0.525, 0.716, 0.752, 0.199, 0.095, 0.222, 0.767, 0.029, 0.244, 0.527, 0.496, 0.691, 0.487, 0.83, 0.546, 0.102, 0.845, 0.096, 0.744, 0.758, 0.092, 0.289, 0.139, 0.005, 0.204, 0.245, 0.528, 0.607, 0.446, 0.029, 0.686, 0.558, 0.705, 0.451, 0.87, 0.404, 0.824, 0.727, 0.058, 0.283, 0.512, 0.682, 0.027, 0.026, 0.809, 0.669, 0.241, 0.103, 0.101, 0.225, 0.989, 0.662, 0.917, 0.972, 0.93, 0.447, 0.318, 0.434, 0.437, 0.036, 0.009, 0.96], [0.726, 0.418, 0.404, 0.244, 0.618, 0.356, 0.07, 0.842, 0.137, 0.967, 0.465, 0.811, 0.027, 0.704, 0.935, 0.546, 0.92, 0.125, 0.917, 0.089, 0.463, 0.929, 0.289, 0.721, 0.368, 0.837, 0.14, 0.431, 0.495, 0.75, 0.484, 0.083, 0.431, 0.392, 0.177, 0.303, 0.013, 0.317, 0.593, 0.047, 0.695, 0.185, 0.633, 0.825, 0.203, 0.619, 0.597, 0.152, 0.899, 0.061, 0.512, 0.67, 0.82, 0.52, 0.743, 0.07, 0.99, 0.119, 0.949, 0.284, 0.529, 0.65, 0.523, 0.059]]

Supported metric <span class="hljs-built_in">type</span>. Default is <span class="hljs-string">&quot;L2&quot;</span> (L2, IP, HAMMING, TANIMOTO) [L2]:
L2

sqrt [False]: True

Timeout(optional) []:

======
Return <span class="hljs-built_in">type</span>:
Assume the vectors_left: L_1, L_2, L_3
Assume the vectors_right: R_a, R_b
Distance between L_n and R_m we called <span class="hljs-string">&quot;D_n_m&quot;</span>
The returned distances are arranged like this:
[[D_1_a, D_1_b],
[D_2_a, D_2_b],
[D_3_a, D_3_b]]

Note: <span class="hljs-keyword">if</span> some vectors <span class="hljs-keyword">do</span> not exist <span class="hljs-keyword">in</span> collection, the returned distance is <span class="hljs-string">&quot;-1.0&quot;</span>
======

Result:

[[3.625464916229248, 3.234992742538452, 3.568333148956299, 3.694913148880005], [2.556027889251709, 2.8901233673095703, 3.385758399963379, 3.3239054679870605]]
<button class="copy-code-btn"></button></code></pre>
<h2 id="calc-mktsfromhybridts" class="common-anchor-header">calc mkts_from_hybridts<button data-href="#calc-mktsfromhybridts" class="anchor-icon" translate="no">
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
    </button></h2><p>Generates a hybrid timestamp based on an existing hybrid timestamp, timedelta, and incremental time interval.</p>
<p><h3 id="calc-mkts_from_hybridts">Syntax</h3></p>
<pre><code translate="no" class="language-shell">calc mkts_from_hybridts -h (<span class="hljs-built_in">int</span>) -m (<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="calc-mkts_from_hybridts">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-h</td><td style="text-align:left">–hybridts</td><td style="text-align:left">The original hybrid timestamp used to generate a new hybrid timestamp. A non-negative integer that ranges from 0 to 18446744073709551615.</td></tr>
<tr><td style="text-align:left">-m</td><td style="text-align:left">–milliseconds</td><td style="text-align:left">The incremental interval in milliseconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="calc-mktsfromunixtime" class="common-anchor-header">calc mkts_from_unixtime<button data-href="#calc-mktsfromunixtime" class="anchor-icon" translate="no">
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
    </button></h2><p>Generates a hybrid timestamp based on the Unix Epoch time, timedelta, and incremental time interval.</p>
<p><h3 id="calc-mkts_from_unixtime">Syntax</h3></p>
<pre><code translate="no" class="language-shell">calc mkts_from_unixtime -e (<span class="hljs-built_in">float</span>) -m (<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="calc-mkts_from_unixtime">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-e</td><td style="text-align:left">–epoch</td><td style="text-align:left">The known Unix timestamp used to generate a hybrid timestamp. The Unix epoch is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).</td></tr>
<tr><td style="text-align:left">-m</td><td style="text-align:left">–milliseconds</td><td style="text-align:left">The incremental interval in milliseconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="calc-hybridtstounixtime" class="common-anchor-header">calc hybridts_to_unixtime<button data-href="#calc-hybridtstounixtime" class="anchor-icon" translate="no">
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
    </button></h2><p>Converts a hybrid timestamp to the UNIX timestamp ignoring the logic part.</p>
<p><h3 id="calc-hybridts_to_unixtime">Syntax</h3></p>
<pre><code translate="no" class="language-shell">calc hybridts_to_unixtime -h (<span class="hljs-built_in">int</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="calc-hybridts_to_unixtime">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-h</td><td style="text-align:left">–hybridts</td><td style="text-align:left">The known hybrid timestamp to be converted to a UNIX timestamp. A non-negative integer that ranges from 0 to 18446744073709551615.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="clear" class="common-anchor-header">clear<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>Clears the screen.</p>
<p><h3 id="clear">Syntax</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">connect<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>Connects to Milvus.</p>
<p><h3 id="connect">Syntax</h3></p>
<pre><code translate="no" class="language-shell">connect [-h (text)] [-p (<span class="hljs-built_in">int</span>)] [-a (text)] [-D]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-h</td><td style="text-align:left">–host</td><td style="text-align:left">(Optional) The host name. The default is &quot;127.0.0.1&quot;.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–port</td><td style="text-align:left">(Optional) The port number. The default is &quot;19530&quot;.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–alias</td><td style="text-align:left">(Optional) The alias name of the Milvus link. The default is &quot;default&quot;.</td></tr>
<tr><td style="text-align:left">-D</td><td style="text-align:left">–disconnect</td><td style="text-align:left">(Optional) Flag to disconnect from the Milvus server specified by an alias. The default alias is &quot;default&quot;.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -h <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span> -p <span class="hljs-number">19530</span> -a <span class="hljs-keyword">default</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">create alias<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Specifies unique aliases for a collection.</p>
<div class="alert note">A collection can have multiple aliases. However, an alias corresponds to a maximum of one collection.</div>
<p><h3 id="create-alias">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A] [-t (<span class="hljs-built_in">float</span>)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–alias-name</td><td style="text-align:left">The alias.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">–alter</td><td style="text-align:left">(Optional) Flag to transfer the alias to a specified collection.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">Examples</h3></p>
<p><h4 id="create-alias">Example 1</h4></p>
<p>The following example creates the <code translate="no">carAlias1</code> and <code translate="no">carAlias2</code> aliases for the <code translate="no">car</code> collection.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1 -a carAlias2
<button class="copy-code-btn"></button></code></pre>
<p><h4 id="create-alias">Example 2</h4></p>
<div class="alert note">Example 2 is based on Example 1.</div>
<p>The following example transfers the <code translate="no">carAlias1</code> and <code translate="no">carAlias2</code> aliases from the <code translate="no">car</code> collection to the <code translate="no">car2</code> collection.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias -a carAlias2
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">create collection<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a collection.</p>
<p><h3 id="create-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The nam of the collection.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">–schema-field</td><td style="text-align:left">(Multiple) The field schema in the <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code> format.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–schema-primary-field</td><td style="text-align:left">The name of the primary key field.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–schema-auto-id</td><td style="text-align:left">(Optional) Flag to generate IDs automatically.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">–schema-description</td><td style="text-align:left">(Optional) The description of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:INT64:brand -p <span class="hljs-built_in">id</span> -a -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">create partition<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a partition.</p>
<p><h3 id="creat-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The partition name.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">–description</td><td style="text-align:left">(Optional) The description of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">create index<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates an index for a field.</p>
<div class="alert note"> Currently, a collection supports a maximum of one index.</div>
<p><h3 id="creat-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">Example</h3></p>
<p>To create an index for a field and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection <span class="hljs-title function_">name</span> <span class="hljs-params">(car, car2)</span>: car2

The name of the field to create an index <span class="hljs-title function_">for</span> <span class="hljs-params">(vector)</span>: vector

Index <span class="hljs-title function_">type</span> <span class="hljs-params">(FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY)</span>: IVF_FLAT

Index metric <span class="hljs-title function_">type</span> <span class="hljs-params">(L2, IP, HAMMING, TANIMOTO)</span>: L2

Index params nlist: <span class="hljs-number">2</span>

Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">delete alias<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes an alias.</p>
<p><h3 id="delete-alias">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete <span class="hljs-built_in">alias</span> -a (text) [-t (<span class="hljs-built_in">float</span>)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–alias-name</td><td style="text-align:left">The alias.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">delete collection<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a collection.</p>
<p><h3 id="delete-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text) [-<span class="hljs-title function_">t</span> (float)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection to be deleted.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">delete entities<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes entities.</p>
<p><h3 id="delete-entities">Syntax</h3></p>
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text) [-<span class="hljs-title function_">t</span> (float)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that entities to be deleted belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The name of the partition to be deleted.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">Example</h3></p>
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">delete partition<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a partition.</p>
<p><h3 id="delete-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text) [-<span class="hljs-title function_">t</span> (float)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the partition to be deleted belongs to.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The name of the partition to be deleted.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">delete index<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes an index and the corresponding index files.</p>
<div class="alert note"> Currently, a collection supports a maximum of one index.</div>
<p><h3 id="delete-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) [-<span class="hljs-title function_">t</span> (float)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-index">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car
<button class="copy-code-btn"></button></code></pre>
<h2 id="describe-collection" class="common-anchor-header">describe collection<button data-href="#describe-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the detailed information of a collection.</p>
<p><h3 id="describe-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">describe collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="describe-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="describe-collection">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; describe collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="describe-partition" class="common-anchor-header">describe partition<button data-href="#describe-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the detailed information of a partition.</p>
<p><h3 id="describe-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">describe partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="describe-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the partition belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="describe-partition">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; describe partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="describe-index" class="common-anchor-header">describe index<button data-href="#describe-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the detailed information of an index.</p>
<div class="alert note">Currently, a collection supports a maximum of one index.</div>
<p><h3 id="describe-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">describe index -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="describe-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="exit" class="common-anchor-header">exit<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>Closes the command line window.</p>
<p><h3 id="exit">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">help<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>Displays help for using a command.</p>
<p><h3 id="help">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Commands</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Command</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">calc</td><td style="text-align:left">Calculates the distance between two vector arrays, mkts_from_hybridts, mkts_from_unixtime, or hybridts_to_unixtime.</td></tr>
<tr><td style="text-align:left">clear</td><td style="text-align:left">Clears the screen.</td></tr>
<tr><td style="text-align:left">connect</td><td style="text-align:left">Connects to Milvus.</td></tr>
<tr><td style="text-align:left">create</td><td style="text-align:left">Creates a collection, partition, index, or alias.</td></tr>
<tr><td style="text-align:left">delete</td><td style="text-align:left">Deletes a collection, partition, index, entity, or alias.</td></tr>
<tr><td style="text-align:left">describe</td><td style="text-align:left">Describes a collection, partition, or index.</td></tr>
<tr><td style="text-align:left">exit</td><td style="text-align:left">Closes the command line window.</td></tr>
<tr><td style="text-align:left">help</td><td style="text-align:left">Displays help for using a command.</td></tr>
<tr><td style="text-align:left">import</td><td style="text-align:left">Imports data into a partition.</td></tr>
<tr><td style="text-align:left">list</td><td style="text-align:left">Lists collections, partitions, or indexes.</td></tr>
<tr><td style="text-align:left">load</td><td style="text-align:left">Loads a collection or partition.</td></tr>
<tr><td style="text-align:left">load_balance</td><td style="text-align:left">Performs load balancing on a query node.</td></tr>
<tr><td style="text-align:left">query</td><td style="text-align:left">Shows query results that match all the criteria that you enter.</td></tr>
<tr><td style="text-align:left">release</td><td style="text-align:left">Releases a collection or partition.</td></tr>
<tr><td style="text-align:left">search</td><td style="text-align:left">Performs a vector similarity search or hybrid search.</td></tr>
<tr><td style="text-align:left">show</td><td style="text-align:left">Shows the current collection, progress of entity loading, progress of entity indexing, or segment information.</td></tr>
<tr><td style="text-align:left">version</td><td style="text-align:left">Shows the version of Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="import" class="common-anchor-header">import<button data-href="#import" class="anchor-icon" translate="no">
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
    </button></h2><p>Imports local or remote data into a partition.</p>
<p><h3 id="import">Syntax</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c (text)[-p (text)][-t (<span class="hljs-built_in">float</span>)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the data are inserted into.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The name of the partition that the data are inserted into. Not passing this partition option indicates choosing the “_default” partition.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="import">Example 1</h3>
The following example imports a local CSV file.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">import</span> -c car <span class="hljs-string">&#x27;examples/import_csv/vectors.csv&#x27;</span>

Reading csv file...  [<span class="hljs-comment">####################################]  100%</span>

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed <span class="hljs-number">50001</span> lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   <span class="hljs-number">50000</span>
Total collection entities:              <span class="hljs-number">150000</span>
Milvus timestamp:           <span class="hljs-number">428849214449254403</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Example 2</h3>
The following example imports a remote CSV file.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; import -c car <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;</span>

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">list collections<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all collections.</p>
<p><h3 id="list-collections">Syntax<h3></p>
<pre><code translate="no" class="language-shell">list collections [-t (<span class="hljs-type">float</span>)][-l (<span class="hljs-type">boolean</span>)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">Options<h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">-l</td><td style="text-align:left">–show-loaded</td><td style="text-align:left">(Optional) Shows the loaded collections only.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">list indexes<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all indexes for a collection.</p>
<div class="alert note"> Currently, a collection supports a maximum of one index. </div>
<p><h3 id="list-indexes">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">list partitions<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all partitions of a collection.</p>
<p><h3 id="list-partitions">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">load<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>Loads a collection or partition from hard drive space into RAM.</p>
<p><h3 id="load">Syntax</h3></p>
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the partition belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional/Multiple) The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="loadbalance" class="common-anchor-header">load_balance<button data-href="#loadbalance" class="anchor-icon" translate="no">
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
    </button></h2><p>Performs load balancing by transferring segments from a source query node to a destination one.</p>
<p><h3 id="load_balance">Syntax</h3></p>
<pre><code translate="no" class="language-shell">load_balance -s (<span class="hljs-built_in">int</span>) -d (<span class="hljs-built_in">int</span>) -ss (<span class="hljs-built_in">int</span>) [-t (<span class="hljs-built_in">int</span>)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load_balance">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-s</td><td style="text-align:left">–src-node-id</td><td style="text-align:left">The ID of the source query node to be balanced.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">–dst-node-id</td><td style="text-align:left">(Multiple) The ID of the destination query node to transfer segments to.</td></tr>
<tr><td style="text-align:left">-ss</td><td style="text-align:left">–sealed-segment-ids</td><td style="text-align:left">(Multiple) The ID of the sealed segment to be transferred.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">query<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows query results that match all the criteria that you enter.</p>
<p><h3 id="query">Syntax</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="query">Example</h3>
<h4 id="query">Example 1</h4></p>
<p>To perform a query and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id <span class="hljs-keyword">in</span> [ <span class="hljs-number">428960801420883491</span>, <span class="hljs-number">428960801420883492</span>,
<span class="hljs-number">428960801420883493</span> ]

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
Travel timestamp. Users can specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view at a specified point <span class="hljs-keyword">in</span> time. [0]: 428960801420883491
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="query">Example 2</h4></p>
<p>To perform a query and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id &gt; <span class="hljs-number">428960801420883491</span>

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: id, color,
brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
Travel timestamp. Users can specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view at a specified point <span class="hljs-keyword">in</span> time. [0]: 428960801420883491
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">release<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>Releases a collection or partition from RAM.</p>
<p><h3 id="release">Syntax</h3></p>
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the partition belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional/Multiple) The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">search<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>Performs a vector similarity search or hybrid search.</p>
<p><h3 id="search">Syntax</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="search">Examples</h3>
<h4 id="search">Example 1</h4></p>
<p>To perform a search on a csv file and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file
<span class="hljs-keyword">out</span> headers): examples/import_csv/search_vectors.csv

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Metric type: L2

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

Travel <span class="hljs-title">Timestamp</span>(<span class="hljs-params">Specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view</span>) [0]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Example 2</h4></p>
<p>To perform a search on an indexed collection and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers): 
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Metric type: L2

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The specified number of <span class="hljs-built_in">decimal</span> places of returned distance [-1]: 5

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

Travel <span class="hljs-title">Timestamp</span>(<span class="hljs-params">Specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view</span>) [0]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Example 3</h4></p>
<p>To perform a search on a non-indexed collection and be prompted for the required input:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, car2): car

The vectors of search data(the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: <span class="hljs-number">5</span>

The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">2</span>

The boolean expression used to <span class="hljs-built_in">filter</span> attribute []:

The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []:

timeout []:

Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]:

Travel Timestamp(Specify a timestamp <span class="hljs-keyword">in</span> a search to get results based on a data view) [<span class="hljs-number">0</span>]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-connection" class="common-anchor-header">show connection<button data-href="#show-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the current connection.</p>
<p><h3 id="show-connection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show connection [-a]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–all</td><td style="text-align:left">（Optional) Flag to show all connections.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">show index_progress<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the progress of entity indexing.</p>
<p><h3 id="show-index-progress">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the entities belong to.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">–index</td><td style="text-align:left">(Optional) The name of the index.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">show loading_progress<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the progress of entity loading.</p>
<p><h3 id="show-loading-progress">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the entities belong to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional/Multiple) The name of the loading partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-querysegment" class="common-anchor-header">show query_segment<button data-href="#show-querysegment" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the segment information of a collection.</p>
<p><h3 id="show-query-segment">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show query_segment -c (text) [-t (<span class="hljs-built_in">float</span>)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-query-segment">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">version<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the version of Milvus_CLI.</p>
<p><h3 id="version">Syntax</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<div class="alert note"> You can also check the version of Milvus_CLI in a shell as shown in the following example. In this case, <code translate="no">milvus_cli --version</code> acts as a command.</div>
<p><h3 id="version">Example</h3></p>
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.1.7
<button class="copy-code-btn"></button></code></pre>
