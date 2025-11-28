import axios from 'axios';

const API_BASE_URL = 'https://marketinglapaz-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para logs
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 ${config.method?.toUpperCase()} to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios de Campañas
export const campañasAPI = {
  getAll: () => api.get('https://marketinglapaz-production.up.railway.app/api/Campa%C3%B1as'),
  getById: (id) => api.get(`/api/campañas/${id}`),
  create: (data) => api.post('/api/campañas', data),
  update: (id, data) => api.put(`/api/campañas/${id}`, data),
  delete: (id) => api.delete(`/api/campañas/${id}`),
  getActivas: () => api.get('/api/campañas/activas'),
  getEstadisticas: () => api.get('/api/campañas/estadisticas'),
  getParaTabla: () => api.get('/api/campañas').then(response => ({
    data: response.data,
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'nombre', title: 'Nombre' },
      { key: 'tipoCampaña', title: 'Tipo' },
      { key: 'zonaCobertura', title: 'Zona' },
      { key: 'fechaInicio', title: 'Inicio' },
      { key: 'fechaFin', title: 'Fin' },
      { key: 'presupuesto', title: 'Presupuesto' },
      { key: 'estado', title: 'Estado' }
    ]
  }))
};

// Servicios de Leads
export const leadsAPI = {
  getAll: () => api.get('/api/leads'),
  getById: (id) => api.get(`/api/leads/${id}`),
  create: (data) => api.post('/api/leads', data),
  update: (id, data) => api.put(`/api/leads/${id}`, data),
  delete: (id) => api.delete(`/api/leads/${id}`),
  getEstadisticas: () => api.get('/api/leads/estadisticas'),
  getPorCampaña: (campañaId) => api.get(`/api/leads/por-campaña/${campañaId}`),
  getParaTabla: () => api.get('/api/leads').then(response => ({
    data: response.data,
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'nombre', title: 'Nombre' },
      { key: 'email', title: 'Email' },
      { key: 'telefono', title: 'Teléfono' },
      { key: 'campañaId', title: 'Campaña ID' },
      { key: 'estado', title: 'Estado' },
      { key: 'fechaCreacion', title: 'Fecha Creación' }
    ]
  }))
};

// Servicios de Dashboard
export const dashboardAPI = {
  getResumen: () => api.get('/api/dashboard'),
  getMetricas: () => api.get('/api/dashboard/metricas'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health')
};

export default api;