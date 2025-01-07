# backend-e
Backend repository template using Typescript + Express

# Database Relationships

## Summary of Relationships

| **Model**      | **Related Model** | **Relationship Description**                                              |
|-----------------|-------------------|----------------------------------------------------------------------------|
| **User**        | `Split`           | A user can create multiple splits (`splits`).                              |
|                 | `SplitMember`     | A user can participate in multiple splits as a member (`memberships`).     |
|                 | `EggUsage`        | A user can log multiple usage events (`eggUsages`).                        |
| **Split**       | `User`            | A split is created by one user (`createdBy`).                              |
|                 | `SplitMember`     | A split can have multiple members (`members`).                            |
|                 | `EggUsage`        | A split can have multiple usage records (`eggUsages`).                    |
| **SplitMember** | `Split`           | A membership links to one split (`split`).                                |
|                 | `User`            | A membership links to one user (`user`).                                  |
| **EggUsage**    | `Split`           | A usage event belongs to one split (`split`).                             |
|                 | `User`            | A usage event is logged by one user (`user`).                             |
