---
id: bitset.md
summary: Learn about bitsets in Milvus.
title: ''
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the bitset mechanism that helps enable key functionalities like <a href="/docs/v2.1.x/timetravel_ref.md">Time Travel</a>, attribute filtering, and <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">delete operations</a> in Milvus.</p>
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
    </button></h2><p>A bitset is a set of bits. Bits are elements with only two possible values, most typically <code translate="no">0</code> and <code translate="no">1</code>, or boolean values <code translate="no">true</code> and <code translate="no">false</code>. In Milvus, bitsets are arrays of bit numbers <code translate="no">0</code> and <code translate="no">1</code> that can be used to represent certain data compactly and efficiently as opposed to in ints, floats, or chars. A bit number is <code translate="no">0</code> by default and is only set to <code translate="no">1</code> if it meets certain requirements.</p>
<p>Operations on bitsets are conducted with <a href="/docs/v2.1.x/boolean.md">boolean logic</a>, under which an output value is either valid or invalid, also denoted by <code translate="no">1</code> and <code translate="no">0</code> respectively. For example, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">logical operator</a> <code translate="no">AND</code> can be used to compare two bitsets based on items in the same index positions and produces a new bitset with the results. If two items in a position are the same, then in the new bitset <code translate="no">1</code> will be written in that position; <code translate="no">0</code> if they are different.</p>
<h2 id="Implementation" class="common-anchor-header">Implementation<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset is a simple yet powerful mechanism that helps Milvus perform attribute filtering, data deletion, and query with Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Attribute filtering</h3><p>As bitsets contain only two possible values, they are perfect for storing results of <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">attribute filtering</a>. Data that meet the requirement of a given attribute filter are marked with <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Data deletion</h3><p>Bitsets serve as a compact way to store information about whether a row in a segment is deleted. Deleted entities are marked with <code translate="no">1</code> in the corresponding bitset, which <a href="https://milvus.io/blog/deleting-data-in-milvus.md">will not be computed</a> during a search or query.</p>
<h3 id="Query-with-Time-Travel" class="common-anchor-header">Query with Time Travel</h3><p>When you search with Time Travel, Milvus uses bitsets to store information about whether data in a segment meet your timestamp requirement in <code translate="no">travel_timestamp</code>. Data are marked as <code translate="no">1</code> if their timestamp is larger than or equals to the requirement, meaning they are present at the given time. The exact process is more complicated for Time Travel to be as efficient as it can be. See <a href="https://milvus.io/docs/v2.1.x/timetravel_ref.md#Bitset-for-timestamp">Bitset for timestamp</a> for more information.</p>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Here we present three examples that illustrate how bitsets are used in Milvus, with references to all three major implementations of bitsets discussed above. In all three cases, there is a segment with 8 entities and then a series of data manipulation language (DML) events takes place in the order shown below.</p>
<ul>
<li>Four of the entities, whose <code translate="no">primary_key</code>s are [1, 2, 3, 4] respectively, are inserted when the timestamp <code translate="no">ts</code> equals 100.</li>
<li>The rest four entities, whose <code translate="no">primary_key</code>s are [5, 6, 7, 8], are inserted when the timestamp <code translate="no">ts</code> equals 200.</li>
<li>Entities whose <code translate="no">primary_key</code>s are [7, 8] are deleted when the timestamp <code translate="no">ts</code> equals 300.</li>
<li>Only entities, whose <code translate="no">primary_key</code>s are [1, 3, 5, 7], satisfy the conditions of attribute filtering.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
    <span>Order of DML events</span>
  </span>
</p>
<h3 id="Case-one" class="common-anchor-header">Case one</h3><p>In this case, a user sets <code translate="no">time_travel</code> as 150, which means that the user conducts a query on data that satisfy <code translate="no">ts = 150</code>. The bitset generation process is illustrated by Figure 1.</p>
<p>During the initial filtering stage, the <code translate="no">filter_bitset</code> should be <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, where entities [1, 3, 5, 7] are marked as <code translate="no">1</code> because they are valid filtering results.</p>
<p>However, entities [4, 5, 6, 7] were not inserted to the vector database when <code translate="no">ts</code> equals 150. Therefore, these four entities should be marked as 0 regardless of the filtering condition. Now the bitset result should be <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>As discussed in <a href="#data-deletion">Data deletion</a>, entities that are marked with <code translate="no">1</code> are ignored during a search or query. The bitset result now needs to be flipped in order to be combined with the deletion bitmap, which gives us <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>As for the deletion bitset <code translate="no">del_bitset</code>, the initial value should be <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. However, entities 7 and 8 are not deleted until <code translate="no">ts</code> is 300. Therefore, when <code translate="no">ts</code> is 150, entities 7 and 8 are still valid. As a result, the <code translate="no">del_bitset</code> value after Time Travel is <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Now we have two bitsets after Time Travel and attribute filtering: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> and <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.  Combine these two bitsets with the <code translate="no">OR</code> binary logic operator. The ultimate value of result_bitset is <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, meaning only entities 1 and 3 will be computed in the following search or query stage.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
    <span>Figure 1. Search with Time Travel = 150.</span>
  </span>
</p>
<h3 id="Case-two" class="common-anchor-header">Case two</h3><p>In this case, the user sets <code translate="no">time_travel</code> as 250. The bitset generation process is illustrated by Figure 2.</p>
<p>Like in case one, the initial <code translate="no">filter_bitset</code> is <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>All entities are in the vector database when <code translate="no">ts</code> = 250. Therefore, the <code translate="no">filter_bitset</code> stays the same when we factor in the timestamp. Again, we need to flip the result and get <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>As for the deletion bitset <code translate="no">del_bitset</code>, the initial value is <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. However, entities 7 and 8 were not deleted until <code translate="no">ts</code> is 300. Therefore, when <code translate="no">ts</code> is 250, entities 7 and 8 are still valid. As a result, the <code translate="no">del_bitset</code> after Time Travel is <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Now we have two bitsets after Time Travel and attribute filtering: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> and <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>. Combine these two bitsets with the <code translate="no">OR</code> binary logic operator. The result_bitset is <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. That is to say, only entites [1, 3, 5, 7] will be computed in the following search or query stage.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
    <span>Figure 2. Search with Time Travel = 250.</span>
  </span>
</p>
<h3 id="Case-three" class="common-anchor-header">Case three</h3><p>In this case, the user sets <code translate="no">time_travel</code> as 350. The bitset generation process is illustrated by Figure 3.</p>
<p>As with previous cases, the initial <code translate="no">filter_bitset</code> is <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>All entities are in the vector database when <code translate="no">ts</code>= 350. Therefore, the final, flipped <code translate="no">filter_bitset</code> is <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, the same as in case two.</p>
<p>As for the deletion bitset <code translate="no">del_bitset</code>, since entities 7 and 8 have already been deleted when <code translate="no">ts = 350</code>, therefore, the result of <code translate="no">del_bitset</code> is <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Now we have two bitsets after Time Travel and attribute filtering: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> and <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.  Combine these two bitsets with the <code translate="no">OR</code> binary logic operator. The ultimate <code translate="no">result_bitset</code> is <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. That is to say, only entities [1, 3, 5] will be computed in the following search or query stage.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
    <span>Figure 3. Search with Time Travel = 350.</span>
  </span>
</p>
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
    </button></h2><p>Now that you know how bitsets work in Milvus, you might also want to:</p>
<ul>
<li>Learn how to <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">use strings to filter</a> your search results, or refer to <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">Hybrid Search</a> on our docs.</li>
<li>Learn more about how to <a href="https://milvus.io/docs/v2.1.x/timetravel.md">search with Time Travel</a>.</li>
<li>Understand <a href="https://milvus.io/docs/v2.1.x/data_processing.md">how data are processed</a> in Milvus.</li>
</ul>
