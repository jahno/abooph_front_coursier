import {
    Home,
    Settings,
    ShoppingCart
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/', title: 'Tableau de bord', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/commandes', title: 'Commandes', icon: ShoppingCart, type: 'link', badgeType: 'primary', active: false
    },
    // {
    //     path: '/profil', title: 'Mon profil', icon: Settings, type: 'link', badgeType: 'primary', active: false
    // },
]
