import type { JobCreate, JobUpdate } from "@/types";
import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  headers: {
    "Content-Type": "application/json"
  }
})

export const getJobs = () => api.get('/jobs')
export const getJob = (id: number) => api.get(`/jobs/${id}`)
export const createJob = (data: JobCreate) => api.post('/jobs', data)
export const updateJob = (id: number, data: JobUpdate) => api.put(`/jobs/${id}`, data)
export const deleteJob = (id: number) => api.delete(`/jobs/${id}`)
export const getAIContent = (id: number) => api.get(`/jobs/${id}/ai-content`)
