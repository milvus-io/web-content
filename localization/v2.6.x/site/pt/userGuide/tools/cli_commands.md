---
id: cli_commands.md
summary: Interagir com o Milvus através de comandos.
title: Milvus_CLI Command Reference
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
<h2 id="Command-Groups" class="common-anchor-header">Command Groups<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CLI commands are organized into the following groups:</p>
<ul>
<li><code translate="no">create</code>: Create collection, database, partition, user, role, alias, index, privilege_group, or resource_group</li>
<li><code translate="no">delete</code>: Delete collection, database, partition, alias, user, role, index, entities, IDs, privilege_group, resource_group, connection_history, or collection_properties</li>
<li><code translate="no">list</code>: List collections, databases, partitions, users, roles, grants, indexes, aliases, connections, connection_history, privilege_groups, resource_groups, or bulk_insert_tasks</li>
<li><code translate="no">show</code>: Show collection, collection_stats, database, partition, partition_stats, index, index_progress, loading_progress, load_state, flush_state, compaction_state, compaction_plans, replicas, query_segment_info, role, user, alias, output, resource_group, or bulk_insert_state</li>
<li><code translate="no">grant</code>: Grant role, privilege, or privilege_group</li>
<li><code translate="no">revoke</code>: Revoke role, privilege, or privilege_group</li>
<li><code translate="no">load</code>: Load collection or partition</li>
<li><code translate="no">release</code>: Release collection or partition</li>
<li><code translate="no">use</code>: Use database</li>
<li><code translate="no">rename</code>: Rename collection</li>
<li><code translate="no">insert</code>: Insert entities (file or row)</li>
<li><code translate="no">upsert</code>: Upsert entities (file or row)</li>
<li><code translate="no">set</code>: Set output format</li>
<li><code translate="no">alter</code>: Alter database, collection_properties, or collection_field</li>
<li><code translate="no">update</code>: Update password or resource_group</li>
</ul>
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
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)] [-tls (0|1|2)] [-cert (text)] [--save-as (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">–uri</td><td style="text-align:left">(Optional) The uri name. The default is "http://127.0.0.1:19530". Can also be set via <code translate="no">ZILLIZ_URI</code> environment variable.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–token</td><td style="text-align:left">(Optional) The zilliz cloud apikey or <code translate="no">username:password</code>. Can also be set via <code translate="no">ZILLIZ_TOKEN</code> environment variable.</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">–tlsmode</td><td style="text-align:left">(Optional) Set TLS mode: 0 (No encryption), 1 (One-way encryption), 2 (Two-way encryption). Default is 0.</td></tr>
<tr><td style="text-align:left">-cert</td><td style="text-align:left">–cert</td><td style="text-align:left">(Optional) Path to the client certificate file. Works with one-way encryption.</td></tr>
<tr><td style="text-align:left">–save-as</td><td style="text-align:left">n/a</td><td style="text-align:left">(Optional) Save connection with custom alias for later use.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Examples</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530

milvus_cli &gt; connect -uri http://192.168.1.100:19530 -t root:milvus

milvus_cli &gt; connect -uri https://xxx.zillizcloud.com -t &lt;api_key&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="disconnect" class="common-anchor-header">disconnect<button data-href="#disconnect" class="anchor-icon" translate="no">
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
    </button></h2><p>Disconnects from Milvus.</p>
<p><h3 id="disconnect">Syntax</h3></p>
<pre><code translate="no" class="language-shell">disconnect
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-database" class="common-anchor-header">create database<button data-href="#create-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a database in Milvus.</p>
<p><h3 id="create-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-database">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">–db_name</td><td style="text-align:left">[Required] The database name in milvus.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-database">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-database" class="common-anchor-header">use database<button data-href="#use-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Uses a database in Milvus.</p>
<p><h3 id="use-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="use-database">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">–db_name</td><td style="text-align:left">[Required] The database name in milvus.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="use-database">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-databases" class="common-anchor-header">list databases<button data-href="#list-databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all databases in Milvus.</p>
<p><h3 id="list-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-database" class="common-anchor-header">show database<button data-href="#show-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows details and properties of a database.</p>
<p><h3 id="show-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show database [-db (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-database">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">–db_name</td><td style="text-align:left">(Optional) The database name. Defaults to current.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="alter-database" class="common-anchor-header">alter database<button data-href="#alter-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Alters database properties.</p>
<p><h3 id="alter-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">alter database -db (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="alter-database">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">–db_name</td><td style="text-align:left">[Required] The database name in milvus.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="alter-database">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; alter database -db testdb

Property key: collection.ttl.seconds
Property value: 86400
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-database" class="common-anchor-header">delete database<button data-href="#delete-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a database in Milvus.</p>
<p><h3 id="delete-database">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text) [--yes]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-database">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">–db_name</td><td style="text-align:left">[Required] The database name in milvus.</td></tr>
<tr><td style="text-align:left">–yes</td><td style="text-align:left">-y</td><td style="text-align:left">(Optional) Skip confirmation prompt.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-database">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
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
<pre><code translate="no" class="language-shell">create collection [--schema-file (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">–schema-file</td><td style="text-align:left">–schema-file</td><td style="text-align:left">(Optional) Path to JSON file with schema definition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name:

Do you want to add embedding function? [y/N]: n
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
    </button></h2><p>Lists all collections in the current database.</p>
<p><h3 id="list-collections">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">show collection<button data-href="#show-collection" class="anchor-icon" translate="no">
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
<p><h3 id="show-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-collectionstats" class="common-anchor-header">show collection_stats<button data-href="#show-collectionstats" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows collection statistics.</p>
<p><h3 id="show-collection-stats">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show collection_stats -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-collection-stats">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="rename-collection" class="common-anchor-header">rename collection<button data-href="#rename-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Renames a collection.</p>
<p><h3 id="rename-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">rename collection -old (text) -new (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="rename-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-old</td><td style="text-align:left">–old-collection-name</td><td style="text-align:left">[Required] The old collection name.</td></tr>
<tr><td style="text-align:left">-new</td><td style="text-align:left">–new-collection-name</td><td style="text-align:left">[Required] The new collection name.</td></tr>
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
<pre><code translate="no" class="language-shell">delete collection -c (text) [--yes]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–yes</td><td style="text-align:left">-y</td><td style="text-align:left">(Optional) Skip confirmation prompt.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="load-collection" class="common-anchor-header">load collection<button data-href="#load-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Loads a collection into RAM.</p>
<p><h3 id="load-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="release-collection" class="common-anchor-header">release collection<button data-href="#release-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Releases a collection from RAM.</p>
<p><h3 id="release-collection">Syntax</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release-collection">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="truncate" class="common-anchor-header">truncate<button data-href="#truncate" class="anchor-icon" translate="no">
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
    </button></h2><p>Removes all data from a collection but keeps the schema.</p>
<p><h3 id="truncate">Syntax</h3></p>
<pre><code translate="no" class="language-shell">truncate -c (text) [--yes]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="truncate">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–yes</td><td style="text-align:left">-y</td><td style="text-align:left">(Optional) Skip confirmation prompt.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="truncate">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; truncate -c car

Warning!
You are trying to remove all data in the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="flush" class="common-anchor-header">flush<button data-href="#flush" class="anchor-icon" translate="no">
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
    </button></h2><p>Flushes collection data to storage.</p>
<p><h3 id="flush">Syntax</h3></p>
<pre><code translate="no" class="language-shell">flush -c (text) [-t (number)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="flush">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="flushall" class="common-anchor-header">flush_all<button data-href="#flushall" class="anchor-icon" translate="no">
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
    </button></h2><p>Flushes all collections to storage.</p>
<p><h3 id="flush-all">Syntax</h3></p>
<pre><code translate="no" class="language-shell">flush_all [-t (number)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="flush-all">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-flushstate" class="common-anchor-header">show flush_state<button data-href="#show-flushstate" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows flush state for a collection.</p>
<p><h3 id="show-flush-state">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show flush_state -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-flush-state">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="compact" class="common-anchor-header">compact<button data-href="#compact" class="anchor-icon" translate="no">
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
    </button></h2><p>Compacts a collection to merge small segments and remove deleted data.</p>
<p><h3 id="compact">Syntax</h3></p>
<pre><code translate="no" class="language-shell">compact -c (text) [-t (number)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="compact">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-compactionstate" class="common-anchor-header">show compaction_state<button data-href="#show-compactionstate" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows compaction state.</p>
<p><h3 id="show-compaction-state">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show compaction_state -id (number)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-compaction-state">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-id</td><td style="text-align:left">–compaction-id</td><td style="text-align:left">[Required] The compaction ID.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-compactionplans" class="common-anchor-header">show compaction_plans<button data-href="#show-compactionplans" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows compaction plans.</p>
<p><h3 id="show-compaction-plans">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show compaction_plans -c (text) -id (number)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-compaction-plans">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-id</td><td style="text-align:left">–compaction-id</td><td style="text-align:left">[Required] The compaction ID.</td></tr>
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
    </button></h2><p>Displays the progress of loading a collection.</p>
<p><h3 id="show-loading-progress">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-loadstate" class="common-anchor-header">show load_state<button data-href="#show-loadstate" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the load state of a collection or partition.</p>
<p><h3 id="show-load-state">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show load_state -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-load-state">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-replicas" class="common-anchor-header">show replicas<button data-href="#show-replicas" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows replicas information for a collection.</p>
<p><h3 id="show-replicas">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show replicas -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-replicas">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-querysegmentinfo" class="common-anchor-header">show query_segment_info<button data-href="#show-querysegmentinfo" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows query segment information for a collection.</p>
<p><h3 id="show-query-segment-info">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show query_segment_info -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-query-segment-info">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="alter-collectionproperties" class="common-anchor-header">alter collection_properties<button data-href="#alter-collectionproperties" class="anchor-icon" translate="no">
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
    </button></h2><p>Alters collection properties like TTL, mmap, etc.</p>
<p><h3 id="alter-collection-properties">Syntax</h3></p>
<pre><code translate="no" class="language-shell">alter collection_properties -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="alter-collection-properties">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="alter-collection-properties">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; alter collection_properties -c car

Property key: collection.ttl.seconds
Property value: 86400
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-collectionproperties" class="common-anchor-header">delete collection_properties<button data-href="#delete-collectionproperties" class="anchor-icon" translate="no">
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
    </button></h2><p>Drops collection properties by key.</p>
<p><h3 id="delete-collection-properties">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete collection_properties -c (text) -k (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection-properties">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The target collection.</td></tr>
<tr><td style="text-align:left">-k</td><td style="text-align:left">–property-key</td><td style="text-align:left">[Required] The property key to delete.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="alter-collectionfield" class="common-anchor-header">alter collection_field<button data-href="#alter-collectionfield" class="anchor-icon" translate="no">
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
    </button></h2><p>Alters collection field properties.</p>
<p><h3 id="alter-collection-field">Syntax</h3></p>
<pre><code translate="no" class="language-shell">alter collection_field -c (text) -f (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="alter-collection-field">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">–field-name</td><td style="text-align:left">[Required] The name of the field to alter.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="alter-collection-field">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; alter collection_field -c car -f color

Property key: max_length
Property value: 256
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
<p><h3 id="create-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-partition">Options</h3></p>
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
<p><h3 id="create-partition">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="show-partition" class="common-anchor-header">show partition<button data-href="#show-partition" class="anchor-icon" translate="no">
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
<p><h3 id="show-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-partition">Options</h3></p>
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
<h2 id="show-partitionstats" class="common-anchor-header">show partition_stats<button data-href="#show-partitionstats" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows partition statistics.</p>
<p><h3 id="show-partition-stats">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show partition_stats -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-partition-stats">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">[Required] The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
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
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the partition to be deleted belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The name of the partition to be deleted.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="load-partition" class="common-anchor-header">load partition<button data-href="#load-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Loads a partition into RAM.</p>
<p><h3 id="load-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">load partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="release-partition" class="common-anchor-header">release partition<button data-href="#release-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Releases a partition from RAM.</p>
<p><h3 id="release-partition">Syntax</h3></p>
<pre><code translate="no" class="language-shell">release partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release-partition">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
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
<p><h3 id="create-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-index">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
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
<p><h3 id="list-indexes">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-index" class="common-anchor-header">show index<button data-href="#show-index" class="anchor-icon" translate="no">
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
<p><h3 id="show-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">–index-name</td><td style="text-align:left">The name of the index.</td></tr>
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
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-in (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">–index-name</td><td style="text-align:left">(Optional) The name of the index.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Deletes an index.</p>
<p><h3 id="delete-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">–index-name</td><td style="text-align:left">The name of the index.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="waitforindex" class="common-anchor-header">wait_for_index<button data-href="#waitforindex" class="anchor-icon" translate="no">
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
    </button></h2><p>Waits for index building to complete.</p>
<p><h3 id="wait-for-index">Syntax</h3></p>
<pre><code translate="no" class="language-shell">wait_for_index -c (text) [-in (text)] [-t (number)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="wait-for-index">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">–index-name</td><td style="text-align:left">(Optional) The name of the index.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="insert-file" class="common-anchor-header">insert file<button data-href="#insert-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Imports data from a CSV file into a collection.</p>
<p><h3 id="insert-file">Syntax</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (number)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-file">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that the data are inserted into.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The partition name. Default is "_default".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="insert-file">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;examples/import_csv/vectors.csv&#x27;

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="insert-row" class="common-anchor-header">insert row<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>Inserts a row of data into a collection.</p>
<p><h3 id="insert-row">Syntax</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="upsert-file" class="common-anchor-header">upsert file<button data-href="#upsert-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Upserts data from a CSV file into a collection.</p>
<p><h3 id="upsert-file">Syntax</h3></p>
<pre><code translate="no" class="language-shell">upsert file -c (text) [-p (text)] [-t (number)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="upsert-file">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection to upsert into.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The partition name. Default is "_default".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–timeout</td><td style="text-align:left">(Optional) Timeout in seconds.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="upsert-row" class="common-anchor-header">upsert row<button data-href="#upsert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>Upserts a row of data into a collection.</p>
<p><h3 id="upsert-row">Syntax</h3></p>
<pre><code translate="no" class="language-shell">upsert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="upsert-row">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; upsert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 200
Enter value for brand (VARCHAR): Honda

Upserted successfully.
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
    </button></h2><p>Deletes entities using a filter expression.</p>
<p><h3 id="delete-entities">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete entities -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection that entities to be deleted belongs to.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete entities -c car

The expression to specify entities to be deleted, such as &quot;film_id in [ 0, 1 ]&quot;: film_id in [ 0, 1 ]

Warning! You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-ids" class="common-anchor-header">delete ids<button data-href="#delete-ids" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes entities by IDs.</p>
<p><h3 id="delete-ids">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete ids -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-ids">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The name of the partition.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="delete-ids">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete ids -c car

IDs to delete (comma-separated): 1, 2, 3
<button class="copy-code-btn"></button></code></pre>
<h2 id="get" class="common-anchor-header">get<button data-href="#get" class="anchor-icon" translate="no">
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
    </button></h2><p>Gets entities by IDs.</p>
<p><h3 id="get">Syntax</h3></p>
<pre><code translate="no" class="language-shell">get
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="get">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; get

Collection name: car
IDs (comma-separated): 1, 2, 3
Output fields (comma-separated, or * for all) []: color, brand
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Shows query results that match all the criteria you enter.</p>
<p><h3 id="query">Syntax</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. [0]:

Graceful time. Only used in bounded consistency level. [5]:
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Performs a vector similarity search.</p>
<p><h3 id="search">Syntax</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, test_collection): car

The vectors of search data: examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe&#x27;s value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to search (split by &quot;,&quot; if multiple) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee Timestamp [0]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="hybridsearch" class="common-anchor-header">hybrid_search<button data-href="#hybridsearch" class="anchor-icon" translate="no">
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
    </button></h2><p>Performs a hybrid search (multi-vector search) with reranking.</p>
<p><h3 id="hybrid-search">Syntax</h3></p>
<pre><code translate="no" class="language-shell">hybrid_search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="hybrid-search">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; hybrid_search

Collection name: car

Enter search requests (one per line, empty line to finish):
  Vector field, search vector, metric type, top K, filter expression...

Rerank strategy (rrf, weighted, etc.): rrf

Output fields (comma-separated) []: color, brand
<button class="copy-code-btn"></button></code></pre>
<h2 id="queryiterator" class="common-anchor-header">query_iterator<button data-href="#queryiterator" class="anchor-icon" translate="no">
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
    </button></h2><p>Queries entities with iterator for large result sets.</p>
<p><h3 id="query-iterator">Syntax</h3></p>
<pre><code translate="no" class="language-shell">query_iterator
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query-iterator">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query_iterator

Collection name: car
Filter expression []: id &gt; 0
Output fields (comma-separated, or * for all) []: color, brand
Batch size [1000]: 1000
Limit [10]: 100
<button class="copy-code-btn"></button></code></pre>
<h2 id="searchiterator" class="common-anchor-header">search_iterator<button data-href="#searchiterator" class="anchor-icon" translate="no">
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
    </button></h2><p>Searches with iterator for large result sets.</p>
<p><h3 id="search-iterator">Syntax</h3></p>
<pre><code translate="no" class="language-shell">search_iterator
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search-iterator">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search_iterator

Collection name: car
Vector field name: vector
Search vector (comma-separated floats): 1.0, 2.0, 3.0, ...
Batch size [1000]: 1000
Limit [10]: 100
Filter expression []:
Output fields (comma-separated) []: color, brand
<button class="copy-code-btn"></button></code></pre>
<h2 id="bulkinsert" class="common-anchor-header">bulk_insert<button data-href="#bulkinsert" class="anchor-icon" translate="no">
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
    </button></h2><p>Bulk inserts data from remote storage (S3, MinIO, etc.).</p>
<p><h3 id="bulk-insert">Syntax</h3></p>
<pre><code translate="no" class="language-shell">bulk_insert -c (text) [-p (text)] -f (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="bulk-insert">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">[Required] The name of the collection.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–partition</td><td style="text-align:left">(Optional) The partition name.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">–files</td><td style="text-align:left">[Required] File paths (comma separated).</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-bulkinsertstate" class="common-anchor-header">show bulk_insert_state<button data-href="#show-bulkinsertstate" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows bulk insert task state.</p>
<p><h3 id="show-bulk-insert-state">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show bulk_insert_state -id (number)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-bulk-insert-state">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-id</td><td style="text-align:left">–task-id</td><td style="text-align:left">[Required] The bulk insert task ID.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="list-bulkinserttasks" class="common-anchor-header">list bulk_insert_tasks<button data-href="#list-bulkinserttasks" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists bulk insert tasks.</p>
<p><h3 id="list-bulk-insert-tasks">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list bulk_insert_tasks [-l (number)] [-c (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-bulk-insert-tasks">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-l</td><td style="text-align:left">–limit</td><td style="text-align:left">(Optional) Maximum number of tasks to return.</td></tr>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">(Optional) Filter by collection name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="create-user" class="common-anchor-header">create user<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a user in Milvus.</p>
<p><h3 id="create-user">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-user">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">The username.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–password</td><td style="text-align:left">The password.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-user">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">list users<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all users.</p>
<p><h3 id="list-users">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-user" class="common-anchor-header">show user<button data-href="#show-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows user details and assigned roles.</p>
<p><h3 id="show-user">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show user -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-user">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">[Required] The username to describe.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="delete-user" class="common-anchor-header">delete user<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a user.</p>
<p><h3 id="delete-user">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-user">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">The username.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="update-password" class="common-anchor-header">update password<button data-href="#update-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Updates a user’s password.</p>
<p><h3 id="update-password">Syntax</h3></p>
<pre><code translate="no" class="language-shell">update password -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="update-password">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">[Required] The username to update.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="update-password">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; update password -u zilliz

Old password:
New password:
Confirm new password:
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">create role<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a role in Milvus.</p>
<p><h3 id="create-role">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-role">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">The role name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="list-roles" class="common-anchor-header">list roles<button data-href="#list-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all roles.</p>
<p><h3 id="list-roles">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-role" class="common-anchor-header">show role<button data-href="#show-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows role details and granted privileges.</p>
<p><h3 id="show-role">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show role -r (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-role">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">[Required] The role name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="delete-role" class="common-anchor-header">delete role<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a role.</p>
<p><h3 id="delete-role">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-role">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">The role name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="grant-role" class="common-anchor-header">grant role<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Assigns a user to a role.</p>
<p><h3 id="grant-role">Syntax</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="grant-role">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">The role name.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">The username.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="revoke-role" class="common-anchor-header">revoke role<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Removes a user from a role.</p>
<p><h3 id="revoke-role">Syntax</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-role">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">The role name.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">–username</td><td style="text-align:left">The username.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="grant-privilege" class="common-anchor-header">grant privilege<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Grants a privilege to a role.</p>
<p><h3 id="grant-privilege">Syntax</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="grant-privilege">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">revoke privilege<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Revokes a privilege from a role.</p>
<p><h3 id="revoke-privilege">Syntax</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-grants" class="common-anchor-header">list grants<button data-href="#list-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists grants for a role.</p>
<p><h3 id="list-grants">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list grants -r (text) -o (text) -t (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-grants">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">–roleName</td><td style="text-align:left">The role name.</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">–objectName</td><td style="text-align:left">The object name.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">–objectType</td><td style="text-align:left">Global, Collection, or User.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Specifies an alias for a collection.</p>
<div class="alert note">A collection can have multiple aliases. However, an alias corresponds to a maximum of one collection.</div>
<p><h3 id="create-alias">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
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
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-aliases" class="common-anchor-header">list aliases<button data-href="#list-aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists aliases in the database.</p>
<p><h3 id="list-aliases">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list aliases [-c (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-aliases">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">–collection-name</td><td style="text-align:left">(Optional) Filter aliases by collection.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-alias" class="common-anchor-header">show alias<button data-href="#show-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows details of an alias.</p>
<p><h3 id="show-alias">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-alias">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–alias-name</td><td style="text-align:left">[Required] The alias name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
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
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">–alias-name</td><td style="text-align:left">The alias.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="create-privilegegroup" class="common-anchor-header">create privilege_group<button data-href="#create-privilegegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a new privilege group.</p>
<p><h3 id="create-privilege-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create privilege_group -n (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-privilege-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The privilege group name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="list-privilegegroups" class="common-anchor-header">list privilege_groups<button data-href="#list-privilegegroups" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all privilege groups.</p>
<p><h3 id="list-privilege-groups">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list privilege_groups
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilegegroup" class="common-anchor-header">grant privilege_group<button data-href="#grant-privilegegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Adds privileges to a privilege group.</p>
<p><h3 id="grant-privilege-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">grant privilege_group -n (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="grant-privilege-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The privilege group name.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–privileges</td><td style="text-align:left">[Required] Comma-separated list of privileges.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="grant-privilege-group">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege_group -n my_group -p CreateCollection,DropCollection
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilegegroup" class="common-anchor-header">revoke privilege_group<button data-href="#revoke-privilegegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Removes privileges from a privilege group.</p>
<p><h3 id="revoke-privilege-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege_group -n (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The privilege group name.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">–privileges</td><td style="text-align:left">[Required] Comma-separated list of privileges.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="delete-privilegegroup" class="common-anchor-header">delete privilege_group<button data-href="#delete-privilegegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a privilege group.</p>
<p><h3 id="delete-privilege-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete privilege_group -n (text) [--yes]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-privilege-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The privilege group name.</td></tr>
<tr><td style="text-align:left">–yes</td><td style="text-align:left">-y</td><td style="text-align:left">(Optional) Skip confirmation prompt.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="create-resourcegroup" class="common-anchor-header">create resource_group<button data-href="#create-resourcegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Creates a new resource group.</p>
<p><h3 id="create-resource-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">create resource_group -n (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-resource-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The resource group name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="create-resource-group">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create resource_group -n my_rg

Configure node limits? [y/N]: y
requests.node_num [0]: 1
limits.node_num [0]: 3
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-resourcegroups" class="common-anchor-header">list resource_groups<button data-href="#list-resourcegroups" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all resource groups.</p>
<p><h3 id="list-resource-groups">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list resource_groups
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-resourcegroup" class="common-anchor-header">show resource_group<button data-href="#show-resourcegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows resource group details.</p>
<p><h3 id="show-resource-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show resource_group -n (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-resource-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The resource group name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="update-resourcegroup" class="common-anchor-header">update resource_group<button data-href="#update-resourcegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Updates resource group configuration.</p>
<p><h3 id="update-resource-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">update resource_group -n (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="update-resource-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The resource group name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<p><h3 id="update-resource-group">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; update resource_group -n my_rg

requests.node_num [current]: 2
limits.node_num [current]: 5
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-resourcegroup" class="common-anchor-header">delete resource_group<button data-href="#delete-resourcegroup" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a resource group.</p>
<p><h3 id="delete-resource-group">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete resource_group -n (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-resource-group">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-n</td><td style="text-align:left">–name</td><td style="text-align:left">[Required] The resource group name.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="transfer-replica" class="common-anchor-header">transfer replica<button data-href="#transfer-replica" class="anchor-icon" translate="no">
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
    </button></h2><p>Transfers replicas between resource groups.</p>
<p><h3 id="transfer-replica">Syntax</h3></p>
<pre><code translate="no" class="language-shell">transfer replica
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="transfer-replica">Interactive Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; transfer replica

Source resource group: __default_resource_group
Target resource group: my_rg
Collection name: car
Number of replicas to transfer: 1
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connections" class="common-anchor-header">list connections<button data-href="#list-connections" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists all Milvus connections.</p>
<p><h3 id="list-connections">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connectionhistory" class="common-anchor-header">list connection_history<button data-href="#list-connectionhistory" class="anchor-icon" translate="no">
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
    </button></h2><p>Lists saved connection history.</p>
<p><h3 id="list-connection-history">Syntax</h3></p>
<pre><code translate="no" class="language-shell">list connection_history
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-connectionhistory" class="common-anchor-header">delete connection_history<button data-href="#delete-connectionhistory" class="anchor-icon" translate="no">
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
    </button></h2><p>Deletes a saved connection from history.</p>
<p><h3 id="delete-connection-history">Syntax</h3></p>
<pre><code translate="no" class="language-shell">delete connection_history -uri (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-connection-history">Options</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Full name</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">–uri</td><td style="text-align:left">[Required] URI of the connection to delete.</td></tr>
<tr><td style="text-align:left">–help</td><td style="text-align:left">n/a</td><td style="text-align:left">Displays help for using the command.</td></tr>
</tbody>
</table>
<h2 id="show-output" class="common-anchor-header">show output<button data-href="#show-output" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows the current output format setting.</p>
<p><h3 id="show-output">Syntax</h3></p>
<pre><code translate="no" class="language-shell">show output
<button class="copy-code-btn"></button></code></pre>
<h2 id="set-output" class="common-anchor-header">set output<button data-href="#set-output" class="anchor-icon" translate="no">
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
    </button></h2><p>Sets the global output format for CLI results.</p>
<p><h3 id="set-output">Syntax</h3></p>
<pre><code translate="no" class="language-shell">set output (table|json|csv)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="set-output">Example</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; set output json
<button class="copy-code-btn"></button></code></pre>
<h2 id="history" class="common-anchor-header">history<button data-href="#history" class="anchor-icon" translate="no">
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
    </button></h2><p>Shows or clears command history.</p>
<p><h3 id="history">Syntax</h3></p>
<pre><code translate="no" class="language-shell">history [clear]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="history">Examples</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; history

milvus_cli &gt; history clear
<button class="copy-code-btn"></button></code></pre>
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
<div class="alert note"> You can also check the version of Milvus_CLI in a shell as shown in the following example. In this case, <code translate="no">milvus_cli --version</code> acts as a command.</div>
<p><h3 id="version">Example</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v1.2.1
<button class="copy-code-btn"></button></code></pre>
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
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
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
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Commands</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Command</th><th style="text-align:left">Description</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">alter</td><td style="text-align:left">Alter database, collection properties, or collection field.</td></tr>
<tr><td style="text-align:left">clear</td><td style="text-align:left">Clears the screen.</td></tr>
<tr><td style="text-align:left">compact</td><td style="text-align:left">Compact a collection.</td></tr>
<tr><td style="text-align:left">connect</td><td style="text-align:left">Connects to Milvus.</td></tr>
<tr><td style="text-align:left">create</td><td style="text-align:left">Create collection, database, partition, user, role, alias, index, and more.</td></tr>
<tr><td style="text-align:left">delete</td><td style="text-align:left">Delete collection, database, partition, alias, user, role, index, and more.</td></tr>
<tr><td style="text-align:left">exit</td><td style="text-align:left">Closes the command line window.</td></tr>
<tr><td style="text-align:left">flush</td><td style="text-align:left">Flush collection data to storage.</td></tr>
<tr><td style="text-align:left">get</td><td style="text-align:left">Get entities by IDs.</td></tr>
<tr><td style="text-align:left">grant</td><td style="text-align:left">Grant role, privilege, or privilege_group.</td></tr>
<tr><td style="text-align:left">help</td><td style="text-align:left">Displays help for using a command.</td></tr>
<tr><td style="text-align:left">history</td><td style="text-align:left">Show or clear command history.</td></tr>
<tr><td style="text-align:left">insert</td><td style="text-align:left">Import data into a collection.</td></tr>
<tr><td style="text-align:left">list</td><td style="text-align:left">List collections, databases, partitions, users, roles, and more.</td></tr>
<tr><td style="text-align:left">load</td><td style="text-align:left">Load a collection or partition.</td></tr>
<tr><td style="text-align:left">query</td><td style="text-align:left">Query entities with filter expressions.</td></tr>
<tr><td style="text-align:left">release</td><td style="text-align:left">Release a collection or partition.</td></tr>
<tr><td style="text-align:left">rename</td><td style="text-align:left">Rename collection.</td></tr>
<tr><td style="text-align:left">revoke</td><td style="text-align:left">Revoke role, privilege, or privilege_group.</td></tr>
<tr><td style="text-align:left">search</td><td style="text-align:left">Perform vector similarity search.</td></tr>
<tr><td style="text-align:left">set</td><td style="text-align:left">Set output format.</td></tr>
<tr><td style="text-align:left">show</td><td style="text-align:left">Show collection, database, partition, index details, and more.</td></tr>
<tr><td style="text-align:left">transfer</td><td style="text-align:left">Transfer replicas between resource groups.</td></tr>
<tr><td style="text-align:left">truncate</td><td style="text-align:left">Remove all data from a collection.</td></tr>
<tr><td style="text-align:left">update</td><td style="text-align:left">Update password or resource group.</td></tr>
<tr><td style="text-align:left">upsert</td><td style="text-align:left">Upsert data into a collection.</td></tr>
<tr><td style="text-align:left">use</td><td style="text-align:left">Use database.</td></tr>
<tr><td style="text-align:left">version</td><td style="text-align:left">Shows the version of Milvus_CLI.</td></tr>
</tbody>
</table>
