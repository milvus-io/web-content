---
id: configure_knowhere.md
related_key: configure
summary: Learn how to configure common parameters of Milvus.
---

# Knowhere-related Configurations

This topic introduces the knowhere-related configurations of Milvus.

[Knowhere](https://github.com/milvus-io/milvus/blob/master/docs/design_docs/knowhere_design.md) is the search engine of Milvus.

Under this section, you can configure the default SIMD instruction set type of the system.

## `knowhere.simdType`

<table id="knowhere.simdType">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The CPU instruction set which can accelerate vector search and index building.</li>
        <li>Options: <code>auto</code>, <code>avx512</code>, <code>avx2</code>, <code>avx</code>, and <code>sse4_2</code></li>
      </td>
      <td>auto</td>
    </tr>
  </tbody>
</table>

