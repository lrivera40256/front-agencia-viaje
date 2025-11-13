import { LoadingOverlay } from "@/components/Loader";
import { useCustomer } from "../context/customerContext";
import { CustomerForm } from "../components/customerForm";
import { CustomerTable } from "../components/customerTable";
import { useEffect } from "react";


const CustomerPage = () => {
    const { loading, showForm } = useCustomer();

    
    return (
        <div>
            {loading && <LoadingOverlay />}
            <CustomerTable />
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
                        <CustomerForm    />
                    </div>
                </div>
            )}

        </div>
    )
}
export default CustomerPage;