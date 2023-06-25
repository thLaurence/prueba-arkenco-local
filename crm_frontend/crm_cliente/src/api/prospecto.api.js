import axios from 'axios'

export const obtenerProspectos = () => {
  return axios.get('http://127.0.0.1:8000/crm_api/prospectos/')
}

export const obtenerClientes = () => {
  return axios.get('http://127.0.0.1:8000/crm_api/clientes/')
}

export const obtenerProspectosPorId = (clienteId) => {
  return axios.get(`http://127.0.0.1:8000/crm_api/clientes/${clienteId}/prospectos/`)
}

export const editarProspectoPorId = (prospectoId, prospectoEditado) => {
  return axios.put(`http://127.0.0.1:8000/crm_api/prospectos/${prospectoId}/`, prospectoEditado)
}

export const eliminarProspectoId = (prospectoId) => {
  return axios.delete(`http://127.0.0.1:8000/crm_api/prospectos/${prospectoId}/`)
}

export const crearProspectoNuevo = (prospectoNuevo) => {
  return axios.post(`http://127.0.0.1:8000/crm_api/prospectos/`, prospectoNuevo)
}

// export const crearProspectoNuevo = (clienteId, prospectoNuevo) => {
//   return axios.post(`http://127.0.0.1:8000/crm_api/clientes/${clienteId}/prospectos/`, prospectoNuevo)
// }