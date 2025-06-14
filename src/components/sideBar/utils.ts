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
        title: 'Atualizar cliente',
        url: '/',
      },
      {
        title: 'Criar cliente',
        url: '/',
      },
      {
        title: 'Deletar cliente',
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
        title: 'Atualizar produto',
        url: '/product/update',
      },
      {
        title: 'Criar produto',
        url: '/product/create',
      },
      {
        title: 'Deletar produto',
        url: '/product/delete',
      },
    ],
  },
];
