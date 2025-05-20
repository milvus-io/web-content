# About

Milvus Java SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-java).

## **Compatibility**

<table>
    <tr>
        <th>Milvus version</th>
        <th>Recommended SDK version</th>
    </tr>
    <tr>
        <td>2.0.2</td>
        <td>2.0.4</td>
    </tr>
    <tr>
        <td>2.1</td>
        <td>2.1.0-beta4</td>
    </tr>
    <tr>
        <td>2.2.0 ~ 2.2.8</td>
        <td>2.2.5</td>
    </tr>
    <tr>
        <td>2.2.9 ~ 2.2.14</td>
        <td>2.2.13</td>
    </tr>
    <tr>
        <td>2.3.x</td>
        <td>2.3.9</td>
    </tr>
    <tr>
        <td>2.4.x</td>
        <td>2.4.9</td>
    </tr>
    <tr>
        <td>2.5.x</td>
        <td>2.5.9</td>
    </tr>
</table>

## **Installation**

You can use **[Apache Maven](https://maven.apache.org/install.html)** or **[Gradle](https://gradle.org/install/)** to download the SDK.

- Apache Maven

```xml
 <dependency>
     <groupId>io.milvus</groupId>
     <artifactId>milvus-sdk-java</artifactId>
     <version>2.5.9</version>
 </dependency>
```

- Gradle/Groovy

```plaintext
implementation 'io.milvus:milvus-sdk-java:2.5.9'
```

- Gradle/Kotlin

```sql
implementation("io.milvus:milvus-sdk-java:2.5.2")
```

Since v2.5.2, Milvus Java SDK has been split into two packages: **milvus-sdk-java** and **milvus-sdk-java-bulkwriter**. If you do not need BulkWriter, ignore the **milvus-sdk-java-bulkwriter** package. To use BulkWriter, import the **milvus-sdk-java-bulkwriter** as follows:

```xml
 <dependency>
     <groupId>io.milvus</groupId>
     <artifactId>milvus-sdk-java-bulkwriter</artifactId>
     <version>2.5.9</version>
 </dependency>
```

- Gradle/Groovy

```plaintext
implementation 'io.milvus:milvus-sdk-java-bulkwriter:2.5.9'
```

- Gradle/Kotlin

```sql
implementation("io.milvus:milvus-sdk-java-bulkwriter:2.5.9")
```

## **Contributing**

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to Milvus Java SDK are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-java/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-java/issues/new) if you need any assistance or want to propose your ideas
