import { useEffect, useState, useCallback } from 'react';
import { payQuota } from '../services/quotaService';

declare global {
	interface Window {
		ePayco: any;
	}
}

export default function usePayQuota() {
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);

	useEffect(() => {
		// Check if script is already loaded
		if (window.ePayco) {
			setIsScriptLoaded(true);
			return;
		}

		// Check if script tag already exists
		const existingScript = document.querySelector(
			'script[src="https://checkout.epayco.co/checkout.js"]'
		);
		if (existingScript) {
			existingScript.addEventListener('load', () => setIsScriptLoaded(true));
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://checkout.epayco.co/checkout.js';
		script.async = true;
		script.onload = () => {
			setIsScriptLoaded(true);
		};
		script.onerror = () => {
			console.error('Error loading ePayco script');
		};
		document.body.appendChild(script);

		return () => {
			// Cleanup is optional since we want the script to persist
		};
	}, []);

	const handlePayQuota = useCallback(async (data: any) => {
		// Wait for script to be available
		if (!window.ePayco) {
			// Try to wait a bit for the script to load
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (!window.ePayco) {
				console.error('ePayco script not loaded');
				throw new Error('Pasarela de pagos no disponible. Por favor, recargue la página.');
			}
		}

		try {
			const handler = window.ePayco.checkout.configure({
				key: data.publicKey,
				test: data.test,
			});

			console.log('Opening ePayco checkout with data:', data);

			handler.open({
				name: 'Agencia de Viajes',
				description: data.description,
				invoice: data.invoice,
				currency: data.currency,
				amount: 20000,
				tax_base: '0',
				tax: '0',
				country: 'CO',
				lang: 'es',
				response: data.responseUrl || window.location.href,
				confirmation: data.confirmationUrl,
				methodconfirmation: 'POST',
			});
		} catch (error) {
			console.error('Error opening ePayco checkout:', error);
			throw error;
		}
	}, []);
  const handlePayByQuotaId = useCallback(async (id: any) => {
		
		try {
      const data = await payQuota(id);
			const handler = window.ePayco.checkout.configure({
				key: data.publicKey,
				test: data.test,
			});

			console.log('Opening ePayco checkout with data:', data);

			handler.open({
				name: 'Agencia de Viajes',
				description: data.description,
				invoice: data.invoice,
				currency: data.currency,
				amount: 20000,
				tax_base: '0',
				tax: '0',
				country: 'CO',
				lang: 'es',
				response: data.responseUrl || window.location.href,
				confirmation: data.confirmationUrl,
				methodconfirmation: 'POST',
			});
		} catch (error) {
			console.error('Error opening ePayco checkout:', error);
			throw error;
		}
	}, []);

	return { handlePayQuota, isScriptLoaded,handlePayByQuotaId };
}
