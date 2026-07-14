// auth-permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc, userAc } from "better-auth/plugins/admin/access";


const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
  ...adminAc.statements,
});

export const admin = ac.newRole({
  ...adminAc.statements,
});

export const employee = ac.newRole({
  user: ["list"],
});

export const customer = ac.newRole({
  ...userAc.statements,
});