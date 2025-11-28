import { useCampañaStats } from '../../hooks/useApi';
import StatCard from '../molecules/StatCard';

export default function DashboardStats() {
  const { data: stats, isLoading, error } = useCampañaStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-6 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p>Error cargando estadísticas: {error.message}</p>
      </div>
    );
  }

  const estadisticas = stats || {
    totalCampañas: 0,
    campañasActivas: 0,
    presupuestoTotal: 0,
    roiPromedio: 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Campañas"
        value={estadisticas.totalCampañas}
        subtitle="Todas las campañas"
        icon="📊"
        color="blue"
      />
      <StatCard
        title="Campañas Activas"
        value={estadisticas.campañasActivas}
        subtitle="En ejecución"
        icon="🚀"
        color="green"
      />
      <StatCard
        title="Presupuesto Total"
        value={`$${estadisticas.presupuestoTotal?.toLocaleString() || '0'}`}
        subtitle="Inversión total"
        icon="💰"
        color="purple"
      />
      <StatCard
        title="ROI Promedio"
        value={`${(estadisticas.roiPromedio || 0).toFixed(1)}%`}
        subtitle="Retorno promedio"
        icon="📈"
        color="orange"
      />
    </div>
  );
}