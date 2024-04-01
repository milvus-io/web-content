---
id: configure_pulsar.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure Pulsar for Milvus cluster.
title: Pulsar-related Configurations
---

# Pulsar-related Configurations

This topic introduces the Pulsar-related configurations of Milvus.

Pulsar is the underlying engine supporting Milvus cluster's reliable storage and publication/subscription of message streams. 

Under this section, you can configure Pulsar address, the message size, etc.

<div class="alert note">
<li>To share a Pulsar instance with multi-tenancy enabled among multiple Milvus instances, you need to change <code>pulsar.tenant</code> or <code>pulsar.namespace</code> to a unique value for each of the Milvus instances. </li>
<li>To share a Pulsar instance with multi-tenancy disabled among multiple Milvus instances, you need to change <code>msgChannel.chanNamePrefix.cluster</code> to a unique value for each of the Milvus instances.</li>
For details, refer to <a href="operational_faq.md#Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances">Operation FAQs</a>.
</div>


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

## `pulsar.webport`

<table id="pulsar.webport">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Web port of of Pulsar service. </li>
        <li>If you connect direcly without proxy, should use 8080</li>
      </td>
      <td>80</td>
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

## `pulsar.tenant`

<table id="pulsar.tenant">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Pulsar can be provisioned for specific tenants with appropriate capacity allocated to the tenant.</li>
        <li>To share a Pulsar instance among multiple Milvus instances, you can change this to an Pulsar tenant rather than the default one for each Milvus instance before you start them. However, if you do not want Pulsar multi-tenancy, you are advised to change <code>msgChannel.chanNamePrefix.cluster</code> to the different value. For details, see <a href="operational_faq.md#Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
      </td>
      <td>public</td>
    </tr>
  </tbody>
</table>

## `pulsar.namespace`

<table id="pulsar.namespace">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>A Pulsar namespace is the administrative unit nomenclature within a tenant.</li>
        <li>To share a Pulsar instance among multiple Milvus instances, you can change this to an Pulsar tenant rather than the default one for each Milvus instance before you start them. However, if you do not want Pulsar multi-tenancy, you are advised to change <code>msgChannel.chanNamePrefix.cluster</code> to the different value. For details, see <a href="operational_faq.md#Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
      </td>
      <td>default</td>
    </tr>
  </tbody>
</table>
