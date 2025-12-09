import React, { useEffect, useState } from 'react';
import { TravelPackage, Plan } from '../types/travel-package.type';
import {
	ChevronDown,

	DollarSign,
	Activity,
	Hotel,
	Calendar,
} from 'lucide-react';
import { ItineraryDetails } from './ItineraryDetails';
import { PlanDetails } from './PlanDetails';
import { useParams } from 'react-router-dom';
import { UsersDetails } from './UsersDetails';
import { useTravelPackages } from '../hooks';
import { useQuota } from '../hooks/useQuota';
import { createMultipleQuotas, createQuota } from '../services/quotaService';
import usePayQuota from './payQuota';
import { createCustomerTravel } from '../services/travelPackageService';
import { useProfile } from '@/features/profile/contexts/ProfileContext';
import { toast } from 'sonner';
interface TravelPackageItemProps {
	package: TravelPackage;
	createCustomer?: (payload: { name: string; email: string; password: string, travel_id: number }) => void;
}

export function TravelPackageItem({ package: pkg, createCustomer }: TravelPackageItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [modalFinanciacion, setModalFinanciacion] = useState(false);
	const [modalCuotas, setModalCuotas] = useState(false);
	const { customerId } = useParams<{ customerId: string }>();
	const { numCuotas, setNumCuotas, quotas, calculateQuotas } = useQuota();
	const {handlePayQuota}= usePayQuota();
	const {profile}= useProfile();

	const handlePay = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log(`Iniciando proceso de pago para el viaje ${pkg.id}`);
		setModalFinanciacion(true);
	};

	const handleSave = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const response =await createCustomerTravel(profile.user._id, pkg.id);
		if(!response){
			toast.error("Error al guardar el viaje");
			return;
		}	
		toast.success("Viaje guardado exitosamente");
		
	};

	const handleChangeModalFinanciacion = () => {
		setModalFinanciacion(!modalFinanciacion);
	}

	const handleChangeModalCuotas = () => {
		setModalCuotas(!modalCuotas);
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};
	const submmitCreateCustomer = (payload: { name: string; email: string; password: string }) => {
		createCustomer?.({ ...payload, travel_id: pkg.id });
	}

	useEffect(() => {
		if (modalFinanciacion) {
			console.log("Número de cuotas:", numCuotas);
			const fetchQuotas = async () => {
				await calculateQuotas(Number(pkg.price), Number(pkg.travel_customer_id));
			};
			fetchQuotas();
			console.log("Cuotas calculadas:", quotas);
		}
	}, [modalFinanciacion]);

	return (
		<>
		<div className="border rounded-lg overflow-hidden shadow-sm bg-white">
			<div
				className="p-4 cursor-pointer flex justify-between items-start"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex-grow mr-4">
					<h3 className="font-bold text-lg text-gray-800">{pkg.name}</h3>
					<p className="text-sm text-gray-600">{pkg.description || 'Sin descripción.'}</p>
					<div className="flex items-center text-gray-500 text-sm mt-2">
						<Calendar className="h-4 w-4 mr-2" />
						<span>
							{formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}
						</span>
					</div>
					<div className="flex items-center text-gray-800 mt-2">
						<DollarSign className="h-5 w-5 mr-2 text-green-600" />
						<span className="text-lg font-semibold">
							{pkg.price != null
								? `$${Number(pkg.price).toLocaleString()}`
								: 'Precio no disponible'}
						</span>
					</div>
				</div>
				<div className="flex flex-col items-end flex-shrink-0">
					{customerId ? (
						<button
							onClick={handlePay}
							className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold mb-2"
						>
							Pagar
						</button>
					) : (
						<button
							onClick={handleSave}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold mb-2"
						>
							Guardar Viaje
						</button>
					)}
					<ChevronDown
						className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
							}`}
					/>
				</div>
			</div>
			{isOpen && (
				<div className="p-4 bg-gray-50 border-t space-y-4">
					{pkg.itineraries?.map((itinerary, index) => (
						<ItineraryDetails key={index} itinerary={itinerary} />
					))}
					{pkg.plans?.map((plan) => (
						<PlanDetails key={plan.id} plan={plan} />
					))}
					{pkg.customers && (
						<UsersDetails users={pkg.customers} onCreateUser={pkg.state =="draft" ? submmitCreateCustomer : undefined} />
					)}
				</div>
			)}
		</div>
		{modalFinanciacion && (
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
				<div className="bg-white p-6 rounded-lg shadow-lg w-96">
					<h3 className="text-lg font-bold mb-4">
						¿Deseas financiar tu viaje?
					</h3>
					<h4>Costo total: {(quotas[0]?.amount)}</h4>
					<div className="mt-4 flex justify-end gap-2">
						<button
							onClick={handleChangeModalFinanciacion}
							className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
						>
							Cancelar
						</button>
						<button
							onClick={() => {
								console.log("Realizando financiación...");
								handleChangeModalCuotas();
								handleChangeModalFinanciacion();
							}}
							className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
						>
							Financiar
						</button>
						<button
							onClick={async() => {
								console.log("Realizando pago...");
								const body = await createQuota(quotas[0], true);
								handlePayQuota(body);
								handleChangeModalFinanciacion();
							}}
							className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
						>
							Pagar ahora
						</button>
					</div>
				</div>
			</div>
		)}
			{modalCuotas && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              ¿A cuántas cuotas deseas financiar tu viaje?
            </h3>
            <div className="mt-4">
              <select
                value={numCuotas}
                onChange={(e) => setNumCuotas(Number(e.target.value))}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="2">2 cuotas - Valor c/u: {quotas[1]?.amount}</option>
                <option value="3">3 cuotas - Valor c/u: {quotas[2]?.amount}</option>
                <option value="4">4 cuotas - Valor c/u: {quotas[3]?.amount}</option>
              </select>
            </div>
						<p className="px-4 py-1 text-sm text-red-600">Recuerda que deberás pagar la primera cuota al momento de confirmar la financiación</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleChangeModalCuotas}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
									handleChangeModalCuotas();
                  handleChangeModalFinanciacion();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Volver
              </button>
							<button
                onClick={() => {
                  console.log("Realizando pago...");
									createMultipleQuotas({
										data: quotas[numCuotas - 1],
										numQuotas: numCuotas,
									})
                  handleChangeModalCuotas();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirmar y pagar
              </button>
            </div>
          </div>
        </div>
      )}
		</>
	);
}



