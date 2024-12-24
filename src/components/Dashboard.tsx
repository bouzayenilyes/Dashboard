import React from 'react';
import { useStore } from '../store/useStore';
import { Package, Tags, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { products, categories, alerts } = useStore();

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: Tags,
      color: 'bg-green-500',
    },
    {
      label: 'Low Stock Alerts',
      value: alerts.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.color} rounded-lg p-6 text-white`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const product = products.find((p) => p.id === alert.productId);
              return (
                <div
                  key={alert.productId}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-600">
                      Current stock: {alert.currentStock}
                    </p>
                  </div>
                  <span className="text-red-500">
                    Below threshold ({alert.threshold})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};