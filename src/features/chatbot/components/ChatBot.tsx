import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useChatBot } from '../hooks/useChatBot';

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [inputMessage, setInputMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, isLoading, sendMessage } = useChatBot();

	// Auto scroll al último mensaje
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (inputMessage.trim() && !isLoading) {
			await sendMessage(inputMessage);
			setInputMessage('');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<>
			{/* Botón flotante */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
					aria-label="Abrir chat"
				>
					<MessageCircle size={24} />
				</button>
			)}

			{/* Ventana del chat */}
			{isOpen && (
				<div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
					{' '}
					{/* Header con margen superior */}
					<div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4 pt-10 rounded-t-lg flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Bot size={24} />
							<div>
								<h3 className="font-semibold">Asistente Virtual</h3>
								<p className="text-xs text-blue-100">Siempre aquí para ayudarte</p>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="hover:bg-white/20 rounded-full p-1 transition-colors"
							aria-label="Cerrar chat"
						>
							<X size={20} />
						</button>
					</div>
					{/* Mensajes */}
					<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
						{messages.length === 0 && (
							<div className="text-center text-gray-500 mt-8">
								<Bot size={48} className="mx-auto mb-2 text-primary" />
								<p className="text-sm">¡Hola! Soy tu asistente virtual.</p>
								<p className="text-xs mt-1">¿En qué puedo ayudarte hoy?</p>
							</div>
						)}

						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex gap-2 ${
									message.sender === 'user' ? 'justify-end' : 'justify-start'
								}`}
							>
								{message.sender === 'bot' && (
									<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
										<Bot size={18} className="text-white" />
									</div>
								)}

								<div
									className={`max-w-[75%] rounded-2xl px-4 py-2 ${
										message.sender === 'user'
											? 'bg-primary text-white rounded-br-none'
											: 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none'
									}`}
								>
									<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
										{message.text}
									</p>
									<span className="text-[10px] opacity-70 mt-1 block">
										{new Date(message.timestamp).toLocaleTimeString('es-ES', {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>

								{message.sender === 'user' && (
									<div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
										<User size={18} className="text-gray-600" />
									</div>
								)}
							</div>
						))}

						{isLoading && (
							<div className="flex gap-2 justify-start">
								<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<Bot size={18} className="text-white" />
								</div>
								<div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-200">
									<div className="flex gap-1">
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: '0ms' }}
										></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: '150ms' }}
										></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: '300ms' }}
										></div>
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>
					{/* Input */}
					<div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
						<div className="flex gap-2">
							<input
								type="text"
								value={inputMessage}
								onChange={(e) => setInputMessage(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Escribe tu mensaje..."
								disabled={isLoading}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
							/>
							<button
								onClick={handleSendMessage}
								disabled={!inputMessage.trim() || isLoading}
								className="bg-primary hover:bg-primary/90 text-white rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								aria-label="Enviar mensaje"
							>
								<Send size={20} />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
