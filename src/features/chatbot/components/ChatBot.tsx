import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useChatBot } from '../hooks/useChatBot';
import useConversations from '../hooks/useConversations';
import { Participant } from '../types';

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [inputMessage, setInputMessage] = useState('');
	const [activeTab, setActiveTab] = useState<'bot' | 'messages'>('bot');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages: botMessages, isLoading: botLoading, sendMessage: sendToBot } = useChatBot();
	const {
		participants,
		activeParticipant,
		messages: personMessages,
		isLoading: personLoading,
		selectParticipant,
		sendMessage: sendToPerson,
	} = useConversations();

	// Auto scroll al último mensaje
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [botMessages, personMessages, activeTab]);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		if (activeTab === 'bot') {
			if (botLoading) return;
			await sendToBot(inputMessage);
		} else {
			if (personLoading) return;
			await sendToPerson(inputMessage);
		}

		setInputMessage('');
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
						<div className="bg-gradient-to-r from-primary to-blue-600 text-white p-3 pt-6 rounded-t-lg flex items-center justify-between">
							<div className="flex items-center gap-2">
								<MessageCircle size={22} />
								<div>
									<h3 className="font-semibold">Chat</h3>
									<p className="text-xs text-blue-100">Asistente y mensajes</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="bg-white/10 rounded-md p-1">
									<button
										onClick={() => setActiveTab('bot')}
										className={`px-3 py-1 text-sm rounded ${activeTab === 'bot' ? 'bg-white/20' : ''}`}
									>
										Asistente
									</button>
									<button
										onClick={() => setActiveTab('messages')}
										className={`ml-2 px-3 py-1 text-sm rounded ${activeTab === 'messages' ? 'bg-white/20' : ''}`}
									>
										Mensajes
									</button>
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="hover:bg-white/20 rounded-full p-1 transition-colors"
									aria-label="Cerrar chat"
								>
									<X size={20} />
								</button>
							</div>
						</div>
					{/* Mensajes */}
					<div className="flex-1 bg-gray-50">
						{/* If messages tab, show two-column layout (participants + chat) */}
						{activeTab === 'messages' ? (
							<div className="h-full flex">
								<div className="w-40 border-r border-gray-200 p-2 overflow-y-auto bg-white">
									{participants.length === 0 && (
										<p className="text-xs text-gray-500">No hay contactos</p>
									)}
									{participants.map((p: Participant) => (
										<button
											key={p.id}
											onClick={() => selectParticipant(p)}
											className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-left ${activeParticipant?.id === p.id ? 'bg-gray-100' : ''}`}
										>
											<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
												{p.name?.charAt(0) ?? 'U'}
											</div>
											<div className="flex-1">
												<div className="text-sm font-medium">{p.name}</div>
												<div className="text-xs text-gray-500 truncate">{p.lastMessage}</div>
											</div>
										</button>
									))}
								</div>

								<div className="flex-1 p-4 overflow-y-auto space-y-4">
									{!activeParticipant && (
										<div className="text-center text-gray-500 mt-8">
											<User size={48} className="mx-auto mb-2 text-primary" />
											<p className="text-sm">Selecciona un contacto para iniciar conversación</p>
										</div>
									)}

									{activeParticipant && personMessages.map((message) => (
										<div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
											{message.sender !== 'user' && (
												<div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
													<User size={16} />
												</div>
											)}

											<div className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none'}`}>
												<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
												<span className="text-[10px] opacity-70 mt-1 block">{new Date(message.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
											</div>

											{message.sender === 'user' && (
												<div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
													<User size={18} className="text-gray-600" />
												</div>
											)}
										</div>
									))}

									{(personLoading) && (
										<div className="text-sm text-gray-500">Cargando conversación...</div>
									)}

									<div ref={messagesEndRef} />
								</div>
							</div>
						) : (
							<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
								{botMessages.length === 0 && (
									<div className="text-center text-gray-500 mt-8">
										<Bot size={48} className="mx-auto mb-2 text-primary" />
										<p className="text-sm">¡Hola! Soy tu asistente virtual.</p>
										<p className="text-xs mt-1">¿En qué puedo ayudarte hoy?</p>
									</div>
								)}

								{botMessages.map((message) => (
									<div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
										{message.sender === 'bot' && (
											<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
												<Bot size={18} className="text-white" />
											</div>
										)}

										<div className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none'}`}>
											<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
											<span className="text-[10px] opacity-70 mt-1 block">{new Date(message.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
										</div>

										{message.sender === 'user' && (
											<div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
												<User size={18} className="text-gray-600" />
											</div>
										)}
									</div>
								))}

								{botLoading && (
									<div className="flex gap-2 justify-start">
										<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
											<Bot size={18} className="text-white" />
										</div>
										<div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-200">
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
											</div>
										</div>
									</div>
								)}

								<div ref={messagesEndRef} />
							</div>
						)}
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
								// disabled={isLoading}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
							/>
							<button
								onClick={handleSendMessage}
								disabled={!inputMessage.trim()}
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
