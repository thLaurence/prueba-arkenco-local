import { useEffect, useState } from "react";
import {
  obtenerProspectos,
  obtenerClientes,
  obtenerProspectosPorId,
  editarProspectoPorId,
  eliminarProspectoId,
  crearProspectoNuevo,
} from "../api/prospecto.api";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { alertas } from "../utils/alertas";

export function ProspectoCRUD() {
  // const [prospectos, setProspectos] = useState([]);
  const [prospectosCliente, setProspectosCliente] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [idCliente, setIdCliente] = useState(0);
  const [mostrarMenuEditar, setMostrarMenuEditar] = useState(null);
  const [mostrarMenuCrear, setMostrarMenuCrear] = useState(null);

  const [prospectoEditado, setProspectoEditado] = useState({
    id: "",
    nombre: "",
    email: "",
    telefono: "",
    fecha_ingreso: "",
    sexo: "",
    cliente_id: 0,
    estado_id: 0,
    etapa_id: 0,
  });

  const limpiarProspectoEditado = () => {
    setProspectoEditado({
      id: "",
      nombre: "",
      email: "",
      telefono: "",
      fecha_ingreso: "",
      sexo: "",
      cliente_id: 0,
      estado_id: 0,
      etapa_id: 0,
    });
  };

  const limpiarProspectos = () => {
    setProspectosCliente([]);
  }

  useEffect(() => {
    // async function cargarProspectos() {
    //   const res = await obtenerProspectos();
    //   setProspectos(res.data);
    // }
    // cargarProspectos();

    async function cargarClientes() {
      await obtenerClientes()
        .then((res) => {
          console.log(res.status);
          console.log(res);
          setClientes(res.data);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            alertas.errorToast500();
            console.log(error.response.status);
            console.log(error);
          } else {
            alertas.errorClientesToast();
            // console.log(error.response.status);
            console.log(error);
          }
        });
    }
    cargarClientes();
  }, []);

  const manejoInputsEditar = (event) => {
    const { name, value } = event.target;
    setProspectoEditado((prevProspecto) => ({
      ...prevProspecto,
      [name]: value,
    }));
    console.log(prospectoEditado);
  };

  // Función para mostrar menu editar o crear
  const menuModificar = (event, prospecto) => {
    event.preventDefault();
    setProspectoEditado(prospecto);
    setMostrarMenuEditar(!mostrarMenuEditar);
  };

  const visibilidadMenu = () => {
    setMostrarMenuEditar(!mostrarMenuEditar);
  };

  const menuCrear = (event, prospecto) => {
    event.preventDefault();
    setMostrarMenuCrear(!mostrarMenuCrear);
  };

  const visibilidadMenuCrear = () => {
    setMostrarMenuCrear(!mostrarMenuCrear);
  };

  //Input para encontrar un cliente y traer sus prospectos
  const inputIdCliente = (event) => {
    setIdCliente(event.target.value);
    console.log(event.target.value);
  };

  async function cargarProspectosPorCliente() {
    // eslint-disable-next-line
    if (idCliente == 0) {
      await obtenerProspectos()
        .then((res) => {
          alertas.completadoObtenerToast();
          console.log("Solicitud enviada con éxito. Prospectos obtenidos");
          console.log(res.status);
          setProspectosCliente(res.data);
        })
        .catch((error) => {
          alertas.errorObtenerToast();
          console.log(
            "Ocurrió un error en la solicitud. Prospectos no obtenidos"
          );
          console.log(error.response.status);
          console.log(error);
        });
    } else {
      await obtenerProspectosPorId(idCliente)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            alertas.infoObtenerToastVacio();
            console.log("vacio");
            setProspectosCliente(res.data);
          } else {
            if (res.status === 200) {
              alertas.completadoObtenerToast();
              console.log("Solicitud enviada con éxito. Prospectos obtenidos");
              console.log(res.status);
              console.log(res);
              setProspectosCliente(res.data);
            }
            setProspectosCliente(res.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alertas.errorObtenerToast400();
            console.log(
              "Ocurrió un error en la solicitud. Prospectos no obtenidos. Por favor, no deje el campo vacío."
            );
            console.log(error.response.status);
            console.log(error);
          } else if (error.response.status === 404) {
            alertas.errorObtenerToast404();
            console.log(
              "Ocurrió un error en la solicitud. Prospectos no encontrado. Por favor, seleccione otro cliente."
            );
            console.log(error.response.status);
            console.log(error);
          } else if (error.response.status === 500) {
            alertas.errorToast500();
            console.log(
              "Ocurrió un error en la solicitud. Error interno del servidor."
            );
            console.log(error.response.status);
            console.log(error);
          } else {
            alertas.errorObtenerToast();
            console.log(
              "Ocurrió un error en la solicitud. Prospectos no obtenidos"
            );
            console.log(error.response.status);
            console.log(error);
          }
        });
    }
  }

  async function editarProspecto(event) {
    event.preventDefault();
    await editarProspectoPorId(prospectoEditado.id, prospectoEditado)
      .then((res) => {
        if (res.status === 200) {
          alertas.completadoModificarToast();
          console.log("Solicitud enviada con éxito. Prospecto modificado");
          console.log(res.status);
          console.log(res);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alertas.errorModificarToast400();
          console.log(
            "Ocurrió un error en la solicitud. Prospecto no modificado. Por favor, no deje campos vacíos y escriba valores correctos."
          );
          console.log(error.response.status);
          console.log(error);
        } else if (error.response.status === 500) {
          alertas.errorToast500();
          console.log(
            "Ocurrió un error en la solicitud. Error interno servidor del servidor."
          );
          console.log(error.response.status);
          console.log(error);
        } else {
          alertas.errorModificarToast();
          console.log(
            "Ocurrió un error en la solicitud. Prospecto no modificado"
          );
          console.log(error.response.status);
          console.log(error);
        }
      });
    setMostrarMenuEditar(false);
    cargarProspectosPorCliente();
    limpiarProspectoEditado();
  }

  async function eliminarProspecto(event, id) {
    event.preventDefault();
    await eliminarProspectoId(id)
      .then((res) => {
        alertas.completadoEliminarToast();
        console.log("Solicitud enviada con éxito. Prospecto eliminado");
        console.log(res.status);
        console.log(res);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alertas.errorToast500();
          console.log(
            "Ocurrió un error en la solicitud. Error interno del servidor."
          );
          console.log(error.response.status);
          console.log(error);
        } else {
          alertas.errorEliminarToast();
          console.log(
            "Ocurrió un error en la solicitud. Prospecto no eliminado"
          );
          console.log(error.response.status);
          console.log(error);
        }
      });
    cargarProspectosPorCliente();
  }

  async function crearProspecto(event) {
    event.preventDefault();
    await crearProspectoNuevo(prospectoEditado)
      .then((res) => {
        alertas.completadoCrearToast();
        console.log("Solicitud enviada con éxito. Prospecto creado");
        console.log(res.status);
        console.log(res);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alertas.errorCrearToast400();
          console.log(
            "Ocurrió un error en la solicitud. Por favor, complete todos los campos. Prospecto no creado."
          );
          console.log(error.response.status);
          console.log(error);
        } else if (error.response.status === 500) {
          alertas.errorToast500();
          console.log(
            "Ocurrió un error en la solicitud. Error interno del servidor."
          );
          console.log(error.response.status);
          console.log(error);
        } else {
          alertas.errorCrearToast();
          console.log("Ocurrió un error en la solicitud. Prospecto no creado");
          console.log(error.response.status);
          console.log(error);
        }
      });
    setMostrarMenuCrear(false);
    limpiarProspectoEditado();
  }

  return (
    <div>
      <div className="w-full max-w-lg mx-auto mt-10">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h2 className="text-center text-gray-700 text-2xl font-semibold mb-4">
              Prospectos
            </h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Clientes
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                defaultValue={0}
                onChange={inputIdCliente}
              >
                <option value={"i"}></option>
                <option value={0}>Todos</option>
                {clientes.map((cliente) => (
                  <option value={cliente.id} key={cliente.id}>
                    {cliente.nombre_empresa}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={cargarProspectosPorCliente}
            >
              Buscar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={limpiarProspectos}
            >
              Limpiar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={menuCrear}
            >
              Crear
            </button>
          </div>
        </form>
        {mostrarMenuCrear && (
          <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-full max-w-xs pointer-events-auto relative">
              <div className="absolute top-0 right-0 rounded-lg p-4">
                <button
                  className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700"
                  onClick={visibilidadMenuCrear}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4">
                <input name="id" className="hidden" type="date" />
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha Ingreso
                  </label>
                  <input
                    name="fecha_ingreso"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    onChange={manejoInputsEditar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Cliente
                  </label>
                  <div className="relative">
                    <select
                      name="cliente_id"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={manejoInputsEditar}
                    >
                      <option></option>
                      {clientes.map((cliente) => (
                        <option value={cliente.id} key={cliente.id}>
                          {cliente.nombre_empresa}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={manejoInputsEditar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={manejoInputsEditar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Teléfono
                  </label>
                  <input
                    name="telefono"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    onChange={manejoInputsEditar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sexo
                  </label>
                  <input
                    name="sexo"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={manejoInputsEditar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Estado
                  </label>
                  <div className="relative">
                    <select
                      name="estado_id"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={manejoInputsEditar}
                    >
                      <option></option>
                      <option value={1}>Abierto</option>
                      <option value={2}>Perdido</option>
                      <option value={3}>Ganado</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Etapa
                  </label>
                  <div className="relative">
                    <select
                      name="etapa_id"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={manejoInputsEditar}
                    >
                      <option></option>
                      <option value={1}>En conversación</option>
                      <option value={2}>Conseguido</option>
                      <option value={3}>Perdido</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={crearProspecto}
                  >
                    Crear Prospecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {prospectosCliente.map((prospecto) => (
        <div
          key={prospecto.id}
          className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5"
        >
          <h2 className="text-center text-2xl font-semibold mt-3">
            {prospecto.nombre}
          </h2>
          <p className="text-center text-black mt-1">
            {prospecto.fecha_ingreso}
          </p>
          <div className="flex justify-center mt-5">
            <span
              className={`${
                prospecto.estado === "Abierto"
                  ? "text-white mx-3 bg-green-800 rounded-md p-2"
                  : prospecto.estado === "Perdido"
                  ? "text-white mx-3 bg-red-600 rounded-md p-2"
                  : prospecto.estado === "Ganado"
                  ? "text-white mx-3 bg-yellow-500 rounded-md p-2"
                  : "text-blue-500 hover:text-blue-700 mx-3"
              }`}
            >
              {prospecto.estado}
            </span>
            <span
              className={`${
                prospecto.etapa === "En conversación"
                  ? "text-white mx-3 bg-green-800 rounded-md p-2"
                  : prospecto.etapa === "Conseguido"
                  ? "text-white mx-3 bg-yellow-500 rounded-md p-2"
                  : prospecto.etapa === "Perdido"
                  ? "text-white mx-3 bg-red-600 rounded-md p-2"
                  : "text-blue-500 hover:text-blue-700 mx-3"
              }`}
            >
              {prospecto.etapa}
            </span>
          </div>
          <div className="mt-5 justify-between flex border-2 border-gray-200 bg-gray-200 p-1 rounded-lg">
            <p className="font-semibold text-black text-base">Cliente:</p>
            <p className="font-semibold text-black text-base">
              {prospecto.nombre_empresa}
            </p>
          </div>
          <div className="mt-2 justify-between flex border-2 border-gray-200 bg-gray-200 p-1 rounded-lg">
            <p className="font-semibold text-black text-base">Email:</p>
            <p className="font-semibold text-black text-base">
              {prospecto.email}
            </p>
          </div>
          <div className="mt-2 justify-between flex border-2 border-gray-200 bg-gray-200 p-1 rounded-lg">
            <p className="font-semibold text-black text-base">Telefono:</p>
            <p className="font-semibold text-black text-base">
              {prospecto.telefono}
            </p>
          </div>
          <div className="mt-2 justify-between flex border-2 border-gray-200 bg-gray-200 p-1 rounded-lg">
            <p className="font-semibold text-black text-base">Sexo:</p>
            <p className="font-semibold text-black text-base">
              {prospecto.sexo}
            </p>
          </div>
          <form className="flex justify-end">
            <div>
              <button
                className="text-black mt-5 mx-1 p-2 border-2 border-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-500"
                onClick={(event) => menuModificar(event, prospecto)}
              >
                Modificar
              </button>
            </div>
            <div>
              <button
                className="text-black mt-5 mx-1 p-2 border-2 border-gray-700 rounded-lg hover:border-red-500 hover:text-red-500"
                onClick={(event) => eliminarProspecto(event, prospecto.id)}
              >
                Eliminar
              </button>
            </div>
          </form>
          {mostrarMenuEditar && (
            <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-full max-w-xs pointer-events-auto relative">
                <div className="absolute top-0 right-0 rounded-lg p-4">
                  <button
                    className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700"
                    onClick={visibilidadMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4">
                  <input
                    name="id"
                    className="hidden"
                    type="date"
                    defaultValue={prospectoEditado.id}
                    onChange={manejoInputsEditar}
                  />
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Fecha Ingreso
                    </label>
                    <input
                      name="fecha_ingreso"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="date"
                      defaultValue={prospectoEditado.fecha_ingreso}
                      onChange={manejoInputsEditar}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Cliente
                    </label>
                    <div className="relative">
                      <select
                        name="cliente_id"
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue={prospectoEditado.cliente_id}
                        onChange={manejoInputsEditar}
                      >
                        <option></option>
                        {clientes.map((cliente) => (
                          <option value={cliente.id} key={cliente.id}>
                            {cliente.nombre_empresa}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={manejoInputsEditar}
                      defaultValue={prospectoEditado.nombre}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={manejoInputsEditar}
                      defaultValue={prospectoEditado.email}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Teléfono
                    </label>
                    <input
                      name="telefono"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      onChange={manejoInputsEditar}
                      defaultValue={prospectoEditado.telefono}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Sexo
                    </label>
                    <input
                      name="sexo"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={manejoInputsEditar}
                      defaultValue={prospectoEditado.sexo}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Estado
                    </label>
                    <div className="relative">
                      <select
                        name="estado_id"
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue={prospectoEditado.estado_id}
                        onChange={manejoInputsEditar}
                      >
                        <option value={1}>Abierto</option>
                        <option value={2}>Perdido</option>
                        <option value={3}>Ganado</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Etapa
                    </label>
                    <div className="relative">
                      <select
                        name="etapa_id"
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue={prospectoEditado.etapa_id}
                        onChange={manejoInputsEditar}
                      >
                        <option value={1}>En conversación</option>
                        <option value={2}>Conseguido</option>
                        <option value={3}>Perdido</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={editarProspecto}
                    >
                      Modificar Prospecto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}
