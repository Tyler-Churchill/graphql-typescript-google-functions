// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments
// } from 'class-validator';

// @ValidatorConstraint({ async: true })
// export class IsUserAlreadyExistConstraint
//   implements ValidatorConstraintInterface {
//   // validate(userName: any, args: ValidationArguments) {
//   //     return UserRepository.findOneByName(userName).then(user => {
//   //         if (user) return false;
//   //         return true;
//   //     });
//   // }
// }

// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//   return (object: object, propertyName: string) => {
//     registerDecorator({
//       target: object.constructor,
//       propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUserAlreadyExistConstraint
//     });
//   };
// }
