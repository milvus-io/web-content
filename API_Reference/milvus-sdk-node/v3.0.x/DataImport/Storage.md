# Storage

This interface stores files produced by `BulkWriter`. Use it to upload generated files to object storage or another remote location before calling `bulkInsert()`.

```javascript
interface Storage
```

**METHODS:**

- `write(localPath: string, remotePath: string): Promise<string>`

    Stores a generated local file and returns the final path that should be passed to Milvus import APIs.

## Example

```javascript
class S3Storage {
    async write(localPath, remotePath) {
        await uploadToS3(localPath, remotePath);
        return \`s3://bucket/${remotePath}\`;
    }
}
```
