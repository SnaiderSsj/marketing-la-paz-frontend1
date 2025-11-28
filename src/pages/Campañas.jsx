import { useCampañasParaTabla } from '../hooks/useApi';
import DataTable from '../components/organisms/DataTable';
import Card from '../components/atoms/Card';

export default function Campañas() {
  const { data: tableData, isLoading, error } = useCampañasParaTabla();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando datos de campañas... XD</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 border-red-200 bg-red-50">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">Error cargando campañas: {error.message}</p>
          </Card>
        </div>
      </div>
    );
  }

  const columns = tableData?.columns || [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'tipoCampaña', title: 'Tipo' },
    { key: 'zonaCobertura', title: 'Zona' },
    { 
      key: 'fechaInicio', 
      title: 'Inicio',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'fechaFin', 
      title: 'Fin',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'presupuesto', 
      title: 'Presupuesto',
      render: (value) => `$${value?.toLocaleString() || '0'}`
    },
    { 
      key: 'fechaFin', 
      title: 'Estado',
      render: (value) => {
        const isActiva = new Date(value) > new Date();
        return (
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            isActiva ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActiva ? 'Activa' : 'Finalizada'}
          </span>
        );
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Campañas
          </h1>
          <p className="text-gray-600 mt-2">
            Tabla completa de todas las campañas de marketing
          </p>
        </div>

        {/* Tabla de Campañas */}
        <DataTable
          data={tableData?.data || []}
          columns={columns}
          title={`Campañas (${tableData?.data?.length || 0})`}
        />

        {/* Información de los datos */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800">Información de la tabla</h3>
              <p className="text-blue-700 text-sm">
                Mostrando {tableData?.data?.length || 0} campañas en formato tabla
              </p>
            </div>
            <button 
              onClick={() => console.log('Datos completos:', tableData)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Ver JSON
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}