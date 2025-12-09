import React from 'react';
import { Quota } from '../../types/travel-package.type';

interface QuotasSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onBack: () => void;
	onConfirm: () => void;
	numCuotas: number;
	setNumCuotas: (num: number) => void;
	quotas: Quota[];
	isLoading?: boolean;
}

export function QuotasSelectionModal({
	isOpen,
	onClose,
	onBack,
	onConfirm,
	numCuotas,
	setNumCuotas,
	quotas,
	isLoading = false,
}: QuotasSelectionModalProps) {
	if (!isOpen) return null;

	const formatAmount = (amount: number | undefined) => {
		if (amount == null) return 'Calculando...';
		return `$${amount.toLocaleString()}`;
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h3 className="text-lg font-bold mb-4">
					¿A cuántas cuotas deseas financiar tu viaje?
				</h3>
				<div className="mt-4">
					<select
						value={numCuotas}
						onChange={(e) => setNumCuotas(Number(e.target.value))}
						disabled={isLoading}
						className="border border-gray-300 rounded-lg p-2 w-full disabled:opacity-50"
					>
						<option value="2">
							2 cuotas - Valor c/u: {formatAmount(quotas[1]?.amount)}
						</option>
						<option value="3">
							3 cuotas - Valor c/u: {formatAmount(quotas[2]?.amount)}
						</option>
						<option value="4">
							4 cuotas - Valor c/u: {formatAmount(quotas[3]?.amount)}
						</option>
					</select>
				</div>
				<p className="px-4 py-1 text-sm text-red-600">
					Recuerda que deberás pagar la primera cuota al momento de confirmar la
					financiación
				</p>
				<div className="mt-4 flex justify-end gap-2">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancelar
					</button>
					<button
						onClick={onBack}
						disabled={isLoading}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Volver
					</button>
					<button
						onClick={onConfirm}
						disabled={isLoading}
						className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Procesando...' : 'Confirmar y pagar'}
					</button>
				</div>
			</div>
		</div>
	);
}
