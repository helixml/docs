---
title: Authentication and Authorization
description: Learn how to configure authentication and authorization for your Helix deployment.
weight: 10
tags:
- config
---

## Authentication

Helix includes built-in multi-tenant authentication. You can also integrate with a custom OIDC provider if you have an existing identity management system.

### Built-in Authentication

Helix's built-in authentication system handles user registration, login, and session management. No additional configuration is required for basic deployments.

### Custom OIDC Provider

Helix supports OpenID Connect (OIDC) for integration with external identity providers like Okta, Auth0, Azure AD, or Google.

#### Configuration

Configure your OIDC provider using these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `OIDC_ENABLED` | Enable custom OIDC authentication | `false` |
| `OIDC_URL` | URL of your OIDC provider | - |
| `OIDC_CLIENT_ID` | Client ID for your application | `api` |
| `OIDC_CLIENT_SECRET` | Client secret for your application | - |
| `OIDC_AUDIENCE` | Expected audience claim in JWT (optional) | - |
| `OIDC_SCOPES` | Requested OIDC scopes, comma-separated | `openid,profile,email` |
| `OIDC_SECURE_COOKIES` | Use secure cookies for sessions | `true` |

#### Provider Requirements

Your OIDC provider must support:

1. Standard OIDC authorization code flow
2. The scopes specified in `OIDC_SCOPES` (default: openid, profile, email)
3. JSON Web Token (JWT) issuance
4. Redirect URI: `${HELIX_URL}/api/v1/auth/callback`

## Authorization

### Administrators

Configure administrator access using the `ADMIN_USER_IDS` environment variable:

```bash
ADMIN_USER_IDS=user1,user2,user3
```

Use `all` to grant admin access to all authenticated users:

```bash
ADMIN_USER_IDS=all
```

### Organizations and Teams

Helix provides hierarchical access control:

- **Organizations** are top-level entities
- **Teams** belong to organizations
- **Users** join organizations with owner or member roles
- **Access grants** control resource permissions

#### Member Management

```bash
# Add member to organization
helix member add --organization <org-name> --user-email <email> --role <role>

# List organization members
helix member list --organization <org-name>

# Remove member
helix member remove --organization <org-name> --user-email <email>
```

Organization roles:
- `owner`: Full administrative access
- `member`: Can view members/teams, create agents

#### Team Management

```bash
# Add member to team
helix member add --organization <org-name> --team <team-name> --user-email <email>

# List team members
helix member list --organization <org-name> --team <team-name>

# Remove from team
helix member remove --organization <org-name> --team <team-name> --user-email <email>
```

#### Access Grants

Share agents and knowledge with users or teams:

```bash
# Grant access
helix app grant-access <app-id> --user <user-email> --roles read,write
helix app grant-access <app-id> --team <team-id> --roles read,write

# List access grants
helix app list-access-grants <app-id>

# Remove access
helix app remove-access <app-id> <access-grant-id>
```

### Best Practices

1. **Role Assignment**: Assign owner roles sparingly; use team memberships for fine-grained control
2. **Team Structure**: Create teams based on projects or functional groups
3. **Access Management**: Grant minimum required access; prefer team-based grants over individual grants
4. **Auditing**: Regularly review access grants and memberships
