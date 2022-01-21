---
id: configure_knowhere.md
related_key: configure
summary: Learn how to configure common parameters of Milvus.
---

# Common Configurations

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


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

