import { toast } from "react-toastify";

const toastConfiguracion = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const alertas = {
  errorToast500: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Error interno del servidor.",
      toastConfiguracion
    );
  },
  
  completadoCrearToast: () => {
    toast.success(
      "Solicitud enviada con éxito. Prospecto creado",
      toastConfiguracion
    );
  },

  errorCrearToast: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospecto no creado",
      toastConfiguracion
    );
  },

  errorCrearToast400: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospecto no creado. Por favor, complete todos los campos.",
      toastConfiguracion
    );
  },

  completadoModificarToast: () => {
    toast.success(
      "Solicitud enviada con éxito. Prospecto modificado",
      toastConfiguracion
    );
  },

  errorModificarToast: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospecto no modificado",
      toastConfiguracion
    );
  },

  errorModificarToast400: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospecto no modificado. Por favor, no deje campos vacíos y escriba valores correctos.",
      toastConfiguracion
    );
  },

  completadoEliminarToast: () => {
    toast.success(
      "Solicitud enviada con éxito. Prospecto eliminado",
      toastConfiguracion
    );
  },

  errorEliminarToast: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospecto no eliminado",
      toastConfiguracion
    );
  },

  completadoObtenerToast: () => {
    toast.success(
      "Solicitud enviada con éxito. Prospectos obtenidos",
      toastConfiguracion
    );
  },

  errorObtenerToast: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospectos no obtenidos",
      toastConfiguracion
    );
  },

  errorObtenerToast400: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospectos no obtenidos. Por favor, no deje el campo vacío.",
      toastConfiguracion
    );
  },

  errorObtenerToast404: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Prospectos no encontrado. Por favor, seleccione otro cliente.",
      toastConfiguracion
    );
  },

  infoObtenerToastVacio: () => {
    toast.info(
      "Solicitud enviada con éxito. No hay registro de prospectos en este cliente.",
      toastConfiguracion
    );
  },

  errorClientesToast: () => {
    toast.error(
      "Ocurrió un error en la solicitud. Error interno del servidor.",
      toastConfiguracion
    );
  }
};
