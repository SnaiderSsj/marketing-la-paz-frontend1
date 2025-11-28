import { useCampañas } from '../../hooks/useApi';
import Card from '../atoms/Card';

export default function CampañasList() {
  const { data: campañas, isLoading, error } = useCampañas();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-700">Error cargando campañas: {error.message}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {(!campañas || campañas.length === 0) ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No hay campañas registradas</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {campañas.map((campaña) => (
            <Card key={campaña.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{campaña.nombre}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{campaña.tipoCampaña}</span>
                    <span>•</span>
                    <span>{campaña.zonaCobertura}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(campaña.fechaInicio).toLocaleDateString()} - {new Date(campaña.fechaFin).toLocaleDateString()}
                  </p>
                  {campaña.descripcion && (
                    <p className="text-gray-600 mt-2 text-sm">{campaña.descripcion}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-green-600 text-lg">
                    ${campaña.presupuesto?.toLocaleString() || '0'}
                  </p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full mt-2 ${
                    new Date(campaña.fechaFin) > new Date() 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {new Date(campaña.fechaFin) > new Date() ? 'Activa' : 'Finalizada'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}