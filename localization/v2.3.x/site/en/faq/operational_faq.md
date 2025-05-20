---
id: operational_faq.md
summary: Find answers to commonly asked questions about operations in Milvus.
title: Operational FAQ
---
<h1 id="Operational-FAQ" class="common-anchor-header">Operational FAQ<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><!-- TOC -->
<!-- /TOC -->
<h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">What if I failed to pull the Milvus Docker image from Docker Hub?</h4><p>If you failed to pull the Milvus Docker image from Docker Hub, try adding other registry mirrors.</p>
<p>Users from Mainland China can add the URL “https://registry.docker-cn.com” to the registry-mirrors array in <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Is Docker the only way to install and run Milvus?</h4><p>Docker is an efficient way to deploy Milvus, but not the only way. You can also deploy Milvus from source code. This requires Ubuntu (18.04 or higher) or CentOS (7 or higher). See <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Building Milvus from Source Code</a> for more information.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">What are the main factors affecting recall?</h4><p>Recall is affected mainly by index type and search parameters.</p>
<p>For FLAT index, Milvus takes an exhaustive scan within a collection, with a 100% return.</p>
<p>For IVF indexes, the nprobe parameter determines the scope of a search within the collection. Increasing nprobe increases the proportion of vectors searched and recall, but diminishes query performance.</p>
<p>For HNSW index, the ef parameter determines the breadth of the graph search. Increasing ef increases the number of points searched on the graph and recall, but diminishes query performance.</p>
<p>For more information, see <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Vector Indexing</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Why did my changes to the configuration files not take effect?</h4><p>Milvus does not support modification to configuration files during runtime. You must restart Milvus Docker for configuration file changes to take effect.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">How do I know if Milvus has started successfully?</h4><p>If Milvus is started using Docker Compose, run <code translate="no">docker ps</code> to observe how many Docker containers are running and check if Milvus services started correctly.</p>
<p>For Milvus standalone, you should be able to observe at least three running Docker containers, one being the Milvus service and the other two being etcd management and storage service. For more information, see <a href="/docs/v2.3.x/install_standalone-docker.md">Installing Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Why is the time in the log files different from the system time?</h4><p>The time difference is usually due to the fact that the host machine does not use Coordinated Universal Time (UTC).</p>
<p>The log files inside the Docker image use UTC by default. If your host machine does not use UTC, this issue may occur.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">How do I know if my CPU supports Milvus?</h4><p>Milvus’ computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Why does Milvus return <code translate="no">illegal instruction</code> during startup?</h4><p>Milvus requires your CPU to support a SIMD instruction set: SSE4.2, AVX, AVX2, or AVX512. CPU must support at least one of these to ensure that Milvus operates normally. An <code translate="no">illegal instruction</code> error returned during startup suggests that your CPU does not support any of the above four instruction sets.</p>
<p>See <a href="/docs/v2.3.x/prerequisite-docker.md">CPU’s support for SIMD Instruction Set</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Can I install Milvus on Windows?</h4><p>Yes. You can install Milvus on Windows either by compiling from source code or from a binary package.</p>
<p>See <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Run Milvus on Windows</a> to learn how to install Milvus on Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">I got an error when installing pymilvus on Windows. What shall I do?</h4><p>It is not recommended to install PyMilvus on Windows. But if you have to install PyMilvus on Windows but got an error, try installing it in a <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a> environment. See <a href="/docs/v2.3.x/install-pymilvus.md">Install Milvus SDK</a> for more information about how to install PyMilvus in the Conda environment.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Can I deploy Milvus when disconnected from the Internet?</h4><p>Yes. You can install Milvus in an offline environment. See <a href="/docs/v2.3.x/install_offline-helm.md">Install Milvus Offline</a> for more information.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Where can I find the logs generated by Milvus?</h4><p>The Milvus log is printed to stout (standard output) and stderr (standard error) by default, however we highly recommend redirecting your log to a persistent volume in production. To do so, update <code translate="no">log.file.rootPath</code> in <strong>milvus.yaml</strong>. And if you deploy Milvus with <code translate="no">milvus-helm</code> chart, you also need to enable log persistence first via <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>If you didn’t change the config, using kubectl logs &lt;pod-name&gt; or docker logs CONTAINER can also help you to find the log.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Can I create index for a segment before inserting data into it?</h4><p>Yes, you can. But we recommend inserting data in batches, each of which should not exceed 256 MB, before indexing each segment.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Can I share an etcd instance among multiple Milvus instances?</h4><p>Yes, you can share an etcd instance among multiple Milvus instances. To do so, you need to change <code translate="no">etcd.rootPath</code> to a separate value for each Milvus instance in the configuration files of each before starting them.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Can I share a Pulsar instance among multiple Milvus instances?</h4><p>Yes, you can share a Pulsar instance among multiple Milvus instances. To do so, you can</p>
<ul>
<li>If multi-tenancy is enabled on your Pulsar instance, consider allocating a separate tenant or namespace for each Milvus instance. To do so, you need to change <code translate="no">pulsar.tenant</code> or <code translate="no">pulsar.namespace</code> in the configuration files of your Milvus instances to a unique value for each before starting them.</li>
<li>If you do not plan on enabling multi-tenancy on your Pulsar instance, consider changing <code translate="no">msgChannel.chanNamePrefix.cluster</code> in the configuration files of your Milvus instances to a unique value for each before starting them.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Can I share a MinIO instance among multiple Milvus instances?</h4><p>Yes, you can share a MinIO instance among multiple Milvus instances. To do so, you need to change <code translate="no">minio.rootPath</code> to a unique value for each Milvus instance in the configuration files of each before starting them.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">How do I handle the error message <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>The error message <code translate="no">Illegal uri [example.db]</code> indicates that you are trying to connect to Milvus Lite using an earlier version of PyMilvus that does not support this connection type. To resolve this issue, upgrade your PyMilvus installation to at least version 2.4.2, which includes support for connecting to Milvus Lite.</p>
<p>You can upgrade PyMilvus using the following command:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Why am I getting fewer results than the <code translate="no">limit</code> I set in my search/query?</h4><p>There are several reasons why you might receive fewer results than the <code translate="no">limit</code> you specified:</p>
<ul>
<li><p><strong>Limited Data</strong>: The collection might not have enough entities to fulfill the limit you requested. If the total number of entities in the collection is less than the limit, you will naturally receive fewer results.</p></li>
<li><p><strong>Duplicate Primary Keys</strong>: Milvus prioritizes specific entities when encountering duplicate primary keys during a search. This behavior varies based on the search type:</p></li>
<li><p><strong>Query (Exact Match)</strong>: Milvus selects the latest entity with the matching PK.
ANN Search: Milvus selects the entity with the highest similarity score, even if entities share the same PK.
This prioritization can result in fewer unique results than the limit if your collection has many duplicate primary keys.</p></li>
<li><p><strong>Insufficient Matches</strong>: Your search filtering expressions might be too strict, resulting in fewer entities meeting the similarity threshold. If the conditions set for the search are too restrictive, not enough entities will match, leading to fewer results than expected.</p></li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Still have questions?</h4><p>You can:</p>
<ul>
<li>Check out <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> on GitHub. Feel free to ask questions, share ideas, and help others.</li>
<li>Join our <a href="https://discuss.milvus.io/">Milvus Forum</a> or <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack Channel</a> to find support and engage with our open-source community.</li>
</ul>
