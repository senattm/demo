import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
            </div>

            <div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="flex gap-3 mb-6">
                <div className="h-12 w-16 bg-gray-200 rounded"></div>
                <div className="h-12 w-16 bg-gray-200 rounded"></div>
                <div className="h-12 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-14 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-4">
          <div className="w-20 h-24 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
      <div className="space-y-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export const AddressCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse border-2 border-gray-200 rounded-lg p-6">
      <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  );
};

