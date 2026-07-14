import { UserRole } from '@/db/schema';
import { Route } from 'next';
import { IconType } from 'react-icons';
import { LuLayoutDashboard, LuCircleDollarSign, LuBriefcase, LuFileText, LuCalendarDays, LuUser, LuWorkflow, LuBriefcaseBusiness } from 'react-icons/lu';

type navigationType = {
    label: string;
    href: Route;
    icon: IconType;
};

export const navigation: navigationType[] = [
    { label: 'Dashboard panel', href: '/dashboard', icon: LuLayoutDashboard },
    { label: 'Agenda', href: '/dashboard/agenda', icon: LuCalendarDays },
    { label: 'Finance', href: '/dashboard/finance', icon: LuCircleDollarSign },
    { label: 'Services', href: '/dashboard/services', icon: LuBriefcase },
    { label: 'Record', href: '/dashboard/record', icon: LuFileText },
    { label: 'Customers', href: '/dashboard/customers', icon: LuUser },
    { label: 'Users', href: '/dashboard/users', icon: LuWorkflow },
    { label: 'Business Controls', href: '/dashboard/business-controls', icon: LuBriefcaseBusiness }
];

export const generateNavigation = (role: UserRole): navigationType[] => {
    if (role === 'customer') {
        return [];
    }

    if (role === 'employee') {
        return navigation.filter((item) => !['Finance', 'Record', 'Users', 'Customers'].includes(item.label));
    }

    return navigation;
}
