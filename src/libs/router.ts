import React from 'react';
export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  key?: string;
}

export interface RouterConfig {
  caseSensitive?: boolean;
    children?: RouterConfig[];
    element?: React.ReactNode;
    path?: string;
    meta?: MetaProps;
    isLink?: string;
}