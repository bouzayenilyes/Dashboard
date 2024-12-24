import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { CategoryList } from './components/CategoryList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'categories' && <CategoryList />}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;