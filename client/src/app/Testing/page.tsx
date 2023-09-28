"use client";

import { AdminPcComponentProductList } from "@/app/components/admin/components/AdminProductList";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <AdminPcComponentProductList />
      </AdminProtected>
    </div>
  );
};

export default page;
