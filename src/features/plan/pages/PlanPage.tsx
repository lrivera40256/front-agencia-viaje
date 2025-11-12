import { LoadingOverlay } from "@/components/Loader";
import { PlanTable } from "../components/PlanTable";
import { PlanForm } from "../components/PlanForm";
import { usePlan } from "../contexts/PlanContex";

const PlanPage = () => {
    const { loading, showForm } = usePlan();
    return (
        <div>
            {loading && <LoadingOverlay />}
            <PlanTable />
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
                        <PlanForm />
                    </div>
                </div>
            )}

        </div>
    )
}
export default PlanPage;