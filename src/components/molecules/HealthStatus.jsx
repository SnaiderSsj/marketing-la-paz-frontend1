import { useHealth } from '../../hooks/useApi';

export default function HealthStatus() {
  const { data, isLoading, error } = useHealth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-sm">Conectando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-sm">Error de conexión</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600">
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="text-sm">Backend conectado</span>
    </div>
  );
}