import React from 'react';
export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  role?:string // 
  icon?: React.ReactNode
}

export interface RouterConfig {
  caseSensitive?: boolean;
  children?: RouterConfig[];
  element?: React.ReactNode;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
}