---
id: configure_knowhere.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure Knowhere-related parameters of Milvus.
title: Knowhere-related Configurations
---

# Knowhere-related Configurations

This topic introduces the knowhere-related configurations of Milvus.

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

