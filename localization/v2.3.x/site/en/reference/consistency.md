---
id: consistency.md
summary: Learn about the four levels of consistency in Milvus.
title: Consistency
---
<h1 id="Consistency" class="common-anchor-header">Consistency<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the four levels of consistency in Milvus and their best-suited scenarios. The mechanism behind ensuring consistency in Milvus is also covered in this topic.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
<p>Milvus supports four consistency levels:  strong, bounded staleness, session, and eventually. The default consistency level in Milvus is bounded staleness.  You can easily tune the consistency level when conducting a <a href="/docs/v2.3.x/search.md">vector similarity search</a> or <a href="/docs/v2.3.x/query.md">query</a> to make it best suit your application.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Consistency levels<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>As defined by the <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a> theorem, a distributed database has to trade off among consistency, availability, and latency. High consistency implies high accuracy but also high search latency, while low consistency leads to fast search speed but a certain loss of data visibility. Therefore, different levels of consistency suit different scenarios.</p>
<p>The following explains the differences of the four consistency levels supported by Milvus and the scenarios they each suit.</p>
<h3 id="Strong" class="common-anchor-header">Strong</h3><p>Strong is the highest and the most strict level of consistency. It ensures that users can read the latest version of data.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
    <span>Strong consistency</span>
  </span>
</p>
<p>According to the PACELC theorem, if the consistency level is set to strong, the latency will increase. Therefore, we recommend choosing strong consistency during functional testings to ensure the accuracy of the test results. Strong consistency is also best suited for applications that have strict demand for data consistency at the cost of search speed. An example can be an online financial system dealing with order payments and billing.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Bounded staleness</h3><p>Bounded staleness, as its name suggests, allows data inconsistency during a certain period of time. However, generally, the data are always globally consistent out of that period of time.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
    <span>Bounded staleness consistency</span>
  </span>
</p>
<p>Bounded staleness is suitable for scenarios that need to control search latency and can accept sporadic data invisibility. For instance, in recommender systems like video recommendation engines, data invisibility sometimes has small impact on the overall recall rate, but can significantly boost the performance of the recommender system.</p>
<h3 id="Session" class="common-anchor-header">Session</h3><p>Session ensures that all data writes can be immediately perceived in reads during the same session. In other words, when you write data via one client, the newly inserted data instantaneously become searchable.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
    <span>Session consistency</span>
  </span>
</p>
<p>We recommend choosing session as the consistency level for those scenarios where the demand for data consistency in the same session is high. An example can be deleting the data of a book entry from the library system, and after confirmation of the deletion and refreshing the page (a different session), the book should no longer be visible in the search results.</p>
<h3 id="Eventually" class="common-anchor-header">Eventually</h3><p>There is no guaranteed order of reads and writes, and replicas eventually converge to the same state given that no further write operations are done. Under the consistency of &quot;eventually&quot;, replicas start working on read requests with the latest updated values. Eventually consistent is the weakest level among the four.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
    <span>Eventual consistency</span>
  </span>
</p>
<p>However, according to the PACELC theorem, search latency can be tremendously shortened upon sacrificing consistency. Therefore, eventually consistent is best suited for scenarios that do not have a high demand for data consistency but require blazing-fast search performance. An example can be retrieving reviews and ratings of Amazon products with the level of eventually consistent.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Guarantee timestamp<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus realizes different consistency levels by introducing the <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Guarantee timestamp</a> (GuaranteeTs).</p>
<p>A GuaranteeTs serves to inform query nodes that a search or query request will not be performed until all the data before the GuaranteeTs can be seen by the query nodes. When you specify the consistency level, the consistency level will map to a specific GuaranteeTs value. Different GuaranteeTs values correspond to different consistency levels:</p>
<ul>
<li><p><strong>Strong</strong>: GuaranteeTs is set as identical to the newest system timestamp, and query nodes wait until all the data before the newest system timestamp can be seen, before processing the search or query request.</p></li>
<li><p><strong>Bounded staleness</strong>: GuaranteeTs is set relatively smaller than the newest system timestamp, and query nodes search on a tolerable, less updated data view.</p></li>
<li><p><strong>Session</strong>: The client uses the timestamp of the latest write operation as the GuaranteeTs, so that each client can at least retrieve the data inserted by the same client.</p></li>
<li><p><strong>Eventually</strong>: GuaranteeTs is set to a very small value to skip the consistency check. Query nodes search immediately on the existing data view.</p></li>
</ul>
<p>See <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">How GuaranteeTs Works</a> for more information about the mechanism behind ensuring different levels of consistency in Milvus.</p>
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
<li>Learn how to tune consistency level when:
<ul>
<li><a href="/docs/v2.3.x/search.md">conducting a vector similarity search</a></li>
<li><a href="/docs/v2.3.x/query.md">conducting a vector query</a></li>
</ul></li>
</ul>
