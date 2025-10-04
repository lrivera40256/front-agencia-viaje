import { checkPermission, getPermissionsForCheck } from '@/services/rolePermissionService';
import { PermissionsByModel } from '@/types/permisions';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent} from '@/components/ui/card';

import { Checkbox } from '@/components/ui/checkbox';
import {
	Shield,
	Eye,
	List,
	Plus,
	Edit,
	Trash2,
	CheckCircle,
} from 'lucide-react';
import { LoadingOverlay } from '@/components/Loader';

const tablePermission: React.FC = () => {
	const [permissionsCheck, setPermissionsCheck] = useState<PermissionsByModel>();
	const [hasChanges, setHasChanges] = useState(false);
	const { id } = useParams<{ id: string }>();
	const [isProcessing, setIsProcessing] = useState(false);

	const permissionIcons = {
		view: Eye,
		list: List,
		create: Plus,
		update: Edit,
		delete: Trash2
	};

	const permissionLabels = {
		view: 'Ver',
		list: 'Listar',
		create: 'Crear',
		update: 'Editar',
		delete: 'Eliminar'
	};

	const permissionColors = {
		view: 'text-blue-600',
		list: 'text-green-600',
		create: 'text-emerald-600',
		update: 'text-amber-600',
		delete: 'text-red-600'
	};

	const loadData = async () => {
		try {
			setIsProcessing(true);
			const data = await getPermissionsForCheck(id);
			setPermissionsCheck(data);
		} catch (error) {
			toast.error('Error al cargar los permisos');
		} finally {
			setIsProcessing(false);
		}
	};

	const handlePermissionChange = async(model: string, permission: string, checked: boolean) => {
		// No permitir cambios mientras está procesando
		try {
			setIsProcessing(true);
			await checkPermission(id, model, permission,checked);
		} catch (error) {
			toast.error('Error al verificar el permiso');
		} finally {
			loadData();
		}
		
		
	};

	

	const handleReset = () => {
		// No permitir reset mientras está procesando
		if (isProcessing) return;
		loadData();
		setHasChanges(false);
	};

	useEffect(() => {
		loadData();
	}, []);


	return (
		<div className="relative">
			{/* Loading Overlay - Se muestra encima de todo */}
			{isProcessing && <LoadingOverlay />}
			
			{/* Contenido principal - Siempre visible */}
			<div className={`space-y-6 transition-all duration-300 ${isProcessing ? 'pointer-events-none opacity-30' : ''}`}>
				{/* Header Section */}
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
								<Shield className="w-4 h-4 text-blue-600" />
							</div>
							<h1 className="text-2xl font-bold text-gray-900">Gestión de Permisos</h1>
						</div>
						<p className="text-gray-600">
							Administra los permisos del rol para diferentes módulos del sistema
						</p>
					</div>

					
				</div>

				{/* Permissions Table Card */}
				<Card className="overflow-hidden">


					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b bg-gray-50/50">
										<th className="px-6 py-4 text-left">
											<div className="font-semibold text-gray-900">Módulo</div>
										</th>
										{Object.entries(permissionLabels).map(([key, label]) => {
											const Icon = permissionIcons[key as keyof typeof permissionIcons];
											return (
												<th key={key} className="px-4 py-4 text-center min-w-[100px]">
													<div className="flex flex-col items-center space-y-1">
														<Icon className={`w-4 h-4 ${permissionColors[key as keyof typeof permissionColors]}`} />
														<span className="text-xs font-medium text-gray-700">{label}</span>
													</div>
												</th>
											);
										})}
									</tr>
								</thead>

								<tbody className="divide-y divide-gray-100">
									{permissionsCheck ? Object.entries(permissionsCheck).map(([modelName, permissions], index) => (
										<tr key={modelName} className="hover:bg-gray-50/50 transition-colors">
											<td className="px-6 py-4">
												<div className="flex items-center space-x-3">
													<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
														<span className="text-xs font-semibold text-blue-600">
															{modelName.charAt(0).toUpperCase()}
														</span>
													</div>
													<div>
														<div className="font-medium text-gray-900 capitalize">
															{modelName.replace(/([A-Z])/g, ' $1').trim()}
														</div>

													</div>
												</div>
											</td>

											{Object.entries(permissionLabels).map(([permissionKey]) => {
												const isChecked = permissions[permissionKey as keyof typeof permissions];
												return (
													<td key={permissionKey} className="px-4 py-4 text-center">
														<div className="flex items-center justify-center">
															<div className="relative">
																<Checkbox
																	checked={isChecked}
																	disabled={isProcessing}
																	onCheckedChange={(checked) =>
																		handlePermissionChange(modelName, permissionKey, checked as boolean)
																	}
																	className="h-5 w-5 rounded border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
																/>
																{isChecked && !isProcessing && (
																	<CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full" />
																)}
															</div>
														</div>
													</td>
												);
											})}
										</tr>
									)) : (
										<tr>
											<td colSpan={6} className="px-6 py-12 text-center">
												<div className="flex flex-col items-center space-y-3">
													<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
														<Shield className="w-6 h-6 text-gray-400" />
													</div>
													<div className="text-gray-500">
														No hay permisos disponibles
													</div>
												</div>
											</td>
										</tr>
									)}

								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>

			</div>
		</div>
	);
};
export default tablePermission;
