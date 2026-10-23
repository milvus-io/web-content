# LoadState

The load state of a collection or partition.

```csharp
public enum LoadState
{
    NotExist = 0,
    NotLoad = 1,
    Loading = 2,
    Loaded = 3
}
```

**VALUES:**

- **NotExist** (0) - The entity does not exist.

- **NotLoad** (1) - The entity is not loaded.

- **Loading** (2) - The entity is being loaded.

- **Loaded** (3) - The entity is loaded.
