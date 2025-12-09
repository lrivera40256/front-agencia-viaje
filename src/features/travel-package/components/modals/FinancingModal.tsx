import React from 'react';
import { Quota } from '../../types/travel-package.type';

interface FinancingModalProps {
	isOpen: boolean;
	onClose: () => void;
	onFinance: () => void;
	onPayNow: () => void;
	totalAmount: number | undefined;
	isLoading?: boolean;
}

export function FinancingModal({
	isOpen,
	onClose,
	onFinance,
	onPayNow,
	totalAmount,
	isLoading = false,
}: FinancingModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h3 className="text-lg font-bold mb-4">¿Deseas financiar tu viaje?</h3>
				<h4>
					Costo total:{' '}
					{totalAmount != null ? `$${totalAmount.toLocaleString()}` : 'Cargando...'}
				</h4>
				<div className="mt-4 flex justify-end gap-2">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancelar
					</button>
					<button
						onClick={onFinance}
						disabled={isLoading}
						className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Financiar
					</button>
					<button
						onClick={onPayNow}
						disabled={isLoading}
						className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Procesando...' : 'Pagar ahora'}
					</button>
				</div>
			</div>
		</div>
	);
}
