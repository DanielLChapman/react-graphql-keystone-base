/* eslint-disable @typescript-eslint/indent */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const User = list({
    // access
    access: {
        create: () => true,
        read: rules.canManageUsers,
        update: rules.canManageUsers,
        //only people with the permission can delete themselves,
        // you can't delete yourself
        delete: permissions.canManageUsers,
    },
    // ui
    ui: {
        hideCreate: args => !permissions.canManageUsers(args),
        hideDelete: args => !permissions.canManageUsers(args),
    },
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        role: relationship({
            ref: 'Role.assignedTo',
            access: {
                create: permissions.canManageUsers,
                update: permissions.canManageUsers
            }
        }),
    },
});