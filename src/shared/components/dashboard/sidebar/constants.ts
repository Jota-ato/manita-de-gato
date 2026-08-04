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
    { label: 'Panel', href: '/dashboard', icon: LuLayoutDashboard },
    { label: 'Agenda', href: '/dashboard/agenda', icon: LuCalendarDays },
    { label: 'Finanzas', href: '/dashboard/finance', icon: LuCircleDollarSign },
    { label: 'Servicios', href: '/dashboard/services', icon: LuBriefcase },
    { label: 'Registros', href: '/dashboard/record', icon: LuFileText },
    { label: 'Clientes', href: '/dashboard/customers', icon: LuUser },
    { label: 'Usuarios', href: '/dashboard/users', icon: LuWorkflow },
    { label: 'Controles empresariales', href: '/dashboard/business-controls', icon: LuBriefcaseBusiness }
];

export const generateNavigation = (role: UserRole): navigationType[] => {
    if (role === 'customer') {
        return [];
    }

    if (role === 'employee') {
        return navigation.filter((item) => !['Finanzas', 'Registros', 'Usuarios', 'Clientes'].includes(item.label));
    }

    return navigation;
}
