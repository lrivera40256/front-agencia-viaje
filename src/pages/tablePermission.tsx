import { getPermissionsForCheck } from "@/services/rolePermissionService";
import { PermissionsByModel } from "@/types/permisions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const tablePermission : React.FC = () => {
    const [permissionsCheck, setPermissionsCheck] = useState<PermissionsByModel>()
    const { id } = useParams<{ id: string }>();
    console.log(id);
    
    const loadData = async() => {
        try {
            const data = await getPermissionsForCheck(id)
            setPermissionsCheck(data)

        } catch (error) {
            toast.error('Error al cargar')
        }
    }

    useEffect(()=> {
        loadData();
    }, []);

    useEffect(() => {
        console.log(permissionsCheck);
    }, [permissionsCheck]);

return (
    <div className="mx-auto max-w-5xl p-4 text-slate-800">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">Administrator – Permissions</h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[720px] w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500">
              <th className="px-4 py-3 text-left font-semibold">Model</th>
              <th className="px-4 py-3 text-center font-semibold">View</th>
              <th className="px-4 py-3 text-center font-semibold">List</th>
              <th className="px-4 py-3 text-center font-semibold">Create</th>
              <th className="px-4 py-3 text-center font-semibold">Update</th>
              <th className="px-4 py-3 text-center font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {/* Users */}
            <tr className="odd:bg-white even:bg-slate-50">
              <th scope="row" className="px-4 py-3 text-left font-medium text-slate-800">
                Users
              </th>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
            </tr>

            {/* Roles */}
            <tr className="odd:bg-white even:bg-slate-50">
              <th scope="row" className="px-4 py-3 text-left font-medium text-slate-800">
                Roles
              </th>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
            </tr>

            {/* Permissions */}
            <tr className="odd:bg-white even:bg-slate-50">
              <th scope="row" className="px-4 py-3 text-left font-medium text-slate-800">
                Permissions
              </th>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="checkbox" className="h-4 w-4 accent-emerald-600" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
};
export default tablePermission