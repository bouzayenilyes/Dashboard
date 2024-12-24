import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Edit, Trash2, Plus } from 'lucide-react';
import { CategoryForm } from './CategoryForm';

export const CategoryList: React.FC = () => {
  const { categories, deleteCategory } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingCategory(category.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            {category.description && (
              <p className="text-gray-600">{category.description}</p>
            )}
          </div>
        ))}
      </div>

      {(showForm || editingCategory) && (
        <CategoryForm
          categoryId={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};