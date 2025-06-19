import { Home, Box, User } from 'lucide-react';

export const itemsMenu = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Produto',
    url: '/product',
    icon: Box,
    items: [
      {
        title: 'Produtos',
        url: '/product',
      },
      {
        title: 'Criar produto',
        url: '/product/create',
      },
    ],
  },
];
