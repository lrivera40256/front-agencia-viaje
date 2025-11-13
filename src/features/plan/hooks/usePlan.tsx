import { useEffect, useState } from "react";
import { Plan } from "../types/Plan.type";
import { PlanService } from "../services";
import { set } from "date-fns";

export const usePlan = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [planToEdit, setPlanToEdit] = useState<Plan | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchPlans = async () => {
        try {
            setLoading(true);
            const data = await PlanService.getPlans();
            setPlans(data.map((plan: Plan) => ({
                id: plan.id,
                name: plan.name,
                description: plan.description,
                price: plan.price,
                duration_days: plan.duration_days,
                is_active: plan.is_active,
            })));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const onSubmit = async (plan: Plan) => {
        try {
            setLoading(true);
            if (planToEdit) {
                await PlanService.updatePlan(planToEdit.id!, plan);
            } else {
                await PlanService.createPlan(plan);
            }
            setShowForm(false);
            fetchPlans();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const addPlan = async () => {
        console.log("probando");

        setShowForm(true);
        setPlanToEdit(null);
    }
    const onDelete = async (plan: Plan) => {
        console.log(plan);
        
        try {
            setLoading(true);
            await PlanService.deletePlan(plan.id!);
            fetchPlans();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const editPlan = (plan: Plan) => {
        setPlanToEdit(plan);
        setShowForm(true);
    }
    useEffect(() => {
        console.log("Fetching plans");
        fetchPlans();
    }, []);
    return { plans, loading, addPlan, editPlan, planToEdit, showForm, onSubmit, setShowForm,onDelete};
}