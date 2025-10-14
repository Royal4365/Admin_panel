"use client";

import { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit2,
  Save,
  Upload,
  X,
  Truck,
  MapPinned,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    restaurantName: "The Golden Spoon",
    tagline: "Fine Dining Experience",
    address: "123 Main Street, Downtown",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 (555) 123-4567",
    email: "info@goldenspoon.com",
    website: "www.goldenspoon.com",
    openingHours: "10:00 AM - 10:00 PM",
    deliveryTime: "30-45 mins",
    deliveryRadius: "5 km",
    category: "Mixed",
    description:
      "Experience the finest dining with our authentic Italian cuisine and exceptional service. We pride ourselves on using fresh, locally-sourced ingredients to create unforgettable culinary experiences.",
    logo_url: "",
    banner_url: "",
    restaurant_picture_url: "", // New: Main restaurant picture for cards
  });

  const handleSave = () => {
    // In a real app, this would save to database via API
    setIsEditing(false);
    alert("Restaurant profile updated successfully!");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logo_url: imageUrl });
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, banner_url: imageUrl });
    }
  };

  const handleRestaurantPictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, restaurant_picture_url: imageUrl });
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newThumbnails = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnails([...thumbnails, ...newThumbnails].slice(0, 6)); // Max 6 thumbnails
    }
  };

  const removeThumbnail = (index: number) => {
    setThumbnails(thumbnails.filter((_, i) => i !== index));
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo_url: "" });
  };

  const removeBanner = () => {
    setFormData({ ...formData, banner_url: "" });
  };

  const removeRestaurantPicture = () => {
    setFormData({ ...formData, restaurant_picture_url: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Restaurant Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your restaurant&apos;s online presence
          </p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Banner / Header Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden group">
        {formData.banner_url ? (
          <>
            <img
              src={formData.banner_url}
              alt="Restaurant Banner"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button
                onClick={removeBanner}
                className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Banner"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <Store className="w-16 h-16 mx-auto mb-2 opacity-80" />
              <p className="text-lg opacity-90">Restaurant Banner</p>
              {isEditing && (
                <p className="text-sm opacity-75 mt-2">Click below to upload</p>
              )}
            </div>
          </div>
        )}

        {isEditing && (
          <label className="absolute bottom-4 right-4 cursor-pointer">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Upload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formData.banner_url ? "Change Banner" : "Upload Banner"}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="hidden"
            />
          </label>
        )}

        {/* Logo */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden">
              {formData.logo_url ? (
                <img
                  src={formData.logo_url}
                  alt="Restaurant Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Store className="w-16 h-16 text-white" />
                </div>
              )}
            </div>

            {isEditing && formData.logo_url && (
              <button
                onClick={removeLogo}
                className="absolute top-0 right-0 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Logo"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {isEditing && (
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Restaurant Name & Tagline */}
      <div className="pt-20 px-8">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={formData.restaurantName}
              onChange={(e) =>
                setFormData({ ...formData, restaurantName: e.target.value })
              }
              className="text-3xl font-bold bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 w-full text-gray-800 dark:text-white"
            />
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              className="text-xl bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 w-full text-gray-600 dark:text-gray-300"
            />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {formData.restaurantName}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {formData.tagline}
            </p>
          </>
        )}
      </div>

      {/* Restaurant Picture (Main Display Image) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
          <Store className="w-5 h-5 mr-2" />
          Restaurant Picture
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Main restaurant image shown on cards and listings (recommended:
          800x600px)
        </p>

        <div className="relative max-w-2xl">
          {formData.restaurant_picture_url ? (
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group">
              <img
                src={formData.restaurant_picture_url}
                alt="Restaurant Main Picture"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <button
                  onClick={removeRestaurantPicture}
                  className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Restaurant Picture"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              {isEditing && (
                <label className="absolute bottom-4 right-4 cursor-pointer">
                  <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Upload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Change Picture
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleRestaurantPictureUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex flex-col items-center justify-center">
              <Store className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                No Restaurant Picture
              </p>
              {isEditing ? (
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Upload Restaurant Picture
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleRestaurantPictureUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Click &quot;Edit Profile&quot; to upload
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-semibold">Note:</span> This is the main image
            displayed on restaurant cards when users browse restaurants.
            Different from the banner image above.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-2"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData({ ...formData, zip: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.address}, {formData.city}, {formData.state}{" "}
                    {formData.zip}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Store className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-blue-600 dark:text-blue-400">
                    {formData.website}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Business Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Opening Hours
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) =>
                      setFormData({ ...formData, openingHours: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.openingHours}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Delivery Time
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.deliveryTime}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 30-45 mins"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.deliveryTime}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPinned className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Delivery Radius
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.deliveryRadius}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryRadius: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 5 km"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">
                    {formData.deliveryRadius}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Category
              </label>
              {isEditing ? (
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Mixed">Mixed</option>
                </select>
              ) : (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formData.category === "Veg"
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : formData.category === "Non-Veg"
                      ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {formData.category}
                </span>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                Quick Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    4.8
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Rating
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2.5K
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          About Our Restaurant
        </h3>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {formData.description}
          </p>
        )}
      </div>

      {/* Restaurant Thumbnail Images Gallery */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Restaurant Photo Gallery
          </h3>
          {isEditing && (
            <label className="cursor-pointer">
              <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Add Photos</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {thumbnails.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No image
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img
                  src={thumbnail}
                  alt={`Restaurant ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <button
                    onClick={() => removeThumbnail(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
              </div>
            ))}

            {/* Add more placeholder if less than 6 images */}
            {thumbnails.length < 6 && isEditing && (
              <label className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer border-2 border-dashed border-gray-400 dark:border-gray-500">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add more
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}

        {isEditing && thumbnails.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            Click &quot;Add Photos&quot; to upload restaurant images (max 6
            photos)
          </p>
        )}

        {!isEditing && thumbnails.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            No photos uploaded yet. Click &quot;Edit Profile&quot; to add
            images.
          </p>
        )}

        {thumbnails.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {thumbnails.length} of 6 photos uploaded
          </p>
        )}
      </div>
    </div>
  );
}
