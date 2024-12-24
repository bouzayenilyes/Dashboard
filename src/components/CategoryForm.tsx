import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Category } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  categoryId: string | null;
  onClose: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryId,
  onClose,
}) => {
  const { categories, addCategory, updateCategory } = useStore();
  const [formData, setFormData] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        setFormData(category);
      }
    }
  }, [categoryId, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (categoryId) {
      updateCategory(categoryId, formData);
      toast.success('Category updated successfully');
    } else {
      addCategory({ ...formData, id: crypto.randomUUID() });
      toast.success('Category added successfully');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {categoryId ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {categoryId ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};