# GRAPHQL AUTH Module

### env setting
JWT_ACCESS_TOKEN_SECRET = private secret key for JWT

JWT_ACCESS_TOKEN_EXPIRE = JWT Token Expire Time (minutes)

### Role Setting
- role setting is in the user.entity.ts
```typescript
// Default Role
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
```

### Use Role Resolver
```typescript
 @Role(['Any'])         // Default Role is Any || USER || ADMIN
  @Mutation(returns => EditProfileOutput)
  editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(authUser.id, editProfileInput);
  }
```