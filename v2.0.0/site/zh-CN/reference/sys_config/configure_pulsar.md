---
id: configure_pulsar.md
related_key: configure
summary: Learn how to configure Pulsar for Milvus cluster.
---

# Pulsar-related Configurations

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


This topic introduces the Pulsar-related configurations of Milvus.

Pulsar is the underlying engine supporting Milvus cluster's reliable storage and publication/subscription of message streams. 

Under this section, you can configure Pulsar address, the message size, etc.


## `pulsar.address`

<table id="pulsar.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>IP address of Pulsar service.</li>
        <li>Environment variable: <code>PULSAR_ADDRESS</code></li>
        <li><code>pulsar.address</code> and <code>pulsar.port</code> together generate the valid access to Pulsar.</li>
        <li>Pulsar preferentially acquires the valid IP address from the environment variable <code>PULSAR_ADDRESS</code> when Milvus is started.</li>
        <li>Default value applies when Pulsar is running on the same network with Milvus.</li>
      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>


## `pulsar.port`

<table id="pulsar.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Port of Pulsar service.</li>
        <li>Environment variable: <code>PULSAR_ADDRESS</code></li>
        <li><code>pulsar.address</code> and <code>pulsar.port</code> together generate the valid access to Pulsar.</li>
        <li>Pulsar preferentially acquires the valid port from the environment variable <code>PULSAR_ADDRESS</code> when Milvus is started.</li>
      </td>
      <td>6650</td>
    </tr>
  </tbody>
</table>

## `pulsar.maxMessageSize`

<table id="pulsar.maxMessageSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each message in Pulsar.</li>
        <li>Unit: Byte</li>
        <li>By default, Pulsar can transmit at most 5 MB of data in a single message. When the size of inserted data is greater than this value, proxy fragments the data into multiple messages to ensure that they can be transmitted correctly.</li>
        <li>If the corresponding parameter in Pulsar remains unchanged, increasing this configuration will cause Milvus to fail, and reducing it produces no advantage.</li>
      </td>
      <td>5242880</td>
    </tr>
  </tbody>
</table>

