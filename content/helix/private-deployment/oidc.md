---
title: Authentication and Authorization
description: Learn how to configure authentication and authorization for your Helix deployment.
weight: 10
tags:
- config
---

## Authentication

Helix comes out of the box with a built-in multi-tenant authentication system. This means that you can have multiple users and organizations on a single Helix deployment. We also support using a custom OIDC provider for authentication.

Helix supports only one authentication method at a time. If you need to use both, you can configure a Keycloak instance to act as a proxy for your custom OIDC provider.

### Built-in Authentication

Helix includes a built-in Keycloak instance for authentication and user management. [Keycloak](https://www.keycloak.org) is an open-source Identity and Access Management solution that provides single sign-on, user federation, and identity brokering capabilities.

#### Keycloak Configuration

The built-in Keycloak instance can be configured using the following environment variables:

- `KEYCLOAK_ENABLED`: Enable/disable Keycloak authentication (default: `true`)
- `KEYCLOAK_URL`: Internal Keycloak server URL (default: `http://keycloak:8080/auth`)
- `KEYCLOAK_FRONTEND_URL`: Public-facing Keycloak URL (default: `http://localhost:8080/auth`)
- `SERVER_URL`: The URL where the API server is accessible
- `KEYCLOAK_CLIENT_ID`: Client ID for API authentication (default: `api`)
- `KEYCLOAK_CLIENT_SECRET`: Client secret for API authentication
- `KEYCLOAK_FRONTEND_CLIENT_ID`: Client ID for frontend authentication (default: `frontend`)
- `KEYCLOAK_ADMIN_REALM`: Admin realm name (default: `master`)
- `KEYCLOAK_REALM`: Application realm name (default: `helix`)
- `KEYCLOAK_USER`: Admin username (default: `admin`)
- `KEYCLOAK_PASSWORD`: Admin password

#### Accessing Keycloak

The Keycloak admin console and authentication endpoints are proxied through Helix at `${HELIX_URL}/auth`. This means:

- Admin Console: `${HELIX_URL}/auth/admin`
- Authentication Endpoints: `${HELIX_URL}/auth/realms/helix/*`

This proxying ensures that Keycloak is securely accessible without exposing additional ports or requiring separate DNS configuration.

### Custom OIDC Provider

Helix supports using a custom OpenID Connect (OIDC) provider for authentication. This is useful if you already have an existing identity provider or prefer to use a different authentication system.

#### OIDC Configuration

Configure your custom OIDC provider using these environment variables:

- `OIDC_ENABLED`: Enable custom OIDC authentication (default: `false`)
- `OIDC_SECURE_COOKIES`: Use secure cookies for OIDC sessions (default: `true`)
- `OIDC_URL`: URL of your OIDC provider (default: `http://localhost:8080/auth/realms/helix`)
- `OIDC_CLIENT_ID`: Client ID for your application (default: `api`)
- `OIDC_CLIENT_SECRET`: Client secret for your application
- `OIDC_AUDIENCE`: Expected audience claim in the JWT token (optional)
- `OIDC_SCOPES`: Requested OIDC scopes, comma-separated (default: `openid,profile,email`)

#### Required Provider Configuration

Your OIDC provider must support the following:

1. Standard OIDC authorization code flow
2. The scopes specified in `OIDC_SCOPES` (by default: openid, profile, and email)
3. JSON Web Token (JWT) issuance
4. Valid redirect URIs for your Helix instance. Make sure to configure your OIDC provider to allow redirects to your Helix instance's callback URL: `${HELIX_URL}/auth/callback`.

## Authorization

### Administrators

Helix has a built-in administrator role that grants access to system-wide settings and cluster management. There are two ways to configure administrators:

#### Environment Variable Configuration

Use the `ADMIN_USER_IDS` environment variable to specify a comma-separated list of user IDs that should have administrator privileges. This list can include:

- Individual user IDs from your authentication provider (e.g. Keycloak user IDs)
- The special value `all` to grant administrator access to all authenticated users

Examples:

```bash
ADMIN_USER_SOURCE=env
ADMIN_USER_IDS=user1,user2,user3
```

```bash
ADMIN_USER_SOURCE=env
ADMIN_USER_IDS=all
```

#### JWT Claim Configuration

Alternatively, you can configure administrator access based on JWT claims from your authentication provider:

1. Set `ADMIN_USER_SOURCE=jwt`
2. Configure your authentication provider to include an `admin` claim in the JWT token
3. Users with `"admin": true` in their JWT claims will be granted administrator access

This method is particularly useful when integrating with existing identity management systems that already maintain administrator roles.

### Organizations and Teams

Helix provides a hierarchical structure for managing users and permissions:

- Organizations are the top-level entities
- Users join organizations with either owner or member roles
- Organizations can contain multiple teams
- Teams can have multiple members with different roles
- Access to resources (apps, knowledge, etc.) is managed through access grants

#### Member Management

```bash
# Add a member to an organization
helix member add --organization <org-name> --user-email <email> --role <role>

# List organization members
helix member list --organization <org-name>

# Remove a member from an organization
helix member remove --organization <org-name> --user-email <email>
```

Available organization roles:

- `owner`: Full administrative access to the organization
- `member`: Can view organization members and teams, create new apps

#### Team Management

```bash
# Add a member to a team
helix member add --organization <org-name> --team <team-name> --user-email <email>

# List team members
helix member list --organization <org-name> --team <team-name>

# Remove a member from a team
helix member remove --organization <org-name> --team <team-name> --user-email <email>
```

#### Access Grants

Access grants allow sharing resources (apps, knowledge, etc.) with users or teams:

```bash
# Grant access to an app
helix app grant-access <app-id> --user <user-email> --team <team-id> --roles <roles>

# List access grants for an app
helix app list-access-grants <app-id>

# Remove an access grant
helix app remove-access <app-id> <access-grant-id>
```

#### Common Operations

##### Adding New Team Members

1. Add user to organization:

```bash
helix member add --organization my-org --user-email new@example.com --role member
```

2. Add user to relevant teams:

```bash
helix member add --organization my-org --team team1 --user-email new@example.com
```

##### Removing Access

1. Remove from specific team:

```bash
helix member remove --organization my-org --team team1 --user-email user@example.com
```

2. Remove from organization (removes from all teams):

```bash
helix member remove --organization my-org --user-email user@example.com
```

##### Managing App Access

1. Grant team access:

```bash
helix app grant-access app-id --team team-id --roles read,write
```

2. Review current access:

```bash
helix app list-access-grants app-id
```

3. Remove access:

```bash
helix app remove-access app-id access-grant-id
```

#### Best Practices

1. **Role Assignment**:
   - Assign organization owner roles sparingly
   - Use team memberships for fine-grained access control
   - Review access grants periodically

2. **Team Structure**:
   - Create teams based on functional groups or projects
   - Use team-based access grants for better manageability
   - Document team purposes and access levels

3. **Access Management**:
   - Grant minimum required access levels
   - Use teams instead of individual access grants when possible
   - Regularly audit access grants and memberships

#### Important Notes

- Organization and team names are case-sensitive
- User references can be either email addresses or user IDs
- Use the `--force` flag with remove commands to skip confirmation prompts
- Access grants can be assigned to either users or teams, but not both simultaneously
