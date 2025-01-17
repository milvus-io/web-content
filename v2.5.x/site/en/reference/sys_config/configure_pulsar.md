---
id: configure_pulsar.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure pulsar for Milvus.
---

# pulsar-related Configurations

Related configuration of pulsar, used to manage Milvus logs of recent mutation operations, output streaming log, and provide log publish-subscribe services.

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
        <li>Environment variable: PULSAR_ADDRESS</li>      
        <li>pulsar.address and pulsar.port together generate the valid access to Pulsar.</li>      
        <li>Pulsar preferentially acquires the valid IP address from the environment variable PULSAR_ADDRESS when Milvus is started.</li>      
        <li>Default value applies when Pulsar is running on the same network with Milvus.</li>      </td>
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
      <td>        Port of Pulsar service.      </td>
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
      <td>        Web port of of Pulsar service. If you connect direcly without proxy, should use 8080.      </td>
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
        <li>The maximum size of each message in Pulsar. Unit: Byte.</li>      
        <li>By default, Pulsar can transmit at most 2MB of data in a single message. When the size of inserted data is greater than this value, proxy fragments the data into multiple messages to ensure that they can be transmitted correctly.</li>      
        <li>If the corresponding parameter in Pulsar remains unchanged, increasing this configuration will cause Milvus to fail, and reducing it produces no advantage.</li>      </td>
      <td>2097152</td>
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
        <li>To share a Pulsar instance among multiple Milvus instances, you can change this to an Pulsar tenant rather than the default one for each Milvus instance before you start them. However, if you do not want Pulsar multi-tenancy, you are advised to change msgChannel.chanNamePrefix.cluster to the different value.</li>      </td>
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
      <td>        A Pulsar namespace is the administrative unit nomenclature within a tenant.      </td>
      <td>default</td>
    </tr>
  </tbody>
</table>


## `pulsar.requestTimeout`

<table id="pulsar.requestTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        pulsar client global request timeout in seconds      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `pulsar.enableClientMetrics`

<table id="pulsar.enableClientMetrics">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to register pulsar client metrics into milvus metrics path.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


