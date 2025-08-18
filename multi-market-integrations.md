# **Organization Key (`organizationKey`): Multi-Market and Region Isolation**

The Organization Key (`organizationKey`) is a globally unique identifier (GUID).
It defines which market or country your data belongs to and guarantees that all IDs are correctly scoped and isolated across regions.

---

### **Summary**

The `organizationKey` is your **trusted scope**:

* ✅ Always route your API and auth calls to the correct domains for each organization.
* ✅ Always store the `organizationKey` with every ID. [More details](#3-always-store-ids-with-the-organizationkey)

This ensures your integration remains isolated, consistent, and ready to scale across multiple markets.

---

## **How to implement a Multi-Market or Multi-Region Integration**


### 1. Domain information

Connected Cars will provide you with the domain information for each `organizationKey`.

The most relevant domains are:

* **`apiDomain`** — the GraphQL API endpoint for that organization.
  [See API documentation](https://docs.connectedcars.io/#/?id=graphql-api)

* **`authApiDomain`** — the authorization endpoint for service account tokens and logins.
  [See Auth documentation](https://docs.connectedcars.io/#/?id=auth-api)

Other domains may be relevant depending on your use case.

---

### 2. Service account mapping, organization namespaces, and authentication

Each organization must have its own **service account**, tied to an **organization namespace**.
An **organization namespace** is the combination of your `organizationKey` and a product-specific suffix:

```
${organizationKey}:workshop
```

**Example:**

```
"connectedcarsdk:workshop"
```

---

**Why this matters:**
If your integration uses **multiple products** under the same `organizationKey`, each product has its own namespace:

* `${organizationKey}:workshop` — workshop product
* `${organizationKey}:default` — fleet product
* `${organizationKey}:leasing` — leasing product

Connected Cars will provide you with multiple service accounts if required.

---

**Key point:**
If you operate more than one product, you must ensure your integration:

* Uses the **correct organization namespace** for each product.
* Uses the **matching service account** scoped to that namespace.
* ❌ Does **not reuse** a service account or token across different organization namespaces.

---

**How to handle this:**

* Map each **organization namespace** and service account in your configuration.

When authenticating:

* Use the correct **service account** for the resolved namespace.
* Use the correct **`authApiDomain`**.
* Send GraphQL queries to the correct **`apiDomain`** and include the **namespace** in the `X-Organization-Namespace` header.
* Never reuse tokens across different `organizationKeys` or namespaces.

> ⚠️ **Important:**
>
> * The **organization namespace must always match the product**.
> * Always resolve the correct namespace based on both the `organizationKey` **and** product context.
> * Do **not** assume `:workshop` applies to every scenario.

---

### 3. Always store IDs with the `organizationKey`

IDs (`vehicleId`, `fleetId`, `workshopId`) are only unique within their `organizationKey`.
Always store them together with their `organizationKey`.

**Example:**

```json
{
  "vehicleId": 1234,
  "organizationKey": "connectedcarsdk"
}
```

```json
{
  "vehicleId": 1234,
  "organizationKey": "connectedcarsde"
}
```

If you drop the `organizationKey`, you lose the ability to route, scope, or link data correctly.

---

### Receiving Data via Push (Data Streams)

When receiving data through push integration [See docs](https://docs.connectedcars.io/#/./push-v2):

* The `organizationKey` is always included with every message.
* You must persist it with every ID you store.
* Linked resources (e.g., vehicles to fleets) must always share the **same `organizationKey`**.
* ❌ Cross-org linking is not supported.

---

## **Additional Resources**

### Programmatically obtaining domain information (GraphQL API)

⚠️ **Important Note:**

* This query is **not required** for your integration. Connected Cars will provide domain information for each `organizationKey` [See details](#1-domain-information).
* You can treat this as **static reference data** — it will not change.
* The query is only a **utility** if you want to confirm or explore the mapping of organizations and domains.

---


* This query does **not require authentication** — you can always get the complete list of organizations and their configuration.
* It works globally, so any API production endpoint returns the same results.
* Each `GlobalOrganization` includes a unique `key` — this is the `organizationKey`.
* The query also returns important domain information for each organization.

**Query Example:**

```gql
query {
  globalOrganizations {
    key
    apiDomain
    authApiDomain
  }
}
```

**Sample Response:**

```json
"data": {
  "globalOrganizations": [
    {
      "key": "connectedcarsdk",
      "apiDomain": "api.eu2.connectedcars.io",
      "authApiDomain": "auth-api.eu2.connectedcars.io"
    },
    {
      "key": "connectedcarse",
      "apiDomain": "api.eu4.connectedcars.io",
      "authApiDomain": "auth-api.eu4.connectedcars.io"
    }
  ]
}
```

