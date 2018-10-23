import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { USER_PERMISSION_MAP } from '../../../packages/common/src/users/entity/User';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) {
      return;
    }
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRoles =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRoles) {
          // no permission requirements, resolve
          return resolve.apply(this, args);
        }
        const context = args[2];
        const userId = context.userId;
        const user = await context.entities.User.findOne({ id: userId });
        if (user) {
          // convert all permission keys to ids
          const requiredRoleIds = requiredRoles.map(
            p => USER_PERMISSION_MAP[p]
          );
          if (
            // check if user has the required roles
            user.permissions.every(perm => requiredRoleIds.includes(perm))
          ) {
            return resolve.apply(this, args);
          }
        }
        throw new Error('Not authorized');
      };
    });
  }
}
