import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazyLoad } from './LazyLoad';
import AuthLoader from './AuthLoader';

export const router = [
  {
    path: '/',
    loader: AuthLoader,
    element: lazyLoad(React.lazy(() => import('@/pages/console'))),
  },
  {
    path: '/page/:env/:id',
    element: lazyLoad(React.lazy(() => import('@/pages/page'))),
  },
  {
    path: '/login',
    element: lazyLoad(React.lazy(() => import('@/pages/login/Login'))),
  },
  {
    path: '/project/:env/:projectId',
    loader: AuthLoader,
    element: lazyLoad(React.lazy(() => import('@/layout/layout'))),
    children: [
      {
        path: 'welcome',
        element: lazyLoad(React.lazy(() => import('@/pages/welcome/welcome'))),
      },
      {
        path: ':pageId',
        element: lazyLoad(React.lazy(() => import('@/pages/project'))),
      },
      {
        path: '*',
        element: lazyLoad(React.lazy(() => import('@/pages/project/notFound'))),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404?type=project" />,
  },
  {
    path: '/404',
    element: lazyLoad(React.lazy(() => import('@/pages/404'))),
  },
  {
    path: '/403',
    element: lazyLoad(React.lazy(() => import('@/pages/403'))),
  },
];

export default createBrowserRouter(router);