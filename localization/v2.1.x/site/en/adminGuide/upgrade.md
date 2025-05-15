---
id: upgrade.md
related_key: upgrade Milvus
summary: Learn how to upgrade Milvus.
title: ''
---
<h1 id="Upgrade-Milvus-Using-Helm-Chart" class="common-anchor-header">Upgrade Milvus Using Helm Chart<button data-href="#Upgrade-Milvus-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to upgrade Milvus 2.x with Helm Chart using the example of upgrading from Milvus v2.0.2 to v2.1.0.</p>
<div class="alert note">
Helm Chart does not support upgrading from Milvus 2.0 standalone to Milvus 2.0 cluster or vice versa. Milvus 2.0.0-RC7 is not compatible with earlier RC versions. Therefore, you cannot upgrade from prior versions to 2.0.0-RC7.
</div>
<h2 id="Upgrade-Milvus-standalone" class="common-anchor-header">Upgrade Milvus standalone<button data-href="#Upgrade-Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Check-the-Milvus-version" class="common-anchor-header">Step 1. Check the Milvus version</h3><p>Run <code translate="no">$ helm list</code> to check your Milvus app version. You can see the <code translate="no">APP VERSION</code> is 2.0.2.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>              <span class="hljs-variable constant_">NAMESPACE</span>        <span class="hljs-variable constant_">REVISION</span>        <span class="hljs-variable constant_">UPDATED</span>                                     <span class="hljs-variable constant_">STATUS</span>          <span class="hljs-variable constant_">CHART</span>               <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>
my-release        <span class="hljs-keyword">default</span>          <span class="hljs-number">1</span>               <span class="hljs-number">2022</span>-<span class="hljs-number">07</span>-<span class="hljs-number">28</span> <span class="hljs-number">15</span>:<span class="hljs-number">28</span>:<span class="hljs-number">12.32068</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>          deployed        milvus-<span class="hljs-number">3.0</span><span class="hljs-number">.29</span>        <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Check-the-running-pods" class="common-anchor-header">Step 2. Check the running pods</h3><p>Run <code translate="no">$ kubectl get pods</code> to check the running pods. You can see the following output.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Check-the-image-tag" class="common-anchor-header">Step 3. Check the image tag</h3><p>Check the image tag for the pod <code translate="no">my-release-milvus-standalone-75c599fffc-6rwlj</code>. You can see the release of your Milvus standalone is v2.0.2.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-standalone<span class="hljs-number">-75</span>c599fffc<span class="hljs-number">-6</span>rwlj -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">milvusdb/milvus:v2.0.2
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Check-new-Milvus-standalone-versions" class="common-anchor-header">Step 4. Check new Milvus standalone versions</h3><p>Run the following commands to check new Milvus versions. You can see there are several new versions after v2.0.2.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo milvus --versions
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.2</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.1</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.0</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.29</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.28</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.27</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.26</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.25</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.24</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.23</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.21</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.20</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.19</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.18</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Upgrade" class="common-anchor-header">Step 5. Upgrade</h3><ol>
<li>Run the following commands to upgrade your Milvus standalone from  v2.0.2 to v2.1.0.</li>
</ol>
<pre><code translate="no">$ helm repo update
$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Run <code translate="no">$ helm list</code> again to check your Milvus app version. You can see your Milvus standalone has been upgraded to v2.1.0.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>              <span class="hljs-variable constant_">NAMESPACE</span>        <span class="hljs-variable constant_">REVISION</span>        <span class="hljs-variable constant_">UPDATED</span>                                     <span class="hljs-variable constant_">STATUS</span>          <span class="hljs-variable constant_">CHART</span>               <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>
my-release        <span class="hljs-keyword">default</span>          <span class="hljs-number">2</span>               <span class="hljs-number">2022</span>-<span class="hljs-number">07</span>-<span class="hljs-number">28</span> <span class="hljs-number">15</span>:<span class="hljs-number">40</span>:<span class="hljs-number">18.22437</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>        deployed        milvus-<span class="hljs-number">3.1</span><span class="hljs-number">.2</span>        <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Run <code translate="no">$ kubectl get pods</code> to check the new pods. You can see the following output.</li>
</ol>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          3m32s
my-release-milvus-standalone-6967454987-72r55   1/1     Running   0          22s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          3m32s
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
When upgrading your Milvus standalone, old pods will be deleted. Therefore, the service may be offline for a short period of time.
</div>
<ol start="4">
<li>Run the following command to check the new image version. You can see it is v2.0.0-rc8 now.</li>
</ol>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-standalone<span class="hljs-number">-6967454987</span><span class="hljs-number">-72</span>r55 -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">milvusdb/milvus:v2.1.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-cluster" class="common-anchor-header">Upgrade Milvus cluster<button data-href="#Upgrade-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Check-the-Milvus-version" class="common-anchor-header">Step 1. Check the Milvus version</h3><p>Run <code translate="no">$ helm list</code> to check your Milvus app version. You can see the <code translate="no">APP VERSION</code> is 2.0.2.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>              <span class="hljs-variable constant_">NAMESPACE</span>        <span class="hljs-variable constant_">REVISION</span>        <span class="hljs-variable constant_">UPDATED</span>                                     <span class="hljs-variable constant_">STATUS</span>          <span class="hljs-variable constant_">CHART</span>               <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>
my-release        <span class="hljs-keyword">default</span>          <span class="hljs-number">1</span>               <span class="hljs-number">2022</span>-<span class="hljs-number">07</span>-<span class="hljs-number">28</span> <span class="hljs-number">15</span>:<span class="hljs-number">50</span>:<span class="hljs-number">43.21188</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>          deployed        milvus-<span class="hljs-number">3.0</span><span class="hljs-number">.29</span>        <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Check-the-running-pods" class="common-anchor-header">Step 2. Check the running pods</h3><p>Run <code translate="no">$ kubectl get pods</code> to check the running pods. You can see the following output.</p>
<pre><code translate="no">NAME                                              READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                 1/1     Running     0          5m40s
my-release-etcd-1                                 1/1     Running     0          5m40s
my-release-etcd-2                                 1/1     Running     0          5m40s
my-release-milvus-datacoord-c99d7dfdf-mjghl       1/1     Running     0          5m40s
my-release-milvus-datanode-69cccf85d8-9r8ph       1/1     Running     0          5m40s
my-release-milvus-indexcoord-64f7d548fb-46hn8     1/1     Running     0          5m40s
my-release-milvus-indexnode-57b96d9cc7-gvmvl      1/1     Running     0          5m40s
my-release-milvus-proxy-6664d564f9-pwqn9          1/1     Running     0          5m40s
my-release-milvus-querycoord-59767cb88c-n54l6     1/1     Running     0          5m40s
my-release-milvus-querynode-847ccdf855-78mnz      1/1     Running     0          5m40s
my-release-milvus-rootcoord-597bd9f565-2jgzq      1/1     Running     0          5m40s
my-release-minio-0                                1/1     Running     0          5m40s
my-release-minio-1                                1/1     Running     0          5m40s
my-release-minio-2                                1/1     Running     0          5m40s
my-release-minio-3                                1/1     Running     0          5m40s
my-release-pulsar-autorecovery-869bffb7b8-g4cbh   1/1     Running     0          5m40s
my-release-pulsar-bastion-7c659df966-86b5s        1/1     Running     0          5m40s
my-release-pulsar-bookkeeper-0                    1/1     Running     0          5m40s
my-release-pulsar-bookkeeper-1                    1/1     Running     0          3m54s
my-release-pulsar-broker-864775f5ff-zlnfx         1/1     Running     0          5m40s
my-release-pulsar-proxy-86bcdbbb4c-24kcj          2/2     Running     0          5m40s
my-release-pulsar-zookeeper-0                     1/1     Running     0          5m40s
my-release-pulsar-zookeeper-1                     1/1     Running     0          5m20s
my-release-pulsar-zookeeper-2                     1/1     Running     0          5m5s
my-release-pulsar-zookeeper-metadata-hw5xt        0/1     Completed   0          5m40s
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Check-the-image-tag" class="common-anchor-header">Step 3. Check the image tag</h3><p>Check the image tag for the pod <code translate="no">my-release-milvus-proxy-6664d564f9-pwqn9</code>. You can see the release of your Milvus cluster is v2.0.2.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6664</span>d564f9-pwqn9 -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">milvusdb/milvus:v2.0.2
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Check-new-Milvus-cluster-versions" class="common-anchor-header">Step 4. Check new Milvus cluster versions</h3><p>Run the following commands to check new Milvus versions. You can see there are several new versions after 2.0.2.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo milvus --versions
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.2</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.1</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.1</span><span class="hljs-number">.0</span>                <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.29</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.28</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.27</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.26</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.25</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.24</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.23</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.21</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.20</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.19</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
milvus/milvus        <span class="hljs-number">3.0</span><span class="hljs-number">.18</span>               <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>                     Milvus <span class="hljs-keyword">is</span> an <span class="hljs-built_in">open</span>-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Upgrade" class="common-anchor-header">Step 5. Upgrade</h3><ol>
<li>Run the following commands to upgrade your Milvus cluster from v2.0.2 to v2.1.0.</li>
</ol>
<pre><code translate="no">$ helm repo update
$ helm upgrade my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Run <code translate="no">$ helm list</code> again to check your Milvus version. You can see your Milvus cluster has been upgraded to v2.1.0.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>              <span class="hljs-variable constant_">NAMESPACE</span>        <span class="hljs-variable constant_">REVISION</span>        <span class="hljs-variable constant_">UPDATED</span>                                     <span class="hljs-variable constant_">STATUS</span>          <span class="hljs-variable constant_">CHART</span>               <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>
my-release        <span class="hljs-keyword">default</span>          <span class="hljs-number">2</span>               <span class="hljs-number">2022</span>-<span class="hljs-number">07</span>-<span class="hljs-number">28</span> <span class="hljs-number">16</span>:<span class="hljs-number">05</span>:<span class="hljs-number">20.11326</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>        deployed        milvus-<span class="hljs-number">3.1</span><span class="hljs-number">.2</span>        <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Run <code translate="no">$ kubectl get pods</code> to check the new pods. You can see the following output.</li>
</ol>
<pre><code translate="no">NAME                                              READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                 1/1     Running   0          71s
my-release-etcd-1                                 1/1     Running   0          2m34s
my-release-etcd-2                                 1/1     Running   0          3m41s
my-release-milvus-datacoord-76d55548b6-zl4kj      1/1     Running   0          3m45s
my-release-milvus-datanode-5b9774cc75-dhn7j       1/1     Running   0          3m45s
my-release-milvus-indexcoord-96549bfff-r9m99      1/1     Running   0          3m45s
my-release-milvus-indexnode-f7c9b444b-vjqnm       1/1     Running   0          3m44s
my-release-milvus-proxy-5685bbc546-v6scq          1/1     Running   0          3m44s
my-release-milvus-querycoord-5fcd65544-8m6lb      1/1     Running   0          3m44s
my-release-milvus-querynode-5b76d575f6-2szfj      1/1     Running   0          3m44s
my-release-milvus-rootcoord-8668f8c46b-9nss2      1/1     Running   0          3m44s
my-release-minio-0                                1/1     Running   0          11m
my-release-minio-1                                1/1     Running   0          11m
my-release-minio-2                                1/1     Running   0          11m
my-release-minio-3                                1/1     Running   0          11m
my-release-pulsar-autorecovery-869bffb7b8-g4cbh   1/1     Running   0          11m
my-release-pulsar-bastion-7c659df966-86b5s        1/1     Running   0          11m
my-release-pulsar-bookkeeper-0                    1/1     Running   0          11m
my-release-pulsar-bookkeeper-1                    1/1     Running   0          9m55s
my-release-pulsar-broker-864775f5ff-zlnfx         1/1     Running   0          11m
my-release-pulsar-proxy-86bcdbbb4c-24kcj          2/2     Running   0          11m
my-release-pulsar-zookeeper-0                     1/1     Running   0          11m
my-release-pulsar-zookeeper-1                     1/1     Running   0          11m
my-release-pulsar-zookeeper-2                     1/1     Running   0          11m
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Run the following command to check the new image version. You can see it is v2.1.0 now.</li>
</ol>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-5685b</span>bc546-v6scq -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">milvusdb/milvus:v2.1.0
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
    </button></h2><ul>
<li>You might also want to learn how to:
<ul>
<li><a href="/docs/v2.1.x/scaleout.md">Scale a Milvus cluster</a></li>
</ul></li>
<li>If you are ready to deploy your cluster on clouds:
<ul>
<li>Learn how to <a href="/docs/v2.1.x/aws.md">Deploy Milvus on AWS with Terraform and Ansible</a></li>
<li>Learn how to <a href="/docs/v2.1.x/eks.md">Deploy Milvus on Amazon EKS with Terraform</a></li>
<li>Learn how to <a href="/docs/v2.1.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li>Learn how to <a href="/docs/v2.1.x/azure.md">Deploy Milvus on Microsoft Azure With Kubernetes</a></li>
</ul></li>
</ul>
