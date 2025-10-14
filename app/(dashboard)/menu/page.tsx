"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2, Check, X, Upload, Leaf } from "lucide-react";
import { MenuItem, MenuType } from "@/lib/types";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [menuFilter, setMenuFilter] = useState<MenuType>("All");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    type: "Veg" as "Veg" | "Non-Veg",
    isAvailable: true,
    discount: "",
    menu_items: "",
    image_url: "",
  });

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu");
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMenuItems = useCallback(() => {
    if (menuFilter === "All") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter((item) => item.type === menuFilter));
    }
  }, [menuItems, menuFilter]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterMenuItems();
  }, [filterMenuItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/menu?id=${editingId}` : "/api/menu";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          discount: formData.discount
            ? parseFloat(formData.discount)
            : undefined,
        }),
      });

      if (response.ok) {
        await fetchMenuItems();
        resetForm();
      } else {
        alert("Failed to save menu item");
      }
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Error saving menu item");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      type: item.type,
      isAvailable: item.isAvailable,
      discount: item.discount?.toString() || "",
      menu_items: item.menu_items || "",
      image_url: item.image_url || "",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const response = await fetch(`/api/menu?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMenuItems(menuItems.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete menu item");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Error deleting menu item");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      type: "Veg",
      isAvailable: true,
      discount: "",
      menu_items: "",
      image_url: "",
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to cloud storage and get URL
      // For now, create a local object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image_url: imageUrl });
    }
  };

  const categories = [
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
    "Salads",
    "Pizza",
    "Pasta",
    "Thali",
  ];

  if (loading && menuItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading menu...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Menu Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your restaurant menu items
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {/* Menu Type Filter */}
          <div className="relative">
            <select
              value={menuFilter}
              onChange={(e) => setMenuFilter(e.target.value as MenuType)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white appearance-none pr-10 cursor-pointer"
            >
              <option value="All">All Items</option>
              <option value="Veg">Veg Only</option>
              <option value="Non-Veg">Non-Veg Only</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Thali / Item</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/20 dark:bg-slate-950/30 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg p-6 w-full max-w-2xl my-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingId ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Veg / Non-Veg *
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="Veg"
                        checked={formData.type === "Veg"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type: e.target.value as "Veg" | "Non-Veg",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                        <Leaf className="w-4 h-4 mr-1" />
                        Veg
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="Non-Veg"
                        checked={formData.type === "Non-Veg"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type: e.target.value as "Veg" | "Non-Veg",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="flex items-center px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                        <div className="w-4 h-4 mr-1 border-2 border-red-600 rounded-sm"></div>
                        Non-Veg
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount (%){" "}
                    <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    placeholder="e.g., 10"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Availability
                  </label>
                  <select
                    value={formData.isAvailable ? "true" : "false"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isAvailable: e.target.value === "true",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image Upload
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                      <Upload className="w-5 h-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formData.image_url ? "Change Image" : "Upload Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.image_url && (
                    <div className="mt-2">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Menu Items - Always visible */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Menu Items{" "}
                  <span className="text-gray-500 text-xs">
                    (What&apos;s included?)
                  </span>
                </label>
                <textarea
                  value={formData.menu_items}
                  onChange={(e) =>
                    setFormData({ ...formData, menu_items: e.target.value })
                  }
                  rows={3}
                  placeholder="e.g., Dal, Rice, Roti, Vegetable, Salad, Sweet (comma-separated)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  List all items included, separated by commas. Great for Thalis
                  or combo meals!
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Item"
                    : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            {menuFilter !== "All"
              ? `No ${menuFilter} items found.`
              : "No menu items found. Click &quot;Add New Thali / Item&quot; to create your first item."}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
              onClick={() => handleEdit(item)}
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Upload className="w-12 h-12" />
                  </div>
                )}

                {/* Veg/Non-Veg Badge */}
                <div className="absolute top-2 left-2">
                  {item.type === "Veg" ? (
                    <span className="flex items-center px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      <Leaf className="w-3 h-3 mr-1" />
                      Veg
                    </span>
                  ) : (
                    <span className="flex items-center px-2 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                      <div className="w-3 h-3 mr-1 border-2 border-white rounded-sm"></div>
                      Non-Veg
                    </span>
                  )}
                </div>

                {/* Action Buttons - Show on Hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="ml-2 text-right">
                    {item.discount && item.discount > 0 ? (
                      <>
                        <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-1">
                          ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
                        </span>
                        <span className="block text-xs text-green-600 dark:text-green-400 font-semibold">
                          {item.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded mb-2">
                  {item.category}
                </span>

                {/* Menu Items - Show for all items if available */}
                {item.menu_items && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Includes:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.menu_items.split(",").map((menuItem, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {menuItem.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      item.isAvailable
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {item.isAvailable ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" />
                        <span>Unavailable</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
