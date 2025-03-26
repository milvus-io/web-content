---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Pelajari cara mengonfigurasi Horizontal Pod Autoscaling (HPA) untuk
  menskalakan klaster Milvus secara dinamis.
title: Mengonfigurasi Horizontal Pod Autoscaling (HPA) untuk Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Mengonfigurasi Horizontal Pod Autoscaling (HPA) untuk Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA) adalah fitur Kubernetes yang secara otomatis menyesuaikan jumlah Pod dalam penerapan berdasarkan pemanfaatan sumber daya, seperti CPU atau memori. Di Milvus, HPA dapat diterapkan pada komponen tanpa nama seperti <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code>, dan <code translate="no">indexNode</code> untuk menskalakan klaster secara dinamis sebagai respons terhadap perubahan beban kerja.</p>
<p>Panduan ini menjelaskan cara mengonfigurasi HPA untuk komponen Milvus menggunakan Milvus Operator.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Cluster Milvus yang sedang berjalan yang digunakan dengan Milvus Operator.</li>
<li>Akses ke <code translate="no">kubectl</code> untuk mengelola sumber daya Kubernetes.</li>
<li>Pemahaman tentang arsitektur Milvus dan Kubernetes HPA.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Mengonfigurasi HPA dengan Operator Milvus<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengaktifkan HPA dalam cluster Milvus yang dikelola oleh Operator Milvus, ikuti langkah-langkah berikut:</p>
<ol>
<li><p><strong>Atur Replicas ke -1</strong>:</p>
<p>Di sumber daya khusus (CR) Milvus, atur bidang <code translate="no">replicas</code> ke <code translate="no">-1</code> untuk komponen yang ingin Anda skala dengan HPA. Hal ini akan mendelegasikan kontrol penskalaan ke HPA, bukan ke operator. Anda dapat mengedit CR secara langsung atau menggunakan perintah <code translate="no">kubectl patch</code> berikut ini untuk beralih ke kontrol HPA dengan cepat:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ganti <code translate="no">&lt;your-release-name&gt;</code> dengan nama cluster Milvus Anda.</p>
<p>Untuk memverifikasi bahwa perubahan telah diterapkan, jalankan:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan adalah <code translate="no">-1</code>, yang mengonfirmasi bahwa komponen <code translate="no">proxy</code> sekarang berada di bawah kendali HPA.</p>
<p>Atau, Anda dapat mendefinisikannya di CR YAML:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Tentukan Sumber Daya HPA</strong>:</p>
<p>Buat sumber daya HPA untuk menargetkan penerapan komponen yang diinginkan. Di bawah ini adalah contoh untuk komponen <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p>Ganti <code translate="no">my-release</code> di <code translate="no">metadata.name</code> dan <code translate="no">spec.scaleTargetRef.name</code> dengan nama cluster Milvus Anda yang sebenarnya (mis., <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> dan <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Terapkan Konfigurasi HPA</strong>:</p>
<p>Terapkan sumber daya HPA menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Untuk memverifikasi bahwa HPA telah berhasil dibuat, jalankan:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>Anda akan melihat keluaran yang mirip dengan:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Kolom <code translate="no">NAME</code> dan <code translate="no">REFERENCE</code> akan mencerminkan nama cluster Anda (mis., <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> dan <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Menentukan penerapan yang akan diskalakan (mis., <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> dan <code translate="no">maxReplicas</code>: Mengatur rentang penskalaan (2 hingga 10 Pod dalam contoh ini).</li>
<li><code translate="no">metrics</code>: Mengonfigurasi penskalaan berdasarkan pemanfaatan CPU dan memori, dengan target penggunaan rata-rata 60%.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA memungkinkan Milvus beradaptasi secara efisien dengan berbagai beban kerja. Dengan menggunakan perintah <code translate="no">kubectl patch</code>, Anda dapat dengan cepat mengalihkan komponen ke kontrol HPA tanpa mengedit CR secara manual. Untuk lebih jelasnya, lihat <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">dokumentasi HPA Kubernetes</a>.</p>
