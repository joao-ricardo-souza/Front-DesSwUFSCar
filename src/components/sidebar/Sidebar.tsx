import { useNavigate } from 'react-router';
import './Sidebar.css';
import { Button } from "../button/Button";
import React from 'react';

export function Sidebar() {
  const navigate = useNavigate();
  const handleClickOption = (pagePath: string) => navigate(pagePath);

  return (
    <aside className="Sidebar">
      <Button onClick={() => handleClickOption('/')}>Produtos</Button>
      <Button onClick={() => handleClickOption('/new-product')}>Novo Produto</Button>
      <Button onClick={() => handleClickOption('/import')}>Importar CSV</Button>
    </aside>
  );
}