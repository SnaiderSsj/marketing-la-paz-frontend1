import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campañasAPI, leadsAPI, dashboardAPI, healthAPI } from '../services/api';

// Campañas hooks
export const useCampañas = () => 
  useQuery({
    queryKey: ['campañas'],
    queryFn: async () => {
      const response = await campañasAPI.getAll();
      return response.data;
    },
  });

export const useCampañasParaTabla = () =>
  useQuery({
    queryKey: ['campañas', 'tabla'],
    queryFn: async () => {
      const response = await campañasAPI.getParaTabla();
      return response.data;
    },
  });

export const useCampañasActivas = () =>
  useQuery({
    queryKey: ['campañas', 'activas'],
    queryFn: async () => {
      const response = await campañasAPI.getActivas();
      return response.data;
    },
  });

export const useCampañaStats = () =>
  useQuery({
    queryKey: ['campañas', 'estadisticas'],
    queryFn: async () => {
      const response = await campañasAPI.getEstadisticas();
      return response.data;
    },
  });

export const useCampaña = (id) =>
  useQuery({
    queryKey: ['campañas', id],
    queryFn: async () => {
      const response = await campañasAPI.getById(id);
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateCampaña = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (campañaData) => {
      const response = await campañasAPI.create(campañaData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campañas'] });
    },
  });
};

// Leads hooks
export const useLeads = () =>
  useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await leadsAPI.getAll();
      return response.data;
    },
  });

export const useLeadsParaTabla = () =>
  useQuery({
    queryKey: ['leads', 'tabla'],
    queryFn: async () => {
      const response = await leadsAPI.getParaTabla();
      return response.data;
    },
  });

export const useLeadsStats = () =>
  useQuery({
    queryKey: ['leads', 'estadisticas'],
    queryFn: async () => {
      const response = await leadsAPI.getEstadisticas();
      return response.data;
    },
  });

export const useLeadsPorCampaña = (campañaId) =>
  useQuery({
    queryKey: ['leads', 'campaña', campañaId],
    queryFn: async () => {
      const response = await leadsAPI.getPorCampaña(campañaId);
      return response.data;
    },
    enabled: !!campañaId,
  });

// Dashboard hooks
export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await dashboardAPI.getResumen();
      return response.data;
    },
  });

export const useMetricas = () =>
  useQuery({
    queryKey: ['metricas'],
    queryFn: async () => {
      const response = await dashboardAPI.getMetricas();
      return response.data;
    },
  });

// Health hook
export const useHealth = () =>
  useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      try {
        const response = await healthAPI.check();
        return {
          status: 'healthy',
          data: response.data,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        // Fallback: intentar con campañas
        try {
          await campañasAPI.getAll();
          return {
            status: 'healthy',
            data: { message: 'Backend responding via campañas endpoint' },
            timestamp: new Date().toISOString()
          };
        } catch (fallbackError) {
          throw new Error('Backend not responding');
        }
      }
    },
  });