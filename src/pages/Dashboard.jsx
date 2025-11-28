import { Link } from 'react-router-dom';
import HealthStatus from '../components/molecules/HealthStatus';
import DashboardStats from '../components/organisms/DashboardStats';
import CampañasList from '../components/organisms/CampañasList';
import Button from '../components/atoms/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header con navegación */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Marketing La Paz - Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Gestión y monitoreo de campañas de marketing
              </p>
            </div>
            <div className="flex items-center gap-4">
              <HealthStatus />
              <Link to="/campañas">
                <Button variant="primary">
                  Ver Tabla Completa
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Resumen General
          </h2>
          <DashboardStats />
        </section>

        {/* Lista de Campañas */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Campañas Recientes
            </h2>
            <Link to="/campañas" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas →
            </Link>
          </div>
          <CampañasList />
        </section>
      </div>
    </div>
  );
}