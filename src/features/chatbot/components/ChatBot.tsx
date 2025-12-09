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
			{/* Botón flotante mejorado */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 z-50 group"
					aria-label="Abrir chat"
				>
					<MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
					<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
				</button>
			)}

			{/* Overlay - Cierra el chat al clickear fuera */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/0 z-40"
					onClick={() => setIsOpen(false)}
					aria-label="Cerrar chat"
				/>
			)}

			{/* Ventana del chat - Centrada verticalmente con máximo 90% de altura */}
			{isOpen && (
				<div className="fixed top-1/2 right-6 -translate-y-1/2 w-[550px] h-[750px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
					{/* Header mejorado */}
					<div className="bg-gradient-to-r from-primary via-blue-600 to-blue-700 text-white p-5 flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
									<MessageCircle size={22} className="text-white" />
								</div>
								<div>
									<h3 className="font-bold text-lg">Chat</h3>
									<p className="text-xs text-blue-100">
										{activeTab === 'bot' ? 'Asistente Virtual' : activeParticipant ? activeParticipant.name : 'Mensajes'}
									</p>
								</div>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="hover:bg-white/20 rounded-lg p-2 transition-all hover:scale-110 active:scale-95"
								aria-label="Cerrar chat"
								title="Cerrar chat"
							>
								<X size={24} strokeWidth={3} />
							</button>
						</div>
						
						{/* Tabs mejorados */}
						<div className="flex gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm mt-2">
							<button
								onClick={() => setActiveTab('bot')}
								className={`flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
									activeTab === 'bot' 
										? 'bg-white text-primary shadow-md' 
										: 'text-white/90 hover:text-white hover:bg-white/15'
								}`}
							>
								<Bot size={16} className="inline mr-1.5" />
								Asistente
							</button>
							<button
								onClick={() => setActiveTab('messages')}
								className={`flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
									activeTab === 'messages' 
										? 'bg-white text-primary shadow-md' 
										: 'text-white/90 hover:text-white hover:bg-white/15'
								}`}
							>
								<User size={16} className="inline mr-1.5" />
								Mensajes
							</button>
						</div>
					</div>
					{/* Contenido de mensajes */}
					<div className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
						{/* If messages tab, show two-column layout (participants + chat) */}
						{activeTab === 'messages' ? (
							<div className="h-full flex">
								{/* Lista de participantes mejorada */}
								<div className="w-44 border-r border-gray-200 overflow-y-auto bg-white">
									<div className="p-3 border-b border-gray-200 bg-gray-50">
										<h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Contactos</h4>
									</div>
									{participants.length === 0 && (
										<p className="text-xs text-gray-500 p-3 text-center">No hay contactos</p>
									)}
									{participants.map((p: Participant) => (
										<button
											key={p.id}
											onClick={() => selectParticipant(p)}
											className={`w-full flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-blue-50 text-left transition-colors ${
												activeParticipant?.id === p.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
											}`}
										>
											<div className="relative">
												<div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
													{p.name?.charAt(0).toUpperCase() ?? 'U'}
												</div>
												<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
											</div>
											<div className="flex-1 min-w-0">
												<div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
												<div className="text-xs text-gray-500 truncate">{p.lastMessage || 'Sin mensajes'}</div>
											</div>
										</button>
									))}
								</div>

								{/* Área de conversación mejorada */}
								<div className="flex-1 flex flex-col">
									{!activeParticipant ? (
										<div className="flex-1 flex items-center justify-center text-center p-6">
											<div>
												<div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
													<User size={40} className="text-primary" />
												</div>
												<p className="text-sm font-medium text-gray-700 mb-1">Selecciona un contacto</p>
												<p className="text-xs text-gray-500">Elige una conversación para comenzar</p>
											</div>
										</div>
									) : (
										<>
											{/* Header de conversación activa */}
											<div className="p-3 border-b border-gray-200 bg-white flex items-center gap-3">
												<div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
													{activeParticipant.name?.charAt(0).toUpperCase() ?? 'U'}
												</div>
												<div>
													<div className="text-sm font-semibold text-gray-900">{activeParticipant.name}</div>
													<div className="text-xs text-gray-500">{activeParticipant.email}</div>
												</div>
											</div>
											
											{/* Mensajes */}
											<div className="flex-1 p-4 overflow-y-auto space-y-3">
												{personMessages.map((message) => (
													<div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
														{message.sender !== 'user' && (
															<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-sm">
																<User size={16} className="text-white" />
															</div>
														)}

														<div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
															<div className={`rounded-2xl px-4 py-2.5 shadow-sm ${
																message.sender === 'user' 
																	? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-br-sm' 
																	: 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
															}`}>
																<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
															</div>
															<span className={`text-[10px] text-gray-500 mt-1 block ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
																{new Date(message.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
															</span>
														</div>

														{message.sender === 'user' && (
															<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm order-2">
																<User size={16} className="text-white" />
															</div>
														)}
													</div>
												))}

												{personLoading && (
													<div className="text-sm text-gray-500 text-center py-4">
														<div className="inline-flex items-center gap-2">
															<div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
															<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
															<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
														</div>
													</div>
												)}

												<div ref={messagesEndRef} />
											</div>
										</>
									)}
								</div>
							</div>
						) : (
							/* Vista del asistente bot mejorada */
							<div className="flex flex-col h-full">
								<div className="flex-1 overflow-y-auto p-4 space-y-3">
									{botMessages.length === 0 && (
										<div className="text-center mt-12">
											<div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
												<Bot size={40} className="text-white" />
											</div>
											<p className="text-base font-semibold text-gray-800 mb-2">¡Hola! Soy tu asistente virtual</p>
											<p className="text-sm text-gray-600">¿En qué puedo ayudarte hoy?</p>
										</div>
									)}

									{botMessages.map((message) => (
										<div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
											{message.sender === 'bot' && (
												<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm">
													<Bot size={16} className="text-white" />
												</div>
											)}

											<div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
												<div className={`rounded-2xl px-4 py-2.5 shadow-sm ${
													message.sender === 'user' 
														? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-br-sm' 
														: 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
												}`}>
													<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
												</div>
												<span className={`text-[10px] text-gray-500 mt-1 block ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
													{new Date(message.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
												</span>
											</div>

											{message.sender === 'user' && (
												<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm order-2">
													<User size={16} className="text-white" />
												</div>
											)}
										</div>
									))}

									{botLoading && (
										<div className="flex gap-2 justify-start">
											<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm">
												<Bot size={16} className="text-white" />
											</div>
											<div className="bg-white rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm border border-gray-200">
												<div className="flex gap-1.5">
													<div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
													<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
													<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
												</div>
											</div>
										</div>
									)}

									<div ref={messagesEndRef} />
								</div>
							</div>
						)}
					</div>
					{/* Input mejorado */}
					<div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
						<div className="flex gap-2 items-end">
							<div className="flex-1 relative">
								<input
									type="text"
									value={inputMessage}
									onChange={(e) => setInputMessage(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder={activeTab === 'bot' ? 'Pregunta algo al asistente...' : 'Escribe un mensaje...'}
									className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm shadow-sm transition-all"
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
									{inputMessage.length > 0 && (
										<span className="text-xs">{inputMessage.length}</span>
									)}
								</div>
							</div>
							<button
								onClick={handleSendMessage}
								disabled={!inputMessage.trim()}
								className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white rounded-xl p-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105 disabled:hover:scale-100 active:scale-95"
								aria-label="Enviar mensaje"
								title="Enviar (Enter)"
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
