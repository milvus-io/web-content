---
id: attu_faq.md
related_key: attu
summary: Find the most commonly asked questions about Attu.
title: ''
---
<h1 id="Attu-FAQ" class="common-anchor-header">Attu FAQ<button data-href="#Attu-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="Why-is-Attu-throwing-a-network-error" class="common-anchor-header">Why is Attu throwing a network error?</h4><p>A: Check whether you have assigned a correct value to <code translate="no">HOST_URL</code> in the <code translate="no">docker run</code> command. Alternatively, you can enter <code translate="no">{HOST_URL}/api/v1/healthy</code> in the address bar of your browser to check the network status of Attu.</p>
<h4 id="Why-did-Attu-fail-to-connect-to-Milvus" class="common-anchor-header">Why did Attu fail to connect to Milvus?</h4><p>A: Ensure that Milvus and Attu are on the same network.</p>
<h4 id="How-do-I-use-Attu-with-K8s" class="common-anchor-header">How do I use Attu with K8s?</h4><p>A: You can <a href="/docs/v2.1.x/attu_install-helm.md">install Attu while deploying Milvus with Helm</a>.</p>
