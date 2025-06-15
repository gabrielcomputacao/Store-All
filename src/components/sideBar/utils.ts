import { Home, Box, User } from 'lucide-react';

export const itemsMenu = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Cliente',
    url: '/client',
    icon: User,
    items: [
      {
        title: 'Criar cliente',
        url: '/',
      },
      {
        title: 'Pesquisar cliente',
        url: '/',
      },
    ],
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
