---
id: configure_common.md
related_key: configure
summary: Learn how to configure common parameters of Milvus.
---

# Common Configurations

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


This topic introduces the common configurations of Milvus.

Under this section, you can configure the default names of partition and index, and the Time Travel (data retention) span of Milvus.

## `common.defaultPartitionName`

<table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name of the default partition when a collection is created.</td>
      <td>"_default"</td>
    </tr>
  </tbody>
</table>

## `common.defaultIndexName`

<table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name of the index when it is created with name unspecified.</td>
      <td>"_default_idx"</td>
    </tr>
  </tbody>
</table>

## `common.retentionDuration`

<table id="common.retentionDuration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The retention duration of the deleted data allowed for Time Travel.</li>
        <li>Unit: Second</li>
      </td>
      <td>432000</td>
    </tr>
  </tbody>
</table>

